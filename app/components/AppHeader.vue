 <script setup lang="ts">
const route = useRoute()
const router = useRouter()
const { user, isAuthenticated, isAdmin, isStaff, logout } = useAuth()
const { totalCount, refresh: refreshCart } = useCart()
const { count: wishlistCount, refresh: refreshWishlist } = useWishlist()
const { initial } = useInitials()

const open = ref(false)
const accountOpen = ref(false)
const searchOpen = ref(false)
const searchTerm = ref('')
const accountRef = ref<HTMLElement | null>(null)
const signingOut = ref(false)

const links = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Store', href: '/store' },
  { label: 'Blog', href: '/blog' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Instructors', href: '/instructors' },
]

const initials = computed(() => initial(user.value?.name))

function isActive(href: string) {
  return href === '/' ? route.path === '/' : route.path.startsWith(href)
}

function closeAll() {
  open.value = false
  accountOpen.value = false
  searchOpen.value = false
}

function submitSearch() {
  const term = searchTerm.value.trim()
  searchOpen.value = false
  router.push({ path: '/courses', query: term ? { search: term } : {} })
}

async function handleLogout() {
  signingOut.value = true
  try {
    await logout()
  } finally {
    signingOut.value = false
    closeAll()
  }
}

function onDocumentClick(event: MouseEvent) {
  if (accountRef.value && !accountRef.value.contains(event.target as Node)) {
    accountOpen.value = false
  }
}

watch(
  () => route.fullPath,
  () => closeAll(),
)

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  window.addEventListener('focus', handleFocus)
  if (isAuthenticated.value) {
    refreshCart()
    refreshWishlist()
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick)
  window.removeEventListener('focus', handleFocus)
})

function handleFocus() {
  if (isAuthenticated.value) {
    refreshCart()
    refreshWishlist()
  }
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 print:hidden">
    <div class="border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur">
      <div class="mx-auto flex h-18 w-full  md:container items-center gap-3 px-4 md:px-6">
        <NuxtLink to="/" class="flex h-12 w-24 shrink-0 items-center" aria-label="Shikhor Academy home">
          <img src="/logo.png" alt="Shikhor Academy" class="h-full w-full object-contain" >
        </NuxtLink>

        <nav class="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          <NuxtLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            class="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-light hover:text-oc-primary"
            :class="{ 'text-oc-primary': isActive(link.href) }"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            class="btn-ghost hidden sm:inline-flex"
            aria-label="Search courses"
            @click="searchOpen = !searchOpen"
          >
            <BaseIcon name="search" :size="20" />
          </button>

          <NuxtLink to="/wishlist" class="btn-ghost relative" aria-label="Wishlist">
            <BaseIcon name="heart" :size="20" />
            <span
              v-if="wishlistCount"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
            >{{ wishlistCount }}</span>
          </NuxtLink>

          <NuxtLink to="/cart" class="btn-ghost relative" aria-label="Cart">
            <BaseIcon name="cart" :size="20" />
            <span
              v-if="totalCount"
              class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-oc-primary px-1 text-[10px] font-bold text-white"
            >{{ totalCount }}</span>
          </NuxtLink>

          <div v-if="isAuthenticated" ref="accountRef" class="relative hidden lg:block">
            <button
              type="button"
              class="flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition hover:border-oc-primary/40"
              :aria-expanded="accountOpen"
              aria-haspopup="menu"
              @click.stop="accountOpen = !accountOpen"
            >
              <span class="flex h-8 w-8 items-center justify-center rounded-full bg-oc-primary text-sm font-bold text-white">
                {{ initials }}
              </span>
              <span class="max-w-24 truncate text-sm font-semibold text-gray-700">{{ user?.name }}</span>
              <BaseIcon name="chevron-down" :size="15" class="text-gray-400" />
            </button>
            <div
              v-if="accountOpen"
              class="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1.5 shadow-xl"
              role="menu"
            >
              <div class="border-b border-gray-100 px-4 py-2.5">
                <p class="truncate text-sm font-semibold text-gray-800">{{ user?.name }}</p>
                <p class="truncate text-xs text-gray-500">{{ user?.email }}</p>
              </div>
              <NuxtLink to="/my-courses" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="book-open" :size="16" /> My courses
              </NuxtLink>
              <NuxtLink to="/orders" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="shopping-bag" :size="16" /> Orders
              </NuxtLink>
              <NuxtLink to="/payments" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="credit-card" :size="16" /> Payments
              </NuxtLink>
              <NuxtLink to="/notifications" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="check-circle" :size="16" /> Notifications
              </NuxtLink>
              <NuxtLink to="/certificates" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="award" :size="16" /> Certificates
              </NuxtLink>
              <NuxtLink to="/wishlist" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="heart" :size="16" /> Wishlist
              </NuxtLink>
              <NuxtLink to="/profile" class="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50" role="menuitem">
                <BaseIcon name="user" :size="16" /> Profile
              </NuxtLink>
              <NuxtLink
                v-if="isStaff"
                to="/admin"
                class="flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-oc-primary hover:bg-brand-light"
                role="menuitem"
              >
                <BaseIcon name="dashboard" :size="16" /> {{ isAdmin ? 'Admin dashboard' : 'Instructor dashboard' }}
              </NuxtLink>
              <button
                type="button"
                class="flex w-full items-center gap-2.5 border-t border-gray-100 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                :disabled="signingOut"
                role="menuitem"
                @click="handleLogout"
              >
                <BaseIcon name="logout" :size="16" /> {{ signingOut ? 'Signing out…' : 'Log out' }}
              </button>
            </div>
          </div>

          <NuxtLink v-else to="/login" class="hidden rounded-full bg-violet-100 px-5 py-2 text-sm font-semibold text-oc-primary transition-colors hover:bg-violet-200 lg:inline-flex">
            Login
          </NuxtLink>

          <button
            type="button"
            class="btn-ghost lg:hidden"
            :aria-expanded="open"
            aria-label="Toggle menu"
            @click="open = !open"
          >
            <BaseIcon :name="open ? 'x' : 'menu'" :size="24" />
          </button>
        </div>
      </div>

      <div v-if="searchOpen" class="border-t border-gray-100 bg-white">
        <form class="mx-auto flex w-full max-w-[1280px] items-center gap-2 px-4 py-3 md:px-6" @submit.prevent="submitSearch">
          <BaseIcon name="search" :size="18" class="text-gray-400" />
          <input
            v-model="searchTerm"
            type="search"
            class="field-input"
            placeholder="Search courses…"
            autofocus
            aria-label="Search courses"
          >
          <button type="submit" class="btn-primary shrink-0">Search</button>
        </form>
      </div>
    </div>

    <div v-if="open" class="border-b border-gray-100 bg-white shadow-md lg:hidden">
      <nav class="mx-auto w-full max-w-[1280px] px-4 py-2" aria-label="Mobile">
        <NuxtLink
          v-for="link in links"
          :key="link.href"
          :to="link.href"
          class="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
          :class="{ 'text-oc-primary': isActive(link.href) }"
        >
          {{ link.label }}
        </NuxtLink>
        <template v-if="isAuthenticated">
          <div class="my-2 border-t border-gray-100" />
          <p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{{ user?.name }}</p>
          <NuxtLink to="/my-courses" class="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">My courses</NuxtLink>
          <NuxtLink to="/orders" class="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Orders</NuxtLink>
          <NuxtLink to="/certificates" class="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Certificates</NuxtLink>
          <NuxtLink to="/profile" class="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Profile</NuxtLink>
          <NuxtLink v-if="isStaff" to="/admin" class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-oc-primary">{{ isAdmin ? 'Admin dashboard' : 'Instructor dashboard' }}</NuxtLink>
          <NuxtLink to="/notifications" class="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50">Notifications</NuxtLink>
          <button type="button" class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-rose-600" @click="handleLogout">Log out</button>
        </template>
        <NuxtLink v-else to="/login" class="mt-1 block rounded-lg px-3 py-2.5 text-sm font-semibold text-oc-primary">Login</NuxtLink>
      </nav>
    </div>
  </header>
</template>
