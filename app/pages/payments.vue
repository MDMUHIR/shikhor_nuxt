<script setup lang="ts">
import type { Paginator } from '~/utils/types'

interface MyPayment {
  id: number
  order_id: number
  order_number: string | null
  provider: string
  status: string
  amount: number
  refunded_amount: number
  currency: string
  paid_at: string | null
  created_at: string
}

definePageMeta({ middleware: 'auth' })

useSeoMeta({ title: 'Payment history — Shikhor Academy', robots: 'noindex' })

const { apiData } = useApi()
const page = ref(1)

const { data, pending, error, refresh } = await useAsyncData(
  'my-payments',
  () => apiData<Paginator<MyPayment>>('/my/payments', { query: { page: page.value, per_page: 15 } }),
  { watch: [page] },
)

const payments = computed(() => data.value?.data ?? [])
</script>

<template>
  <div class="mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10">
    <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Payment history</h1>
    <p class="mt-1 text-sm text-gray-500">Every payment attempt for your orders.</p>

    <div v-if="pending" class="mt-6 space-y-2">
      <div v-for="i in 4" :key="i" class="card h-16 animate-pulse bg-gray-50" />
    </div>
    <ErrorState v-else-if="error" class="mt-6" title="Could not load payments" :message="error.message" @retry="refresh" />
    <EmptyState v-else-if="!payments.length" class="mt-6" icon="credit-card" title="No payments yet" message="Payments for your orders will appear here." action-label="Browse courses" action-to="/courses" />

    <ul v-else class="mt-6 space-y-2">
      <li v-for="payment in payments" :key="payment.id" class="card flex flex-wrap items-center justify-between gap-3 p-4">
        <div>
          <NuxtLink :to="`/orders/${payment.order_id}`" class="text-sm font-semibold text-oc-primary hover:underline">{{ payment.order_number || `Order #${payment.order_id}` }}</NuxtLink>
          <p class="text-[11px] text-gray-400"><span class="capitalize">{{ payment.provider }}</span> · {{ formatDate(payment.paid_at || payment.created_at, true) }}</p>
        </div>
        <div class="flex items-center gap-3">
          <StatusBadge :status="payment.status" />
          <div class="text-right">
            <p class="text-sm font-bold text-gray-900">{{ formatMoney(payment.amount, payment.currency) }}</p>
            <p v-if="Number(payment.refunded_amount)" class="text-[11px] text-rose-500">Refunded {{ formatMoney(payment.refunded_amount, payment.currency) }}</p>
          </div>
        </div>
      </li>
    </ul>

    <div class="flex justify-center pt-4">
      <PaginationLinks :current-page="data?.current_page ?? 1" :last-page="data?.last_page ?? 1" @change="(value) => (page = value)" />
    </div>
  </div>
</template>
