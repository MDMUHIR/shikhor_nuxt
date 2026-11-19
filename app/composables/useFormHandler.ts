import { ApiError } from '~/composables/useApi'

/**
 * Small wrapper shared by admin forms: tracks busy/validation state and
 * surfaces the backend message through a toast.
 */
export function useFormHandler() {
  const busy = ref(false)
  const errors = ref<Record<string, string[]>>({})
  const toast = useToast()

  async function run<T>(task: () => Promise<T>, successMessage?: string): Promise<T | undefined> {
    busy.value = true
    errors.value = {}
    try {
      const result = await task()
      if (successMessage) toast.success(successMessage)
      return result
    } catch (error: unknown) {
      const apiError = error as ApiError
      errors.value = apiError?.errors || {}
      toast.error(apiError?.message || 'Something went wrong. Please try again.')
      return undefined
    } finally {
      busy.value = false
    }
  }

  function fieldError(name: string): string | undefined {
    return errors.value[name]?.[0]
  }

  function resetErrors() {
    errors.value = {}
  }

  return { busy, errors, run, fieldError, resetErrors }
}
