const PLACEHOLDER = '/images/placeholder.svg'

export function mediaUrl(path?: string | null): string {
  if (!path) return PLACEHOLDER
  const value = String(path).trim()
  if (!value) return PLACEHOLDER
  if (/^(https?:)?\/\//i.test(value) || value.startsWith('data:')) return value
  const config = useRuntimeConfig()
  const base = String(config.public.mediaUrl || '').replace(/\/+$/, '')
  return `${base}/${value.replace(/^\/+/, '')}`
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
