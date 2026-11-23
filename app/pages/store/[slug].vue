<script setup lang="ts">
import type { Product, ProductImage, ProductVariant } from '~/utils/types'

const route = useRoute()
const slug = String(route.params.slug)
const { apiData, apiFetch } = useApi()
const { isAuthenticated } = useAuth()
const cart = useCart()
const wishlist = useWishlist()
const toast = useToast()

const { data: product, pending, error, refresh } = await useAsyncData(`product-${slug}`, () =>
  apiData<Product>(`/products/${slug}`),
)

const selectedVariantId = ref<number | null>(null)
const quantity = ref(1)
const activeImage = ref('')
const adding = ref(false)
const wishlisting = ref(false)
const selectedVariant = computed<ProductVariant | null>(
  () => product.value?.variants.find((variant) => variant.id === selectedVariantId.value) ?? null,
)

const gallery = computed<ProductImage[]>(() => {
  const variantImages = selectedVariant.value?.images ?? []
  if (variantImages.length) return variantImages
  return product.value?.images ?? []
})
const images = computed(() => {
  const list = gallery.value.map((image) => mediaUrl(image.url))
  return list.length ? list : [mediaUrl(null)]
})
const effectivePrice = computed(() => {
  if (selectedVariant.value) return Number(selectedVariant.value.offer_price ?? selectedVariant.value.price)
  if (product.value?.variants.length) return null
  return Number(product.value?.offer_price ?? product.value?.price ?? 0)
})
const displayPrice = computed(() => {
  if (effectivePrice.value !== null) return formatMoney(effectivePrice.value)
  if (product.value?.variants.length) {
    const min = Math.min(...product.value.variants.map((variant) => Number(variant.offer_price ?? variant.price)))
    return `From ${formatMoney(min)}`
  }
  return formatMoney(0)
})
// null stock means "not tracked" (unlimited) on the API; cap the selector at 99 in that case.
const unlimited = computed(() => {
  if (selectedVariant.value) return selectedVariant.value.stock === null || selectedVariant.value.stock === undefined
  if (product.value?.variants.length) return false
  return product.value?.stock === null || product.value?.stock === undefined
})
const stock = computed(() => {
  if (selectedVariant.value) return unlimited.value ? 99 : Number(selectedVariant.value.stock)
  if (product.value?.variants.length) return null
  return unlimited.value ? 99 : Number(product.value?.stock ?? 0)
})
const inStock = computed(() => (stock.value === null ? product.value?.variants.some((variant) => Number(variant.stock) > 0) ?? false : stock.value > 0))
const needsVariant = computed(() => !!product.value?.variants.length && !selectedVariant.value)
const inWishlist = computed(() => (product.value ? wishlist.has(product.value.id, selectedVariantId.value) : false))
const image = computed(() => activeImage.value || images.value[0] || mediaUrl(null))

function attrs(variant: ProductVariant) {
  return (variant.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(' · ')
}

watch(
  () => product.value,
  (value) => {
    if (!value) return
    activeImage.value = images.value[0] || ''
    if (value.variants.length) {
      const preferred = value.variants.find((variant) => Number(variant.stock) > 0) ?? value.variants[0]
      selectedVariantId.value = preferred?.id ?? null
    }
  },
  { immediate: true },
)

/** Always a whole number between 1 and the available stock (the input can be empty or NaN while typing). */
function cleanQuantity(): number {
  const max = stock.value === null ? 99 : Math.max(1, stock.value)
  const raw = Math.floor(Number(quantity.value))
  return Math.min(max, Math.max(1, Number.isFinite(raw) ? raw : 1))
}

function commitQuantity() {
  quantity.value = cleanQuantity()
}

watch(selectedVariantId, () => {
  quantity.value = 1
  activeImage.value = images.value[0] || ''
})

watch(images, (list) => {
  if (!list.includes(activeImage.value)) activeImage.value = list[0] || ''
})

async function addToCart(buyNow = false) {
  if (!product.value) return
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(`/store/${slug}`)}`)
  }
  if (needsVariant.value) {
    toast.info('Please choose an option first.')
    return
  }
  if (!inStock.value) {
    toast.error('This item is out of stock.')
    return
  }
  commitQuantity()
  adding.value = true
  try {
    await apiFetch('/cart/add', {
      method: 'POST',
      body: {
        product_id: product.value.id,
        variant_id: selectedVariantId.value,
        quantity: quantity.value,
        // Buy now checks out exactly this quantity, on its own.
        buy_now: buyNow,
      },
    })
    await cart.refresh()
    if (buyNow) {
      await navigateTo('/checkout')
      return
    }
    toast.success('Added to your cart.')
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    adding.value = false
  }
}

async function toggleWishlist() {
  if (!product.value) return
  if (!isAuthenticated.value) {
    return navigateTo(`/login?next=${encodeURIComponent(`/store/${slug}`)}`)
  }
  wishlisting.value = true
  try {
    if (inWishlist.value) {
      const existing = wishlist.items.value.find(
        (item) => item.product_id === product.value!.id && (item.variant_id ?? null) === selectedVariantId.value,
      )
      if (existing) await apiFetch(`/wishlist/delete/${existing.id}`, { method: 'DELETE' })
      toast.success('Removed from your wishlist.')
    } else {
      await apiFetch('/wishlist/add', {
        method: 'POST',
        body: { product_id: product.value.id, variant_id: selectedVariantId.value },
      })
      toast.success('Saved to your wishlist.')
    }
    await wishlist.refresh()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    wishlisting.value = false
  }
}

function changeQty(delta: number) {
  quantity.value = cleanQuantity()
  quantity.value = Math.min(stock.value === null ? 99 : Math.max(1, stock.value), Math.max(1, quantity.value + delta))
}

useSeoMeta({
  title: () => (product.value ? `${product.value.name} — Shikhor Store` : 'Product — Shikhor Store'),
  description: () => product.value?.short_description || excerpt(product.value?.description, 160) || 'Product details',
  ogImage: () => mediaUrl(product.value?.images?.find((item) => item.is_featured)?.url ?? product.value?.images?.[0]?.url),
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10">
    <div v-if="pending" class="grid gap-8 lg:grid-cols-2">
      <div class="aspect-square animate-pulse rounded-2xl bg-gray-200" />
      <div class="space-y-4">
        <div class="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div class="h-9 w-3/4 animate-pulse rounded bg-gray-200" />
        <div class="h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div class="h-24 w-full animate-pulse rounded bg-gray-200" />
      </div>
    </div>

    <ErrorState v-else-if="error" title="Product not found" :message="error.message" @retry="refresh" />

    <template v-else-if="product">
      <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
        <span class="mx-1.5">/</span>
        <NuxtLink to="/store" class="hover:text-oc-primary">Store</NuxtLink>
        <span class="mx-1.5">/</span>
        <span class="text-gray-700">{{ product.name }}</span>
      </nav>

      <div class="grid gap-8 lg:grid-cols-2">
        <div>
          <div class="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <img :src="image" :alt="product.name" class="aspect-square w-full object-cover" @error="imageFallback" >
          </div>
          <div v-if="images.length > 1" class="mt-3 flex gap-2 overflow-x-auto pb-1">
            <button
              v-for="(item, index) in images"
              :key="index"
              type="button"
              class="h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition"
              :class="activeImage === item ? 'border-oc-primary' : 'border-transparent hover:border-gray-300'"
              @click="activeImage = item"
            >
              <img :src="item" alt="" class="h-full w-full object-cover" @error="imageFallback" >
            </button>
          </div>
        </div>

        <div>
          <p v-if="product.category" class="text-xs font-bold uppercase tracking-widest text-oc-primary">{{ product.category.name }}</p>
          <h1 class="mt-1 text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">{{ product.name }}</h1>
          <p v-if="product.short_description" class="mt-2 text-sm text-gray-600">{{ product.short_description }}</p>

          <div class="mt-4 flex items-baseline gap-2">
            <span class="text-3xl font-extrabold text-oc-primary">{{ displayPrice }}</span>
            <span v-if="selectedVariant?.offer_price && selectedVariant.offer_price < selectedVariant.price" class="text-sm text-gray-400 line-through">
              {{ formatMoney(selectedVariant.price) }}
            </span>
          </div>
          <p class="mt-1 text-xs" :class="inStock ? 'text-emerald-600' : 'text-rose-600'">
            {{ inStock ? (stock === null ? 'Options available' : unlimited ? 'In stock' : `${stock} in stock`) : 'Out of stock' }}
          </p>

          <div v-if="product.variants.length" class="mt-5">
            <p class="field-label">Choose an option <span class="text-rose-500">*</span></p>
            <div class="grid gap-2 sm:grid-cols-2">
              <button
                v-for="variant in product.variants"
                :key="variant.id"
                type="button"
                class="rounded-xl border p-3 text-left transition"
                :class="selectedVariantId === variant.id ? 'border-oc-primary bg-brand-light ring-1 ring-oc-primary/30' : 'border-gray-200 bg-white hover:border-gray-300'"
                :disabled="Number(variant.stock) <= 0"
                @click="selectedVariantId = variant.id"
              >
                <span class="block text-sm font-semibold text-gray-800">{{ attrs(variant) || variant.sku }}</span>
                <span class="mt-0.5 flex items-center justify-between text-xs text-gray-500">
                  <span>{{ formatMoney(variant.offer_price ?? variant.price) }}</span>
                  <span :class="Number(variant.stock) > 0 ? 'text-emerald-600' : 'text-rose-500'">
                    {{ Number(variant.stock) > 0 ? `${variant.stock} left` : 'Sold out' }}
                  </span>
                </span>
              </button>
            </div>
          </div>

          <div class="mt-5 flex flex-wrap items-center gap-3">
            <div class="flex items-center rounded-xl border border-gray-200">
              <button type="button" class="px-3 py-2.5 text-gray-500 transition hover:text-oc-primary" aria-label="Decrease quantity" @click="changeQty(-1)">
                <BaseIcon name="minus" :size="16" />
              </button>
              <input v-model.number="quantity" type="number" inputmode="numeric" min="1" :max="stock ?? 99" class="w-14 border-0 bg-transparent text-center text-sm font-semibold focus:outline-none" aria-label="Quantity" @blur="commitQuantity" @keyup.enter="commitQuantity">
              <button type="button" class="px-3 py-2.5 text-gray-500 transition hover:text-oc-primary" aria-label="Increase quantity" @click="changeQty(1)">
                <BaseIcon name="plus" :size="16" />
              </button>
            </div>
            <button type="button" class="btn-primary flex-1 sm:flex-none" :disabled="adding || !inStock" @click="addToCart(false)">
              <BaseIcon name="cart" :size="16" /> {{ adding ? 'Adding…' : 'Add to cart' }}
            </button>
            <button type="button" class="btn-secondary" :disabled="adding || !inStock" @click="addToCart(true)">Buy now</button>
            <button
              type="button"
              class="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:border-rose-300"
              :class="inWishlist ? 'text-rose-500' : 'text-gray-400'"
              :aria-label="inWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
              :disabled="wishlisting"
              @click="toggleWishlist"
            >
              <BaseIcon name="heart" :size="18" :filled="inWishlist" />
            </button>
          </div>
          <p v-if="needsVariant" class="mt-2 text-xs text-amber-600">Select an option to continue.</p>

          <div class="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4 text-xs text-gray-600">
            <p class="flex items-center gap-2"><BaseIcon name="truck" :size="15" class="text-oc-primary" /> Delivery charge by district</p>
            <p class="flex items-center gap-2"><BaseIcon name="shield" :size="15" class="text-oc-primary" /> Manual payment confirmation</p>
            <p class="flex items-center gap-2"><BaseIcon name="refresh" :size="15" class="text-oc-primary" /> Stock checked at checkout</p>
            <p class="flex items-center gap-2"><BaseIcon name="phone" :size="15" class="text-oc-primary" /> Support 7 days a week</p>
          </div>

          <div v-if="product.description" class="mt-6">
            <h2 class="text-base font-bold text-gray-900">Product details</h2>
            <div class="prose-content mt-2" v-html="sanitizeHtml(product.description)" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
