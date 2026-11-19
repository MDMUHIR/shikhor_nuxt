<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  lastPage: number
  total?: number
}>()

const emit = defineEmits<{ change: [page: number] }>()

const pages = computed(() => {
  const total = props.lastPage
  const current = props.currentPage
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const set = new Set<number>([1, total, current, current - 1, current + 1])
  if (current <= 3) [2, 3, 4].forEach((p) => set.add(p))
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((p) => set.add(p))
  const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result: Array<number | string> = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1]! > 1) result.push('...')
    result.push(page)
  })
  return result
})
</script>

<template>
  <nav v-if="lastPage > 1" class="flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
    <button
      class="btn-secondary px-3 py-2"
      :disabled="currentPage <= 1"
      aria-label="Previous page"
      @click="emit('change', currentPage - 1)"
    >
      <BaseIcon name="chevron-left" :size="16" />
    </button>
    <template v-for="(page, index) in pages" :key="`${page}-${index}`">
      <span v-if="page === '...'" class="px-2 text-gray-400">…</span>
      <button
        v-else
        class="min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition"
        :class="page === currentPage ? 'bg-oc-primary text-white' : 'border border-gray-200 bg-white text-gray-700 hover:border-oc-primary/40 hover:text-oc-primary'"
        @click="emit('change', Number(page))"
      >
        {{ page }}
      </button>
    </template>
    <button
      class="btn-secondary px-3 py-2"
      :disabled="currentPage >= lastPage"
      aria-label="Next page"
      @click="emit('change', currentPage + 1)"
    >
      <BaseIcon name="chevron-right" :size="16" />
    </button>
    <span v-if="total" class="ml-2 text-xs text-gray-500">{{ total }} results</span>
  </nav>
</template>
