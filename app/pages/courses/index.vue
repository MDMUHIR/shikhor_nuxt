<script setup lang="ts">
import type { Course, CourseCategory, MyCourse, Paginator } from "~/utils/types";

const route = useRoute();
const router = useRouter();
const { apiData } = useApi();
const { isAuthenticated } = useAuth();

const search = ref(String(route.query.search || ""));
const category = ref(String(route.query.category || ""));
const level = ref(String(route.query.level || ""));
const sort = ref(String(route.query.sort || "latest"));
let searchTimer: ReturnType<typeof setTimeout> | null = null;
let syncing = false;

const levels = [
  { value: "", label: "All levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];
const sorts = [
  { value: "latest", label: "Newest" },
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Top rated" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

const { data: categories } = await useAsyncData("course-categories", () =>
  apiData<CourseCategory[]>("/course-categories").catch(
    () => [] as CourseCategory[],
  ),
);

const { data, pending, error, refresh } = await useAsyncData(
  "courses-list",
  () => {
    const query: Record<string, string | number> = {
      per_page: 12,
      page: Number(route.query.page) || 1,
      sort: sort.value,
    };
    if (search.value.trim()) query.search = search.value.trim();
    if (category.value) query.category = category.value;
    if (level.value) query.level = level.value;
    return apiData<Paginator<Course>>("/courses", { query });
  },
  { watch: [() => route.query] },
);

const courses = computed(() => data.value?.data ?? []);
const currentPage = computed(() => data.value?.current_page ?? 1);
const lastPage = computed(() => data.value?.last_page ?? 1);

const { data: enrolledCourseIds } = await useAsyncData(
  "courses-enrolled-ids",
  async () => {
    if (!isAuthenticated.value) return [] as number[];
    const mine = await apiData<MyCourse[]>("/my/courses").catch(
      () => [] as MyCourse[],
    );
    return (mine ?? [])
      .filter((item) => item.enrollment?.is_active)
      .map((item) => item.course.id);
  },
  { watch: [isAuthenticated] },
);

const enrolledSet = computed(() => new Set(enrolledCourseIds.value ?? []));
const visibleCourses = computed(() =>
  courses.value.filter((course) => !enrolledSet.value.has(course.id)),
);
const allOwned = computed(
  () => courses.value.length > 0 && visibleCourses.value.length === 0,
);

function syncFromRoute() {
  syncing = true;
  search.value = String(route.query.search || "");
  category.value = String(route.query.category || "");
  level.value = String(route.query.level || "");
  sort.value = String(route.query.sort || "latest");
  nextTick(() => (syncing = false));
}

function apply(
  patch: Record<string, string | number | undefined>,
  resetPage = true,
) {
  const query: Record<string, string> = {};
  for (const [key, value] of Object.entries({ ...route.query, ...patch })) {
    if (value === undefined || value === "" || value === null) continue;
    if (key === "page" && resetPage && !("page" in patch)) continue;
    query[key] = String(value);
  }
  if (resetPage && !("page" in patch)) delete query.page;
  router.push({ path: "/courses", query });
}

function onSearchInput() {
  if (searchTimer) clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    if (syncing) return;
    apply({ search: search.value.trim() || undefined });
  }, 300);
}

function changePage(page: number) {
  apply({ page }, false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearFilters() {
  search.value = "";
  category.value = "";
  level.value = "";
  sort.value = "latest";
  router.push({ path: "/courses" });
}

const hasFilters = computed(
  () =>
    !!(
      route.query.search ||
      route.query.category ||
      route.query.level ||
      (route.query.sort && route.query.sort !== "latest")
    ),
);

watch(() => route.query, syncFromRoute);
watch(
  category,
  () => !syncing && apply({ category: category.value || undefined }),
);
watch(level, () => !syncing && apply({ level: level.value || undefined }));
watch(sort, () => !syncing && apply({ sort: sort.value }));

onBeforeUnmount(() => {
  if (searchTimer) clearTimeout(searchTimer);
});

useSeoMeta({
  title: "Courses — Shikhor Academy",
  description:
    "Browse expert-led courses by category, level and price. Learn at your own pace with quizzes and certificates.",
});
</script>

<template>
  <div class="mx-auto w-full md:container px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Courses</span>
    </nav>

    <div
      class="rounded-2xl bg-gradient-to-r from-oc-primary to-indigo-600 p-6 text-white md:p-8"
    >
      <h1 class="text-2xl font-extrabold md:text-3xl">Find your next course</h1>
      <p class="mt-2 max-w-2xl text-sm text-white/85">
        Structured lessons, practical quizzes and certificates. Filter by topic,
        level or price.
      </p>
    </div>

    <div class="card mt-5 p-4">
      <form
        class="grid gap-3 md:grid-cols-12"
        @submit.prevent="apply({ search: search.trim() || undefined })"
      >
        <div class="relative md:col-span-5">
          <BaseIcon
            name="search"
            :size="17"
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            v-model="search"
            type="search"
            class="field-input pl-9"
            placeholder="Search courses…"
            aria-label="Search courses"
            @input="onSearchInput"
          />
        </div>
        <div class="md:col-span-3">
          <select v-model="category" class="field-input" aria-label="Category">
            <option value="">All categories</option>
            <option
              v-for="item in categories"
              :key="item.id"
              :value="item.slug"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="md:col-span-2">
          <select v-model="level" class="field-input" aria-label="Level">
            <option
              v-for="item in levels"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="md:col-span-2">
          <select v-model="sort" class="field-input" aria-label="Sort by">
            <option v-for="item in sorts" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </form>
      <div
        v-if="hasFilters"
        class="mt-3 flex flex-wrap items-center gap-2 text-xs"
      >
        <span class="text-gray-500">Active filters:</span>
        <span
          v-if="route.query.search"
          class="badge bg-brand-light text-oc-primary ring-blue-200"
          >“{{ route.query.search }}”</span
        >
        <span
          v-if="route.query.category"
          class="badge bg-brand-light text-oc-primary ring-blue-200"
          >{{ route.query.category }}</span
        >
        <span
          v-if="route.query.level"
          class="badge bg-brand-light text-oc-primary ring-blue-200"
          >{{ route.query.level }}</span
        >
        <button
          type="button"
          class="font-semibold text-rose-600 hover:underline"
          @click="clearFilters"
        >
          Clear all
        </button>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-between gap-3">
      <p class="text-sm text-gray-600">
        <span v-if="!pending"
          >{{ formatNumber(data?.total) }} course{{
            data?.total === 1 ? "" : "s"
          }}</span
        >
        <span v-else>Loading courses…</span>
      </p>
    </div>

    <div v-if="pending" class="mt-4">
      <LoadingSkeleton :count="6" />
    </div>
    <ErrorState
      v-else-if="error"
      class="mt-4"
      title="Could not load courses"
      :message="error.message"
      @retry="refresh"
    />
    <EmptyState
      v-else-if="allOwned"
      class="mt-4"
      icon="book-open"
      title="You already own these courses"
      message="You are enrolled in every course on this page. Continue learning from your dashboard."
      action-label="Go to my courses"
      action-to="/my-courses"
    />
    <EmptyState
      v-else-if="!visibleCourses.length"
      class="mt-4"
      icon="search"
      title="No courses match your filters"
      message="Try a different search term, category or level."
      action-label="Clear filters"
      @action="clearFilters"
    />
    <template v-else>
      <div
        class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <CourseCard
          v-for="course in visibleCourses"
          :key="course.id"
          :course="course"
          compact
        />
      </div>
      <div class="mt-8">
        <PaginationLinks
          :current-page="currentPage"
          :last-page="lastPage"
          :total="data?.total"
          @change="changePage"
        />
      </div>
    </template>
  </div>
</template>
