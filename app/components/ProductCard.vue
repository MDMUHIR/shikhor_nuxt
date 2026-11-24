<script setup lang="ts">
import type { Product } from '~/utils/types'

const props = defineProps<{ product: Product }>()

const image = computed(() => productImage(props.product))
const effective = computed(() => {
  if (props.product.variants?.length) {
    const prices = props.product.variants.map((variant) => Number(variant.offer_price ?? variant.price))
    return Math.min(...prices)
  }
  return Number(props.product.offer_price ?? props.product.price)
})
const original = computed(() => {
  if (props.product.variants?.length) return 0
  return props.product.offer_price && props.product.offer_price < props.product.price ? props.product.price : 0
})
const off = computed(() => (original.value ? discountPercent(props.product.price, props.product.offer_price) : 0))
const inStock = computed(() => {
  if (props.product.variants?.length) return props.product.variants.some((variant) => Number(variant.stock) > 0)
  return Number(props.product.stock) > 0
})
</script>

<template>
  <NuxtLink
    :to="`/store/${product.slug}`"
    class="card group flex h-full flex-col overflow-hidden"
  >
    <div class="relative aspect-square overflow-hidden border-b-2 border-neo-ink bg-gray-50">
      <img
        :src="image"
        :alt="product.name"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        @error="imageFallback"
      >
      <span
        v-if="off"
        class="absolute left-3 top-3 rounded-full border-2 border-neo-ink bg-neo-pink px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink"
      >-{{ off }}%</span>
      <span
        v-if="!inStock"
        class="absolute right-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-semibold text-white"
      >Out of stock</span>
      <span
        v-else-if="product.variants?.length"
        class="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700"
      >{{ product.variants.length }} options</span>
    </div>

    <div class="flex flex-1 flex-col p-4">
      <p v-if="product.category" class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-oc-primary">
        {{ product.category.name }}
      </p>
      <h3 class="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary">
        {{ product.name }}
      </h3>
      <p v-if="product.short_description" class="mt-1.5 line-clamp-2 text-xs text-gray-500">
        {{ product.short_description }}
      </p>
      <div class="mt-auto flex items-baseline gap-1.5 pt-3">
        <span class="text-lg font-extrabold text-oc-primary">{{ formatMoney(effective) }}</span>
        <span v-if="original" class="text-xs text-gray-400 line-through">{{ formatMoney(original) }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
