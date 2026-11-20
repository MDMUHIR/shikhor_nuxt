<script setup lang="ts">
import type { ExamAttemptSummary, ExamInfo, ExamReviewItem, ExamTakeQuestion } from '~/utils/exam'

interface TakeState {
  attempt: ExamAttemptSummary
  exam: ExamInfo
  questions: ExamTakeQuestion[]
  answers: Record<string, string[]>
  seconds_left: number
}

interface ResultState {
  attempt: ExamAttemptSummary
  exam: ExamInfo
  answers_visible: boolean
  review: ExamReviewItem[]
}

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const attemptId = Number(route.params.attemptId)
const { apiData } = useApi()
const { ask } = useConfirm()
const toast = useToast()

const { data, pending, error, refresh } = await useAsyncData(`exam-attempt-${attemptId}`, () =>
  apiData<TakeState | ResultState>(`/exam-attempts/${attemptId}`),
)

const result = ref<ResultState | null>(null)
const take = computed(() => (data.value && 'questions' in data.value ? (data.value as TakeState) : null))
const shown = computed(() => result.value ?? (data.value && 'review' in data.value ? (data.value as ResultState) : null))

/* ---------------------------- taking the exam ---------------------------- */

const answers = reactive<Record<number, string[]>>({})
const current = ref(0)
const flagged = reactive<Record<number, boolean>>({})
const deadline = ref(0)
const now = ref(Date.now())
const saveState = ref<'idle' | 'saving' | 'saved' | 'error'>('idle')
const submitting = ref(false)
let ticker: ReturnType<typeof setInterval> | null = null
let saveTimer: ReturnType<typeof setTimeout> | null = null
let dirty = false

watch(
  take,
  (state) => {
    if (!state) return
    for (const [key, value] of Object.entries(state.answers ?? {})) answers[Number(key)] = [...value]
    deadline.value = Date.now() + state.seconds_left * 1000
  },
  { immediate: true },
)

const secondsLeft = computed(() => Math.max(0, Math.ceil((deadline.value - now.value) / 1000)))
const questions = computed(() => take.value?.questions ?? [])
const question = computed(() => questions.value[current.value])
const answeredCount = computed(() => questions.value.filter((q) => (answers[q.id] ?? []).length > 0).length)
const lowTime = computed(() => secondsLeft.value <= 60)

function selected(q: ExamTakeQuestion, optionId: string) {
  return (answers[q.id] ?? []).includes(optionId)
}

function choose(q: ExamTakeQuestion, optionId: string) {
  if (q.type === 'multiple_choice') {
    const set = new Set(answers[q.id] ?? [])
    if (set.has(optionId)) set.delete(optionId)
    else set.add(optionId)
    answers[q.id] = [...set]
  } else {
    // tapping the selected option again clears it (unanswered is never penalised)
    answers[q.id] = (answers[q.id] ?? [])[0] === optionId ? [] : [optionId]
  }
  queueSave()
}

function clearAnswer(q: ExamTakeQuestion) {
  answers[q.id] = []
  queueSave()
}

function payload() {
  const out: Record<number, string[]> = {}
  for (const q of questions.value) out[q.id] = answers[q.id] ?? []
  return out
}

function queueSave() {
  dirty = true
  saveState.value = 'saving'
  if (saveTimer) clearTimeout(saveTimer)
  saveTimer = setTimeout(flushSave, 600)
}

async function flushSave() {
  if (!dirty || result.value) return
  dirty = false
  try {
    await apiData(`/exam-attempts/${attemptId}/answers`, { method: 'POST', body: { answers: payload() } })
    saveState.value = dirty ? 'saving' : 'saved'
  } catch {
    dirty = true
    saveState.value = 'error'
  }
}

async function submit(auto = false) {
  if (submitting.value || result.value) return
  if (!auto) {
    const unanswered = questions.value.length - answeredCount.value
    const ok = await ask({
      title: 'Submit exam',
      message: unanswered
        ? `You have ${unanswered} unanswered question${unanswered === 1 ? '' : 's'}. Submit anyway? You cannot change answers afterwards.`
        : 'Submit your answers now? You cannot change them afterwards.',
      confirmLabel: 'Submit exam',
      tone: 'primary',
    })
    if (!ok) return
  }
  submitting.value = true
  if (saveTimer) clearTimeout(saveTimer)
  try {
    result.value = await apiData<ResultState>(`/exam-attempts/${attemptId}/submit`, { method: 'POST', body: { answers: payload() } })
    if (auto) toast.info('Time is up — your exam was submitted automatically.')
    if (import.meta.client) window.scrollTo({ top: 0 })
  } catch (err) {
    toast.error((err as Error).message)
    await refresh()
  } finally {
    submitting.value = false
  }
}

watch(secondsLeft, (value) => {
  if (take.value && !result.value && value === 0) submit(true)
})

function guard(event: BeforeUnloadEvent) {
  if (take.value && !result.value) {
    event.preventDefault()
    event.returnValue = ''
  }
}

onMounted(() => {
  ticker = setInterval(() => (now.value = Date.now()), 500)
  window.addEventListener('beforeunload', guard)
})

onBeforeUnmount(() => {
  if (ticker) clearInterval(ticker)
  if (saveTimer) clearTimeout(saveTimer)
  if (dirty && !result.value) flushSave()
  if (import.meta.client) window.removeEventListener('beforeunload', guard)
})

/* -------------------------------- result --------------------------------- */

function optionText(item: ExamReviewItem, id: string) {
  return item.options.find((option) => String(option.id) === String(id))?.text ?? id
}

const statusStyle: Record<string, string> = {
  correct: 'border-emerald-200 bg-emerald-50/50',
  wrong: 'border-rose-200 bg-rose-50/50',
  unanswered: 'border-gray-200 bg-gray-50/50',
}

useSeoMeta({ title: 'Exam — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1000px] px-4 py-6 md:px-6 md:py-8">
    <div v-if="pending" class="card h-64 animate-pulse bg-gray-50" />
    <ErrorState v-else-if="error" title="Could not load this attempt" :message="error.message" @retry="refresh" />

    <!-- RESULT -->
    <template v-else-if="shown">
      <section class="card overflow-hidden">
        <div class="p-6 text-center" :class="shown.attempt.passed ? 'bg-emerald-50' : 'bg-rose-50'">
          <p class="text-xs font-bold uppercase tracking-widest" :class="shown.attempt.passed ? 'text-emerald-600' : 'text-rose-600'">
            {{ shown.attempt.passed ? 'Passed' : 'Not passed' }}
            <template v-if="shown.attempt.status === 'expired'"> · time ran out</template>
          </p>
          <h1 class="mt-1 text-lg font-bold text-gray-900">{{ shown.exam.title }}</h1>
          <p class="mt-3 text-5xl font-extrabold text-gray-900">{{ shown.attempt.score }}<span class="text-xl font-semibold text-gray-400"> / {{ shown.attempt.total_marks }}</span></p>
          <p class="mt-1 text-sm text-gray-600">{{ shown.attempt.percentage }}% · pass mark {{ shown.attempt.pass_percentage }}%</p>
        </div>
        <dl class="grid grid-cols-2 divide-x divide-y divide-gray-100 text-center sm:grid-cols-4 sm:divide-y-0">
          <div class="p-4"><dt class="text-[11px] text-gray-400">Correct</dt><dd class="text-xl font-extrabold text-emerald-600">{{ shown.attempt.correct_count }}</dd></div>
          <div class="p-4"><dt class="text-[11px] text-gray-400">Wrong</dt><dd class="text-xl font-extrabold text-rose-600">{{ shown.attempt.wrong_count }}</dd></div>
          <div class="p-4"><dt class="text-[11px] text-gray-400">Unanswered</dt><dd class="text-xl font-extrabold text-gray-700">{{ shown.attempt.unanswered_count }}</dd></div>
          <div class="p-4"><dt class="text-[11px] text-gray-400">Negative marks</dt><dd class="text-xl font-extrabold" :class="shown.attempt.negative_marks_total ? 'text-rose-600' : 'text-gray-700'">−{{ shown.attempt.negative_marks_total }}</dd></div>
        </dl>
        <p v-if="shown.attempt.negative_marking" class="border-t border-gray-100 px-5 py-3 text-center text-xs text-gray-500">{{ negativeMarkingLabel(shown.exam) }}</p>
        <div class="flex flex-wrap justify-center gap-2 border-t border-gray-100 p-4">
          <NuxtLink :to="`/exams/${shown.exam.id}`" class="btn-primary">Back to exam</NuxtLink>
          <NuxtLink to="/exams" class="btn-secondary">All exams</NuxtLink>
        </div>
      </section>

      <section class="mt-6">
        <h2 class="text-base font-bold text-gray-900">Review</h2>
        <p v-if="!shown.answers_visible" class="mt-1 text-xs text-gray-500">
          Correct answers are hidden for this exam{{ shown.exam.show_answers === 'after_exam_end' ? ' until it closes' : '' }}.
        </p>
        <ol class="mt-3 space-y-3">
          <li v-for="(item, index) in shown.review" :key="item.question_id" class="rounded-2xl border p-4" :class="statusStyle[item.status]">
            <div class="flex items-start justify-between gap-3">
              <p class="text-sm font-semibold text-gray-900">{{ index + 1 }}. {{ item.question }}</p>
              <span class="shrink-0 text-xs font-bold" :class="item.awarded > 0 ? 'text-emerald-600' : item.awarded < 0 ? 'text-rose-600' : 'text-gray-400'">
                {{ item.awarded > 0 ? '+' : '' }}{{ item.awarded }} / {{ item.marks }}
              </span>
            </div>
            <ul class="mt-3 space-y-1.5">
              <li
                v-for="option in item.options"
                :key="option.id"
                class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                :class="[
                  item.correct_answers?.includes(String(option.id)) ? 'bg-emerald-100 font-semibold text-emerald-800' : item.selected.includes(String(option.id)) ? 'bg-rose-100 text-rose-800' : 'bg-white text-gray-700',
                ]"
              >
                <span class="flex-1">{{ option.text }}</span>
                <span v-if="item.selected.includes(String(option.id))" class="text-[11px] font-semibold">Your answer</span>
                <span v-if="item.correct_answers?.includes(String(option.id))" class="text-[11px] font-semibold">Correct</span>
              </li>
            </ul>
            <p v-if="item.status === 'unanswered'" class="mt-2 text-xs text-gray-500">You skipped this question (no penalty).</p>
            <p v-if="item.explanation" class="mt-2 rounded-lg bg-white/70 p-3 text-xs leading-5 text-gray-600"><span class="font-semibold">Explanation:</span> {{ item.explanation }}</p>
          </li>
        </ol>
      </section>
    </template>

    <!-- TAKING -->
    <template v-else-if="take && question">
      <div class="sticky top-0 z-30 -mx-4 mb-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <div class="flex items-center justify-between gap-3">
          <div class="min-w-0">
            <p class="truncate text-sm font-bold text-gray-900">{{ take.exam.title }}</p>
            <p class="text-[11px] text-gray-400">
              {{ answeredCount }}/{{ questions.length }} answered ·
              <span :class="saveState === 'error' ? 'text-rose-500' : ''">{{ saveState === 'saving' ? 'Saving…' : saveState === 'error' ? 'Not saved — retrying' : saveState === 'saved' ? 'All answers saved' : '' }}</span>
            </p>
          </div>
          <div class="flex items-center gap-3">
            <span class="rounded-xl px-3 py-1.5 font-mono text-lg font-extrabold tabular-nums" :class="lowTime ? 'animate-pulse bg-rose-100 text-rose-600' : 'bg-gray-100 text-gray-800'">{{ formatClock(secondsLeft) }}</span>
            <button type="button" class="btn-primary" :disabled="submitting" @click="submit()">{{ submitting ? 'Submitting…' : 'Submit' }}</button>
          </div>
        </div>
      </div>

      <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
        <section class="card p-5 md:p-6">
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span class="font-semibold">Question {{ current + 1 }} of {{ questions.length }}</span>
            <span>
              {{ question.marks }} mark{{ question.marks === 1 ? '' : 's' }}
              <span v-if="take.attempt.negative_marking && question.negative_marks" class="ml-2 font-semibold text-rose-600">−{{ question.negative_marks }} if wrong</span>
            </span>
          </div>
          <h2 class="mt-3 whitespace-pre-line text-base font-semibold leading-7 text-gray-900">{{ question.question }}</h2>
          <p v-if="question.type === 'multiple_choice'" class="mt-1 text-xs text-gray-500">Select all that apply. Every correct option is needed for marks.</p>

          <ul class="mt-4 space-y-2">
            <li v-for="option in question.options" :key="option.id">
              <button
                type="button"
                class="flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition"
                :class="selected(question, option.id) ? 'border-oc-primary bg-brand-light font-semibold text-gray-900' : 'border-gray-200 hover:border-gray-300'"
                @click="choose(question, option.id)"
              >
                <span
                  class="flex h-5 w-5 shrink-0 items-center justify-center border-2"
                  :class="[question.type === 'multiple_choice' ? 'rounded' : 'rounded-full', selected(question, option.id) ? 'border-oc-primary bg-oc-primary text-white' : 'border-gray-300']"
                >
                  <BaseIcon v-if="selected(question, option.id)" name="check" :size="12" />
                </span>
                {{ option.text }}
              </button>
            </li>
          </ul>

          <div class="mt-5 flex flex-wrap items-center justify-between gap-2">
            <div class="flex gap-2">
              <button type="button" class="btn-secondary" :disabled="current === 0" @click="current--"><BaseIcon name="arrow-left" :size="14" /> Previous</button>
              <button type="button" class="btn-secondary" :disabled="current === questions.length - 1" @click="current++">Next <BaseIcon name="arrow-right" :size="14" /></button>
            </div>
            <div class="flex gap-2">
              <button v-if="(answers[question.id] ?? []).length" type="button" class="btn-ghost text-xs" @click="clearAnswer(question)">Clear answer</button>
              <button type="button" class="btn-ghost text-xs" :class="flagged[question.id] ? 'text-amber-600' : ''" @click="flagged[question.id] = !flagged[question.id]">
                {{ flagged[question.id] ? 'Unmark review' : 'Mark for review' }}
              </button>
            </div>
          </div>
        </section>

        <aside class="card h-fit p-4 lg:sticky lg:top-24">
          <p class="text-xs font-bold uppercase tracking-wide text-gray-400">Questions</p>
          <div class="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-5">
            <button
              v-for="(q, index) in questions"
              :key="q.id"
              type="button"
              class="relative h-9 rounded-lg text-xs font-bold transition"
              :class="[
                index === current ? 'ring-2 ring-oc-primary' : '',
                (answers[q.id] ?? []).length ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
              ]"
              @click="current = index"
            >
              {{ index + 1 }}
              <span v-if="flagged[q.id]" class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-400" />
            </button>
          </div>
          <p class="mt-3 text-[11px] text-gray-400">Blue = answered · grey = not answered · yellow dot = marked for review</p>
        </aside>
      </div>
    </template>

    <EmptyState v-else icon="list" title="Attempt unavailable" message="This attempt could not be loaded." action-label="Back to exams" action-to="/exams" />
  </div>
</template>
