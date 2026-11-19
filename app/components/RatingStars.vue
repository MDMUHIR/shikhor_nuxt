<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    rating?: number
    count?: number
    size?: number
    showValue?: boolean
  }>(),
  { rating: 0, count: 0, size: 15, showValue: true },
)

const percent = computed(() => Math.max(0, Math.min(100, (Number(props.rating || 0) / 5) * 100)))
</script>

<template>
  <span class="inline-flex items-center gap-1.5" :title="`${Number(rating).toFixed(1)} out of 5`">
    <span class="relative inline-flex">
      <span class="flex gap-0.5 text-gray-300">
        <BaseIcon v-for="n in 5" :key="`bg-${n}`" name="star" filled :size="size" />
      </span>
      <span class="absolute inset-0 flex gap-0.5 overflow-hidden text-amber-400" :style="{ width: `${percent}%` }">
        <BaseIcon v-for="n in 5" :key="`fg-${n}`" name="star" filled :size="size" />
      </span>
    </span>
    <span v-if="showValue" class="text-xs font-semibold text-gray-700">{{ Number(rating || 0).toFixed(1) }}</span>
    <span v-if="count" class="text-xs text-gray-500">({{ count }})</span>
  </span>
</template>
