<script setup lang="ts">
const { state, close } = useConfirm()
</script>

<template>
  <AppModal :open="state.open" size="sm" @close="close(false)">
    <div class="flex items-start gap-3">
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        :class="state.tone === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-brand-light text-oc-primary'"
      >
        <BaseIcon :name="state.tone === 'danger' ? 'alert-circle' : 'info'" :size="20" />
      </span>
      <div>
        <h2 class="text-base font-bold text-gray-900">{{ state.title }}</h2>
        <p class="mt-1 text-sm leading-relaxed text-gray-600">{{ state.message }}</p>
      </div>
    </div>
    <template #footer>
      <button type="button" class="btn-secondary" @click="close(false)">{{ state.cancelLabel }}</button>
      <button
        type="button"
        :class="state.tone === 'danger' ? 'btn-danger' : 'btn-primary'"
        @click="close(true)"
      >
        {{ state.confirmLabel }}
      </button>
    </template>
  </AppModal>
</template>
