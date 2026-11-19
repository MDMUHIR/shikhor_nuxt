<script setup lang="ts">
import type { QuizAttempt, QuizDetail, QuizReviewItem } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const id = Number(route.params.id)
const attemptId = Number(route.params.attemptId)
const courseSlug = computed(() => String(route.query.course || ''))
const { apiData } = useApi()

const { data, pending, error, refresh } = await useAsyncData(`quiz-result-${attemptId}`, async () => {
  const attempt = await apiData<QuizAttempt>(`/quiz-attempts/${attemptId}`)
  const quiz = await apiData<QuizDetail>(`/quizzes/${id}`).catch(() => null)
  return { attempt, quiz }
})

const review = useState<QuizReviewItem[] | null>(`quiz-review-${attemptId}`, () => null)

const attempt = computed(() => data.value?.attempt ?? null)
const quiz = computed(() => data.value?.quiz ?? null)

const questionsById = computed(() => {
  const map = new Map<number, { question: string; options: Array<{ id: string; text: string }> }>()
  for (const question of quiz.value?.questions ?? []) {
    map.set(question.id, { question: question.question, options: question.options })
  }
  return map
})

function optionText(questionId: number, optionId: string) {
  const question = questionsById.value.get(questionId)
  return question?.options?.find((option) => option.id === optionId)?.text ?? optionId
}

function selectedTexts(questionId: number) {
  const selected = attempt.value?.answers?.[String(questionId)] ?? []
  return selected.map((optionId) => optionText(questionId, optionId))
}

const reviewRows = computed(() => {
  if (review.value?.length) {
    return review.value.map((item) => ({
      questionId: item.question_id,
      question: questionsById.value.get(item.question_id)?.question ?? `Question #${item.question_id}`,
      selected: item.selected.map((optionId) => optionText(item.question_id, optionId)),
      correct: item.correct_answers.map((optionId) => optionText(item.question_id, optionId)),
      isCorrect: item.is_correct,
      marks: item.marks,
    }))
  }
  return (quiz.value?.questions ?? []).map((question) => ({
    questionId: question.id,
    question: question.question,
    selected: selectedTexts(question.id),
    correct: [] as string[],
    isCorrect: null as boolean | null,
    marks: question.marks,
  }))
})

const backTo = computed(() => (courseSlug.value ? `/learn/${courseSlug.value}` : '/my-courses'))

useSeoMeta({
  title: () => (quiz.value ? `${quiz.value.title} — Result` : 'Quiz result — Shikhor Academy'),
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[820px] px-4 py-8 md:px-6 md:py-10">
    <div v-if="pending" class="space-y-4">
      <div class="card h-48 animate-pulse bg-gray-100" />
      <div class="card h-64 animate-pulse bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" title="Could not load this result" :message="error.message" @retry="refresh" />

    <template v-else-if="attempt">
      <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
        <NuxtLink :to="backTo" class="hover:text-oc-primary">Learning</NuxtLink>
        <span class="mx-1.5">/</span>
        <NuxtLink :to="`/quizzes/${id}${courseSlug ? `?course=${courseSlug}` : ''}`" class="hover:text-oc-primary">Quiz</NuxtLink>
        <span class="mx-1.5">/</span>
        <span class="text-gray-700">Result</span>
      </nav>

      <section
        class="overflow-hidden rounded-2xl p-6 text-center text-white md:p-8"
        :class="attempt.passed ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-rose-600 to-orange-500'"
      >
        <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <BaseIcon :name="attempt.passed ? 'award' : 'rotate-ccw'" :size="32" />
        </span>
        <h1 class="mt-3 text-2xl font-extrabold">{{ attempt.passed ? 'Congratulations!' : 'Keep practising' }}</h1>
        <p class="mt-1 text-sm text-white/85">
          {{ attempt.passed ? 'You passed this quiz.' : 'You did not reach the pass mark this time.' }}
        </p>
        <div class="mx-auto mt-5 grid max-w-md grid-cols-3 gap-2">
          <div class="rounded-xl bg-white/15 p-3">
            <p class="text-[11px] uppercase tracking-wide text-white/70">Score</p>
            <p class="text-xl font-extrabold">{{ attempt.score }}/{{ attempt.total_marks }}</p>
          </div>
          <div class="rounded-xl bg-white/15 p-3">
            <p class="text-[11px] uppercase tracking-wide text-white/70">Percentage</p>
            <p class="text-xl font-extrabold">{{ Math.round(attempt.percentage) }}%</p>
          </div>
          <div class="rounded-xl bg-white/15 p-3">
            <p class="text-[11px] uppercase tracking-wide text-white/70">Pass mark</p>
            <p class="text-xl font-extrabold">{{ quiz?.pass_percentage ?? '—' }}%</p>
          </div>
        </div>
      </section>

      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p class="text-xs text-gray-500">Submitted {{ formatDate(attempt.completed_at, true) }}</p>
        <div class="flex gap-2">
          <NuxtLink :to="backTo" class="btn-secondary">Back to course</NuxtLink>
          <NuxtLink :to="`/quizzes/${id}${courseSlug ? `?course=${courseSlug}` : ''}`" class="btn-primary">
            <BaseIcon name="rotate-ccw" :size="15" /> Try again
          </NuxtLink>
        </div>
      </div>

      <section v-if="!review && quiz" class="mt-4 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-700">
        <BaseIcon name="info" :size="16" class="mt-0.5 shrink-0" />
        Detailed correct answers are shown immediately after submitting. You can still review the answers you chose below.
      </section>

      <section v-if="reviewRows.length" class="mt-5 space-y-3">
        <h2 class="text-sm font-bold text-gray-900">Answer review</h2>
        <article v-for="(row, index) in reviewRows" :key="row.questionId" class="card p-4">
          <div class="flex items-start justify-between gap-3">
            <p class="text-sm font-semibold text-gray-900">{{ index + 1 }}. {{ row.question }}</p>
            <span
              v-if="row.isCorrect !== null"
              class="badge shrink-0"
              :class="row.isCorrect ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'"
            >
              {{ row.isCorrect ? 'Correct' : 'Incorrect' }}
            </span>
            <span v-else class="badge shrink-0 bg-gray-50 text-gray-600 ring-gray-200">{{ row.marks }} mark{{ row.marks === 1 ? '' : 's' }}</span>
          </div>
          <div class="mt-2 space-y-1 text-xs">
            <p class="text-gray-500">
              Your answer:
              <span class="font-semibold text-gray-800">{{ row.selected.length ? row.selected.join(', ') : 'Not answered' }}</span>
            </p>
            <p v-if="row.correct.length" class="text-gray-500">
              Correct answer:
              <span class="font-semibold text-emerald-700">{{ row.correct.join(', ') }}</span>
            </p>
          </div>
        </article>
      </section>
    </template>
  </div>
</template>
