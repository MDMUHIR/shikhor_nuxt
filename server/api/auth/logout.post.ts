import { laravelFetch } from '../../utils/laravel'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'shikhor_token')
  if (token) {
    try {
      await laravelFetch(event, 'logout', { token })
    } catch {
      // Ignore upstream failures while clearing local session.
    }
  }
  deleteCookie(event, 'shikhor_token', { path: '/' })
  return { ok: true }
})
