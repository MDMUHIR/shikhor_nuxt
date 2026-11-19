<script setup lang="ts">
const year = new Date().getFullYear()

const links = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Store', to: '/store' },
  { label: 'Blog', to: '/blog' },
  { label: 'Verify a certificate', to: '/certificates/verify' },
]

const support = [
  { label: 'My courses', to: '/my-courses' },
  { label: 'Orders', to: '/orders' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Profile', to: '/profile' },
]
</script>

<template>
  <footer class="border-t border-gray-200 bg-gray-50 text-gray-800 print:hidden">
    <div class="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-6 md:py-16">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div class="space-y-4">
          <NuxtLink to="/" class="inline-flex h-14 w-32 items-center" aria-label="Shikhor Academy home">
            <img src="/logo.png" alt="Shikhor Academy" class="h-full w-full object-contain" >
          </NuxtLink>
          <p class="text-sm leading-6 text-gray-600">
            Shikhor Academy is a complete online learning platform: expert-led courses, practical quizzes,
            verifiable certificates and a curated store — built for learners across Bangladesh.
          </p>
          <div class="flex gap-2">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 ring-1 ring-gray-200 transition hover:bg-blue-600 hover:text-white"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 320 512" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 ring-1 ring-gray-200 transition hover:bg-red-600 hover:text-white"
              aria-label="YouTube"
            >
              <svg viewBox="0 0 576 512" width="15" height="15" fill="currentColor" aria-hidden="true">
                <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold text-gray-900">Explore</h3>
          <ul class="space-y-2.5">
            <li v-for="link in links" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-gray-600 transition hover:text-oc-primary">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold text-gray-900">My account</h3>
          <ul class="space-y-2.5">
            <li v-for="link in support" :key="link.to">
              <NuxtLink :to="link.to" class="text-sm text-gray-600 transition hover:text-oc-primary">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-base font-bold text-gray-900">Contact</h3>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex items-start gap-2.5">
              <BaseIcon name="phone" :size="16" class="mt-0.5 text-oc-primary" />
              <span>09617-331133</span>
            </li>
            <li class="flex items-start gap-2.5">
              <BaseIcon name="mail" :size="16" class="mt-0.5 text-oc-primary" />
              <span>support@shikhor.academy</span>
            </li>
            <li class="flex items-start gap-2.5">
              <BaseIcon name="map-pin" :size="16" class="mt-0.5 text-oc-primary" />
              <span>House 1085, Road 6/A, Avenue 8, Mirpur DOHS, Dhaka</span>
            </li>
          </ul>
          <div class="mt-5 rounded-xl bg-white p-3 ring-1 ring-gray-200">
            <p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Payments</p>
            <p class="mt-1 text-sm text-gray-600">Cash on delivery, bank transfer or manual bKash. An admin confirms every payment.</p>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 md:flex-row">
        <p class="text-sm text-gray-500">© {{ year }} Shikhor Academy. All rights reserved.</p>
        <div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <NuxtLink to="/certificates/verify" class="transition hover:text-oc-primary">Certificate verification</NuxtLink>
          <NuxtLink to="/reviews" class="transition hover:text-oc-primary">Student reviews</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
