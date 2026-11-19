export interface Toast {
  id: number
  title?: string
  message: string
  type: 'success' | 'error' | 'info'
}

let counter = 0

export function useToast() {
  const toasts = useState<Toast[]>('shikhor-toasts', () => [])

  function remove(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  function push(message: string, type: Toast['type'] = 'info', title?: string) {
    const id = ++counter
    toasts.value = [...toasts.value, { id, message, type, title }]
    if (import.meta.client) {
      setTimeout(() => remove(id), 4500)
    }
    return id
  }

  const success = (message: string, title?: string) => push(message, 'success', title)
  const error = (message: string, title?: string) => push(message, 'error', title)
  const info = (message: string, title?: string) => push(message, 'info', title)

  return { toasts, push, remove, success, error, info }
}
