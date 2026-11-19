<script setup lang="ts">
import type { Course, CourseCategory, Paginator } from '~/utils/types'

definePageMeta({ middleware: 'admin', layout: 'admin' })

useSeoMeta({ title: 'Courses — Admin', robots: 'noindex' })

const { apiData } = useApi()
const { ask } = useConfirm()
const { run } = useFormHandler()

const search = ref('')
const status = ref('')
const categoryId = ref('')
const page = ref(1)
let searchTimer: ReturnType<typeof setTimeout> | null = null

const { data: categories } = await useAsyncData('admin-categories-options', () =>
  apiData<CourseCategory[]>('/admin/course-categories').catch(() => [] as CourseCategory[]),
)

const { data, pending, error, refresh } = await useAsyncData(
  'admin-courses',
  () =>
    apiData<Paginator<Course>>('/admin/courses', {
      query: {
        per_page: 15,
        page: page.value,
        search: search.value.trim() || undefined,
        status: status.value || undefined,
        category_id: categoryId.value || undefined,
      },
    }),
  { watch: [page, categoryId, status] },
)

const courses = computed(() => data.value?.data ?? [])
const total = computed(() => data.value?.total ?? 0)

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    page.value = 1
    refresh()
  }, 320)
}

watch([status, categoryId], () => (page.value = 1))

function clearFilters() {
  search.value = ''
  status.value = ''
  categoryId.value = ''
  page.value = 1
  refresh()
}

async function remove(course: Course) {
  const ok = await ask({
    title: 'Delete course',
    message: `Delete “${course.title}” with its sections, lessons and quizzes? This cannot be undone.`,
    confirmLabel: 'Delete course',
  })
  if (!ok) return
  const result = await run(
    () => apiData(`/admin/courses/delete/${course.id}`, { method: 'DELETE' }),
    'Course deleted.',
  )
  if (result !== undefined) await refresh()
}

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer)
})
</script>

<template>
  <div>
    <AdminPageHeader title="Courses" subtitle="Create course pages, build the curriculum, attach quizzes and publish." icon="book-open">
      <NuxtLink to="/admin/courses/new" class="btn-primary">
        <BaseIcon name="plus" :size="16" /> New course
      </NuxtLink>
    </AdminPageHeader>

    <div class="card mb-4 p-3">
      <div class="grid gap-2 md:grid-cols-12">
        <div class="relative md:col-span-5">
          <BaseIcon name="search" :size="16" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input v-model="search" type="search" class="field-input pl-9" placeholder="Search courses by title or slug…" aria-label="Search courses" @input="onSearchInput">
        </div>
        <div class="md:col-span-3">
          <select v-model="status" class="field-input" aria-label="Filter by status">
            <option value="">All statuses</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div class="md:col-span-3">
          <select v-model="categoryId" class="field-input" aria-label="Filter by category">
            <option value="">All categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
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

    <ErrorState v-else-if="error" title="Could not load courses" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!courses.length"
      icon="book-open"
      title="No courses found"
      message="Adjust the filters or create a new course to get started."
      :action-label="search || status || categoryId ? 'Clear filters' : 'Create a course'"
      @action="search || status || categoryId ? clearFilters() : navigateTo('/admin/courses/new')"
    />

    <template v-else>
      <div class="card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full min-w-[820px] text-left text-sm">
            <thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400">
              <tr>
                <th class="px-4 py-2.5 font-semibold">Course</th>
                <th class="px-3 py-2.5 font-semibold">Category</th>
                <th class="px-3 py-2.5 font-semibold">Price</th>
                <th class="px-3 py-2.5 font-semibold">Lessons</th>
                <th class="px-3 py-2.5 font-semibold">Students</th>
                <th class="px-3 py-2.5 font-semibold">Status</th>
                <th class="px-4 py-2.5 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="course in courses" :key="course.id" class="hover:bg-gray-50/60">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <img :src="mediaUrl(course.thumbnail)" :alt="course.title" class="h-11 w-16 rounded-lg object-cover" @error="imageFallback">
                    <div class="min-w-0">
                      <p class="max-w-[240px] truncate font-semibold text-gray-900">{{ course.title }}</p>
                      <p class="max-w-[240px] truncate text-[11px] text-gray-400">/{{ course.slug }}</p>
                      <span v-if="course.is_featured" class="badge mt-1 bg-amber-50 text-amber-700 ring-amber-200">Featured</span>
                    </div>
                  </div>
                </td>
                <td class="px-3 py-3 text-xs text-gray-600">{{ course.category?.name || '—' }}</td>
                <td class="px-3 py-3">
                  <p class="font-semibold text-gray-900">{{ formatMoney(course.effective_price) }}</p>
                  <p v-if="course.offer_price" class="text-[11px] text-gray-400 line-through">{{ formatMoney(course.price) }}</p>
                </td>
                <td class="px-3 py-3 text-gray-600">{{ course.total_lessons }}</td>
                <td class="px-3 py-3 text-gray-600">{{ formatNumber(course.total_students) }}</td>
                <td class="px-3 py-3"><StatusBadge :status="course.status" /></td>
                <td class="px-4 py-3">
                  <div class="flex items-center justify-end gap-1">
                    <NuxtLink :to="`/admin/courses/${course.id}`" class="btn-secondary !px-2.5 !py-1.5 text-xs">
                      <BaseIcon name="edit" :size="14" /> Edit
                    </NuxtLink>
                    <NuxtLink
                      v-if="course.status === 'published'"
                      :to="`/courses/${course.slug}`"
                      target="_blank"
                      class="btn-ghost !px-2 !py-1.5 text-xs"
                      aria-label="View course"
                    >
                      <BaseIcon name="external-link" :size="14" />
                    </NuxtLink>
                    <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" aria-label="Delete course" @click="remove(course)">
                      <BaseIcon name="trash" :size="14" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="mt-5 flex flex-col items-center gap-2">
        <PaginationLinks :current-page="data?.current_page ?? 1" :last-page="data?.last_page ?? 1" :total="total" @change="(value) => (page = value)" />
      </div>
    </template>
  </div>
</template>
