<script setup lang="ts">
import type { Certificate, Course, Paginator } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Certificates — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { run } = useFormHandler()
const { initial } = useInitials()

const status = ref('')
const courseId = ref('')
const page = ref(1)

const { data: courses } = await useAsyncData('admin-certificate-courses', () =>
  apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 100 } })
    .then((result) => result.data)
    .catch(() => [] as Course[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-certificates',
  () =>
    apiData<Paginator<Certificate>>('/admin/certificates', {
      query: {
        per_page: 20,
        page: page.value,
        status: status.value || undefined,
        course_id: courseId.value || undefined,
      },
    }),
  { watch: [page, status, courseId] },
)

const certificates = computed(() => data.value?.data ?? [])

watch([status, courseId], () => (page.value = 1))

async function revoke(certificate: Certificate) {
  const ok = await ask({
    title: 'Revoke certificate',
    message: `Revoke certificate ${certificate.certificate_number}? Public verification will show it as invalid.`,
    confirmLabel: 'Revoke certificate',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/certificates/revoke/${certificate.id}`, { method: 'POST' }), 'Certificate revoked.')
  if (result !== undefined) await refresh()
}

async function restore(certificate: Certificate) {
  const ok = await ask({
    title: 'Restore certificate',
    message: `Restore certificate ${certificate.certificate_number}? It will verify as valid again.`,
    confirmLabel: 'Restore',
    tone: 'primary',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/certificates/restore/${certificate.id}`, { method: 'POST' }), 'Certificate restored.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Certificates" subtitle="Certificates are issued automatically when students complete all required lessons and quizzes." icon="award">
      <button type="button" class="btn-secondary" :disabled="pending" @click="refresh()">
        <BaseIcon name="refresh" :size="15" /> Refresh
      </button>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="md:col-span-4">
          <select v-model="status" class="field-input" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="issued">Issued</option>
            <option value="revoked">Revoked</option>
          </select>
        </div>
        <div class="md:col-span-6">
          <select v-model="courseId" class="field-input" aria-label="Filter by course">
            <option value="">All courses</option>
            <option v-for="course in courses" :key="course.id" :value="course.id">{{ course.title }}</option>
          </select>
        </div>
        <div class="md:col-span-2">
          <button type="button" class="btn-secondary w-full" @click="status = ''; courseId = ''; page = 1">
            <BaseIcon name="refresh" :size="15" /> Reset
          </button>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 6" :key="i" class="card h-16 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load certificates" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!certificates.length"
      icon="award"
      title="No certificates found"
      message="Certificates appear here when students complete a course and request their certificate."
      :action-label="status || courseId ? 'Clear filters' : undefined"
      @action="status = ''; courseId = ''"
    />

    <template v-else>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[860px] text-left text-sm">
            <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
              <tr>
                <th class="px-4 py-2.5 font-semibold">Certificate</th>
                <th class="px-3 py-2.5 font-semibold">Student</th>
                <th class="px-3 py-2.5 font-semibold">Course</th>
                <th class="px-3 py-2.5 font-semibold">Issued</th>
                <th class="px-3 py-2.5 font-semibold">Status</th>
                <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="certificate in certificates" :key="certificate.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <p class="font-mono text-xs font-bold text-gray-900">{{ certificate.certificate_number }}</p>
                  <p class="text-[11px] text-gray-400">#{{ certificate.id }}</p>
                </td>
                <td class="px-3 py-3">
                  <div class="flex items-center gap-2">
                    <span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-[10px] font-bold text-oc-primary">
                      {{ initial(certificate.user?.name) }}
                    </span>
                    <div class="min-w-0">
                      <p class="truncate text-gray-700">{{ certificate.user?.name || '—' }}</p>
                      <p class="truncate text-[11px] text-gray-400">{{ certificate.user?.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-3">
                  <NuxtLink v-if="certificate.course" :to="`/courses/${certificate.course.slug}`" target="_blank" class="max-w-[220px] truncate text-oc-primary hover:underline">
                    {{ certificate.course.title }}
                  </NuxtLink>
                  <span v-else class="text-gray-400">—</span>
                </td>
                <td class="px-3 py-3 text-xs text-gray-500">{{ formatDate(certificate.issued_at) }}</td>
                <td class="px-3 py-3"><StatusBadge :status="certificate.status" /></td>
                <td class="px-4 py-3">
                  <div class="flex flex-wrap items-center justify-end gap-1">
                    <NuxtLink :to="`/certificates/verify/${certificate.certificate_number}`" target="_blank" class="btn-ghost !px-2 !py-1.5 text-xs">
                      <BaseIcon name="verify" :size="13" /> Verify
                    </NuxtLink>
                    <button
                      v-if="certificate.status === 'issued'"
                      type="button"
                      class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                      @click="revoke(certificate)"
                    >
                      Revoke
                    </button>
                    <button
                      v-else
                      type="button"
                      class="btn-ghost !px-2 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"
                      @click="restore(certificate)"
                    >
                      Restore
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
  </div>
</template>
