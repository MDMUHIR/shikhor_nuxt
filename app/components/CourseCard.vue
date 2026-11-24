<script setup lang="ts">
import type { Course } from '~/utils/types'

const props = withDefaults(
  defineProps<{
    course: Course
    compact?: boolean
  }>(),
  { compact: false },
)

const image = computed(() => mediaUrl(props.course.thumbnail))
const price = computed(() => formatMoney(props.course.effective_price))
const original = computed(() =>
  props.course.offer_price && props.course.offer_price < props.course.price
    ? formatMoney(props.course.price)
    : '',
)
const off = computed(() => discountPercent(props.course.price, props.course.offer_price))
const accessLabel = computed(() =>
  props.course.access_type === 'lifetime' ? 'Lifetime access' : `${props.course.effective_access_days} days access`,
)
const levelLabel = computed(() => {
  const map: Record<string, string> = {
    all: 'All levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  }
  return map[props.course.level] || props.course.level
})
</script>

<template>
  <!-- The whole card opens the course; the instructor link sits above that overlay (no nested <a>). -->
  <article
    class="card group relative flex h-full flex-col overflow-hidden"
  >
    <NuxtLink :to="`/courses/${course.slug}`" class="absolute inset-0 z-[1]" :aria-label="course.title" />
    <div class="pointer-events-none relative aspect-video overflow-hidden border-b-2 border-neo-ink bg-gray-100">
      <img
        :src="image"
        :alt="course.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imageFallback"
      >
      <span class="absolute left-3 top-3 rounded-full border-2 border-neo-ink bg-neo-lavender px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink">
        {{ course.category?.name || levelLabel }}
      </span>
      <span
        v-if="off"
        class="absolute right-3 top-3 rounded-full border-2 border-neo-ink bg-neo-pink px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink"
      >-{{ off }}%</span>
      <span
        v-if="course.is_featured"
        class="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border-2 border-neo-ink bg-neo-sun px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink"
      >
        <BaseIcon name="sparkles" :size="12" /> Featured
      </span>
    </div>

    <div class="pointer-events-none flex flex-1 flex-col p-5">
      <div class="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500">
        <span class="inline-flex items-center gap-1">
          <BaseIcon name="layers" :size="13" /> {{ course.total_lessons }} lessons
        </span>
        <RatingStars :rating="course.rating?.average" :count="course.rating?.count" :size="13" />
      </div>

      <h3 class="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary">
        {{ course.title }}
      </h3>
      <p v-if="course.subtitle && !compact" class="mt-1.5 line-clamp-2 text-sm text-gray-500">{{ course.subtitle }}</p>

      <NuxtLink
        v-if="course.instructor"
        :to="`/instructors/${course.instructor.id}`"
        class="pointer-events-auto relative z-[2] mt-2 inline-flex w-fit max-w-full items-center gap-2 text-xs font-semibold text-gray-600 hover:text-oc-primary"
      >
        <img v-if="course.instructor.avatar" :src="mediaUrl(course.instructor.avatar)" :alt="course.instructor.name" class="h-6 w-6 shrink-0 rounded-full object-cover" @error="imageFallback">
        <span v-else class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-light text-[10px] font-bold text-oc-primary">{{ course.instructor.name.charAt(0).toUpperCase() }}</span>
        <span class="truncate">{{ course.instructor.name }}</span>
      </NuxtLink>

      <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500">
        <span class="inline-flex items-center gap-1"><BaseIcon name="clock" :size="12" /> {{ accessLabel }}</span>
        <span class="inline-flex items-center gap-1"><BaseIcon name="users" :size="12" /> {{ formatNumber(course.total_students) }} students</span>
      </div>

      <div class="mt-auto flex items-end justify-between gap-2 pt-4">
        <div class="flex items-baseline gap-1.5">
          <span class="text-xl font-extrabold text-oc-primary">{{ price }}</span>
          <span v-if="original" class="text-xs text-gray-400 line-through">{{ original }}</span>
        </div>
        <span class="text-xs font-semibold text-gray-500">{{ levelLabel }}</span>
      </div>
    </div>
  </article>
</template>
