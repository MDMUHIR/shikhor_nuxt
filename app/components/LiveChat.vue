<script setup lang="ts">
import type { CommunityComment, LiveSessionInfo } from '~/utils/community'

const props = defineProps<{
  sessionId: number
  isStaff: boolean
  courseSlug: string
}>()

const emit = defineEmits<{ session: [session: LiveSessionInfo] }>()

interface ChatPayload {
  role: 'staff' | 'student'
  session: LiveSessionInfo
  messages: CommunityComment[]
  pinned: CommunityComment | null
  removed_ids: number[]
  muted: boolean
}

const { apiData } = useApi()
const { user } = useAuth()
const toast = useToast()

const messages = ref<CommunityComment[]>([])
const pinned = ref<CommunityComment | null>(null)
const session = ref<LiveSessionInfo | null>(null)
const muted = ref(false)
const draft = ref('')
const sending = ref(false)
const failed = ref(false)
const stickToBottom = ref(true)
const unseen = ref(0)
const listEl = ref<HTMLElement | null>(null)
const menuFor = ref<number | null>(null)

const MAX = 500
let lastId = 0
let timer: ReturnType<typeof setTimeout> | null = null
let stopped = false

const canWrite = computed(() => {
  const s = session.value
  if (!s || !s.chat_enabled) return false
  if (props.isStaff) return true
  return !s.chat_locked && !muted.value && s.status !== 'ended' && s.status !== 'cancelled'
})

const placeholder = computed(() => {
  const s = session.value
  if (!s) return 'Chat'
  if (!s.chat_enabled) return 'Chat is turned off'
  if (muted.value) return 'You cannot chat right now'
  if (s.chat_locked && !props.isStaff) return 'Chat is locked by the instructor'
  if (s.status === 'ended') return 'This class has ended'
  return 'Say something…'
})

function scrollDown(force = false) {
  nextTick(() => {
    const el = listEl.value
    if (el && (force || stickToBottom.value)) el.scrollTop = el.scrollHeight
  })
}

function onScroll() {
  const el = listEl.value
  if (!el) return
  stickToBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < 60
  if (stickToBottom.value) unseen.value = 0
}

function merge(incoming: CommunityComment[]) {
  const known = new Set(messages.value.map((m) => m.id))
  const fresh = incoming.filter((m) => !known.has(m.id))
  if (!fresh.length) return
  messages.value = [...messages.value, ...fresh].slice(-300)
  lastId = Math.max(lastId, ...fresh.map((m) => m.id))
  if (stickToBottom.value) scrollDown()
  else unseen.value += fresh.length
}

async function poll() {
  if (stopped) return
  try {
    const data = await apiData<ChatPayload>(`/live-sessions/${props.sessionId}/chat`, { query: { after: lastId || undefined } })
    failed.value = false
    session.value = data.session
    muted.value = data.muted
    pinned.value = data.pinned
    if (data.removed_ids?.length) {
      const gone = new Set(data.removed_ids)
      messages.value = messages.value.filter((m) => !gone.has(m.id))
    }
    merge(data.messages)
    emit('session', data.session)
  } catch {
    failed.value = true
  }
  // Live chats poll fast; idle/hidden tabs and ended classes slow down.
  const hidden = typeof document !== 'undefined' && document.hidden
  const delay = hidden ? 10_000 : session.value?.status === 'live' ? 2_500 : 6_000
  timer = setTimeout(poll, failed.value ? 8_000 : delay)
}

async function send() {
  const body = draft.value.trim()
  if (!body || sending.value || !canWrite.value) return
  sending.value = true
  try {
    const sent = await apiData<CommunityComment>(`/live-sessions/${props.sessionId}/chat`, { method: 'POST', body: { body } })
    draft.value = ''
    stickToBottom.value = true
    merge([sent])
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    sending.value = false
  }
}


async function pin(message: CommunityComment) {
  menuFor.value = null
  try {
    await apiData(`/comments/${message.id}/pin`, { method: 'POST', body: { pinned: !message.is_pinned } })
    pinned.value = message.is_pinned ? null : message
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function remove(message: CommunityComment) {
  menuFor.value = null
  try {
    await apiData(`/comments/${message.id}`, { method: 'DELETE' })
    messages.value = messages.value.filter((m) => m.id !== message.id)
    if (pinned.value?.id === message.id) pinned.value = null
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function mute(message: CommunityComment) {
  menuFor.value = null
  if (!message.author) return
  try {
    await apiData(`/courses/${props.courseSlug}/mute`, { method: 'POST', body: { user_id: message.author.id, minutes: 30 } })
    toast.success(`${message.author.name} muted for 30 minutes.`)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

onMounted(() => {
  poll()
})

onBeforeUnmount(() => {
  stopped = true
  if (timer) clearTimeout(timer)
})

function mine(message: CommunityComment) {
  return message.author?.id === user.value?.id
}
</script>

<template>
  <section class="flex h-[560px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:h-full lg:min-h-[480px]">
    <header class="flex items-center justify-between border-b border-gray-100 px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="relative flex h-2.5 w-2.5">
          <span v-if="session?.status === 'live'" class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span class="relative inline-flex h-2.5 w-2.5 rounded-full" :class="session?.status === 'live' ? 'bg-red-500' : 'bg-gray-300'" />
        </span>
        <h3 class="text-sm font-bold text-gray-900">Live chat</h3>
      </div>
      <span v-if="session?.chat_locked" class="badge bg-amber-50 text-amber-700 ring-amber-200">Locked</span>
    </header>

    <div v-if="pinned" class="flex items-start gap-2 border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-900">
      <span class="mt-0.5 font-bold">Pinned</span>
      <p class="min-w-0 flex-1 break-words"><b>{{ pinned.author?.name }}:</b> <template v-for="(part, i) in linkSegments(pinned.body)" :key="i"><a v-if="part.url" :href="part.url" target="_blank" rel="noopener noreferrer nofollow" class="font-semibold underline">{{ part.text }}</a><template v-else>{{ part.text }}</template></template></p>
    </div>

    <div ref="listEl" class="relative flex-1 space-y-2.5 overflow-y-auto px-4 py-3" @scroll="onScroll">
      <p v-if="failed" class="rounded-lg bg-rose-50 px-3 py-1.5 text-center text-[11px] text-rose-600">Reconnecting…</p>
      <p v-if="!messages.length" class="py-10 text-center text-xs text-gray-400">No messages yet. Say hello 👋</p>

      <div v-for="message in messages" :key="message.id" class="group relative flex items-start gap-2.5 text-[13px] leading-5">
        <img v-if="message.author?.avatar" :src="mediaUrl(message.author.avatar)" :alt="message.author.name" class="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover" @error="imageFallback">
        <span v-else class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-oc-primary">{{ initials(message.author?.name) }}</span>
        <p class="min-w-0 flex-1 break-words">
          <span class="font-semibold" :class="message.author?.badge ? 'text-oc-primary' : mine(message) ? 'text-gray-900' : 'text-gray-500'">{{ message.author?.name }}</span>
          <span v-if="message.author?.badge" class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">{{ message.author.badge === 'admin' ? 'Admin' : 'Instructor' }}</span>
          <span class="ml-1.5 text-gray-800">
            <template v-for="(part, i) in linkSegments(message.body)" :key="i"><a v-if="part.url" :href="part.url" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">{{ part.text }}</a><template v-else>{{ part.text }}</template></template>
          </span>
        </p>
        <div v-if="isStaff || mine(message)" class="relative shrink-0">
          <button type="button" class="invisible rounded px-1 text-gray-400 hover:bg-gray-100 group-hover:visible" aria-label="Message actions" @click="menuFor = menuFor === message.id ? null : message.id">⋯</button>
          <div v-if="menuFor === message.id" class="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 text-xs shadow-lg">
            <button v-if="isStaff" type="button" class="block w-full px-3 py-1.5 text-left hover:bg-gray-50" @click="pin(message)">{{ message.is_pinned ? 'Unpin' : 'Pin message' }}</button>
            <button v-if="isStaff && !message.author?.badge" type="button" class="block w-full px-3 py-1.5 text-left hover:bg-gray-50" @click="mute(message)">Mute 30 min</button>
            <button type="button" class="block w-full px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50" @click="remove(message)">Delete</button>
          </div>
        </div>
      </div>

      <button v-if="unseen" type="button" class="sticky bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-oc-primary px-3 py-1 text-[11px] font-semibold text-white shadow" @click="scrollDown(true); unseen = 0; stickToBottom = true">
        ↓ {{ unseen }} new message{{ unseen === 1 ? '' : 's' }}
      </button>
    </div>

    <form class="border-t border-gray-100 p-3" @submit.prevent="send">
      <div class="flex items-end gap-2">
        <textarea
          v-model="draft"
          rows="1"
          :maxlength="MAX"
          :disabled="!canWrite"
          :placeholder="placeholder"
          class="field-input max-h-24 min-h-[40px] flex-1 resize-none py-2 text-sm"
          @keydown.enter.exact.prevent="send"
        />
        <button type="submit" class="btn-primary !px-4" :disabled="!canWrite || !draft.trim() || sending">Send</button>
      </div>
      <p class="mt-1 text-right text-[10px] text-gray-400">{{ draft.length }}/{{ MAX }}</p>
    </form>
  </section>
</template>
