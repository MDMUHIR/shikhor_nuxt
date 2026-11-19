<script setup lang="ts">
import type { Blog, BlogListResponse, BlogTag } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Blogs — Admin', robots: 'noindex' })

const { apiData, apiFetch, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const page = ref(1)
const search = ref('')
let searchTimer: ReturnType<typeof setTimeout> | null = null

const { data: tags } = await useAsyncData('admin-blog-tags-options', () =>
  apiData<BlogTag[]>('/blog-tags').catch(() => [] as BlogTag[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-blogs',
  () =>
    apiFetch<BlogListResponse>('/admin/blogs', {
      query: { page: page.value, per_page: 10, search: search.value.trim() || undefined },
    }),
  { watch: [page] },
)

const blogs = computed(() => data.value?.blogs ?? [])
const pagination = computed(() => data.value?.pagination)

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    refresh()
  }, 320)
}

const modalOpen = ref(false)
const editing = ref<Blog | null>(null)
const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])
const existingImage = ref('')
const form = reactive({ title: '', content: '', is_published: false, tags: [] as number[] })

function openCreate() {
  editing.value = null
  Object.assign(form, { title: '', content: '', is_published: false, tags: [] })
  imageFiles.value = []
  imagePreviews.value = []
  existingImage.value = ''
  resetErrors()
  modalOpen.value = true
}

function openEdit(blog: Blog) {
  editing.value = blog
  const names = (blog.tags || []).map((tag) => tag.toLowerCase())
  Object.assign(form, {
    title: blog.title,
    content: blog.content,
    is_published: !!blog.published_at,
    tags: (tags.value ?? []).filter((tag) => names.includes(tag.name.toLowerCase())).map((tag) => tag.id),
  })
  imageFiles.value = []
  imagePreviews.value = []
  existingImage.value = blog.image ? mediaUrl(blog.image) : ''
  resetErrors()
  modalOpen.value = true
}

function onImages(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  imageFiles.value = files
  imagePreviews.value = files.map((file) => URL.createObjectURL(file))
}

async function save() {
  const payload = new FormData()
  if (editing.value) payload.append('blog_id', String(editing.value.id))
  payload.append('title', form.title)
  payload.append('content', form.content)
  payload.append('is_published', form.is_published ? '1' : '0')
  form.tags.forEach((tagId, index) => payload.append(`tags[${index}]`, String(tagId)))
  imageFiles.value.forEach((file, index) => payload.append(`images[${index}]`, file))

  const result = await run(
    () => apiUpload(`/admin/blogs/${editing.value ? 'update' : 'add'}`, payload),
    editing.value ? 'Blog saved.' : 'Blog created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(blog: Blog) {
  const ok = await ask({
    title: 'Delete blog',
    message: `Delete “${blog.title}” and its images? This cannot be undone.`,
    confirmLabel: 'Delete blog',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/blogs/delete/${blog.id}`, { method: 'DELETE' }), 'Blog deleted.')
  if (result !== undefined) await refresh()
}

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer)
})
</script>

<template>
  <div>
    <AdminPageHeader title="Blogs" subtitle="Write course updates, study tips and announcements for the storefront blog." icon="blog">
      <NuxtLink to="/admin/blog-tags" class="btn-secondary">
        <BaseIcon name="tag" :size="15" /> Tags
      </NuxtLink>
      <NuxtLink to="/admin/blog-categories" class="btn-secondary">
        <BaseIcon name="layers" :size="15" /> Categories
      </NuxtLink>
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New post
      </button>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="relative max-w-md">
        <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input v-model="search" type="search" class="field-input pl-9" placeholder="Search posts…" aria-label="Search blogs" @input="onSearchInput">
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 5" :key="i" class="card h-20 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load blogs" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!blogs.length"
      icon="blog"
      :title="search ? 'No posts match your search' : 'No blog posts yet'"
      :message="search ? 'Try a different keyword.' : 'Write your first article to share news and study tips.'"
      :action-label="search ? 'Clear search' : 'Write a post'"
      @action="search ? (search = '', page = 1, refresh()) : openCreate()"
    />

    <template v-else>
      <div class="space-y-2">
        <article v-for="blog in blogs" :key="blog.id" class="card flex flex-wrap items-center gap-3 p-3">
          <img :src="mediaUrl(blog.image)" :alt="blog.title" class="h-16 w-24 shrink-0 rounded-xl object-cover" @error="imageFallback">
          <div class="min-w-0 flex-1">
            <h2 class="truncate text-sm font-bold text-gray-900">{{ blog.title }}</h2>
            <p class="mt-0.5 line-clamp-1 text-xs text-gray-500">{{ excerpt(blog.content, 120) }}</p>
            <div class="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400">
              <StatusBadge :status="blog.published_at ? 'published' : 'draft'" />
              <span>{{ blog.author?.name }}</span>
              <span v-if="blog.published_at">· {{ formatDate(blog.published_at) }}</span>
              <span>· {{ formatNumber(blog.views) }} views</span>
              <span v-for="tag in blog.tags" :key="tag" class="badge bg-gray-50 text-gray-600 ring-gray-200">{{ tag }}</span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <NuxtLink v-if="blog.published_at" :to="`/blog/${blog.id}`" target="_blank" class="btn-ghost !p-1.5" aria-label="View post">
              <BaseIcon name="external-link" :size="15" />
            </NuxtLink>
            <button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs" @click="openEdit(blog)">
              <BaseIcon name="edit" :size="14" /> Edit
            </button>
            <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete post" @click="remove(blog)">
              <BaseIcon name="trash" :size="15" />
            </button>
          </div>
        </article>
      </div>

      <div class="mt-5 flex justify-center">
        <PaginationLinks
          :current-page="pagination?.current_page ?? 1"
          :last-page="pagination?.last_page ?? 1"
          :total="pagination?.total"
          @change="(value) => (page = value)"
        />
      </div>
    </template>

    <AppModal :open="modalOpen" :title="editing ? 'Edit post' : 'New post'" description="Content supports basic HTML. Images replace the existing gallery when uploaded." size="lg" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="blog-title">Title</label>
          <input id="blog-title" v-model="form.title" type="text" class="field-input" required>
          <p v-if="fieldError('title')" class="field-error">{{ fieldError('title') }}</p>
        </div>
        <div>
          <label class="field-label" for="blog-content">Content</label>
          <textarea id="blog-content" v-model="form.content" rows="10" class="field-input font-mono text-xs" required placeholder="<p>Write your article…</p>" />
          <p v-if="fieldError('content')" class="field-error">{{ fieldError('content') }}</p>
        </div>
        <div>
          <label class="field-label">Images</label>
          <div v-if="existingImage && !imagePreviews.length" class="mb-2">
            <img :src="existingImage" alt="Current blog image" class="h-24 w-40 rounded-xl border border-gray-100 object-cover" @error="imageFallback">
            <p class="mt-1 text-[11px] text-gray-400">Current image. Upload new files to replace it.</p>
          </div>
          <div v-if="imagePreviews.length" class="mb-2 flex flex-wrap gap-2">
            <img v-for="(src, index) in imagePreviews" :key="index" :src="src" alt="New blog image" class="h-20 w-28 rounded-lg object-cover">
          </div>
          <input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onImages">
        </div>
        <div>
          <label class="field-label">Tags</label>
          <div class="flex flex-wrap gap-2">
            <label v-for="tag in tags" :key="tag.id" class="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600 has-[:checked]:border-oc-primary has-[:checked]:bg-brand-light has-[:checked]:text-oc-primary">
              <input v-model="form.tags" type="checkbox" :value="tag.id" class="h-3 w-3 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
              {{ tag.name }}
            </label>
            <span v-if="!tags?.length" class="text-xs text-gray-400">No tags yet — create tags first.</span>
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <input v-model="form.is_published" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
          Publish immediately
        </label>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save post' : 'Create post' }}</button>
      </template>
    </AppModal>
  </div>
</template>
