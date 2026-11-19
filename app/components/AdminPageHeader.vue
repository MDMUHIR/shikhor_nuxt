<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    icon?: string
  }>(),
  { icon: 'dashboard' },
)
</script>

<template>
  <div class="mb-6 flex flex-wrap items-start justify-between gap-4">
    <div class="flex items-start gap-3">
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-oc-primary">
        <BaseIcon :name="icon" :size="22" />
      </span>
      <div>
        <h1 class="text-xl font-extrabold text-gray-900 md:text-2xl">{{ title }}</h1>
        <p v-if="subtitle" class="mt-0.5 max-w-2xl text-sm text-gray-500">{{ subtitle }}</p>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <slot />
    </div>
  </div>
</template>
