<script setup lang="ts">
import type { ExamAttemptSummary, ExamInfo } from '~/utils/exam'

interface ExamDetail extends ExamInfo {
  can_take: boolean
  blocked_reason: string | null
  attempts_used: number
  attempts_left: number | null
  in_progress_attempt_id: number | null
  attempts: ExamAttemptSummary[]
}

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const id = Number(route.params.id)
const { apiData } = useApi()
const toast = useToast()

const { data: exam, pending, error, refresh } = await useAsyncData(`exam-${id}`, () => apiData<ExamDetail>(`/exams/${id}`))

const starting = ref(false)

const canStart = computed(() => {
  const e = exam.value
  if (!e || !e.can_take) return false
  if (e.in_progress_attempt_id) return true
  return e.state === 'open' && (e.attempts_left === null || e.attempts_left > 0)
})

async function start() {
  starting.value = true
  try {
    const data = await apiData<{ attempt: { id: number } }>(`/exams/${id}/start`, { method: 'POST' })
    await navigateTo(`/exams/attempt/${data.attempt.id}`)
  } catch (err) {
    toast.error((err as Error).message)
    await refresh()
  } finally {
    starting.value = false
  }
}

useSeoMeta({ title: () => `${exam.value?.title ?? 'Exam'} — Shikhor Academy`, robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[860px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/exams" class="hover:text-oc-primary">Exams</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">{{ exam?.title }}</span>
    </nav>

    <div v-if="pending" class="card h-64 animate-pulse bg-gray-50" />
    <ErrorState v-else-if="error" title="Could not load this exam" :message="error.message" @retry="refresh" />

    <template v-else-if="exam">
      <section class="card p-6">
        <h1 class="text-2xl font-extrabold text-gray-900">{{ exam.title }}</h1>
        <p v-if="exam.course" class="mt-1 text-sm text-gray-500">Course: {{ exam.course.title }}</p>
        <p v-if="exam.description" class="mt-3 text-sm leading-6 text-gray-600">{{ exam.description }}</p>

        <dl class="mt-5 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
          <div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Questions</dt><dd class="text-lg font-extrabold text-gray-900">{{ exam.questions_count }}</dd></div>
          <div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Duration</dt><dd class="text-lg font-extrabold text-gray-900">{{ exam.duration_minutes }} min</dd></div>
          <div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Total marks</dt><dd class="text-lg font-extrabold text-gray-900">{{ exam.total_marks }}</dd></div>
          <div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Pass mark</dt><dd class="text-lg font-extrabold text-gray-900">{{ exam.pass_percentage }}%</dd></div>
        </dl>

        <ul class="mt-5 space-y-2 text-sm text-gray-700">
          <li class="flex gap-2">
            <BaseIcon name="alert-circle" :size="16" class="mt-0.5 shrink-0" :class="exam.negative_marking ? 'text-rose-500' : 'text-gray-400'" />
            <span :class="exam.negative_marking ? 'font-semibold text-rose-600' : ''">{{ negativeMarkingLabel(exam) }}<template v-if="exam.negative_marking"> · unanswered questions are never penalised<template v-if="!exam.allow_negative_total"> · your total cannot drop below 0</template></template></span>
          </li>
          <li class="flex gap-2"><BaseIcon name="clock" :size="16" class="mt-0.5 shrink-0 text-gray-400" /> The timer is kept by the server and keeps running if you leave. When it ends your answers are submitted automatically.</li>
          <li class="flex gap-2"><BaseIcon name="check-circle" :size="16" class="mt-0.5 shrink-0 text-gray-400" /> Marks and result appear instantly after you submit.</li>
          <li v-if="exam.max_attempts" class="flex gap-2"><BaseIcon name="refresh" :size="16" class="mt-0.5 shrink-0 text-gray-400" /> {{ exam.attempts_left }} of {{ exam.max_attempts }} attempts left.</li>
          <li v-if="exam.starts_at || exam.ends_at" class="flex gap-2"><BaseIcon name="calendar" :size="16" class="mt-0.5 shrink-0 text-gray-400" /> Open {{ exam.starts_at ? formatDate(exam.starts_at, true) : 'now' }} → {{ exam.ends_at ? formatDate(exam.ends_at, true) : 'no end date' }}</li>
        </ul>

        <div v-if="exam.instructions" class="mt-5 rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-6 text-gray-700">
          <p class="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">Instructions</p>
          <p class="whitespace-pre-line">{{ exam.instructions }}</p>
        </div>

        <p v-if="!exam.can_take" class="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {{ exam.blocked_reason }}
          <NuxtLink v-if="exam.course" :to="`/courses/${exam.course.slug}`" class="font-semibold underline">View course</NuxtLink>
        </p>
        <p v-else-if="exam.state === 'upcoming'" class="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">This exam has not started yet.</p>
        <p v-else-if="exam.state === 'closed' && !exam.in_progress_attempt_id" class="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">This exam is closed.</p>
        <p v-else-if="exam.attempts_left === 0 && !exam.in_progress_attempt_id" class="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">You have used all of your attempts.</p>

        <button v-if="canStart" type="button" class="btn-primary mt-6 w-full sm:w-auto" :disabled="starting" @click="start">
          <BaseIcon name="play" :size="16" />
          {{ starting ? 'Starting…' : exam.in_progress_attempt_id ? 'Resume exam' : 'Start exam' }}
        </button>
      </section>

      <section v-if="exam.attempts.length" class="card mt-5 p-5">
        <h2 class="text-sm font-bold text-gray-900">Your attempts</h2>
        <ul class="mt-3 divide-y divide-gray-100">
          <li v-for="(attempt, index) in exam.attempts" :key="attempt.id" class="flex flex-wrap items-center justify-between gap-3 py-3">
            <div>
              <p class="text-sm font-semibold text-gray-800">Attempt {{ exam.attempts.length - index }}</p>
              <p class="text-[11px] text-gray-400">{{ formatDate(attempt.submitted_at, true) }}<span v-if="attempt.status === 'expired'"> · auto-submitted (time up)</span></p>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-sm font-bold text-gray-900">{{ attempt.score }}/{{ attempt.total_marks }} <span class="text-xs font-normal text-gray-400">({{ attempt.percentage }}%)</span></span>
              <span class="badge" :class="attempt.passed ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'">{{ attempt.passed ? 'Passed' : 'Not passed' }}</span>
              <NuxtLink :to="`/exams/attempt/${attempt.id}`" class="btn-secondary !px-3 !py-1.5 text-xs">Result</NuxtLink>
            </div>
          </li>
        </ul>
      </section>
    </template>
  </div>
</template>
