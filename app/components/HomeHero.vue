<script setup lang="ts">
const cards = [
  { n: '01', title: 'Courses', text: 'Expert-led video lessons with notes, quizzes and certificates.', to: '/courses', icon: 'book-open', frame: 'bg-neo-mint' },
  { n: '02', title: 'Live classes', text: 'Join live, ask questions in the chat and never miss a class.', to: '/my-courses', icon: 'video', frame: 'bg-neo-pink' },
  { n: '03', title: 'Exams', text: 'Timed mock tests, instant marking and detailed results.', to: '/exams', icon: 'list', frame: 'bg-neo-sky' },
  { n: '04', title: 'Certificates', text: 'Finish a course and earn a certificate anyone can verify.', to: '/certificates/verify', icon: 'award', frame: 'bg-neo-sun' },
  { n: '05', title: 'Store', text: 'Books and study materials delivered to your door.', to: '/store', icon: 'store', frame: 'bg-neo-lavender' },
]

function scrollToStart() {
  document.getElementById('start-here')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <section class="relative overflow-hidden rounded-[2rem] border-2 border-neo-ink bg-neo-cream px-5 py-8 sm:px-8 md:px-10 md:py-12 lg:px-14 lg:py-14">
    <!-- smiley sticker -->
    <div class="sticker absolute right-5 top-5 hidden h-20 w-20 items-center justify-center sm:flex md:right-8 md:top-8 md:h-24 md:w-24" aria-hidden="true">
      <svg viewBox="0 0 100 100" class="h-14 w-14 md:h-16 md:w-16">
        <circle class="eye" cx="36" cy="40" r="4" fill="#1a1a1a" />
        <circle class="eye" cx="64" cy="40" r="4" fill="#1a1a1a" />
        <path d="M28 62 Q50 78 72 62" fill="none" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round" />
      </svg>
    </div>

    <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
      <div class="max-w-xl">
        <span class="eyebrow">Learn without limits</span>
        <h1 class="display mt-4 text-[2.6rem] sm:text-6xl lg:text-7xl">
          Welcome to<br>Shikhor Academy!
        </h1>
        <p class="mt-4 text-lg font-semibold text-neo-ink md:text-xl">Courses, live classes and exams for HSC &amp; beyond</p>
        <p class="mt-4 max-w-md text-[15px] leading-7 text-gray-700">
          Whether you are preparing for the board exam or learning a new skill, we make it fun and easy to learn the fundamentals
          in our online courses. Join a live class, take a timed exam and earn a certificate you can be proud of.
        </p>
        <div class="mt-7 flex flex-wrap items-center gap-4">
          <NuxtLink to="/courses" class="btn-primary !px-7 !py-3.5 !text-base">Get Started Learning</NuxtLink>
          <button type="button" class="group inline-flex items-center gap-2 text-sm font-bold text-neo-ink" @click="scrollToStart">
            Where should I start?
            <span class="inline-block transition-transform group-hover:translate-y-1">↓</span>
          </button>
        </div>
      </div>

      <!-- desktop: fanned stack of colourful cards -->
      <div class="relative hidden h-[440px] lg:block" aria-label="What you can do on Shikhor Academy">
        <NuxtLink
          v-for="(card, i) in cards"
          :key="card.n"
          :to="card.to"
          class="fan-card absolute block w-[270px] rounded-[1.6rem] border-2 border-neo-ink p-2.5"
          :class="card.frame"
          :style="{ left: `${i * 62}px`, top: `${i * 26}px`, zIndex: cards.length - i, '--i': i }"
        >
          <div class="rounded-[1.1rem] border-2 border-neo-ink bg-white p-4">
            <p class="text-lg font-extrabold text-neo-ink">{{ card.n }}</p>
            <hr class="mt-2 border-t-2 border-neo-ink">
            <div class="flex h-[130px] items-center justify-center text-neo-ink">
              <BaseIcon :name="card.icon" :size="84" />
            </div>
            <p class="text-xl font-extrabold text-neo-ink">{{ card.title }}</p>
            <p class="mt-1 text-[13px] leading-5 text-gray-600">{{ card.text }}</p>
          </div>
        </NuxtLink>
      </div>

      <!-- mobile / tablet: simple grid of the same cards -->
      <div class="grid grid-cols-2 gap-3 sm:gap-4 lg:hidden">
        <NuxtLink
          v-for="(card, i) in cards"
          :key="card.n"
          :to="card.to"
          class="fan-card block rounded-2xl border-2 border-neo-ink p-2 shadow-[3px_3px_0_0_#1a1a1a]"
          :class="[card.frame, i === cards.length - 1 ? 'col-span-2 sm:col-span-1' : '']"
        >
          <div class="h-full rounded-xl border-2 border-neo-ink bg-white p-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-extrabold text-neo-ink">{{ card.n }}</span>
              <BaseIcon :name="card.icon" :size="26" class="text-neo-ink" />
            </div>
            <p class="mt-2 text-base font-extrabold text-neo-ink">{{ card.title }}</p>
            <p class="mt-0.5 line-clamp-3 text-xs leading-5 text-gray-600">{{ card.text }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fan-card {
  box-shadow: 5px 5px 0 0 #1a1a1a;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: pop-in 0.5s ease both;
  animation-delay: calc(var(--i, 0) * 70ms);
}
.fan-card:hover {
  transform: translate(-4px, -10px) rotate(-1.5deg);
  box-shadow: 9px 9px 0 0 #1a1a1a;
  z-index: 20 !important;
}
.eye {
  transform-origin: center;
  transform-box: fill-box;
  animation: blink 5s infinite;
}
@keyframes blink {
  0%, 92%, 100% { transform: scaleY(1); }
  95% { transform: scaleY(0.1); }
}
@keyframes pop-in {
  from { opacity: 0; transform: translateY(16px) scale(0.97); }
  to { opacity: 1; transform: none; }
}
</style>
