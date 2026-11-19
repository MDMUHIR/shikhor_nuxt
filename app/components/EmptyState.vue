<script setup lang="ts">
withDefaults(
  defineProps<{
    icon?: string
    title?: string
    message?: string
    actionLabel?: string
    actionTo?: string
  }>(),
  {
    icon: 'info',
    title: 'Nothing here yet',
    message: 'There is no content to show right now.',
  },
)

const emit = defineEmits<{ action: [] }>()
</script>

<template>
  <div class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/70 px-6 py-14 text-center">
    <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">
      <BaseIcon :name="icon" :size="26" />
    </div>
    <h3 class="text-lg font-bold text-gray-800">{{ title }}</h3>
    <p class="mt-1 max-w-md text-sm text-gray-500">{{ message }}</p>
    <NuxtLink v-if="actionTo" :to="actionTo" class="btn-primary mt-6">{{ actionLabel || 'Continue' }}</NuxtLink>
    <button v-else-if="actionLabel" type="button" class="btn-primary mt-6" @click="emit('action')">
      {{ actionLabel }}
    </button>
  </div>
</template>
