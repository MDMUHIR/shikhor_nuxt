<script setup lang="ts">
import type { User } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Users — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { busy, fieldError, run, resetErrors } = useFormHandler()
const { initial } = useInitials()
const { user: currentUser } = useAuth()

const { data: users, pending, error, refresh } = await useAsyncData('admin-users', () =>
  apiData<User[]>('/admin/users'),
)

const search = ref('')
const type = ref('')

const filtered = computed(() => {
  const term = search.value.trim().toLowerCase()
  return (users.value ?? []).filter((user) => {
    if (type.value && user.type !== type.value) return false
    if (!term) return true
    return user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
  })
})

const counts = computed(() => {
  const list = users.value ?? []
  return {
    total: list.length,
    admins: list.filter((user) => user.type === 'admin').length,
    customers: list.filter((user) => user.type !== 'admin').length,
  }
})

const modalOpen = ref(false)
const editing = ref<User | null>(null)
const form = reactive({ name: '', email: '', type: 'customer' as 'admin' | 'customer', password: '' })

function openCreate() {
  editing.value = null
  Object.assign(form, { name: '', email: '', type: 'customer', password: '' })
  resetErrors()
  modalOpen.value = true
}

function openEdit(user: User) {
  editing.value = user
  Object.assign(form, { name: user.name, email: user.email, type: user.type, password: '' })
  resetErrors()
  modalOpen.value = true
}

async function save() {
  const body = editing.value
    ? {
        id: editing.value.id,
        name: form.name,
        email: form.email,
        type: form.type,
        ...(form.password ? { password: form.password } : {}),
      }
    : { name: form.name, email: form.email, type: form.type, password: form.password }

  const result = await run(
    () => apiData(`/admin/users/${editing.value ? 'update' : 'add'}`, { method: 'POST', body }),
    editing.value ? 'User updated.' : 'User created.',
  )
  if (result === undefined) return
  modalOpen.value = false
  await refresh()
}

async function remove(user: User) {
  if (user.id === currentUser.value?.id) {
    toast.error('You cannot delete your own account while signed in.')
    return
  }
  const ok = await ask({
    title: 'Delete user',
    message: `Delete ${user.name} (${user.email})? Their cart, orders and learning data may become inaccessible.`,
    confirmLabel: 'Delete user',
  })
  if (!ok) return
  const result = await run(() => apiData(`/admin/users/delete/${user.id}`, { method: 'DELETE' }), 'User deleted.')
  if (result !== undefined) await refresh()
}

const toast = useToast()
</script>

<template>
  <div>
    <AdminPageHeader title="Users" subtitle="Manage administrator and student accounts." icon="users">
      <button type="button" class="btn-primary" @click="openCreate">
        <BaseIcon name="plus" :size="16" /> New user
      </button>
    </AdminPageHeader>

    <div class="mb-4 grid gap-3 sm:grid-cols-3">
      <AdminStat label="All accounts" :value="formatNumber(counts.total)" icon="users" tone="blue" />
      <AdminStat label="Administrators" :value="formatNumber(counts.admins)" icon="shield" tone="violet" />
      <AdminStat label="Students" :value="formatNumber(counts.customers)" icon="user" tone="emerald" />
    </div>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 sm:grid-cols-12">
        <div class="relative sm:col-span-7">
          <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="search" type="search" class="field-input pl-9" placeholder="Search by name or email…" aria-label="Search users">
        </div>
        <div class="sm:col-span-3">
          <select v-model="type" class="field-input" aria-label="Filter by account type">
            <option value="">All account types</option>
            <option value="admin">Administrators</option>
            <option value="customer">Students</option>
          </select>
        </div>
        <div class="sm:col-span-2">
          <button type="button" class="btn-secondary w-full" @click="search = ''; type = ''">
            <BaseIcon name="refresh" :size="15" /> Reset
          </button>
        </div>
      </div>
    </div>

    <div v-if="pending" class="space-y-2">
      <div v-for="i in 5" :key="i" class="card h-14 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" title="Could not load users" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!filtered.length"
      icon="users"
      title="No users match these filters"
      message="Try a different search term or account type."
      :action-label="search || type ? 'Clear filters' : undefined"
      @action="search = ''; type = ''"
    />

    <div v-else class="card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px] text-left text-sm">
          <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
            <tr>
              <th class="px-4 py-2.5 font-semibold">User</th>
              <th class="px-3 py-2.5 font-semibold">Type</th>
              <th class="px-3 py-2.5 font-semibold">Joined</th>
              <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="account in filtered" :key="account.id" class="hover:bg-gray-50/60">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">
                    {{ initial(account.name) }}
                  </span>
                  <div class="min-w-0">
                    <p class="truncate font-semibold text-gray-900">
                      {{ account.name }}
                      <span v-if="account.id === currentUser?.id" class="badge ml-1 bg-blue-50 text-blue-700 ring-blue-200">You</span>
                    </p>
                    <p class="truncate text-[11px] text-gray-400">{{ account.email }}</p>
                  </div>
                </div>
              </td>
              <td class="px-3 py-3">
                <span class="badge" :class="account.type === 'admin' ? 'bg-violet-50 text-violet-700 ring-violet-200' : 'bg-gray-50 text-gray-600 ring-gray-200'">
                  {{ account.type === 'admin' ? 'Administrator' : 'Student' }}
                </span>
              </td>
              <td class="px-3 py-3 text-xs text-gray-500">{{ formatDate(account.created_at) }}</td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-1">
                  <button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs" @click="openEdit(account)">
                    <BaseIcon name="edit" :size="14" /> Edit
                  </button>
                  <button
                    type="button"
                    class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50 disabled:opacity-40"
                    :disabled="account.id === currentUser?.id"
                    aria-label="Delete user"
                    @click="remove(account)"
                  >
                    <BaseIcon name="trash" :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AppModal :open="modalOpen" :title="editing ? 'Edit user' : 'New user'" size="md" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="save">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="sm:col-span-2">
            <label class="field-label" for="user-name">Name</label>
            <input id="user-name" v-model="form.name" type="text" class="field-input" required>
            <p v-if="fieldError('name')" class="field-error">{{ fieldError('name') }}</p>
          </div>
          <div class="sm:col-span-2">
            <label class="field-label" for="user-email">Email</label>
            <input id="user-email" v-model="form.email" type="email" class="field-input" required>
            <p v-if="fieldError('email')" class="field-error">{{ fieldError('email') }}</p>
          </div>
          <div>
            <label class="field-label" for="user-type">Account type</label>
            <select id="user-type" v-model="form.type" class="field-input">
              <option value="customer">Student</option>
              <option value="admin">Administrator</option>
            </select>
            <p v-if="fieldError('type')" class="field-error">{{ fieldError('type') }}</p>
          </div>
          <div>
            <label class="field-label" for="user-password">{{ editing ? 'New password (optional)' : 'Password' }}</label>
            <input
              id="user-password"
              v-model="form.password"
              type="password"
              class="field-input"
              autocomplete="new-password"
              :required="!editing"
              minlength="6"
              :placeholder="editing ? 'Leave empty to keep current' : 'At least 6 characters'"
            >
            <p v-if="fieldError('password')" class="field-error">{{ fieldError('password') }}</p>
          </div>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="busy" @click="modalOpen = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="busy" @click="save">{{ editing ? 'Save user' : 'Create user' }}</button>
      </template>
    </AppModal>
  </div>
</template>
