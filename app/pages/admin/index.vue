<script setup lang="ts">
import type {
  AdminEnrollment,
  AdminOrder,
  AdminReview,
  Certificate,
  Course,
  Paginator,
  Product,
  User,
} from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Admin dashboard — Shikhor Academy', robots: 'noindex' })

const { apiData } = useApi()
const { isAdmin } = useAuth()
const { initial } = useInitials()

interface DashboardData {
  courses: Paginator<Course>
  publishedCourses: Paginator<Course>
  orders: AdminOrder[]
  enrollments: Paginator<AdminEnrollment>
  reviews: Paginator<AdminReview>
  certificates: Paginator<Certificate>
  products: Product[]
  users: User[]
}

const EMPTY_PAGE = { current_page: 1, data: [], last_page: 1, total: 0 }

function adminOnly<T>(path: string, fallback: T, query?: Record<string, number>): Promise<T> {
  if (!isAdmin.value) return Promise.resolve(fallback)
  return apiData<T>(path, { query })
}

const { data, pending, error, refresh } = await useAsyncData<DashboardData>('admin-dashboard', async () => {
  const [courses, publishedCourses, orders, enrollments, reviews, certificates, products, users] = await Promise.all([
    apiData<Paginator<Course>>('/admin/courses', { query: { per_page: 1 } }),
    apiData<Paginator<Course>>('/admin/courses', { query: { status: 'published', per_page: 1 } }),
    // Instructors only have course access; the admin-only lists fall back to empty.
    adminOnly<AdminOrder[]>('/admin/orders', [] as AdminOrder[]),
    adminOnly<Paginator<AdminEnrollment>>('/admin/enrollments', EMPTY_PAGE as Paginator<AdminEnrollment>, { per_page: 5 }),
    adminOnly<Paginator<AdminReview>>('/admin/reviews', EMPTY_PAGE as Paginator<AdminReview>, { per_page: 5 }),
    adminOnly<Paginator<Certificate>>('/admin/certificates', EMPTY_PAGE as Paginator<Certificate>, { per_page: 1 }),
    apiData<Product[]>('/products'),
    adminOnly<User[]>('/admin/users', [] as User[]),
  ])

  return { courses, publishedCourses, orders, enrollments, reviews, certificates, products, users }
})

const revenue = computed(() =>
  (data.value?.orders ?? [])
    // Only money actually collected counts as revenue, net of refunds.
    .filter((order) => ['paid', 'partially_refunded'].includes(order.payment_status))
    .reduce((total, order) => total + Number(order.pricing?.total ?? 0) - Number(order.pricing?.refunded_amount ?? 0), 0),
)

const stats = computed(() => {
  const orders = data.value?.orders ?? []
  return {
    revenue: revenue.value,
    orders: orders.length,
    pendingOrders: orders.filter((order) => order.status === 'pending').length,
    courses: data.value?.courses.total ?? 0,
    publishedCourses: data.value?.publishedCourses.total ?? 0,
    enrollments: data.value?.enrollments.total ?? 0,
    reviews: data.value?.reviews.total ?? 0,
    certificates: data.value?.certificates.total ?? 0,
    products: data.value?.products.length ?? 0,
    customers: (data.value?.users ?? []).filter((user) => user.type !== 'admin').length,
  }
})

const recentOrders = computed(() => (data.value?.orders ?? []).slice(0, 6))
const recentEnrollments = computed(() => data.value?.enrollments.data ?? [])
const recentReviews = computed(() => data.value?.reviews.data ?? [])

const quickLinks = [
  { label: 'Add a course', to: '/admin/courses/new', icon: 'plus', hint: 'Build curriculum and quizzes' },
  { label: 'Review orders', to: '/admin/orders', icon: 'shopping-bag', hint: 'Update payment and delivery' },
  { label: 'Publish a blog', to: '/admin/blogs', icon: 'blog', hint: 'Write and tag articles' },
  { label: 'Manage users', to: '/admin/users', icon: 'users', hint: 'Admins and students' },
]

function orderItems(order: AdminOrder) {
  return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0)
}
</script>

<template>
  <div>
    <AdminPageHeader :title="isAdmin ? 'Dashboard' : 'Instructor dashboard'" :subtitle="isAdmin ? 'A live snapshot of students, courses, store sales and learning activity.' : 'Your courses, students and exams.'" icon="dashboard">
      <NuxtLink to="/admin/courses/new" class="btn-primary">
        <BaseIcon name="plus" :size="16" /> New course
      </NuxtLink>
      <button type="button" class="btn-secondary" :disabled="pending" @click="refresh()">
        <BaseIcon name="refresh" :size="16" /> Refresh
      </button>
    </AdminPageHeader>

    <InstructorDashboard v-if="!isAdmin" />

    <template v-else>
    <AdminAnalytics />

    <div v-if="pending" class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <div v-for="i in 8" :key="i" class="card h-[86px] animate-pulse bg-gray-50" />
    </div>

    <ErrorState
      v-else-if="error"
      title="Could not load the dashboard"
      :message="error.message"
      @retry="refresh"
    />

    <template v-else>
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStat label="Revenue (all orders)" :value="formatMoney(stats.revenue)" icon="chart" tone="emerald" hint="Excludes cancelled & refunded" />
        <AdminStat label="Orders" :value="formatNumber(stats.orders)" icon="shopping-bag" tone="blue" :hint="`${stats.pendingOrders} awaiting confirmation`" />
        <AdminStat label="Students" :value="formatNumber(stats.customers)" icon="users" tone="violet" hint="Customer accounts" />
        <AdminStat label="Enrollments" :value="formatNumber(stats.enrollments)" icon="book-open" tone="amber" hint="Course access records" />
        <AdminStat label="Courses" :value="formatNumber(stats.courses)" icon="book" tone="blue" :hint="`${stats.publishedCourses} published`" />
        <AdminStat label="Products" :value="formatNumber(stats.products)" icon="store" tone="gray" hint="Store catalog" />
        <AdminStat label="Certificates" :value="formatNumber(stats.certificates)" icon="award" tone="emerald" hint="Issued to students" />
        <AdminStat label="Reviews" :value="formatNumber(stats.reviews)" icon="star" tone="amber" hint="Moderate student feedback" />
      </div>

      <div class="mt-5 grid gap-4 xl:grid-cols-3">
        <section class="card xl:col-span-2">
          <div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
            <div>
              <h2 class="text-sm font-bold text-gray-900">Recent orders</h2>
              <p class="text-xs text-gray-500">Latest placements across courses and products.</p>
            </div>
            <NuxtLink to="/admin/orders" class="text-xs font-semibold text-oc-primary hover:underline">View all</NuxtLink>
          </div>
          <EmptyState
            v-if="!recentOrders.length"
            class="m-4"
            icon="shopping-bag"
            title="No orders yet"
            message="Orders placed by students will appear here."
          />
          <div v-else class="overflow-x-auto">
            <table class="w-full min-w-[620px] text-left text-sm">
              <thead class="border-b border-gray-100 text-[11px] uppercase tracking-wide text-gray-400">
                <tr>
                  <th class="px-5 py-2.5 font-semibold">Order</th>
                  <th class="px-3 py-2.5 font-semibold">Customer</th>
                  <th class="px-3 py-2.5 font-semibold">Items</th>
                  <th class="px-3 py-2.5 font-semibold">Total</th>
                  <th class="px-3 py-2.5 font-semibold">Status</th>
                  <th class="px-5 py-2.5" />
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50">
                <tr v-for="order in recentOrders" :key="order.id" class="hover:bg-gray-50/60">
                  <td class="px-5 py-3">
                    <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
                    <p class="text-[11px] text-gray-400">{{ formatDate(order.created_at, true) }}</p>
                  </td>
                  <td class="px-3 py-3">
                    <p class="text-gray-700">{{ order.customer?.name || order.user?.name || '—' }}</p>
                    <p class="truncate text-[11px] text-gray-400">{{ order.customer?.email || order.user?.email }}</p>
                  </td>
                  <td class="px-3 py-3 text-gray-600">{{ orderItems(order) }}</td>
                  <td class="px-3 py-3 font-semibold text-gray-900">{{ formatMoney(order.pricing?.total) }}</td>
                  <td class="px-3 py-3"><StatusBadge :status="order.status" /></td>
                  <td class="px-5 py-3 text-right">
                    <NuxtLink :to="`/admin/orders/${order.id}`" class="text-xs font-semibold text-oc-primary hover:underline">Open</NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <div class="space-y-4">
          <section class="card">
            <div class="border-b border-gray-100 px-5 py-3.5">
              <h2 class="text-sm font-bold text-gray-900">Quick actions</h2>
            </div>
            <div class="grid gap-1 p-2">
              <NuxtLink
                v-for="link in quickLinks"
                :key="link.to"
                :to="link.to"
                class="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
              >
                <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light text-oc-primary">
                  <BaseIcon :name="link.icon" :size="17" />
                </span>
                <span class="min-w-0">
                  <span class="block text-sm font-semibold text-gray-800">{{ link.label }}</span>
                  <span class="block truncate text-[11px] text-gray-400">{{ link.hint }}</span>
                </span>
                <BaseIcon name="chevron-right" :size="15" class="ml-auto text-gray-300" />
              </NuxtLink>
            </div>
          </section>

          <section class="card">
            <div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
              <h2 class="text-sm font-bold text-gray-900">New enrollments</h2>
              <NuxtLink to="/admin/enrollments" class="text-xs font-semibold text-oc-primary hover:underline">All</NuxtLink>
            </div>
            <EmptyState
              v-if="!recentEnrollments.length"
              class="m-4"
              icon="users"
              title="No enrollments yet"
              message="Enrollments from course orders and manual grants appear here."
            />
            <ul v-else class="divide-y divide-gray-50">
              <li v-for="enrollment in recentEnrollments" :key="enrollment.id" class="flex items-center gap-3 px-5 py-3">
                <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-oc-primary">
                  {{ initial(enrollment.user?.name) }}
                </span>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-gray-800">{{ enrollment.user?.name || 'Student' }}</p>
                  <p class="truncate text-[11px] text-gray-400">{{ enrollment.course?.title || 'Course' }}</p>
                </div>
                <StatusBadge :status="enrollment.status" />
              </li>
            </ul>
          </section>
        </div>
      </div>

      <section class="card mt-4">
        <div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
          <div>
            <h2 class="text-sm font-bold text-gray-900">Latest reviews</h2>
            <p class="text-xs text-gray-500">Approve, reject or remove student feedback.</p>
          </div>
          <NuxtLink to="/admin/reviews" class="text-xs font-semibold text-oc-primary hover:underline">Moderate</NuxtLink>
        </div>
        <EmptyState
          v-if="!recentReviews.length"
          class="m-4"
          icon="star"
          title="No reviews yet"
          message="Student reviews will show up here for moderation."
        />
        <div v-else class="grid gap-3 p-4 md:grid-cols-2">
          <article v-for="review in recentReviews" :key="review.id" class="rounded-xl border border-gray-100 p-3">
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="text-sm font-semibold text-gray-800">{{ review.course?.title || 'Course' }}</p>
                <p class="text-[11px] text-gray-400">{{ review.user?.name || 'Student' }} · {{ formatDate(review.created_at) }}</p>
              </div>
              <StatusBadge :status="review.is_approved ? 'approved' : 'pending'" />
            </div>
            <RatingStars :rating="review.rating" :size="13" class="mt-1.5" />
            <p v-if="review.comment" class="mt-1.5 line-clamp-2 text-xs text-gray-600">{{ review.comment }}</p>
          </article>
        </div>
      </section>
    </template>
    </template>
  </div>
</template>
