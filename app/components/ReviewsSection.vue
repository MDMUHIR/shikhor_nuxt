<script setup lang="ts">
import reviews from '~/data/reviews.json'

const leftReviews = reviews.slice(0, 5)
const rightReviews = reviews.slice(5)
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-20 left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/5 rounded-full blur-3xl"
      />
    </div>
    <div class="w-full max-w-[1280px] mx-auto px-4 md:px-6 relative z-10">
      <div class="text-center mb-10">
        <h3 class="text-blue-400 font-semibold mb-2 text-lg">Student Reviews</h3>
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">What Our Students Say</h2>
        <p class="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Feedbacks from students who have transformed their learning journey with Redwan's Method
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <div
            class="flex items-center gap-2 bg-gray-800/60 backdrop-blur-sm px-5 py-2.5 rounded-full border border-gray-600/30"
          >
            <Stars />
            <span class="font-bold text-white">5.0</span>
            <span class="text-gray-400 text-sm">average rating</span>
          </div>
        </div>
      </div>
    </div>
    <div class="relative z-10 space-y-6">
      <div class="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
      <div
        class="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"
      />
      <div class="marquee-row">
        <div class="marquee-track marquee-left">
          <div
            v-for="(review, i) in [...leftReviews, ...leftReviews]"
            :key="`left-${i}`"
            class="w-[320px] sm:w-[380px] shrink-0 mx-3 flex flex-col bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-600/30 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <Stars />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-blue-400/30 text-2xl shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                />
              </svg>
            </div>
            <p class="text-gray-200 text-sm leading-relaxed mb-6 italic line-clamp-5">{{ review.text }}</p>
            <div class="flex items-center mt-auto pt-4 border-t border-gray-600/30">
              <div
                class="relative w-11 h-11 rounded-full overflow-hidden mr-3 ring-2 ring-blue-500/30 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0"
              >
                <img
                  :alt="review.name"
                  loading="eager"
                  width="44"
                  height="44"
                  class="w-full h-full object-cover"
                  :src="review.avatar"
                />
              </div>
              <div class="min-w-0">
                <h4 class="font-semibold text-white text-sm truncate">{{ review.name }}</h4>
                <p class="text-gray-400 text-xs">Verified Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="marquee-row">
        <div class="marquee-track marquee-right">
          <div
            v-for="(review, i) in [...rightReviews, ...rightReviews]"
            :key="`right-${i}`"
            class="w-[320px] sm:w-[380px] shrink-0 mx-3 flex flex-col bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl border border-gray-600/30 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <Stars />
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-blue-400/30 text-2xl shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                />
              </svg>
            </div>
            <p class="text-gray-200 text-sm leading-relaxed mb-6 italic line-clamp-5">{{ review.text }}</p>
            <div class="flex items-center mt-auto pt-4 border-t border-gray-600/30">
              <div
                class="relative w-11 h-11 rounded-full overflow-hidden mr-3 ring-2 ring-blue-500/30 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0"
              >
                <img
                  :alt="review.name"
                  loading="eager"
                  width="44"
                  height="44"
                  class="w-full h-full object-cover"
                  :src="review.avatar"
                />
              </div>
              <div class="min-w-0">
                <h4 class="font-semibold text-white text-sm truncate">{{ review.name }}</h4>
                <p class="text-gray-400 text-xs">Verified Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
