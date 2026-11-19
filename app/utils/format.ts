export function formatMoney(value: number | string | null | undefined, currency = 'BDT'): string {
  const amount = Number(value ?? 0)
  if (!Number.isFinite(amount)) return '৳0'
  try {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency,
      maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
    }).format(amount)
  } catch {
    return `৳${amount.toLocaleString('en-BD')}`
  }
}

export function formatNumber(value: number | null | undefined): string {
  return Number(value ?? 0).toLocaleString('en-BD')
}

export function formatDate(value?: string | null, withTime = false): string {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}

export function formatDuration(seconds?: number | null): string {
  const total = Number(seconds ?? 0)
  if (!total) return '—'
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = Math.floor(total % 60)
  if (h) return `${h}h ${m}m`
  if (m) return `${m}m ${s}s`
  return `${s}s`
}

export function initials(name?: string | null): string {
  if (!name) return '?'
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function discountPercent(price: number, offerPrice?: number | null): number {
  if (!offerPrice || offerPrice >= price) return 0
  return Math.round(((price - offerPrice) / price) * 100)
}

export function statusLabel(status?: string | null): string {
  const map: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
    refunded: 'Refunded',
    paid: 'Paid',
    unpaid: 'Unpaid',
    failed: 'Failed',
    active: 'Active',
    expired: 'Expired',
    revoked: 'Revoked',
    issued: 'Issued',
    draft: 'Draft',
    published: 'Published',
    archived: 'Archived',
    approved: 'Approved',
    rejected: 'Rejected',
  }
  return map[String(status)] ?? (status ? String(status) : '—')
}

export function statusClasses(status?: string | null): string {
  const map: Record<string, string> = {
    completed: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    delivered: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    paid: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    active: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    issued: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    approved: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    published: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    confirmed: 'bg-blue-50 text-blue-700 ring-blue-200',
    processing: 'bg-blue-50 text-blue-700 ring-blue-200',
    shipped: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
    pending: 'bg-amber-50 text-amber-700 ring-amber-200',
    unpaid: 'bg-amber-50 text-amber-700 ring-amber-200',
    draft: 'bg-gray-50 text-gray-700 ring-gray-200',
    expired: 'bg-amber-50 text-amber-700 ring-amber-200',
    rejected: 'bg-rose-50 text-rose-700 ring-rose-200',
    cancelled: 'bg-rose-50 text-rose-700 ring-rose-200',
    refunded: 'bg-rose-50 text-rose-700 ring-rose-200',
    returned: 'bg-rose-50 text-rose-700 ring-rose-200',
    revoked: 'bg-rose-50 text-rose-700 ring-rose-200',
    failed: 'bg-rose-50 text-rose-700 ring-rose-200',
    archived: 'bg-gray-50 text-gray-700 ring-gray-200',
  }
  return map[String(status)] ?? 'bg-gray-50 text-gray-700 ring-gray-200'
}

export function excerpt(html?: string | null, length = 160): string {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > length ? `${text.slice(0, length).trim()}…` : text
}

/**
 * Lightweight HTML sanitiser for lesson/blog content coming from the API.
 * Removes script/style/iframe tags and inline event handlers. Content is
 * authored by trusted admins, but we still never execute arbitrary scripts.
 */
export function sanitizeHtml(html?: string | null): string {
  if (!html) return ''
  return String(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, '')
    .replace(/\son\w+\s*=\s*'[^']*'/gi, '')
    .replace(/javascript:/gi, '')
}

export function ymd(value?: Date | string | null): string {
  if (!value) return ''
  const date = typeof value === 'string' ? new Date(value) : value
  return date.toISOString().slice(0, 10)
}
