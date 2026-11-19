<script setup lang="ts">
import type { Category } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Product categories — Admin', robots: 'noindex' })

const { apiData, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: categories, pending, error, refresh } = await useAsyncData('admin-product-categories', () =>
  apiData<Category[]>('/categories'),
)

const list = computed(() => categories.value ?? [])
const modalOpen = ref(false)
const imageFile = ref<File | null>(null)
const preview = ref('')
const form = reactive({ name: '', description: '' })

function openCreate() {
  form.name = ''
  form.description = ''
  imageFile.value = null
  preview.value = ''
  resetErrors()
  modalOpen.value = true
}

function onImage(event: Event) {
  imageFile.value = (event.target as HTMLInputElement).files?.[0] ?? null
  preview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : ''
}

async function save() {
  if (!imageFile.value) {
    toastError('Please choose a cover image.')
    return
  }
  const payload = new FormData()
  payload.append('name', form.name)
  payload.append('description', form.description)
  payload.append('image', imageFile.value)

  const result = await run(() => apiUpload('/admin/categories/add', payload), 'Category created.')
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

const toast = useToast()
function toastError(message: string) {
  toast.error(message)
}

async function remove(category: Category) {
  const ok = await ask({
    title: 'Delete product category',
    message: `Delete “${category.name}”? Products in this category will become uncategorised.`,
    confirmLabel: 'Delete category',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/categories/delete/${category.id}`, { method: 'DELETE' }), 'Category deleted.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Product categories" subtitle="Organise the store catalog. Categories need a cover image." icon="tag">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New category
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 6" :key="i" class="card h-28 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load product categories" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="tag"
      title="No product categories yet"
      message="Create categories to help students browse physical products in the store."
      action-label="Create the first category"
      @action="openCreate"
    />

    <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="category in list" :key="category.id" class="card flex items-start gap-3 p-4">
        <img :src="mediaUrl(category.image)" :alt="category.name" class="h-20 w-20 shrink-0 rounded-xl object-cover" @error="imageFallback">
        <div class="min-w-0 flex-1">
          <h2 class="truncate text-sm font-bold text-gray-900">{{ category.name }}</h2>
          <p class="truncate text-[11px] text-gray-400">/{{ category.slug }}</p>
          <p class="mt-1 line-clamp-2 text-xs text-gray-500">{{ category.description || 'No description.' }}</p>
          <button type="button" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline" @click="remove(category)">
            <BaseIcon name="trash" :size="13" /> Delete
          </button>
        </div>
      </article>
    </div>

    <AppModal :open="modalOpen" title="New product category" description="Categories require a name, description and cover image." @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="product-category-name">Name</label>
          <input id="product-category-name" v-model="form.name" type="text" class="field-input" required placeholder="Books">
          <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
        </div>
        <div>
          <label class="field-label" for="product-category-description">Description</label>
          <textarea id="product-category-description" v-model="form.description" rows="3" class="field-input" required placeholder="Printed study materials and workbooks." />
          <p v-if="fieldError('description')" class="field-error">{{ fieldError('description') }}</p>
        </div>
        <div>
          <label class="field-label">Cover image</label>
          <div class="flex items-center gap-4">
            <img :src="preview || '/images/placeholder.svg'" alt="Category preview" class="h-20 w-20 rounded-xl border border-gray-100 object-cover" @error="imageFallback">
            <input type="file" accept="image/*" required class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onImage">
          </div>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">Create category</button>
      </template>
    </AppModal>
  </div>
</template>
