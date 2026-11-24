<script setup lang="ts">
import type { Banner } from "~/utils/types";

const props = defineProps<{
  banners: Banner[];
  title?: string;
  subtitle?: string;
}>();

const slides = computed(() =>
  props.banners.map((banner) => ({
    id: banner.id,
    title: banner.title || "Learn without limits",
    description: banner.description || "",
    image: mediaUrl(banner.image),
    link: banner.link || "/courses",
  })),
);

const AUTOPLAY_MS = 5500;

const index = ref(0);
const tick = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const current = computed(() => slides.value[index.value]);
const prevIndex = computed(
  () => (index.value - 1 + slides.value.length) % slides.value.length,
);
const nextIndex = computed(() => (index.value + 1) % slides.value.length);

const currentLink = computed(() =>
  current.value?.link.startsWith("http")
    ? "/courses"
    : current.value?.link || "/courses",
);

function go(i: number) {
  if (!slides.value.length) return;
  index.value = (i + slides.value.length) % slides.value.length;
  tick.value++;
  restart();
}

function restart() {
  if (timer) clearInterval(timer);
  if (slides.value.length < 2) return;
  timer = setInterval(() => {
    index.value = (index.value + 1) % slides.value.length;
    tick.value++;
  }, AUTOPLAY_MS);
}

watch(
  () => slides.value.length,
  () => {
    index.value = 0;
    tick.value++;
    restart();
  },
);

onMounted(restart);
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div class="mb-12 md:mb-16">
    <div class="relative flex items-center justify-center">
      <div
        class="hidden"
      />

      <!-- Peek: previous -->
      <button
        v-if="slides.length > 1"
        type="button"
        aria-label="Previous slide"
        class="group/peek hidden lg:block absolute left-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-neo-ink opacity-60 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
        @click="go(prevIndex)"
      >
        <img
          alt=""
          loading="eager"
          class="object-cover"
          style="
            position: absolute;
            height: 100%;
            width: 100%;
            inset: 0;
            color: transparent;
          "
          :src="slides[prevIndex]?.image"
          @error="imageFallback"
        />
        <div
          class="absolute inset-0 bg-gradient-to-l from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60"
        />
      </button>

      <!-- Peek: next -->
      <button
        v-if="slides.length > 1"
        type="button"
        aria-label="Next slide"
        class="group/peek hidden lg:block absolute right-0 top-1/2 z-0 h-[82%] w-[13%] -translate-y-1/2 overflow-hidden rounded-2xl opacity-50 shadow-xl shadow-black/50 ring-1 ring-white/10 transition-all duration-300 hover:opacity-90 hover:scale-[1.03]"
        @click="go(nextIndex)"
      >
        <img
          alt=""
          loading="eager"
          class="object-cover"
          style="
            position: absolute;
            height: 100%;
            width: 100%;
            inset: 0;
            color: transparent;
          "
          :src="slides[nextIndex]?.image"
          @error="imageFallback"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/10 via-black/40 to-black/70 transition-opacity duration-300 group-hover/peek:opacity-60"
        />
      </button>

      <!-- Main slide -->
      <div
        class="relative z-10 w-full lg:w-[70%] aspect-video overflow-hidden rounded-2xl md:rounded-3xl border-2 border-neo-ink shadow-[6px_6px_0_0_#1a1a1a] bg-slate-900"
      >
        <div class="absolute inset-0">
          <NuxtLink
            v-if="current"
            :to="currentLink"
            class="group/card relative block h-full w-full overflow-hidden"
            :aria-label="title || current.title"
          >
            <img
              :alt="title || current.title"
              class="object-contain"
              style="
                position: absolute;
                height: 100%;
                width: 100%;
                inset: 0;
                color: transparent;
              "
              :src="current.image"
              @error="imageFallback"
            />
            <div
              class="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors duration-300"
            />
          </NuxtLink>

          <!-- Empty state -->
          <NuxtLink
            v-else
            to="/courses"
            class="relative flex h-full w-full flex-col items-center justify-center gap-3 neo-banner bg-neo-lavender text-center text-white"
          >
            <BaseIcon name="book-open" :size="64" class="text-white/70" />
            <h1 class="text-2xl font-extrabold md:text-4xl">
              {{ title || "Learn without limits" }}
            </h1>
            <p class="max-w-xl px-6 text-sm text-white/85 md:text-base">
              {{
                subtitle ||
                "Expert-led courses, practical quizzes and verifiable certificates — learn at your own pace."
              }}
            </p>
          </NuxtLink>
        </div>

        <template v-if="slides.length > 1">
          <button
            type="button"
            aria-label="Previous slide"
            class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-neo-ink bg-white text-neo-ink shadow-[2px_2px_0_0_#1a1a1a] transition-all duration-150 hover:-translate-x-px hover:-translate-y-px hover:bg-neo-lavender focus:outline-none"
            @click="go(prevIndex)"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
              />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next slide"
            class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/40 text-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            @click="go(nextIndex)"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"
              />
            </svg>
          </button>

          <div
            class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5"
          >
            <button
              v-for="(slide, i) in slides"
              :key="slide.id"
              type="button"
              :aria-label="`Go to slide ${i + 1}`"
              class="relative h-1.5 rounded-full overflow-hidden bg-white/30 transition-all duration-300 hover:bg-white/50"
              :class="i === index ? 'w-6 sm:w-8' : 'w-1.5 sm:w-2'"
              @click="go(i)"
            >
              <span
                v-if="i === index"
                :key="`progress-${index}-${tick}`"
                class="absolute inset-y-0 left-0 bg-white rounded-full hero-progress"
              />
            </button>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-progress {
  width: 100%;
  transform-origin: left;
  animation: hero-progress 5500ms linear forwards;
}

@keyframes hero-progress {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}
</style>
