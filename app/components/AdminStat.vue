<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string
    value: string | number
    icon?: string
    hint?: string
    tone?: 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'gray'
  }>(),
  { icon: 'chart', tone: 'blue' },
)

// each tone is a pastel card with a white icon "sticker"
const tones: Record<string, string> = {
  blue: 'neo-sky',
  emerald: 'neo-mint',
  amber: 'neo-sun',
  violet: 'neo-lavender',
  rose: 'neo-pink',
  gray: 'neo-cream',
}
</script>

<template>
  <div class="card flex items-center gap-2.5 p-3 sm:gap-3 sm:p-4" :class="tones[tone]">
    <span class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-neo-ink bg-white text-neo-ink min-[400px]:flex">
      <BaseIcon :name="icon" :size="20" />
    </span>
    <div class="min-w-0">
      <p class="truncate text-xs font-semibold text-gray-700">{{ label }}</p>
      <p class="break-words text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">{{ value }}</p>
      <p v-if="hint" class="truncate text-[11px] text-gray-600">{{ hint }}</p>
    </div>
  </div>
</template>
