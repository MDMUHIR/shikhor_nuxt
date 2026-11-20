<script setup lang="ts">
import type {
  AdminCourse,
  AdminLesson,
  AdminQuiz,
  AdminQuizQuestion,
  CourseCategory,
  CourseSection,
} from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const { apiData, apiUpload } = useApi()
const { isAdmin } = useAuth()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const isNew = computed(() => route.params.id === 'new')
const courseId = computed(() => Number(route.params.id))

const { data: course, pending, error, refresh } = await useAsyncData(
  () => `admin-course-${route.params.id}`,
  () => (isNew.value ? Promise.resolve(null) : apiData<AdminCourse>(`/admin/courses/${courseId.value}`)),
  { watch: [() => route.params.id] },
)

const { data: categories } = await useAsyncData('admin-course-category-options', () =>
  apiData<CourseCategory[]>('/admin/course-categories').catch(() => [] as CourseCategory[]),
)

const tab = ref<'details' | 'curriculum' | 'quizzes'>('details')
const tabs = [
  { value: 'details' as const, label: 'Details', icon: 'edit' },
  { value: 'curriculum' as const, label: 'Curriculum', icon: 'list' },
  { value: 'quizzes' as const, label: 'Quizzes', icon: 'check-circle' },
]

function setTab(value: 'details' | 'curriculum' | 'quizzes') {
  tab.value = value
}

const thumbnailFile = ref<File | null>(null)
const thumbnailPreview = ref('')

const details = reactive({
  title: '',
  slug: '',
  subtitle: '',
  description: '',
  course_category_id: '' as string | number,
  level: 'all',
  language: 'en',
  price: 0,
  offer_price: '' as string | number,
  lifetime: true,
  access_days: 30,
  status: 'draft',
  is_featured: false,
  promo_video_url: '',
  requirements: '',
  outcomes: '',
})

watch(
  course,
  (value) => {
    if (!value) return
    Object.assign(details, {
      title: value.title || '',
      slug: value.slug || '',
      subtitle: value.subtitle || '',
      description: value.description || '',
      course_category_id: value.category_id ?? '',
      level: value.level || 'all',
      language: value.language || 'en',
      price: value.price ?? 0,
      offer_price: value.offer_price ?? '',
      lifetime: value.access_days === 0,
      access_days: value.access_days && value.access_days > 0 ? value.access_days : 30,
      status: value.status || 'draft',
      is_featured: !!value.is_featured,
      promo_video_url: value.promo_video_url || '',
      requirements: (value.requirements || []).join('\n'),
      outcomes: (value.outcomes || []).join('\n'),
    })
    thumbnailPreview.value = value.thumbnail ? mediaUrl(value.thumbnail) : ''
  },
  { immediate: true },
)

function onThumbnailChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] ?? null
  thumbnailFile.value = file
  thumbnailPreview.value = file ? URL.createObjectURL(file) : ''
}

function lines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

async function saveDetails() {
  const payload = new FormData()
  if (!isNew.value && course.value) payload.append('id', String(course.value.id))
  payload.append('title', details.title)
  payload.append('slug', details.slug)
  payload.append('subtitle', details.subtitle)
  payload.append('description', details.description)
  payload.append('course_category_id', String(details.course_category_id || ''))
  payload.append('level', details.level)
  payload.append('language', details.language)
  payload.append('price', String(details.price || 0))
  if (details.offer_price !== '' && details.offer_price !== null) payload.append('offer_price', String(details.offer_price))
  if (details.lifetime) payload.append('access_days', '0')
  else payload.append('access_days', String(details.access_days || 0))
  payload.append('status', details.status)
  payload.append('is_featured', details.is_featured ? '1' : '0')
  payload.append('promo_video_url', details.promo_video_url)
  lines(details.requirements).forEach((line, index) => payload.append(`requirements[${index}]`, line))
  lines(details.outcomes).forEach((line, index) => payload.append(`outcomes[${index}]`, line))
  if (thumbnailFile.value) payload.append('thumbnail', thumbnailFile.value)

  const result = await run(
    () =>
      apiUpload<{ data: { id: number } }>(
        isNew.value ? '/admin/courses/add' : '/admin/courses/update',
        payload,
      ),
    isNew.value ? 'Course created.' : 'Course saved.',
  )
  if (!result) return

  if (isNew.value) {
    await navigateTo(`/admin/courses/${result.data.id}`)
    return
  }
  thumbnailFile.value = null
  await refresh()
}

const sections = computed(() => course.value?.sections ?? [])
const quizzes = computed(() => course.value?.quizzes ?? [])
const allLessons = computed<AdminLesson[]>(() => sections.value.flatMap((section) => section.lessons ?? []))

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

const sectionModal = ref(false)
const sectionForm = reactive({ id: null as number | null, title: '', description: '', sort_order: 0 })

function openSection(section?: CourseSection) {
  Object.assign(sectionForm, {
    id: section?.id ?? null,
    title: section?.title ?? '',
    description: section?.description ?? '',
    sort_order: section?.sort_order ?? sections.value.length,
  })
  resetErrors()
  sectionModal.value = true
}

async function saveSection() {
  const result = await run(
    () =>
      apiData('/admin/course-sections/' + (sectionForm.id ? 'update' : 'add'), {
        method: 'POST',
        body: {
          ...(sectionForm.id ? { id: sectionForm.id } : { course_id: courseId.value }),
          title: sectionForm.title,
          description: sectionForm.description,
          sort_order: sectionForm.sort_order,
        },
      }),
    sectionForm.id ? 'Section updated.' : 'Section added.',
  )
  if (result === undefined) return
  sectionModal.value = false
  await refresh()
}

async function removeSection(section: CourseSection) {
  const ok = await ask({
    title: 'Delete section',
    message: `Delete “${section.title}”? Lessons inside this section will also be removed.`,
    confirmLabel: 'Delete section',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/course-sections/delete/${section.id}`, { method: 'DELETE' }), 'Section deleted.')
  if (result !== undefined) await refresh()
}

async function moveSection(section: CourseSection, direction: -1 | 1) {
  const ordered = [...sections.value].sort((a, b) => a.sort_order - b.sort_order)
  const index = ordered.findIndex((item) => item.id === section.id)
  const target = index + direction
  if (index < 0 || target < 0 || target >= ordered.length) return
  ;[ordered[index], ordered[target]] = [ordered[target]!, ordered[index]!]
  const payload = ordered.map((item, position) => ({ id: item.id, sort_order: position }))
  const result = await run(
    () => apiData('/admin/course-sections/reorder', { method: 'POST', body: { sections: payload } }),
    'Section order saved.',
  )
  if (result !== undefined) await refresh()
}

/* ------------------------------------------------------------------ */
/* Lessons                                                             */
/* ------------------------------------------------------------------ */

const lessonModal = ref(false)
const lessonFile = ref<File | null>(null)
const lessonForm = reactive({
  id: null as number | null,
  course_section_id: '' as string | number,
  title: '',
  slug: '',
  description: '',
  type: 'video' as 'video' | 'text' | 'quiz',
  duration_seconds: 0,
  content: '',
  video_source: 'external' as 'external' | 'upload' | 'youtube',
  completion_threshold: null as number | null,
  is_required: true,
  video_url: '',
  is_preview: false,
  is_published: true,
  sort_order: 0,
  remove_video: false,
})

function openLesson(section?: CourseSection, lesson?: AdminLesson) {
  lessonFile.value = null
  Object.assign(lessonForm, {
    id: lesson?.id ?? null,
    course_section_id: lesson?.section_id ?? section?.id ?? '',
    title: lesson?.title ?? '',
    slug: lesson?.slug ?? '',
    description: lesson?.description ?? '',
    type: lesson?.type ?? 'video',
    duration_seconds: lesson?.duration_seconds ?? 0,
    content: lesson?.content ?? '',
    video_source: lesson?.video_source ?? 'external',
    completion_threshold: (lesson as AdminLesson & { completion_threshold?: number | null })?.completion_threshold ?? null,
    is_required: (lesson as AdminLesson & { is_required?: boolean })?.is_required ?? true,
    video_url: lesson?.video_url ?? '',
    is_preview: lesson?.is_preview ?? false,
    is_published: lesson?.is_published ?? true,
    sort_order: lesson?.sort_order ?? (section?.lessons?.length ?? 0),
    remove_video: false,
  })
  resetErrors()
  lessonModal.value = true
}

function onLessonFile(event: Event) {
  lessonFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
}

async function saveLesson() {
  const payload = new FormData()
  if (lessonForm.id) payload.append('id', String(lessonForm.id))
  else payload.append('course_id', String(courseId.value))
  payload.append('course_section_id', String(lessonForm.course_section_id || ''))
  payload.append('title', lessonForm.title)
  payload.append('slug', lessonForm.slug)
  payload.append('description', lessonForm.description)
  payload.append('type', lessonForm.type)
  payload.append('duration_seconds', String(lessonForm.duration_seconds || 0))
  payload.append('content', lessonForm.content)
  payload.append('is_preview', lessonForm.is_preview ? '1' : '0')
  payload.append('is_published', lessonForm.is_published ? '1' : '0')
  payload.append('sort_order', String(lessonForm.sort_order || 0))
  payload.append('is_required', lessonForm.is_required ? '1' : '0')
  if (lessonForm.completion_threshold) payload.append('completion_threshold', String(lessonForm.completion_threshold))
  if (lessonForm.type === 'video') {
    payload.append('video_source', lessonForm.video_source)
    payload.append('video_url', lessonForm.video_url)
    if (lessonFile.value) payload.append('video', lessonFile.value)
    if (lessonForm.remove_video) payload.append('remove_video', '1')
  }

  const result = await run(
    () => apiUpload('/admin/lessons/' + (lessonForm.id ? 'update' : 'add'), payload),
    lessonForm.id ? 'Lesson saved.' : 'Lesson added.',
  )
  if (result === undefined) return
  lessonModal.value = false
  await refresh()
}

async function removeLesson(lesson: AdminLesson) {
  const ok = await ask({
    title: 'Delete lesson',
    message: `Delete “${lesson.title}”? Student progress for this lesson will be removed.`,
    confirmLabel: 'Delete lesson',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/lessons/delete/${lesson.id}`, { method: 'DELETE' }), 'Lesson deleted.')
  if (result !== undefined) await refresh()
}

async function moveLesson(section: CourseSection, lesson: AdminLesson, direction: -1 | 1) {
  const ordered = [...(section.lessons ?? [])].sort((a, b) => a.sort_order - b.sort_order)
  const index = ordered.findIndex((item) => item.id === lesson.id)
  const target = index + direction
  if (index < 0 || target < 0 || target >= ordered.length) return
  ;[ordered[index], ordered[target]] = [ordered[target]!, ordered[index]!]
  const payload = ordered.map((item, position) => ({
    id: item.id,
    sort_order: position,
    course_section_id: section.id,
  }))
  const result = await run(() => apiData('/admin/lessons/reorder', { method: 'POST', body: { lessons: payload } }), 'Lesson order saved.')
  if (result !== undefined) await refresh()
}

/* ------------------------------------------------------------------ */
/* Quizzes                                                             */
/* ------------------------------------------------------------------ */

const quizModal = ref(false)
const quizForm = reactive({
  id: null as number | null,
  title: '',
  description: '',
  lesson_id: '' as string | number,
  pass_percentage: 60,
  time_limit_minutes: '' as string | number,
  max_attempts: '' as string | number,
  is_published: true,
  sort_order: 0,
})

function openQuiz(quiz?: AdminQuiz) {
  Object.assign(quizForm, {
    id: quiz?.id ?? null,
    title: quiz?.title ?? '',
    description: quiz?.description ?? '',
    lesson_id: quiz?.lesson_id ?? '',
    pass_percentage: quiz?.pass_percentage ?? 60,
    time_limit_minutes: quiz?.time_limit_minutes ?? '',
    max_attempts: quiz?.max_attempts ?? '',
    is_published: quiz?.is_published ?? true,
    sort_order: quiz?.sort_order ?? quizzes.value.length,
  })
  resetErrors()
  quizModal.value = true
}

async function saveQuiz() {
  const body = {
    ...(quizForm.id ? { id: quizForm.id } : { course_id: courseId.value }),
    title: quizForm.title,
    description: quizForm.description,
    lesson_id: quizForm.lesson_id || null,
    pass_percentage: quizForm.pass_percentage,
    time_limit_minutes: quizForm.time_limit_minutes === '' ? null : Number(quizForm.time_limit_minutes),
    max_attempts: quizForm.max_attempts === '' ? null : Number(quizForm.max_attempts),
    is_published: quizForm.is_published ? 1 : 0,
    sort_order: quizForm.sort_order,
  }
  const result = await run(
    () => apiData('/admin/quizzes/' + (quizForm.id ? 'update' : 'add'), { method: 'POST', body }),
    quizForm.id ? 'Quiz saved.' : 'Quiz added.',
  )
  if (result === undefined) return
  quizModal.value = false
  await refresh()
}

async function removeQuiz(quiz: AdminQuiz) {
  const ok = await ask({
    title: 'Delete quiz',
    message: `Delete “${quiz.title}” and all of its questions? This cannot be undone.`,
    confirmLabel: 'Delete quiz',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/quizzes/delete/${quiz.id}`, { method: 'DELETE' }), 'Quiz deleted.')
  if (result !== undefined) await refresh()
}

const questionModal = ref(false)
const activeQuiz = ref<AdminQuiz | null>(null)
const questions = ref<AdminQuizQuestion[]>([])
const questionsLoading = ref(false)

const questionForm = reactive({
  id: null as number | null,
  type: 'single_choice' as 'single_choice' | 'multiple_choice' | 'true_false',
  question: '',
  marks: 1,
  sort_order: 0,
  options: [{ id: 'a', text: '' }, { id: 'b', text: '' }] as Array<{ id: string; text: string }>,
  correct: [] as string[],
})

async function openQuestions(quiz: AdminQuiz) {
  activeQuiz.value = quiz
  questionModal.value = true
  await loadQuestions()
  resetQuestion()
}

async function loadQuestions() {
  if (!activeQuiz.value) return
  questionsLoading.value = true
  try {
    const detail = await apiData<AdminQuiz>(`/admin/quizzes/${activeQuiz.value.id}`)
    questions.value = detail.questions ?? []
  } catch (err: unknown) {
    toastError((err as { message?: string }).message || 'Could not load questions.')
  } finally {
    questionsLoading.value = false
  }
}

const toast = useToast()
function toastError(message: string) {
  toast.error(message)
}

function resetQuestion() {
  Object.assign(questionForm, {
    id: null,
    type: 'single_choice',
    question: '',
    marks: 1,
    sort_order: questions.value.length,
    options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
    correct: [],
  })
  resetErrors()
}

function editQuestion(question: AdminQuizQuestion) {
  Object.assign(questionForm, {
    id: question.id,
    type: question.type,
    question: question.question,
    marks: question.marks,
    sort_order: question.sort_order,
    options: (question.options || []).map((option) => ({ id: String(option.id), text: option.text })),
    correct: [...(question.correct_answers || [])].map(String),
  })
  resetErrors()
}

function addOption() {
  const id = String.fromCharCode(97 + questionForm.options.length)
  questionForm.options.push({ id, text: '' })
}

function removeOption(index: number) {
  if (questionForm.options.length <= 2) return
  const removed = questionForm.options[index]
  questionForm.options.splice(index, 1)
  if (removed) questionForm.correct = questionForm.correct.filter((value) => value !== removed.id)
}

function toggleCorrect(optionId: string) {
  if (questionForm.type === 'multiple_choice') {
    questionForm.correct = questionForm.correct.includes(optionId)
      ? questionForm.correct.filter((value) => value !== optionId)
      : [...questionForm.correct, optionId]
  } else {
    questionForm.correct = [optionId]
  }
}

function onQuestionTypeChange() {
  if (questionForm.type === 'true_false') {
    questionForm.options = [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ]
    questionForm.correct = []
    return
  }
  if (questionForm.options.some((option) => option.id === 'true' || option.id === 'false')) {
    questionForm.options = [{ id: 'a', text: '' }, { id: 'b', text: '' }]
    questionForm.correct = []
    return
  }
  if (questionForm.type === 'single_choice' && questionForm.correct.length > 1) {
    questionForm.correct = [questionForm.correct[0]!]
  }
}

async function saveQuestion() {
  if (!activeQuiz.value) return
  const body = {
    ...(questionForm.id ? { id: questionForm.id } : { quiz_id: activeQuiz.value.id }),
    type: questionForm.type,
    question: questionForm.question,
    options: questionForm.options.map((option) => ({ id: option.id, text: option.text })),
    correct_answers: questionForm.correct,
    marks: questionForm.marks,
    sort_order: questionForm.sort_order,
  }
  const result = await run(
    () => apiData('/admin/quiz-questions/' + (questionForm.id ? 'update' : 'add'), { method: 'POST', body }),
    questionForm.id ? 'Question saved.' : 'Question added.',
  )
  if (result === undefined) return
  await loadQuestions()
  resetQuestion()
  refresh()
}

async function removeQuestion(question: AdminQuizQuestion) {
  const ok = await ask({
    title: 'Delete question',
    message: 'Delete this question from the quiz?',
    confirmLabel: 'Delete question',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/quiz-questions/delete/${question.id}`, { method: 'DELETE' }), 'Question deleted.')
  if (result !== undefined) {
    await loadQuestions()
    refresh()
  }
}

function questionTypeLabel(type: string) {
  return type === 'multiple_choice' ? 'Multiple choice' : type === 'true_false' ? 'True / false' : 'Single choice'
}
</script>

<template>
  <div>
    <AdminPageHeader
      :title="isNew ? 'New course' : course?.title || 'Course builder'"
      :subtitle="isNew ? 'Create the course shell first, then add sections, lessons and quizzes.' : 'Edit course details, build the curriculum and attach quizzes.'"
      icon="book-open"
    >
      <NuxtLink to="/admin/courses" class="btn-secondary">
        <BaseIcon name="arrow-left" :size="16" /> All courses
      </NuxtLink>
      <NuxtLink
        v-if="course && course.status === 'published'"
        :to="`/courses/${course.slug}`"
        target="_blank"
        class="btn-secondary"
      >
        <BaseIcon name="external-link" :size="15" /> View live
      </NuxtLink>
      <StatusBadge v-if="course" :status="course.status" />
    </AdminPageHeader>

    <div v-if="pending && !isNew" class="space-y-3">
      <div class="card h-24 animate-pulse bg-gray-50" />
      <div class="card h-64 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load this course" :message="error.message" @retry="refresh" />

    <template v-else>
      <div class="mb-4 flex flex-wrap gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-sm">
        <button
          v-for="item in tabs"
          :key="item.value"
          type="button"
          class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition sm:flex-none"
          :class="tab === item.value ? 'bg-oc-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
          @click="setTab(item.value)"
        >
          <BaseIcon :name="item.icon" :size="16" /> {{ item.label }}
          <span
            v-if="item.value === 'curriculum' && course"
            class="rounded-full px-1.5 text-[10px]"
            :class="tab === 'curriculum' ? 'bg-white/20' : 'bg-gray-100'"
          >{{ allLessons.length }}</span>
          <span
            v-else-if="item.value === 'quizzes' && course"
            class="rounded-full px-1.5 text-[10px]"
            :class="tab === 'quizzes' ? 'bg-white/20' : 'bg-gray-100'"
          >{{ quizzes.length }}</span>
        </button>
      </div>

      <!-- Details -->
      <form v-if="tab === 'details'" class="space-y-4" @submit.prevent="saveDetails">
        <section class="card p-5">
          <h2 class="mb-4 text-sm font-bold text-gray-900">Course information</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="field-label" for="course-title">Title</label>
              <input id="course-title" v-model="details.title" type="text" class="field-input" required placeholder="Complete web development bootcamp">
              <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
            </div>
            <div>
              <label class="field-label" for="course-slug">Slug</label>
              <input id="course-slug" v-model="details.slug" type="text" class="field-input" placeholder="complete-web-development-bootcamp">
              <p v-if="fieldError('slug')" class="field-error">{{ fieldError('slug') }}</p>
            </div>
            <div>
              <label class="field-label" for="course-subtitle">Subtitle</label>
              <input id="course-subtitle" v-model="details.subtitle" type="text" class="field-input" placeholder="Go from zero to job-ready">
              <p v-if="fieldError('subtitle')" class="field-error">{{ fieldError('subtitle') }}</p>
            </div>
            <div class="md:col-span-2">
              <label class="field-label" for="course-description">Description</label>
              <textarea id="course-description" v-model="details.description" rows="4" class="field-input" placeholder="What the course covers, who it is for, and the outcome students can expect." />
            </div>
            <div>
              <label class="field-label" for="course-category">Category</label>
              <select id="course-category" v-model="details.course_category_id" class="field-input">
                <option value="">Uncategorised</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div>
              <label class="field-label" for="course-level">Level</label>
              <select id="course-level" v-model="details.level" class="field-input">
                <option value="all">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label class="field-label" for="course-language">Language</label>
              <input id="course-language" v-model="details.language" type="text" class="field-input" placeholder="en">
            </div>
            <div>
              <label class="field-label" for="course-promo">Promo video URL</label>
              <input id="course-promo" v-model="details.promo_video_url" type="url" class="field-input" placeholder="https://…">
              <p v-if="fieldError('promo_video_url')" class="field-error">{{ fieldError('promo_video_url') }}</p>
            </div>
          </div>
        </section>

        <section class="card p-5">
          <h2 class="mb-4 text-sm font-bold text-gray-900">Pricing & access</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="field-label" for="course-price">Price (BDT)</label>
              <input id="course-price" v-model.number="details.price" type="number" min="0" step="0.01" class="field-input">
              <p v-if="fieldError('price')" class="field-error">{{ fieldError('price') }}</p>
            </div>
            <div>
              <label class="field-label" for="course-offer">Offer price (optional)</label>
              <input id="course-offer" v-model="details.offer_price" type="number" min="0" step="0.01" class="field-input" placeholder="Leave empty for no discount">
              <p v-if="fieldError('offer_price')" class="field-error">{{ fieldError('offer_price') }}</p>
            </div>
            <div class="md:col-span-2 rounded-xl border border-gray-100 bg-gray-50/60 p-3">
              <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <input v-model="details.lifetime" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
                Lifetime access
              </label>
              <div v-if="!details.lifetime" class="mt-2 max-w-xs">
                <label class="field-label" for="course-days">Access days</label>
                <input id="course-days" v-model.number="details.access_days" type="number" min="1" class="field-input">
                <p class="mt-1 text-[11px] text-gray-400">Students keep access for this many days after enrolment.</p>
              </div>
            </div>
          </div>
        </section>

        <section class="card p-5">
          <h2 class="mb-4 text-sm font-bold text-gray-900">Publishing</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="field-label" for="course-status">Status</label>
              <select id="course-status" v-model="details.status" class="field-input">
                <option value="draft">Draft</option>
                <option value="under_review">Submit for review</option>
                <option value="published">{{ isAdmin ? 'Published' : 'Request publishing (admin approval)' }}</option>
                <option value="unpublished">Unpublished</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <label class="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700">
              <input v-model="details.is_featured" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
              Feature on the homepage
            </label>
            <div class="md:col-span-2">
              <label class="field-label">Thumbnail</label>
              <div class="flex flex-wrap items-center gap-4">
                <img :src="thumbnailPreview || '/images/placeholder.svg'" alt="Course thumbnail" class="h-24 w-36 rounded-xl border border-gray-100 object-cover" @error="imageFallback">
                <div>
                  <input type="file" accept="image/*" class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onThumbnailChange">
                  <p class="mt-1 text-[11px] text-gray-400">Recommended 16:9, JPG or PNG.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CourseAttachmentsManager v-if="courseId" :course-id="courseId" />

        <section class="card p-5">
          <h2 class="mb-4 text-sm font-bold text-gray-900">Learning outcomes</h2>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="field-label" for="course-requirements">Requirements (one per line)</label>
              <textarea id="course-requirements" v-model="details.requirements" rows="5" class="field-input" placeholder="A computer with internet access" />
            </div>
            <div>
              <label class="field-label" for="course-outcomes">What students will learn (one per line)</label>
              <textarea id="course-outcomes" v-model="details.outcomes" rows="5" class="field-input" placeholder="Build responsive layouts with modern CSS" />
            </div>
          </div>
        </section>

        <div class="flex flex-wrap items-center justify-end gap-2">
          <NuxtLink to="/admin/courses" class="btn-secondary">Cancel</NuxtLink>
          <button type="submit" class="btn-primary" :disabled="busy">
            <BaseIcon v-if="busy" name="refresh" :size="15" class="animate-spin" />
            <BaseIcon v-else name="save" :size="16" />
            {{ isNew ? 'Create course' : 'Save changes' }}
          </button>
        </div>
      </form>

      <!-- Curriculum -->
      <div v-else-if="tab === 'curriculum' && !isNew" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-sm text-gray-500">
            {{ sections.length }} section{{ sections.length === 1 ? '' : 's' }} · {{ allLessons.length }} lesson{{ allLessons.length === 1 ? '' : 's' }}
          </p>
          <div class="flex gap-2">
            <button type="button" class="btn-secondary" @click="openLesson()">
              <BaseIcon name="plus" :size="15" /> Add lesson
            </button>
            <button type="button" class="btn-primary" @click="openSection()">
              <BaseIcon name="plus" :size="15" /> Add section
            </button>
          </div>
        </div>

        <EmptyState
          v-if="!sections.length"
          icon="list"
          title="No curriculum yet"
          message="Add a section, then place video, text or quiz lessons inside it."
          action-label="Add the first section"
          @action="openSection()"
        />

        <section v-for="(section, sectionIndex) in sections" :key="section.id" class="card overflow-hidden">
          <div class="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50/60 px-4 py-3">
            <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-500 ring-1 ring-gray-200">
              {{ sectionIndex + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <h3 class="truncate text-sm font-bold text-gray-900">{{ section.title }}</h3>
              <p v-if="section.description" class="truncate text-[11px] text-gray-500">{{ section.description }}</p>
            </div>
            <div class="flex items-center gap-0.5">
              <button type="button" class="btn-ghost !p-1.5" :disabled="sectionIndex === 0" aria-label="Move section up" @click="moveSection(section, -1)">
                <BaseIcon name="chevron-up" :size="15" />
              </button>
              <button type="button" class="btn-ghost !p-1.5" :disabled="sectionIndex === sections.length - 1" aria-label="Move section down" @click="moveSection(section, 1)">
                <BaseIcon name="chevron-down" :size="15" />
              </button>
              <button type="button" class="btn-ghost !p-1.5" aria-label="Add lesson to section" @click="openLesson(section)">
                <BaseIcon name="plus" :size="15" />
              </button>
              <button type="button" class="btn-ghost !p-1.5" aria-label="Edit section" @click="openSection(section)">
                <BaseIcon name="edit" :size="15" />
              </button>
              <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete section" @click="removeSection(section)">
                <BaseIcon name="trash" :size="15" />
              </button>
            </div>
          </div>

          <div v-if="!section.lessons?.length" class="px-4 py-5 text-center text-xs text-gray-400">
            No lessons in this section yet.
            <button type="button" class="font-semibold text-oc-primary hover:underline" @click="openLesson(section)">Add one</button>
          </div>
          <ul v-else class="divide-y divide-gray-50">
            <li v-for="(lesson, lessonIndex) in section.lessons" :key="lesson.id" class="flex flex-wrap items-center gap-2 px-4 py-2.5">
              <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-oc-primary">
                <BaseIcon :name="lesson.type === 'video' ? 'video' : lesson.type === 'quiz' ? 'check-circle' : 'blog'" :size="15" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-gray-800">
                  <span class="truncate">{{ lesson.title }}</span>
                  <span v-if="lesson.is_preview" class="badge bg-blue-50 text-blue-700 ring-blue-200">Preview</span>
                  <span v-if="!lesson.is_published" class="badge bg-gray-100 text-gray-600 ring-gray-200">Hidden</span>
                  <span v-if="lesson.quiz" class="badge bg-violet-50 text-violet-700 ring-violet-200">Quiz</span>
                </p>
                <p class="text-[11px] text-gray-400">
                  {{ lesson.type }} · {{ formatDuration(lesson.duration_seconds) }}
                  <template v-if="lesson.video_source"> · {{ lesson.video_source }}</template>
                </p>
              </div>
              <div class="flex items-center gap-0.5">
                <button type="button" class="btn-ghost !p-1.5" :disabled="lessonIndex === 0" aria-label="Move lesson up" @click="moveLesson(section, lesson, -1)">
                  <BaseIcon name="chevron-up" :size="14" />
                </button>
                <button type="button" class="btn-ghost !p-1.5" :disabled="lessonIndex === (section.lessons?.length ?? 1) - 1" aria-label="Move lesson down" @click="moveLesson(section, lesson, 1)">
                  <BaseIcon name="chevron-down" :size="14" />
                </button>
                <button type="button" class="btn-ghost !p-1.5" aria-label="Edit lesson" @click="openLesson(section, lesson)">
                  <BaseIcon name="edit" :size="14" />
                </button>
                <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete lesson" @click="removeLesson(lesson)">
                  <BaseIcon name="trash" :size="14" />
                </button>
              </div>
            </li>
          </ul>
        </section>
      </div>

      <!-- Quizzes -->
      <div v-else-if="tab === 'quizzes' && !isNew" class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <p class="text-sm text-gray-500">Quizzes attached to this course. A quiz can be linked to one lesson.</p>
          <button type="button" class="btn-primary" @click="openQuiz()">
            <BaseIcon name="plus" :size="15" /> Add quiz
          </button>
        </div>

        <EmptyState
          v-if="!quizzes.length"
          icon="check-circle"
          title="No quizzes yet"
          message="Create a quiz, then add questions with single or multiple correct answers."
          action-label="Create the first quiz"
          @action="openQuiz()"
        />

        <article v-for="quiz in quizzes" :key="quiz.id" class="card p-4">
          <div class="flex flex-wrap items-start justify-between gap-2">
            <div class="min-w-0">
              <h3 class="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-900">
                {{ quiz.title }}
                <StatusBadge :status="quiz.is_published ? 'published' : 'draft'" />
                <span v-if="quiz.lesson_id" class="badge bg-violet-50 text-violet-700 ring-violet-200">
                  Lesson #{{ quiz.lesson_id }}
                </span>
              </h3>
              <p v-if="quiz.description" class="mt-1 line-clamp-2 text-xs text-gray-500">{{ quiz.description }}</p>
              <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500">
                <span>{{ quiz.questions_count ?? 0 }} questions</span>
                <span>Pass {{ quiz.pass_percentage }}%</span>
                <span v-if="quiz.time_limit_minutes">{{ quiz.time_limit_minutes }} min limit</span>
                <span v-if="quiz.max_attempts">{{ quiz.max_attempts }} attempts</span>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs" @click="openQuestions(quiz)">
                <BaseIcon name="list" :size="14" /> Questions
              </button>
              <button type="button" class="btn-ghost !p-1.5" aria-label="Edit quiz" @click="openQuiz(quiz)">
                <BaseIcon name="edit" :size="15" />
              </button>
              <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete quiz" @click="removeQuiz(quiz)">
                <BaseIcon name="trash" :size="15" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Create-first notice -->
      <EmptyState
        v-else
        icon="save"
        title="Save the course first"
        message="Create the course details, then return here to build sections, lessons and quizzes."
        action-label="Go to course details"
        @action="setTab('details')"
      />
    </template>

    <!-- Section modal -->
    <AppModal :open="sectionModal" :title="sectionForm.id ? 'Edit section' : 'Add section'" size="md" @close="sectionModal = false">
      <form class="space-y-4" @submit.prevent="saveSection">
        <div>
          <label class="field-label" for="section-title">Title</label>
          <input id="section-title" v-model="sectionForm.title" type="text" class="field-input" required placeholder="Getting started">
          <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
        </div>
        <div>
          <label class="field-label" for="section-description">Description</label>
          <textarea id="section-description" v-model="sectionForm.description" rows="3" class="field-input" />
        </div>
        <div class="max-w-[160px]">
          <label class="field-label" for="section-order">Sort order</label>
          <input id="section-order" v-model.number="sectionForm.sort_order" type="number" class="field-input">
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="sectionModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="saveSection">{{ sectionForm.id ? 'Save section' : 'Add section' }}</button>
      </template>
    </AppModal>

    <!-- Lesson modal -->
    <AppModal :open="lessonModal" :title="lessonForm.id ? 'Edit lesson' : 'Add lesson'" size="lg" @close="lessonModal = false">
      <form class="space-y-4" @submit.prevent="saveLesson">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="field-label" for="lesson-title">Title</label>
            <input id="lesson-title" v-model="lessonForm.title" type="text" class="field-input" required>
            <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
          </div>
          <div>
            <label class="field-label" for="lesson-section">Section</label>
            <select id="lesson-section" v-model="lessonForm.course_section_id" class="field-input">
              <option value="">No section</option>
              <option v-for="section in sections" :key="section.id" :value="section.id">{{ section.title }}</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="lesson-type">Type</label>
            <select id="lesson-type" v-model="lessonForm.type" class="field-input">
              <option value="video">Video</option>
              <option value="text">Text</option>
              <option value="quiz">Quiz placeholder</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="lesson-description">Short description</label>
            <input id="lesson-description" v-model="lessonForm.description" type="text" class="field-input">
          </div>
          <div>
            <label class="field-label" for="lesson-duration">Duration (seconds)</label>
            <input id="lesson-duration" v-model.number="lessonForm.duration_seconds" type="number" min="0" class="field-input">
          </div>
          <div>
            <label class="field-label" for="lesson-order">Sort order</label>
            <input id="lesson-order" v-model.number="lessonForm.sort_order" type="number" class="field-input">
          </div>
        </div>

        <div v-if="lessonForm.type === 'video'" class="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Video</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div>
              <label class="field-label" for="lesson-source">Source</label>
              <select id="lesson-source" v-model="lessonForm.video_source" class="field-input">
                <option value="youtube">YouTube</option>
                <option value="external">Other https URL (Vimeo, MP4, HLS)</option>
                <option value="upload">Upload a video file</option>
              </select>
            </div>
            <div v-if="lessonForm.video_source === 'external' || lessonForm.video_source === 'youtube'">
              <label class="field-label" for="lesson-video-url">Video URL</label>
              <input id="lesson-video-url" v-model="lessonForm.video_url" type="url" class="field-input" :placeholder="lessonForm.video_source === 'youtube' ? 'https://www.youtube.com/watch?v=…' : 'https://…'">
              <p v-if="fieldError('video_url')" class="field-error">{{ fieldError('video_url') }}</p>
            </div>
            <div v-else>
              <label class="field-label" for="lesson-video-file">Video file</label>
              <input id="lesson-video-file" type="file" accept="video/*" class="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onLessonFile">
              <p class="mt-1 text-[11px] text-gray-400">MP4 or WebM. Maximum 500 MB.</p>
            </div>
          </div>
          <label v-if="lessonForm.id" class="mt-3 flex items-center gap-2 text-xs font-medium text-rose-600">
            <input v-model="lessonForm.remove_video" type="checkbox" class="h-4 w-4 rounded border-gray-300">
            Remove the currently stored video
          </label>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <div v-if="lessonForm.type === 'video'">
            <label class="field-label" for="lesson-threshold">Watch % needed to complete</label>
            <input id="lesson-threshold" v-model.number="lessonForm.completion_threshold" type="number" min="1" max="100" class="field-input" placeholder="Default 95">
            <p v-if="fieldError('completion_threshold')" class="field-error">{{ fieldError('completion_threshold') }}</p>
          </div>
          <label class="flex items-center gap-2 self-end pb-2 text-sm text-gray-700">
            <input v-model="lessonForm.is_required" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Required for course completion
          </label>
        </div>

        <LessonResourcesManager v-if="lessonForm.id" :lesson-id="lessonForm.id" />

        <div v-if="lessonForm.type !== 'video'">
          <label class="field-label" for="lesson-content">Content</label>
          <textarea id="lesson-content" v-model="lessonForm.content" rows="6" class="field-input" placeholder="Lesson notes, article or instructions. Basic HTML is supported." />
        </div>

        <div class="flex flex-wrap gap-4">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input v-model="lessonForm.is_preview" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Free preview
          </label>
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input v-model="lessonForm.is_published" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Published
          </label>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="lessonModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="saveLesson">{{ lessonForm.id ? 'Save lesson' : 'Add lesson' }}</button>
      </template>
    </AppModal>

    <!-- Quiz modal -->
    <AppModal :open="quizModal" :title="quizForm.id ? 'Edit quiz' : 'Add quiz'" size="md" @close="quizModal = false">
      <form class="space-y-4" @submit.prevent="saveQuiz">
        <div>
          <label class="field-label" for="quiz-title">Title</label>
          <input id="quiz-title" v-model="quizForm.title" type="text" class="field-input" required>
          <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
        </div>
        <div>
          <label class="field-label" for="quiz-description">Description</label>
          <textarea id="quiz-description" v-model="quizForm.description" rows="3" class="field-input" />
        </div>
        <div>
          <label class="field-label" for="quiz-lesson">Linked lesson (optional)</label>
          <select id="quiz-lesson" v-model="quizForm.lesson_id" class="field-input">
            <option value="">Not linked</option>
            <option v-for="lesson in allLessons" :key="lesson.id" :value="lesson.id">{{ lesson.title }}</option>
          </select>
          <p class="mt-1 text-[11px] text-gray-400">Each lesson can only have one quiz.</p>
          <p v-if="fieldError('lesson_id')" class="field-error">{{ fieldError('lesson_id') }}</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <label class="field-label" for="quiz-pass">Pass %</label>
            <input id="quiz-pass" v-model.number="quizForm.pass_percentage" type="number" min="0" max="100" class="field-input">
          </div>
          <div>
            <label class="field-label" for="quiz-time">Time limit (min)</label>
            <input id="quiz-time" v-model="quizForm.time_limit_minutes" type="number" min="1" class="field-input" placeholder="None">
          </div>
          <div>
            <label class="field-label" for="quiz-attempts">Max attempts</label>
            <input id="quiz-attempts" v-model="quizForm.max_attempts" type="number" min="1" class="field-input" placeholder="Unlimited">
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-4">
          <label class="flex items-center gap-2 text-sm text-gray-700">
            <input v-model="quizForm.is_published" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Published
          </label>
          <div class="ml-auto w-24">
            <label class="field-label" for="quiz-order">Order</label>
            <input id="quiz-order" v-model.number="quizForm.sort_order" type="number" class="field-input">
          </div>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="quizModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="saveQuiz">{{ quizForm.id ? 'Save quiz' : 'Add quiz' }}</button>
      </template>
    </AppModal>

    <!-- Questions manager -->
    <AppModal
      :open="questionModal"
      :title="activeQuiz ? `Questions · ${activeQuiz.title}` : 'Questions'"
      description="Pick the correct answer(s) for every question."
      size="xl"
      @close="questionModal = false"
    >
      <div class="grid gap-5 lg:grid-cols-2">
        <div>
          <div class="mb-2 flex items-center justify-between">
            <h3 class="text-xs font-bold uppercase tracking-wide text-gray-500">Questions ({{ questions.length }})</h3>
            <button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs" @click="resetQuestion">
              <BaseIcon name="plus" :size="13" /> New
            </button>
          </div>
          <div v-if="questionsLoading" class="space-y-2">
            <div v-for="i in 3" :key="i" class="h-16 animate-pulse rounded-xl bg-gray-100" />
          </div>
          <EmptyState v-else-if="!questions.length" icon="list" title="No questions yet" message="Use the form to add the first question." />
          <ul v-else class="space-y-2">
            <li v-for="question in questions" :key="question.id" class="rounded-xl border border-gray-100 p-3">
              <div class="flex items-start justify-between gap-2">
                <p class="text-sm font-semibold text-gray-800">{{ question.question }}</p>
                <div class="flex shrink-0 items-center gap-0.5">
                  <button type="button" class="btn-ghost !p-1" aria-label="Edit question" @click="editQuestion(question)">
                    <BaseIcon name="edit" :size="13" />
                  </button>
                  <button type="button" class="btn-ghost !p-1 text-rose-600" aria-label="Delete question" @click="removeQuestion(question)">
                    <BaseIcon name="trash" :size="13" />
                  </button>
                </div>
              </div>
              <p class="mt-1 text-[11px] text-gray-400">{{ questionTypeLabel(question.type) }} · {{ question.marks }} mark{{ question.marks === 1 ? '' : 's' }}</p>
              <div class="mt-1.5 flex flex-wrap gap-1">
                <span
                  v-for="option in question.options"
                  :key="option.id"
                  class="badge"
                  :class="question.correct_answers?.map(String).includes(String(option.id)) ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-gray-50 text-gray-600 ring-gray-200'"
                >
                  {{ option.text }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
          <h3 class="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500">{{ questionForm.id ? 'Edit question' : 'Add question' }}</h3>
          <div class="space-y-3">
            <div>
              <label class="field-label" for="question-type">Type</label>
              <select id="question-type" v-model="questionForm.type" class="field-input" @change="onQuestionTypeChange">
                <option value="single_choice">Single choice</option>
                <option value="multiple_choice">Multiple choice</option>
                <option value="true_false">True / false</option>
              </select>
            </div>
            <div>
              <label class="field-label" for="question-text">Question</label>
              <textarea id="question-text" v-model="questionForm.question" rows="2" class="field-input" />
              <p v-if="fieldError('question')" class="field-error">{{ fieldError('question') }}</p>
            </div>
            <div>
              <div class="mb-1 flex items-center justify-between">
                <span class="field-label !mb-0">Options</span>
                <button v-if="questionForm.type !== 'true_false'" type="button" class="text-[11px] font-semibold text-oc-primary hover:underline" @click="addOption">
                  + Add option
                </button>
              </div>
              <div class="space-y-2">
                <div v-for="(option, index) in questionForm.options" :key="`${option.id}-${index}`" class="flex items-center gap-2">
                  <input
                    :checked="questionForm.correct.includes(option.id)"
                    :type="questionForm.type === 'multiple_choice' ? 'checkbox' : 'radio'"
                    :name="`correct-${questionForm.id || 'new'}`"
                    class="h-4 w-4 shrink-0 border-gray-300 text-oc-primary focus:ring-oc-primary"
                    :aria-label="`Mark option ${option.id} correct`"
                    @change="toggleCorrect(option.id)"
                  >
                  <input v-model="option.text" type="text" class="field-input !py-1.5 text-xs" :placeholder="`Option ${option.id.toUpperCase()}`">
                  <button
                    v-if="questionForm.type !== 'true_false' && questionForm.options.length > 2"
                    type="button"
                    class="btn-ghost !p-1 text-rose-600"
                    aria-label="Remove option"
                    @click="removeOption(index)"
                  >
                    <BaseIcon name="x" :size="13" />
                  </button>
                </div>
              </div>
              <p class="mt-1 text-[11px] text-gray-400">Tick the correct option{{ questionForm.type === 'multiple_choice' ? 's' : '' }}.</p>
              <p v-if="fieldError('options')" class="field-error">{{ fieldError('options') }}</p>
              <p v-if="fieldError('correct_answers')" class="field-error">{{ fieldError('correct_answers') }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label" for="question-marks">Marks</label>
                <input id="question-marks" v-model.number="questionForm.marks" type="number" min="1" class="field-input">
              </div>
              <div>
                <label class="field-label" for="question-order">Order</label>
                <input id="question-order" v-model.number="questionForm.sort_order" type="number" class="field-input">
              </div>
            </div>
            <div class="flex justify-end gap-2 pt-1">
              <button v-if="questionForm.id" type="button" class="btn-secondary !px-3 !py-2 text-xs" @click="resetQuestion">Cancel edit</button>
              <button type="button" class="btn-primary !px-3 !py-2 text-xs" :disabled="busy" @click="saveQuestion">
                {{ questionForm.id ? 'Save question' : 'Add question' }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <button type="button" class="btn-secondary" @click="questionModal = false">Done</button>
      </template>
    </AppModal>
  </div>
</template>
