<script setup lang="ts">
import type { Category, Product, ProductVariant } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const { apiData, apiUpload } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: product, pending, error, refresh } = await useAsyncData(
  () => `admin-product-${route.params.slug}`,
  () => apiData<Product>(`/admin/products/${route.params.slug}`),
  { watch: [() => route.params.slug] },
)

const { data: categories } = await useAsyncData('admin-product-detail-categories', () =>
  apiData<Category[]>('/categories').catch(() => [] as Category[]),
)

useSeoMeta({
  title: () => (product.value ? `${product.value.name} — Products` : 'Product — Admin'),
  robots: 'noindex',
})

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

watch(
  product,
  (value) => {
    if (!value) return
    Object.assign(form, {
      name: value.name || '',
      slug: value.slug || '',
      category_id: value.category_id ?? '',
      price: value.price ?? 0,
      offer_price: value.offer_price ?? '',
      stock: value.stock ?? 0,
      status: value.status || 'active',
      short_description: value.short_description || '',
      description: value.description || '',
    })
  },
  { immediate: true },
)

const newImages = ref<File[]>([])
const newPreviews = ref<string[]>([])

function onNewImages(event: Event) {
  const files = Array.from((event.target as HTMLInputElement).files ?? [])
  newImages.value = files
  newPreviews.value = files.map((file) => URL.createObjectURL(file))
}

async function saveProduct() {
  if (!product.value) return
  const payload = new FormData()
  payload.append('product_id', String(product.value.id))
  payload.append('name', form.name)
  payload.append('slug', form.slug)
  payload.append('category_id', String(form.category_id || ''))
  payload.append('price', String(form.price || 0))
  if (form.offer_price !== '' && form.offer_price !== null) payload.append('offer_price', String(form.offer_price))
  payload.append('stock', String(form.stock || 0))
  payload.append('status', form.status)
  payload.append('short_description', form.short_description)
  payload.append('description', form.description)
  const offset = product.value.images?.length ?? 0
  newImages.value.forEach((file, index) => {
    payload.append(`images[${offset + index}][url]`, file)
    payload.append(`images[${offset + index}][is_featured]`, '0')
  })

  const result = await run(
    () => apiUpload<{ data: Product }>('/admin/products/update', payload),
    'Product saved.',
  )
  if (!result) return
  newImages.value = []
  newPreviews.value = []
  await refresh()
  if (result.data?.slug && result.data.slug !== route.params.slug) {
    await navigateTo(`/admin/products/${result.data.slug}`, { replace: true })
  }
}

async function removeImage(imageId: number) {
  if (!product.value) return
  const ok = await ask({ title: 'Delete image', message: 'Remove this product image?', confirmLabel: 'Delete image' })
  if (!ok) return
  const result = await run(
    () => apiData(`/admin/products/${product.value!.id}/images/${imageId}`, { method: 'DELETE' }),
    'Image deleted.',
  )
  if (result !== undefined) await refresh()
}

/* ------------------------------------------------------------------ */
/* Variants                                                            */
/* ------------------------------------------------------------------ */

const variantModal = ref(false)
const variantForm = reactive({
  id: null as number | null,
  sku: '',
  price: 0,
  offer_price: '' as string | number,
  stock: 0,
  attributes: [] as Array<{ attribute: string; value: string }>,
})

function openVariant(variant?: ProductVariant) {
  Object.assign(variantForm, {
    id: variant?.id ?? null,
    sku: variant?.sku ?? '',
    price: variant?.price ?? 0,
    offer_price: variant?.offer_price ?? '',
    stock: variant?.stock ?? 0,
    attributes: (variant?.attributes ?? []).map((attribute) => ({
      attribute: attribute.attribute,
      value: attribute.value,
    })),
  })
  resetErrors()
  variantModal.value = true
}

function addAttribute() {
  variantForm.attributes.push({ attribute: '', value: '' })
}

function removeAttribute(index: number) {
  variantForm.attributes.splice(index, 1)
}

async function saveVariant() {
  if (!product.value) return
  const attributes = variantForm.attributes
    .filter((attribute) => attribute.attribute.trim() && attribute.value.trim())
    .map((attribute) => ({ attribute: attribute.attribute.trim(), value: attribute.value.trim() }))

  const body = {
    sku: variantForm.sku,
    price: variantForm.price,
    offer_price: variantForm.offer_price === '' ? null : Number(variantForm.offer_price),
    stock: variantForm.stock,
    attributes,
  }

  const result = await run(
    () =>
      apiData(
        variantForm.id ? `/admin/variants/${variantForm.id}` : `/admin/products/${product.value!.id}/variants`,
        { method: 'POST', body },
      ),
    variantForm.id ? 'Variant saved.' : 'Variant added.',
  )
  if (result === undefined) return
  variantModal.value = false
  await refresh()
}

async function removeVariant(variant: ProductVariant) {
  const ok = await ask({
    title: 'Delete variant',
    message: `Delete variant ${variant.sku}? Its images will be removed too.`,
    confirmLabel: 'Delete variant',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/variants/delete/${variant.id}`, { method: 'POST' }), 'Variant deleted.')
  if (result !== undefined) await refresh()
}

async function uploadVariantImage(variant: ProductVariant, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const payload = new FormData()
  payload.append('url', file)
  payload.append('is_featured', variant.images?.length ? '0' : '1')
  const result = await run(() => apiUpload(`/admin/variants/${variant.id}/images`, payload), 'Variant image added.')
  input.value = ''
  if (result !== undefined) await refresh()
}

async function removeVariantImage(variant: ProductVariant, imageId: number) {
  const ok = await ask({ title: 'Delete image', message: 'Remove this variant image?', confirmLabel: 'Delete image' })
  if (!ok) return
  const result = await run(
    () => apiData(`/admin/variants/${variant.id}/images/${imageId}`, { method: 'DELETE' }),
    'Variant image deleted.',
  )
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader
      :title="product ? product.name : 'Product'"
      :subtitle="product ? `Slug /${product.slug} · ${product.images?.length ?? 0} images · ${product.variants?.length ?? 0} variants` : 'Edit product details and variants.'"
      icon="store"
    >
      <NuxtLink to="/admin/products" class="btn-secondary">
        <BaseIcon name="arrow-left" :size="16" /> All products
      </NuxtLink>
      <NuxtLink v-if="product" :to="`/store/${product.slug}`" target="_blank" class="btn-secondary">
        <BaseIcon name="external-link" :size="15" /> View in store
      </NuxtLink>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-3">
      <div class="card h-24 animate-pulse bg-gray-50" />
      <div class="card h-64 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load this product" :message="error.message" @retry="refresh" />

    <div v-else-if="product" class="space-y-4">
      <section class="card p-5">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 class="text-sm font-bold text-gray-900">Product details</h2>
          <StatusBadge :status="product.status" />
        </div>
        <form class="space-y-4" @submit.prevent="saveProduct">
          <div class="grid gap-4 md:grid-cols-2">
            <div class="md:col-span-2">
              <label class="field-label" for="detail-name">Name</label>
              <input id="detail-name" v-model="form.name" type="text" class="field-input" required>
              <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
            </div>
            <div>
              <label class="field-label" for="detail-slug">Slug</label>
              <input id="detail-slug" v-model="form.slug" type="text" class="field-input">
              <p v-if="fieldError('slug')" class="field-error">{{ fieldError('slug') }}</p>
            </div>
            <div>
              <label class="field-label" for="detail-category">Category</label>
              <select id="detail-category" v-model="form.category_id" class="field-input">
                <option value="">Uncategorised</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
            <div>
              <label class="field-label" for="detail-price">Price (BDT)</label>
              <input id="detail-price" v-model.number="form.price" type="number" min="0" step="0.01" class="field-input">
            </div>
            <div>
              <label class="field-label" for="detail-offer">Offer price</label>
              <input id="detail-offer" v-model="form.offer_price" type="number" min="0" step="0.01" class="field-input" placeholder="Optional">
            </div>
            <div>
              <label class="field-label" for="detail-stock">Stock</label>
              <input id="detail-stock" v-model.number="form.stock" type="number" min="0" class="field-input">
            </div>
            <div>
              <label class="field-label" for="detail-status">Status</label>
              <select id="detail-status" v-model="form.status" class="field-input">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>
            <div class="md:col-span-2">
              <label class="field-label" for="detail-short">Short description</label>
              <input id="detail-short" v-model="form.short_description" type="text" class="field-input">
            </div>
            <div class="md:col-span-2">
              <label class="field-label" for="detail-description">Description</label>
              <textarea id="detail-description" v-model="form.description" rows="4" class="field-input" />
            </div>
          </div>

          <div>
            <label class="field-label">Add images</label>
            <input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary" @change="onNewImages">
            <div v-if="newPreviews.length" class="mt-2 flex flex-wrap gap-2">
              <img v-for="(src, index) in newPreviews" :key="index" :src="src" alt="New product image" class="h-16 w-16 rounded-lg object-cover">
            </div>
          </div>

          <div class="flex justify-end">
            <button type="submit" class="btn-primary" :disabled="busy">
              <BaseIcon v-if="busy" name="refresh" :size="15" class="animate-spin" />
              <BaseIcon v-else name="save" :size="15" />
              Save product
            </button>
          </div>
        </form>
      </section>

      <section class="card p-5">
        <h2 class="mb-3 text-sm font-bold text-gray-900">Product images</h2>
        <EmptyState v-if="!product.images?.length" icon="image" title="No images" message="Add product images above and save." />
        <div v-else class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
          <div v-for="image in product.images" :key="image.id" class="group relative overflow-hidden rounded-xl border border-gray-100">
            <img :src="mediaUrl(image.url)" alt="Product image" class="h-24 w-full object-cover" @error="imageFallback">
            <span v-if="image.is_featured" class="absolute left-1.5 top-1.5 badge bg-amber-50 text-amber-700 ring-amber-200">Featured</span>
            <button
              type="button"
              class="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-sm hover:bg-white"
              aria-label="Delete image"
              @click="removeImage(image.id)"
            >
              <BaseIcon name="trash" :size="12" />
            </button>
          </div>
        </div>
      </section>

      <section class="card p-5">
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 class="text-sm font-bold text-gray-900">Variants</h2>
            <p class="text-xs text-gray-500">Products with variants require students to choose one before adding to cart.</p>
          </div>
          <button type="button" class="btn-primary !px-3 !py-2 text-xs" @click="openVariant()">
            <BaseIcon name="plus" :size="14" /> Add variant
          </button>
        </div>

        <EmptyState v-if="!product.variants?.length" icon="layers" title="No variants" message="The product sells with its base price and stock." action-label="Add a variant" @action="openVariant()" />

        <div v-else class="space-y-3">
          <article v-for="variant in product.variants" :key="variant.id" class="rounded-xl border border-gray-100 p-3">
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p class="text-sm font-bold text-gray-900">{{ variant.sku }}</p>
                <p class="text-xs text-gray-500">
                  {{ formatMoney(variant.offer_price ?? variant.price) }}
                  <span v-if="variant.offer_price" class="ml-1 text-gray-400 line-through">{{ formatMoney(variant.price) }}</span>
                  · {{ variant.stock }} in stock
                </p>
                <div class="mt-1 flex flex-wrap gap-1">
                  <span v-for="attribute in variant.attributes" :key="`${attribute.attribute}-${attribute.value}`" class="badge bg-gray-50 text-gray-600 ring-gray-200">
                    {{ attribute.attribute }}: {{ attribute.value }}
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <label class="btn-secondary !px-2 !py-1.5 text-xs">
                  <BaseIcon name="upload" :size="13" /> Image
                  <input type="file" accept="image/*" class="hidden" @change="uploadVariantImage(variant, $event)">
                </label>
                <button type="button" class="btn-ghost !p-1.5" aria-label="Edit variant" @click="openVariant(variant)">
                  <BaseIcon name="edit" :size="14" />
                </button>
                <button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete variant" @click="removeVariant(variant)">
                  <BaseIcon name="trash" :size="14" />
                </button>
              </div>
            </div>
            <div v-if="variant.images?.length" class="mt-2 flex flex-wrap gap-2">
              <div v-for="image in variant.images" :key="image.id" class="relative">
                <img :src="mediaUrl(image.url)" alt="Variant image" class="h-14 w-14 rounded-lg object-cover" @error="imageFallback">
                <button
                  type="button"
                  class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-rose-600 shadow"
                  aria-label="Delete variant image"
                  @click="removeVariantImage(variant, image.id)"
                >
                  <BaseIcon name="x" :size="10" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>

    <AppModal :open="variantModal" :title="variantForm.id ? 'Edit variant' : 'Add variant'" size="md" @close="variantModal = false">
      <form class="space-y-4" @submit.prevent="saveVariant">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="field-label" for="variant-sku">SKU</label>
            <input id="variant-sku" v-model="variantForm.sku" type="text" class="field-input" placeholder="Generated if empty">
            <p v-if="fieldError('sku')" class="field-error">{{ fieldError('sku') }}</p>
          </div>
          <div>
            <label class="field-label" for="variant-price">Price (BDT)</label>
            <input id="variant-price" v-model.number="variantForm.price" type="number" min="0" step="0.01" class="field-input">
          </div>
          <div>
            <label class="field-label" for="variant-offer">Offer price</label>
            <input id="variant-offer" v-model="variantForm.offer_price" type="number" min="0" step="0.01" class="field-input" placeholder="Optional">
          </div>
          <div>
            <label class="field-label" for="variant-stock">Stock</label>
            <input id="variant-stock" v-model.number="variantForm.stock" type="number" min="0" class="field-input">
          </div>
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between">
            <span class="field-label !mb-0">Attributes</span>
            <button type="button" class="text-[11px] font-semibold text-oc-primary hover:underline" @click="addAttribute">+ Add attribute</button>
          </div>
          <div v-if="!variantForm.attributes.length" class="rounded-lg border border-dashed border-gray-200 px-3 py-2 text-xs text-gray-400">
            No attributes. Examples: Size / Medium, Colour / Blue.
          </div>
          <div v-for="(attribute, index) in variantForm.attributes" :key="index" class="mt-2 grid grid-cols-[1fr_1fr_auto] gap-2">
            <input v-model="attribute.attribute" type="text" class="field-input !py-1.5 text-xs" placeholder="Attribute">
            <input v-model="attribute.value" type="text" class="field-input !py-1.5 text-xs" placeholder="Value">
            <button type="button" class="btn-ghost !p-1.5 text-rose-600" aria-label="Remove attribute" @click="removeAttribute(index)">
              <BaseIcon name="x" :size="13" />
            </button>
          </div>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="variantModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="saveVariant">{{ variantForm.id ? 'Save variant' : 'Add variant' }}</button>
      </template>
    </AppModal>
  </div>
</template>
