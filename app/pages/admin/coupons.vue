<script setup lang="ts">
import type { Coupon } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Coupons — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: coupons, pending, error, refresh } = await useAsyncData('admin-coupons', () =>
  apiData<Coupon[]>('/admin/coupon'),
)

const list = computed(() => coupons.value ?? [])

const modalOpen = ref(false)
const editing = ref<Coupon | null>(null)
const blank = () => ({
  code: '',
  type: 'percentage' as 'fixed' | 'percentage',
  discount: 10,
  is_active: true,
  applies_to: 'all' as 'all' | 'products' | 'courses',
  starts_at: '',
  expires_at: '',
  min_purchase: null as number | null,
  max_discount: null as number | null,
  usage_limit: null as number | null,
  per_user_limit: null as number | null,
})
const form = reactive(blank())
const toLocal = (value?: string | null) => (value ? value.slice(0, 16) : '')

function openCreate() {
  editing.value = null
  Object.assign(form, blank())
  resetErrors()
  modalOpen.value = true
}

function openEdit(coupon: Coupon) {
  editing.value = coupon
  Object.assign(form, {
    code: coupon.code,
    type: coupon.type,
    discount: coupon.discount,
    is_active: coupon.is_active ?? true,
    applies_to: coupon.applies_to ?? 'all',
    starts_at: toLocal(coupon.starts_at),
    expires_at: toLocal(coupon.expires_at),
    min_purchase: coupon.min_purchase ?? null,
    max_discount: coupon.max_discount ?? null,
    usage_limit: coupon.usage_limit ?? null,
    per_user_limit: coupon.per_user_limit ?? null,
  })
  resetErrors()
  modalOpen.value = true
}

async function save() {
  const result = await run(
    () =>
      apiData(`/admin/coupon/${editing.value ? 'update' : 'add'}`, {
        method: 'POST',
        body: {
          ...(editing.value ? { id: editing.value.id } : {}),
          ...form,
          starts_at: form.starts_at || null,
          expires_at: form.expires_at || null,
        },
      }),
    editing.value ? 'Coupon updated.' : 'Coupon created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(coupon: Coupon) {
  const ok = await ask({
    title: 'Delete coupon',
    message: `Delete coupon “${coupon.code}”? It will stop working at checkout immediately.`,
    confirmLabel: 'Delete coupon',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/coupon/delete/${coupon.id}`, { method: 'DELETE' }), 'Coupon deleted.')
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Coupons" subtitle="Create discount codes that students can apply at checkout." icon="ticket">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New coupon
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 5" :key="i" class="card h-14 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load coupons" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="ticket"
      title="No coupons yet"
      message="Create a fixed or percentage discount code for your students."
      action-label="Create the first coupon"
      @action="openCreate"
    />

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
            <tr>
              <th class="px-4 py-2.5 font-semibold">Code</th>
              <th class="px-3 py-2.5 font-semibold">Type</th>
              <th class="px-3 py-2.5 font-semibold">Discount</th>
              <th class="px-3 py-2.5 font-semibold">Applies to</th>
              <th class="px-3 py-2.5 font-semibold">Used</th>
              <th class="px-3 py-2.5 font-semibold">Status</th>
              <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="coupon in list" :key="coupon.id" class="hover:bg-gray-50/60">
              <td class="px-4 py-3">
                <span class="rounded-lg bg-brand-light px-2.5 py-1 font-mono text-xs font-bold tracking-wide text-oc-primary">{{ coupon.code }}</span>
              </td>
              <td class="px-3 py-3">
                <span class="badge" :class="coupon.type === 'percentage' ? 'bg-violet-50 text-violet-700 ring-violet-200' : 'bg-blue-50 text-blue-700 ring-blue-200'">
                  {{ coupon.type === 'percentage' ? 'Percentage' : 'Fixed amount' }}
                </span>
              </td>
              <td class="px-3 py-3 font-semibold text-gray-900">
                {{ coupon.type === 'percentage' ? `${coupon.discount}%` : formatMoney(coupon.discount) }}
              </td>
              <td class="px-3 py-3 capitalize text-gray-600">{{ coupon.applies_to ?? 'all' }}</td>
              <td class="px-3 py-3 text-gray-600">{{ coupon.times_used ?? 0 }}<template v-if="coupon.usage_limit"> / {{ coupon.usage_limit }}</template></td>
              <td class="px-3 py-3"><StatusBadge :status="coupon.is_active === false ? 'cancelled' : 'active'" /></td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openEdit(coupon)">
                    <BaseIcon name="edit" :size="14" /> Edit
                  </button>
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" @click="remove(coupon)">
                    <BaseIcon name="trash" :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit coupon' : 'New coupon'" size="sm" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="coupon-code">Code</label>
          <input id="coupon-code" v-model="form.code" type="text" class="field-input font-mono uppercase" required placeholder="EID2026">
          <p v-if="fieldError('code')" class="field-error">{{ fieldError('code') }}</p>
        </div>
        <div>
          <label class="field-label" for="coupon-type">Type</label>
          <select id="coupon-type" v-model="form.type" class="field-input">
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed amount</option>
          </select>
          <p v-if="fieldError('type')" class="field-error">{{ fieldError('type') }}</p>
        </div>
        <div>
          <label class="field-label" for="coupon-discount">{{ form.type === 'percentage' ? 'Discount (%)' : 'Discount (BDT)' }}</label>
          <input id="coupon-discount" v-model.number="form.discount" type="number" min="0" :max="form.type === 'percentage' ? 100 : undefined" step="0.01" class="field-input">
          <p v-if="fieldError('discount')" class="field-error">{{ fieldError('discount') }}</p>
        </div>
        <div>
          <label class="field-label" for="coupon-applies">Applies to</label>
          <select id="coupon-applies" v-model="form.applies_to" class="field-input">
            <option value="all">Everything</option>
            <option value="courses">Courses only</option>
            <option value="products">Products only</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="field-label" for="coupon-starts">Starts</label>
            <input id="coupon-starts" v-model="form.starts_at" type="datetime-local" class="field-input">
          </div>
          <div>
            <label class="field-label" for="coupon-expires">Expires</label>
            <input id="coupon-expires" v-model="form.expires_at" type="datetime-local" class="field-input">
            <p v-if="fieldError('expires_at')" class="field-error">{{ fieldError('expires_at') }}</p>
          </div>
          <div>
            <label class="field-label" for="coupon-min">Minimum purchase</label>
            <input id="coupon-min" v-model.number="form.min_purchase" type="number" min="0" class="field-input">
          </div>
          <div>
            <label class="field-label" for="coupon-max">Max discount</label>
            <input id="coupon-max" v-model.number="form.max_discount" type="number" min="0" class="field-input">
          </div>
          <div>
            <label class="field-label" for="coupon-limit">Total uses</label>
            <input id="coupon-limit" v-model.number="form.usage_limit" type="number" min="1" class="field-input" placeholder="Unlimited">
          </div>
          <div>
            <label class="field-label" for="coupon-user-limit">Uses per student</label>
            <input id="coupon-user-limit" v-model.number="form.per_user_limit" type="number" min="1" class="field-input" placeholder="Unlimited">
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"> Active
        </label>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save coupon' : 'Create coupon' }}</button>
      </template>
    </AppModal>
  </div>
</template>
