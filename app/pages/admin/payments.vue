<script setup lang="ts">
import type { Paginator } from '~/utils/types'

interface AdminPayment {
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
  user: { id: number; name: string; email: string } | null
  transaction_id: string | null
  failure_reason: string | null
}

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Payments — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { run, busy, fieldError, resetErrors } = useFormHandler()

const status = ref('')
const provider = ref('')
const page = ref(1)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-payments',
  () =>
    apiData<Paginator<AdminPayment>>('/admin/payments', {
      query: { per_page: 20, page: page.value, status: status.value || undefined, provider: provider.value || undefined },
    }),
  { watch: [page, status, provider] },
)

const payments = computed(() => data.value?.data ?? [])

watch([status, provider], () => (page.value = 1))

const refundModal = ref(false)
const target = ref<AdminPayment | null>(null)
const refundForm = reactive({ amount: null as number | null, reason: '' })

const refundable = computed(() => (target.value ? Number(target.value.amount) - Number(target.value.refunded_amount) : 0))

function openRefund(payment: AdminPayment) {
  target.value = payment
  Object.assign(refundForm, { amount: null, reason: '' })
  resetErrors()
  refundModal.value = true
}

async function submitRefund() {
  if (!target.value) return
  const result = await run(
    () =>
      apiData(`/admin/payments/${target.value!.id}/refund`, {
        method: 'POST',
        body: { amount: refundForm.amount || undefined, reason: refundForm.reason || undefined },
      }),
    'Refund processed.',
  )
  if (result === undefined) return
  refundModal.value = false
  await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Payments" subtitle="Verified payments, gateway status and refunds." icon="credit-card" />

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="md:col-span-3">
          <select v-model="status" class="field-input" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="successful">Successful</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
        <div class="md:col-span-3">
          <select v-model="provider" class="field-input" aria-label="Filter by provider">
            <option value="">All providers</option>
            <option value="stripe">Stripe</option>
            <option value="manual">Manual</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 6" :key="i" class="card h-14 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load payments" :message="error.message" @retry="refresh" />

    <EmptyState v-else-if="!payments.length" icon="credit-card" title="No payments found" message="Payments appear here once students start paying for orders." />

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[860px] text-left text-sm">
          <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
            <tr>
              <th class="px-4 py-2.5 font-semibold">Order</th>
              <th class="px-3 py-2.5 font-semibold">Student</th>
              <th class="px-3 py-2.5 font-semibold">Provider</th>
              <th class="px-3 py-2.5 font-semibold">Amount</th>
              <th class="px-3 py-2.5 font-semibold">Refunded</th>
              <th class="px-3 py-2.5 font-semibold">Status</th>
              <th class="px-3 py-2.5 font-semibold">Date</th>
              <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50/60">
              <td class="px-4 py-3">
                <NuxtLink :to="`/admin/orders/${payment.order_id}`" class="font-semibold text-oc-primary hover:underline">
                  {{ payment.order_number || `#${payment.order_id}` }}
                </NuxtLink>
              </td>
              <td class="px-3 py-3">
                <p class="font-medium text-gray-800">{{ payment.user?.name || '—' }}</p>
                <p class="text-[11px] text-gray-400">{{ payment.user?.email }}</p>
              </td>
              <td class="px-3 py-3 capitalize text-gray-600">{{ payment.provider }}</td>
              <td class="px-3 py-3 font-semibold text-gray-900">{{ formatMoney(payment.amount, payment.currency) }}</td>
              <td class="px-3 py-3 text-gray-600">{{ Number(payment.refunded_amount) ? formatMoney(payment.refunded_amount, payment.currency) : '—' }}</td>
              <td class="px-3 py-3">
                <StatusBadge :status="payment.status" />
                <p v-if="payment.failure_reason" class="mt-0.5 text-[11px] text-rose-500">{{ payment.failure_reason }}</p>
              </td>
              <td class="px-3 py-3 text-xs text-gray-500">{{ formatDate(payment.paid_at || payment.created_at, true) }}</td>
              <td class="px-4 py-3 text-right">
                <button
                  v-if="payment.status === 'successful' && Number(payment.amount) > Number(payment.refunded_amount)"
                  type="button"
                  class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                  @click="openRefund(payment)"
                >
                  Refund
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="flex justify-center pt-4">
      <PaginationLinks :current-page="data?.current_page ?? 1" :last-page="data?.last_page ?? 1" :total="data?.total" @change="(value) => (page = value)" />
    </div>

    <AppModal :open="refundModal" title="Refund payment" size="sm" @close="refundModal = false">
      <form class="space-y-4" @submit.prevent="submitRefund">
        <p class="text-sm text-gray-600">
          Refundable: <span class="font-bold text-gray-900">{{ formatMoney(refundable, target?.currency) }}</span>.
          A full refund removes the student's course access and releases the coupon.
        </p>
        <div>
          <label class="field-label" for="refund-amount">Amount (leave empty for full refund)</label>
          <input id="refund-amount" v-model.number="refundForm.amount" type="number" min="0.01" step="0.01" :max="refundable" class="field-input">
          <p v-if="fieldError('amount')" class="field-error">{{ fieldError('amount') }}</p>
        </div>
        <div>
          <label class="field-label" for="refund-reason">Reason</label>
          <input id="refund-reason" v-model="refundForm.reason" class="field-input" maxlength="500">
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="refundModal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="submitRefund">Process refund</button>
      </template>
    </AppModal>
  </div>
</template>
