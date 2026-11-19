<script setup lang="ts">
defineProps<{ status?: string | null }>()
</script>

<template>
  <span class="badge" :class="statusClasses(status)">{{ statusLabel(status) }}</span>
</template>
