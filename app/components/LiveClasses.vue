<script setup lang="ts">
import type { LiveSessionInfo } from '~/utils/community'

const props = defineProps<{ slug: string; isStaff: boolean; view: 'panel' | 'schedule' }>()

const { apiData } = useApi()
const { ask } = useConfirm()
const toast = useToast()
const state = useLiveSessions(props.slug)
const { live, next, upcoming, past } = state

const now = ref(Date.now())
let ticker: ReturnType<typeof setInterval> | null = null
let refresher: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  ticker = setInterval(() => (now.value = Date.now()), 1000)
  // pick up "went live" / "ended" changes made from another device
  refresher = setInterval(() => !document.hidden && state.load(), 20_000)
})
onBeforeUnmount(() => {
  if (ticker) clearInterval(ticker)
  if (refresher) clearInterval(refresher)
})

const elapsed = computed(() => {
  const s = live.value
  if (!s?.started_at) return ''
  return formatClock(Math.floor((now.value - new Date(s.started_at).getTime()) / 1000))
})

const focus = computed<LiveSessionInfo | null>(() => live.value ?? next.value)
const minutesToStart = computed(() => (focus.value ? Math.floor((new Date(focus.value.scheduled_at).getTime() - now.value) / 60000) : 0))

function when(value: string) {
  return new Date(value).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

/* ------------------------------ staff actions ------------------------------ */
const busy = ref<number | null>(null)

async function call(session: LiveSessionInfo, action: string, body?: Record<string, unknown>, success?: string) {
  busy.value = session.id
  try {
    await apiData(`/live-sessions/${session.id}/${action}`, { method: 'POST', body })
    if (success) toast.success(success)
    await state.load()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

const goLive = (s: LiveSessionInfo) => call(s, 'start', undefined, 'You are live! Students were notified.')
const lockChat = (s: LiveSessionInfo) => call(s, 'lock-chat', undefined, s.chat_locked ? 'Chat unlocked.' : 'Chat locked — only you can write.')

async function endClass(s: LiveSessionInfo) {
  const ok = await ask({ title: 'End class', message: 'End this live class for everyone? Chat stays readable.', confirmLabel: 'End class' })
  if (ok) await call(s, 'end', undefined, 'Class ended.')
}

async function cancelClass(s: LiveSessionInfo) {
  const ok = await ask({ title: 'Cancel class', message: `Cancel “${s.title}” and notify students?`, confirmLabel: 'Cancel class' })
  if (ok) await call(s, 'cancel', undefined, 'Class cancelled.')
}

async function deleteClass(s: LiveSessionInfo) {
  const ok = await ask({ title: 'Delete class', message: `Delete “${s.title}” and its chat history?`, confirmLabel: 'Delete' })
  if (!ok) return
  busy.value = s.id
  try {
    await apiData(`/live-sessions/${s.id}`, { method: 'DELETE' })
    await state.load()
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    busy.value = null
  }
}

/* ------------------------------ schedule form ------------------------------ */
const modal = ref(false)
const editing = ref<LiveSessionInfo | null>(null)
const saving = ref(false)
const errors = ref<Record<string, string[]>>({})
const form = reactive({ title: '', description: '', join_url: '', date: '', duration_minutes: 60, recording_url: '', chat_enabled: true, announce: true })

function toLocalInput(iso: string) {
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function openForm(session?: LiveSessionInfo) {
  editing.value = session ?? null
  errors.value = {}
  const inOneHour = new Date(Date.now() + 3_600_000)
  inOneHour.setMinutes(0, 0, 0)
  Object.assign(form, {
    title: session?.title ?? '',
    description: session?.description ?? '',
    join_url: session?.join_url ?? '',
    date: session ? toLocalInput(session.scheduled_at) : toLocalInput(inOneHour.toISOString()),
    duration_minutes: session?.duration_minutes ?? 60,
    recording_url: session?.recording_url ?? '',
    chat_enabled: session?.chat_enabled ?? true,
    announce: true,
  })
  modal.value = true
}

async function save() {
  saving.value = true
  errors.value = {}
  try {
    const body = {
      title: form.title,
      description: form.description || null,
      join_url: form.join_url.trim(),
      scheduled_at: new Date(form.date).toISOString(),
      duration_minutes: Number(form.duration_minutes) || 60,
      chat_enabled: form.chat_enabled,
      ...(editing.value ? { recording_url: form.recording_url.trim() || null } : { announce: form.announce }),
    }
    if (editing.value) await apiData(`/live-sessions/${editing.value.id}/update`, { method: 'POST', body })
    else await apiData(`/courses/${props.slug}/live-sessions`, { method: 'POST', body })
    modal.value = false
    toast.success(editing.value ? 'Class updated.' : 'Class scheduled — students were notified.')
    await state.load()
  } catch (err) {
    errors.value = (err as { errors?: Record<string, string[]> }).errors ?? {}
    toast.error((err as Error).message)
  } finally {
    saving.value = false
  }
}

defineExpose({ openForm })
</script>

<template>
  <div>
    <!-- ============================ live / next panel ============================ -->
    <template v-if="view === 'panel'">
      <div v-if="state.loading.value && !focus" class="card h-48 animate-pulse bg-gray-50" />

      <section v-else-if="focus" class="grid gap-4" :class="live && focus.chat_enabled ? 'lg:grid-cols-[minmax(0,1fr)_360px]' : ''">
        <div class="space-y-3">
          <!-- player / join card -->
          <div class="overflow-hidden rounded-2xl bg-gray-900 shadow-sm">
            <div v-if="live && focus.embed_url" class="relative aspect-video">
              <iframe :src="focus.embed_url" :title="focus.title" class="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen />
            </div>
            <div v-else class="relative flex min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-oc-primary/80 p-6 text-center text-white">
              <span v-if="live" class="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
                <span class="h-2 w-2 animate-pulse rounded-full bg-white" /> Live now · {{ elapsed }}
              </span>
              <span v-else class="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Next class</span>
              <h2 class="mt-3 text-xl font-extrabold md:text-2xl">{{ focus.title }}</h2>
              <p class="mt-1 text-sm text-white/70">{{ when(focus.scheduled_at) }} · {{ focus.duration_minutes }} min · {{ providerOf(focus.provider).label }}</p>
              <p v-if="!live" class="mt-3 font-mono text-3xl font-extrabold tabular-nums">{{ countdown(focus.scheduled_at, now) }}</p>
              <a
                v-if="focus.join_url"
                :href="focus.join_url"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold shadow-lg transition"
                :class="live || minutesToStart <= 15 ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-white/20 text-white hover:bg-white/30'"
              >
                <BaseIcon name="video" :size="18" /> {{ live ? `Join ${providerOf(focus.provider).label} class` : minutesToStart <= 15 ? 'Join class' : 'Open class link' }}
              </a>
            </div>
          </div>

          <div class="card flex flex-wrap items-start justify-between gap-3 p-4">
            <div class="min-w-0">
              <h3 class="text-base font-bold text-gray-900">{{ focus.title }}</h3>
              <p v-if="focus.description" class="mt-1 whitespace-pre-line text-sm text-gray-600">{{ focus.description }}</p>
              <a v-if="!live" :href="calendarLink(focus)" target="_blank" rel="noopener noreferrer" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-oc-primary hover:underline"><BaseIcon name="calendar" :size="13" /> Add to Google Calendar</a>
            </div>
            <div v-if="isStaff" class="flex flex-wrap gap-2">
              <button v-if="!live" type="button" class="btn-primary" :disabled="busy === focus.id" @click="goLive(focus)"><BaseIcon name="play" :size="15" /> Go live</button>
              <template v-else>
                <button type="button" class="btn-secondary" :disabled="busy === focus.id" @click="lockChat(focus)">{{ focus.chat_locked ? 'Unlock chat' : 'Lock chat' }}</button>
                <button type="button" class="btn-danger" :disabled="busy === focus.id" @click="endClass(focus)">End class</button>
              </template>
              <button type="button" class="btn-ghost" @click="openForm(focus)"><BaseIcon name="edit" :size="15" /> Edit</button>
            </div>
          </div>
        </div>

        <LiveChat v-if="live && focus.chat_enabled" :key="focus.id" :session-id="focus.id" :is-staff="isStaff" :course-slug="slug" @session="state.patch" />
      </section>

      <section v-else class="card flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h3 class="text-sm font-bold text-gray-900">No class scheduled</h3>
          <p class="text-xs text-gray-500">{{ isStaff ? 'Schedule your next live class — students are notified automatically.' : 'You will be notified when your instructor schedules a live class.' }}</p>
        </div>
        <button v-if="isStaff" type="button" class="btn-primary" @click="openForm()"><BaseIcon name="video" :size="16" /> Schedule a live class</button>
      </section>
    </template>

    <!-- ================================ schedule ================================ -->
    <template v-else>
      <div v-if="isStaff" class="mb-4 flex justify-end"><button type="button" class="btn-primary" @click="openForm()"><BaseIcon name="plus" :size="16" /> Schedule class</button></div>

      <h3 class="mb-2 text-sm font-bold text-gray-900">Upcoming</h3>
      <EmptyState v-if="!upcoming.length && !live" icon="calendar" title="No upcoming classes" message="Scheduled live classes will show up here." />
      <ul v-else class="space-y-2">
        <li v-for="s in [...(live ? [live] : []), ...upcoming]" :key="s.id" class="card flex flex-wrap items-center gap-3 p-4">
          <span class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-center" :class="s.status === 'live' ? 'bg-red-100 text-red-600' : 'bg-brand-light text-oc-primary'">
            <span class="text-[10px] font-bold uppercase">{{ new Date(s.scheduled_at).toLocaleString(undefined, { month: 'short' }) }}</span>
            <span class="text-lg font-extrabold leading-none">{{ new Date(s.scheduled_at).getDate() }}</span>
          </span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-gray-900">{{ s.title }} <span v-if="s.status === 'live'" class="ml-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Live</span></p>
            <p class="text-xs text-gray-500">{{ when(s.scheduled_at) }} · {{ s.duration_minutes }} min · {{ providerOf(s.provider).label }}</p>
          </div>
          <a v-if="s.join_url" :href="s.join_url" target="_blank" rel="noopener noreferrer nofollow" class="btn-secondary !px-3 !py-1.5 text-xs">Open link</a>
          <div v-if="isStaff" class="flex gap-1">
            <button v-if="s.status === 'scheduled'" type="button" class="btn-primary !px-3 !py-1.5 text-xs" :disabled="busy === s.id" @click="goLive(s)">Go live</button>
            <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openForm(s)">Edit</button>
            <button v-if="s.status === 'scheduled'" type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600" @click="cancelClass(s)">Cancel</button>
          </div>
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-sm font-bold text-gray-900">Past classes</h3>
      <EmptyState v-if="!past.length" icon="clock" title="Nothing yet" message="Finished classes and recordings appear here." />
      <ul v-else class="space-y-2">
        <li v-for="s in past" :key="s.id" class="card flex flex-wrap items-center gap-3 p-4" :class="s.status === 'cancelled' ? 'opacity-60' : ''">
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-gray-900">{{ s.title }}</p>
            <p class="text-xs text-gray-500">{{ when(s.scheduled_at) }} · <span class="capitalize">{{ s.status }}</span></p>
          </div>
          <a v-if="s.recording_url" :href="s.recording_url" target="_blank" rel="noopener noreferrer nofollow" class="btn-secondary !px-3 !py-1.5 text-xs"><BaseIcon name="play" :size="13" /> Watch recording</a>
          <div v-if="isStaff" class="flex gap-1">
            <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs" @click="openForm(s)">{{ s.recording_url ? 'Edit' : 'Add recording' }}</button>
            <button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600" @click="deleteClass(s)">Delete</button>
          </div>
        </li>
      </ul>
    </template>

    <!-- schedule / edit modal -->
    <AppModal :open="modal" :title="editing ? 'Edit live class' : 'Schedule a live class'" size="md" @close="modal = false">
      <form class="space-y-4" @submit.prevent="save">
        <div>
          <label class="field-label" for="live-title">Title</label>
          <input id="live-title" v-model="form.title" class="field-input" maxlength="255" required placeholder="e.g. Writing Task 2 — live practice">
          <p v-if="errors.title" class="field-error">{{ errors.title[0] }}</p>
        </div>
        <div>
          <label class="field-label" for="live-url">Class link</label>
          <input id="live-url" v-model="form.join_url" type="url" class="field-input" required placeholder="https://zoom.us/j/… · https://meet.google.com/… · YouTube / Facebook live link">
          <p class="mt-1 text-[11px] text-gray-400">Only enrolled students can see this link. A YouTube live link plays right here next to the chat.</p>
          <p v-if="errors.join_url" class="field-error">{{ errors.join_url[0] }}</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div>
            <label class="field-label" for="live-date">Date &amp; time</label>
            <input id="live-date" v-model="form.date" type="datetime-local" class="field-input" required>
            <p v-if="errors.scheduled_at" class="field-error">{{ errors.scheduled_at[0] }}</p>
          </div>
          <div>
            <label class="field-label" for="live-duration">Duration (minutes)</label>
            <input id="live-duration" v-model.number="form.duration_minutes" type="number" min="5" max="720" class="field-input">
          </div>
        </div>
        <div>
          <label class="field-label" for="live-desc">Description / agenda</label>
          <textarea id="live-desc" v-model="form.description" rows="3" class="field-input" maxlength="2000" placeholder="Topics, what to prepare, passcode…" />
        </div>
        <div v-if="editing">
          <label class="field-label" for="live-rec">Recording link (after the class)</label>
          <input id="live-rec" v-model="form.recording_url" type="url" class="field-input" placeholder="https://youtu.be/…">
          <p v-if="errors.recording_url" class="field-error">{{ errors.recording_url[0] }}</p>
        </div>
        <div class="flex flex-wrap gap-5 text-sm text-gray-700">
          <label class="flex items-center gap-2"><input v-model="form.chat_enabled" type="checkbox" class="h-4 w-4 rounded border-gray-300"> Enable live chat</label>
          <label v-if="!editing" class="flex items-center gap-2"><input v-model="form.announce" type="checkbox" class="h-4 w-4 rounded border-gray-300"> Post an announcement &amp; notify students</label>
        </div>
      </form>
      <template #footer>
        <button type="button" class="btn-secondary" :disabled="saving" @click="modal = false">Cancel</button>
        <button type="button" class="btn-primary" :disabled="saving || !form.title || !form.join_url" @click="save">{{ saving ? 'Saving…' : editing ? 'Save class' : 'Schedule class' }}</button>
      </template>
    </AppModal>
  </div>
</template>
