export default defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, 'path') || ''
  const segments = pathParam.split('/').filter(Boolean)

  // Never act as an open proxy: only allow the known API areas.
  const allowedRoots = new Set([
    'products',
    'categories',
    'banners',
    'delivery-charges',
    'blogs',
    'blog-categories',
    'blog-tags',
    'courses',
    'course-categories',
    'certificates',
    'cart',
    'wishlist',
    'verify-coupon',
    'orders',
    'my',
    'lessons',
    'quizzes',
    'quiz-attempts',
    'admin',
    'user',
    'logout',
    'notifications',
    'lesson-resources',
    'login',
    'register',
  ])

  if (!segments.length || !allowedRoots.has(segments[0]!)) {
    throw createError({ statusCode: 404, statusMessage: 'Not found' })
  }

  const config = useRuntimeConfig(event)
  const base = String(config.apiUrl || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  const query = getQuery(event)
  const search = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) if (item !== undefined) search.append(key, String(item))
    } else if (value !== undefined) {
      search.append(key, String(value))
    }
  }
  const queryString = search.toString()
  const target = `${base}/api/${segments.join('/')}${queryString ? `?${queryString}` : ''}`

  const method = event.method.toUpperCase()
  const outHeaders: Record<string, string> = { accept: 'application/json' }
  const token = getCookie(event, 'shikhor_token')
  if (token) outHeaders.authorization = `Bearer ${token}`

  let body: BodyInit | undefined
  if (method !== 'GET' && method !== 'HEAD') {
    const contentType = getRequestHeader(event, 'content-type') || ''
    if (contentType) outHeaders['content-type'] = contentType

    if (contentType.includes('application/json') || contentType.includes('text/plain')) {
      const raw = await readRawBody(event, 'utf-8')
      body = raw ?? undefined
    } else {
      const stream = getRequestWebStream(event)
      body = stream ?? undefined
    }
  }

  let response: Response
  try {
    response = await fetch(target, {
      method,
      headers: outHeaders,
      body,
      // @ts-expect-error Node fetch supports streaming request bodies with duplex
      duplex: body ? 'half' : undefined,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Upstream API unavailable'
    throw createError({
      statusCode: 502,
      statusMessage: 'Cannot reach the Laravel API',
      data: { message, target },
    })
  }

  const responseHeaders = new Headers()
  response.headers.forEach((value, key) => {
    if (['content-encoding', 'content-length', 'transfer-encoding', 'connection', 'set-cookie'].includes(key)) return
    responseHeaders.set(key, value)
  })

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  })
})
