<script setup lang="ts">
const route = useRoute()
const { user, isAdmin, logout, isAuthenticated } = useAuth()
const { initial } = useInitials()
const sidebarOpen = ref(false)
const signingOut = ref(false)
const initials = computed(() => initial(user?.value?.name))

const nav = [
  { label: 'Dashboard', to: '/admin', icon: 'dashboard', exact: true },
  { label: 'Courses', to: '/admin/courses', icon: 'book-open' },
  { label: 'Course categories', to: '/admin/course-categories', icon: 'layers' },
  { label: 'Enrollments', to: '/admin/enrollments', icon: 'users' },
  { label: 'Reviews', to: '/admin/reviews', icon: 'star' },
  { label: 'Certificates', to: '/admin/certificates', icon: 'award' },
  { label: 'Orders', to: '/admin/orders', icon: 'shopping-bag' },
  { label: 'Products', to: '/admin/products', icon: 'store' },
  { label: 'Product categories', to: '/admin/categories', icon: 'tag' },
  { label: 'Coupons', to: '/admin/coupons', icon: 'ticket' },
  { label: 'Banners', to: '/admin/banners', icon: 'image' },
  { label: 'Delivery charges', to: '/admin/delivery-charges', icon: 'truck' },
  { label: 'Blogs', to: '/admin/blogs', icon: 'blog' },
  { label: 'Blog tags', to: '/admin/blog-tags', icon: 'tag' },
  { label: 'Blog categories', to: '/admin/blog-categories', icon: 'layers' },
  { label: 'Users', to: '/admin/users', icon: 'user' },
]

function active(to: string, exact = false) {
  return exact ? route.path === to : route.path === to || route.path.startsWith(`${to}/`)
}

async function handleLogout() {
  signingOut.value = true
  try {
    await logout()
  } finally {
    signingOut.value = false
  }
}

watch(() => route.fullPath, () => (sidebarOpen.value = false))
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <aside
      class="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0"
      :class="{ 'translate-x-0': sidebarOpen }"
    >
      <div class="flex h-16 items-center justify-between border-b border-gray-100 px-4">
        <NuxtLink to="/admin" class="flex h-10 w-28 items-center" aria-label="Admin home">
          <img src="/logo.png" alt="Shikhor Academy" class="h-full w-full object-contain" >
        </NuxtLink>
        <button type="button" class="btn-ghost lg:hidden" aria-label="Close menu" @click="sidebarOpen = false">
          <BaseIcon name="x" :size="20" />
        </button>
      </div>
      <nav class="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Admin">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          :class="{ 'bg-brand-light text-oc-primary': active(item.to, item.exact) }"
        >
          <BaseIcon :name="item.icon" :size="17" />
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="border-t border-gray-100 p-3">
        <NuxtLink to="/" class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100">
          <BaseIcon name="external-link" :size="16" /> View storefront
        </NuxtLink>
      </div>
    </aside>

    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-black/30 lg:hidden"
      aria-hidden="true"
      @click="sidebarOpen = false"
    />

    <div class="lg:pl-64">
      <header class="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 md:px-6">
        <button type="button" class="btn-ghost lg:hidden" aria-label="Open menu" @click="sidebarOpen = true">
          <BaseIcon name="menu" :size="22" />
        </button>
        <p class="text-sm font-semibold text-gray-500">Admin console</p>
        <div class="ml-auto flex items-center gap-3">
          <NuxtLink to="/admin/courses" class="btn-primary hidden sm:inline-flex">
            <BaseIcon name="plus" :size="16" /> New course
          </NuxtLink>
          <div class="flex items-center gap-2">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-oc-primary text-sm font-bold text-white">
              {{ initials }}
            </span>
            <div class="hidden text-right sm:block">
              <p class="max-w-36 truncate text-sm font-semibold text-gray-800">{{ user?.name }}</p>
              <p class="text-[11px] uppercase tracking-wide text-gray-400">{{ isAdmin ? 'Administrator' : 'Account' }}</p>
            </div>
          </div>
          <button
            v-if="isAuthenticated"
            type="button"
            class="btn-ghost"
            aria-label="Log out"
            :disabled="signingOut"
            @click="handleLogout"
          >
            <BaseIcon name="logout" :size="18" />
          </button>
        </div>
      </header>

      <main class="px-4 py-6 md:px-6 lg:px-8">
        <slot />
      </main>
    </div>
    <AppToast />
    <AdminConfirmDialog />
  </div>
</template>
