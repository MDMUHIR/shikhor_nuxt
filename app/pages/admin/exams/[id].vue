<script setup lang="ts">
import type { Paginator } from '~/utils/types'

interface QuestionRow {
  id: number
  type: 'single_choice' | 'multiple_choice' | 'true_false'
  question: string
  options: Array<{ id: string; text: string }>
  correct_answers: string[]
  marks: number
  negative_marks: number | null
  explanation: string | null
  sort_order: number
}

interface ExamAdminDetail {
  id: number
  title: string
  is_published: boolean
  negative_marking: boolean
  negative_marking_type: 'fraction' | 'fixed'
  negative_marking_value: number
  total_marks: number
  attempts_count: number
  duration_minutes: number
  pass_percentage: number
  questions: QuestionRow[]
}

interface ResultRow {
  id: number
  user: { id: number; name: string; email: string } | null
  status: string
  score: number
  total_marks: number
  percentage: number
  correct_count: number
  wrong_count: number
  unanswered_count: number
  negative_marks_total: number
  passed: boolean
  submitted_at: string | null
}

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const examId = Number(route.params.id)
const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const tab = ref<'questions' | 'results'>('questions')

const { data: exam, pending, error, refresh } = await useAsyncData(`admin-exam-${examId}`, () =>
  apiData<ExamAdminDetail>(`/admin/exams/${examId}`),
)

const resultsPage = ref(1)
const { data: results, refresh: refreshResults } = await useAsyncData(
  `admin-exam-results-${examId}`,
  () =>
    apiData<{
      stats: { attempts: number; students: number; average_percentage: number; highest_percentage: number; pass_rate: number }
      attempts: Paginator<ResultRow>
    }>(`/admin/exams/${examId}/attempts`, { query: { page: resultsPage.value } }),
  { watch: [resultsPage] },
)

useSeoMeta({ title: () => `${exam.value?.title ?? 'Exam'} — Admin`, robots: 'noindex' })

const locked = computed(() => (exam.value?.attempts_count ?? 0) > 0)

/* ------------------------------- questions ------------------------------- */

const modal = ref(false)
const editingId = ref<number | null>(null)

const form = reactive({
  type: 'single_choice' as QuestionRow['type'],
  question: '',
  options: [] as Array<{ id: string; text: string }>,
  correct: [] as string[],
  marks: 1 as number,
  negative_marks: '' as string | number,
  explanation: '',
})

const letters = 'abcdefghij'

function freshOptions(count = 4) {
  return Array.from({ length: count }, (_, i) => ({ id: letters[i]!, text: '' }))
}

function openQuestion(row?: QuestionRow) {
  editingId.value = row?.id ?? null
  Object.assign(form, {
    type: row?.type ?? 'single_choice',
    question: row?.question ?? '',
    options: row ? row.options.map((o) => ({ id: String(o.id), text: o.text })) : freshOptions(),
    correct: row ? row.correct_answers.map(String) : [],
    marks: row?.marks ?? 1,
    negative_marks: row?.negative_marks ?? '',
    explanation: row?.explanation ?? '',
  })
  resetErrors()
  modal.value = true
}

watch(
  () => form.type,
  (type) => {
    if (type === 'true_false') {
      form.options = [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }]
      form.correct = []
    } else if (form.options.length < 3 && !editingId.value) {
      form.options = freshOptions()
    }
    if (type !== 'multiple_choice') form.correct = form.correct.slice(0, 1)
  },
)

function toggleCorrect(id: string) {
  if (form.type === 'multiple_choice') {
    form.correct = form.correct.includes(id) ? form.correct.filter((c) => c !== id) : [...form.correct, id]
  } else {
    form.correct = [id]
  }
}

function addOption() {
  const used = new Set(form.options.map((o) => o.id))
  const id = [...letters].find((l) => !used.has(l))
  if (id) form.options.push({ id, text: '' })
}

function removeOption(id: string) {
  form.options = form.options.filter((o) => o.id !== id)
  form.correct = form.correct.filter((c) => c !== id)
}

async function saveQuestion() {
  const body = {
    ...(editingId.value ? { id: editingId.value } : { exam_id: examId }),
    type: form.type,
    question: form.question,
    options: form.options.filter((o) => o.text.trim()).map((o) => ({ id: o.id, text: o.text.trim() })),
    correct_answers: form.correct,
    marks: Number(form.marks),
    negative_marks: form.negative_marks === '' ? null : Number(form.negative_marks),
    explanation: form.explanation || null,
  }
  const result = await run(
    () => apiData(`/admin/exam-questions/${editingId.value ? 'update' : 'add'}`, { method: 'POST', body }),
    editingId.value ? 'Question saved.' : 'Question added.',
  )
  if (result === undefined) return
  modal.value = false
  await refresh()
}

async function removeQuestion(row: QuestionRow) {
  const ok = await ask({ title: 'Delete question', message: 'Delete this question?', confirmLabel: 'Delete' })
  if (!ok) return
  const result = await run(() => apiData(`/admin/exam-questions/delete/${row.id}`, { method: 'DELETE' }), 'Question deleted.')
  if (result !== undefined) await refresh()
}

async function togglePublish() {
  if (!exam.value) return
  const e = exam.value
  const full = await apiData<Record<string, unknown>>(`/admin/exams/${e.id}`)
  const result = await run(
    () =>
      apiData('/admin/exams/update', {
        method: 'POST',
        body: { ...full, id: e.id, is_published: !e.is_published },
      }),
    e.is_published ? 'Exam unpublished.' : 'Exam published.',
  )
  if (result !== undefined) await refresh()
}

watch(tab, (value) => value === 'results' && refreshResults())
</script>

<template>
  <div>
    <AdminPageHeader :title="exam?.title || 'Exam'" subtitle="Questions are marked automatically; results appear as students submit." icon="list">
      <NuxtLink to="/admin/exams" class="btn-secondary"><BaseIcon name="arrow-left" :size="16" /> All exams</NuxtLink>
      <button v-if="exam" type="button" class="btn-primary" :disabled="busy" @click="togglePublish">{{ exam.is_published ? 'Unpublish' : 'Publish' }}</button>
    </AdminPageHeader>

    <div v-if="pending" class="card h-40 animate-pulse bg-gray-50" />
    <ErrorState v-else-if="error" title="Could not load this exam" :message="error.message" @retry="refresh" />

    <template v-else-if="exam">
      <div class="mb-4 flex flex-wrap items-center gap-2 text-xs">
        <span class="badge bg-gray-50 text-gray-700 ring-gray-200">{{ exam.questions.length }} questions · {{ exam.total_marks }} marks</span>
        <span class="badge bg-gray-50 text-gray-700 ring-gray-200">{{ exam.duration_minutes }} min · pass {{ exam.pass_percentage }}%</span>
        <span class="badge" :class="exam.negative_marking ? 'bg-rose-50 text-rose-700 ring-rose-200' : 'bg-gray-50 text-gray-600 ring-gray-200'">{{ negativeMarkingLabel(exam) }}</span>
        <StatusBadge :status="exam.is_published ? 'published' : 'draft'" />
      </div>

      <div class="mb-4 flex gap-1.5">
        <button v-for="item in [{ v: 'questions', l: 'Questions' }, { v: 'results', l: 'Results' }]" :key="item.v" type="button" class="rounded-full px-4 py-1.5 text-xs font-semibold" :class="tab === item.v ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600'" @click="tab = item.v as typeof tab">{{ item.l }}</button>
      </div>

      <!-- Questions -->
      <section v-if="tab === 'questions'">
        <div class="mb-3 flex items-center justify-between gap-3">
          <p v-if="locked" class="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">Students have attempted this exam, so questions are locked to keep results consistent.</p>
          <span v-else />
          <button type="button" class="btn-primary" :disabled="locked" @click="openQuestion()"><BaseIcon name="plus" :size="16" /> Add question</button>
        </div>

        <EmptyState v-if="!exam.questions.length" icon="list" title="No questions yet" message="Add questions, then publish the exam." />

        <ol v-else class="space-y-3">
          <li v-for="(q, index) in exam.questions" :key="q.id" class="card p-4">
            <div class="flex items-start justify-between gap-3">
              <p class="text-sm font-semibold text-gray-900">{{ index + 1 }}. {{ q.question }}</p>
              <div class="flex shrink-0 items-center gap-1">
                <span class="badge bg-blue-50 text-blue-700 ring-blue-200">{{ q.marks }} marks</span>
                <span v-if="exam.negative_marking" class="badge bg-rose-50 text-rose-700 ring-rose-200">{{ q.negative_marks !== null ? `−${q.negative_marks} (custom)` : 'default penalty' }}</span>
                <button type="button" class="btn-ghost !px-2 !py-1 text-xs" :disabled="locked" @click="openQuestion(q)"><BaseIcon name="edit" :size="13" /></button>
                <button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600" :disabled="locked" @click="removeQuestion(q)"><BaseIcon name="trash" :size="13" /></button>
              </div>
            </div>
            <ul class="mt-2 grid gap-1 sm:grid-cols-2">
              <li v-for="o in q.options" :key="o.id" class="rounded-lg px-3 py-1.5 text-xs" :class="q.correct_answers.map(String).includes(String(o.id)) ? 'bg-emerald-50 font-semibold text-emerald-700' : 'bg-gray-50 text-gray-600'">{{ o.text }}</li>
            </ul>
          </li>
        </ol>
      </section>

      <!-- Results -->
      <section v-else>
        <div v-if="results" class="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          <AdminStat label="Attempts" :value="String(results.stats.attempts)" icon="list" tone="blue" />
          <AdminStat label="Students" :value="String(results.stats.students)" icon="users" tone="violet" />
          <AdminStat label="Average" :value="`${results.stats.average_percentage}%`" icon="chart" tone="amber" />
          <AdminStat label="Highest" :value="`${results.stats.highest_percentage}%`" icon="award" tone="emerald" />
          <AdminStat label="Pass rate" :value="`${results.stats.pass_rate}%`" icon="check-circle" tone="emerald" />
        </div>

        <EmptyState v-if="!results?.attempts.data.length" icon="chart" title="No results yet" message="Results appear as soon as students submit." />
        <div v-else class="card overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[760px] text-left text-sm">
              <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
                <tr>
                  <th class="px-4 py-2.5 font-semibold">#</th><th class="px-3 py-2.5 font-semibold">Student</th><th class="px-3 py-2.5 font-semibold">Score</th>
                  <th class="px-3 py-2.5 font-semibold">✓ / ✗ / –</th><th class="px-3 py-2.5 font-semibold">Negative</th><th class="px-3 py-2.5 font-semibold">Result</th><th class="px-3 py-2.5 font-semibold">Submitted</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="(row, index) in results.attempts.data" :key="row.id">
                  <td class="px-4 py-3 text-gray-400">{{ (results.attempts.current_page - 1) * results.attempts.per_page + index + 1 }}</td>
                  <td class="px-3 py-3"><p class="font-medium text-gray-800">{{ row.user?.name }}</p><p class="text-[11px] text-gray-400">{{ row.user?.email }}</p></td>
                  <td class="px-3 py-3 font-bold text-gray-900">{{ row.score }}/{{ row.total_marks }} <span class="text-xs font-normal text-gray-400">({{ row.percentage }}%)</span></td>
                  <td class="px-3 py-3 text-xs text-gray-600">{{ row.correct_count }} / {{ row.wrong_count }} / {{ row.unanswered_count }}</td>
                  <td class="px-3 py-3 text-xs" :class="row.negative_marks_total ? 'text-rose-600' : 'text-gray-400'">−{{ row.negative_marks_total }}</td>
                  <td class="px-3 py-3"><span class="badge" :class="row.passed ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-rose-50 text-rose-700 ring-rose-200'">{{ row.passed ? 'Passed' : 'Failed' }}</span><span v-if="row.status === 'expired'" class="ml-1 text-[10px] text-gray-400">auto</span></td>
                  <td class="px-3 py-3 text-xs text-gray-500">{{ formatDate(row.submitted_at, true) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="flex justify-center pt-4">
          <PaginationLinks :current-page="results?.attempts.current_page ?? 1" :last-page="results?.attempts.last_page ?? 1" @change="(v) => (resultsPage = v)" />
        </div>
      </section>
    </template>

    <AppModal :open="modal" :title="editingId ? 'Edit question' : 'Add question'" size="lg" @close="modal = false">
      <form class="space-y-4" @submit.prevent="saveQuestion">
        <div class="grid gap-3 sm:grid-cols-3">
          <div>
            <label class="field-label" for="q-type">Type</label>
            <select id="q-type" v-model="form.type" class="field-input">
              <option value="single_choice">Single choice</option>
              <option value="multiple_choice">Multiple choice</option>
              <option value="true_false">True / False</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="q-marks">Marks</label>
            <input id="q-marks" v-model.number="form.marks" type="number" min="0.25" step="0.25" class="field-input" required>
            <p v-if="fieldError('marks')" class="field-error">{{ fieldError('marks') }}</p>
          </div>
          <div v-if="exam?.negative_marking">
            <label class="field-label" for="q-neg">Penalty override</label>
            <input id="q-neg" v-model="form.negative_marks" type="number" min="0" step="0.25" class="field-input" placeholder="Exam default">
          </div>
        </div>
        <div>
          <label class="field-label" for="q-text">Question</label>
          <textarea id="q-text" v-model="form.question" rows="3" class="field-input" required />
          <p v-if="fieldError('question')" class="field-error">{{ fieldError('question') }}</p>
        </div>
        <div>
          <p class="field-label">Options — tick the correct {{ form.type === 'multiple_choice' ? 'answers' : 'answer' }}</p>
          <div class="space-y-2">
            <div v-for="option in form.options" :key="option.id" class="flex items-center gap-2">
              <input :type="form.type === 'multiple_choice' ? 'checkbox' : 'radio'" :checked="form.correct.includes(option.id)" class="h-4 w-4 text-oc-primary" @change="toggleCorrect(option.id)">
              <input v-model="option.text" class="field-input" :placeholder="`Option ${option.id.toUpperCase()}`" :readonly="form.type === 'true_false'">
              <button v-if="form.type !== 'true_false' && form.options.length > 2" type="button" class="btn-ghost !p-1.5 text-rose-600" @click="removeOption(option.id)"><BaseIcon name="x" :size="14" /></button>
            </div>
          </div>
          <button v-if="form.type !== 'true_false' && form.options.length < 10" type="button" class="btn-ghost mt-2 text-xs" @click="addOption"><BaseIcon name="plus" :size="14" /> Add option</button>
          <p v-if="fieldError('correct_answers')" class="field-error">{{ fieldError('correct_answers') }}</p>
        </div>
        <div>
          <label class="field-label" for="q-exp">Explanation (shown with the answers)</label>
          <textarea id="q-exp" v-model="form.explanation" rows="2" class="field-input" />
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy || !form.correct.length" @click="saveQuestion">{{ editingId ? 'Save question' : 'Add question' }}</button>
      </template>
    </AppModal>
  </div>
</template>
