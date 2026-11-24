<script setup lang="ts">
import type { Blog } from '~/utils/types'

const props = defineProps<{ blog: Blog }>()
const image = computed(() => mediaUrl(props.blog.image))
</script>

<template>
  <NuxtLink
    :to="`/blog/${blog.id}`"
    class="card group flex h-full flex-col overflow-hidden"
  >
    <div class="relative aspect-[16/10] overflow-hidden bg-gray-100">
      <img
        :src="image"
        :alt="blog.title"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imageFallback"
      >
    </div>
    <div class="flex flex-1 flex-col p-5">
      <div class="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
        <span class="inline-flex items-center gap-1"><BaseIcon name="calendar" :size="12" /> {{ formatDate(blog.published_at) }}</span>
        <span class="inline-flex items-center gap-1"><BaseIcon name="eye" :size="12" /> {{ formatNumber(blog.views) }}</span>
      </div>
      <h3 class="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary">
        {{ blog.title }}
      </h3>
      <p class="mt-2 line-clamp-3 text-sm text-gray-500">{{ excerpt(blog.content, 140) }}</p>
      <div class="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500">
        <span>{{ blog.author?.name }}</span>
        <span class="inline-flex items-center gap-1 font-semibold text-oc-primary">Read <BaseIcon name="arrow-right" :size="13" /></span>
      </div>
    </div>
  </NuxtLink>
</template>
