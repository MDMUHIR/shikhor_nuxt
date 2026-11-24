<script setup lang="ts">
const { toasts, remove } = useToast()
</script>

<template>
  <div class="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border-2 border-neo-ink p-4 text-neo-ink shadow-[4px_4px_0_0_#1a1a1a]"
        :class="{
          'bg-neo-mint': toast.type === 'success',
          'bg-neo-pink': toast.type === 'error',
          'bg-neo-sky': toast.type === 'info',
        }"
        role="status"
        aria-live="polite"
      >
        <BaseIcon
          :name="toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'alert-circle' : 'info'"
          :size="20"
          class="mt-0.5"
        />
        <div class="min-w-0 flex-1">
          <p v-if="toast.title" class="text-sm font-bold">{{ toast.title }}</p>
          <p class="text-sm" :class="{ 'mt-0.5': toast.title }">{{ toast.message }}</p>
        </div>
        <button type="button" class="rounded p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100" aria-label="Dismiss" @click="remove(toast.id)">
          <BaseIcon name="x" :size="15" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.22s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
