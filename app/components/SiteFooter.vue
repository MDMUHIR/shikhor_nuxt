<template>
  <footer class="bg-gray-100 text-black">
    <div class="w-full max-w-[1280px] mx-auto px-4 md:px-6 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="space-y-4">
          <a class="flex items-center" href="/">
            <img alt="logo" width="100" height="100" src="/logo.png" />
          </a>
          <p class="text-gray-800 mt-4">
            Redwans Method is a comprehensive online learning platform that provides a diverse array of
            courses delivered by highly qualified and skilled educators. We commenced our online teaching
            services in 2023, and within a remarkably short period, we have engaged over 500,000 students
            nationwide. Our mission is to ensure that quality education is accessible to all individuals,
            including those in remote areas.
          </p>
          <div class="flex space-x-4 pt-2">
            <a
              href="https://www.youtube.com/@RedwansMethod"
              target="_blank"
              rel="noopener noreferrer"
              title="Redwan's Method YouTube"
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@RedwanHushen"
              target="_blank"
              rel="noopener noreferrer"
              title="Redwan Hushen YouTube"
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 hover:bg-red-600 hover:text-white transition-colors duration-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/Redwanhushenofficial"
              target="_blank"
              rel="noopener noreferrer"
              title="Redwan Hushen Facebook"
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/groups/1006473473215937"
              target="_blank"
              rel="noopener noreferrer"
              title="Redwan's Method Facebook Group"
              class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-800 hover:bg-blue-600 hover:text-white transition-colors duration-300"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                />
              </svg>
            </a>
          </div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Links</h3>
          <ul class="space-y-3">
            <li v-for="l in links" :key="l.href">
              <a
                class="text-gray-800 hover:text-[#0a7cc9] transition-colors duration-300 flex items-center"
                :href="l.href"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  class="mr-2 text-sm"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M313.941 216H12c-6.627 0-12 5.373-12 12v56c0 6.627 5.373 12 12 12h301.941v46.059c0 21.382 25.851 32.09 40.971 16.971l86.059-86.059c9.373-9.373 9.373-24.569 0-33.941l-86.059-86.059c-15.119-15.119-40.971-4.411-40.971 16.971V216z"
                  />
                </svg>
                {{ l.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Company Details</h3>
          <ul class="space-y-3">
            <li class="flex">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="mt-1 mr-3 text-[#0a7cc9]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M428 224H288a48 48 0 0 1-48-48V36a4 4 0 0 0-4-4h-92a64 64 0 0 0-64 64v320a64 64 0 0 0 64 64h224a64 64 0 0 0 64-64V228a4 4 0 0 0-4-4zm-92 160H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32zm0-80H176a16 16 0 0 1 0-32h160a16 16 0 0 1 0 32z"
                />
                <path d="M419.22 188.59 275.41 44.78a2 2 0 0 0-3.41 1.41V176a16 16 0 0 0 16 16h129.81a2 2 0 0 0 1.41-3.41z" />
              </svg>
              <span>License No: TRAD/DNCC/044200/2024</span>
            </li>
            <li class="flex">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 384 512"
                class="mt-1 mr-3 text-[#0a7cc9]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"
                />
              </svg>
              <span>House 1085, Road 6/A, Avenue 8, Mirpur DOHS</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800 mb-6">Contact</h3>
          <ul class="space-y-4">
            <li class="flex">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="mt-1 mr-3 text-[#0a7cc9]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"
                />
              </svg>
              <span>09617331133</span>
            </li>
            <li class="flex">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="mt-1 mr-3 text-[#0a7cc9]"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"
                />
              </svg>
              <span>redwansmethod.info@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-12 flex justify-center items-center rounded-lg overflow-hidden">
        <img
          alt="logo"
          width="1200"
          height="600"
          class="rounded-lg"
          src="/payment-banner.png"
        />
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-800">© 2026 Redwans Method. All Rights Reserved.</p>
        <div class="mt-4 md:mt-0 flex flex-wrap gap-4">
          <a class="text-gray-800 hover:text-[#0a7cc9] transition-colors duration-300" href="/terms-and-conditions">
            Terms &amp; Conditions
          </a>
          <a class="text-gray-800 hover:text-[#0a7cc9] transition-colors duration-300" href="/privacy-policy">
            Privacy Policy
          </a>
          <a class="text-gray-800 hover:text-[#0a7cc9] transition-colors duration-300" href="/refund-policy">
            Refund Policy
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const links = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Board Result', href: '/board-result' },
]
</script>
