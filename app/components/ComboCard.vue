<script setup lang="ts">
const props = defineProps<{
  combo: {
    name: string
    alt: string
    image: string
    courses: number
    courseNames: string[]
    price: string
    original: string
    save: string
    coupon: string
    couponOff: string
    prebook: boolean
    prebookEndsAt: string | null
    slug: string
  }
}>()

const now = useState<number>(`prebook-combo-${props.combo.slug || props.combo.name}`, () => Date.now())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  now.value = Date.now()
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

const remaining = computed(() => {
  if (!props.combo.prebook || !props.combo.prebookEndsAt) return 0
  const end = new Date(props.combo.prebookEndsAt).getTime()
  return Math.max(0, end - now.value)
})

const countdown = computed(() => {
  const total = remaining.value
  const days = Math.floor(total / 86400000)
  const hours = Math.floor((total % 86400000) / 3600000)
  const minutes = Math.floor((total % 3600000) / 60000)
  const seconds = Math.floor((total % 60000) / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return { days: `${days}d`, time: `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` }
})

const showCountdown = computed(
  () => props.combo.prebook && !!props.combo.prebookEndsAt && remaining.value > 0,
)
</script>

<template>
  <div class="group cursor-pointer h-full flex">
    <div class="group cursor-pointer h-full w-full">
      <a
        :href="combo.slug ? `/courses/${combo.slug}` : '/courses'"
        class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 h-full flex flex-col"
      >
        <div class="relative overflow-hidden aspect-video">
          <img
            :alt="combo.alt || combo.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            :src="combo.image"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div class="absolute top-4 left-4">
            <span
              class="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >Combo</span>
          </div>
        </div>
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex items-center gap-2 mb-3">
            <span class="text-sm text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded">
              {{ combo.courses }} courses
            </span>
          </div>
          <h3
            class="text-xl font-bold text-gray-700 mb-2 group-hover:text-indigo-600 transition-colors"
          >
            {{ combo.name }}
          </h3>
          <div class="flex flex-col justify-between h-full">
            <div class="flex-grow flex flex-col justify-center items-center bg-gray-50 rounded mb-3 py-4">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Courses:</h4>
              <div
                class="w-full px-2"
                :class="combo.courseNames.length > 3 ? 'grid grid-cols-2 gap-2' : 'flex flex-col gap-2'"
              >
                <span
                  v-for="courseName in combo.courseNames"
                  :key="courseName"
                  class="bg-blue-50 text-blue-700 px-4 py-2 rounded text-xs cursor-pointer hover:bg-blue-100 hover:text-blue-900 border border-blue-100 flex items-center justify-center text-center"
                >{{ courseName }}</span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-2xl font-bold text-indigo-600">{{ combo.price }}</span>
                <span v-if="combo.original" class="text-gray-400 line-through text-sm">{{ combo.original }}</span>
              </div>
              <span v-if="combo.save" class="text-green-600 text-sm font-medium">{{ combo.save }}</span>
            </div>
            <div
              v-if="combo.coupon"
              class="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded flex items-center gap-2 text-yellow-800 text-xs"
            >
              <span>Coupon: <b>{{ combo.coupon }}</b> ({{ combo.couponOff }})</span>
            </div>
            <div
              v-if="showCountdown"
              class="mb-2 p-2 bg-red-50 border border-red-200 rounded flex items-center gap-2 text-red-800 text-xs"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="w-3.5 h-3.5 flex-shrink-0"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span class="font-medium">Prebook ends in:</span>
              <div class="flex items-center gap-1">
                <span class="font-bold">{{ countdown.days }}</span>
                <span class="font-bold">{{ countdown.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
