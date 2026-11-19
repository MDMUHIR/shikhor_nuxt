<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const { user, isAdmin, logout } = useAuth()
const { initial } = useInitials()
const signingOut = ref(false)

const links = [
  { label: 'My courses', description: 'Continue lessons and track progress', to: '/my-courses', icon: 'book-open' },
  { label: 'My orders', description: 'Payments, delivery and order history', to: '/orders', icon: 'shopping-bag' },
  { label: 'Certificates', description: 'Download and verify your certificates', to: '/certificates', icon: 'award' },
  { label: 'Wishlist', description: 'Products you saved for later', to: '/wishlist', icon: 'heart' },
]

async function handleLogout() {
  signingOut.value = true
  try {
    await logout()
  } finally {
    signingOut.value = false
  }
}

useSeoMeta({ title: 'My profile — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">My profile</span>
    </nav>

    <div class="card overflow-hidden">
      <div class="bg-gradient-to-r from-oc-primary to-indigo-600 p-6 text-white md:p-8">
        <div class="flex flex-wrap items-center gap-4">
          <span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-xl font-extrabold">
            {{ initial(user?.name) }}
          </span>
          <div>
            <h1 class="text-2xl font-extrabold">{{ user?.name }}</h1>
            <p class="text-sm text-white/85">{{ user?.email }}</p>
            <p class="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
              <BaseIcon :name="isAdmin ? 'shield' : 'user'" :size="12" />
              {{ isAdmin ? 'Administrator' : 'Student' }}
            </p>
          </div>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div class="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          <BaseIcon name="info" :size="18" class="mt-0.5 shrink-0" />
          <p>Profile details are read-only in this version. Contact support if you need to change your name or email.</p>
        </div>

        <dl class="mt-5 grid gap-4 sm:grid-cols-2">
          <div class="rounded-xl border border-gray-100 p-4">
            <dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Full name</dt>
            <dd class="mt-1 text-sm font-semibold text-gray-800">{{ user?.name }}</dd>
          </div>
          <div class="rounded-xl border border-gray-100 p-4">
            <dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</dt>
            <dd class="mt-1 break-all text-sm font-semibold text-gray-800">{{ user?.email }}</dd>
          </div>
          <div class="rounded-xl border border-gray-100 p-4">
            <dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Account type</dt>
            <dd class="mt-1 text-sm font-semibold text-gray-800">{{ isAdmin ? 'Administrator' : 'Student' }}</dd>
          </div>
          <div class="rounded-xl border border-gray-100 p-4">
            <dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Member since</dt>
            <dd class="mt-1 text-sm font-semibold text-gray-800">{{ formatDate(user?.created_at) }}</dd>
          </div>
        </dl>

        <h2 class="mt-8 text-sm font-bold uppercase tracking-wide text-gray-500">Quick links</h2>
        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-oc-primary/30 hover:shadow-sm"
          >
            <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-oc-primary">
              <BaseIcon :name="link.icon" :size="18" />
            </span>
            <span class="min-w-0">
              <span class="block text-sm font-semibold text-gray-800">{{ link.label }}</span>
              <span class="block text-xs text-gray-500">{{ link.description }}</span>
            </span>
            <BaseIcon name="chevron-right" :size="16" class="ml-auto shrink-0 text-gray-300" />
          </NuxtLink>
        </div>

        <div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">
          <NuxtLink v-if="isAdmin" to="/admin" class="btn-primary"><BaseIcon name="dashboard" :size="16" /> Admin console</NuxtLink>
          <span v-else class="text-xs text-gray-400">Signed in as a student.</span>
          <button type="button" class="btn-secondary text-rose-600" :disabled="signingOut" @click="handleLogout">
            <BaseIcon name="logout" :size="16" /> {{ signingOut ? 'Signing out…' : 'Sign out' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
