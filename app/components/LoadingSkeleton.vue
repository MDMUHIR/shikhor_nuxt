<script setup lang="ts">
withDefaults(defineProps<{ count?: number; type?: 'card' | 'row' }>(), { count: 6, type: 'card' })
</script>

<template>
  <div v-if="type === 'card'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div v-for="i in count" :key="i" class="card animate-pulse overflow-hidden">
      <div class="aspect-video bg-gray-200" />
      <div class="space-y-3 p-5">
        <div class="h-3 w-20 rounded bg-gray-200" />
        <div class="h-4 w-4/5 rounded bg-gray-200" />
        <div class="h-4 w-2/3 rounded bg-gray-200" />
        <div class="h-5 w-24 rounded bg-gray-200" />
      </div>
    </div>
  </div>
  <div v-else class="space-y-3">
    <div v-for="i in count" :key="i" class="card flex animate-pulse items-center gap-4 p-4">
      <div class="h-16 w-16 rounded-xl bg-gray-200" />
      <div class="flex-1 space-y-2">
        <div class="h-4 w-1/3 rounded bg-gray-200" />
        <div class="h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  </div>
</template>
