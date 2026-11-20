<script setup lang="ts">
import type {
  Banner,
  Blog,
  BlogListResponse,
  Course,
  CourseCategory,
  Paginator,
  Product,
  Review,
} from "~/utils/types";

const { apiFetch, apiData } = useApi();

const { data, pending, error, refresh } = await useAsyncData(
  "home",
  async () => {
    const [banners, categories, featured, popular, blogs, products] =
      await Promise.all([
        apiData<Banner[]>("/banners", { query: { active_only: 1 } }).catch(
          () => [] as Banner[],
        ),
        apiData<CourseCategory[]>("/course-categories").catch(
          () => [] as CourseCategory[],
        ),
        apiData<Paginator<Course>>("/courses", {
          query: { featured: 1, per_page: 6 },
        }).catch(() => null),
        apiData<Paginator<Course>>("/courses", {
          query: { per_page: 6, sort: "popular" },
        }).catch(() => null),
        apiFetch<BlogListResponse>("/blogs", { query: { per_page: 3 } }).catch(
          () => null,
        ),
        apiData<Product[]>("/products").catch(() => [] as Product[]),
      ]);

    const featuredCourses = featured?.data?.length
      ? featured.data
      : (popular?.data ?? []);

    const reviewBatches = await Promise.all(
      featuredCourses.slice(0, 3).map((course) =>
        apiData<{ summary: unknown; reviews: Paginator<Review> }>(
          `/courses/${course.slug}/reviews`,
          {
            query: { per_page: 3 },
          },
        ).catch(() => null),
      ),
    );
    const reviews = reviewBatches
      .filter(
        (batch): batch is { summary: unknown; reviews: Paginator<Review> } =>
          !!batch,
      )
      .flatMap((batch) => batch.reviews?.data ?? [])
      .filter((review) => review.comment)
      .slice(0, 9);

    return {
      banners,
      categories,
      featured: featuredCourses,
      popular: (popular?.data ?? [])
        .filter(
          (course) => !featuredCourses.some((item) => item.id === course.id),
        )
        .slice(0, 3),
      blogs: blogs?.blogs ?? [],
      products: products.slice(0, 4),
      reviews,
    };
  },
  {
    default: () => ({
      banners: [],
      categories: [],
      featured: [],
      popular: [],
      blogs: [],
      products: [],
      reviews: [],
    }),
  },
);

const totalCourses = computed(() => data.value?.featured.length ?? 0);
const stats = computed(() => [
  {
    label: "Expert-led courses",
    value: `${data.value?.featured.length || 6}+`,
    icon: "book-open",
  },
  {
    label: "Course categories",
    value: `${data.value?.categories.length || 0}`,
    icon: "layers",
  },
  { label: "Verified certificates", value: "100%", icon: "award" },
  { label: "Support", value: "7 days", icon: "phone" },
]);

useSeoMeta({
  title: "Shikhor Academy — Learn without limits",
  description:
    "Expert-led online courses, practical quizzes, verifiable certificates and a curated store. Learn anytime, anywhere with Shikhor Academy.",
  ogTitle: "Shikhor Academy — Learn without limits",
  ogDescription:
    "Expert-led online courses, practical quizzes, verifiable certificates and a curated store.",
  ogType: "website",
});
</script>

<template>
  <div>
    <div class="mx-auto w-full md:container px-4 py-6 md:px-6 md:py-10">
      <div v-if="pending" class="space-y-8">
        <div class="h-[320px] animate-pulse rounded-3xl bg-gray-200" />
        <LoadingSkeleton :count="3" />
      </div>

      <ErrorState
        v-else-if="error"
        title="We could not load the homepage"
        :message="error.message"
        @retry="refresh"
      />

      <template v-else>
        <HeroCarousel :banners="data?.banners ?? []" />

        <section class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="card flex items-center gap-3 p-4"
          >
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-oc-primary"
            >
              <BaseIcon :name="stat.icon" :size="20" />
            </span>
            <div>
              <p class="text-lg font-extrabold leading-none text-gray-900">
                {{ stat.value }}
              </p>
              <p class="mt-1 text-xs text-gray-500">{{ stat.label }}</p>
            </div>
          </div>
        </section>

        <section v-if="data?.categories.length" class="mt-12">
          <div class="mb-5 flex items-end justify-between gap-3">
            <div>
              <p
                class="text-xs font-bold uppercase tracking-widest text-oc-primary"
              >
                Browse by topic
              </p>
              <h2 class="mt-1 text-2xl font-extrabold text-gray-900">
                Course categories
              </h2>
            </div>
            <NuxtLink to="/courses" class="btn-secondary hidden sm:inline-flex"
              >All courses</NuxtLink
            >
          </div>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <NuxtLink
              v-for="category in data.categories.slice(0, 6)"
              :key="category.id"
              :to="{ path: '/courses', query: { category: category.slug } }"
              class="card group flex flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:border-oc-primary/30 hover:shadow-md"
            >
              <span
                class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-oc-primary"
              >
                <BaseIcon name="book" :size="22" />
              </span>
              <span
                class="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-oc-primary"
                >{{ category.name }}</span
              >
              <span class="text-[11px] text-gray-400"
                >{{ category.courses_count ?? 0 }} courses</span
              >
            </NuxtLink>
          </div>
        </section>

        <section class="mt-14">
          <div class="mb-5 flex items-end justify-between gap-3">
            <div>
              <p
                class="text-xs font-bold uppercase tracking-widest text-oc-primary"
              >
                Handpicked
              </p>
              <h2 class="mt-1 text-2xl font-extrabold text-gray-900">
                Featured courses
              </h2>
            </div>
            <NuxtLink to="/courses" class="btn-secondary hidden sm:inline-flex">
              View all <BaseIcon name="arrow-right" :size="15" />
            </NuxtLink>
          </div>

          <div
            v-if="data?.featured.length"
            class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <CourseCard
              v-for="course in data.featured"
              :key="course.id"
              :course="course"
            />
          </div>
          <EmptyState
            v-else
            icon="book-open"
            title="Courses are on the way"
            message="New courses will appear here as soon as they are published."
            action-label="Refresh"
            @action="refresh"
          />
        </section>

        <section
          class="mt-14 overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-10"
        >
          <div class="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p
                class="text-xs font-bold uppercase tracking-widest text-oc-primary"
              >
                Why Shikhor
              </p>
              <h2
                class="mt-2 text-2xl font-extrabold text-gray-900 md:text-3xl"
              >
                Everything you need to finish what you start
              </h2>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Track every lesson, practise with real quizzes, earn
                certificates you can verify publicly, and get help from a team
                that actually replies.
              </p>
              <div class="mt-6 grid gap-4 sm:grid-cols-2">
                <div class="flex gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"
                    ><BaseIcon name="check-circle" :size="18"
                  /></span>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      Progress that saves
                    </p>
                    <p class="text-xs text-gray-500">
                      Resume exactly where you paused.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
                    ><BaseIcon name="verify" :size="18"
                  /></span>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      Verifiable certificates
                    </p>
                    <p class="text-xs text-gray-500">
                      Anyone can check a certificate online.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600"
                    ><BaseIcon name="list" :size="18"
                  /></span>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      Structured curriculum
                    </p>
                    <p class="text-xs text-gray-500">
                      Sections, lessons and quizzes in order.
                    </p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600"
                    ><BaseIcon name="shield" :size="18"
                  /></span>
                  <div>
                    <p class="text-sm font-semibold text-gray-800">
                      Secure checkout
                    </p>
                    <p class="text-xs text-gray-500">
                      Manual payments confirmed by admin.
                    </p>
                  </div>
                </div>
              </div>
              <NuxtLink to="/courses" class="btn-primary mt-7"
                >Start learning</NuxtLink
              >
            </div>
            <div class="relative">
              <div
                class="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200"
              >
                <img
                  v-if="data?.featured[0]"
                  :src="mediaUrl(data.featured[0].thumbnail)"
                  :alt="data.featured[0].title"
                  class="aspect-[4/3] w-full object-cover"
                  @error="imageFallback"
                />
                <div
                  v-else
                  class="grid aspect-[4/3] place-items-center text-oc-primary/40"
                >
                  <BaseIcon name="book-open" :size="80" />
                </div>
              </div>
              <div
                class="absolute -bottom-4 left-4 hidden rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:block"
              >
                <RatingStars
                  :rating="data?.featured[0]?.rating.average || 0"
                  :count="data?.featured[0]?.rating.count || 0"
                />
                <p class="mt-1 text-xs text-gray-500">
                  Rated by real enrolled students
                </p>
              </div>
            </div>
          </div>
        </section>

        <section v-if="data?.products.length" class="mt-14">
          <div class="mb-5 flex items-end justify-between gap-3">
            <div>
              <p
                class="text-xs font-bold uppercase tracking-widest text-oc-primary"
              >
                From the store
              </p>
              <h2 class="mt-1 text-2xl font-extrabold text-gray-900">
                Learning essentials
              </h2>
            </div>
            <NuxtLink to="/store" class="btn-secondary hidden sm:inline-flex"
              >Visit store</NuxtLink
            >
          </div>
          <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <ProductCard
              v-for="product in data.products"
              :key="product.id"
              :product="product"
            />
          </div>
        </section>

        <section v-if="data?.blogs.length" class="mt-14">
          <div class="mb-5 flex items-end justify-between gap-3">
            <div>
              <p
                class="text-xs font-bold uppercase tracking-widest text-oc-primary"
              >
                Learning notes
              </p>
              <h2 class="mt-1 text-2xl font-extrabold text-gray-900">
                Latest from the blog
              </h2>
            </div>
            <NuxtLink to="/blog" class="btn-secondary hidden sm:inline-flex"
              >All articles</NuxtLink
            >
          </div>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
            <BlogCard v-for="blog in data.blogs" :key="blog.id" :blog="blog" />
          </div>
        </section>

        <section v-if="data?.reviews.length" class="mt-14">
          <div class="mb-5">
            <p
              class="text-xs font-bold uppercase tracking-widest text-oc-primary"
            >
              Student voices
            </p>
            <h2 class="mt-1 text-2xl font-extrabold text-gray-900">
              What learners say
            </h2>
          </div>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
            <figure
              v-for="review in data.reviews.slice(0, 6)"
              :key="review.id"
              class="card p-5"
            >
              <RatingStars
                :rating="review.rating"
                :show-value="false"
                :size="14"
              />
              <blockquote
                class="mt-3 line-clamp-4 text-sm leading-6 text-gray-600"
              >
                “{{ review.comment }}”
              </blockquote>
              <figcaption
                class="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3"
              >
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary"
                >
                  {{ initials(review.user?.name) }}
                </span>
                <span class="text-xs font-semibold text-gray-700">{{
                  review.user?.name || "Student"
                }}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          class="mt-14 rounded-3xl bg-gradient-to-r from-oc-primary to-indigo-600 px-6 py-10 text-center text-white md:px-12"
        >
          <h2 class="text-2xl font-extrabold md:text-3xl">
            Ready to learn something new?
          </h2>
          <p class="mx-auto mt-2 max-w-xl text-sm text-white/85">
            Join Shikhor Academy today. Buy a course, start instantly, and earn
            a certificate you can verify.
          </p>
          <div class="mt-6 flex flex-wrap justify-center gap-3">
            <NuxtLink
              to="/courses"
              class="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary transition hover:bg-blue-50"
            >
              Browse courses <BaseIcon name="arrow-right" :size="16" />
            </NuxtLink>
            <NuxtLink
              to="/register"
              class="inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Create an account
            </NuxtLink>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>
