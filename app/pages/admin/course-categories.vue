<script setup lang="ts">
import type { CourseCategory } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Course categories — Admin', robots: 'noindex' })

const { apiData, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: categories, pending, error, refresh } = await useAsyncData('admin-course-categories', () =>
  apiData<CourseCategory[]>('/admin/course-categories'),
)

const list = computed(() => categories.value ?? [])
const activeCount = computed(() => list.value.filter((item) => item.status !== false).length)

const modalOpen = ref(false)
const editing = ref<CourseCategory | null>(null)
const imageFile = ref<File | null>(null)
const imageInput = ref<HTMLInputElement | null>(null)
const preview = ref('')

const form = reactive({
  name: '',
  slug: '',
  description: '',
  status: true,
  sort_order: 0,
})

function openCreate() {
  editing.value = null
  Object.assign(form, { name: '', slug: '', description: '', status: true, sort_order: list.value.length })
  imageFile.value = null
  preview.value = ''
  resetErrors()
  modalOpen.value = true
}

function openEdit(category: CourseCategory) {
  editing.value = category
  Object.assign(form, {
    name: category.name,
    slug: category.slug,
    description: category.description || '',
    status: category.status !== false,
    sort_order: category.sort_order ?? 0,
  })
  imageFile.value = null
  preview.value = category.image ? mediaUrl(category.image) : ''
  if (imageInput.value) imageInput.value.value = ''
  resetErrors()
  modalOpen.value = true
}

function onImageChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0] ?? null
  imageFile.value = file
  preview.value = file ? URL.createObjectURL(file) : ''
}

async function save() {
  const payload = new FormData()
  if (editing.value) payload.append('id', String(editing.value.id))
  payload.append('name', form.name)
  payload.append('slug', form.slug)
  payload.append('description', form.description)
  payload.append('status', form.status ? '1' : '0')
  payload.append('sort_order', String(form.sort_order))
  if (imageFile.value) payload.append('image', imageFile.value)

  const result = await run(
    () => apiUpload(`/admin/course-categories/${editing.value ? 'update' : 'add'}`, payload),
    editing.value ? 'Category updated.' : 'Category created.',
  )
  if (!result) return
  modalOpen.value = false
  await refresh()
}

async function remove(category: CourseCategory) {
  const ok = await ask({
    title: 'Delete category',
    message: `Delete “${category.name}”? Courses in this category will keep their content but lose the category link.`,
    confirmLabel: 'Delete category',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/course-categories/delete/${category.id}`, { method: 'DELETE' }), 'Category deleted.')
  if (result !== undefined) await refresh()
}

async function toggleStatus(category: CourseCategory) {
  const payload = new FormData()
  payload.append('id', String(category.id))
  payload.append('name', category.name)
  payload.append('slug', category.slug)
  payload.append('description', category.description || '')
  payload.append('status', category.status === false ? '1' : '0')
  payload.append('sort_order', String(category.sort_order ?? 0))
  const result = await run(() => apiUpload('/admin/course-categories/update', payload), category.status === false ? 'Category is visible.' : 'Category hidden.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Course categories" subtitle="Group the catalog so students can browse by topic." icon="layers">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New category
      </button>
    </AdminPageHeader>

    <div class="mb-4 flex flex-wrap gap-2 text-xs text-gray-500">
      <span class="badge bg-gray-100 text-gray-600 ring-gray-200">{{ list.length }} total</span>
      <span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">{{ activeCount }} visible</span>
    </div>

    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 6" :key="i" class="card h-[104px] animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load course categories" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="layers"
      title="No course categories yet"
      message="Create categories such as Web Development, Design or Marketing to organise your catalog."
      action-label="Create the first category"
      @action="openCreate"
    />

    <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="category in list" :key="category.id" class="card flex flex-col p-4">
        <div class="flex items-start gap-3">
          <img
            :src="mediaUrl(category.image)"
            :alt="category.name"
            class="h-14 w-14 shrink-0 rounded-xl object-cover"
            @error="imageFallback"
          >
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-2">
              <h2 class="truncate text-sm font-bold text-gray-900">{{ category.name }}</h2>
              <span class="badge shrink-0" :class="category.status === false ? 'bg-gray-100 text-gray-600 ring-gray-200' : 'bg-emerald-50 text-emerald-700 ring-emerald-200'">
                {{ category.status === false ? 'Hidden' : 'Visible' }}
              </span>
            </div>
            <p class="truncate text-[11px] text-gray-400">/{{ category.slug }}</p>
            <p class="mt-1 text-xs text-gray-500">
              {{ category.courses_count ?? 0 }} course{{ (category.courses_count ?? 0) === 1 ? '' : 's' }} · order {{ category.sort_order ?? 0 }}
            </p>
          </div>
        </div>
        <p class="mt-3 line-clamp-2 min-h-[32px] text-xs text-gray-500">{{ category.description || 'No description yet.' }}</p>
        <div class="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-2">
          <button type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="toggleStatus(category)">
            <BaseIcon :name="category.status === false ? 'eye' : 'x'" :size="14" />
            {{ category.status === false ? 'Show' : 'Hide' }}
          </button>
          <button type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="openEdit(category)">
            <BaseIcon name="edit" :size="14" /> Edit
          </button>
          <button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600 hover:bg-rose-50" @click="remove(category)">
            <BaseIcon name="trash" :size="14" />
          </button>
        </div>
      </article>
    </div>

    <AppModal
      :open="modalOpen"
      :title="editing ? 'Edit course category' : 'New course category'"
      :description="editing ? 'Update how this category appears in the catalog.' : 'Give the category a clear name and an optional cover image.'"
      @close="modalOpen = false"
    >
      <form class="space-y-4" @submit.prevent="save">
        <div class="flex items-center gap-4">
          <img
            :src="preview || '/images/placeholder.svg'"
            alt="Category cover preview"
            class="h-20 w-20 rounded-xl border border-gray-100 object-cover"
            @error="imageFallback"
          >
          <div>
            <label class="field-label" for="category-image">Cover image</label>
            <input id="category-image" ref="imageInput" type="file" accept="image/*" class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onImageChange">
            <p class="mt-1 text-[11px] text-gray-400">JPG or PNG. Leave empty to keep the current image.</p>
            <p v-if="fieldError('image')" class="field-error">{{ fieldError('image') }}</p>
          </div>
        </div>

        <div>
          <label class="field-label" for="category-name">Name</label>
          <input id="category-name" v-model="form.name" type="text" class="field-input" placeholder="Web development" required>
          <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="field-label" for="category-slug">Slug</label>
            <input id="category-slug" v-model="form.slug" type="text" class="field-input" placeholder="web-development">
            <p v-if="fieldError('slug')" class="field-error">{{ fieldError('slug') }}</p>
          </div>
          <div>
            <label class="field-label" for="category-order">Sort order</label>
            <input id="category-order" v-model.number="form.sort_order" type="number" min="0" class="field-input">
          </div>
        </div>

        <div>
          <label class="field-label" for="category-description">Description</label>
          <textarea id="category-description" v-model="form.description" rows="3" class="field-input" placeholder="What will students learn in this category?" />
          <p v-if="fieldError('description')" class="field-error">{{ fieldError('description') }}</p>
        </div>

        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input v-model="form.status" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
          Show this category in the catalog
        </label>
      </form>

      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">
          <BaseIcon v-if="busy" name="refresh" :size="15" class="animate-spin" />
          {{ editing ? 'Save changes' : 'Create category' }}
        </button>
      </template>
    </AppModal>
  </div>
</template>
