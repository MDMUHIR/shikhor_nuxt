interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  tone?: 'danger' | 'primary'
}

interface ConfirmState extends Required<Omit<ConfirmOptions, 'tone'>> {
  open: boolean
  tone: 'danger' | 'primary'
}

const state = ref<ConfirmState>({
  open: false,
  title: 'Please confirm',
  message: '',
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  tone: 'danger',
})

let resolver: ((value: boolean) => void) | null = null

/**
 * Promise based confirmation dialog used by the admin console.
 */
export function useConfirm() {
  function ask(options: ConfirmOptions): Promise<boolean> {
    resolver?.(false)
    state.value = {
      open: true,
      title: options.title || 'Please confirm',
      message: options.message,
      confirmLabel: options.confirmLabel || 'Confirm',
      cancelLabel: options.cancelLabel || 'Cancel',
      tone: options.tone || 'danger',
    }
    return new Promise<boolean>((resolve) => {
      resolver = resolve
    })
  }

  function close(result: boolean) {
    state.value = { ...state.value, open: false }
    const resolve = resolver
    resolver = null
    resolve?.(result)
  }

  return { state, ask, close }
}
