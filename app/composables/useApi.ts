export class ApiError extends Error {
  statusCode: number
  errors?: Record<string, string[]>

  constructor(message: string, statusCode = 500, errors?: Record<string, string[]>) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  query?: Record<string, string | number | boolean | null | undefined>
  headers?: Record<string, string>
}

function toQuery(query?: FetchOptions['query']): string {
  if (!query) return ''
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined || value === '') continue
    params.append(key, String(value))
  }
  const value = params.toString()
  return value ? `?${value}` : ''
}

/**
 * Same-origin API helper. All authenticated traffic goes through the Nitro
 * proxy so the Sanctum token never reaches browser JavaScript.
 */
export function useApi() {
  const requestFetch = useRequestFetch()

  async function apiFetch<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
    const url = `/api/proxy/${path.replace(/^\/+/, '')}${toQuery(options.query)}`
    const request: Record<string, unknown> = {
      method: options.method || 'GET',
      headers: { accept: 'application/json', ...(options.headers || {}) },
    }
    if (options.body !== undefined) request.body = options.body

    try {
      const response = await requestFetch<T>(url, request as never)
      if (response && typeof response === 'object' && 'status' in (response as Record<string, unknown>)) {
        const envelope = response as { status?: boolean; success?: boolean; message?: string; errors?: Record<string, string[]> }
        if (envelope.status === false || envelope.success === false) {
          throw new ApiError(envelope.message || 'Request failed.', 400, envelope.errors)
        }
      }
      return response as T
    } catch (error: unknown) {
      if (error instanceof ApiError) throw error
      const fetchError = error as { data?: { message?: string; errors?: Record<string, string[]> }; statusCode?: number; status?: number; message?: string }
      const data = fetchError?.data
      const statusCode = fetchError?.statusCode || fetchError?.status || 500
      throw new ApiError(
        data?.message || fetchError?.message || 'Something went wrong. Please try again.',
        statusCode,
        data?.errors,
      )
    }
  }

  async function apiData<T = unknown>(path: string, options: FetchOptions = {}): Promise<T> {
    const response = await apiFetch<{ data: T }>(path, options)
    return (response as { data: T }).data
  }

  /** Multipart upload through the same authenticated proxy. */
  async function apiUpload<T = unknown>(path: string, form: FormData): Promise<T> {
    const url = `/api/proxy/${path.replace(/^\/+/, '')}`
    try {
      const response = await requestFetch<T>(url, {
        method: 'POST',
        body: form,
        headers: { accept: 'application/json' },
      } as never)
      if (response && typeof response === 'object' && 'status' in (response as Record<string, unknown>)) {
        const envelope = response as { status?: boolean; success?: boolean; message?: string; errors?: Record<string, string[]> }
        if (envelope.status === false || envelope.success === false) {
          throw new ApiError(envelope.message || 'Upload failed.', 400, envelope.errors)
        }
      }
      return response as T
    } catch (error: unknown) {
      if (error instanceof ApiError) throw error
      const fetchError = error as { data?: { message?: string; errors?: Record<string, string[]> }; statusCode?: number; status?: number; message?: string }
      throw new ApiError(
        fetchError?.data?.message || fetchError?.message || 'Upload failed.',
        fetchError?.statusCode || fetchError?.status || 500,
        fetchError?.data?.errors,
      )
    }
  }

  return { apiFetch, apiData, apiUpload }
}
