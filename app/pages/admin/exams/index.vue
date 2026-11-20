<script setup lang="ts">
import type { Course, Paginator } from '~/utils/types'

interface AdminExam {
  id: number
  course_id: number | null
  course: { id: number; title: string } | null
  title: string
  description: string | null
  instructions: string | null
  duration_minutes: number
  pass_percentage: number
  max_attempts: number | null
  negative_marking: boolean
  negative_marking_type: 'fraction' | 'fixed'
  negative_marking_value: number
  allow_negative_total: boolean
  shuffle_questions: boolean
  shuffle_options: boolean
  show_answers: 'after_submit' | 'after_exam_end' | 'never'
  starts_at: string | null
  ends_at: string | null
  is_published: boolean
  state: string
  questions_count: number
  attempts_count: number
  total_marks: number
}

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Exams — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { isAdmin } = useAuth()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: exams, pending, error, refresh } = await useAsyncData('admin-exams', () => apiData<AdminExam[]>('/admin/exams'))
const { data: courses } = await useAsyncData('admin-exam-courses', () =>
  apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 100 } })
    .then((r) => r.data)
    .catch(() => [] as Course[]),
)

const modal = ref(false)
const editing = ref<AdminExam | null>(null)

const blank = () => ({
  course_id: '' as string | number,
  title: '',
  description: '',
  instructions: '',
  duration_minutes: 30,
  pass_percentage: 50,
  max_attempts: '' as string | number,
  negative_marking: false,
  negative_marking_type: 'fraction' as 'fraction' | 'fixed',
  negative_marking_value: 0.25,
  allow_negative_total: false,
  shuffle_questions: false,
  shuffle_options: false,
  show_answers: 'after_submit' as 'after_submit' | 'after_exam_end' | 'never',
  starts_at: '',
  ends_at: '',
  is_published: false,
})

const form = reactive(blank())
const local = (value?: string | null) => (value ? value.slice(0, 16) : '')

function openCreate() {
  editing.value = null
  Object.assign(form, blank(), { course_id: isAdmin.value ? '' : (courses.value?.[0]?.id ?? '') })
  resetErrors()
  modal.value = true
}

function openEdit(exam: AdminExam) {
  editing.value = exam
  Object.assign(form, {
    course_id: exam.course_id ?? '',
    title: exam.title,
    description: exam.description ?? '',
    instructions: exam.instructions ?? '',
    duration_minutes: exam.duration_minutes,
    pass_percentage: exam.pass_percentage,
    max_attempts: exam.max_attempts ?? '',
    negative_marking: exam.negative_marking,
    negative_marking_type: exam.negative_marking_type,
    negative_marking_value: exam.negative_marking_value,
    allow_negative_total: exam.allow_negative_total,
    shuffle_questions: exam.shuffle_questions,
    shuffle_options: exam.shuffle_options,
    show_answers: exam.show_answers,
    starts_at: local(exam.starts_at),
    ends_at: local(exam.ends_at),
    is_published: exam.is_published,
  })
  resetErrors()
  modal.value = true
}

async function save() {
  const body = {
    ...(editing.value ? { id: editing.value.id } : {}),
    ...form,
    course_id: form.course_id || null,
    max_attempts: form.max_attempts === '' ? null : Number(form.max_attempts),
    starts_at: form.starts_at || null,
    ends_at: form.ends_at || null,
  }
  const result = await run(
    () => apiData<AdminExam>(`/admin/exams/${editing.value ? 'update' : 'add'}`, { method: 'POST', body }),
    editing.value ? 'Exam saved.' : 'Exam created — now add questions.',
  )
  if (result === undefined) return
  modal.value = false
  if (!editing.value) await navigateTo(`/admin/exams/${result.id}`)
  else await refresh()
}

async function remove(exam: AdminExam) {
  const ok = await ask({ title: 'Delete exam', message: `Delete “${exam.title}” and its questions?`, confirmLabel: 'Delete exam' })
  if (!ok) return
  const result = await run(() => apiData(`/admin/exams/delete/${exam.id}`, { method: 'DELETE' }), 'Exam deleted.')
  if (result !== undefined) await refresh()
}

const preview = computed(() =>
  negativeMarkingLabel({
    negative_marking: form.negative_marking,
    negative_marking_type: form.negative_marking_type,
    negative_marking_value: Number(form.negative_marking_value),
  }),
)
</script>

<template>
  <div>
    <AdminPageHeader title="Exams" subtitle="Timed, auto-marked exams with optional negative marking." icon="list">
      <button type="button" class="btn-primary" @click="openCreate"><BaseIcon name="plus" :size="16" /> New exam</button>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-2"><div v-for="i in 4" :key="i" class="card h-16 animate-pulse bg-gray-50" /></div>
    <ErrorState v-else-if="error" title="Could not load exams" :message="error.message" @retry="refresh" />
    <EmptyState v-else-if="!exams?.length" icon="list" title="No exams yet" message="Create an exam, add questions, then publish it." action-label="Create an exam" @action="openCreate" />

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[820px] text-left text-sm">
          <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
            <tr>
              <th class="px-4 py-2.5 font-semibold">Exam</th>
              <th class="px-3 py-2.5 font-semibold">Course</th>
              <th class="px-3 py-2.5 font-semibold">Questions</th>
              <th class="px-3 py-2.5 font-semibold">Negative marking</th>
              <th class="px-3 py-2.5 font-semibold">Attempts</th>
              <th class="px-3 py-2.5 font-semibold">Status</th>
              <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="exam in exams" :key="exam.id" class="hover:bg-gray-50/60">
              <td class="px-4 py-3">
                <NuxtLink :to="`/admin/exams/${exam.id}`" class="font-semibold text-gray-900 hover:text-oc-primary">{{ exam.title }}</NuxtLink>
                <p class="text-[11px] text-gray-400">{{ exam.duration_minutes }} min · {{ exam.total_marks }} marks · pass {{ exam.pass_percentage }}%</p>
              </td>
              <td class="px-3 py-3 text-gray-600">{{ exam.course?.title || 'Standalone' }}</td>
              <td class="px-3 py-3 text-gray-600">{{ exam.questions_count }}</td>
              <td class="px-3 py-3 text-xs" :class="exam.negative_marking ? 'font-semibold text-rose-600' : 'text-gray-400'">{{ negativeMarkingLabel(exam) }}</td>
              <td class="px-3 py-3 text-gray-600">{{ exam.attempts_count }}</td>
              <td class="px-3 py-3"><StatusBadge :status="exam.is_published ? 'published' : 'draft'" /></td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <NuxtLink :to="`/admin/exams/${exam.id}`" class="btn-secondary !px-2.5 !py-1.5 text-xs">Questions &amp; results</NuxtLink>
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openEdit(exam)"><BaseIcon name="edit" :size="14" /> Settings</button>
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" @click="remove(exam)"><BaseIcon name="trash" :size="14" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AppModal :open="modal" :title="editing ? 'Exam settings' : 'New exam'" size="lg" @close="modal = false">
      <form class="space-y-4" @submit.prevent="save">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="field-label" for="exam-title">Title</label>
            <input id="exam-title" v-model="form.title" class="field-input" required maxlength="255">
            <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="exam-course">Course</label>
            <select id="exam-course" v-model="form.course_id" class="field-input">
              <option v-if="isAdmin" value="">Standalone — open to every signed-in student</option>
              <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }} (enrolled students only)</option>
            </select>
            <p v-if="fieldError('course_id')" class="field-error">{{ fieldError('course_id') }}</p>
          </div>
          <div>
            <label class="field-label" for="exam-duration">Duration (minutes)</label>
            <input id="exam-duration" v-model.number="form.duration_minutes" type="number" min="1" class="field-input" required>
            <p v-if="fieldError('duration_minutes')" class="field-error">{{ fieldError('duration_minutes') }}</p>
          </div>
          <div>
            <label class="field-label" for="exam-pass">Pass mark (%)</label>
            <input id="exam-pass" v-model.number="form.pass_percentage" type="number" min="0" max="100" class="field-input">
          </div>
          <div>
            <label class="field-label" for="exam-attempts">Max attempts</label>
            <input id="exam-attempts" v-model="form.max_attempts" type="number" min="1" class="field-input" placeholder="Unlimited">
          </div>
          <div>
            <label class="field-label" for="exam-answers">Show correct answers</label>
            <select id="exam-answers" v-model="form.show_answers" class="field-input">
              <option value="after_submit">Right after submitting</option>
              <option value="after_exam_end">After the exam closes</option>
              <option value="never">Never</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="exam-start">Opens</label>
            <input id="exam-start" v-model="form.starts_at" type="datetime-local" class="field-input">
          </div>
          <div>
            <label class="field-label" for="exam-end">Closes</label>
            <input id="exam-end" v-model="form.ends_at" type="datetime-local" class="field-input">
            <p v-if="fieldError('ends_at')" class="field-error">{{ fieldError('ends_at') }}</p>
          </div>
        </div>

        <fieldset class="rounded-xl border p-4" :class="form.negative_marking ? 'border-rose-200 bg-rose-50/40' : 'border-gray-100 bg-gray-50/60'">
          <legend class="px-1 text-xs font-bold uppercase tracking-wide text-gray-500">Negative marking</legend>
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-800">
            <input v-model="form.negative_marking" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Deduct marks for wrong answers
          </label>
          <div v-if="form.negative_marking" class="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <label class="field-label" for="neg-type">Deduction type</label>
              <select id="neg-type" v-model="form.negative_marking_type" class="field-input">
                <option value="fraction">Fraction of the question's marks</option>
                <option value="fixed">Fixed marks per wrong answer</option>
              </select>
            </div>
            <div>
              <label class="field-label" for="neg-value">{{ form.negative_marking_type === 'fraction' ? 'Fraction (0–1, e.g. 0.25)' : 'Marks to deduct' }}</label>
              <input id="neg-value" v-model.number="form.negative_marking_value" type="number" min="0" :max="form.negative_marking_type === 'fraction' ? 1 : undefined" step="0.05" class="field-input">
              <p v-if="fieldError('negative_marking_value')" class="field-error">{{ fieldError('negative_marking_value') }}</p>
            </div>
            <label class="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2">
              <input v-model="form.allow_negative_total" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
              Allow the final score to go below zero
            </label>
            <p class="text-xs text-rose-700 sm:col-span-2">Students will see: “{{ preview }}”. Unanswered questions are never penalised. You can override the penalty per question.</p>
          </div>
        </fieldset>

        <div class="grid gap-4">
          <div>
            <label class="field-label" for="exam-desc">Description</label>
            <textarea id="exam-desc" v-model="form.description" rows="2" class="field-input" />
          </div>
          <div>
            <label class="field-label" for="exam-instr">Instructions</label>
            <textarea id="exam-instr" v-model="form.instructions" rows="3" class="field-input" placeholder="Shown to students before they start" />
          </div>
        </div>

        <div class="flex flex-wrap gap-5">
          <label class="flex items-center gap-2 text-sm text-gray-700"><input v-model="form.shuffle_questions" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"> Shuffle questions</label>
          <label class="flex items-center gap-2 text-sm text-gray-700"><input v-model="form.shuffle_options" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"> Shuffle options</label>
          <label class="flex items-center gap-2 text-sm font-semibold text-gray-800"><input v-model="form.is_published" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"> Published</label>
        </div>
        <p v-if="fieldError('is_published')" class="field-error">{{ fieldError('is_published') }}</p>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save exam' : 'Create exam' }}</button>
      </template>
    </AppModal>
  </div>
</template>
