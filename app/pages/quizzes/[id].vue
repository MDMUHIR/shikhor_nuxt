<script setup lang="ts">
import type { QuizDetail, QuizQuestion, QuizReviewItem } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const id = Number(route.params.id)
const courseSlug = computed(() => String(route.query.course || ''))
const { apiData, apiFetch } = useApi()
const toast = useToast()

const { data: quiz, pending, error, refresh } = await useAsyncData(`quiz-${id}`, () =>
  apiData<QuizDetail>(`/quizzes/${id}`),
)

const answers = reactive<Record<number, string[]>>({})
const submitting = ref(false)
const formError = ref('')
const remainingSeconds = ref<number | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

const totalQuestions = computed(() => quiz.value?.questions?.length ?? 0)
const answeredCount = computed(
  () => quiz.value?.questions?.filter((question) => (answers[question.id] || []).length > 0).length ?? 0,
)
const attemptsLeft = computed(() => quiz.value?.attempts_remaining)
const canAttempt = computed(() => attemptsLeft.value === null || (attemptsLeft.value ?? 0) > 0)

const timeLabel = computed(() => {
  if (remainingSeconds.value === null) return ''
  const minutes = Math.floor(remainingSeconds.value / 60)
  const seconds = remainingSeconds.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

function optionsOf(question: QuizQuestion) {
  return question.options || []
}

function isChecked(question: QuizQuestion, optionId: string) {
  return (answers[question.id] || []).includes(optionId)
}

function toggleOption(question: QuizQuestion, optionId: string) {
  if (question.type === 'multiple_choice') {
    const current = new Set(answers[question.id] || [])
    if (current.has(optionId)) current.delete(optionId)
    else current.add(optionId)
    answers[question.id] = [...current]
  } else {
    answers[question.id] = [optionId]
  }
}

async function submit() {
  if (!quiz.value) return
  if (!canAttempt.value) {
    toast.error('You have used all of your attempts for this quiz.')
    return
  }
  formError.value = ''
  submitting.value = true
  try {
    const payload: Record<number, string[]> = {}
    for (const question of quiz.value.questions) {
      payload[question.id] = answers[question.id] || []
    }
    const response = await apiFetch<{
      data: {
        attempt: { id: number; passed: boolean; percentage: number }
        passed: boolean
        review: QuizReviewItem[]
        progress: unknown
      }
    }>(`/quizzes/${id}/submit`, { method: 'POST', body: { answers: payload } })

    const attemptId = response.data.attempt.id
    useState<QuizReviewItem[] | null>(`quiz-review-${attemptId}`, () => null).value = response.data.review
    toast.success(response.data.passed ? 'You passed the quiz!' : 'Quiz submitted.')
    if (timer) clearInterval(timer)
    await navigateTo({
      path: `/quizzes/${id}/result/${attemptId}`,
      query: courseSlug.value ? { course: courseSlug.value } : {},
    })
  } catch (err) {
    formError.value = (err as Error).message
    toast.error(formError.value)
  } finally {
    submitting.value = false
  }
}

function startTimer() {
  if (!quiz.value?.time_limit_minutes) return
  remainingSeconds.value = quiz.value.time_limit_minutes * 60
  timer = setInterval(() => {
    if (remainingSeconds.value === null) return
    remainingSeconds.value -= 1
    if (remainingSeconds.value <= 0) {
      remainingSeconds.value = 0
      if (timer) clearInterval(timer)
      if (!submitting.value) {
        toast.info('Time is up — submitting your answers.')
        submit()
      }
    }
  }, 1000)
}

onMounted(startTimer)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

useSeoMeta({
  title: () => (quiz.value ? `${quiz.value.title} — Quiz` : 'Quiz — Shikhor Academy'),
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[860px] px-4 py-8 md:px-6 md:py-10">
    <div v-if="pending" class="space-y-4">
      <div class="card h-40 animate-pulse bg-gray-100" />
      <div v-for="i in 3" :key="i" class="card h-44 animate-pulse bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" title="Quiz unavailable" :message="error.message" @retry="refresh">
      <NuxtLink :to="courseSlug ? `/learn/${courseSlug}` : '/my-courses'" class="btn-primary">Back to course</NuxtLink>
    </ErrorState>

    <template v-else-if="quiz">
      <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
        <NuxtLink :to="courseSlug ? `/learn/${courseSlug}` : '/my-courses'" class="hover:text-oc-primary">Learning</NuxtLink>
        <span class="mx-1.5">/</span>
        <span class="text-gray-700">{{ quiz.title }}</span>
      </nav>

      <div class="card p-6">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Quiz</p>
            <h1 class="mt-1 text-2xl font-extrabold text-gray-900">{{ quiz.title }}</h1>
            <p v-if="quiz.description" class="mt-2 text-sm text-gray-600">{{ quiz.description }}</p>
          </div>
          <div v-if="remainingSeconds !== null" class="rounded-xl bg-rose-50 px-4 py-2 text-center">
            <p class="text-[11px] font-semibold uppercase tracking-wide text-rose-500">Time left</p>
            <p class="text-xl font-extrabold text-rose-600">{{ timeLabel }}</p>
          </div>
        </div>

        <dl class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div class="rounded-xl bg-gray-50 p-3 text-center">
            <dt class="text-[11px] uppercase tracking-wide text-gray-400">Questions</dt>
            <dd class="text-lg font-extrabold text-gray-900">{{ totalQuestions }}</dd>
          </div>
          <div class="rounded-xl bg-gray-50 p-3 text-center">
            <dt class="text-[11px] uppercase tracking-wide text-gray-400">Total marks</dt>
            <dd class="text-lg font-extrabold text-gray-900">{{ quiz.total_marks }}</dd>
          </div>
          <div class="rounded-xl bg-gray-50 p-3 text-center">
            <dt class="text-[11px] uppercase tracking-wide text-gray-400">Pass mark</dt>
            <dd class="text-lg font-extrabold text-gray-900">{{ quiz.pass_percentage }}%</dd>
          </div>
          <div class="rounded-xl bg-gray-50 p-3 text-center">
            <dt class="text-[11px] uppercase tracking-wide text-gray-400">Attempts left</dt>
            <dd class="text-lg font-extrabold text-gray-900">{{ quiz.attempts_remaining === null ? '∞' : quiz.attempts_remaining }}</dd>
          </div>
        </dl>

        <div v-if="quiz.has_passed" class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <BaseIcon name="check-circle" :size="18" /> You have already passed this quiz with a best score of {{ Math.round(quiz.best_percentage) }}%.
        </div>
        <div v-else-if="!canAttempt" class="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          <BaseIcon name="alert-circle" :size="18" /> You have used all of your attempts for this quiz.
        </div>
      </div>

      <form class="mt-5 space-y-4" @submit.prevent="submit">
        <article v-for="(question, index) in quiz.questions" :key="question.id" class="card p-5">
          <div class="flex items-start justify-between gap-3">
            <div class="flex gap-2">
              <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">{{ index + 1 }}</span>
              <div>
                <p class="text-sm font-semibold leading-6 text-gray-900">{{ question.question }}</p>
                <p class="mt-1 text-[11px] text-gray-400">
                  {{ question.type === 'multiple_choice' ? 'Select all that apply' : 'Select one answer' }} · {{ question.marks }} mark{{ question.marks === 1 ? '' : 's' }}
                </p>
              </div>
            </div>
            <span v-if="(answers[question.id] || []).length" class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Answered</span>
          </div>

          <div class="mt-3 space-y-2 pl-9">
            <label
              v-for="option in optionsOf(question)"
              :key="option.id"
              class="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition"
              :class="isChecked(question, option.id) ? 'border-oc-primary bg-brand-light' : 'border-gray-200 hover:border-gray-300'"
            >
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
                :checked="isChecked(question, option.id)"
                :name="`question-${question.id}`"
                @change="toggleOption(question, option.id)"
              >
              <span class="text-gray-700">{{ option.text }}</span>
            </label>
          </div>
        </article>

        <div class="sticky bottom-4 card flex flex-wrap items-center justify-between gap-3 p-4">
          <p class="text-sm text-gray-600">
            <strong class="text-gray-900">{{ answeredCount }}</strong> / {{ totalQuestions }} answered
          </p>
          <div class="flex items-center gap-2">
            <NuxtLink :to="courseSlug ? `/learn/${courseSlug}` : '/my-courses'" class="btn-secondary">Exit</NuxtLink>
            <button type="submit" class="btn-primary" :disabled="submitting || !canAttempt">
              <BaseIcon name="check" :size="16" />
              {{ submitting ? 'Submitting…' : 'Submit quiz' }}
            </button>
          </div>
        </div>
        <p v-if="formError" class="field-error">{{ formError }}</p>
      </form>
    </template>
  </div>
</template>
