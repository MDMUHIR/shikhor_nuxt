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

const tones: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-600',
  gray: 'bg-gray-100 text-gray-600',
}
</script>

<template>
  <div class="card flex items-center gap-2.5 p-3 sm:gap-3 sm:p-4">
    <span class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl min-[400px]:flex" :class="tones[tone]">
      <BaseIcon :name="icon" :size="20" />
    </span>
    <div class="min-w-0">
      <p class="truncate text-xs font-medium text-gray-500">{{ label }}</p>
      <p class="break-words text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">{{ value }}</p>
      <p v-if="hint" class="truncate text-[11px] text-gray-400">{{ hint }}</p>
    </div>
  </div>
</template>
