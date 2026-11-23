<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => Number(props.error?.statusCode) || 500)
const isNotFound = computed(() => statusCode.value === 404)

useSeoMeta({
  title: () => (isNotFound.value ? 'Page not found — Shikhor Academy' : 'Something went wrong — Shikhor Academy'),
  robots: 'noindex',
})

function goHome() {
  clearError({ redirect: '/' })
}

function retry() {
  clearError({ redirect: useRoute().fullPath })
}
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="border-b border-gray-100 bg-white">
      <div class="mx-auto flex h-18 w-full max-w-[1280px] items-center px-4 md:px-6">
        <NuxtLink to="/" class="flex h-12 w-24 items-center" aria-label="Shikhor Academy home">
          <img src="/logo.png" alt="Shikhor Academy" class="h-full w-full object-contain" >
        </NuxtLink>
        <NuxtLink to="/" class="btn-ghost ml-auto">Back to home</NuxtLink>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-4 py-16">
      <div class="w-full max-w-lg text-center">
        <p class="text-6xl font-extrabold tracking-tight text-oc-primary/30">{{ statusCode }}</p>
        <h1 class="mt-2 text-2xl font-extrabold text-gray-900 md:text-3xl">
          {{ isNotFound ? 'We could not find that page' : 'Something went wrong' }}
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          {{ isNotFound
            ? 'The page may have moved, or the link might be broken. Try one of the links below.'
            : (error?.statusMessage || error?.message || 'An unexpected error occurred. Please try again.') }}
        </p>

        <div class="mt-6 flex flex-wrap justify-center gap-2">
          <button type="button" class="btn-primary" @click="retry">
            <BaseIcon name="refresh" :size="16" /> Try again
          </button>
          <button type="button" class="btn-secondary" @click="goHome">
            <BaseIcon name="home" :size="16" /> Go home
          </button>
        </div>

        <div class="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-semibold text-oc-primary">
          <NuxtLink to="/courses" class="hover:underline">Courses</NuxtLink>
          <NuxtLink to="/store" class="hover:underline">Store</NuxtLink>
          <NuxtLink to="/blog" class="hover:underline">Blog</NuxtLink>
          <NuxtLink to="/my-courses" class="hover:underline">My courses</NuxtLink>
          <NuxtLink to="/login" class="hover:underline">Sign in</NuxtLink>
        </div>
      </div>
    </main>

    <footer class="border-t border-gray-100 bg-white py-4 text-center text-xs text-gray-400">
      © {{ new Date().getFullYear() }} Shikhor Academy
    </footer>
  </div>
</template>
