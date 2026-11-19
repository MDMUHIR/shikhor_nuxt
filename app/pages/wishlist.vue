<script setup lang="ts">
import type { WishlistItem } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const { apiData, apiFetch } = useApi()
const wishlist = useWishlist()
const cart = useCart()
const toast = useToast()

const { data: items, pending, error, refresh } = await useAsyncData('wishlist-page', async () => {
  const list = await apiData<WishlistItem[]>('/wishlist')
  return list ?? []
})

const busy = ref<number | null>(null)

function attributes(item: WishlistItem) {
  return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(' · ')
}

function price(item: WishlistItem) {
  return Number(item.effective_price ?? item.variant?.offer_price ?? item.variant?.price ?? item.product?.offer_price ?? item.product?.price ?? 0)
}

function stock(item: WishlistItem) {
  return Number(item.effective_stock ?? item.variant?.stock ?? item.product?.stock ?? 0)
}

async function remove(item: WishlistItem) {
  busy.value = item.id
  try {
    await apiFetch(`/wishlist/delete/${item.id}`, { method: 'DELETE' })
    toast.success('Removed from your wishlist.')
    await Promise.all([refresh(), wishlist.refresh()])
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

async function addToCart(item: WishlistItem) {
  busy.value = item.id
  try {
    await apiFetch('/cart/add', {
      method: 'POST',
      body: {
        product_id: item.product_id,
        variant_id: item.variant_id,
        quantity: 1,
      },
    })
    await cart.refresh()
    toast.success('Added to your cart.')
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

useSeoMeta({ title: 'Wishlist — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Wishlist</span>
    </nav>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Your wishlist</h1>
        <p class="mt-1 text-sm text-gray-500">Saved products you want to revisit later.</p>
      </div>
      <NuxtLink to="/store" class="btn-secondary hidden sm:inline-flex">Visit store</NuxtLink>
    </div>

    <div v-if="pending" class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse overflow-hidden">
        <div class="aspect-[4/3] bg-gray-200" />
        <div class="space-y-2 p-4">
          <div class="h-4 w-4/5 rounded bg-gray-200" />
          <div class="h-5 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not load your wishlist" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!items?.length"
      class="mt-6"
      icon="heart"
      title="Your wishlist is empty"
      message="Tap the heart on any product to save it here for later."
      action-label="Browse the store"
      action-to="/store"
    />

    <div v-else class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="item in items" :key="item.id" class="card flex flex-col overflow-hidden" :class="{ 'opacity-60': busy === item.id }">
        <NuxtLink :to="`/store/${item.product?.slug}`" class="block aspect-[4/3] bg-gray-50">
          <img :src="productImage(item.product, item.variant)" :alt="item.product?.name || 'Product'" class="h-full w-full object-cover" @error="imageFallback" >
        </NuxtLink>
        <div class="flex flex-1 flex-col p-4">
          <NuxtLink :to="`/store/${item.product?.slug}`" class="line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary">
            {{ item.product?.name }}
          </NuxtLink>
          <p v-if="attributes(item)" class="mt-0.5 text-xs text-gray-500">{{ attributes(item) }}</p>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-lg font-extrabold text-oc-primary">{{ formatMoney(price(item)) }}</span>
            <span v-if="item.variant?.offer_price && item.variant.offer_price < item.variant.price" class="text-xs text-gray-400 line-through">{{ formatMoney(item.variant.price) }}</span>
          </div>
          <p class="mt-1 text-xs" :class="stock(item) > 0 ? 'text-emerald-600' : 'text-rose-600'">
            {{ stock(item) > 0 ? `${stock(item)} in stock` : 'Out of stock' }}
          </p>
          <div class="mt-auto flex gap-2 pt-4">
            <button type="button" class="btn-primary flex-1" :disabled="busy === item.id || stock(item) <= 0" @click="addToCart(item)">
              <BaseIcon name="cart" :size="15" /> Add to cart
            </button>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-rose-300 hover:text-rose-500"
              :disabled="busy === item.id"
              aria-label="Remove from wishlist"
              @click="remove(item)"
            >
              <BaseIcon name="trash" :size="16" />
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
