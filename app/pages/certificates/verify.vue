<script setup lang="ts">
const router = useRouter()
const number = ref('')
const error = ref('')

function verify() {
  error.value = ''
  const value = number.value.trim()
  if (!value) {
    error.value = 'Enter the certificate number printed on the document.'
    return
  }
  router.push(`/certificates/verify/${encodeURIComponent(value)}`)
}

useSeoMeta({
  title: 'Verify a certificate — Shikhor Academy',
  description: 'Check whether a Shikhor Academy certificate is valid by entering its certificate number.',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[720px] px-4 py-10 md:px-6 md:py-14">
    <div class="text-center">
      <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">
        <BaseIcon name="verify" :size="28" />
      </span>
      <h1 class="mt-4 text-2xl font-extrabold text-gray-900 md:text-3xl">Verify a certificate</h1>
      <p class="mx-auto mt-2 max-w-md text-sm text-gray-500">
        Enter the certificate number to confirm the student, course and issue date. No account is required.
      </p>
    </div>

    <form class="card mt-6 p-6" @submit.prevent="verify">
      <label class="field-label" for="certificate-number">Certificate number</label>
      <input
        id="certificate-number"
        v-model="number"
        class="field-input font-mono"
        placeholder="e.g. CERT-2026-0001"
        autocomplete="off"
      >
      <p v-if="error" class="field-error">{{ error }}</p>
      <button type="submit" class="btn-primary mt-4 w-full">
        <BaseIcon name="search" :size="16" /> Verify certificate
      </button>
    </form>

    <NuxtLink to="/certificates" class="mt-5 block text-center text-xs font-semibold text-oc-primary hover:underline">Back to my certificates</NuxtLink>
  </div>
</template>
