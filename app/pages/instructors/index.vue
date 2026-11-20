<script setup lang="ts">
interface InstructorSummary {
  id: number
  name: string
  headline: string | null
  bio: string | null
  avatar: string | null
  courses_count: number
  students_count: number
}

const { apiData } = useApi()
const { initial } = useInitials()

const { data, pending, error, refresh } = await useAsyncData('instructors-list', () => apiData<InstructorSummary[]>('/instructors'))

useSeoMeta({
  title: 'Our instructors — Shikhor Academy',
  description: 'Meet the expert instructors teaching at Shikhor Academy.',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Instructors</span>
    </nav>

    <div class="text-center">
      <h1 class="text-3xl font-extrabold text-gray-900 md:text-4xl">Learn from our instructors</h1>
      <p class="mx-auto mt-2 max-w-2xl text-sm text-gray-500 md:text-base">Experienced teachers who build and run the courses on Shikhor Academy.</p>
    </div>

    <div v-if="pending" class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="card h-72 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" class="mt-8" title="Could not load instructors" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!data?.length"
      class="mt-8"
      icon="users"
      title="Instructors are coming soon"
      message="Browse our courses in the meantime."
      action-label="Browse courses"
      action-to="/courses"
    />

    <div v-else class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink v-for="instructor in data" :key="instructor.id" :to="`/instructors/${instructor.id}`" class="card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg">
        <div class="h-20 bg-gradient-to-r from-oc-primary/70 to-oc-primary" />
        <div class="-mt-12 flex justify-center">
          <img
            v-if="instructor.avatar"
            :src="mediaUrl(instructor.avatar)"
            :alt="instructor.name"
            class="h-24 w-24 rounded-full border-4 border-white object-cover shadow"
            @error="imageFallback"
          >
          <span v-else class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-brand-light text-3xl font-extrabold text-oc-primary shadow">{{ initial(instructor.name) }}</span>
        </div>
        <div class="flex flex-1 flex-col p-5 text-center">
          <h2 class="text-lg font-bold text-gray-900 group-hover:text-oc-primary">{{ instructor.name }}</h2>
          <p v-if="instructor.headline" class="mt-1 text-sm font-semibold text-oc-primary">{{ instructor.headline }}</p>
          <p v-if="instructor.bio" class="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600">{{ instructor.bio }}</p>
          <div class="mt-4 flex justify-center gap-6 border-t border-gray-100 pt-4 text-xs text-gray-500">
            <span><b class="block text-base text-gray-900">{{ instructor.courses_count }}</b> course{{ instructor.courses_count === 1 ? '' : 's' }}</span>
            <span><b class="block text-base text-gray-900">{{ formatNumber(instructor.students_count) }}</b> student{{ instructor.students_count === 1 ? '' : 's' }}</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
