import { laravelFetch } from '../../utils/laravel'

interface RegisterBody {
  name?: string
  email?: string
  password?: string
}

interface RegisterData {
  accessToken?: string
}

interface Envelope<T> {
  status?: boolean
  success?: boolean
  message?: string
  data?: T
  errors?: Record<string, string[]>
}

const COOKIE = 'shikhor_token'
const MAX_AGE = 60 * 60 * 24 * 30

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event)
  if (!body?.name || !body?.email || !body?.password) {
    const errors: Record<string, string[]> = {}
    if (!body?.name) errors.name = ['Name is required.']
    if (!body?.email) errors.email = ['Email is required.']
    if (!body?.password) errors.password = ['Password is required.']
    throw createError({
      statusCode: 422,
      statusMessage: 'Please complete all required fields.',
      data: { message: 'Please complete all required fields.', errors },
    })
  }

  const result = await laravelFetch<Envelope<RegisterData>>(event, 'register', {
    method: 'POST',
    body: { name: body.name, email: body.email, password: body.password },
  })

  const payload = result.body || {}
  let token = payload.data?.accessToken

  if (result.status >= 400 || payload.status === false || payload.success === false) {
    const message =
      (typeof payload.message === 'string' && payload.message) ||
      (result.status === 422 ? 'Please check your details.' : 'Registration failed.')
    throw createError({
      statusCode: result.status === 422 ? 422 : 400,
      statusMessage: message,
      data: { message, errors: payload.errors },
    })
  }

  // Laravel's register endpoint only returns a token. Sign in to get the
  // user shape (name/email/type) in a single round trip.
  if (!token) {
    const login = await laravelFetch<Envelope<{ accessToken: string; name: string; email: string; type: 'admin' | 'customer' }>>(
      event,
      'login',
      { method: 'POST', body: { email: body.email, password: body.password } },
    )
    token = login.body?.data?.accessToken
    if (!token) {
      throw createError({
        statusCode: 502,
        statusMessage: 'Account created, but automatic sign in failed. Please log in.',
        data: { message: 'Account created, but automatic sign in failed. Please log in.' },
      })
    }
    setCookie(event, COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: MAX_AGE,
    })
    return {
      user: {
        name: login.body?.data?.name,
        email: login.body?.data?.email,
        type: login.body?.data?.type,
      },
    }
  }

  setCookie(event, COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  })

  const me = await laravelFetch<{ id: number; name: string; email: string; type: 'admin' | 'customer' }>(
    event,
    'user',
    { token },
  )

  return {
    user: me.body
      ? { id: me.body.id, name: me.body.name, email: me.body.email, type: me.body.type }
      : { name: body.name, email: body.email, type: 'customer' },
  }
})
