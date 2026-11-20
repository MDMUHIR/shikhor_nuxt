<script setup lang="ts">
import type { AdminReview, Course, Paginator } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Reviews — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { run } = useFormHandler()
const { initial } = useInitials()

const filter = ref<'all' | 'pending' | 'approved' | 'rejected'>('all')
const rating = ref('')
const courseId = ref('')
const page = ref(1)

const { data: courses } = await useAsyncData('admin-review-courses', () =>
  apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 100 } })
    .then((result) => result.data)
    .catch(() => [] as Course[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-reviews',
  () =>
    apiData<Paginator<AdminReview>>('/admin/reviews', {
      query: {
        per_page: 15,
        page: page.value,
        status: filter.value === 'all' ? undefined : filter.value,
        rating: rating.value || undefined,
        course_id: courseId.value || undefined,
      },
    }),
  { watch: [page, filter, rating, courseId] },
)

const reviews = computed(() => data.value?.data ?? [])

watch([filter, rating, courseId], () => (page.value = 1))

const filters = [
  { value: 'all' as const, label: 'All reviews' },
  { value: 'pending' as const, label: 'Pending' },
  { value: 'approved' as const, label: 'Approved' },
  { value: 'rejected' as const, label: 'Rejected' },
]

async function approve(review: AdminReview) {
  const result = await run(() => apiData(`/admin/reviews/${review.id}/approve`, { method: 'POST' }), 'Review approved.')
  if (result !== undefined) await refresh()
}

async function reject(review: AdminReview) {
  const result = await run(() => apiData(`/admin/reviews/${review.id}/reject`, { method: 'POST' }), 'Review rejected.')
  if (result !== undefined) await refresh()
}

async function remove(review: AdminReview) {
  const ok = await ask({
    title: 'Delete review',
    message: 'Permanently delete this review? The course rating will be recalculated.',
    confirmLabel: 'Delete review',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/reviews/delete/${review.id}`, { method: 'DELETE' }), 'Review deleted.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Course reviews" subtitle="Moderate student feedback. Rejected reviews are hidden from the course page." icon="star">
      <button type="button" class="btn-secondary" :disabled="pending" @click="refresh()">
        <BaseIcon name="refresh" :size="15" /> Refresh
      </button>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="flex flex-wrap items-center gap-2">
        <div class="flex flex-wrap gap-1">
          <button
            v-for="item in filters"
            :key="item.value"
            type="button"
            class="rounded-full px-3 py-1.5 text-xs font-semibold transition"
            :class="filter === item.value ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
            @click="filter = item.value"
          >
            {{ item.label }}
          </button>
        </div>
        <div class="ml-auto flex flex-1 flex-wrap justify-end gap-2">
          <select v-model="rating" class="field-input max-w-[150px] !py-2 text-xs" aria-label="Filter by rating">
            <option value="">Any rating</option>
            <option v-for="star in 5" :key="star" :value="star">{{ star }} star{{ star === 1 ? '' : 's' }}</option>
          </select>
          <select v-model="courseId" class="field-input max-w-[240px] !py-2 text-xs" aria-label="Filter by course">
            <option value="">All courses</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 4" :key="i" class="card h-28 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load reviews" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!reviews.length"
      icon="star"
      title="No reviews in this view"
      message="Students can review a course once they are enrolled. Try a different filter."
      :action-label="filter !== 'all' || rating || courseId ? 'Clear filters' : undefined"
      @action="filter = 'all'; rating = ''; courseId = ''"
    />

    <div v-else class="space-y-3">
      <article v-for="review in reviews" :key="review.id" class="card p-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="flex min-w-0 items-start gap-3">
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary">
              {{ initial(review.user?.name) }}
            </span>
            <div class="min-w-0">
              <p class="text-sm font-bold text-gray-900">{{ review.user?.name || 'Deleted user' }}</p>
              <p class="text-[11px] text-gray-400">
                {{ review.user?.email || '—' }} · {{ formatDate(review.created_at, true) }}
              </p>
              <p class="mt-0.5 text-xs text-gray-500">
                on
                <NuxtLink v-if="review.course" :to="`/courses/${review.course.slug}`" target="_blank" class="font-semibold text-oc-primary hover:underline">
                  {{ review.course.title }}
                </NuxtLink>
                <span v-else>a deleted course</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <StatusBadge :status="review.status ?? (review.is_approved ? 'approved' : 'rejected')" />
            <span class="badge bg-amber-50 text-amber-700 ring-amber-200">
              <BaseIcon name="star" :size="12" filled /> {{ review.rating }}
            </span>
          </div>
        </div>

        <div class="mt-3 rounded-xl bg-gray-50/70 p-3">
          <p v-if="review.title" class="text-sm font-semibold text-gray-800">{{ review.title }}</p>
          <p class="mt-0.5 text-sm leading-relaxed text-gray-600">{{ review.comment || 'No comment provided.' }}</p>
        </div>

        <div class="mt-3 flex flex-wrap items-center justify-end gap-1 border-t border-gray-100 pt-2">
          <button
            v-if="(review.status ?? (review.is_approved ? 'approved' : 'rejected')) !== 'approved'"
            type="button"
            class="btn-ghost !px-2.5 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"
            @click="approve(review)"
          >
            <BaseIcon name="check" :size="14" /> Approve
          </button>
          <button
            v-else
            type="button"
            class="btn-ghost !px-2.5 !py-1.5 text-xs text-amber-600 hover:bg-amber-50"
            @click="reject(review)"
          >
            <BaseIcon name="eye" :size="14" /> Hide
          </button>
          <button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" @click="remove(review)">
            <BaseIcon name="trash" :size="14" /> Delete
          </button>
        </div>
      </article>

      <div class="flex justify-center pt-2">
        <PaginationLinks :current-page="data?.current_page ?? 1" :last-page="data?.last_page ?? 1" :total="data?.total" @change="(value) => (page = value)" />
      </div>
    </div>
  </div>
</template>
