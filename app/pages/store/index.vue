<script setup lang="ts">
import type { Category, Product } from '~/utils/types'

const { apiData } = useApi()

const { data: products, pending, error, refresh } = await useAsyncData('store-products', () =>
  apiData<Product[]>('/products'),
)
const { data: categories } = await useAsyncData('store-categories', () =>
  apiData<Category[]>('/categories').catch(() => [] as Category[]),
)

const search = ref('')
const category = ref('')
const sort = ref('newest')
const inStockOnly = ref(false)
const page = ref(1)
const perPage = 12

const filtered = computed(() => {
  let list = products.value ?? []
  const term = search.value.trim().toLowerCase()
  if (term) {
    list = list.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        (product.short_description || '').toLowerCase().includes(term) ||
        (product.category?.name || '').toLowerCase().includes(term),
    )
  }
  if (category.value) list = list.filter((product) => String(product.category_id) === category.value)
  if (inStockOnly.value) {
    list = list.filter((product) =>
      product.variants?.length
        ? product.variants.some((variant) => Number(variant.stock) > 0)
        : Number(product.stock) > 0,
    )
  }
  const priceOf = (product: Product) =>
    product.variants?.length
      ? Math.min(...product.variants.map((variant) => Number(variant.offer_price ?? variant.price)))
      : Number(product.offer_price ?? product.price)
  if (sort.value === 'price_asc') list = [...list].sort((a, b) => priceOf(a) - priceOf(b))
  else if (sort.value === 'price_desc') list = [...list].sort((a, b) => priceOf(b) - priceOf(a))
  else if (sort.value === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name))
  return list
})

const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([search, category, sort, inStockOnly], () => {
  page.value = 1
})

function clearFilters() {
  search.value = ''
  category.value = ''
  sort.value = 'newest'
  inStockOnly.value = false
  page.value = 1
}

useSeoMeta({
  title: 'Store — Shikhor Academy',
  description: 'Learning essentials, devices and study accessories from the Shikhor Academy store.',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Store</span>
    </nav>

    <div class="rounded-2xl bg-gradient-to-r from-slate-900 to-oc-primary p-6 text-white md:p-8">
      <h1 class="text-2xl font-extrabold md:text-3xl">Shikhor Store</h1>
      <p class="mt-2 max-w-2xl text-sm text-white/85">
        Hand-picked study tools and accessories. Pay cash on delivery, by bank transfer or manual bKash.
      </p>
    </div>

    <div class="card mt-5 grid gap-3 p-4 md:grid-cols-12">
      <div class="relative md:col-span-5">
        <BaseIcon name="search" :size="17" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input v-model="search" type="search" class="field-input pl-9" placeholder="Search products…" aria-label="Search products">
      </div>
      <div class="md:col-span-3">
        <select v-model="category" class="field-input" aria-label="Category">
          <option value="">All categories</option>
          <option v-for="item in categories" :key="item.id" :value="String(item.id)">{{ item.name }}</option>
        </select>
      </div>
      <div class="md:col-span-2">
        <select v-model="sort" class="field-input" aria-label="Sort by">
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
      <label class="flex items-center gap-2 text-sm text-gray-600 md:col-span-2">
        <input v-model="inStockOnly" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
        In stock only
      </label>
    </div>

    <div class="mt-6 flex items-center justify-between gap-3">
      <p class="text-sm text-gray-600">
        <span v-if="!pending">{{ formatNumber(filtered.length) }} product{{ filtered.length === 1 ? '' : 's' }}</span>
        <span v-else>Loading products…</span>
      </p>
      <button v-if="search || category || inStockOnly || sort !== 'newest'" type="button" class="text-xs font-semibold text-rose-600 hover:underline" @click="clearFilters">
        Clear filters
      </button>
    </div>

    <div v-if="pending" class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div v-for="i in 8" :key="i" class="card animate-pulse overflow-hidden">
        <div class="aspect-square bg-gray-200" />
        <div class="space-y-2 p-4">
          <div class="h-3 w-1/3 rounded bg-gray-200" />
          <div class="h-4 w-4/5 rounded bg-gray-200" />
          <div class="h-5 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
    <ErrorState v-else-if="error" class="mt-4" title="Could not load the store" :message="error.message" @retry="refresh" />
    <EmptyState
      v-else-if="!filtered.length"
      class="mt-4"
      icon="store"
      title="No products found"
      message="Try a different search or clear the filters."
      action-label="Clear filters"
      @action="clearFilters"
    />
    <template v-else>
      <div class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <ProductCard v-for="product in paged" :key="product.id" :product="product" />
      </div>
      <div class="mt-8">
        <PaginationLinks :current-page="page" :last-page="lastPage" :total="filtered.length" @change="page = $event" />
      </div>
    </template>
  </div>
</template>
