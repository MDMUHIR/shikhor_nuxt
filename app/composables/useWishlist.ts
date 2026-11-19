import type { WishlistItem } from '~/utils/types'

export function useWishlist() {
  const items = useState<WishlistItem[]>('shikhor-wishlist', () => [])
  const loaded = useState<boolean>('shikhor-wishlist-loaded', () => false)
  const count = computed(() => items.value.length)

  async function refresh() {
    const { user } = useAuth()
    if (!user.value) {
      reset()
      return items.value
    }
    try {
      const { apiData } = useApi()
      items.value = await apiData<WishlistItem[]>('/wishlist')
      loaded.value = true
    } catch {
      items.value = []
    }
    return items.value
  }

  function has(productId: number, variantId?: number | null) {
    return items.value.some(
      (item) => item.product_id === productId && (item.variant_id ?? null) === (variantId ?? null),
    )
  }

  function reset() {
    items.value = []
    loaded.value = false
  }

  return { items, loaded, count, refresh, has, reset }
}
