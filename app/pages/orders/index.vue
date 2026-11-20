<script setup lang="ts">
import type { Order } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const { apiData } = useApi()

const { data: orders, pending, error, refresh } = await useAsyncData('orders-page', async () => {
  const list = await apiData<Order[]>('/orders')
  return list ?? []
})

const filter = ref<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all')
const justPlaced = computed(() => route.query.success === '1')

const filtered = computed(() => {
  const list = orders.value ?? []
  if (filter.value === 'all') return list
  if (filter.value === 'processing') {
    return list.filter((order) => ['confirmed', 'processing', 'shipped'].includes(order.status))
  }
  if (filter.value === 'completed') return list.filter((order) => order.status === 'delivered')
  return list.filter((order) => order.status === filter.value)
})

const filters: Array<{ value: typeof filter.value; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'In progress' },
  { value: 'completed', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
]

function itemCount(order: Order) {
  return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0)
}

function isCourseOnly(order: Order) {
  return (order.course_items?.length ?? 0) > 0 && !(order.items?.length ?? 0)
}

function displayStatus(order: Order) {
  if (isCourseOnly(order) && ['shipped', 'delivered', 'completed'].includes(order.status)) return 'enrolled'
  return order.status
}

useSeoMeta({ title: 'My orders — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">My orders</span>
    </nav>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My orders</h1>
        <p class="mt-1 text-sm text-gray-500">Track payments, delivery and course access from a single place.</p>
      </div>
      <NuxtLink to="/store" class="btn-secondary hidden sm:inline-flex">Continue shopping</NuxtLink>
    </div>

    <div
      v-if="justPlaced"
      class="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
    >
      <BaseIcon name="check-circle" :size="18" class="mt-0.5 shrink-0" />
      <span>Your order was placed. An administrator will confirm the payment shortly.</span>
    </div>

    <div class="mt-5 flex flex-wrap gap-1.5">
      <button
        v-for="item in filters"
        :key="item.value"
        type="button"
        class="rounded-full px-3.5 py-1.5 text-xs font-semibold transition"
        :class="filter === item.value ? 'bg-oc-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
        @click="filter = item.value"
      >
        {{ item.label }}
      </button>
    </div>

    <div v-if="pending" class="mt-5 space-y-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse p-5">
        <div class="flex items-center justify-between">
          <div class="h-4 w-40 rounded bg-gray-200" />
          <div class="h-6 w-24 rounded bg-gray-200" />
        </div>
        <div class="mt-3 h-4 w-2/3 rounded bg-gray-200" />
      </div>
    </div>

    <ErrorState v-else-if="error" class="mt-5" title="Could not load your orders" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!orders?.length"
      class="mt-5"
      icon="shopping-bag"
      title="No orders yet"
      message="When you buy a course or a product, your orders will appear here."
      action-label="Browse courses"
      action-to="/courses"
    />

    <EmptyState
      v-else-if="!filtered.length"
      class="mt-5"
      icon="filter"
      title="No orders in this view"
      message="Try a different filter to see your other orders."
      action-label="Show all orders"
      @action="filter = 'all'"
    />

    <div v-else class="mt-5 space-y-3">
      <NuxtLink
        v-for="order in filtered"
        :key="order.id"
        :to="`/orders/${order.id}`"
        class="card block p-5 transition hover:border-oc-primary/30 hover:shadow-md"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-sm font-bold text-gray-900">{{ order.order_number }}</p>
            <p class="mt-0.5 text-xs text-gray-500">Placed {{ formatDate(order.created_at, true) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <StatusBadge :status="order.payment_status" />
            <StatusBadge :status="displayStatus(order)" />
          </div>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500">
          <span class="inline-flex items-center gap-1.5"><BaseIcon name="shopping-bag" :size="14" /> {{ itemCount(order) }} item{{ itemCount(order) === 1 ? '' : 's' }}</span>
          <span class="inline-flex items-center gap-1.5"><BaseIcon name="credit-card" :size="14" /> {{ order.payment_method || 'Payment pending' }}</span>
          <span v-if="order.course_items?.length" class="inline-flex items-center gap-1.5"><BaseIcon name="book-open" :size="14" /> {{ order.course_items.length }} course{{ order.course_items.length === 1 ? '' : 's' }}</span>
        </div>

        <div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <span class="text-xs text-gray-500">Total</span>
          <span class="text-lg font-extrabold text-oc-primary">{{ formatMoney(order.pricing?.total) }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
