const PLACEHOLDER = '/images/placeholder.svg'

let mediaBase = ''

/** Captured once per request/app by the media-config plugin (see app/plugins/media-config.ts). */
export function configureMediaBase(base?: string | null): void {
  mediaBase = String(base || '').replace(/\/+$/, '')
}

export function mediaUrl(path?: string | null): string {
  if (!path) return PLACEHOLDER
  const value = String(path).trim()
  if (!value) return PLACEHOLDER
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value
  return `${mediaBase}/${value.replace(/^\/+/, '')}`
}

export function imageFallback(event: Event) {
  const target = event.target as HTMLImageElement | null
  if (target && target.src && !target.src.endsWith(PLACEHOLDER)) {
    target.src = PLACEHOLDER
  }
}

export function productImage(product: { images?: Array<{ url: string; is_featured?: boolean }> }, variant?: { images?: Array<{ url: string }> } | null): string {
  const variantImage = variant?.images?.find(Boolean)?.url
  if (variantImage) return mediaUrl(variantImage)
  const featured = product.images?.find((image) => image.is_featured) ?? product.images?.[0]
  return mediaUrl(featured?.url)
}
