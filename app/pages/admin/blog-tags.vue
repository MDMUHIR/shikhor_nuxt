<script setup lang="ts">
import type { BlogTag } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Blog tags — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: tags, pending, error, refresh } = await useAsyncData('admin-blog-tags', () =>
  apiData<BlogTag[]>('/blog-tags'),
)

const list = computed(() => tags.value ?? [])
const modalOpen = ref(false)
const editing = ref<BlogTag | null>(null)
const name = ref('')

function openCreate() {
  editing.value = null
  name.value = ''
  resetErrors()
  modalOpen.value = true
}

function openEdit(tag: BlogTag) {
  editing.value = tag
  name.value = tag.name
  resetErrors()
  modalOpen.value = true
}

async function save() {
  const result = await run(
    () =>
      apiData(`/admin/blog-tags/${editing.value ? 'update' : 'add'}`, {
        method: 'POST',
        body: editing.value ? { tag_id: editing.value.id, name: name.value } : { name: name.value },
      }),
    editing.value ? 'Tag updated.' : 'Tag created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(tag: BlogTag) {
  const ok = await ask({
    title: 'Delete tag',
    message: `Delete the tag “${tag.name}”? Posts will keep their content but lose this tag.`,
    confirmLabel: 'Delete tag',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/blog-tags/delete/${tag.id}`, { method: 'DELETE' }), 'Tag deleted.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Blog tags" subtitle="Short keywords students can use to discover related articles." icon="tag">
      <NuxtLink to="/admin/blogs" class="btn-secondary">
        <BaseIcon name="arrow-left" :size="15" /> Blogs
      </NuxtLink>
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New tag
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="flex flex-wrap gap-2">
      <div v-for="i in 10" :key="i" class="h-8 w-24 animate-pulse rounded-full bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" title="Could not load blog tags" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="tag"
      title="No tags yet"
      message="Create tags such as “study tips”, “exams” or “career”."
      action-label="Create the first tag"
      @action="openCreate"
    />

    <div v-else class="card p-4">
      <div class="flex flex-wrap gap-2">
        <div v-for="tag in list" :key="tag.id" class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-1 text-sm">
          <span class="font-medium text-gray-700">{{ tag.name }}</span>
          <button type="button" class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-oc-primary" :aria-label="`Edit ${tag.name}`" @click="openEdit(tag)">
            <BaseIcon name="edit" :size="12" />
          </button>
          <button type="button" class="rounded-full p-1 text-gray-400 hover:bg-rose-50 hover:text-rose-600" :aria-label="`Delete ${tag.name}`" @click="remove(tag)">
            <BaseIcon name="trash" :size="12" />
          </button>
        </div>
      </div>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit tag' : 'New tag'" size="sm" @close="modalOpen = false">
      <form @submit.prevent="save">
        <label class="field-label" for="tag-name">Name</label>
        <input id="tag-name" v-model="name" type="text" class="field-input" required placeholder="Study tips">
        <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save tag' : 'Create tag' }}</button>
      </template>
    </AppModal>
  </div>
</template>
