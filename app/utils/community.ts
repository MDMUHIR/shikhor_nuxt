export interface CommunityUser {
  id: number
  name: string
  avatar: string | null
  badge: 'admin' | 'instructor' | null
}

export interface CommunityComment {
  id: number
  parent_id: number | null
  body: string
  is_pinned: boolean
  likes_count: number
  liked_by_me: boolean
  author: CommunityUser | null
  created_at: string
  replies?: CommunityComment[]
}

export interface CommunityPost {
  id: number
  title: string | null
  body: string
  link_url: string | null
  link_label: string | null
  link_provider: string | null
  is_pinned: boolean
  comments_locked: boolean
  live_session_id: number | null
  author: CommunityUser | null
  likes_count: number
  comments_count: number
  liked_by_me: boolean
  created_at: string
}

export interface LiveSessionInfo {
  id: number
  course_id: number
  title: string
  description: string | null
  provider: string
  status: 'scheduled' | 'live' | 'ended' | 'cancelled'
  scheduled_at: string
  duration_minutes: number
  started_at: string | null
  ended_at: string | null
  chat_enabled: boolean
  chat_locked: boolean
  join_url: string | null
  embed_url: string | null
  recording_url: string | null
}

export interface LinkSegment {
  text: string
  url?: string
}

/** Split plain text into text / https-link segments so it can be rendered safely without v-html. */
export function linkSegments(text: string): LinkSegment[] {
  const out: LinkSegment[] = []
  const pattern = /https:\/\/[^\s<>"']+/g
  let last = 0
  for (const match of text.matchAll(pattern)) {
    const index = match.index ?? 0
    if (index > last) out.push({ text: text.slice(last, index) })
    // keep trailing punctuation outside the link
    const raw = match[0]
    const clean = raw.replace(/[.,;:!?)\]]+$/, '')
    out.push({ text: clean, url: clean })
    if (clean.length < raw.length) out.push({ text: raw.slice(clean.length) })
    last = index + raw.length
  }
  if (last < text.length) out.push({ text: text.slice(last) })
  return out
}

export function timeAgo(value?: string | null): string {
  if (!value) return ''
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000))
  if (seconds < 45) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d`
  return new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export const PROVIDERS: Record<string, { label: string; cls: string; short: string }> = {
  zoom: { label: 'Zoom', cls: 'bg-blue-100 text-blue-700', short: 'Z' },
  meet: { label: 'Google Meet', cls: 'bg-emerald-100 text-emerald-700', short: 'M' },
  youtube: { label: 'YouTube', cls: 'bg-red-100 text-red-600', short: 'YT' },
  facebook: { label: 'Facebook', cls: 'bg-indigo-100 text-indigo-700', short: 'f' },
  teams: { label: 'Microsoft Teams', cls: 'bg-violet-100 text-violet-700', short: 'T' },
  telegram: { label: 'Telegram', cls: 'bg-sky-100 text-sky-700', short: 'TG' },
  whatsapp: { label: 'WhatsApp', cls: 'bg-green-100 text-green-700', short: 'WA' },
  discord: { label: 'Discord', cls: 'bg-purple-100 text-purple-700', short: 'D' },
  other: { label: 'Link', cls: 'bg-gray-100 text-gray-600', short: '↗' },
  link: { label: 'Link', cls: 'bg-gray-100 text-gray-600', short: '↗' },
}

export function providerOf(key?: string | null) {
  return PROVIDERS[key ?? 'link'] ?? PROVIDERS.link!
}

export function hostOf(url?: string | null): string {
  try {
    return new URL(url ?? '').hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

/** "Add to Google Calendar" link for a class. */
export function calendarLink(session: Pick<LiveSessionInfo, 'title' | 'description' | 'scheduled_at' | 'duration_minutes' | 'join_url'>): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const start = new Date(session.scheduled_at)
  const end = new Date(start.getTime() + session.duration_minutes * 60_000)
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: session.title,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${session.description ?? ''}\n${session.join_url ?? ''}`.trim(),
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function countdown(target: string, now: number): string {
  const diff = Math.floor((new Date(target).getTime() - now) / 1000)
  if (diff <= 0) return 'Starting now'
  const d = Math.floor(diff / 86400)
  const h = Math.floor((diff % 86400) / 3600)
  const m = Math.floor((diff % 3600) / 60)
  const s = diff % 60
  if (d > 0) return `${d}d ${h}h ${m}m`
  if (h > 0) return `${h}h ${m}m ${String(s).padStart(2, '0')}s`
  return `${m}m ${String(s).padStart(2, '0')}s`
}
