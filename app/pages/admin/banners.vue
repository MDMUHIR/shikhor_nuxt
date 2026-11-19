<script setup lang="ts">
import type { Banner } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Banners — Admin', robots: 'noindex' })

const { apiData, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: banners, pending, error, refresh } = await useAsyncData('admin-banners', () =>
  apiData<Banner[]>('/admin/banners'),
)

const list = computed(() => banners.value ?? [])

const modalOpen = ref(false)
const editing = ref<Banner | null>(null)
const imageFile = ref<File | null>(null)
const preview = ref('')
const imageInput = ref<HTMLInputElement | null>(null)
const form = reactive({ title: '', description: '', link: '', is_active: true, sort_order: 0 })

function openCreate() {
  editing.value = null
  Object.assign(form, { title: '', description: '', link: '', is_active: true, sort_order: list.value.length })
  imageFile.value = null
  preview.value = ''
  if (imageInput.value) imageInput.value.value = ''
  resetErrors()
  modalOpen.value = true
}

function openEdit(banner: Banner) {
  editing.value = banner
  Object.assign(form, {
    title: banner.title || '',
    description: banner.description || '',
    link: banner.link || '',
    is_active: banner.is_active,
    sort_order: banner.sort_order ?? 0,
  })
  imageFile.value = null
  preview.value = mediaUrl(banner.image)
  if (imageInput.value) imageInput.value.value = ''
  resetErrors()
  modalOpen.value = true
}

function onImage(event: Event) {
  imageFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
  preview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : ''
}

async function save() {
  const payload = new FormData()
  if (editing.value) payload.append('banner_id', String(editing.value.id))
  payload.append('title', form.title)
  payload.append('description', form.description)
  payload.append('link', form.link)
  payload.append('is_active', form.is_active ? '1' : '0')
  payload.append('is_published', form.is_active ? '1' : '0')
  payload.append('sort_order', String(form.sort_order))
  if (imageFile.value) payload.append('image', imageFile.value)

  const result = await run(
    () => apiUpload(`/admin/banners/${editing.value ? 'update' : 'add'}`, payload),
    editing.value ? 'Banner updated.' : 'Banner added.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(banner: Banner) {
  const ok = await ask({
    title: 'Delete banner',
    message: 'Delete this banner from the homepage carousel?',
    confirmLabel: 'Delete banner',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/banners/delete/${banner.id}`, { method: 'DELETE' }), 'Banner deleted.')
  if (result !== undefined) await refresh()
}

async function toggle(banner: Banner) {
  const payload = new FormData()
  payload.append('banner_id', String(banner.id))
  payload.append('title', banner.title || '')
  payload.append('description', banner.description || '')
  payload.append('link', banner.link || '')
  payload.append('sort_order', String(banner.sort_order ?? 0))
  payload.append('is_active', banner.is_active ? '0' : '1')
  payload.append('is_published', banner.is_active ? '0' : '1')
  const result = await run(() => apiUpload('/admin/banners/update', payload), banner.is_active ? 'Banner hidden.' : 'Banner is live.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Homepage banners" subtitle="Control the hero carousel shown on the storefront home page." icon="image">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New banner
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-3">
      <div v-for="i in 3" :key="i" class="card h-32 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load banners" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="image"
      title="No banners yet"
      message="Add a wide promotional image, an optional link and a sort order to build the carousel."
      action-label="Create the first banner"
      @action="openCreate"
    />

    <div v-else class="space-y-3">
      <article v-for="banner in list" :key="banner.id" class="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <img :src="mediaUrl(banner.image)" :alt="banner.title || 'Banner'" class="h-28 w-full shrink-0 rounded-xl object-cover sm:w-52" @error="imageFallback">
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <h2 class="text-sm font-bold text-gray-900">{{ banner.title || 'Untitled banner' }}</h2>
            <span class="badge" :class="banner.is_active ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-gray-100 text-gray-600 ring-gray-200'">
              {{ banner.is_active ? 'Active' : 'Hidden' }}
            </span>
            <span class="badge bg-gray-50 text-gray-600 ring-gray-200">Order {{ banner.sort_order }}</span>
          </div>
          <p class="mt-1 line-clamp-2 text-xs text-gray-500">{{ banner.description || 'No description.' }}</p>
          <p v-if="banner.link" class="mt-1 truncate text-[11px] text-oc-primary">{{ banner.link }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-1 sm:flex-col sm:items-stretch">
          <button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs" @click="toggle(banner)">
            <BaseIcon :name="banner.is_active ? 'eye' : 'check'" :size="13" />
            {{ banner.is_active ? 'Hide' : 'Activate' }}
          </button>
          <button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs" @click="openEdit(banner)">
            <BaseIcon name="edit" :size="13" /> Edit
          </button>
          <button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" @click="remove(banner)">
            <BaseIcon name="trash" :size="13" /> Delete
          </button>
        </div>
      </article>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit banner' : 'New banner'" description="Wide images (for example 1600×600) work best in the hero carousel." size="lg" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label">Image</label>
          <div class="flex flex-wrap items-center gap-4">
            <img :src="preview || '/images/placeholder.svg'" alt="Banner preview" class="h-24 w-40 rounded-xl border border-gray-100 object-cover" @error="imageFallback">
            <div>
              <input ref="imageInput" type="file" accept="image/*" :required="!editing" class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onImage">
              <p class="mt-1 text-[11px] text-gray-400">JPG, PNG or GIF up to 2 MB.</p>
              <p v-if="fieldError('image')" class="field-error">{{ fieldError('image') }}</p>
            </div>
          </div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="field-label" for="banner-title">Title</label>
            <input id="banner-title" v-model="form.title" type="text" class="field-input">
          </div>
          <div>
            <label class="field-label" for="banner-link">Link</label>
            <input id="banner-link" v-model="form.link" type="url" class="field-input" placeholder="https://…">
            <p v-if="fieldError('link')" class="field-error">{{ fieldError('link') }}</p>
          </div>
        </div>
        <div>
          <label class="field-label" for="banner-description">Description</label>
          <textarea id="banner-description" v-model="form.description" rows="3" class="field-input" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="field-label" for="banner-order">Sort order</label>
            <input id="banner-order" v-model.number="form.sort_order" type="number" class="field-input">
          </div>
          <label class="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700">
            <input v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Show on homepage
          </label>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save banner' : 'Create banner' }}</button>
      </template>
    </AppModal>
  </div>
</template>
