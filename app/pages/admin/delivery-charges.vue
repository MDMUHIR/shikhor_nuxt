<script setup lang="ts">
import type { DeliveryCharge } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Delivery charges — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()

const { data: charges, pending, error, refresh } = await useAsyncData('admin-delivery-charges', () =>
  apiData<DeliveryCharge[]>('/admin/delivery-charges'),
)

const list = computed(() => charges.value ?? [])

const modalOpen = ref(false)
const editing = ref<DeliveryCharge | null>(null)
const zoneLabels: Record<string, string> = {
  inside_dhaka: 'Inside Dhaka (district Dhaka)',
  outside_dhaka: 'Outside Dhaka (all other districts)',
  free_over: 'Free delivery over the minimum order',
}

const form = reactive({
  name: '',
  zone: 'inside_dhaka' as string,
  charge: 60,
  minimum_order: '' as string | number,
  status: true,
})

function openCreate() {
  editing.value = null
  Object.assign(form, { name: '', zone: 'inside_dhaka', charge: 60, minimum_order: '', status: true })
  resetErrors()
  modalOpen.value = true
}

function openEdit(charge: DeliveryCharge) {
  editing.value = charge
  Object.assign(form, {
    name: charge.name,
    zone: charge.zone ?? '',
    charge: charge.charge,
    minimum_order: charge.minimum_order ?? '',
    status: charge.status,
  })
  resetErrors()
  modalOpen.value = true
}

async function save() {
  const result = await run(
    () =>
      apiData(`/admin/delivery-charges/${editing.value ? 'update' : 'add'}`, {
        method: 'POST',
        body: {
          ...(editing.value ? { id: editing.value.id } : {}),
          name: form.name,
          zone: form.zone || null,
          charge: form.zone === 'free_over' ? 0 : form.charge,
          minimum_order: form.minimum_order === '' ? null : Number(form.minimum_order),
          status: form.status ? 1 : 0,
        },
      }),
    editing.value ? 'Delivery charge updated.' : 'Delivery charge created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(charge: DeliveryCharge) {
  const ok = await ask({
    title: 'Delete delivery charge',
    message: `Delete “${charge.name}”? It will no longer be offered at checkout.`,
    confirmLabel: 'Delete charge',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/delivery-charges/delete/${charge.id}`, { method: 'DELETE' }), 'Delivery charge deleted.')
  if (result !== undefined) await refresh()
}

async function toggle(charge: DeliveryCharge) {
  const result = await run(
    () =>
      apiData('/admin/delivery-charges/update', {
        method: 'POST',
        body: {
          id: charge.id,
          name: charge.name,
          zone: charge.zone ?? null,
          charge: charge.charge,
          minimum_order: charge.minimum_order,
          status: charge.status ? 0 : 1,
        },
      }),
    charge.status ? 'Delivery option disabled.' : 'Delivery option enabled.',
  )
  if (result !== undefined) await refresh()
}
</script>

<template>
  <div>
    <AdminPageHeader title="Delivery charges" subtitle="Set the charge for inside Dhaka, outside Dhaka and free-delivery thresholds. Checkout picks the zone automatically from the district." icon="truck">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New charge
      </button>
    </AdminPageHeader>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 4" :key="i" class="card h-14 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load delivery charges" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!list.length"
      icon="truck"
      title="No delivery charges yet"
      message="Add at least one shipping option so students can complete physical product orders."
      action-label="Add a delivery charge"
      @action="openCreate"
    />

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm">
          <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
            <tr>
              <th class="px-4 py-2.5 font-semibold">Option</th>
              <th class="px-3 py-2.5 font-semibold">Applies to</th>
              <th class="px-3 py-2.5 font-semibold">Charge</th>
              <th class="px-3 py-2.5 font-semibold">Minimum order</th>
              <th class="px-3 py-2.5 font-semibold">Status</th>
              <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="charge in list" :key="charge.id" class="hover:bg-gray-50/60">
              <td class="px-4 py-3">
                <p class="font-semibold text-gray-900">{{ charge.name }}</p>
                <p class="text-[11px] text-gray-400">#{{ charge.id }}</p>
              </td>
              <td class="px-3 py-3 text-xs text-gray-600">{{ charge.zone ? zoneLabels[charge.zone] : 'Not used (set a zone)' }}</td>
              <td class="px-3 py-3 font-semibold text-gray-900">{{ formatMoney(charge.charge) }}</td>
              <td class="px-3 py-3 text-gray-600">{{ charge.minimum_order ? formatMoney(charge.minimum_order) : '—' }}</td>
              <td class="px-3 py-3">
                <span class="badge" :class="charge.status ? 'bg-emerald-50 text-emerald-700 ring-emerald-200' : 'bg-gray-100 text-gray-600 ring-gray-200'">
                  {{ charge.status ? 'Active' : 'Disabled' }}
                </span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="toggle(charge)">
                    {{ charge.status ? 'Disable' : 'Enable' }}
                  </button>
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openEdit(charge)">
                    <BaseIcon name="edit" :size="14" /> Edit
                  </button>
                  <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" @click="remove(charge)">
                    <BaseIcon name="trash" :size="14" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit delivery charge' : 'New delivery charge'" size="sm" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="charge-name">Name</label>
          <input id="charge-name" v-model="form.name" type="text" class="field-input" required placeholder="Inside Dhaka">
          <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
        </div>
        <div>
          <label class="field-label" for="charge-zone">Applies to</label>
          <select id="charge-zone" v-model="form.zone" class="field-input">
            <option v-for="(label, key) in zoneLabels" :key="key" :value="key">{{ label }}</option>
          </select>
          <p class="mt-1 text-[11px] text-gray-400">Checkout picks the zone automatically from the customer's district.</p>
          <p v-if="fieldError('zone')" class="field-error">{{ fieldError('zone') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="field-label" for="charge-amount">Charge (BDT)</label>
            <input id="charge-amount" v-model.number="form.charge" type="number" min="0" step="0.01" class="field-input" required>
            <p v-if="fieldError('charge')" class="field-error">{{ fieldError('charge') }}</p>
          </div>
          <div>
            <label class="field-label" for="charge-minimum">Minimum order</label>
            <input id="charge-minimum" v-model="form.minimum_order" type="number" min="0" step="0.01" class="field-input" placeholder="None">
          </div>
        </div>
        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input v-model="form.status" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary">
          Available at checkout
        </label>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save charge' : 'Create charge' }}</button>
      </template>
    </AppModal>
  </div>
</template>
