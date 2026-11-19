<script setup lang="ts">
import type { Order } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const id = Number(route.params.id)
const { apiData } = useApi()

const { data: order, pending, error, refresh } = await useAsyncData(`order-${id}`, async () => {
  const orders = await apiData<Order[]>('/orders')
  return (orders ?? []).find((item) => Number(item.id) === id) ?? null
})

const justPlaced = computed(() => route.query.success === '1')

const pipeline = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']

const currentStep = computed(() => {
  if (!order.value) return -1
  if (['cancelled', 'returned', 'refunded'].includes(order.value.status)) return -1
  return pipeline.indexOf(order.value.status)
})

const isStopped = computed(() => !!order.value && ['cancelled', 'returned', 'refunded'].includes(order.value.status))

function itemAttributes(attributes?: Array<{ attribute: string; value: string }> | null) {
  return (attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(' · ')
}

useSeoMeta({
  title: () => (order.value ? `${order.value.order_number} — Shikhor Academy` : 'Order — Shikhor Academy'),
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <NuxtLink to="/orders" class="hover:text-oc-primary">My orders</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">{{ order?.order_number || 'Order' }}</span>
    </nav>

    <div v-if="pending" class="space-y-4">
      <div class="card h-32 animate-pulse bg-gray-100" />
      <div class="card h-64 animate-pulse bg-gray-100" />
    </div>

    <ErrorState v-else-if="error" title="Could not load this order" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!order"
      icon="shopping-bag"
      title="Order not found"
      message="This order does not exist or does not belong to your account."
      action-label="Back to my orders"
      action-to="/orders"
    />

    <template v-else>
      <div
        v-if="justPlaced"
        class="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
      >
        <BaseIcon name="check-circle" :size="18" class="mt-0.5 shrink-0" />
        <span>Thank you! Your order has been placed. Payment is confirmed manually by an administrator.</span>
      </div>

      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Order</p>
          <h1 class="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">{{ order.order_number }}</h1>
          <p class="mt-1 text-sm text-gray-500">Placed {{ formatDate(order.created_at, true) }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <StatusBadge :status="order.payment_status" />
          <StatusBadge :status="order.status" />
          <button type="button" class="btn-ghost" :disabled="pending" aria-label="Refresh order" @click="refresh">
            <BaseIcon name="refresh" :size="16" /> Refresh
          </button>
        </div>
      </div>

      <section class="card mt-6 p-5">
        <h2 class="text-sm font-bold text-gray-900">Progress</h2>
        <ol v-if="!isStopped" class="mt-4 grid grid-cols-5 gap-1">
          <li v-for="(step, index) in pipeline" :key="step" class="flex flex-col items-center text-center">
            <span
              class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
              :class="index <= currentStep ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-400'"
            >
              <BaseIcon v-if="index < currentStep" name="check" :size="15" />
              <template v-else>{{ index + 1 }}</template>
            </span>
            <span class="mt-1.5 text-[11px] font-medium" :class="index <= currentStep ? 'text-gray-800' : 'text-gray-400'">
              {{ statusLabel(step) }}
            </span>
          </li>
        </ol>
        <p v-else class="mt-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          This order is {{ statusLabel(order.status).toLowerCase() }}. Contact support if you need help.
        </p>

        <div v-if="order.status_history?.length" class="mt-5 space-y-3 border-t border-gray-100 pt-4">
          <div v-for="(entry, index) in order.status_history" :key="index" class="flex gap-3">
            <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-oc-primary" />
            <div>
              <p class="text-sm font-semibold text-gray-800">{{ entry.label || statusLabel(entry.status) }}</p>
              <p v-if="entry.note" class="text-xs text-gray-500">{{ entry.note }}</p>
              <p class="text-[11px] text-gray-400">{{ formatDate(entry.created_at, true) }}</p>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div class="space-y-6">
          <section v-if="order.items?.length" class="card overflow-hidden">
            <h2 class="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">Products</h2>
            <ul class="divide-y divide-gray-100">
              <li v-for="item in order.items" :key="item.id" class="flex gap-4 p-4">
                <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <img :src="mediaUrl(item.image)" :alt="item.name" class="h-full w-full object-cover" @error="imageFallback" >
                </div>
                <div class="min-w-0 flex-1">
                  <NuxtLink :to="`/store/${item.slug}`" class="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-oc-primary">{{ item.name }}</NuxtLink>
                  <p v-if="itemAttributes(item.attributes)" class="mt-0.5 text-xs text-gray-500">{{ itemAttributes(item.attributes) }}</p>
                  <p class="mt-1 text-xs text-gray-500">{{ formatMoney(item.unit_price) }} × {{ item.quantity }}</p>
                </div>
                <span class="text-sm font-bold text-gray-900">{{ formatMoney(item.line_total) }}</span>
              </li>
            </ul>
          </section>

          <section v-if="order.course_items?.length" class="card overflow-hidden">
            <h2 class="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">Courses</h2>
            <ul class="divide-y divide-gray-100">
              <li v-for="item in order.course_items" :key="item.id" class="flex gap-4 p-4">
                <div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                  <img :src="mediaUrl(item.image)" :alt="item.name" class="h-full w-full object-cover" @error="imageFallback" >
                </div>
                <div class="min-w-0 flex-1">
                  <NuxtLink :to="`/courses/${item.slug}`" class="line-clamp-2 text-sm font-semibold text-gray-800 hover:text-oc-primary">{{ item.name }}</NuxtLink>
                  <p class="mt-0.5 text-xs text-gray-500">{{ item.access_days === 0 ? 'Lifetime access' : `${item.access_days ?? 365} days access` }}</p>
                  <NuxtLink to="/my-courses" class="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-oc-primary hover:underline">
                    Go to my courses <BaseIcon name="arrow-right" :size="12" />
                  </NuxtLink>
                </div>
                <span class="text-sm font-bold text-gray-900">{{ formatMoney(item.line_total) }}</span>
              </li>
            </ul>
          </section>

          <section v-if="order.notes" class="card p-5">
            <h2 class="text-sm font-bold text-gray-900">Order notes</h2>
            <p class="mt-2 text-sm text-gray-600">{{ order.notes }}</p>
          </section>
        </div>

        <aside class="space-y-4">
          <section class="card p-5">
            <h2 class="text-sm font-bold text-gray-900">Payment summary</h2>
            <dl class="mt-3 space-y-2 text-sm text-gray-600">
              <div class="flex justify-between gap-3"><dt>Products</dt><dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.products_subtotal) }}</dd></div>
              <div class="flex justify-between gap-3"><dt>Courses</dt><dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.courses_subtotal) }}</dd></div>
              <div class="flex justify-between gap-3"><dt>Subtotal</dt><dd class="font-semibold text-gray-800">{{ formatMoney(order.pricing?.subtotal) }}</dd></div>
              <div v-if="order.pricing?.discount" class="flex justify-between gap-3 text-emerald-600">
                <dt>Discount{{ order.pricing.coupon_code ? ` (${order.pricing.coupon_code})` : '' }}</dt>
                <dd class="font-semibold">−{{ formatMoney(order.pricing.discount) }}</dd>
              </div>
              <div class="flex justify-between gap-3"><dt>Delivery</dt><dd class="font-semibold text-gray-800">{{ order.pricing?.delivery_charge ? formatMoney(order.pricing.delivery_charge) : 'Free' }}</dd></div>
              <div class="flex items-baseline justify-between gap-3 border-t border-gray-100 pt-3">
                <dt class="font-semibold text-gray-700">Total</dt>
                <dd class="text-xl font-extrabold text-oc-primary">{{ formatMoney(order.pricing?.total) }}</dd>
              </div>
            </dl>
            <p class="mt-3 text-xs text-gray-500">
              Method: <span class="font-semibold text-gray-700">{{ order.payment_method || 'Not set' }}</span>
            </p>
          </section>

          <section class="card p-5">
            <h2 class="text-sm font-bold text-gray-900">Customer</h2>
            <div class="mt-3 space-y-1.5 text-sm text-gray-600">
              <p class="font-semibold text-gray-800">{{ order.customer?.name }}</p>
              <p class="flex items-center gap-2"><BaseIcon name="mail" :size="14" class="text-gray-400" /> {{ order.customer?.email }}</p>
              <p class="flex items-center gap-2"><BaseIcon name="phone" :size="14" class="text-gray-400" /> {{ order.customer?.phone }}</p>
              <p v-if="order.customer?.phone_alt" class="flex items-center gap-2"><BaseIcon name="phone" :size="14" class="text-gray-400" /> {{ order.customer.phone_alt }}</p>
            </div>
          </section>

          <section v-if="order.shipping_address?.line1" class="card p-5">
            <h2 class="text-sm font-bold text-gray-900">Shipping address</h2>
            <p class="mt-2 text-sm leading-6 text-gray-600">
              {{ order.shipping_address.line1 }}<br>
              <template v-if="order.shipping_address.line2">{{ order.shipping_address.line2 }}<br></template>
              {{ order.shipping_address.city }}, {{ order.shipping_address.district }}<br>
              {{ order.shipping_address.country }}
            </p>
            <p v-if="order.shipping?.method" class="mt-2 text-xs text-gray-500">Delivery: {{ order.shipping.method }}</p>
          </section>

          <NuxtLink to="/orders" class="btn-secondary w-full">Back to my orders</NuxtLink>
        </aside>
      </div>
    </template>
  </div>
</template>
