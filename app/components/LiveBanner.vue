<script setup lang="ts">
/** Red "LIVE now" / "next class" strip linking to the live classes page. Silent when the user has no access. */
const props = defineProps<{ slug: string }>()

const state = useLiveSessions(props.slug)
const { live, next } = state

const now = ref(Date.now())
let ticker: ReturnType<typeof setInterval> | null = null
let refresher: ReturnType<typeof setInterval> | null = null

onMounted(async () => {
  await state.load()
  ticker = setInterval(() => (now.value = Date.now()), 1000)
  refresher = setInterval(() => !document.hidden && state.load(), 30_000)
})
onBeforeUnmount(() => {
  if (ticker) clearInterval(ticker)
  if (refresher) clearInterval(refresher)
})

const when = (value: string) => new Date(value).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
</script>

<template>
  <NuxtLink
    v-if="live || next"
    :to="`/community/${slug}`"
    class="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm shadow-sm transition hover:shadow-md"
    :class="live ? 'bg-red-600 text-white' : 'border border-oc-primary/30 bg-brand-light text-gray-800'"
  >
    <span class="flex items-center gap-2.5 font-semibold">
      <span v-if="live" class="flex h-2.5 w-2.5"><span class="absolute inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-white opacity-75" /><span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" /></span>
      <BaseIcon v-else name="calendar" :size="16" class="text-oc-primary" />
      <span v-if="live"><b>LIVE NOW:</b> {{ live.title }}</span>
      <span v-else-if="next"><b>Next class:</b> {{ next.title }} · {{ when(next.scheduled_at) }} <span class="ml-1 font-mono text-xs text-oc-primary">({{ countdown(next.scheduled_at, now) }})</span></span>
    </span>
    <span class="inline-flex items-center gap-1 text-xs font-bold">{{ live ? 'Join class & chat' : 'Open live classes' }} <BaseIcon name="arrow-right" :size="13" /></span>
  </NuxtLink>
</template>
