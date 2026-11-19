import type { H3Event } from 'h3'

export interface LaravelResult<T = unknown> {
  status: number
  ok: boolean
  body: T
  contentType: string | null
}

function baseUrl(event?: H3Event): string {
  const config = useRuntimeConfig(event)
  return String(config.apiUrl || 'http://127.0.0.1:8000').replace(/\/+$/, '')
}

/**
 * Low level server side call to the Laravel API.
 * Adds the Sanctum bearer token from the httpOnly cookie when present.
 */
export async function laravelFetch<T = unknown>(
  event: H3Event,
  path: string,
  options: {
    method?: string
    body?: unknown
    headers?: Record<string, string>
    token?: string | null
  } = {},
): Promise<LaravelResult<T>> {
  const method = options.method || 'GET'
  const headers: Record<string, string> = {
    accept: 'application/json',
    ...(options.headers || {}),
  }

  const token = options.token ?? getCookie(event, 'shikhor_token')
  if (token) headers.authorization = `Bearer ${token}`

  let body: string | undefined
  if (options.body !== undefined && method !== 'GET' && method !== 'HEAD') {
    headers['content-type'] = 'application/json'
    body = JSON.stringify(options.body)
  }

  const url = `${baseUrl(event)}/api/${path.replace(/^\/+/, '')}`
  const response = await fetch(url, { method, headers, body })
  const contentType = response.headers.get('content-type')
  const text = await response.text()
  let parsed: unknown = null
  if (text) {
    try {
      parsed = JSON.parse(text)
    } catch {
      parsed = text
    }
  }

  return {
    status: response.status,
    ok: response.ok,
    body: parsed as T,
    contentType,
  }
}

export function laravelBase(event?: H3Event): string {
  return baseUrl(event)
}

export interface LaravelEnvelope<T = unknown> {
  status?: boolean
  success?: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

export function appError(result: LaravelResult<LaravelEnvelope>) {
  const body = result.body || {}
  const message =
    (typeof body.message === 'string' && body.message) ||
    (result.status === 422 ? 'Please check the submitted values.' : 'Request failed.')
  return createError({
    statusCode: result.status >= 400 ? result.status : 400,
    statusMessage: message,
    data: {
      message,
      errors: (body.errors as Record<string, string[]> | undefined) || undefined,
    },
  })
}
