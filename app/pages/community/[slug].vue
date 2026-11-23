<script setup lang="ts">
import type { Course } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const slug = String(route.params.slug)
const { apiData } = useApi()

const { data: course } = await useAsyncData(`community-course-${slug}`, () => apiData<Course>(`/courses/${slug}`).catch(() => null))

const live = useLiveSessions(slug)
await live.load()

const isStaff = computed(() => live.role.value === 'staff')
const denied = computed(() => !live.role.value && !!live.error.value)

const tab = ref<'announcements' | 'schedule'>(route.query.tab === 'schedule' ? 'schedule' : 'announcements')

useSeoMeta({
  title: () => `Live classes & announcements — ${course.value?.title ?? 'Course'}`,
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-8">
    <nav class="mb-3 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/my-courses" class="hover:text-oc-primary">My courses</NuxtLink>
      <span class="mx-1.5">/</span>
      <NuxtLink :to="`/learn/${slug}`" class="hover:text-oc-primary">{{ course?.title || 'Course' }}</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Live classes</span>
    </nav>

    <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900">{{ course?.title }}</h1>
        <p class="text-sm text-gray-500">Live classes, announcements and discussion<span v-if="isStaff"> · you are teaching this course</span></p>
      </div>
      <div class="flex gap-2">
        <NuxtLink :to="`/learn/${slug}`" class="btn-secondary"><BaseIcon name="book-open" :size="16" /> Lessons</NuxtLink>
        <NuxtLink v-if="isStaff" :to="`/admin/courses/${course?.id}`" class="btn-ghost"><BaseIcon name="settings" :size="16" /> Manage course</NuxtLink>
      </div>
    </div>

    <EmptyState
      v-if="denied"
      icon="lock"
      title="This area is for enrolled students"
      :message="live.error.value"
      action-label="View course"
      :action-to="`/courses/${slug}`"
    />

    <template v-else>
      <LiveClasses :slug="slug" :is-staff="isStaff" view="panel" />

      <div class="mt-6 flex gap-1.5">
        <button
          v-for="item in [{ v: 'announcements', l: 'Announcements' }, { v: 'schedule', l: 'Class schedule' }]"
          :key="item.v"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-semibold transition"
          :class="tab === item.v ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          @click="tab = item.v as typeof tab"
        >
          {{ item.l }}
        </button>
      </div>

      <div class="mt-4 max-w-3xl">
        <CommunityFeed v-show="tab === 'announcements'" :slug="slug" :is-staff="isStaff" />
        <LiveClasses v-if="tab === 'schedule'" :slug="slug" :is-staff="isStaff" view="schedule" />
      </div>
    </template>
  </div>
</template>
