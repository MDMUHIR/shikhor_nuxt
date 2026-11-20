import { isSecureRequest, laravelFetch } from '../../utils/laravel'

interface LoginBody {
  email?: string
  password?: string
}

interface LoginData {
  name: string
  email: string
  type: string
  accessToken: string
  token_type?: string
}

interface LoginEnvelope {
  status?: boolean
  success?: boolean
  message?: string
  data?: LoginData
  errors?: Record<string, string[]>
}

const COOKIE = 'shikhor_token'
const MAX_AGE = 60 * 60 * 24 * 30

function setAuthCookie(event: Parameters<typeof setCookie>[0], token: string) {
  setCookie(event, COOKIE, token, {
    httpOnly: true,
    secure: isSecureRequest(event),
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE,
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event)
  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Email and password are required.',
      data: { message: 'Email and password are required.', errors: { email: ['Email is required.'] } },
    })
  }

  const result = await laravelFetch<LoginEnvelope>(event, 'login', {
    method: 'POST',
    body: { email: body.email, password: body.password },
  })

  const payload = result.body || {}
  if (result.status >= 400 || payload.status === false || payload.success === false || !payload.data?.accessToken) {
    const message =
      (typeof payload.message === 'string' && payload.message) ||
      (result.status === 422 ? 'Please check your details.' : 'Invalid email or password.')
    throw createError({
      statusCode: result.status === 422 ? 422 : 401,
      statusMessage: message,
      data: { message, errors: payload.errors },
    })
  }

  setAuthCookie(event, payload.data.accessToken)

  return {
    user: {
      name: payload.data.name,
      email: payload.data.email,
      type: payload.data.type,
    },
  }
})
