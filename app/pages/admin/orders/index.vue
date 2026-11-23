<script setup lang="ts">
import type { AdminOrder } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Orders — Admin', robots: 'noindex' })

const { apiData } = useApi()

const status = ref('')
const payment = ref('')
const search = ref('')
const page = ref(1)
const perPage = 20

const { data: orders, pending, error, refresh } = await useAsyncData('admin-orders', () =>
  apiData<AdminOrder[]>('/admin/orders'),
)

const allOrders = computed(() => orders.value ?? [])

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  return allOrders.value.filter((order) => {
    if (status.value && order.status !== status.value) return false
    if (payment.value && order.payment_status !== payment.value) return false
    if (!term) return true
    return (
      order.order_number.toLowerCase().includes(term) ||
      (order.customer?.name || '').toLowerCase().includes(term) ||
      (order.customer?.email || '').toLowerCase().includes(term) ||
      (order.customer?.phone || '').includes(term)
    )
  })
})

const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)))
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))

watch([status, payment, search], () => (page.value = 1))

const totals = computed(() => {
  const list = allOrders.value
  const revenue = list
    .filter((order) => ['paid', 'partially_refunded'].includes(order.payment_status))
    .reduce((sum, order) => sum + Number(order.pricing?.total ?? 0) - Number(order.pricing?.refunded_amount ?? 0), 0)
  return {
    count: list.length,
    revenue,
    pending: list.filter((order) => order.status === 'pending').length,
    unpaid: list.filter((order) => order.payment_status !== 'paid').length,
  }
})

function itemCount(order: AdminOrder) {
  return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0)
}

function clearFilters() {
  status.value = ''
  payment.value = ''
  search.value = ''
  page.value = 1
}

const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'enrolled', 'cancelled', 'returned', 'refunded']
const paymentStatuses = ['pending', 'paid', 'failed', 'cancelled', 'partially_refunded', 'refunded']
</script>

<template>
  <div>
    <AdminPageHeader title="Orders" subtitle="Review payments, follow delivery and manage order status." icon="shopping-bag">
      <button type="button" class="btn-secondary" :disabled="pending" @click="refresh()">
        <BaseIcon name="refresh" :size="15" /> Refresh
      </button>
    </AdminPageHeader>

    <div class="mb-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
      <AdminStat label="Orders" :value="formatNumber(totals.count)" icon="shopping-bag" tone="blue" />
      <AdminStat label="Revenue" :value="formatMoney(totals.revenue)" icon="chart" tone="emerald" hint="Paid orders, net of refunds" />
      <AdminStat label="Awaiting confirmation" :value="formatNumber(totals.pending)" icon="clock" tone="amber" />
      <AdminStat label="Payment outstanding" :value="formatNumber(totals.unpaid)" icon="credit-card" tone="rose" />
    </div>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="relative md:col-span-5">
          <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="search" type="search" class="field-input pl-9" placeholder="Search order number, name, email or phone…" aria-label="Search orders">
        </div>
        <div class="md:col-span-3">
          <select v-model="status" class="field-input" aria-label="Filter by order status">
            <option value="">All order statuses</option>
            <option v-for="item in statuses" :key="item" :value="item">{{ statusLabel(item) }}</option>
          </select>
        </div>
        <div class="md:col-span-3">
          <select v-model="payment" class="field-input" aria-label="Filter by payment status">
            <option value="">All payment statuses</option>
            <option v-for="item in paymentStatuses" :key="item" :value="item">{{ statusLabel(item) }}</option>
          </select>
        </div>
        <div class="md:col-span-1">
          <button type="button" class="btn-secondary w-full" aria-label="Clear filters" @click="clearFilters">
            <BaseIcon name="refresh" :size="15" />
          </button>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 6" :key="i" class="card h-16 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load orders" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!filtered.length"
      icon="shopping-bag"
      :title="allOrders.length ? 'No orders match these filters' : 'No orders yet'"
      :message="allOrders.length ? 'Try clearing the search or status filters.' : 'Orders placed in the store or for courses will appear here.'"
      :action-label="allOrders.length ? 'Clear filters' : undefined"
      @action="clearFilters"
    />

    <template v-else>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[960px] text-left text-sm">
            <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
              <tr>
                <th class="px-4 py-2.5 font-semibold">Order</th>
                <th class="px-3 py-2.5 font-semibold">Customer</th>
                <th class="px-3 py-2.5 font-semibold">Items</th>
                <th class="px-3 py-2.5 font-semibold">Total</th>
                <th class="px-3 py-2.5 font-semibold">Payment</th>
                <th class="px-3 py-2.5 font-semibold">Status</th>
                <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="order in paged" :key="order.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
                  <p class="text-[11px] text-gray-400">{{ formatDate(order.created_at, true) }}</p>
                </td>
                <td class="px-3 py-3">
                  <p class="text-gray-700">{{ order.customer?.name || order.user?.name || '—' }}</p>
                  <p class="text-[11px] text-gray-400">{{ order.customer?.phone || order.customer?.email }}</p>
                </td>
                <td class="px-3 py-3 text-gray-600">
                  {{ itemCount(order) }} item{{ itemCount(order) === 1 ? '' : 's' }}
                  <p class="text-[11px] text-gray-400">
                    <template v-if="order.items?.length">{{ order.items.length }} product{{ order.items.length === 1 ? '' : 's' }}</template>
                    <template v-if="order.items?.length && order.course_items?.length"> · </template>
                    <template v-if="order.course_items?.length">{{ order.course_items.length }} course{{ order.course_items.length === 1 ? '' : 's' }}</template>
                  </p>
                </td>
                <td class="px-3 py-3 font-semibold text-gray-900">{{ formatMoney(order.pricing?.total) }}</td>
                <td class="px-3 py-3"><StatusBadge :status="order.payment_status" /></td>
                <td class="px-3 py-3"><StatusBadge :status="order.status" /></td>
                <td class="px-4 py-3 text-right">
                  <NuxtLink :to="`/admin/orders/${order.id}`" class="btn-secondary !px-2.5 !py-1.5 text-xs">
                    <BaseIcon name="eye" :size="14" /> Manage
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-5 flex justify-center">
        <PaginationLinks :current-page="page" :last-page="lastPage" :total="filtered.length" @change="(value) => (page = value)" />
      </div>
    </template>
  </div>
</template>
