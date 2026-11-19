<script setup lang="ts">
import type { Category, Product } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Products — Admin', robots: 'noindex' })

const { apiData, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: products, pending, error, refresh } = await useAsyncData('admin-products', () =>
  apiData<Product[]>('/products'),
)

const { data: categories } = await useAsyncData('admin-product-category-options', () =>
  apiData<Category[]>('/categories').catch(() => [] as Category[]),
)

const search = ref('')
const status = ref('')
const categoryId = ref('')
const page = ref(1)
const perPage = 12

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  return (products.value ?? []).filter((product) => {
    if (status.value && product.status !== status.value) return false
    if (categoryId.value && String(product.category_id) !== categoryId.value) return false
    if (!term) return true
    return product.name.toLowerCase().includes(term) || product.slug.toLowerCase().includes(term)
  })
})

const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([search, status, categoryId], () => (page.value = 1))

const modalOpen = ref(false)
const imageFiles = ref<File[]>([])
const imagePreviews = ref<string[]>([])

const form = reactive({
  name: '',
  slug: '',
  category_id: '' as string | number,
  price: 0,
  offer_price: '' as string | number,
  stock: 0,
  status: 'active',
  short_description: '',
  description: '',
})

function openCreate() {
  Object.assign(form, {
    name: '',
    slug: '',
    category_id: '',
    price: 0,
    offer_price: '',
    stock: 0,
    status: 'active',
    short_description: '',
    description: '',
  })
  imageFiles.value = []
  imagePreviews.value = []
  resetErrors()
  modalOpen.value = true
}

function onImages(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  imageFiles.value = files
  imagePreviews.value = files.map((file) => URL.createObjectURL(file))
}

async function save() {
  const payload = new FormData()
  payload.append('name', form.name)
  payload.append('slug', form.slug)
  payload.append('category_id', String(form.category_id || ''))
  payload.append('price', String(form.price || 0))
  if (form.offer_price !== '' && form.offer_price !== null) payload.append('offer_price', String(form.offer_price))
  payload.append('stock', String(form.stock || 0))
  payload.append('status', form.status)
  payload.append('short_description', form.short_description)
  payload.append('description', form.description)
  imageFiles.value.forEach((file, index) => {
    payload.append(`images[${index}][url]`, file)
    payload.append(`images[${index}][is_featured]`, index === 0 ? '1' : '0')
  })

  const result = await run(() => apiUpload('/admin/products/add', payload), 'Product created.')
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(product: Product) {
  const ok = await ask({
    title: 'Delete product',
    message: `Delete “${product.name}” with all variants and images? This cannot be undone.`,
    confirmLabel: 'Delete product',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/products/delete/${product.id}`, { method: 'DELETE' }), 'Product deleted.')
  if (result !== undefined) await refresh()
}

function priceOf(product: Product) {
  return product.offer_price ?? product.price
}
</script>

<template>
  <div>
    <AdminPageHeader title="Products" subtitle="Manage the physical store catalog, stock, variants and images." icon="store">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New product
      </button>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="relative md:col-span-5">
          <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="search" type="search" class="field-input pl-9" placeholder="Search products…" aria-label="Search products">
        </div>
        <div class="md:col-span-3">
          <select v-model="status" class="field-input" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="discontinued">Discontinued</option>
          </select>
        </div>
        <div class="md:col-span-3">
          <select v-model="categoryId" class="field-input" aria-label="Filter by category">
            <option value="">All categories</option>
            <option v-for="category in categories" :key="category.id" :value="String(category.id)">{{ category.name }}</option>
          </select>
        </div>
        <div class="md:col-span-1">
          <button type="button" class="btn-secondary w-full" aria-label="Clear filters" @click="search = ''; status = ''; categoryId = ''; page = 1">
            <BaseIcon name="refresh" :size="15" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div v-for="i in 6" :key="i" class="card h-44 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load products" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!filtered.length"
      icon="store"
      :title="(products?.length ?? 0) ? 'No products match these filters' : 'No products yet'"
      :message="(products?.length ?? 0) ? 'Try clearing the search or filters.' : 'Add your first physical product to start selling in the store.'"
      :action-label="(products?.length ?? 0) ? 'Clear filters' : 'Add a product'"
      @action="(products?.length ?? 0) ? (search = '', status = '', categoryId = '') : openCreate()"
    />

    <template v-else>
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <article v-for="product in paged" :key="product.id" class="card flex flex-col overflow-hidden">
          <div class="flex items-start gap-3 p-4">
            <img :src="productImage(product)" :alt="product.name" class="h-20 w-20 shrink-0 rounded-xl object-cover" @error="imageFallback">
            <div class="min-w-0 flex-1">
              <h2 class="truncate text-sm font-bold text-gray-900">{{ product.name }}</h2>
              <p class="truncate text-[11px] text-gray-400">/{{ product.slug }}</p>
              <p class="mt-1 text-xs text-gray-500">{{ product.category?.name || 'Uncategorised' }}</p>
              <div class="mt-1 flex flex-wrap items-center gap-1.5">
                <StatusBadge :status="product.status" />
                <span class="badge bg-gray-50 text-gray-600 ring-gray-200">{{ product.variants?.length ?? 0 }} variants</span>
              </div>
            </div>
          </div>
          <div class="mt-auto flex items-center justify-between border-t border-gray-100 px-4 py-2.5">
            <div>
              <p class="text-sm font-extrabold text-gray-900">{{ formatMoney(priceOf(product)) }}</p>
              <p class="text-[11px]" :class="product.stock > 0 ? 'text-gray-400' : 'text-rose-500'">
                {{ product.stock > 0 ? `${product.stock} in stock` : 'Out of stock' }}
              </p>
            </div>
            <div class="flex items-center gap-1">
              <NuxtLink :to="`/admin/products/${product.slug}`" class="btn-secondary !px-2.5 !py-1.5 text-xs">
                <BaseIcon name="edit" :size="14" /> Edit
              </NuxtLink>
              <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete product" @click="remove(product)">
                <BaseIcon name="trash" :size="15" />
              </button>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-5 flex justify-center">
        <PaginationLinks :current-page="page" :last-page="lastPage" :total="filtered.length" @change="(value) => (page = value)" />
      </div>
    </template>

    <AppModal :open="modalOpen" title="New product" description="Create the product shell. Variants and extra images can be added after saving." size="lg" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="field-label" for="product-name">Name</label>
            <input id="product-name" v-model="form.name" type="text" class="field-input" required>
            <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
          </div>
          <div>
            <label class="field-label" for="product-slug">Slug</label>
            <input id="product-slug" v-model="form.slug" type="text" class="field-input" placeholder="Generated from name">
            <p v-if="fieldError('slug')" class="field-error">{{ fieldError('slug') }}</p>
          </div>
          <div>
            <label class="field-label" for="product-category">Category</label>
            <select id="product-category" v-model="form.category_id" class="field-input">
              <option value="">Uncategorised</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          <div>
            <label class="field-label" for="product-price">Price (BDT)</label>
            <input id="product-price" v-model.number="form.price" type="number" min="0" step="0.01" class="field-input">
          </div>
          <div>
            <label class="field-label" for="product-offer">Offer price</label>
            <input id="product-offer" v-model="form.offer_price" type="number" min="0" step="0.01" class="field-input" placeholder="Optional">
          </div>
          <div>
            <label class="field-label" for="product-stock">Stock</label>
            <input id="product-stock" v-model.number="form.stock" type="number" min="0" class="field-input">
          </div>
          <div>
            <label class="field-label" for="product-status">Status</label>
            <select id="product-status" v-model="form.status" class="field-input">
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="product-short">Short description</label>
            <input id="product-short" v-model="form.short_description" type="text" class="field-input">
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="product-description">Description</label>
            <textarea id="product-description" v-model="form.description" rows="4" class="field-input" />
          </div>
          <div class="sm:col-span-2">
            <label class="field-label">Images</label>
            <input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onImages">
            <div v-if="imagePreviews.length" class="mt-2 flex flex-wrap gap-2">
              <img v-for="(src, index) in imagePreviews" :key="index" :src="src" alt="Selected product image" class="h-14 w-14 rounded-lg object-cover">
            </div>
          </div>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">Create product</button>
      </template>
    </AppModal>
  </div>
</template>
