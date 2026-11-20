import { laravelFetch } from '../../utils/laravel'

interface LaravelUser {
  id: number
  name: string
  email: string
  type: string
  avatar?: string | null
  created_at?: string
  google_id?: string | null
}

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'shikhor_token')
  if (!token) {
    return { user: null }
  }

  const result = await laravelFetch<LaravelUser>(event, 'user', { token })
  if (result.status >= 400 || !result.body || typeof result.body !== 'object') {
    deleteCookie(event, 'shikhor_token', { path: '/' })
    return { user: null }
  }

  return {
    user: {
      id: result.body.id,
      name: result.body.name,
      email: result.body.email,
      type: result.body.type,
      avatar: result.body.avatar ?? null,
      created_at: result.body.created_at ?? null,
    },
  }
})
