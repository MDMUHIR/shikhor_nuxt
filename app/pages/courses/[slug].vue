<script setup lang="ts">
import type { Course, Paginator, RatingSummary, Review } from '~/utils/types'
import type { AttachmentItem } from '~/components/AttachmentList.vue'

const route = useRoute()
const slug = String(route.params.slug)
const { apiData, apiFetch } = useApi()
const { isAuthenticated } = useAuth()
const cart = useCart()
const toast = useToast()

const { data: course, pending, error, refresh } = await useAsyncData(`course-${slug}`, () =>
  apiData<Course>(`/courses/${slug}`),
)

const { data: enrollment, refresh: refreshEnrollment } = await useAsyncData(`course-enrollment-${slug}`, async () => {
  if (!isAuthenticated.value) return null
  return apiData<{ id: number; is_active: boolean; status: string; progress?: { percentage: number; is_complete: boolean } }>(`/my/courses/${slug}`).catch(() => null)
})

const { data: attachments } = await useAsyncData(`course-attachments-${slug}`, () =>
  apiData<AttachmentItem[]>(`/courses/${slug}/attachments`).catch(() => [] as AttachmentItem[]),
)

const ratingFilter = ref(Number(route.query.rating) || 0)
const reviewPage = ref(Number(route.query.review_page) || 1)

const { data: reviewsData, pending: reviewsPending, refresh: refreshReviews } = await useAsyncData(
  `course-reviews-${slug}`,
  () =>
    apiData<{ summary: RatingSummary; reviews: Paginator<Review> }>(`/courses/${slug}/reviews`, {
      query: { per_page: 5, page: reviewPage.value, rating: ratingFilter.value || undefined },
    }),
  { watch: [reviewPage, ratingFilter] },
)

const { data: myReview, refresh: refreshMyReview } = await useAsyncData(`course-my-review-${slug}`, async () => {
  if (!isAuthenticated.value) return null
  return apiData<Review | null>(`/courses/${slug}/reviews/mine`).catch(() => null)
})

const reviewForm = reactive({ rating: 5, title: '', comment: '' })
const savingReview = ref(false)
const reviewError = ref('')
const deletingReview = ref(false)

watchEffect(() => {
  if (myReview.value) {
    reviewForm.rating = myReview.value.rating
    reviewForm.title = myReview.value.title || ''
    reviewForm.comment = myReview.value.comment || ''
  }
})

// Active enrolment (paid or granted); expired/cancelled students cannot review.
const isEnrolled = computed(() => !!enrollment.value?.is_active)
const openSections = ref<Set<number>>(new Set())
const adding = ref(false)
const summary = computed<RatingSummary>(
  () => reviewsData.value?.summary ?? course.value?.reviews_summary ?? { average: 0, count: 0 },
)
const totalLessons = computed(() => course.value?.sections?.reduce((sum, section) => sum + section.lessons.length, 0) ?? 0)
const totalQuizzes = computed(() => course.value?.quizzes?.length ?? 0)
const thumbnail = computed(() => mediaUrl(course.value?.thumbnail))
const price = computed(() => formatMoney(course.value?.effective_price))
const original = computed(() =>
  course.value?.offer_price && course.value?.offer_price < course.value.price ? formatMoney(course.value.price) : '',
)
const off = computed(() => (course.value ? discountPercent(course.value.price, course.value.offer_price) : 0))
const accessLabel = computed(() =>
  course.value?.access_type === 'lifetime' ? 'Lifetime access' : `${course.value?.effective_access_days ?? 0} days access`,
)
const hasPromo = computed(() => !!course.value?.promo_video_url)
const promoEmbed = computed(() => {
  const url = course.value?.promo_video_url || ''
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return ''
})

const ratingBars = computed(() => {
  const s = summary.value
  const total = s.count || 0
  return [5, 4, 3, 2, 1].map((star) => {
    const count = (s as unknown as Record<string, number>)[`${['one', 'two', 'three', 'four', 'five'][star - 1]}_star`] || 0
    return { star, count, percent: total ? Math.round((count / total) * 100) : 0 }
  })
})

function toggleSection(id: number) {
  const next = new Set(openSections.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  openSections.value = next
}

function filterRating(rating: number) {
  ratingFilter.value = rating
  reviewPage.value = 1
}

async function addCourse(buyNow = false) {
  if (!course.value) return
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(`/courses/${slug}`)}`)
  }
  adding.value = true
  try {
    const response = await apiFetch<{ data: { added: unknown[]; skipped: Array<{ reason: string }> } }>('/cart/courses/add', {
      method: 'POST',
      body: { course_id: course.value.id },
    })
    await cart.refresh()
    const skipped = response?.data?.skipped ?? []
    if (skipped.length) toast.info(skipped[0]?.reason || 'Course was not added to the cart.')
    else toast.success('Course added to your cart.')
    if (buyNow) await navigateTo('/checkout')
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    adding.value = false
  }
}

async function submitReview() {
  reviewError.value = ''
  if (!reviewForm.rating) {
    reviewError.value = 'Please choose a rating.'
    return
  }
  savingReview.value = true
  try {
    const saved = await apiFetch<{ data: { status?: string } }>(`/courses/${slug}/reviews`, {
      method: 'POST',
      body: {
        rating: reviewForm.rating,
        title: reviewForm.title || null,
        comment: reviewForm.comment || null,
      },
    })
    toast.success(saved?.data?.status === 'pending' ? 'Thanks — your review will appear once approved.' : 'Thanks — your review is live.')
    await Promise.all([refreshReviews(), refreshMyReview(), refresh()])
  } catch (err) {
    reviewError.value = (err as Error).message
  } finally {
    savingReview.value = false
  }
}

async function deleteReview() {
  deletingReview.value = true
  try {
    await apiFetch(`/courses/${slug}/reviews`, { method: 'DELETE' })
    toast.success('Your review was removed.')
    reviewForm.title = ''
    reviewForm.comment = ''
    await Promise.all([refreshReviews(), refreshMyReview(), refresh()])
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    deletingReview.value = false
  }
}

watch(
  () => course.value?.sections,
  (sections) => {
    if (sections?.length) openSections.value = new Set(sections.map((section) => section.id))
  },
  { immediate: true },
)

useSeoMeta({
  title: () => (course.value ? `${course.value.title} — Shikhor Academy` : 'Course — Shikhor Academy'),
  description: () => course.value?.subtitle || excerpt(course.value?.description, 160) || 'Course details',
  ogTitle: () => course.value?.title || 'Course',
  ogDescription: () => excerpt(course.value?.description, 160),
  ogImage: () => (course.value?.thumbnail ? mediaUrl(course.value.thumbnail) : undefined),
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10">
    <div v-if="pending" class="grid gap-6 lg:grid-cols-3">
      <div class="space-y-4 lg:col-span-2">
        <div class="h-72 animate-pulse rounded-2xl bg-gray-200" />
        <div class="h-8 w-2/3 animate-pulse rounded bg-gray-200" />
        <div class="h-4 w-full animate-pulse rounded bg-gray-200" />
        <LoadingSkeleton :count="3" type="row" />
      </div>
      <div class="h-80 animate-pulse rounded-2xl bg-gray-200" />
    </div>

    <ErrorState
      v-else-if="error"
      title="Course not available"
      :message="error.message"
      @retry="refresh"
    />

    <template v-else-if="course">
      <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
        <span class="mx-1.5">/</span>
        <NuxtLink to="/courses" class="hover:text-oc-primary">Courses</NuxtLink>
        <span class="mx-1.5">/</span>
        <span class="text-gray-700">{{ course.title }}</span>
      </nav>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div class="space-y-6">
          <section class="overflow-hidden rounded-3xl border-2 border-neo-ink bg-gray-900 shadow-[5px_5px_0_0_#1a1a1a]">
            <div class="relative aspect-video">
              <iframe
                v-if="promoEmbed"
                :src="promoEmbed"
                class="h-full w-full"
                title="Course promo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <template v-else-if="hasPromo">
                <video :src="course.promo_video_url || ''" controls class="h-full w-full" preload="metadata" />
              </template>
              <img
                v-else
                :src="thumbnail"
                :alt="course.title"
                class="h-full w-full object-cover opacity-90"
                @error="imageFallback"
              >
            </div>
          </section>

          <section>
            <div class="flex flex-wrap items-center gap-2 text-xs">
              <span class="badge bg-brand-light text-oc-primary ring-blue-200">{{ course.category?.name || 'Course' }}</span>
              <span class="badge bg-gray-50 text-gray-600 ring-gray-200">{{ course.level }}</span>
              <span class="badge bg-gray-50 text-gray-600 ring-gray-200">{{ course.language?.toUpperCase() }}</span>
              <span v-if="course.is_featured" class="badge bg-amber-50 text-amber-700 ring-amber-200">Featured</span>
            </div>
            <h1 class="mt-3 text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">{{ course.title }}</h1>
            <NuxtLink v-if="course.instructor" :to="`/instructors/${course.instructor.id}`" class="mt-3 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-oc-primary">
              <img v-if="course.instructor.avatar" :src="mediaUrl(course.instructor.avatar)" :alt="course.instructor.name" class="h-8 w-8 rounded-full object-cover" @error="imageFallback">
              <span v-else class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">{{ initials(course.instructor.name) }}</span>
              Taught by <b class="font-semibold text-gray-900">{{ course.instructor.name }}</b>
            </NuxtLink>
            <p v-if="course.subtitle" class="mt-2 text-base text-gray-600">{{ course.subtitle }}</p>
            <div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
              <RatingStars :rating="course.rating?.average" :count="course.rating?.count" :size="16" />
              <span class="inline-flex items-center gap-1.5"><BaseIcon name="users" :size="15" /> {{ formatNumber(course.total_students) }} students</span>
              <span class="inline-flex items-center gap-1.5"><BaseIcon name="book-open" :size="15" /> {{ totalLessons }} lessons</span>
              <span class="inline-flex items-center gap-1.5"><BaseIcon name="clock" :size="15" /> {{ accessLabel }}</span>
            </div>
          </section>

          <section v-if="course.instructor" class="card flex items-start gap-4 p-5">
            <img v-if="course.instructor.avatar" :src="mediaUrl(course.instructor.avatar)" :alt="course.instructor.name" class="h-16 w-16 shrink-0 rounded-full object-cover" @error="imageFallback">
            <span v-else class="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-light text-xl font-bold text-oc-primary">{{ initials(course.instructor.name) }}</span>
            <div class="min-w-0">
              <p class="eyebrow">Your instructor</p>
              <h2 class="mt-0.5 text-lg font-bold text-gray-900"><NuxtLink :to="`/instructors/${course.instructor.id}`" class="hover:text-oc-primary">{{ course.instructor.name }}</NuxtLink></h2>
              <p v-if="course.instructor.headline" class="text-sm font-semibold text-gray-500">{{ course.instructor.headline }}</p>
              <p v-if="course.instructor.bio" class="mt-1 line-clamp-4 text-sm leading-6 text-gray-600">{{ course.instructor.bio }}</p>
              <NuxtLink :to="`/instructors/${course.instructor.id}`" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-oc-primary hover:underline">View profile &amp; all courses <BaseIcon name="arrow-right" :size="12" /></NuxtLink>
            </div>
          </section>

          <section v-if="course.outcomes?.length" class="card p-5">
            <h2 class="text-lg font-bold text-gray-900">What you will learn</h2>
            <ul class="mt-3 grid gap-2.5 sm:grid-cols-2">
              <li v-for="(item, index) in course.outcomes" :key="index" class="flex gap-2 text-sm text-gray-600">
                <BaseIcon name="check" :size="16" class="mt-0.5 shrink-0 text-emerald-600" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <section v-if="course.description" class="card p-5">
            <h2 class="text-lg font-bold text-gray-900">About this course</h2>
            <div class="prose-content mt-3" v-html="sanitizeHtml(course.description)" />
          </section>

          <section v-if="course.requirements?.length" class="card p-5">
            <h2 class="text-lg font-bold text-gray-900">Requirements</h2>
            <ul class="mt-3 space-y-2">
              <li v-for="(item, index) in course.requirements" :key="index" class="flex gap-2 text-sm text-gray-600">
                <BaseIcon name="info" :size="15" class="mt-0.5 shrink-0 text-oc-primary" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <nav class="sticky top-16 z-20 -mx-1 flex gap-1 overflow-x-auto rounded-xl border border-gray-100 bg-white/95 p-1 text-sm font-semibold shadow-sm backdrop-blur" aria-label="Course sections">
            <a href="#curriculum" class="whitespace-nowrap rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-oc-primary">Curriculum</a>
            <a v-if="attachments?.length" href="#materials" class="whitespace-nowrap rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-oc-primary">Materials</a>
            <a href="#reviews" class="whitespace-nowrap rounded-lg px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-oc-primary">Reviews</a>
          </nav>

          <section id="curriculum" class="card scroll-mt-28 overflow-hidden">
            <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <h2 class="text-lg font-bold text-gray-900">Curriculum</h2>
              <span class="text-xs text-gray-500">{{ course.sections?.length || 0 }} sections · {{ totalLessons }} lessons</span>
            </div>
            <div v-if="course.sections?.length" class="divide-y divide-gray-100">
              <div v-for="section in course.sections" :key="section.id">
                <button
                  type="button"
                  class="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-gray-50"
                  :aria-expanded="openSections.has(section.id)"
                  @click="toggleSection(section.id)"
                >
                  <BaseIcon :name="openSections.has(section.id) ? 'chevron-up' : 'chevron-down'" :size="16" class="text-gray-400" />
                  <span class="flex-1 text-sm font-semibold text-gray-800">{{ section.title }}</span>
                  <span class="text-xs text-gray-400">{{ section.lessons.length }} lessons</span>
                </button>
                <ul v-if="openSections.has(section.id)" class="border-t border-gray-50 bg-gray-50/50">
                  <li
                    v-for="lesson in section.lessons"
                    :key="lesson.id"
                    class="flex items-center gap-3 border-b border-gray-100 px-5 py-2.5 last:border-0"
                  >
                    <BaseIcon
                      :name="lesson.is_locked ? 'lock' : lesson.type === 'quiz' ? 'list' : lesson.type === 'text' ? 'book' : 'play-circle'"
                      :size="16"
                      :class="lesson.is_locked ? 'text-gray-400' : 'text-oc-primary'"
                    />
                    <span class="flex-1 text-sm text-gray-700">{{ lesson.title }}</span>
                    <span v-if="lesson.is_preview" class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Preview</span>
                    <span class="text-xs text-gray-400">{{ formatDuration(lesson.duration_seconds) }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <p v-else class="px-5 py-6 text-sm text-gray-500">The curriculum for this course is being finalised.</p>
          </section>

          <section v-if="course.quizzes?.length" class="card p-5">
            <h2 class="text-lg font-bold text-gray-900">Quizzes in this course</h2>
            <ul class="mt-3 space-y-2">
              <li v-for="quiz in course.quizzes" :key="quiz.id" class="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5">
                <BaseIcon name="list" :size="16" class="text-oc-primary" />
                <span class="flex-1 text-sm text-gray-700">{{ quiz.title }}</span>
                <span class="text-xs text-gray-400">Pass {{ quiz.pass_percentage }}%</span>
              </li>
            </ul>
          </section>

          <section v-if="attachments?.length" id="materials" class="card scroll-mt-28 p-5">
            <h2 class="text-lg font-bold text-gray-900">Course materials</h2>
            <p class="mb-4 mt-1 text-sm text-gray-500">
              {{ isEnrolled ? 'Download the PDFs, slides and files that come with this course.' : 'Slides, PDFs and files included with this course. Enroll to download.' }}
            </p>
            <AttachmentList :items="attachments" />
          </section>

          <section id="reviews" class="card scroll-mt-28 p-5">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-bold text-gray-900">Student reviews</h2>
              <div class="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  class="rounded-full px-3 py-1 text-xs font-semibold transition"
                  :class="ratingFilter === 0 ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  @click="filterRating(0)"
                >All</button>
                <button
                  v-for="star in [5, 4, 3, 2, 1]"
                  :key="star"
                  type="button"
                  class="rounded-full px-3 py-1 text-xs font-semibold transition"
                  :class="ratingFilter === star ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
                  @click="filterRating(star)"
                >{{ star }}★</button>
              </div>
            </div>

            <div class="mt-4 grid gap-5 sm:grid-cols-[180px_1fr]">
              <div class="rounded-xl bg-gray-50 p-4 text-center">
                <p class="text-4xl font-extrabold text-gray-900">{{ Number(summary.average || 0).toFixed(1) }}</p>
                <RatingStars :rating="summary.average" :show-value="false" :size="16" />
                <p class="mt-1 text-xs text-gray-500">{{ summary.count }} review{{ summary.count === 1 ? '' : 's' }}</p>
              </div>
              <div class="space-y-1.5">
                <button
                  v-for="bar in ratingBars"
                  :key="bar.star"
                  type="button"
                  class="flex w-full items-center gap-2 text-xs text-gray-500"
                  @click="filterRating(bar.star)"
                >
                  <span class="w-8 shrink-0">{{ bar.star }}★</span>
                  <span class="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <span class="block h-full rounded-full bg-amber-400" :style="{ width: `${bar.percent}%` }" />
                  </span>
                  <span class="w-8 shrink-0 text-right">{{ bar.count }}</span>
                </button>
              </div>
            </div>

            <div v-if="reviewsPending" class="mt-5">
              <LoadingSkeleton :count="2" type="row" />
            </div>
            <div v-else-if="reviewsData?.reviews.data.length" class="mt-6 space-y-4">
              <article v-for="review in reviewsData.reviews.data" :key="review.id" class="rounded-xl border border-gray-100 p-4">
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
                  <RatingStars :rating="review.rating" :show-value="false" :size="14" />
                </div>
                <h3 v-if="review.title" class="mt-3 text-sm font-semibold text-gray-800">{{ review.title }}</h3>
                <p v-if="review.comment" class="mt-1 text-sm leading-6 text-gray-600">{{ review.comment }}</p>
              </article>
            </div>
            <p v-else class="mt-6 rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
              No reviews yet{{ ratingFilter ? ` for ${ratingFilter} stars` : '' }}.
            </p>

            <div class="mt-5">
              <PaginationLinks
                :current-page="reviewsData?.reviews.current_page ?? 1"
                :last-page="reviewsData?.reviews.last_page ?? 1"
                :total="reviewsData?.reviews.total"
                @change="reviewPage = $event"
              />
            </div>

            <div v-if="isEnrolled" class="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <h3 class="text-sm font-bold text-gray-800">{{ myReview ? 'Update your review' : 'Rate this course' }}</h3>
              <p v-if="myReview?.status === 'pending'" class="mt-1 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-700">Your review is awaiting approval and will appear publicly soon.</p>
              <form class="mt-3 space-y-3" @submit.prevent="submitReview">
                <div class="flex items-center gap-1">
                  <button
                    v-for="star in [1, 2, 3, 4, 5]"
                    :key="star"
                    type="button"
                    class="rounded p-0.5 transition"
                    :aria-label="`${star} star`"
                    @click="reviewForm.rating = star"
                  >
                    <BaseIcon name="star" filled :size="24" :class="star <= reviewForm.rating ? 'text-amber-400' : 'text-gray-300'" />
                  </button>
                </div>
                <div>
                  <label class="field-label" for="review-title">Title (optional)</label>
                  <input id="review-title" v-model="reviewForm.title" class="field-input" maxlength="255" placeholder="Summarise your experience">
                </div>
                <div>
                  <label class="field-label" for="review-comment">Your review</label>
                  <textarea id="review-comment" v-model="reviewForm.comment" class="field-input" rows="3" maxlength="5000" placeholder="What did you like or dislike?" />
                </div>
                <p v-if="reviewError" class="field-error">{{ reviewError }}</p>
                <div class="flex flex-wrap gap-2">
                  <button type="submit" class="btn-primary" :disabled="savingReview">
                    {{ savingReview ? 'Saving…' : myReview ? 'Update review' : 'Submit review' }}
                  </button>
                  <button v-if="myReview" type="button" class="btn-secondary" :disabled="deletingReview" @click="deleteReview">
                    {{ deletingReview ? 'Removing…' : 'Delete review' }}
                  </button>
                </div>
              </form>
            </div>
            <p v-else-if="isAuthenticated" class="mt-5 text-xs text-gray-500">Only enrolled students can review this course.</p>
            <p v-else class="mt-5 text-xs text-gray-500"><NuxtLink :to="`/login?next=${encodeURIComponent(route.fullPath)}`" class="font-semibold text-oc-primary hover:underline">Log in</NuxtLink> to rate this course after enrolling.</p>
          </section>
        </div>

        <aside class="lg:sticky lg:top-24 lg:self-start">
          <div class="card overflow-hidden">
            <div class="border-b border-gray-100 p-5">
              <div class="flex items-baseline gap-2">
                <span class="text-3xl font-extrabold text-oc-primary">{{ price }}</span>
                <span v-if="original" class="text-sm text-gray-400 line-through">{{ original }}</span>
                <span v-if="off" class="ml-auto rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">-{{ off }}%</span>
              </div>
              <p class="mt-2 text-xs text-gray-500">{{ accessLabel }} · {{ course.access_type === 'lifetime' ? 'one-time payment' : 'limited access' }}</p>

              <template v-if="isEnrolled">
                <NuxtLink :to="`/community/${course.slug}`" class="btn-secondary mt-4 w-full">
                  <BaseIcon name="video" :size="16" /> Live classes &amp; announcements
                </NuxtLink>
                <NuxtLink :to="`/learn/${course.slug}`" class="btn-primary mt-2 w-full">
                  <BaseIcon name="play" :size="16" /> Continue learning
                </NuxtLink>
                <p class="mt-2 text-center text-xs text-emerald-600">You already have access to this course.</p>
              </template>
              <template v-else>
                <button type="button" class="btn-primary mt-4 w-full" :disabled="adding" @click="addCourse(false)">
                  <BaseIcon name="cart" :size="16" /> {{ adding ? 'Adding…' : 'Add to cart' }}
                </button>
                <button type="button" class="btn-secondary mt-2 w-full" :disabled="adding" @click="addCourse(true)">
                  Buy now
                </button>
              </template>
            </div>

            <ul class="space-y-3 p-5 text-sm text-gray-600">
              <li class="flex items-center justify-between"><span class="inline-flex items-center gap-2"><BaseIcon name="book-open" :size="15" class="text-gray-400" /> Lessons</span><span class="font-semibold text-gray-800">{{ totalLessons }}</span></li>
              <li class="flex items-center justify-between"><span class="inline-flex items-center gap-2"><BaseIcon name="list" :size="15" class="text-gray-400" /> Quizzes</span><span class="font-semibold text-gray-800">{{ totalQuizzes }}</span></li>
              <li class="flex items-center justify-between"><span class="inline-flex items-center gap-2"><BaseIcon name="clock" :size="15" class="text-gray-400" /> Duration</span><span class="font-semibold text-gray-800">{{ course.duration_minutes ? `${course.duration_minutes} min` : '—' }}</span></li>
              <li class="flex items-center justify-between"><span class="inline-flex items-center gap-2"><BaseIcon name="shield" :size="15" class="text-gray-400" /> Certificate</span><span class="font-semibold text-gray-800">On completion</span></li>
            </ul>

            <div class="border-t border-gray-100 bg-gray-50 p-5 text-xs text-gray-500">
              <p class="flex items-start gap-2"><BaseIcon name="info" :size="14" class="mt-0.5 shrink-0" /> After payment is confirmed, an admin approves your order and enrolls you in the course.</p>
            </div>
          </div>

          <div v-if="isAuthenticated && !isEnrolled" class="card mt-4 p-4 text-xs text-gray-500">
            <p class="flex items-start gap-2"><BaseIcon name="heart" :size="14" class="mt-0.5 shrink-0 text-rose-500" /> Looking for something else? Browse the <NuxtLink to="/courses" class="font-semibold text-oc-primary hover:underline">full catalogue</NuxtLink>.</p>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>
