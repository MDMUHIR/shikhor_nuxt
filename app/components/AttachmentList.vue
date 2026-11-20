<script setup lang="ts">
export interface AttachmentItem {
  id: number
  title: string
  kind: string
  mime_type?: string | null
  size?: number | null
  locked?: boolean
  external_url?: string | null
  download_url?: string | null
  lesson?: { id: number; title: string } | null
}

defineProps<{ items: AttachmentItem[]; lockedHint?: string }>()

const toast = useToast()
const busyId = ref<number | null>(null)

const badge: Record<string, { label: string; cls: string }> = {
  pdf: { label: 'PDF', cls: 'bg-rose-50 text-rose-600' },
  slides: { label: 'PPT', cls: 'bg-orange-50 text-orange-600' },
  image: { label: 'IMG', cls: 'bg-emerald-50 text-emerald-600' },
  document: { label: 'DOC', cls: 'bg-blue-50 text-blue-600' },
  spreadsheet: { label: 'XLS', cls: 'bg-green-50 text-green-700' },
  archive: { label: 'ZIP', cls: 'bg-amber-50 text-amber-700' },
  link: { label: 'LINK', cls: 'bg-violet-50 text-violet-600' },
  file: { label: 'FILE', cls: 'bg-gray-100 text-gray-600' },
}

function sizeLabel(bytes?: number | null) {
  if (!bytes) return ''
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const extensions: Record<string, string> = {
  'application/pdf': '.pdf',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/zip': '.zip',
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/webp': '.webp',
  'text/plain': '.txt',
}

function extensionFor(item: AttachmentItem, blobType: string) {
  return extensions[item.mime_type || ''] || extensions[blobType] || ''
}

async function save(item: AttachmentItem, inline = false) {
  busyId.value = item.id
  try {
    const blob = await $fetch<Blob>(`/api/proxy/lesson-resources/${item.id}/download${inline ? '?inline=1' : ''}`, {
      responseType: 'blob',
    })
    // The API answers JSON (not a file) when access is denied.
    if (blob.type.includes('application/json')) {
      const body = JSON.parse(await blob.text())
      throw new Error(body.message || 'You do not have access to this file.')
    }
    const url = URL.createObjectURL(blob)
    if (inline) {
      window.open(url, '_blank', 'noopener')
    } else {
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `${item.title}${extensionFor(item, blob.type)}`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    }
    setTimeout(() => URL.revokeObjectURL(url), 60_000)
  } catch (err) {
    toast.error((err as Error).message || 'Could not download this file.')
  } finally {
    busyId.value = null
  }
}
</script>

<template>
  <ul class="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100">
    <li v-for="item in items" :key="item.id" class="flex items-center gap-3 bg-white px-4 py-3">
      <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold" :class="(badge[item.kind] ?? badge.file)!.cls">
        {{ (badge[item.kind] ?? badge.file)!.label }}
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold text-gray-800">{{ item.title }}</p>
        <p class="truncate text-[11px] text-gray-400">
          <template v-if="item.lesson">{{ item.lesson.title }} · </template>{{ sizeLabel(item.size) || (item.kind === 'link' ? 'External link' : '') }}
        </p>
      </div>
      <span v-if="item.locked" class="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
        <BaseIcon name="lock" :size="14" /> {{ lockedHint || 'Enroll to access' }}
      </span>
      <template v-else>
        <a v-if="item.external_url" :href="item.external_url" target="_blank" rel="noopener noreferrer" class="btn-secondary !px-3 !py-1.5 text-xs">
          <BaseIcon name="external-link" :size="14" /> Open
        </a>
        <template v-else>
          <button v-if="item.kind === 'pdf' || item.kind === 'image'" type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs" :disabled="busyId === item.id" @click="save(item, true)">
            View
          </button>
          <button type="button" class="btn-secondary !px-3 !py-1.5 text-xs" :disabled="busyId === item.id" @click="save(item)">
            <BaseIcon name="download" :size="14" /> {{ busyId === item.id ? '…' : 'Download' }}
          </button>
        </template>
      </template>
    </li>
  </ul>
</template>
