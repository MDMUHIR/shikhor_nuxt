<script setup lang="ts">
const route = useRoute()
const { login, isAuthenticated, isAdmin } = useAuth()
const toast = useToast()

const next = computed(() => {
  const value = String(route.query.next || '')
  return value.startsWith('/') ? value : ''
})

const form = reactive({ email: '', password: '' })
const showPassword = ref(false)
const submitting = ref(false)
const formError = ref('')

if (isAuthenticated.value) {
  await navigateTo(next.value || (isAdmin.value ? '/admin' : '/'))
}

async function submit() {
  formError.value = ''
  if (!form.email.trim() || !form.password) {
    formError.value = 'Enter your email and password.'
    return
  }
  submitting.value = true
  try {
    const user = await login(form.email.trim(), form.password)
    toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
    await navigateTo(next.value || (['admin', 'super_admin', 'instructor'].includes(user.type) ? '/admin' : '/'))
  } catch (err) {
    formError.value = (err as Error).message || 'Could not sign you in.'
  } finally {
    submitting.value = false
  }
}

useSeoMeta({ title: 'Sign in — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto grid w-full max-w-[1000px] gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-2 lg:items-center">
    <div class="card neo-banner neo-lavender hidden p-10 lg:block">
      <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
        <BaseIcon name="book-open" :size="26" />
      </span>
      <h1 class="mt-6 text-3xl font-extrabold leading-tight">Welcome back to Shikhor Academy</h1>
      <p class="mt-3 text-sm leading-6 text-white/80">
        Pick up your lessons, track progress, review quizzes and download the certificates you have earned.
      </p>
      <ul class="mt-8 space-y-3 text-sm text-white/85">
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> Resume lessons exactly where you paused</li>
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> Practice quizzes with instant results</li>
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> Verifiable certificates on completion</li>
      </ul>
    </div>

    <div class="card w-full p-6 md:p-8">
      <h2 class="text-2xl font-extrabold text-gray-900">Sign in</h2>
      <p class="mt-1 text-sm text-gray-500">Use the email and password for your account.</p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="field-label" for="login-email">Email</label>
          <input id="login-email" v-model="form.email" type="email" class="field-input" autocomplete="email" placeholder="you@example.com" autofocus>
        </div>
        <div>
          <label class="field-label" for="login-password">Password</label>
          <div class="relative">
            <input
              id="login-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input pr-16"
              autocomplete="current-password"
              placeholder="Your password"
            >
            <button
              type="button"
              class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 hover:text-oc-primary"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>
        </div>

        <p v-if="formError" class="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{{ formError }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="submitting">
          <BaseIcon name="user" :size="16" />
          {{ submitting ? 'Signing in…' : 'Sign in' }}
        </button>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        New to Shikhor?
        <NuxtLink :to="{ path: '/register', query: next ? { next } : {} }" class="font-semibold text-oc-primary hover:underline">Create an account</NuxtLink>
      </p>
      <p class="mt-3 text-center text-xs text-gray-400">
        <NuxtLink to="/" class="hover:text-oc-primary">← Back to home</NuxtLink>
      </p>
    </div>
  </div>
</template>
