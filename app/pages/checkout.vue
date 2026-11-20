<script setup lang="ts">
import type { CartItem, CourseCartResponse, Coupon, DeliveryCharge, Order } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const { apiData, apiFetch } = useApi()
const { user } = useAuth()
const cart = useCart()
const toast = useToast()

const { data, pending, error, refresh } = await useAsyncData('checkout-page', async () => {
  const [items, courses, charges] = await Promise.all([
    apiData<CartItem[]>('/cart'),
    apiData<CourseCartResponse>('/cart/courses'),
    apiData<DeliveryCharge[]>('/delivery-charges').catch(() => [] as DeliveryCharge[]),
  ])
  return { items: items ?? [], courses, charges: charges ?? [] }
})

const productItems = computed(() => (data.value?.items ?? []).filter((item) => item.is_selected))
const courseItems = computed(() => (data.value?.courses?.items ?? []).filter((item) => item.is_selected))
const hasProducts = computed(() => productItems.value.length > 0)
const hasCourses = computed(() => courseItems.value.length > 0)
const isEmpty = computed(() => !productItems.value.length && !courseItems.value.length)

const activeCharges = computed(() => (data.value?.charges ?? []).filter((charge) => charge.status !== false))
const selectedChargeId = ref<number | null>(null)

watch(
  activeCharges,
  (charges) => {
    if (!charges.length) {
      selectedChargeId.value = null
      return
    }
    if (!charges.some((charge) => charge.id === selectedChargeId.value)) {
      selectedChargeId.value = charges[0]!.id
    }
  },
  { immediate: true },
)

const selectedCharge = computed(() => activeCharges.value.find((charge) => charge.id === selectedChargeId.value) ?? null)
const deliveryCharge = computed(() => (hasProducts.value ? Number(selectedCharge.value?.charge ?? 0) : 0))

function unitPrice(item: CartItem) {
  const variant = item.variant
  const product = item.product
  return Number(variant?.offer_price ?? variant?.price ?? product?.offer_price ?? product?.price ?? item.price ?? 0)
}

function attributes(item: CartItem) {
  return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(' · ')
}

const productsSubtotal = computed(() => productItems.value.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0))
const coursesSubtotal = computed(() =>
  courseItems.value.reduce((sum, item) => sum + Number(item.price ?? item.course.effective_price ?? 0), 0),
)
const subtotal = computed(() => productsSubtotal.value + coursesSubtotal.value)

const couponCode = ref('')
const coupon = ref<Coupon | null>(null)
const couponError = ref('')
const checkingCoupon = ref(false)

const discount = computed(() => {
  if (!coupon.value) return 0
  if (coupon.value.type === 'percentage') return Math.round(subtotal.value * (Number(coupon.value.discount) / 100) * 100) / 100
  return Math.min(subtotal.value, Number(coupon.value.discount))
})
const total = computed(() => Math.max(subtotal.value - discount.value, 0) + deliveryCharge.value)

const form = reactive({
  name: user.value?.name || '',
  email: user.value?.email || '',
  phone: '',
  phone_alt: '',
  line1: '',
  line2: '',
  district: '',
  city: '',
  country: 'Bangladesh',
  payment_method: 'cod',
  payment_sender: '',
  notes: '',
  shipping_method: '',
})

watchEffect(() => {
  if (!form.shipping_method && selectedCharge.value) form.shipping_method = selectedCharge.value.name
})

const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const formError = ref('')

const paymentMethods = [
  { value: 'cod', label: 'Cash on delivery', hint: 'For physical products delivered to your address.' },
  { value: 'bkash', label: 'bKash (manual)', hint: 'Send the amount, then an admin confirms your payment.' },
  { value: 'nagad', label: 'Nagad (manual)', hint: 'Send the amount, then an admin confirms your payment.' },
  { value: 'bank', label: 'Bank transfer', hint: 'Transfer manually; an admin confirms your payment.' },
]

const isManualPayment = computed(() => ['bkash', 'nagad', 'bank'].includes(form.payment_method))
const senderLabel = computed(() => (form.payment_method === 'bank' ? 'Transaction reference' : 'Sending number'))
const senderPlaceholder = computed(() =>
  form.payment_method === 'bank' ? 'e.g. TRX123456' : 'The number you sent the payment from',
)

const availablePaymentMethods = computed(() =>
  hasProducts.value ? paymentMethods : paymentMethods.filter((method) => method.value !== 'cod'),
)

watch(
  availablePaymentMethods,
  (methods) => {
    if (!methods.some((method) => method.value === form.payment_method)) {
      form.payment_method = methods[0]?.value ?? ''
    }
  },
  { immediate: true },
)

watch(
  () => form.payment_method,
  () => {
    delete errors.payment_sender
  },
)

async function applyCoupon() {
  couponError.value = ''
  if (!couponCode.value.trim()) {
    couponError.value = 'Enter a coupon code.'
    return
  }
  checkingCoupon.value = true
  try {
    const response = await apiFetch<{ data: Coupon }>('/verify-coupon', {
      method: 'POST',
      body: { code: couponCode.value.trim() },
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

function validate() {
  for (const key of Object.keys(errors)) delete errors[key]
  if (!form.name.trim()) errors.name = 'Your full name is required.'
  if (!form.email.trim()) errors.email = 'An email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (!form.phone.trim()) errors.phone = 'A phone number is required for delivery updates.'
  if (isManualPayment.value && !form.payment_sender.trim()) {
    errors.payment_sender = form.payment_method === 'bank'
      ? 'A transaction reference is required.'
      : 'The sending number is required for payment confirmation.'
  }

  if (hasProducts.value) {
    if (!form.line1.trim()) errors.line1 = 'Street address is required.'
    if (!form.district.trim()) errors.district = 'District is required.'
    if (!form.city.trim()) errors.city = 'City or area is required.'
  }
  return Object.keys(errors).length === 0
}

function buildNotes() {
  const parts: string[] = []
  if (isManualPayment.value && form.payment_sender.trim()) {
    const label = form.payment_method === 'bank' ? 'Transaction reference' : 'Sending number'
    parts.push(`${label}: ${form.payment_sender.trim()} (${form.payment_method})`)
  }
  if (form.notes.trim()) parts.push(form.notes.trim())
  return parts.join('\n') || null
}

async function placeOrder() {
  formError.value = ''
  if (!validate()) {
    formError.value = 'Please fix the highlighted fields.'
    return
  }
  submitting.value = true
  try {
    const response = await apiFetch<{ data: Order }>('/orders/add', {
      method: 'POST',
      body: {
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          phone_alt: form.phone_alt.trim() || null,
        },
        shipping_address: {
          line1: form.line1.trim(),
          line2: form.line2.trim() || null,
          district: form.district.trim(),
          city: form.city.trim(),
          country: form.country.trim() || 'Bangladesh',
        },
        shipping: {
          method: hasProducts.value ? form.shipping_method || selectedCharge.value?.name || null : null,
          estimated_delivery_days: null,
        },
        pricing: {
          currency: 'BDT',
          delivery_charge: deliveryCharge.value,
          discount: discount.value,
          discount_type: coupon.value?.type ?? null,
          coupon_code: coupon.value?.code ?? null,
        },
        payment_method: form.payment_method,
        notes: buildNotes(),
      },
    })
    const order = response?.data
    await cart.refresh()
    toast.success('Order placed successfully.')
    if (order?.id) await navigateTo(`/orders/${order.id}?success=1`)
    else await navigateTo('/orders')
  } catch (err) {
    const apiError = err as Error & { errors?: Record<string, string[]> }
    if (apiError.errors) {
      for (const [field, messages] of Object.entries(apiError.errors)) {
        errors[field] = Array.isArray(messages) ? messages[0] || '' : String(messages)
      }
    }
    formError.value = apiError.message
    toast.error(apiError.message)
  } finally {
    submitting.value = false
  }
}

useSeoMeta({ title: 'Checkout — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <NuxtLink to="/cart" class="hover:text-oc-primary">Cart</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Checkout</span>
    </nav>

    <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Checkout</h1>
    <p class="mt-1 text-sm text-gray-500">Review your order and confirm your details. No online card gateway is connected.</p>

    <div v-if="pending" class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div class="card h-96 animate-pulse bg-gray-100" />
      <div class="card h-96 animate-pulse bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not start checkout" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="isEmpty"
      class="mt-6"
      icon="cart"
      title="Nothing selected for checkout"
      message="Go back to your cart and select the items you want to order."
      action-label="Back to cart"
      action-to="/cart"
    />

    <form v-else class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]" @submit.prevent="placeOrder">
      <div class="space-y-6">
        <section class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Contact details</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label class="field-label" for="checkout-name">Full name</label>
              <input id="checkout-name" v-model="form.name" class="field-input" autocomplete="name" placeholder="Your name">
              <p v-if="errors.name" class="field-error">{{ errors.name }}</p>
            </div>
            <div>
              <label class="field-label" for="checkout-email">Email</label>
              <input id="checkout-email" v-model="form.email" type="email" class="field-input" autocomplete="email" placeholder="you@example.com">
              <p v-if="errors.email" class="field-error">{{ errors.email }}</p>
            </div>
            <div>
              <label class="field-label" for="checkout-phone">Phone</label>
              <input id="checkout-phone" v-model="form.phone" class="field-input" autocomplete="tel" placeholder="01XXXXXXXXX">
              <p v-if="errors.phone" class="field-error">{{ errors.phone }}</p>
            </div>
            <div>
              <label class="field-label" for="checkout-phone-alt">Alternate phone (optional)</label>
              <input id="checkout-phone-alt" v-model="form.phone_alt" class="field-input" autocomplete="tel" placeholder="Optional">
            </div>
          </div>
        </section>

        <section v-if="hasProducts" class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Shipping address</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="field-label" for="checkout-line1">Street address</label>
              <input id="checkout-line1" v-model="form.line1" class="field-input" autocomplete="address-line1" placeholder="House, road, area">
              <p v-if="errors.line1" class="field-error">{{ errors.line1 }}</p>
            </div>
            <div class="sm:col-span-2">
              <label class="field-label" for="checkout-line2">Apartment, landmark (optional)</label>
              <input id="checkout-line2" v-model="form.line2" class="field-input" autocomplete="address-line2" placeholder="Optional">
            </div>
            <div>
              <label class="field-label" for="checkout-district">District</label>
              <input id="checkout-district" v-model="form.district" class="field-input" autocomplete="address-level1" placeholder="e.g. Dhaka">
              <p v-if="errors.district" class="field-error">{{ errors.district }}</p>
            </div>
            <div>
              <label class="field-label" for="checkout-city">City / area</label>
              <input id="checkout-city" v-model="form.city" class="field-input" autocomplete="address-level2" placeholder="e.g. Mirpur">
              <p v-if="errors.city" class="field-error">{{ errors.city }}</p>
            </div>
            <div>
              <label class="field-label" for="checkout-country">Country</label>
              <input id="checkout-country" v-model="form.country" class="field-input" autocomplete="country-name">
            </div>
          </div>
        </section>

        <section class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Payment method</h2>
          <p class="mt-1 text-xs text-gray-500">Payments are confirmed manually by an administrator.</p>
          <div class="mt-4 grid gap-2">
            <label
              v-for="method in availablePaymentMethods"
              :key="method.value"
              class="flex cursor-pointer items-start gap-3 rounded-xl border p-3 transition"
              :class="form.payment_method === method.value ? 'border-oc-primary bg-brand-light' : 'border-gray-200 hover:border-gray-300'"
            >
              <input v-model="form.payment_method" type="radio" :value="method.value" class="mt-1 h-4 w-4 border-gray-300 text-oc-primary focus:ring-oc-primary">
              <span>
                <span class="block text-sm font-semibold text-gray-800">{{ method.label }}</span>
                <span class="block text-xs text-gray-500">{{ method.hint }}</span>
              </span>
            </label>
          </div>
          <div v-if="isManualPayment" class="mt-4">
            <label class="field-label" for="checkout-payment-sender">{{ senderLabel }}</label>
            <input id="checkout-payment-sender" v-model="form.payment_sender" class="field-input" :placeholder="senderPlaceholder">
            <p class="mt-1 text-[11px] text-gray-400">Used by our team to verify your payment manually.</p>
            <p v-if="errors.payment_sender" class="field-error">{{ errors.payment_sender }}</p>
          </div>
          <div class="mt-4">
            <label class="field-label" for="checkout-notes">Order notes (optional)</label>
            <textarea id="checkout-notes" v-model="form.notes" class="field-input" rows="3" placeholder="Anything we should know?"></textarea>
          </div>
        </section>

        <section v-if="hasProducts && activeCharges.length" class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Delivery</h2>
          <div class="mt-4 grid gap-2 sm:grid-cols-2">
            <label
              v-for="charge in activeCharges"
              :key="charge.id"
              class="flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-sm transition"
              :class="selectedChargeId === charge.id ? 'border-oc-primary bg-brand-light' : 'border-gray-200 hover:border-gray-300'"
            >
              <span class="flex items-center gap-2">
                <input v-model="selectedChargeId" type="radio" :value="charge.id" class="h-4 w-4 border-gray-300 text-oc-primary focus:ring-oc-primary">
                <span class="font-semibold text-gray-800">{{ charge.name }}</span>
              </span>
              <span class="font-bold text-oc-primary">{{ formatMoney(charge.charge) }}</span>
            </label>
          </div>
        </section>
      </div>

      <aside class="lg:sticky lg:top-24 lg:self-start">
        <div class="card p-5">
          <h2 class="text-base font-bold text-gray-900">Your order</h2>

          <ul class="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
            <li v-for="item in productItems" :key="`p-${item.id}`" class="flex gap-3">
              <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                <img :src="productImage(item.product, item.variant)" :alt="item.product?.name || 'Product'" class="h-full w-full object-cover" @error="imageFallback" >
              </div>
              <div class="min-w-0 flex-1">
                <p class="line-clamp-2 text-xs font-semibold text-gray-800">{{ item.product?.name }}</p>
                <p v-if="attributes(item)" class="truncate text-[11px] text-gray-400">{{ attributes(item) }}</p>
                <p class="text-[11px] text-gray-500">Qty {{ item.quantity }}</p>
              </div>
              <span class="text-xs font-bold text-gray-800">{{ formatMoney(unitPrice(item) * item.quantity) }}</span>
            </li>
            <li v-for="item in courseItems" :key="`c-${item.id}`" class="flex gap-3">
              <div class="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                <img :src="mediaUrl(item.course.thumbnail)" :alt="item.course.title" class="h-full w-full object-cover" @error="imageFallback" >
              </div>
              <div class="min-w-0 flex-1">
                <p class="line-clamp-2 text-xs font-semibold text-gray-800">{{ item.course.title }}</p>
                <p class="text-[11px] text-gray-500">Course access</p>
              </div>
              <span class="text-xs font-bold text-gray-800">{{ formatMoney(item.price ?? item.course.effective_price) }}</span>
            </li>
          </ul>

          <div class="mt-4 border-t border-gray-100 pt-4">
            <label class="field-label" for="checkout-coupon">Coupon code</label>
            <div v-if="coupon" class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm">
              <span class="font-semibold text-emerald-700">{{ coupon.code }}</span>
              <button type="button" class="text-xs font-semibold text-emerald-700 hover:underline" @click="removeCoupon">Remove</button>
            </div>
            <div v-else class="flex gap-2">
              <input id="checkout-coupon" v-model="couponCode" class="field-input" placeholder="Coupon code" autocomplete="off" @keyup.enter.prevent="applyCoupon">
              <button type="button" class="btn-secondary shrink-0" :disabled="checkingCoupon" @click="applyCoupon">
                {{ checkingCoupon ? 'Checking…' : 'Apply' }}
              </button>
            </div>
            <p v-if="couponError" class="field-error">{{ couponError }}</p>
          </div>

          <dl class="mt-4 space-y-2 border-t border-gray-100 pt-4 text-sm text-gray-600">
            <div class="flex justify-between gap-3"><dt>Subtotal</dt><dd class="font-semibold text-gray-800">{{ formatMoney(subtotal) }}</dd></div>
            <div v-if="discount" class="flex justify-between gap-3 text-emerald-600"><dt>Discount</dt><dd class="font-semibold">−{{ formatMoney(discount) }}</dd></div>
            <div class="flex justify-between gap-3"><dt>Delivery</dt><dd class="font-semibold text-gray-800">{{ deliveryCharge ? formatMoney(deliveryCharge) : 'Free' }}</dd></div>
            <div class="flex items-baseline justify-between gap-3 border-t border-gray-100 pt-3"><dt class="font-semibold text-gray-700">Total</dt><dd class="text-2xl font-extrabold text-oc-primary">{{ formatMoney(total) }}</dd></div>
          </dl>

          <p v-if="formError" class="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">{{ formError }}</p>

          <button type="submit" class="btn-primary mt-4 w-full" :disabled="submitting">
            <BaseIcon name="shield" :size="16" />
            {{ submitting ? 'Placing order…' : 'Place order' }}
          </button>
          <NuxtLink to="/cart" class="btn-secondary mt-2 w-full">Back to cart</NuxtLink>
          <p class="mt-3 text-center text-[11px] text-gray-400">By placing this order you agree to be contacted about payment confirmation.</p>
        </div>
      </aside>
    </form>
  </div>
</template>
