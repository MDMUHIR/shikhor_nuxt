<script setup lang="ts">
import type { BlogCategory } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Blog categories — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: categories, pending, error, refresh } = await useAsyncData('admin-blog-categories', () =>
  apiData<BlogCategory[]>('/blog-categories'),
)

const list = computed(() => categories.value ?? [])
const modalOpen = ref(false)
const editing = ref<BlogCategory | null>(null)
const form = reactive({ name: '', description: '', color: '#0a7cc9', sort_order: 0, is_active: true })

function openCreate() {
  editing.value = null
  Object.assign(form, { name: '', description: '', color: '#0a7cc9', sort_order: list.value.length, is_active: true })
  resetErrors()
  modalOpen.value = true
}

function openEdit(category: BlogCategory) {
  editing.value = category
  Object.assign(form, {
    name: category.name,
    description: category.description || '',
    color: category.color || '#0a7cc9',
    sort_order: category.sort_order ?? 0,
    is_active: category.is_active !== false,
  })
  resetErrors()
  modalOpen.value = true
}

async function save() {
  const body = editing.value
    ? {
        category_id: editing.value.id,
        name: form.name,
        description: form.description,
        color: form.color,
        sort_order: form.sort_order,
        is_active: form.is_active ? 1 : 0,
      }
    : {
        name: form.name,
        description: form.description,
        color: form.color,
        sort_order: form.sort_order,
      }
  const result = await run(
    () => apiData(`/admin/blog-categories/${editing.value ? 'update' : 'add'}`, { method: 'POST', body }),
    editing.value ? 'Category saved.' : 'Category created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(category: BlogCategory) {
  const ok = await ask({
    title: 'Delete category',
    message: `Delete “${category.name}”? Blog posts are not deleted.`,
    confirmLabel: 'Delete category',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/blog-categories/delete/${category.id}`, { method: 'DELETE' }), 'Category deleted.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Blog categories" subtitle="Group articles by topic. Only active categories appear on the blog." icon="layers">
      <NuxtLink to="/admin/blogs" class="btn-secondary">
        <BaseIcon name="arrow-left" :size="15" /> Blogs
      </NuxtLink>
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New category
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 6" :key="i" class="card h-20 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load blog categories" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="layers"
      title="No blog categories yet"
      message="Create categories such as “Study guides”, “Career advice” or “Campus news”."
      action-label="Create the first category"
      @action="openCreate"
    />

    <div v-else class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <article v-for="category in list" :key="category.id" class="card p-4">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="h-3 w-3 rounded-full" :style="{ backgroundColor: category.color || '#0a7cc9' }" />
            <h2 class="text-sm font-bold text-gray-900">{{ category.name }}</h2>
          </div>
          <StatusBadge :status="category.is_active === false ? 'draft' : 'published'" />
        </div>
        <p class="mt-1 line-clamp-2 text-xs text-gray-500">{{ category.description || 'No description.' }}</p>
        <div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2">
          <span class="text-[11px] text-gray-400">Order {{ category.sort_order ?? 0 }}</span>
          <div class="flex items-center gap-1">
            <button type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="openEdit(category)">
              <BaseIcon name="edit" :size="13" /> Edit
            </button>
            <button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600 hover:bg-rose-50" @click="remove(category)">
              <BaseIcon name="trash" :size="13" />
            </button>
          </div>
        </div>
      </article>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit blog category' : 'New blog category'" size="md" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="blog-category-name">Name</label>
          <input id="blog-category-name" v-model="form.name" type="text" class="field-input" required>
          <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
        </div>
        <div>
          <label class="field-label" for="blog-category-description">Description</label>
          <textarea id="blog-category-description" v-model="form.description" rows="3" class="field-input" />
        </div>
        <div class="grid gap-4 sm:grid-cols-3">
          <div>
            <label class="field-label" for="blog-category-color">Colour</label>
            <div class="flex items-center gap-2">
              <input id="blog-category-color" v-model="form.color" type="color" class="h-10 w-12 cursor-pointer rounded-lg border border-gray-200 bg-white p-1">
              <input v-model="form.color" type="text" class="field-input" maxlength="7">
            </div>
          </div>
          <div>
            <label class="field-label" for="blog-category-order">Sort order</label>
            <input id="blog-category-order" v-model.number="form.sort_order" type="number" class="field-input">
          </div>
          <label v-if="editing" class="mt-7 flex items-center gap-2 text-sm text-gray-700">
            <input v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
            Active
          </label>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save category' : 'Create category' }}</button>
      </template>
    </AppModal>
  </div>
</template>
