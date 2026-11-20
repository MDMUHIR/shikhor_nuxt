<script setup lang="ts">
import type { ExamListItem } from '~/utils/exam'

definePageMeta({ middleware: 'auth' })

useSeoMeta({ title: 'Exams — Shikhor Academy', robots: 'noindex' })

const { apiData } = useApi()

const { data, pending, error, refresh } = await useAsyncData('exams-list', () => apiData<ExamListItem[]>('/exams'))

const filter = ref<'all' | 'open' | 'upcoming' | 'done'>('all')

const exams = computed(() => {
  const list = data.value ?? []
  if (filter.value === 'open') return list.filter((e) => e.state === 'open')
  if (filter.value === 'upcoming') return list.filter((e) => e.state === 'upcoming')
  if (filter.value === 'done') return list.filter((e) => e.attempts_used > 0)
  return list
})

function badge(exam: ExamListItem) {
  if (exam.in_progress_attempt_id) return { label: 'In progress', cls: 'bg-blue-50 text-blue-700 ring-blue-200' }
  if (exam.state === 'upcoming') return { label: 'Upcoming', cls: 'bg-amber-50 text-amber-700 ring-amber-200' }
  if (exam.state === 'closed') return { label: 'Closed', cls: 'bg-gray-50 text-gray-600 ring-gray-200' }
  return { label: 'Open', cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
}
</script>

<template>
  <div class="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10">
    <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Exams</h1>
    <p class="mt-1 text-sm text-gray-500">Timed exams are marked automatically the moment you submit.</p>

    <div class="mt-5 flex flex-wrap gap-1.5">
      <button
        v-for="item in [{ value: 'all', label: 'All' }, { value: 'open', label: 'Open now' }, { value: 'upcoming', label: 'Upcoming' }, { value: 'done', label: 'Attempted' }]"
        :key="item.value"
        type="button"
        class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
        :class="filter === item.value ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="filter = item.value as typeof filter"
      >
        {{ item.label }}
      </button>
    </div>

    <div v-if="pending" class="mt-6 grid gap-4 md:grid-cols-2">
      <div v-for="i in 4" :key="i" class="card h-40 animate-pulse bg-gray-50" />
    </div>
    <ErrorState v-else-if="error" class="mt-6" title="Could not load exams" :message="error.message" @retry="refresh" />
    <EmptyState v-else-if="!exams.length" class="mt-6" icon="list" title="No exams here" message="Exams from your enrolled courses and open mock tests appear here." />

    <div v-else class="mt-6 grid gap-4 md:grid-cols-2">
      <NuxtLink v-for="exam in exams" :key="exam.id" :to="`/exams/${exam.id}`" class="card flex flex-col p-5 transition hover:border-oc-primary">
        <div class="flex items-start justify-between gap-3">
          <h2 class="text-base font-bold text-gray-900">{{ exam.title }}</h2>
          <span class="badge shrink-0" :class="badge(exam).cls">{{ badge(exam).label }}</span>
        </div>
        <p v-if="exam.course" class="mt-1 text-xs text-gray-500">{{ exam.course.title }}</p>
        <dl class="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
          <div class="rounded-lg bg-gray-50 p-2"><dt class="text-gray-400">Questions</dt><dd class="text-sm font-bold text-gray-800">{{ exam.questions_count }}</dd></div>
          <div class="rounded-lg bg-gray-50 p-2"><dt class="text-gray-400">Time</dt><dd class="text-sm font-bold text-gray-800">{{ exam.duration_minutes }} min</dd></div>
          <div class="rounded-lg bg-gray-50 p-2"><dt class="text-gray-400">Marks</dt><dd class="text-sm font-bold text-gray-800">{{ exam.total_marks }}</dd></div>
        </dl>
        <p class="mt-3 text-[11px]" :class="exam.negative_marking ? 'font-semibold text-rose-600' : 'text-gray-400'">{{ negativeMarkingLabel(exam) }}</p>
        <p v-if="exam.best_percentage !== null" class="mt-2 text-xs text-gray-600">
          Best score: <span class="font-bold" :class="exam.passed ? 'text-emerald-600' : 'text-gray-800'">{{ exam.best_percentage }}%</span>
          · {{ exam.attempts_used }} attempt{{ exam.attempts_used === 1 ? '' : 's' }}
        </p>
        <p v-if="exam.state === 'upcoming' && exam.starts_at" class="mt-2 text-xs text-amber-700">Starts {{ formatDate(exam.starts_at, true) }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
