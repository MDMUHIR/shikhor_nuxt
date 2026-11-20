import type { User } from '~/utils/types'

interface AuthResponse {
  user: User | null
}

export function useAuth() {
  const user = useState<User | null>('shikhor-user', () => null)
  const loaded = useState<boolean>('shikhor-user-loaded', () => false)
  const pending = useState<boolean>('shikhor-user-pending', () => false)
  // Forwards the incoming request cookies during SSR so /api/auth/me can read
  // the httpOnly session cookie instead of returning an empty user.
  const requestFetch = useRequestFetch()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.type === 'admin')

  async function fetchMe(force = false): Promise<User | null> {
    if (loaded.value && !force) return user.value
    if (pending.value) {
      // Wait for an in-flight request to settle.
      await new Promise((resolve) => setTimeout(resolve, 60))
      return user.value
    }
    pending.value = true
    try {
      const response = await requestFetch<AuthResponse>('/api/auth/me')
      user.value = response?.user ?? null
    } catch {
      user.value = null
    } finally {
      loaded.value = true
      pending.value = false
    }
    return user.value
  }

  async function login(email: string, password: string): Promise<User> {
    const response = await $fetch<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    if (!response?.user) throw new Error('Login failed')
    user.value = { ...(response.user as User), id: (response.user as User).id ?? 0 }
    loaded.value = true
    // The login endpoint does not return the id/created_at, so hydrate the
    // full profile from /api/user now that the cookie is set.
    await fetchMe(true)
    try {
      await Promise.allSettled([useCart().refresh(), useWishlist().refresh()])
    } catch {
      /* ignore */
    }
    return user.value as User
  }

  async function register(name: string, email: string, password: string): Promise<User | null> {
    const response = await $fetch<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    })
    if (response?.user) {
      user.value = { ...(response.user as User), id: (response.user as User).id ?? 0 }
      loaded.value = true
      await fetchMe(true)
      try {
        await Promise.allSettled([useCart().refresh(), useWishlist().refresh()])
      } catch {
        /* ignore */
      }
    }
    return user.value
  }

  async function logout(): Promise<void> {
    try {
      await $fetch('/api/auth/logout', { method: 'POST' })
    } finally {
      user.value = null
      loaded.value = true
      useCart().reset()
      useWishlist().reset()
      await navigateTo('/')
    }
  }

  return { user, loaded, pending, isAuthenticated, isAdmin, fetchMe, login, register, logout }
}
