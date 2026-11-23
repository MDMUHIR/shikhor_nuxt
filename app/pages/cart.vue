<script setup lang="ts">
import type { CartItem, CourseCartItem, CourseCartResponse, Coupon } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const { apiData, apiFetch } = useApi()
const cart = useCart()
const toast = useToast()

const { data, pending, error, refresh } = await useAsyncData('cart-page', async () => {
  const [items, courses] = await Promise.all([
    apiData<CartItem[]>('/cart'),
    apiData<CourseCartResponse>('/cart/courses'),
  ])
  return { items: items ?? [], courses }
})

const busy = ref<number | null>(null)
const togglingAll = ref(false)
const couponCode = ref('')
const coupon = ref<Coupon | null>(null)
const couponError = ref('')
const checkingCoupon = ref(false)

const productItems = computed(() => data.value?.items ?? [])
const courseItems = computed(() => data.value?.courses?.items ?? [])

function unitPrice(item: CartItem) {
  const variant = item.variant
  const product = item.product
  return Number(variant?.offer_price ?? variant?.price ?? product?.offer_price ?? product?.price ?? item.price ?? 0)
}

function itemImage(item: CartItem) {
  return productImage(item.product, item.variant)
}

function attributes(item: CartItem) {
  return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(' · ')
}

const selectedProducts = computed(() => productItems.value.filter((item) => item.is_selected))
const selectedCourses = computed(() => courseItems.value.filter((item) => item.is_selected))
const productsSubtotal = computed(() =>
  selectedProducts.value.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0),
)
const coursesSubtotal = computed(() =>
  selectedCourses.value.reduce((sum, item) => sum + Number(item.price ?? item.course.effective_price ?? 0), 0),
)
const subtotal = computed(() => productsSubtotal.value + coursesSubtotal.value)
const selectedCount = computed(() => selectedProducts.value.length + selectedCourses.value.length)
const totalCount = computed(() => productItems.value.length + courseItems.value.length)
const allSelected = computed(
  () => totalCount.value > 0 && selectedCount.value === totalCount.value,
)

// Preview from the server; the final discount is recalculated when the order is placed.
const discount = computed(() => Number(coupon.value?.discount_amount ?? 0))
const estimatedTotal = computed(() => Math.max(subtotal.value - discount.value, 0))

watch(subtotal, () => {
  if (coupon.value) {
    coupon.value = null
    couponCode.value = ''
  }
})

async function reload() {
  await Promise.all([refresh(), cart.refresh()])
}

function maxQuantity(item: CartItem): number {
  const stock = item.variant ? item.variant.stock : item.product?.stock
  if (stock === null || stock === undefined) return 99 // stock not tracked
  return Math.max(0, Number(stock))
}

async function updateQuantity(item: CartItem, requested: number) {
  const max = maxQuantity(item)
  const whole = Math.floor(Number(requested))
  const wanted = Number.isFinite(whole) ? Math.max(1, whole) : item.quantity
  const next = max > 0 ? Math.min(max, wanted) : wanted
  if (max > 0 && wanted > max) toast.info(`Only ${max} in stock.`)
  if (next === item.quantity) {
    typed[item.id] = item.quantity
    return
  }
  busy.value = item.id
  const previous = item.quantity
  try {
    await apiFetch('/cart/update', { method: 'POST', body: { cart_id: item.id, quantity: next } })
    item.quantity = next
    typed[item.id] = next
    await reload()
  } catch (err) {
    item.quantity = previous
    typed[item.id] = previous
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

// what is in each quantity box while the student is typing
const typed = reactive<Record<number, number>>({})
watch(
  productItems,
  (items) => {
    for (const item of items) typed[item.id] = item.quantity
  },
  { immediate: true },
)

async function removeProduct(item: CartItem) {
  busy.value = item.id
  try {
    await apiFetch(`/cart/delete/${item.id}`, { method: 'DELETE' })
    toast.success('Item removed from cart.')
    await reload()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

async function toggleProduct(item: CartItem) {
  busy.value = item.id
  try {
    await apiFetch('/cart/toggle-selection', {
      method: 'POST',
      body: { cart_id: item.id, is_selected: !item.is_selected },
    })
    item.is_selected = !item.is_selected
    cart.refresh()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

async function removeCourse(item: CourseCartItem) {
  busy.value = item.id
  try {
    await apiFetch(`/cart/courses/delete/${item.id}`, { method: 'DELETE' })
    toast.success('Course removed from cart.')
    await reload()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

async function toggleCourse(item: CourseCartItem) {
  busy.value = item.id
  try {
    await apiFetch('/cart/courses/toggle-selection', { method: 'POST', body: { id: item.id } })
    item.is_selected = !item.is_selected
    cart.refresh()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

async function toggleAll() {
  togglingAll.value = true
  try {
    const selectAll = !allSelected.value
    await Promise.all([
      apiFetch(selectAll ? '/cart/select-all' : '/cart/deselect-all', { method: 'POST' }).catch(() => null),
      apiFetch(selectAll ? '/cart/courses/select-all' : '/cart/courses/deselect-all', { method: 'POST' }).catch(() => null),
    ])
    await reload()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    togglingAll.value = false
  }
}

async function applyCoupon() {
  couponError.value = ''
  const code = couponCode.value.trim()
  if (!code) {
    couponError.value = 'Enter a coupon code.'
    return
  }
  checkingCoupon.value = true
  try {
    const response = await apiFetch<{ data: Coupon }>('/verify-coupon', {
      method: 'POST',
      body: { code },
    })
    coupon.value = response.data
    toast.success(`Coupon ${response.data.code} applied.`)
  } catch (err) {
    coupon.value = null
    couponError.value = (err as Error).message
  } finally {
    checkingCoupon.value = false
  }
}

function removeCoupon() {
  coupon.value = null
  couponCode.value = ''
  couponError.value = ''
}

useSeoMeta({ title: 'Cart — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Cart</span>
    </nav>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Your cart</h1>
        <p class="mt-1 text-sm text-gray-500">{{ totalCount }} item{{ totalCount === 1 ? '' : 's' }} · {{ selectedCount }} selected for checkout</p>
      </div>
      <button v-if="totalCount" type="button" class="btn-secondary" :disabled="togglingAll" @click="toggleAll">
        <BaseIcon :name="allSelected ? 'x' : 'check'" :size="15" />
        {{ allSelected ? 'Deselect all' : 'Select all' }}
      </button>
    </div>

    <div v-if="pending" class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-3">
        <div v-for="i in 3" :key="i" class="card flex animate-pulse gap-4 p-4">
          <div class="h-24 w-24 shrink-0 rounded-xl bg-gray-200" />
          <div class="flex-1 space-y-2 py-1">
            <div class="h-3 w-1/3 rounded bg-gray-200" />
            <div class="h-4 w-2/3 rounded bg-gray-200" />
            <div class="h-6 w-24 rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div class="card h-72 animate-pulse bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not load your cart" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!totalCount"
      class="mt-6"
      icon="cart"
      title="Your cart is empty"
      message="Add a course or a product from the store and it will show up here."
      action-label="Browse courses"
      action-to="/courses"
    />

    <div v-else class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div class="space-y-8">
        <section v-if="productItems.length">
          <h2 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
            <BaseIcon name="store" :size="16" /> Products
          </h2>
          <div class="space-y-3">
            <article v-for="item in productItems" :key="`p-${item.id}`" class="card flex gap-4 p-4" :class="{ 'opacity-60': busy === item.id }">
              <label class="flex items-start pt-1">
                <input
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
                  :checked="item.is_selected"
                  :disabled="busy === item.id"
                  :aria-label="`Select ${item.product?.name}`"
                  @change="toggleProduct(item)"
                >
              </label>
              <NuxtLink :to="`/store/${item.product?.slug}`" class="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                <img :src="itemImage(item)" :alt="item.product?.name || 'Product'" class="h-full w-full object-cover" @error="imageFallback" >
              </NuxtLink>
              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <NuxtLink :to="`/store/${item.product?.slug}`" class="line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary">
                      {{ item.product?.name }}
                    </NuxtLink>
                    <p v-if="attributes(item)" class="mt-0.5 text-xs text-gray-500">{{ attributes(item) }}</p>
                    <p class="mt-1 text-xs text-gray-400">{{ formatMoney(unitPrice(item)) }} each</p>
                  </div>
                  <button type="button" class="btn-ghost shrink-0 text-rose-500 hover:bg-rose-50" :disabled="busy === item.id" aria-label="Remove item" @click="removeProduct(item)">
                    <BaseIcon name="trash" :size="16" />
                  </button>
                </div>
                <div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                  <div class="flex items-center rounded-lg border border-gray-200">
                    <button type="button" class="px-2.5 py-1.5 text-gray-500 hover:text-oc-primary disabled:opacity-40" :disabled="busy === item.id || item.quantity <= 1" aria-label="Decrease quantity" @click="updateQuantity(item, item.quantity - 1)">
                      <BaseIcon name="minus" :size="14" />
                    </button>
                    <input
                      v-model.number="typed[item.id]"
                      type="number"
                      inputmode="numeric"
                      min="1"
                      :max="maxQuantity(item) || undefined"
                      :disabled="busy === item.id"
                      class="w-12 border-0 bg-transparent text-center text-sm font-semibold text-gray-800 focus:outline-none"
                      aria-label="Quantity"
                      @change="updateQuantity(item, typed[item.id] as number)"
                      @keyup.enter="($event.target as HTMLInputElement).blur()"
                    >
                    <button type="button" class="px-2.5 py-1.5 text-gray-500 hover:text-oc-primary disabled:opacity-40" :disabled="busy === item.id || (maxQuantity(item) > 0 && item.quantity >= maxQuantity(item))" aria-label="Increase quantity" @click="updateQuantity(item, item.quantity + 1)">
                      <BaseIcon name="plus" :size="14" />
                    </button>
                  </div>
                  <p v-if="maxQuantity(item) > 0 && maxQuantity(item) < 99 && item.quantity >= maxQuantity(item)" class="text-[11px] text-amber-600">Max available: {{ maxQuantity(item) }}</p>
                  <p v-else-if="maxQuantity(item) === 0" class="text-[11px] font-semibold text-rose-600">Out of stock — remove this item</p>
                  <span class="text-base font-extrabold text-gray-900">{{ formatMoney(unitPrice(item) * item.quantity) }}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section v-if="courseItems.length">
          <h2 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">
            <BaseIcon name="book-open" :size="16" /> Courses
          </h2>
          <div class="space-y-3">
            <article v-for="item in courseItems" :key="`c-${item.id}`" class="card flex gap-4 p-4" :class="{ 'opacity-60': busy === item.id }">
              <label class="flex items-start pt-1">
                <input
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
                  :checked="item.is_selected"
                  :disabled="busy === item.id"
                  :aria-label="`Select ${item.course.title}`"
                  @change="toggleCourse(item)"
                >
              </label>
              <NuxtLink :to="`/courses/${item.course.slug}`" class="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                <img :src="mediaUrl(item.course.thumbnail)" :alt="item.course.title" class="h-full w-full object-cover" @error="imageFallback" >
              </NuxtLink>
              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <NuxtLink :to="`/courses/${item.course.slug}`" class="line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary">
                      {{ item.course.title }}
                    </NuxtLink>
                    <p class="mt-0.5 text-xs text-gray-500">
                      {{ item.course.total_lessons }} lessons · {{ item.course.access_days === 0 ? 'Lifetime access' : `${item.course.access_days ?? 365} days access` }}
                    </p>
                    <RatingStars class="mt-1" :rating="item.course.rating?.average" :show-value="false" :size="12" />
                  </div>
                  <button type="button" class="btn-ghost shrink-0 text-rose-500 hover:bg-rose-50" :disabled="busy === item.id" aria-label="Remove course" @click="removeCourse(item)">
                    <BaseIcon name="trash" :size="16" />
                  </button>
                </div>
                <div class="mt-auto flex items-center justify-end pt-3">
                  <span class="text-base font-extrabold text-gray-900">{{ formatMoney(item.price ?? item.course.effective_price) }}</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <p class="rounded-xl bg-brand-light/60 px-4 py-3 text-xs text-oc-primary">
          <BaseIcon name="info" :size="14" class="mr-1 inline align-[-2px]" />
          Only selected items are included in checkout. Products are reserved when the order is placed.
        </p>
      </div>

      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Order summary</h2>

          <dl class="mt-4 space-y-2 text-sm text-gray-600">
            <div class="flex justify-between gap-3"><dt>Products</dt><dd class="font-semibold text-gray-800">{{ formatMoney(productsSubtotal) }}</dd></div>
            <div class="flex justify-between gap-3"><dt>Courses</dt><dd class="font-semibold text-gray-800">{{ formatMoney(coursesSubtotal) }}</dd></div>
            <div class="flex justify-between gap-3 border-t border-gray-100 pt-2"><dt>Subtotal</dt><dd class="font-semibold text-gray-900">{{ formatMoney(subtotal) }}</dd></div>
            <div v-if="discount" class="flex justify-between gap-3 text-emerald-600"><dt>Coupon {{ coupon?.code }}</dt><dd class="font-semibold">−{{ formatMoney(discount) }}</dd></div>
          </dl>

          <div class="mt-4 border-t border-gray-100 pt-4">
            <label class="field-label" for="coupon">Coupon code</label>
            <div v-if="coupon" class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
              <span class="font-semibold text-emerald-700">{{ coupon.code }}</span>
              <button type="button" class="text-xs font-semibold text-emerald-700 hover:underline" @click="removeCoupon">Remove</button>
            </div>
            <div v-else class="flex gap-2">
              <input id="coupon" v-model="couponCode" class="field-input" placeholder="e.g. SAVE10" autocomplete="off" @keyup.enter="applyCoupon">
              <button type="button" class="btn-secondary shrink-0" :disabled="checkingCoupon" @click="applyCoupon">
                {{ checkingCoupon ? 'Checking…' : 'Apply' }}
              </button>
            </div>
            <p v-if="couponError" class="field-error">{{ couponError }}</p>
          </div>

          <div class="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4">
            <span class="text-sm font-semibold text-gray-600">Estimated total</span>
            <span class="text-2xl font-extrabold text-oc-primary">{{ formatMoney(estimatedTotal) }}</span>
          </div>
          <p class="mt-1 text-[11px] text-gray-400">Delivery is added at checkout for physical products.</p>

          <NuxtLink
            :to="selectedCount ? '/checkout' : '/courses'"
            class="btn-primary mt-4 w-full"
            :class="{ 'pointer-events-none opacity-60': !selectedCount }"
            :aria-disabled="!selectedCount"
          >
            <BaseIcon name="credit-card" :size="16" />
            {{ selectedCount ? 'Proceed to checkout' : 'Select items first' }}
          </NuxtLink>
          <NuxtLink to="/courses" class="btn-secondary mt-2 w-full">Continue shopping</NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>
