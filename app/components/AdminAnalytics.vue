<script setup lang="ts">
interface Analytics {
  range_days: number
  revenue: { total: number; range: number; daily: Array<{ date: string; revenue: string | number }> }
  enrollments: { total: number; range: number; active: number; completed: number; completion_rate: number }
  reviews: { average: number; pending: number }
  certificates_issued: number
  top_courses: Array<{ course_id: number; name: string; sales: number; revenue: string | number }>
  payments?: { collected: number; refunded: number; failed: number }
}

const { apiData } = useApi()
const days = ref(30)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-analytics',
  () => apiData<Analytics>('/admin/analytics', { query: { days: days.value } }),
  { watch: [days] },
)

const bars = computed(() => {
  const rows = data.value?.revenue.daily ?? []
  const max = Math.max(1, ...rows.map((row) => Number(row.revenue)))
  return rows.map((row) => ({ date: row.date, value: Number(row.revenue), height: Math.max(4, (Number(row.revenue) / max) * 100) }))
})
</script>

<template>
  <section class="card mb-6 p-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <h2 class="text-sm font-bold text-gray-900">Sales &amp; learning analytics</h2>
      <select v-model.number="days" class="field-input !w-auto" aria-label="Range">
        <option :value="7">Last 7 days</option>
        <option :value="30">Last 30 days</option>
        <option :value="90">Last 90 days</option>
      </select>
    </div>

    <div v-if="pending" class="mt-4 h-40 animate-pulse rounded-xl bg-gray-50" />
    <ErrorState v-else-if="error" title="Could not load analytics" :message="error.message" @retry="refresh" />
    <template v-else-if="data">
      <div class="mt-4 grid grid-cols-2 gap-3 xl:grid-cols-4">
        <AdminStat label="Revenue (range)" :value="formatMoney(data.revenue.range)" icon="credit-card" tone="emerald" />
        <AdminStat label="New enrollments" :value="String(data.enrollments.range)" icon="users" tone="blue" />
        <AdminStat label="Completion rate" :value="`${data.enrollments.completion_rate}%`" icon="award" tone="violet" />
        <AdminStat label="Pending reviews" :value="String(data.reviews.pending)" icon="star" tone="amber" />
      </div>

      <div class="mt-5 grid gap-5 lg:grid-cols-2">
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-gray-400">Daily revenue</p>
          <div v-if="bars.length" class="mt-3 flex h-32 items-end gap-px sm:gap-1">
            <div
              v-for="bar in bars"
              :key="bar.date"
              class="min-w-[2px] flex-1 rounded-t bg-oc-primary/80"
              :style="{ height: `${bar.height}%` }"
              :title="`${bar.date}: ${formatMoney(bar.value)}`"
            />
          </div>
          <p v-else class="mt-3 text-sm text-gray-500">No paid orders in this range.</p>
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wide text-gray-400">Top courses</p>
          <ul v-if="data.top_courses.length" class="mt-3 space-y-2">
            <li v-for="course in data.top_courses" :key="course.course_id" class="flex justify-between gap-3 text-sm">
              <span class="truncate text-gray-700">{{ course.name }} <span class="text-gray-400">· {{ course.sales }} sales</span></span>
              <span class="font-semibold text-gray-900">{{ formatMoney(course.revenue) }}</span>
            </li>
          </ul>
          <p v-else class="mt-3 text-sm text-gray-500">No sales yet.</p>
        </div>
      </div>
    </template>
  </section>
</template>
