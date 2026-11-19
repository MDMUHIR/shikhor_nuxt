<script setup lang="ts">
import type { Blog, BlogListResponse } from '~/utils/types'

const route = useRoute()
const id = String(route.params.id)
const { apiData, apiFetch } = useApi()

const { data: blog, pending, error, refresh } = await useAsyncData(`blog-${id}`, () =>
  apiData<Blog>(`/blogs/${id}`, { query: { increment_views: 1 } }),
)

const { data: relatedResponse } = await useAsyncData(`blog-related-${id}`, () =>
  apiFetch<BlogListResponse>('/blogs', { query: { per_page: 4 } }).catch(() => null),
)

const related = computed(() => (relatedResponse.value?.blogs ?? []).filter((item) => item.id !== blog.value?.id).slice(0, 3))
const image = computed(() => mediaUrl(blog.value?.image))

useSeoMeta({
  title: () => (blog.value ? `${blog.value.title} — Shikhor Academy` : 'Article — Shikhor Academy'),
  description: () => excerpt(blog.value?.content, 160),
  ogImage: () => (blog.value?.image ? mediaUrl(blog.value.image) : undefined),
  ogType: 'article',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <NuxtLink to="/blog" class="hover:text-oc-primary">Blog</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="truncate text-gray-700">{{ blog?.title || 'Article' }}</span>
    </nav>

    <div v-if="pending" class="space-y-4">
      <div class="h-8 w-3/4 animate-pulse rounded bg-gray-200" />
      <div class="h-4 w-40 animate-pulse rounded bg-gray-200" />
      <div class="aspect-[16/9] animate-pulse rounded-2xl bg-gray-200" />
      <div v-for="i in 6" :key="i" class="h-4 w-full animate-pulse rounded bg-gray-200" />
    </div>

    <ErrorState v-else-if="error" title="Article not found" :message="error.message" @retry="refresh" />

    <article v-else-if="blog">
      <h1 class="text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">{{ blog.title }}</h1>
      <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
        <span class="inline-flex items-center gap-1"><BaseIcon name="user" :size="13" /> {{ blog.author?.name }}</span>
        <span class="inline-flex items-center gap-1"><BaseIcon name="calendar" :size="13" /> {{ formatDate(blog.published_at) }}</span>
        <span class="inline-flex items-center gap-1"><BaseIcon name="eye" :size="13" /> {{ formatNumber(blog.views) }} views</span>
      </div>

      <div class="mt-5 overflow-hidden rounded-2xl bg-gray-100">
        <img :src="image" :alt="blog.title" class="aspect-[16/9] w-full object-cover" @error="imageFallback" >
      </div>

      <div class="prose-content mt-6" v-html="sanitizeHtml(blog.content)" />

      <div v-if="blog.tags?.length" class="mt-8 flex flex-wrap items-center gap-2">
        <span class="text-xs font-semibold text-gray-500">Tags:</span>
        <NuxtLink
          v-for="tag in blog.tags"
          :key="tag"
          :to="{ path: '/blog', query: { tag } }"
          class="badge bg-gray-50 text-gray-600 ring-gray-200 hover:bg-brand-light hover:text-oc-primary"
        >{{ tag }}</NuxtLink>
      </div>

      <div class="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
        <p class="text-sm font-semibold text-gray-800">Want to keep learning?</p>
        <p class="mt-1 text-sm text-gray-600">Browse structured courses with quizzes and certificates.</p>
        <NuxtLink to="/courses" class="btn-primary mt-3">Browse courses</NuxtLink>
      </div>

      <section v-if="related.length" class="mt-10">
        <h2 class="mb-4 text-lg font-bold text-gray-900">More articles</h2>
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <BlogCard v-for="item in related" :key="item.id" :blog="item" />
        </div>
      </section>
    </article>
  </div>
</template>
