<script setup lang="ts">
import type { AdminEnrollment, Course, Paginator, User } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Enrollments — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const status = ref('')
const courseId = ref('')
const search = ref('')
const page = ref(1)

const { data: courses } = await useAsyncData('admin-enrollment-courses', () =>
  apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 100 } })
    .then((result) => result.data)
    .catch(() => [] as Course[]),
)

const { data: users } = await useAsyncData('admin-enrollment-users', () =>
  apiData<User[]>('/admin/users').catch(() => [] as User[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-enrollments',
  () =>
    apiData<Paginator<AdminEnrollment>>('/admin/enrollments', {
      query: {
        per_page: 20,
        page: page.value,
        status: status.value || undefined,
        course_id: courseId.value || undefined,
        search: search.value.trim() || undefined,
      },
    }),
  { watch: [page, status, courseId, search] },
)

const enrollments = computed(() => data.value?.data ?? [])

watch([status, courseId, search], () => (page.value = 1))

const grantModal = ref(false)
const grantForm = reactive({
  user_id: '' as string | number,
  course_id: '' as string | number,
  access_days: '' as string | number,
  expires_at: '',
})

function openGrant() {
  Object.assign(grantForm, { user_id: '', course_id: '', access_days: '', expires_at: '' })
  resetErrors()
  grantModal.value = true
}

async function grant() {
  const result = await run(
    () =>
      apiData('/admin/enrollments/grant', {
        method: 'POST',
        body: {
          user_id: Number(grantForm.user_id),
          course_id: Number(grantForm.course_id),
          ...(grantForm.access_days !== '' ? { access_days: Number(grantForm.access_days) } : {}),
          ...(grantForm.expires_at ? { expires_at: grantForm.expires_at } : {}),
        },
      }),
    'Course access granted.',
  )
  if (result === undefined) return
  grantModal.value = false
  await refresh()
}

const extendModal = ref(false)
const extendTarget = ref<AdminEnrollment | null>(null)
const extendDays = ref(30)

function openExtend(enrollment: AdminEnrollment) {
  extendTarget.value = enrollment
  extendDays.value = 30
  resetErrors()
  extendModal.value = true
}

async function extend() {
  if (!extendTarget.value) return
  const result = await run(
    () =>
      apiData('/admin/enrollments/extend', {
        method: 'POST',
        body: { id: extendTarget.value!.id, days: Number(extendDays.value) },
      }),
    'Enrollment extended.',
  )
  if (result === undefined) return
  extendModal.value = false
  await refresh()
}

async function revoke(enrollment: AdminEnrollment) {
  const ok = await ask({
    title: 'Revoke access',
    message: `Revoke ${enrollment.user?.name || 'this student'}'s access to “${enrollment.course?.title || 'the course'}”?`,
    confirmLabel: 'Revoke access',
  })
  if (!ok) return
  const result = await run(
    () => apiData(`/admin/enrollments/revoke/${enrollment.id}`, { method: 'POST' }),
    'Enrollment revoked.',
  )
  if (result !== undefined) await refresh()
}

async function reactivate(enrollment: AdminEnrollment) {
  const ok = await ask({
    title: 'Reactivate enrollment',
    message: 'Restore this student’s access to the course?',
    confirmLabel: 'Reactivate',
    tone: 'primary',
  })
  if (!ok) return
  const result = await run(
    () => apiData(`/admin/enrollments/reactivate/${enrollment.id}`, { method: 'POST' }),
    'Enrollment reactivated.',
  )
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Enrollments" subtitle="Grant, extend and revoke course access for students." icon="users">
      <button type="button" class="btn-primary" @click="openGrant">
        <BaseIcon name="plus" :size="16" /> Grant access
      </button>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="md:col-span-4">
          <input v-model="search" type="search" class="field-input mb-2" placeholder="Search student name or email…" aria-label="Search students">
          <select v-model="status" class="field-input" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="expired">Expired</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div class="md:col-span-5">
          <select v-model="courseId" class="field-input" aria-label="Filter by course">
            <option value="">All courses</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
        </div>
        <div class="md:col-span-3">
          <button type="button" class="btn-secondary w-full" @click="status = ''; courseId = ''; search = ''; page = 1">
            <BaseIcon name="refresh" :size="15" /> Clear filters
          </button>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 6" :key="i" class="card h-16 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load enrollments" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!enrollments.length"
      icon="users"
      title="No enrollments found"
      message="Enrollments appear when course orders are placed or when you grant access manually."
      action-label="Grant access"
      @action="openGrant"
    />

    <template v-else>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[900px] text-left text-sm">
            <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
              <tr>
                <th class="px-4 py-2.5 font-semibold">Student</th>
                <th class="px-3 py-2.5 font-semibold">Course</th>
                <th class="px-3 py-2.5 font-semibold">Source</th>
                <th class="px-3 py-2.5 font-semibold">Enrolled</th>
                <th class="px-3 py-2.5 font-semibold">Expires</th>
                <th class="px-3 py-2.5 font-semibold">Status</th>
                <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="enrollment in enrollments" :key="enrollment.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900">{{ enrollment.user?.name || 'Deleted user' }}</p>
                  <p class="text-[11px] text-gray-400">{{ enrollment.user?.email }}</p>
                </td>
                <td class="px-3 py-3">
                  <p class="max-w-[220px] truncate text-gray-700">{{ enrollment.course?.title || 'Deleted course' }}</p>
                  <p v-if="enrollment.order_id" class="text-[11px] text-gray-400">Order #{{ enrollment.order_id }}</p>
                </td>
                <td class="px-3 py-3">
                  <span class="badge" :class="enrollment.source === 'manual' ? 'bg-violet-50 text-violet-700 ring-violet-200' : 'bg-blue-50 text-blue-700 ring-blue-200'">
                    {{ enrollment.source }}
                  </span>
                </td>
                <td class="px-3 py-3 text-xs text-gray-600">{{ formatDate(enrollment.enrolled_at) }}</td>
                <td class="px-3 py-3 text-xs text-gray-600">
                  {{ enrollment.expires_at ? formatDate(enrollment.expires_at) : 'Lifetime' }}
                  <p v-if="enrollment.remaining_days !== null && enrollment.is_active" class="text-[11px] text-amber-600">{{ enrollment.remaining_days }} days left</p>
                </td>
                <td class="px-3 py-3"><StatusBadge :status="enrollment.status" /></td>
                <td class="px-4 py-3">
                  <div class="flex flex-wrap items-center justify-end gap-1">
                    <NuxtLink v-if="enrollment.order_id" :to="`/admin/orders/${enrollment.order_id}`" class="btn-ghost !px-2 !py-1.5 text-xs">Order</NuxtLink>
                    <button v-if="enrollment.status !== 'cancelled'" type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openExtend(enrollment)">
                      <BaseIcon name="calendar" :size="13" /> Extend
                    </button>
                    <button
                      v-if="enrollment.status !== 'cancelled'"
                      type="button"
                      class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                      @click="revoke(enrollment)"
                    >
                      Revoke
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn-ghost !px-2 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"
                      @click="reactivate(enrollment)"
                    >
                      Reactivate
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-5 flex justify-center">
        <PaginationLinks :current-page="data?.current_page ?? 1" :last-page="data?.last_page ?? 1" :total="data?.total" @change="(value) => (page = value)" />
      </div>
    </template>

    <AppModal :open="grantModal" title="Grant course access" description="Manually enroll a student. Leave access days empty to use the course default." size="md" @close="grantModal = false">
      <form class="space-y-4" @submit.prevent="grant">
        <div>
          <label class="field-label" for="grant-user">Student</label>
          <select id="grant-user" v-model="grantForm.user_id" class="field-input" required>
            <option value="" disabled>Select a user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }} · {{ user.email }}</option>
          </select>
          <p v-if="fieldError('user_id')" class="field-error">{{ fieldError('user_id') }}</p>
        </div>
        <div>
          <label class="field-label" for="grant-course">Course</label>
          <select id="grant-course" v-model="grantForm.course_id" class="field-input" required>
            <option value="" disabled>Select a course</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
          <p v-if="fieldError('course_id')" class="field-error">{{ fieldError('course_id') }}</p>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="field-label" for="grant-days">Access days</label>
            <input id="grant-days" v-model="grantForm.access_days" type="number" min="1" class="field-input" placeholder="Course default">
          </div>
          <div>
            <label class="field-label" for="grant-expiry">Or expiry date</label>
            <input id="grant-expiry" v-model="grantForm.expires_at" type="date" class="field-input">
          </div>
        </div>
        <p class="text-[11px] text-gray-400">If both are set the explicit expiry date is used.</p>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="grantModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="grant">Grant access</button>
      </template>
    </AppModal>

    <AppModal :open="extendModal" title="Extend enrollment" :description="extendTarget ? `${extendTarget.user?.name} · ${extendTarget.course?.title}` : ''" size="sm" @close="extendModal = false">
      <form class="space-y-4" @submit.prevent="extend">
        <div>
          <label class="field-label" for="extend-days">Additional days</label>
          <input id="extend-days" v-model.number="extendDays" type="number" min="1" class="field-input" required>
          <p class="mt-1 text-[11px] text-gray-400">Days are added from the current expiry date, or from today if already expired.</p>
          <p v-if="fieldError('days')" class="field-error">{{ fieldError('days') }}</p>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="extendModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="extend">Extend access</button>
      </template>
    </AppModal>
  </div>
</template>
