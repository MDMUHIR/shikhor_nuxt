import type { LiveSessionInfo } from '~/utils/community'

interface SessionsPayload {
  role: 'staff' | 'student'
  live_now: number | null
  sessions: LiveSessionInfo[]
}

/** Shared live-class state for a course (used by the live panel and the schedule list). */
export function useLiveSessions(slug: string) {
  const { apiData } = useApi()

  const sessions = useState<LiveSessionInfo[]>(`live-sessions-${slug}`, () => [])
  const role = useState<'staff' | 'student' | null>(`live-role-${slug}`, () => null)
  const loading = useState<boolean>(`live-loading-${slug}`, () => false)
  const error = useState<string>(`live-error-${slug}`, () => '')

  const live = computed(() => sessions.value.find((s) => s.status === 'live') ?? null)
  const next = computed(() =>
    sessions.value
      .filter((s) => s.status === 'scheduled')
      .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime())[0] ?? null,
  )
  const upcoming = computed(() => sessions.value.filter((s) => s.status === 'scheduled').sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()))
  const past = computed(() => sessions.value.filter((s) => s.status === 'ended' || s.status === 'cancelled'))

  async function load() {
    loading.value = true
    error.value = ''
    try {
      const data = await apiData<SessionsPayload>(`/courses/${slug}/live-sessions`)
      sessions.value = data.sessions
      role.value = data.role
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false
    }
  }

  function patch(session: LiveSessionInfo) {
    const index = sessions.value.findIndex((s) => s.id === session.id)
    if (index >= 0) sessions.value[index] = { ...sessions.value[index], ...session }
  }

  return { sessions, role, loading, error, live, next, upcoming, past, load, patch }
}
