<script setup lang="ts">
const route = useRoute()
const { register, isAuthenticated } = useAuth()
const toast = useToast()

const next = computed(() => {
  const value = String(route.query.next || '')
  return value.startsWith('/') ? value : ''
})

const form = reactive({ name: '', email: '', password: '', confirm: '' })
const showPassword = ref(false)
const submitting = ref(false)
const formError = ref('')

if (isAuthenticated.value) {
  await navigateTo(next.value || '/')
}

async function submit() {
  formError.value = ''
  if (!form.name.trim()) {
    formError.value = 'Enter your full name.'
    return
  }
  if (!form.email.trim()) {
    formError.value = 'Enter your email address.'
    return
  }
  if (form.password.length < 6) {
    formError.value = 'Use a password with at least 6 characters.'
    return
  }
  if (form.password !== form.confirm) {
    formError.value = 'Passwords do not match.'
    return
  }
  submitting.value = true
  try {
    await register(form.name.trim(), form.email.trim(), form.password)
    toast.success('Account created. Welcome to Shikhor Academy!')
    await navigateTo(next.value || '/')
  } catch (err) {
    formError.value = (err as Error).message || 'Could not create your account.'
  } finally {
    submitting.value = false
  }
}

useSeoMeta({ title: 'Create an account — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto grid w-full max-w-[1000px] gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-2 lg:items-center">
    <div class="hidden rounded-3xl bg-gradient-to-br from-indigo-700 to-oc-primary p-10 text-white lg:block">
      <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
        <BaseIcon name="sparkles" :size="26" />
      </span>
      <h1 class="mt-6 text-3xl font-extrabold leading-tight">Start learning with Shikhor Academy</h1>
      <p class="mt-3 text-sm leading-6 text-white/80">
        Create a free account to buy courses, track progress, practise quizzes and earn certificates you can verify.
      </p>
      <ul class="mt-8 space-y-3 text-sm text-white/85">
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> Lifetime access on selected courses</li>
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> Learn at your own pace on any device</li>
        <li class="flex items-center gap-2"><BaseIcon name="check-circle" :size="16" /> A curated store for learning essentials</li>
      </ul>
    </div>

    <div class="card w-full p-6 md:p-8">
      <h2 class="text-2xl font-extrabold text-gray-900">Create account</h2>
      <p class="mt-1 text-sm text-gray-500">It only takes a minute.</p>

      <form class="mt-6 space-y-4" @submit.prevent="submit">
        <div>
          <label class="field-label" for="register-name">Full name</label>
          <input id="register-name" v-model="form.name" class="field-input" autocomplete="name" placeholder="Your name" autofocus>
        </div>
        <div>
          <label class="field-label" for="register-email">Email</label>
          <input id="register-email" v-model="form.email" type="email" class="field-input" autocomplete="email" placeholder="you@example.com">
        </div>
        <div>
          <label class="field-label" for="register-password">Password</label>
          <div class="relative">
            <input
              id="register-password"
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="field-input pr-16"
              autocomplete="new-password"
              placeholder="At least 6 characters"
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
        <div>
          <label class="field-label" for="register-confirm">Confirm password</label>
          <input id="register-confirm" v-model="form.confirm" :type="showPassword ? 'text' : 'password'" class="field-input" autocomplete="new-password" placeholder="Repeat your password">
        </div>

        <p v-if="formError" class="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">{{ formError }}</p>

        <button type="submit" class="btn-primary w-full" :disabled="submitting">
          <BaseIcon name="user" :size="16" />
          {{ submitting ? 'Creating account…' : 'Create account' }}
        </button>
      </form>

      <p class="mt-5 text-center text-sm text-gray-500">
        Already have an account?
        <NuxtLink :to="{ path: '/login', query: next ? { next } : {} }" class="font-semibold text-oc-primary hover:underline">Sign in</NuxtLink>
      </p>
      <p class="mt-3 text-center text-xs text-gray-400">
        <NuxtLink to="/" class="hover:text-oc-primary">← Back to home</NuxtLink>
      </p>
    </div>
  </div>
</template>
