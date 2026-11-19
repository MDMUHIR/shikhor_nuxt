<script setup lang="ts">
import type { AdminOrder } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

const route = useRoute()
const { apiData } = useApi()
const { busy, fieldError, run } = useFormHandler()

const { data: order, pending, error, refresh } = await useAsyncData(
  () => `admin-order-${route.params.id}`,
  () => apiData<AdminOrder>(`/admin/orders/${route.params.id}`),
)

useSeoMeta({
  title: () => (order.value ? `Order ${order.value.order_number} — Admin` : 'Order — Admin'),
  robots: 'noindex',
})

const form = reactive({
  status: '',
  payment_status: '',
  delivery_charge: 0,
  shipping_method: '',
  notes: '',
  status_note: '',
})

watch(
  order,
  (value) => {
    if (!value) return
    Object.assign(form, {
      status: value.status || 'pending',
      payment_status: value.payment_status || 'pending',
      delivery_charge: value.pricing?.delivery_charge ?? 0,
      shipping_method: value.shipping?.method || '',
      notes: value.notes || '',
      status_note: '',
    })
  },
  { immediate: true },
)

async function save() {
  if (!order.value) return
  const result = await run(
    () =>
      apiData('/admin/orders/update', {
        method: 'POST',
        body: {
          id: order.value!.id,
          status: form.status,
          payment_status: form.payment_status,
          delivery_charge: form.delivery_charge,
          shipping_method: form.shipping_method,
          notes: form.notes,
          status_note: form.status_note,
        },
      }),
    'Order updated.',
  )
  if (result === undefined) return
  form.status_note = ''
  await refresh()
}

const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned', 'refunded']
const paymentStatuses = ['pending', 'unpaid', 'paid', 'failed', 'refunded']
</script>

<template>
  <div>
    <AdminPageHeader
      :title="order ? `Order ${order.order_number}` : 'Order'"
      :subtitle="order ? `Placed ${formatDate(order.created_at, true)} · ${order.customer?.name}` : 'Order details and fulfilment.'"
      icon="shopping-bag"
    >
      <NuxtLink to="/admin/orders" class="btn-secondary">
        <BaseIcon name="arrow-left" :size="16" /> All orders
      </NuxtLink>
      <template v-if="order">
        <StatusBadge :status="order.payment_status" />
        <StatusBadge :status="order.status" />
      </template>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-3">
      <div class="card h-32 animate-pulse bg-gray-50" />
      <div class="card h-64 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load this order" :message="error.message" @retry="refresh" />

    <div v-else-if="order" class="grid gap-4 xl:grid-cols-3">
      <div class="space-y-4 xl:col-span-2">
        <section class="card">
          <div class="border-b border-gray-100 px-5 py-3.5">
            <h2 class="text-sm font-bold text-gray-900">Items</h2>
            <p class="text-xs text-gray-500">
              {{ order.summary?.total_items ?? 0 }} line{{ (order.summary?.total_items ?? 0) === 1 ? '' : 's' }} ·
              {{ order.summary?.total_quantity ?? 0 }} unit{{ (order.summary?.total_quantity ?? 0) === 1 ? '' : 's' }}
            </p>
          </div>
          <div class="divide-y divide-gray-50">
            <div v-for="item in order.items" :key="`product-${item.id}`" class="flex flex-wrap items-center gap-3 px-5 py-3">
              <img :src="mediaUrl(item.image)" :alt="item.name" class="h-14 w-14 rounded-xl object-cover" @error="imageFallback">
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-gray-800">{{ item.name }}</p>
                <p class="text-[11px] text-gray-400">
                  <span v-if="item.sku">SKU {{ item.sku }}</span>
                  <span v-for="attribute in item.attributes" :key="attribute.attribute" class="ml-1">
                    · {{ attribute.attribute }}: {{ attribute.value }}
                  </span>
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">{{ formatMoney(item.line_total) }}</p>
                <p class="text-[11px] text-gray-400">{{ formatMoney(item.unit_price) }} × {{ item.quantity }}</p>
              </div>
            </div>
            <div v-for="item in order.course_items" :key="`course-${item.id}`" class="flex flex-wrap items-center gap-3 px-5 py-3">
              <img :src="mediaUrl(item.image)" :alt="item.name" class="h-14 w-14 rounded-xl object-cover" @error="imageFallback">
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-gray-800">{{ item.name }}</p>
                <p class="text-[11px] text-gray-400">
                  Course
                  <span v-if="item.access_days !== null"> · {{ item.access_days === 0 ? 'Lifetime access' : `${item.access_days} days access` }}</span>
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">{{ formatMoney(item.line_total) }}</p>
                <p class="text-[11px] text-gray-400">{{ formatMoney(item.unit_price) }}</p>
              </div>
            </div>
            <p v-if="!order.items?.length && !order.course_items?.length" class="px-5 py-6 text-center text-xs text-gray-400">
              This order has no line items.
            </p>
          </div>
          <div class="border-t border-gray-100 bg-gray-50/60 px-5 py-3">
            <dl class="ml-auto max-w-xs space-y-1 text-sm">
              <div class="flex items-center justify-between gap-4">
                <dt class="text-gray-500">Products</dt>
                <dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.products_subtotal) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-gray-500">Courses</dt>
                <dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.courses_subtotal) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4">
                <dt class="text-gray-500">Delivery</dt>
                <dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.delivery_charge) }}</dd>
              </div>
              <div v-if="Number(order.pricing?.discount) > 0" class="flex items-center justify-between gap-4">
                <dt class="text-gray-500">
                  Discount
                  <span v-if="order.pricing?.coupon_code" class="text-[11px]">({{ order.pricing.coupon_code }})</span>
                </dt>
                <dd class="font-semibold text-emerald-600">−{{ formatMoney(order.pricing?.discount) }}</dd>
              </div>
              <div class="flex items-center justify-between gap-4 border-t border-gray-200 pt-1.5 text-base">
                <dt class="font-bold text-gray-900">Total</dt>
                <dd class="font-extrabold text-oc-primary">{{ formatMoney(order.pricing?.total) }}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section class="card p-5">
          <h2 class="mb-4 text-sm font-bold text-gray-900">Status history</h2>
          <EmptyState v-if="!order.status_history?.length" icon="clock" title="No history yet" message="Status changes will be recorded here." />
          <ol v-else class="relative space-y-4 border-l border-gray-200 pl-5">
            <li v-for="(history, index) in order.status_history" :key="`${history.status}-${index}`" class="relative">
              <span class="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white" :class="index === order.status_history.length - 1 ? 'bg-oc-primary' : 'bg-gray-300'" />
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-sm font-semibold text-gray-800">{{ history.label || statusLabel(history.status) }}</p>
                <StatusBadge :status="history.status" />
              </div>
              <p class="text-[11px] text-gray-400">
                {{ formatDate(history.created_at, true) }}
                <span v-if="history.created_by"> · by {{ history.created_by }}</span>
              </p>
              <p v-if="history.note" class="mt-0.5 text-xs text-gray-600">{{ history.note }}</p>
            </li>
          </ol>
        </section>
      </div>

      <div class="space-y-4">
        <section class="card p-5">
          <h2 class="mb-3 text-sm font-bold text-gray-900">Customer</h2>
          <dl class="space-y-2 text-sm">
            <div>
              <dt class="text-[11px] uppercase tracking-wide text-gray-400">Name</dt>
              <dd class="font-semibold text-gray-800">{{ order.customer?.name || '—' }}</dd>
            </div>
            <div>
              <dt class="text-[11px] uppercase tracking-wide text-gray-400">Email</dt>
              <dd class="text-gray-700">{{ order.customer?.email || '—' }}</dd>
            </div>
            <div>
              <dt class="text-[11px] uppercase tracking-wide text-gray-400">Phone</dt>
              <dd class="text-gray-700">{{ order.customer?.phone || '—' }} <span v-if="order.customer?.phone_alt">/ {{ order.customer.phone_alt }}</span></dd>
            </div>
            <div v-if="order.user">
              <dt class="text-[11px] uppercase tracking-wide text-gray-400">Account</dt>
              <dd class="text-gray-700">{{ order.user.name }} (#{{ order.user.id }})</dd>
            </div>
          </dl>
        </section>

        <section class="card p-5">
          <h2 class="mb-3 text-sm font-bold text-gray-900">Shipping address</h2>
          <address class="text-sm not-italic leading-relaxed text-gray-600">
            {{ order.shipping_address?.line1 || '—' }}<br>
            <template v-if="order.shipping_address?.line2">{{ order.shipping_address.line2 }}<br></template>
            {{ order.shipping_address?.city }}<span v-if="order.shipping_address?.district">, {{ order.shipping_address.district }}</span><br>
            {{ order.shipping_address?.country }}
          </address>
          <p class="mt-3 text-xs text-gray-500">
            Method: {{ order.shipping?.method || '—' }}
            <span v-if="order.shipping?.estimated_delivery_days"> · {{ order.shipping.estimated_delivery_days }} days</span>
          </p>
        </section>

        <section class="card p-5">
          <h2 class="mb-3 text-sm font-bold text-gray-900">Update order</h2>
          <form class="space-y-3" @submit.prevent="save">
            <div>
              <label class="field-label" for="order-status">Order status</label>
              <select id="order-status" v-model="form.status" class="field-input">
                <option v-for="item in statuses" :key="item" :value="item">{{ statusLabel(item) }}</option>
              </select>
              <p v-if="fieldError('status')" class="field-error">{{ fieldError('status') }}</p>
            </div>
            <div>
              <label class="field-label" for="order-payment">Payment status</label>
              <select id="order-payment" v-model="form.payment_status" class="field-input">
                <option v-for="item in paymentStatuses" :key="item" :value="item">{{ statusLabel(item) }}</option>
              </select>
              <p v-if="fieldError('payment_status')" class="field-error">{{ fieldError('payment_status') }}</p>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label" for="order-delivery">Delivery charge</label>
                <input id="order-delivery" v-model.number="form.delivery_charge" type="number" min="0" step="0.01" class="field-input">
              </div>
              <div>
                <label class="field-label" for="order-method">Shipping method</label>
                <input id="order-method" v-model="form.shipping_method" type="text" class="field-input" placeholder="Courier">
              </div>
            </div>
            <div>
              <label class="field-label" for="order-note">Status note (optional)</label>
              <input id="order-note" v-model="form.status_note" type="text" class="field-input" placeholder="Visible in the status history">
            </div>
            <div>
              <label class="field-label" for="order-notes">Internal notes</label>
              <textarea id="order-notes" v-model="form.notes" rows="3" class="field-input" placeholder="Packing instructions, payment reference…" />
            </div>
            <button type="submit" class="btn-primary w-full" :disabled="busy">
              <BaseIcon v-if="busy" name="refresh" :size="15" class="animate-spin" />
              <BaseIcon v-else name="save" :size="15" />
              Save order
            </button>
            <p class="text-[11px] text-gray-400">
              Marking a course order cancelled or refunded revokes course access. Paid/confirmed orders grant access.
            </p>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>
