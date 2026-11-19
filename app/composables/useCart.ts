import type { CartItem, CourseCartResponse } from '~/utils/types'

interface CartCounts {
  products: number
  courses: number
}

export function useCart() {
  const counts = useState<CartCounts>('shikhor-cart-counts', () => ({ products: 0, courses: 0 }))
  const refreshing = useState<boolean>('shikhor-cart-refreshing', () => false)

  const totalCount = computed(() => counts.value.products + counts.value.courses)

  async function refresh(): Promise<CartCounts> {
    const { user } = useAuth()
    if (!user.value) {
      reset()
      return counts.value
    }
    refreshing.value = true
    try {
      const { apiData } = useApi()
      const [products, courses] = await Promise.all([
        apiData<CartItem[]>('/cart').catch(() => []),
        apiData<CourseCartResponse>('/cart/courses').catch(() => null),
      ])
      counts.value = {
        products: Array.isArray(products) ? products.length : 0,
        courses: courses?.count ?? 0,
      }
    } finally {
      refreshing.value = false
    }
    return counts.value
  }

  function reset() {
    counts.value = { products: 0, courses: 0 }
  }

  return { counts, totalCount, refreshing, refresh, reset }
}
