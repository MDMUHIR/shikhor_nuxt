<script setup lang="ts">
import type { CertificateVerification } from '~/utils/types'

const route = useRoute()
const number = String(route.params.number)
const { apiData } = useApi()

const { data, pending, error, refresh } = await useAsyncData(`certificate-verify-${number}`, () =>
  apiData<CertificateVerification>(`/certificates/verify/${encodeURIComponent(number)}`),
)

useSeoMeta({
  title: () => `Certificate ${number} — Verification`,
  description: 'Public verification of a Shikhor Academy certificate.',
  robots: 'noindex',
})
</script>

<template>
  <div class="mx-auto w-full max-w-[720px] px-4 py-10 md:px-6 md:py-14">
    <div v-if="pending" class="card h-72 animate-pulse bg-gray-100" />

    <ErrorState v-else-if="error" title="Verification failed" :message="error.message" @retry="refresh" />

    <template v-else-if="data">
      <div
        class="overflow-hidden rounded-2xl p-6 text-center text-white md:p-8"
        :class="data.valid ? 'bg-gradient-to-r from-emerald-600 to-teal-500' : 'bg-gradient-to-r from-gray-700 to-gray-500'"
      >
        <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
          <BaseIcon :name="data.valid ? 'verify' : 'alert-circle'" :size="32" />
        </span>
        <h1 class="mt-3 text-2xl font-extrabold">{{ data.valid ? 'Certificate verified' : 'Certificate not valid' }}</h1>
        <p class="mt-1 text-sm text-white/85">
          {{ data.valid ? 'This certificate was issued by Shikhor Academy and is currently valid.' : data.message || 'We could not verify this certificate.' }}
        </p>
      </div>

      <div v-if="data.valid" class="card mt-5 divide-y divide-gray-100">
        <div class="flex flex-wrap items-center justify-between gap-2 p-4">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Certificate number</span>
          <span class="font-mono text-sm font-semibold text-gray-800">{{ data.certificate_number }}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 p-4">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Student</span>
          <span class="text-sm font-semibold text-gray-800">{{ data.student_name || '—' }}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 p-4">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Course</span>
          <span class="text-sm font-semibold text-gray-800">{{ data.course_title || '—' }}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 p-4">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Issued</span>
          <span class="text-sm font-semibold text-gray-800">{{ formatDate(data.issued_at) }}</span>
        </div>
        <div class="flex flex-wrap items-center justify-between gap-2 p-4">
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Status</span>
          <StatusBadge :status="data.status" />
        </div>
      </div>

      <div v-else class="card mt-5 p-6 text-center">
        <p class="text-sm text-gray-600">{{ data.message || 'No certificate matches this number. Check the number and try again.' }}</p>
        <NuxtLink to="/certificates/verify" class="btn-primary mt-4">Try another number</NuxtLink>
      </div>

      <NuxtLink to="/certificates/verify" class="mt-5 block text-center text-xs font-semibold text-oc-primary hover:underline">Verify another certificate</NuxtLink>
    </template>
  </div>
</template>
