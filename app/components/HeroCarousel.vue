<script setup lang="ts">
import type { Banner } from '~/utils/types'

const props = defineProps<{
  banners: Banner[]
  title?: string
  subtitle?: string
}>()

const slides = computed(() =>
  props.banners.map((banner) => ({
    id: banner.id,
    title: banner.title || 'Learn without limits',
    description: banner.description || '',
    image: mediaUrl(banner.image),
    link: banner.link || '/courses',
  })),
)

const index = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const current = computed(() => slides.value[index.value])
const prevIndex = computed(() => (index.value - 1 + slides.value.length) % slides.value.length)
const nextIndex = computed(() => (index.value + 1) % slides.value.length)

function go(i: number) {
  if (!slides.value.length) return
  index.value = (i + slides.value.length) % slides.value.length
  restart()
}

function restart() {
  if (timer) clearInterval(timer)
  if (slides.value.length < 2) return
  timer = setInterval(() => {
    index.value = (index.value + 1) % slides.value.length
  }, 5500)
}

watch(
  () => slides.value.length,
  () => {
    index.value = 0
    restart()
  },
)

onMounted(restart)
onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-oc-primary via-indigo-600 to-violet-700 text-white shadow-xl">
    <div class="absolute inset-0 opacity-20" aria-hidden="true">
      <div class="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-white blur-3xl" />
      <div class="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl" />
    </div>

    <div v-if="current" class="relative grid min-h-[320px] items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-12">
      <div class="fade-in">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          <BaseIcon name="sparkles" :size="13" /> Shikhor Academy
        </span>
        <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          {{ title || current.title }}
        </h1>
        <p class="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-base">
          {{ subtitle || current.description || 'Expert-led courses, practical quizzes and verifiable certificates — learn at your own pace.' }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink :to="current.link.startsWith('http') ? '/courses' : current.link" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary shadow-sm transition hover:bg-blue-50">
            Explore now <BaseIcon name="arrow-right" :size="16" />
          </NuxtLink>
          <NuxtLink to="/courses" class="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            Browse courses
          </NuxtLink>
        </div>
      </div>
      <div class="relative hidden md:block">
        <div class="aspect-[16/11] overflow-hidden rounded-2xl ring-1 ring-white/25 shadow-2xl">
          <img :src="current.image" :alt="current.title" class="h-full w-full object-cover" @error="imageFallback" >
        </div>
      </div>
    </div>

    <div v-else class="relative grid min-h-[320px] items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-12">
      <div>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
          <BaseIcon name="sparkles" :size="13" /> Shikhor Academy
        </span>
        <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
          {{ title || 'Learn without limits' }}
        </h1>
        <p class="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-base">
          {{ subtitle || 'Expert-led courses, practical quizzes and verifiable certificates — learn at your own pace.' }}
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <NuxtLink to="/courses" class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary shadow-sm transition hover:bg-blue-50">
            Explore courses <BaseIcon name="arrow-right" :size="16" />
          </NuxtLink>
          <NuxtLink to="/store" class="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
            Visit store
          </NuxtLink>
        </div>
      </div>
      <div class="hidden justify-center md:flex">
        <div class="grid h-48 w-48 place-items-center rounded-3xl bg-white/10 ring-1 ring-white/20">
          <BaseIcon name="book-open" :size="72" class="text-white/70" />
        </div>
      </div>
    </div>

    <div v-if="slides.length > 1" class="relative flex items-center justify-between px-6 pb-5 md:px-10">
      <div class="flex gap-1.5">
        <button
          v-for="(slide, i) in slides"
          :key="slide.id"
          type="button"
          class="h-1.5 rounded-full transition-all"
          :class="i === index ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'"
          :aria-label="`Go to slide ${i + 1}`"
          @click="go(i)"
        />
      </div>
      <div class="flex gap-2">
        <button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Previous slide" @click="go(prevIndex)">
          <BaseIcon name="chevron-left" :size="16" />
        </button>
        <button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Next slide" @click="go(nextIndex)">
          <BaseIcon name="chevron-right" :size="16" />
        </button>
      </div>
    </div>
  </section>
</template>
