<script setup lang="ts">
defineProps<{
  message?: string
  title?: string
}>()

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-12 text-center">
    <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">
      <BaseIcon name="alert-circle" :size="24" />
    </div>
    <h3 class="text-base font-bold text-gray-900">{{ title || 'Something went wrong' }}</h3>
    <p class="mt-1 max-w-md text-sm text-gray-600">{{ message || 'We could not load this content.' }}</p>
    <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
      <button type="button" class="btn-secondary" @click="emit('retry')">
        <BaseIcon name="refresh" :size="16" />
        Try again
      </button>
      <slot />
    </div>
  </div>
</template>
