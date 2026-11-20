<script setup lang="ts">
import type { Paginator } from '~/utils/types'

interface AppNotification {
  id: string
  kind: string | null
  title: string | null
  message: string | null
  data: Record<string, unknown>
  read_at: string | null
  created_at: string
}

interface NotificationResponse {
  unread_count: number
  notifications: Paginator<AppNotification>
}

definePageMeta({ middleware: 'auth' })

useSeoMeta({ title: 'Notifications — Shikhor Academy', robots: 'noindex' })

const { apiData } = useApi()
const toast = useToast()
const page = ref(1)

const { data, pending, error, refresh } = await useAsyncData(
  'notifications-page',
  () => apiData<NotificationResponse>('/notifications', { query: { page: page.value, per_page: 20 } }),
  { watch: [page] },
)

const items = computed(() => data.value?.notifications?.data ?? [])
const unread = computed(() => data.value?.unread_count ?? 0)

async function markRead(item: AppNotification) {
  if (item.read_at) return
  try {
    await apiData(`/notifications/${item.id}/read`, { method: 'POST' })
    item.read_at = new Date().toISOString()
    if (data.value) data.value.unread_count = Math.max(0, data.value.unread_count - 1)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function markAll() {
  try {
    await apiData('/notifications/read-all', { method: 'POST' })
    await refresh()
  } catch (err) {
    toast.error((err as Error).message)
  }
}

function linkFor(item: AppNotification): string | null {
  if (item.kind === 'certificate_issued') return '/certificates'
  if (item.kind === 'course_enrolled') return '/my-courses'
  if (item.kind === 'payment_received' && item.data?.order_id) return `/orders/${item.data.order_id}`
  return null
}
</script>

<template>
  <div class="mx-auto w-full max-w-[800px] px-4 py-8 md:px-6 md:py-10">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Notifications</h1>
        <p class="mt-1 text-sm text-gray-500">{{ unread }} unread</p>
      </div>
      <button v-if="unread" type="button" class="btn-secondary" @click="markAll">Mark all as read</button>
    </div>

    <div v-if="pending" class="mt-6 space-y-2">
      <div v-for="i in 5" :key="i" class="card h-16 animate-pulse bg-gray-50" />
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not load notifications" :message="error.message" @retry="refresh" />

    <EmptyState v-else-if="!items.length" class="mt-6" icon="check-circle" title="You're all caught up" message="Payment, enrollment and certificate updates will show up here." />

    <ul v-else class="mt-6 space-y-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="card flex items-start gap-3 p-4"
        :class="item.read_at ? '' : 'border-oc-primary/40 bg-brand-light/40'"
      >
        <span class="mt-1.5 h-2 w-2 shrink-0 rounded-full" :class="item.read_at ? 'bg-gray-200' : 'bg-oc-primary'" />
        <div class="min-w-0 flex-1">
          <p class="text-sm font-semibold text-gray-900">{{ item.title }}</p>
          <p class="text-sm text-gray-600">{{ item.message }}</p>
          <p class="mt-1 text-[11px] text-gray-400">{{ formatDate(item.created_at, true) }}</p>
        </div>
        <div class="flex shrink-0 gap-2">
          <NuxtLink v-if="linkFor(item)" :to="linkFor(item)!" class="btn-ghost !px-2 !py-1 text-xs" @click="markRead(item)">View</NuxtLink>
          <button v-if="!item.read_at" type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="markRead(item)">Mark read</button>
        </div>
      </li>
    </ul>

    <div class="flex justify-center pt-4">
      <PaginationLinks :current-page="data?.notifications?.current_page ?? 1" :last-page="data?.notifications?.last_page ?? 1" @change="(value) => (page = value)" />
    </div>
  </div>
</template>
