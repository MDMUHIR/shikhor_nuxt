<script setup lang="ts">
import type { Course } from '~/utils/types'

interface InstructorProfile {
  id: number
  name: string
  headline: string | null
  bio: string | null
  avatar: string | null
  courses_count: number
  students_count: number
  courses: Course[]
}

const route = useRoute()
const { apiData } = useApi()
const { initial } = useInitials()

const { data: instructor, pending, error, refresh } = await useAsyncData(`instructor-${route.params.id}`, () =>
  apiData<InstructorProfile>(`/instructors/${route.params.id}`),
)

useSeoMeta({
  title: () => (instructor.value ? `${instructor.value.name} — Instructor at Shikhor Academy` : 'Instructor — Shikhor Academy'),
  description: () => instructor.value?.headline || instructor.value?.bio?.slice(0, 150) || 'Instructor at Shikhor Academy',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <NuxtLink to="/instructors" class="hover:text-oc-primary">Instructors</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">{{ instructor?.name }}</span>
    </nav>

    <div v-if="pending" class="card h-56 animate-pulse bg-gray-50" />

    <EmptyState
      v-else-if="error"
      icon="users"
      title="Instructor not found"
      message="This instructor does not exist or is no longer teaching."
      action-label="All instructors"
      action-to="/instructors"
    />

    <template v-else-if="instructor">
      <section class="card flex flex-col items-center gap-6 p-6 text-center md:flex-row md:items-start md:p-8 md:text-left">
        <img v-if="instructor.avatar" :src="mediaUrl(instructor.avatar)" :alt="instructor.name" class="h-32 w-32 shrink-0 rounded-full object-cover shadow" @error="imageFallback">
        <span v-else class="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand-light text-5xl font-extrabold text-oc-primary">{{ initial(instructor.name) }}</span>
        <div class="min-w-0">
          <p class="eyebrow">Instructor</p>
          <h1 class="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">{{ instructor.name }}</h1>
          <p v-if="instructor.headline" class="mt-1 text-base font-semibold text-gray-600">{{ instructor.headline }}</p>
          <p v-if="instructor.bio" class="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">{{ instructor.bio }}</p>
          <div class="mt-4 flex justify-center gap-8 text-sm text-gray-500 md:justify-start">
            <span><b class="text-lg text-gray-900">{{ instructor.courses_count }}</b> course{{ instructor.courses_count === 1 ? '' : 's' }}</span>
            <span><b class="text-lg text-gray-900">{{ formatNumber(instructor.students_count) }}</b> student{{ instructor.students_count === 1 ? '' : 's' }}</span>
          </div>
        </div>
      </section>

      <section class="mt-8">
        <h2 class="text-xl font-extrabold text-gray-900">Courses by {{ instructor.name }}</h2>
        <EmptyState v-if="!instructor.courses.length" class="mt-4" icon="book-open" title="No published courses yet" message="Check back soon." />
        <div v-else class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCard v-for="course in instructor.courses" :key="course.id" :course="course" />
        </div>
      </section>
    </template>
  </div>
</template>
