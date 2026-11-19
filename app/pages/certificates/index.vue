<script setup lang="ts">
import type { Certificate } from '~/utils/types'

definePageMeta({ middleware: 'auth' })

const { apiData } = useApi()
const toast = useToast()

const { data: certificates, pending, error, refresh } = await useAsyncData('my-certificates-page', async () => {
  const list = await apiData<Certificate[]>('/my/certificates')
  return list ?? []
})

const downloading = ref<number | null>(null)

async function download(certificate: Certificate) {
  downloading.value = certificate.id
  try {
    const blob = await $fetch<Blob>(`/api/proxy/certificates/${certificate.certificate_number}/download`, {
      responseType: 'blob',
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `certificate-${certificate.certificate_number}.pdf`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    URL.revokeObjectURL(url)
  } catch (err) {
    toast.error((err as Error).message || 'Could not download this certificate.')
  } finally {
    downloading.value = null
  }
}

useSeoMeta({ title: 'Certificates — Shikhor Academy', robots: 'noindex' })
</script>

<template>
  <div class="mx-auto w-full max-w-[1000px] px-4 py-8 md:px-6 md:py-10">
    <nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">
      <NuxtLink to="/" class="hover:text-oc-primary">Home</NuxtLink>
      <span class="mx-1.5">/</span>
      <span class="text-gray-700">Certificates</span>
    </nav>

    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My certificates</h1>
        <p class="mt-1 text-sm text-gray-500">Download your certificates or share a number for public verification.</p>
      </div>
      <NuxtLink to="/certificates/verify" class="btn-secondary"><BaseIcon name="verify" :size="16" /> Verify a certificate</NuxtLink>
    </div>

    <div v-if="pending" class="mt-6 grid gap-4 sm:grid-cols-2">
      <div v-for="i in 2" :key="i" class="card animate-pulse p-5">
        <div class="h-10 w-10 rounded-xl bg-gray-200" />
        <div class="mt-3 h-4 w-2/3 rounded bg-gray-200" />
        <div class="mt-2 h-3 w-1/2 rounded bg-gray-200" />
      </div>
    </div>

    <ErrorState v-else-if="error" class="mt-6" title="Could not load your certificates" :message="error.message" @retry="refresh" />

    <EmptyState
      v-else-if="!certificates?.length"
      class="mt-6"
      icon="award"
      title="No certificates yet"
      message="Complete every lesson in a course, then claim your certificate from the course player."
      action-label="Go to my courses"
      action-to="/my-courses"
    />

    <div v-else class="mt-6 grid gap-4 sm:grid-cols-2">
      <article v-for="certificate in certificates" :key="certificate.id" class="card overflow-hidden">
        <div class="flex items-start gap-4 p-5">
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            :class="certificate.is_valid ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'"
          >
            <BaseIcon name="award" :size="24" />
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="line-clamp-2 text-sm font-bold text-gray-900">{{ certificate.course?.title || 'Course certificate' }}</h2>
              <StatusBadge :status="certificate.status" />
            </div>
            <p class="mt-1 font-mono text-xs text-gray-500">{{ certificate.certificate_number }}</p>
            <p class="mt-0.5 text-xs text-gray-400">Issued {{ formatDate(certificate.issued_at) }}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3">
          <button type="button" class="btn-primary" :disabled="!certificate.is_valid || downloading === certificate.id" @click="download(certificate)">
            <BaseIcon name="download" :size="15" />
            {{ downloading === certificate.id ? 'Preparing…' : 'Download PDF' }}
          </button>
          <NuxtLink :to="`/certificates/verify/${certificate.certificate_number}`" class="btn-secondary">
            <BaseIcon name="verify" :size="15" /> Verify
          </NuxtLink>
          <NuxtLink v-if="certificate.course" :to="`/courses/${certificate.course.slug}`" class="btn-ghost">View course</NuxtLink>
        </div>
      </article>
    </div>
  </div>
</template>
