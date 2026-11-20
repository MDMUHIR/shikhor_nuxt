<script setup lang="ts">
import type { LessonResource } from '~/utils/types'

const props = defineProps<{ lessonId: number }>()

const { apiData, apiUpload } = useApi()
const { run, busy, fieldError } = useFormHandler()

const { data, refresh } = await useAsyncData(
  () => `lesson-resources-${props.lessonId}`,
  () => apiData<LessonResource[]>(`/admin/lessons/${props.lessonId}/resources`).catch(() => [] as LessonResource[]),
  { watch: [() => props.lessonId] },
)

const title = ref('')
const url = ref('')
const file = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

async function add() {
  const form = new FormData()
  form.append('lesson_id', String(props.lessonId))
  form.append('title', title.value)
  if (url.value) form.append('external_url', url.value)
  if (file.value) form.append('file', file.value)
  const result = await run(() => apiUpload('/admin/lesson-resources/add', form), 'Resource added.')
  if (result === undefined) return
  title.value = ''
  url.value = ''
  file.value = null
  if (fileInput.value) fileInput.value.value = ''
  await refresh()
}

async function remove(resource: LessonResource) {
  const result = await run(() => apiData(`/admin/lesson-resources/delete/${resource.id}`, { method: 'DELETE' }), 'Resource removed.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div class="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
    <p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Downloads &amp; links</p>
    <ul v-if="data?.length" class="mb-3 space-y-1.5">
      <li v-for="resource in data" :key="resource.id" class="flex items-center justify-between gap-2 text-sm">
        <span class="truncate text-gray-700">{{ resource.title }} <span class="text-[11px] text-gray-400">{{ resource.external_url ? 'link' : 'file' }}</span></span>
        <button type="button" class="text-xs font-semibold text-rose-600 hover:underline" :disabled="busy" @click="remove(resource)">Remove</button>
      </li>
    </ul>
    <div class="grid gap-2 sm:grid-cols-2">
      <input v-model="title" class="field-input" placeholder="Title" maxlength="255">
      <input v-model="url" type="url" class="field-input" placeholder="https:// link (optional)">
      <input ref="fileInput" type="file" class="block w-full text-xs text-gray-500 sm:col-span-2" @change="file = ($event.target as HTMLInputElement).files?.[0] ?? null">
    </div>
    <p v-if="fieldError('file')" class="field-error">{{ fieldError('file') }}</p>
    <p v-if="fieldError('external_url')" class="field-error">{{ fieldError('external_url') }}</p>
    <button type="button" class="btn-secondary mt-2" :disabled="busy || !title || (!url && !file)" @click="add">Add resource</button>
  </div>
</template>
