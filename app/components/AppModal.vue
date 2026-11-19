<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    open: boolean
    title?: string
    description?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  { title: '', description: '', size: 'md' },
)

const emit = defineEmits<{ close: [] }>()

const width = computed(() => {
  const map = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-3xl', xl: 'max-w-5xl' }
  return map[props.size]
})

function close() {
  emit('close')
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.open) close()
}

watch(
  () => props.open,
  (open) => {
    if (import.meta.client) {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  },
)

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4">
        <div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" aria-hidden="true" @click="close" />
        <div
          class="relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          :class="width"
          role="dialog"
          aria-modal="true"
          :aria-label="title || 'Dialog'"
        >
          <div class="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4">
            <div>
              <h2 v-if="title" class="text-lg font-bold text-gray-900">{{ title }}</h2>
              <p v-if="description" class="mt-0.5 text-sm text-gray-500">{{ description }}</p>
            </div>
            <button type="button" class="btn-ghost -mr-1" aria-label="Close dialog" @click="close">
              <BaseIcon name="x" :size="20" />
            </button>
          </div>
          <div class="overflow-y-auto px-5 py-5">
            <slot />
          </div>
          <div v-if="$slots.footer" class="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
