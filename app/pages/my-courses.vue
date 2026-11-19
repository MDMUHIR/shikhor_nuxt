<script setup lang="ts">
import type { MyCourse } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const { apiData } = useApi()

const { data: courses, pending, error, refresh } = await useAsyncData('my-courses-page', async () => {
  const list = await apiData<MyCourse[]>('/my/courses')
  return list ?? []
})

const filter = ref<'all' | 'active' | 'expired'>('all')

const filtered = computed(() => {
  const list = courses.value ?? []
  if (filter.value === 'all') return list
  if (filter.value === 'expired') return list.filter((item) => !item.enrollment.is_active)
  return list.filter((item) => item.enrollment.is_active)
})

const activeCount = computed(() => (courses.value ?? []).filter((item) => item.enrollment.is_active).length)

function progressOf(item: MyCourse) {
  return Math.max(0, Math.min(100, Number(item.progress?.percentage ?? 0)))
}

useSeoMeta({ title: 'My courses — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">My courses</span>
    </nav>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My courses</h1>
        <p class="mt-1 text-sm text-gray-500">{{ activeCount }} active course{{ activeCount === 1 ? '' : 's' }} · pick up where you left off.</p>
      </div>
      <div class="flex gap-2">
        <NuxtLink to="/certificates" class="btn-secondary"><BaseIcon name="award" :size="16" /> Certificates</NuxtLink>
        <NuxtLink to="/courses" class="btn-primary"><BaseIcon name="book-open" :size="16" /> Browse courses</NuxtLink>
      </div>
    </div>

    <div class="mt-5 flex flex-wrap gap-1.5">
      <button
        v-for="item in [{ value: 'all', label: 'All' }, { value: 'active', label: 'Active' }, { value: 'expired', label: 'Expired' }]"
        :key="item.value"
        type="button"
        class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
        :class="filter === item.value ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="filter = item.value as 'all' | 'active' | 'expired'"
      >
        {{ item.label }}
      </button>
    </div>

    <div v-if="pending" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse overflow-hidden">
        <div class="aspect-video bg-gray-200" />
        <div class="space-y-2 p-4">
          <div class="h-4 w-4/5 rounded bg-gray-200" />
          <div class="h-2 w-full rounded bg-gray-200" />
          <div class="h-8 w-28 rounded bg-gray-200" />
        </div>
      </div>
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not load your courses" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!courses?.length"
      class="mt-6"
      icon="book-open"
      title="You are not enrolled yet"
      message="Buy a course and it will appear here with progress tracking and certificates."
      action-label="Browse courses"
      action-to="/courses"
    />

    <EmptyState
      v-else-if="!filtered.length"
      class="mt-6"
      icon="filter"
      title="No courses in this view"
      message="Try another filter to see the rest of your courses."
      action-label="Show all"
      @action="filter = 'all'"
    />

    <div v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="item in filtered" :key="item.enrollment.id" class="card flex flex-col overflow-hidden">
        <div class="relative aspect-video bg-gray-50">
          <img :src="mediaUrl(item.course.thumbnail)" :alt="item.course.title" class="h-full w-full object-cover" @error="imageFallback" >
          <span
            class="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold"
            :class="item.enrollment.is_active ? 'bg-emerald-500 text-white' : 'bg-gray-800/80 text-white'"
          >
            {{ item.enrollment.is_active ? 'Active' : statusLabel(item.enrollment.status) }}
          </span>
        </div>
        <div class="flex flex-1 flex-col p-4">
          <p v-if="item.course.category" class="text-[11px] font-semibold uppercase tracking-wide text-oc-primary">{{ item.course.category.name }}</p>
          <NuxtLink :to="`/courses/${item.course.slug}`" class="mt-1 line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary">
            {{ item.course.title }}
          </NuxtLink>

          <div class="mt-3">
            <div class="flex items-center justify-between text-xs text-gray-500">
              <span>{{ item.progress?.completed_lessons ?? 0 }}/{{ item.progress?.total_lessons ?? item.course.total_lessons }} lessons</span>
              <span class="font-semibold text-gray-700">{{ progressOf(item) }}%</span>
            </div>
            <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
              <span class="block h-full rounded-full bg-oc-primary transition-all" :style="{ width: `${progressOf(item)}%` }" />
            </div>
          </div>

          <p class="mt-3 text-xs text-gray-500">
            <template v-if="item.enrollment.is_lifetime">Lifetime access</template>
            <template v-else-if="item.enrollment.remaining_days !== null"> {{ item.enrollment.remaining_days }} day{{ item.enrollment.remaining_days === 1 ? '' : 's' }} left</template>
            <template v-else>Access ends {{ formatDate(item.enrollment.expires_at) }}</template>
          </p>

          <div class="mt-auto pt-4">
            <NuxtLink
              v-if="item.enrollment.is_active"
              :to="`/learn/${item.course.slug}`"
              class="btn-primary w-full"
            >
              <BaseIcon name="play" :size="15" />
              {{ progressOf(item) > 0 ? 'Continue learning' : 'Start course' }}
            </NuxtLink>
            <NuxtLink v-else :to="`/courses/${item.course.slug}`" class="btn-secondary w-full">
              Renew access
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
