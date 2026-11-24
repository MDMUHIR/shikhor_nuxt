<script setup lang="ts">
import type { Course, Paginator } from '~/utils/types'

interface ExamRow {
  id: number
  title: string
  is_published: boolean
  questions_count: number
  attempts_count: number
  course: { title: string } | null
}

const { apiData } = useApi()
const { user } = useAuth()

const [{ data: courses, pending, error, refresh }, { data: exams }] = await Promise.all([
  useAsyncData('instructor-courses', () => apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 50 } })),
  useAsyncData('instructor-exams', () => apiData<ExamRow[]>('/admin/exams').catch(() => [] as ExamRow[])),
])

const list = computed(() => courses.value?.data ?? [])
const awaiting = computed(() => list.value.filter((course) => course.status === 'under_review'))
const totalStudents = computed(() => list.value.reduce((sum, course) => sum + Number(course.total_students ?? 0), 0))

const guide: Record<string, string> = {
  draft: 'Only you can see this course.',
  under_review: 'Waiting for an administrator to publish it.',
  published: 'Live for students.',
  unpublished: 'Hidden from the catalog.',
  archived: 'Archived.',
}
</script>

<template>
  <div>
    <div class="card mb-5 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-brand-light to-white p-5">
      <div>
        <p class="eyebrow">Instructor</p>
        <h2 class="mt-1 text-xl font-extrabold text-gray-900">Welcome back, {{ user?.name }}</h2>
        <p class="mt-1 text-sm text-gray-500">Manage your courses, lessons, quizzes, files and exams. An administrator publishes courses and handles enrollments.</p>
      </div>
      <div class="flex flex-wrap gap-2">
        <NuxtLink to="/admin/courses/new" class="btn-primary"><BaseIcon name="plus" :size="16" /> New course</NuxtLink>
        <NuxtLink to="/admin/exams" class="btn-secondary"><BaseIcon name="list" :size="16" /> Exams</NuxtLink>
      </div>
    </div>

    <p v-if="awaiting.length" class="mb-5 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
      <BaseIcon name="alert-circle" :size="18" class="mt-0.5 shrink-0" />
      {{ awaiting.length }} course{{ awaiting.length === 1 ? ' is' : 's are' }} waiting for administrator approval before students can see {{ awaiting.length === 1 ? 'it' : 'them' }}.
    </p>

    <AdminAnalytics />

    <section class="card overflow-hidden">
      <div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <div>
          <h2 class="text-sm font-bold text-gray-900">My courses</h2>
          <p class="text-xs text-gray-500">{{ list.length }} course{{ list.length === 1 ? '' : 's' }} · {{ totalStudents }} student{{ totalStudents === 1 ? '' : 's' }}</p>
        </div>
        <NuxtLink to="/admin/courses" class="text-xs font-semibold text-oc-primary hover:underline">Manage all</NuxtLink>
      </div>

      <div v-if="pending" class="space-y-2 p-4"><div v-for="i in 3" :key="i" class="h-12 animate-pulse rounded-lg bg-gray-50" /></div>
      <ErrorState v-else-if="error" class="m-4" title="Could not load your courses" :message="error.message" @retry="refresh" />
      <EmptyState v-else-if="!list.length" class="m-4" icon="book-open" title="No courses yet" message="Create your first course, add lessons and submit it for review." action-label="Create a course" action-to="/admin/courses/new" />

      <ul v-else class="divide-y divide-gray-50">
        <li v-for="course in list" :key="course.id" class="flex flex-wrap items-center gap-3 px-5 py-3">
          <div class="min-w-0 flex-1">
            <NuxtLink :to="`/admin/courses/${course.id}`" class="block truncate text-sm font-semibold text-gray-900 hover:text-oc-primary">{{ course.title }}</NuxtLink>
            <p class="text-[11px] text-gray-400">{{ guide[course.status] }}</p>
          </div>
          <span class="text-xs text-gray-500">{{ course.total_lessons }} lessons · {{ course.total_students }} students<template v-if="course.rating?.count"> · ★ {{ course.rating.average }}</template></span>
          <StatusBadge :status="course.status" />
          <NuxtLink :to="`/community/${course.slug}`" class="btn-secondary !px-2.5 !py-1.5 text-xs"><BaseIcon name="video" :size="14" /> Live &amp; announcements</NuxtLink>
          <NuxtLink :to="`/admin/courses/${course.id}`" class="btn-secondary !px-2.5 !py-1.5 text-xs"><BaseIcon name="edit" :size="14" /> Edit</NuxtLink>
        </li>
      </ul>
    </section>

    <section v-if="exams?.length" class="card mt-5 overflow-hidden">
      <div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <h2 class="text-sm font-bold text-gray-900">My exams</h2>
        <NuxtLink to="/admin/exams" class="text-xs font-semibold text-oc-primary hover:underline">Manage exams</NuxtLink>
      </div>
      <ul class="divide-y divide-gray-50">
        <li v-for="exam in exams.slice(0, 5)" :key="exam.id" class="flex flex-wrap items-center gap-3 px-5 py-3">
          <NuxtLink :to="`/admin/exams/${exam.id}`" class="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900 hover:text-oc-primary">{{ exam.title }}</NuxtLink>
          <span class="text-xs text-gray-500">{{ exam.questions_count }} questions · {{ exam.attempts_count }} attempts</span>
          <StatusBadge :status="exam.is_published ? 'published' : 'draft'" />
        </li>
      </ul>
    </section>
  </div>
</template>
