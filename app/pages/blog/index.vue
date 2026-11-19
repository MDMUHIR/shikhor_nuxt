<script setup lang="ts">
import type { BlogListResponse, BlogTag } from '~/utils/types'

const route = useRoute()
const router = useRouter()
const { apiFetch, apiData } = useApi()

const search = ref(String(route.query.search || ''))
const tag = ref(String(route.query.tag || ''))
let searchTimer: ReturnType<typeof setTimeout> | null = null

const { data: tags } = await useAsyncData('blog-tags', () =>
  apiData<BlogTag[]>('/blog-tags').catch(() => [] as BlogTag[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'blog-list',
  () =>
    apiFetch<BlogListResponse>('/blogs', {
      query: {
        per_page: 9,
        page: Number(route.query.page) || 1,
        search: search.value.trim() || undefined,
        tag: tag.value || undefined,
      },
    }),
  { watch: [() => route.query] },
)

const blogs = computed(() => data.value?.blogs ?? [])
const pagination = computed(() => data.value?.pagination)

function apply(patch: Record<string, string | number | undefined>) {
  const query: Record<string, string> = {}
  for (const [key, value] of Object.entries({ ...route.query, ...patch })) {
    if (value === undefined || value === '' || value === null) continue
    query[key] = String(value)
  }
  if (!('page' in patch)) delete query.page
  router.push({ path: '/blog', query })
}

function onSearch() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => apply({ search: search.value.trim() || undefined }), 300)
}

function changeTag(value: string) {
  tag.value = tag.value === value ? '' : value
  apply({ tag: tag.value || undefined })
}

function changePage(page: number) {
  apply({ page })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(
  () => route.query,
  () => {
    search.value = String(route.query.search || '')
    tag.value = String(route.query.tag || '')
  },
)

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer)
})

useSeoMeta({
  title: 'Blog — Shikhor Academy',
  description: 'Study tips, course updates and learning guides from the Shikhor Academy team.',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Blog</span>
    </nav>

    <div class="rounded-2xl bg-gradient-to-r from-indigo-700 to-oc-primary p-6 text-white md:p-8">
      <h1 class="text-2xl font-extrabold md:text-3xl">Learning notes</h1>
      <p class="mt-2 max-w-2xl text-sm text-white/85">Study strategies, course announcements and practical guides.</p>
    </div>

    <div class="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside class="space-y-4">
        <div>
          <label class="field-label" for="blog-search">Search articles</label>
          <div class="relative">
            <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input id="blog-search" v-model="search" type="search" class="field-input pl-9" placeholder="Search…" @input="onSearch">
          </div>
        </div>
        <div v-if="tags?.length" class="card p-4">
          <p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Tags</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="item in tags"
              :key="item.id"
              type="button"
              class="rounded-full px-2.5 py-1 text-xs font-semibold transition"
              :class="tag === item.slug ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
              @click="changeTag(item.slug)"
            >
              {{ item.name }}
            </button>
          </div>
        </div>
      </aside>

      <div>
        <div v-if="pending" class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          <div v-for="i in 6" :key="i" class="card animate-pulse overflow-hidden">
            <div class="aspect-[16/10] bg-gray-200" />
            <div class="space-y-2 p-5">
              <div class="h-3 w-1/3 rounded bg-gray-200" />
              <div class="h-4 w-4/5 rounded bg-gray-200" />
              <div class="h-3 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        </div>
        <ErrorState v-else-if="error" title="Could not load the blog" :message="error.message" @retry="refresh" />
        <EmptyState
          v-else-if="!blogs.length"
          icon="blog"
          title="No articles found"
          :message="search || tag ? 'Try a different search or tag.' : 'Articles will appear here soon.'"
        />
        <template v-else>
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <BlogCard v-for="blog in blogs" :key="blog.id" :blog="blog" />
          </div>
          <div class="mt-8">
            <PaginationLinks
              :current-page="pagination?.current_page ?? 1"
              :last-page="pagination?.last_page ?? 1"
              :total="pagination?.total"
              @change="changePage"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
