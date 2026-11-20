<script setup lang="ts">
import type { AttachmentItem } from '~/components/AttachmentList.vue'

const props = defineProps<{ courseId: number }>()

const { apiData, apiUpload } = useApi()
const { run, busy, fieldError } = useFormHandler()

const { data, refresh } = await useAsyncData(
  () => `course-attachments-${props.courseId}`,
  () => apiData<AttachmentItem[]>(`/admin/courses/${props.courseId}/attachments`).catch(() => [] as AttachmentItem[]),
  { watch: [() => props.courseId] },
)

const title = ref('')
const url = ref('')
const file = ref<File | null>(null)
const input = ref<HTMLInputElement | null>(null)

function pick(event: Event) {
  const picked = (event.target as HTMLInputElement).files?.[0] ?? null
  file.value = picked
  if (picked && !title.value) title.value = picked.name.replace(/\.[^.]+$/, '')
}

async function add() {
  const form = new FormData()
  form.append('course_id', String(props.courseId))
  form.append('title', title.value)
  if (url.value) form.append('external_url', url.value)
  if (file.value) form.append('file', file.value)
  const result = await run(() => apiUpload('/admin/lesson-resources/add', form), 'Attachment added.')
  if (result === undefined) return
  title.value = ''
  url.value = ''
  file.value = null
  if (input.value) input.value.value = ''
  await refresh()
}

async function remove(item: AttachmentItem) {
  const result = await run(() => apiData(`/admin/lesson-resources/delete/${item.id}`, { method: 'DELETE' }), 'Attachment removed.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <section class="card p-5">
    <h2 class="text-sm font-bold text-gray-900">Course attachments</h2>
    <p class="mt-1 text-xs text-gray-500">PDF, PowerPoint, Word, Excel, images or ZIP (max 50 MB). Enrolled students can view and download them.</p>

    <ul v-if="data?.length" class="mt-4 space-y-1.5">
      <li v-for="item in data" :key="item.id" class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm">
        <span class="truncate text-gray-700">
          <span class="mr-2 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">{{ item.kind }}</span>{{ item.title }}
          <span v-if="item.lesson" class="text-[11px] text-gray-400"> · {{ item.lesson.title }}</span>
        </span>
        <button type="button" class="text-xs font-semibold text-rose-600 hover:underline" :disabled="busy" @click="remove(item)">Remove</button>
      </li>
    </ul>
    <p v-else class="mt-4 text-sm text-gray-500">No attachments yet.</p>

    <div class="mt-4 grid gap-2 sm:grid-cols-2">
      <input v-model="title" class="field-input" placeholder="Title (e.g. Week 1 slides)" maxlength="255">
      <input v-model="url" type="url" class="field-input" placeholder="…or an https:// link">
      <input
        ref="input"
        type="file"
        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt,.csv,.png,.jpg,.jpeg,.webp"
        class="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary sm:col-span-2"
        @change="pick"
      >
    </div>
    <p v-if="fieldError('file')" class="field-error">{{ fieldError('file') }}</p>
    <p v-if="fieldError('external_url')" class="field-error">{{ fieldError('external_url') }}</p>
    <button type="button" class="btn-primary mt-3" :disabled="busy || !title || (!url && !file)" @click="add">
      {{ busy ? 'Uploading…' : 'Add attachment' }}
    </button>
  </section>
</template>
