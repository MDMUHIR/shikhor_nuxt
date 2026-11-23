<script setup lang="ts">
import type { Certificate, LearnCourse, Lesson, Progress } from '~/utils/types'
import type { AttachmentItem } from '~/components/AttachmentList.vue'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const slug = String(route.params.slug)
const { apiData, apiFetch } = useApi()
const toast = useToast()

const { data, pending, error, refresh } = await useAsyncData(`learn-${slug}`, async () => {
  const [course, certificates, attachments] = await Promise.all([
    apiData<LearnCourse>(`/my/courses/${slug}/learn`),
    apiData<Certificate[]>('/my/certificates').catch(() => [] as Certificate[]),
    apiData<AttachmentItem[]>(`/courses/${slug}/attachments`).catch(() => [] as AttachmentItem[]),
  ])
  return { course, certificates: certificates ?? [], attachments: attachments ?? [] }
})

const course = computed(() => data.value?.course ?? null)
const sections = computed(() => course.value?.sections ?? [])
const allLessons = computed<Lesson[]>(() => sections.value.flatMap((section) => section.lessons))
const progress = ref<Progress | null>(null)

watch(
  () => course.value?.progress,
  (value) => {
    if (value) progress.value = { ...value }
  },
  { immediate: true },
)

const certificates = computed(() => data.value?.certificates ?? [])
const attachments = computed(() => data.value?.attachments ?? [])
const certificate = computed(() => {
  if (!course.value) return null
  return certificates.value.find((item) => item.course?.id === course.value?.id) ?? null
})

const selectedLessonId = ref<number | null>(Number(route.query.lesson) || null)
const activeLesson = computed<Lesson | null>(
  () => allLessons.value.find((lesson) => lesson.id === selectedLessonId.value) ?? null,
)

const videoEl = ref<HTMLVideoElement | null>(null)
const savingProgress = ref(false)
const completing = ref(false)
const issuing = ref(false)
const downloading = ref(false)
const autoMarked = ref<number | null>(null)

const progressPercent = computed(() => Math.max(0, Math.min(100, Number(progress.value?.percentage ?? 0))))
const completedCount = computed(() => progress.value?.completed_lessons ?? allLessons.value.filter((lesson) => lesson.is_completed).length)
const isComplete = computed(() => !!progress.value?.is_complete)

const videoKind = computed<'file' | 'embed' | 'none'>(() => {
  const video = activeLesson.value?.video
  if (!video) return 'none'
  if (video.source === 'upload' && video.stream_url) return 'file'
  if (video.source === 'youtube' && video.embed_url) return 'embed'
  if (video.url && embedUrl(video.url)) return 'embed'
  if (video.url) return 'file'
  return 'none'
})

const videoSrc = computed(() => activeLesson.value?.video?.stream_url || activeLesson.value?.video?.url || '')
const embeddedSrc = computed(() => activeLesson.value?.video?.embed_url || embedUrl(activeLesson.value?.video?.url) || '')

function embedUrl(url?: string | null) {
  if (!url) return ''
  const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?rel=0`
  const vimeo = url.match(/vimeo\.com\/(\d+)/)
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`
  return ''
}

function selectLesson(lesson: Lesson) {
  selectedLessonId.value = lesson.id
  router.replace({ query: { ...route.query, lesson: String(lesson.id) } })
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  allLessons,
  (lessons) => {
    if (!lessons.length) return
    const requested = Number(route.query.lesson)
    if (requested && lessons.some((lesson) => lesson.id === requested)) {
      selectedLessonId.value = requested
      return
    }
    if (selectedLessonId.value && lessons.some((lesson) => lesson.id === selectedLessonId.value)) return
    const next = lessons.find((lesson) => !lesson.is_completed && !lesson.is_locked) ?? lessons[0]
    selectedLessonId.value = next?.id ?? null
  },
  { immediate: true },
)

function onLoadedMetadata() {
  const el = videoEl.value
  const lesson = activeLesson.value
  if (!el || !lesson) return
  const resume = Number(lesson.last_position_seconds || 0)
  if (resume > 0 && Number.isFinite(el.duration) && resume < el.duration - 5) {
    el.currentTime = resume
  }
}

let lastTrackedSecond = -1

async function trackPosition(position: number) {
  const lesson = activeLesson.value
  if (!lesson) return
  try {
    await apiFetch(`/lessons/${lesson.id}/progress`, {
      method: 'POST',
      body: { position_seconds: Math.max(0, Math.floor(position)) },
    })
  } catch {
    /* progress tracking is best-effort */
  }
}

function onTimeUpdate() {
  const el = videoEl.value
  const lesson = activeLesson.value
  if (!el || !lesson) return
  const second = Math.floor(el.currentTime)
  if (second > 0 && second - lastTrackedSecond >= 15) {
    lastTrackedSecond = second
    trackPosition(second)
  }
}

function onPause() {
  const el = videoEl.value
  if (!el || !activeLesson.value || el.currentTime <= 0) return
  trackPosition(el.currentTime)
}

async function setComplete(complete: boolean) {
  const lesson = activeLesson.value
  if (!lesson) return
  completing.value = true
  try {
    const response = await apiFetch<{ data: Progress }>(`/lessons/${lesson.id}/${complete ? 'complete' : 'incomplete'}`, {
      method: 'POST',
    })
    if (response?.data) progress.value = response.data
    lesson.is_completed = complete
    toast.success(complete ? 'Lesson marked as completed.' : 'Lesson marked as incomplete.')
    // The API issues the certificate automatically once every requirement is met.
    if (complete && response?.data?.is_complete) await refresh()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    completing.value = false
  }
}

async function onEnded() {
  const lesson = activeLesson.value
  if (!lesson) return
  if (!lesson.is_completed) {
    autoMarked.value = lesson.id
    await setComplete(true)
  }
}

async function issueCertificate() {
  if (!course.value) return
  issuing.value = true
  try {
    await apiFetch(`/courses/${course.value.slug}/certificate`, { method: 'POST' })
    toast.success('Certificate issued — congratulations!')
    await refresh()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    issuing.value = false
  }
}

async function downloadCertificate() {
  if (!certificate.value) return
  downloading.value = true
  try {
    const blob = await $fetch<Blob>(`/api/proxy/certificates/${certificate.value.certificate_number}/download`, {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `certificate-${certificate.value.certificate_number}.pdf`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    toast.error((err as Error).message || 'Could not download the certificate.')
  } finally {
    downloading.value = false
  }
}

async function downloadResource(resource: { id: number; title: string }) {
  try {
    const blob = await $fetch<Blob>(`/api/proxy/lesson-resources/${resource.id}/download`, { responseType: 'blob' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = resource.title
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    toast.error((err as Error).message || 'Could not download this file.')
  }
}

function lessonIcon(lesson: Lesson) {
  if (lesson.is_locked) return 'lock'
  if (lesson.type === 'quiz') return 'list'
  if (lesson.type === 'text') return 'book'
  return lesson.is_completed ? 'check-circle' : 'play-circle'
}

onBeforeUnmount(() => {
  const el = videoEl.value
  if (el && el.currentTime > 0 && activeLesson.value && !activeLesson.value.is_completed) {
    trackPosition(el.currentTime)
  }
})

useSeoMeta({
  title: () => (course.value ? `${course.value.title} — Learning` : 'Learning — Shikhor Academy'),
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6 md:py-8">
    <div v-if="pending" class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div class="space-y-4">
        <div class="aspect-video animate-pulse rounded-2xl bg-gray-200" />
        <div class="h-6 w-2/3 animate-pulse rounded bg-gray-200" />
      </div>
      <div class="h-96 animate-pulse rounded-2xl bg-gray-100" />
    </div>

    <ErrorState
      v-else-if="error"
      title="You cannot open this course"
      :message="error.message"
      @retry="refresh"
    >
      <NuxtLink :to="`/courses/${slug}`" class="btn-primary">View course</NuxtLink>
    </ErrorState>

    <template v-else-if="course">
      <LiveBanner :slug="slug" />
      <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
        <nav class="text-xs text-gray-500" aria-label="Breadcrumb">
          <NuxtLink to="/my-courses" class="hover:text-oc-primary">My courses</NuxtLink>
          <span class="mx-1.5">/</span>
          <span class="text-gray-700">{{ course.title }}</span>
        </nav>
        <div class="flex flex-wrap items-center gap-2">
          <NuxtLink :to="`/community/${slug}`" class="btn-secondary"><BaseIcon name="video" :size="15" /> Live classes &amp; announcements</NuxtLink>
          <NuxtLink to="/my-courses" class="btn-ghost"><BaseIcon name="arrow-left" :size="15" /> My courses</NuxtLink>
          <button type="button" class="btn-ghost" :disabled="savingProgress" @click="refresh">
            <BaseIcon name="refresh" :size="15" /> Sync
          </button>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <!-- Locked / no access -->
          <section
            v-if="activeLesson?.is_locked || !course.access?.has_access"
            class="card flex flex-col items-center justify-center px-6 py-16 text-center"
          >
            <span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">
              <BaseIcon name="lock" :size="30" />
            </span>
            <h2 class="mt-4 text-lg font-bold text-gray-900">This lesson is locked</h2>
            <p class="mt-1 max-w-md text-sm text-gray-500">
              You need active access to this course to open the lesson content. Purchase the course or ask an admin to grant access.
            </p>
            <NuxtLink :to="`/courses/${course.slug}`" class="btn-primary mt-5">View course details</NuxtLink>
          </section>

          <template v-else-if="activeLesson">
            <!-- Video lesson -->
            <section v-if="activeLesson.type === 'video'" class="overflow-hidden rounded-2xl bg-black shadow-sm">
              <div class="relative aspect-video">
                <video
                  v-if="videoKind === 'file' && videoSrc"
                  ref="videoEl"
                  :key="activeLesson.id"
                  :src="videoSrc"
                  controls
                  preload="metadata"
                  class="h-full w-full"
                  @loadedmetadata="onLoadedMetadata"
                  @timeupdate="onTimeUpdate"
                  @pause="onPause"
                  @ended="onEnded"
                />
                <iframe
                  v-else-if="videoKind === 'embed'"
                  :src="embeddedSrc"
                  class="h-full w-full"
                  :title="activeLesson.title"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                />
                <div v-else class="grid h-full place-items-center text-white/60">
                  <div class="text-center">
                    <BaseIcon name="video" :size="48" class="mx-auto" />
                    <p class="mt-2 text-sm">No video has been attached to this lesson yet.</p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Text lesson -->
            <section v-else-if="activeLesson.type === 'text'" class="card p-6 md:p-8">
              <p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Reading</p>
              <h1 class="mt-1 text-xl font-extrabold text-gray-900 md:text-2xl">{{ activeLesson.title }}</h1>
              <div class="prose-content mt-4" v-html="sanitizeHtml(activeLesson.content)" />
            </section>

            <!-- Quiz lesson -->
            <section v-else-if="activeLesson.type === 'quiz'" class="card p-6 text-center md:p-10">
              <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">
                <BaseIcon name="list" :size="30" />
              </span>
              <h1 class="mt-4 text-xl font-extrabold text-gray-900">{{ activeLesson.title }}</h1>
              <p class="mt-2 text-sm text-gray-500">
                <template v-if="activeLesson.quiz">Pass mark {{ activeLesson.quiz.pass_percentage }}%<template v-if="activeLesson.quiz.time_limit_minutes"> · {{ activeLesson.quiz.time_limit_minutes }} minute limit</template>.</template>
                Complete the quiz to unlock the next lesson.
              </p>
              <div class="mt-5 flex flex-wrap justify-center gap-2">
                <NuxtLink
                  v-if="activeLesson.quiz"
                  :to="`/quizzes/${activeLesson.quiz.id}?course=${course.slug}`"
                  class="btn-primary"
                >
                  <BaseIcon name="play" :size="15" />
                  {{ activeLesson.is_completed ? 'Retake quiz' : 'Start quiz' }}
                </NuxtLink>
                <button
                  v-if="!activeLesson.is_completed"
                  type="button"
                  class="btn-secondary"
                  :disabled="completing"
                  @click="setComplete(true)"
                >
                  Mark as complete
                </button>
              </div>
            </section>

            <div class="card mt-4 p-5">
              <div class="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 class="text-base font-bold text-gray-900">{{ activeLesson.title }}</h2>
                  <p v-if="activeLesson.description" class="mt-1 text-sm text-gray-600">{{ activeLesson.description }}</p>
                  <p class="mt-2 text-xs text-gray-400">
                    <template v-if="activeLesson.duration_seconds">{{ formatDuration(activeLesson.duration_seconds) }} · </template>
                    {{ activeLesson.type === 'video' ? 'Video lesson' : activeLesson.type === 'text' ? 'Reading lesson' : 'Quiz lesson' }}
                  </p>
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="activeLesson.is_completed"
                    class="badge bg-emerald-50 text-emerald-700 ring-emerald-200"
                  >
                    <BaseIcon name="check" :size="13" /> Completed
                  </span>
                  <button
                    v-if="activeLesson.type !== 'quiz'"
                    type="button"
                    class="btn-secondary"
                    :disabled="completing"
                    @click="setComplete(!activeLesson.is_completed)"
                  >
                    <BaseIcon :name="activeLesson.is_completed ? 'rotate-ccw' : 'check'" :size="15" />
                    {{ activeLesson.is_completed ? 'Mark incomplete' : 'Mark complete' }}
                  </button>
                </div>
              </div>
            </div>

            <section v-if="attachments.length" class="card mt-4 p-5">
              <h3 class="mb-3 text-sm font-bold text-gray-900">Course materials</h3>
              <AttachmentList :items="attachments" />
            </section>

            <section class="card mt-4 flex flex-wrap items-center justify-between gap-3 p-5">
              <div>
                <h3 class="text-sm font-bold text-gray-900">Enjoying this course?</h3>
                <p class="text-xs text-gray-500">Share a rating and review to help other students.</p>
              </div>
              <NuxtLink :to="`/courses/${course.slug}#reviews`" class="btn-secondary">
                <BaseIcon name="star" :size="15" /> Rate this course
              </NuxtLink>
            </section>

            <section v-if="activeLesson.resources?.length" class="card mt-4 p-5">
              <h3 class="text-sm font-bold text-gray-900">Lesson resources</h3>
              <ul class="mt-3 space-y-2">
                <li v-for="resource in activeLesson.resources" :key="resource.id">
                  <a
                    v-if="resource.external_url"
                    :href="resource.external_url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-2 text-sm font-medium text-oc-primary hover:underline"
                  >
                    <BaseIcon name="external-link" :size="14" /> {{ resource.title }}
                  </a>
                  <button
                    v-else
                    type="button"
                    class="flex items-center gap-2 text-sm font-medium text-oc-primary hover:underline"
                    @click="downloadResource(resource)"
                  >
                    <BaseIcon name="download" :size="14" /> {{ resource.title }}
                  </button>
                </li>
              </ul>
            </section>

            <!-- Certificate CTA -->
            <section v-if="isComplete || certificate" class="mt-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-start gap-3">
                  <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <BaseIcon name="award" :size="22" />
                  </span>
                  <div>
                    <h3 class="text-sm font-bold text-gray-900">You finished this course!</h3>
                    <p class="text-xs text-gray-600">
                      {{ certificate ? `Certificate ${certificate.certificate_number} is ready.` : 'Claim your verifiable certificate of completion.' }}
                    </p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <button
                    v-if="!certificate"
                    type="button"
                    class="btn-primary"
                    :disabled="issuing"
                    @click="issueCertificate"
                  >
                    <BaseIcon name="award" :size="15" /> {{ issuing ? 'Issuing…' : 'Claim certificate' }}
                  </button>
                  <template v-else>
                    <button type="button" class="btn-primary" :disabled="downloading" @click="downloadCertificate">
                      <BaseIcon name="download" :size="15" /> {{ downloading ? 'Preparing…' : 'Download PDF' }}
                    </button>
                    <NuxtLink to="/certificates" class="btn-secondary">All certificates</NuxtLink>
                  </template>
                </div>
              </div>
            </section>
          </template>

          <EmptyState
            v-else
            icon="book-open"
            title="No lessons yet"
            message="The instructor is still preparing the curriculum for this course."
            action-label="Back to my courses"
            action-to="/my-courses"
          />
        </div>

        <aside class="lg:sticky lg:top-24 lg:self-start">
          <div class="card overflow-hidden">
            <div class="border-b border-gray-100 p-5">
              <h2 class="text-sm font-bold text-gray-900">{{ course.title }}</h2>
              <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                <span>{{ completedCount }}/{{ progress?.total_lessons ?? allLessons.length }} lessons</span>
                <span class="font-semibold text-gray-700">{{ progressPercent }}%</span>
              </div>
              <div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                <span class="block h-full rounded-full bg-oc-primary transition-all" :style="{ width: `${progressPercent}%` }" />
              </div>
            </div>

            <div class="max-h-[60vh] overflow-y-auto">
              <div v-for="section in sections" :key="section.id" class="border-b border-gray-100 last:border-0">
                <p class="bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">{{ section.title }}</p>
                <ul>
                  <li v-for="lesson in section.lessons" :key="lesson.id">
                    <button
                      type="button"
                      class="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition"
                      :class="selectedLessonId === lesson.id ? 'bg-brand-light text-oc-primary' : 'text-gray-700 hover:bg-gray-50'"
                      @click="selectLesson(lesson)"
                    >
                      <BaseIcon
                        :name="lessonIcon(lesson)"
                        :size="16"
                        :class="lesson.is_locked ? 'text-gray-400' : lesson.is_completed ? 'text-emerald-500' : 'text-oc-primary'"
                      />
                      <span class="flex-1" :class="{ 'text-gray-400': lesson.is_locked }">{{ lesson.title }}</span>
                      <span v-if="lesson.is_preview && lesson.is_locked" class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Preview</span>
                      <span v-else-if="lesson.duration_seconds" class="text-[11px] text-gray-400">{{ formatDuration(lesson.duration_seconds) }}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card mt-4 p-4">
            <p class="text-xs font-bold uppercase tracking-wide text-gray-400">Need help?</p>
            <NuxtLink to="/contact" class="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-oc-primary">
              <BaseIcon name="phone" :size="15" /> Contact support
            </NuxtLink>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>
