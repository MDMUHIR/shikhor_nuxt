<script setup lang="ts">
import type { Course, Paginator, Review } from '~/utils/types'

const { apiData } = useApi()

const { data, pending, error, refresh } = await useAsyncData('reviews-aggregate', async () => {
  const featured = await apiData<Paginator<Course>>('/courses', { query: { per_page: 6, sort: 'rating' } }).catch(() => null)
  const courses = (featured?.data ?? []).slice(0, 6)
  const batches = await Promise.all(
    courses.map(async (course) => {
      const result = await apiData<{ summary: { average: number; count: number }; reviews: Paginator<Review> }>(
        `/courses/${course.slug}/reviews`,
        { query: { per_page: 6 } },
      ).catch(() => null)
      return result
        ? {
            course,
            summary: result.summary,
            reviews: result.reviews.data.map((review) => ({ ...review, course: { id: course.id, title: course.title, slug: course.slug } })),
          }
        : null
    }),
  )
  return {
    groups: batches.filter((batch): batch is NonNullable<typeof batch> => !!batch),
  }
})

const reviews = computed(() => (data.value?.groups ?? []).flatMap((group) => group.reviews))
const totalReviews = computed(() => data.value?.groups.reduce((sum, group) => sum + (group.summary?.count || 0), 0) ?? 0)
const average = computed(() => {
  const groups = data.value?.groups.filter((group) => group.summary?.count) ?? []
  if (!groups.length) return 0
  const weighted = groups.reduce((sum, group) => sum + group.summary.average * group.summary.count, 0)
  return weighted / groups.reduce((sum, group) => sum + group.summary.count, 0)
})

useSeoMeta({
  title: 'Student reviews — Shikhor Academy',
  description: 'Real reviews from students enrolled in Shikhor Academy courses.',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Reviews</span>
    </nav>

    <div class="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white md:p-8">
      <h1 class="text-2xl font-extrabold md:text-3xl">Student reviews</h1>
      <p class="mt-2 max-w-2xl text-sm text-white/90">
        Approved reviews from our most popular courses. A review can only be written by an enrolled student.
      </p>
    </div>

    <div class="mt-5 card flex flex-wrap items-center gap-6 p-5">
      <div class="text-center">
        <p class="text-3xl font-extrabold text-gray-900">{{ Number(average || 0).toFixed(1) }}</p>
        <RatingStars :rating="average" :show-value="false" :size="16" />
      </div>
      <div class="h-10 w-px bg-gray-200" />
      <p class="text-sm text-gray-600"><span class="font-bold text-gray-900">{{ formatNumber(totalReviews) }}</span> approved reviews across {{ data?.groups.length || 0 }} courses.</p>
    </div>

    <div v-if="pending" class="mt-6">
      <LoadingSkeleton :count="4" type="row" />
    </div>
    <ErrorState v-else-if="error" class="mt-6" title="Could not load reviews" :message="error.message" @retry="refresh" />
    <EmptyState
      v-else-if="!reviews.length"
      class="mt-6"
      icon="star"
      title="No reviews yet"
      message="Be the first to finish a course and share your experience."
      action-label="Browse courses"
      action-to="/courses"
    />
    <template v-else>
      <div v-for="group in data?.groups" :key="group.course.id" class="mt-8">
        <div v-if="group.summary.count" class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <NuxtLink :to="`/courses/${group.course.slug}`" class="text-base font-bold text-gray-900 hover:text-oc-primary">
            {{ group.course.title }}
          </NuxtLink>
          <RatingStars :rating="group.summary.average" :count="group.summary.count" :size="14" />
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <figure v-for="review in group.reviews" :key="review.id" class="card p-5">
            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2.5">
                <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">
                  {{ initials(review.user?.name) }}
                </span>
                <div>
                  <p class="text-sm font-semibold text-gray-800">{{ review.user?.name || 'Student' }}</p>
                  <p class="text-[11px] text-gray-400">{{ formatDate(review.created_at) }}</p>
                </div>
              </div>
              <RatingStars :rating="review.rating" :show-value="false" :size="13" />
            </div>
            <blockquote class="mt-3 text-sm leading-6 text-gray-600">
              <span v-if="review.title" class="block font-semibold text-gray-800">{{ review.title }}</span>
              {{ review.comment }}
            </blockquote>
          </figure>
        </div>
      </div>
    </template>
  </div>
</template>
