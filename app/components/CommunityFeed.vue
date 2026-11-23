<script setup lang="ts">
import type { CommunityComment, CommunityPost } from '~/utils/community'
import type { Paginator } from '~/utils/types'

const props = defineProps<{ slug: string; isStaff: boolean }>()

const { apiData } = useApi()
const { user } = useAuth()
const { ask } = useConfirm()
const toast = useToast()

interface FeedPayload {
  role: 'staff' | 'student'
  posts: Paginator<CommunityPost>
}

const page = ref(1)
const posts = ref<CommunityPost[]>([])
const lastPage = ref(1)
const loading = ref(false)
const error = ref('')

async function load(reset = false) {
  if (reset) page.value = 1
  loading.value = true
  error.value = ''
  try {
    const data = await apiData<FeedPayload>(`/courses/${props.slug}/posts`, { query: { page: page.value, per_page: 8 } })
    lastPage.value = data.posts.last_page
    posts.value = reset || page.value === 1 ? data.posts.data : [...posts.value, ...data.posts.data]
  } catch (err) {
    error.value = (err as Error).message
  } finally {
    loading.value = false
  }
}

await load(true)

// ------------------------------ composer (staff) ------------------------------
const composer = reactive({ title: '', body: '', link_url: '', link_label: '', is_pinned: false, notify: true })
const posting = ref(false)
const composerErrors = ref<Record<string, string[]>>({})
const showLink = ref(false)

async function publish() {
  posting.value = true
  composerErrors.value = {}
  try {
    await apiData(`/courses/${props.slug}/posts`, {
      method: 'POST',
      body: { ...composer, link_url: composer.link_url.trim() || null, link_label: composer.link_label.trim() || null },
    })
    Object.assign(composer, { title: '', body: '', link_url: '', link_label: '', is_pinned: false, notify: true })
    showLink.value = false
    toast.success('Announcement posted.')
    await load(true)
  } catch (err) {
    composerErrors.value = (err as { errors?: Record<string, string[]> }).errors ?? {}
    toast.error((err as Error).message)
  } finally {
    posting.value = false
  }
}

// ----------------------------------- posts -----------------------------------
const menu = ref<number | null>(null)
const editing = ref<CommunityPost | null>(null)
const editForm = reactive({ title: '', body: '', link_url: '', link_label: '' })

function startEdit(post: CommunityPost) {
  menu.value = null
  editing.value = post
  Object.assign(editForm, { title: post.title ?? '', body: post.body, link_url: post.link_url ?? '', link_label: post.link_label ?? '' })
}

async function saveEdit() {
  if (!editing.value) return
  try {
    await apiData(`/posts/${editing.value.id}/update`, {
      method: 'POST',
      body: { ...editForm, link_url: editForm.link_url.trim() || null, link_label: editForm.link_label.trim() || null },
    })
    editing.value = null
    toast.success('Announcement updated.')
    await load(true)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function togglePin(post: CommunityPost) {
  menu.value = null
  try {
    await apiData(`/posts/${post.id}/pin`, { method: 'POST', body: { pinned: !post.is_pinned } })
    await load(true)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function toggleLock(post: CommunityPost) {
  menu.value = null
  try {
    const result = await apiData<{ comments_locked: boolean }>(`/posts/${post.id}/lock-comments`, { method: 'POST' })
    post.comments_locked = result.comments_locked
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function removePost(post: CommunityPost) {
  menu.value = null
  const ok = await ask({ title: 'Delete announcement', message: 'Delete this announcement and all its comments?', confirmLabel: 'Delete' })
  if (!ok) return
  try {
    await apiData(`/posts/${post.id}`, { method: 'DELETE' })
    posts.value = posts.value.filter((p) => p.id !== post.id)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function likePost(post: CommunityPost) {
  const before = { liked: post.liked_by_me, count: post.likes_count }
  post.liked_by_me = !post.liked_by_me
  post.likes_count += post.liked_by_me ? 1 : -1
  try {
    const result = await apiData<{ liked: boolean; likes_count: number }>(`/posts/${post.id}/like`, { method: 'POST' })
    post.liked_by_me = result.liked
    post.likes_count = result.likes_count
  } catch (err) {
    post.liked_by_me = before.liked
    post.likes_count = before.count
    toast.error((err as Error).message)
  }
}

// --------------------------------- comments ----------------------------------
interface CommentState {
  open: boolean
  loading: boolean
  items: CommunityComment[]
  page: number
  last: number
  draft: string
  replyTo: CommunityComment | null
  sending: boolean
}
const threads = reactive<Record<number, CommentState>>({})

function thread(post: CommunityPost): CommentState {
  if (!threads[post.id]) {
    threads[post.id] = { open: false, loading: false, items: [], page: 1, last: 1, draft: '', replyTo: null, sending: false }
  }
  return threads[post.id]!
}

async function loadComments(post: CommunityPost, more = false) {
  const t = thread(post)
  t.loading = true
  try {
    const next = more ? t.page + 1 : 1
    const data = await apiData<Paginator<CommunityComment>>(`/posts/${post.id}/comments`, { query: { page: next, per_page: 6 } })
    t.page = data.current_page
    t.last = data.last_page
    t.items = more ? [...t.items, ...data.data] : data.data
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    t.loading = false
  }
}

async function toggleComments(post: CommunityPost) {
  const t = thread(post)
  t.open = !t.open
  if (t.open && !t.items.length) await loadComments(post)
}

async function sendComment(post: CommunityPost) {
  const t = thread(post)
  const body = t.draft.trim()
  if (!body || t.sending) return
  t.sending = true
  try {
    const comment = await apiData<CommunityComment>(`/posts/${post.id}/comments`, {
      method: 'POST',
      body: { body, parent_id: t.replyTo?.id ?? null },
    })
    if (t.replyTo) {
      const parent = t.items.find((c) => c.id === t.replyTo!.id)
      if (parent) parent.replies = [...(parent.replies ?? []), comment]
    } else {
      t.items = [{ ...comment, replies: [] }, ...t.items]
    }
    post.comments_count += 1
    t.draft = ''
    t.replyTo = null
  } catch (err) {
    toast.error((err as Error).message)
  } finally {
    t.sending = false
  }
}

async function likeComment(comment: CommunityComment) {
  const before = { liked: comment.liked_by_me, count: comment.likes_count }
  comment.liked_by_me = !comment.liked_by_me
  comment.likes_count += comment.liked_by_me ? 1 : -1
  try {
    const result = await apiData<{ liked: boolean; likes_count: number }>(`/comments/${comment.id}/like`, { method: 'POST' })
    comment.liked_by_me = result.liked
    comment.likes_count = result.likes_count
  } catch (err) {
    comment.liked_by_me = before.liked
    comment.likes_count = before.count
    toast.error((err as Error).message)
  }
}

async function removeComment(post: CommunityPost, comment: CommunityComment) {
  try {
    await apiData(`/comments/${comment.id}`, { method: 'DELETE' })
    const t = thread(post)
    if (comment.parent_id) {
      const parent = t.items.find((c) => c.id === comment.parent_id)
      if (parent) parent.replies = (parent.replies ?? []).filter((r) => r.id !== comment.id)
      post.comments_count = Math.max(0, post.comments_count - 1)
    } else {
      post.comments_count = Math.max(0, post.comments_count - 1 - (comment.replies?.length ?? 0))
      t.items = t.items.filter((c) => c.id !== comment.id)
    }
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function pinComment(post: CommunityPost, comment: CommunityComment) {
  try {
    await apiData(`/comments/${comment.id}/pin`, { method: 'POST', body: { pinned: !comment.is_pinned } })
    await loadComments(post)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

async function muteAuthor(comment: CommunityComment) {
  if (!comment.author) return
  const ok = await ask({ title: 'Mute student', message: `Stop ${comment.author.name} from commenting for 24 hours?`, confirmLabel: 'Mute for 24h' })
  if (!ok) return
  try {
    await apiData(`/courses/${props.slug}/mute`, { method: 'POST', body: { user_id: comment.author.id, minutes: 1440 } })
    toast.success(`${comment.author.name} muted.`)
  } catch (err) {
    toast.error((err as Error).message)
  }
}

const mine = (c: { author: { id: number } | null }) => c.author?.id === user.value?.id
defineExpose({ reload: () => load(true) })
</script>

<template>
  <div class="space-y-4">
    <!-- Composer (instructors & admins) -->
    <section v-if="isStaff" class="card p-4">
      <div class="flex items-start gap-3">
        <span class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary sm:flex">{{ initials(user?.name) }}</span>
        <div class="min-w-0 flex-1 space-y-2">
          <input v-model="composer.title" class="field-input" placeholder="Title (optional) — e.g. Class on Saturday 8 PM" maxlength="255">
          <textarea v-model="composer.body" rows="3" class="field-input" placeholder="Share an update, the next class time, homework…" maxlength="5000" />
          <p v-if="composerErrors.body" class="field-error">{{ composerErrors.body[0] }}</p>
          <div v-if="showLink" class="grid gap-2 sm:grid-cols-2">
            <div>
              <input v-model="composer.link_url" type="url" class="field-input" placeholder="https:// Zoom / Meet / WhatsApp / Facebook group link">
              <p v-if="composerErrors.link_url" class="field-error">{{ composerErrors.link_url[0] }}</p>
            </div>
            <input v-model="composer.link_label" class="field-input" placeholder="Button text (e.g. Join WhatsApp group)" maxlength="120">
          </div>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              <button type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="showLink = !showLink">{{ showLink ? 'Remove link' : '+ Add a link' }}</button>
              <label class="flex items-center gap-1.5"><input v-model="composer.is_pinned" type="checkbox" class="h-3.5 w-3.5 rounded border-gray-300"> Pin to top</label>
              <label class="flex items-center gap-1.5"><input v-model="composer.notify" type="checkbox" class="h-3.5 w-3.5 rounded border-gray-300"> Notify students</label>
            </div>
            <button type="button" class="btn-primary w-full sm:w-auto" :disabled="posting || !composer.body.trim()" @click="publish">{{ posting ? 'Posting…' : 'Post' }}</button>
          </div>
        </div>
      </div>
    </section>

    <p v-if="error" class="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">{{ error }}</p>
    <EmptyState v-else-if="!posts.length && !loading" icon="info" title="No announcements yet" :message="isStaff ? 'Post the next class time or a group link above.' : 'Your instructor will post class updates here.'" />

    <article v-for="post in posts" :key="post.id" class="card p-4" :class="post.is_pinned ? 'border-amber-200 bg-amber-50/30' : ''">
      <header class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <img v-if="post.author?.avatar" :src="mediaUrl(post.author.avatar)" :alt="post.author.name" class="h-10 w-10 rounded-full object-cover" @error="imageFallback">
          <span v-else class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary">{{ initials(post.author?.name) }}</span>
          <div>
            <p class="text-sm font-bold text-gray-900">
              {{ post.author?.name }}
              <span v-if="post.author?.badge" class="ml-1 rounded bg-oc-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">{{ post.author.badge === 'admin' ? 'Admin' : 'Instructor' }}</span>
            </p>
            <p class="text-[11px] text-gray-400">
              {{ timeAgo(post.created_at) }}<span v-if="post.is_pinned" class="ml-2 font-semibold text-amber-600">Pinned</span><span v-if="post.comments_locked" class="ml-2">Comments off</span>
            </p>
          </div>
        </div>
        <div v-if="isStaff" class="relative">
          <button type="button" class="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100" aria-label="Announcement actions" @click="menu = menu === post.id ? null : post.id">⋯</button>
          <div v-if="menu === post.id" class="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-sm shadow-lg">
            <button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50" @click="togglePin(post)">{{ post.is_pinned ? 'Unpin' : 'Pin to top' }}</button>
            <button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50" @click="startEdit(post)">Edit</button>
            <button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50" @click="toggleLock(post)">{{ post.comments_locked ? 'Turn comments on' : 'Turn comments off' }}</button>
            <button type="button" class="block w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50" @click="removePost(post)">Delete</button>
          </div>
        </div>
      </header>

      <div v-if="editing?.id === post.id" class="mt-3 space-y-2">
        <input v-model="editForm.title" class="field-input" placeholder="Title" maxlength="255">
        <textarea v-model="editForm.body" rows="4" class="field-input" maxlength="5000" />
        <div class="grid gap-2 sm:grid-cols-2">
          <input v-model="editForm.link_url" class="field-input" placeholder="https:// link">
          <input v-model="editForm.link_label" class="field-input" placeholder="Button text">
        </div>
        <div class="flex gap-2"><button type="button" class="btn-primary" @click="saveEdit">Save</button><button type="button" class="btn-secondary" @click="editing = null">Cancel</button></div>
      </div>

      <template v-else>
        <h3 v-if="post.title" class="mt-3 text-base font-bold text-gray-900">{{ post.title }}</h3>
        <p class="mt-1.5 whitespace-pre-line break-words text-sm leading-6 text-gray-700"><template v-for="(part, i) in linkSegments(post.body)" :key="i"><a v-if="part.url" :href="part.url" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">{{ part.text }}</a><template v-else>{{ part.text }}</template></template></p>

        <a v-if="post.link_url" :href="post.link_url" target="_blank" rel="noopener noreferrer nofollow" class="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-oc-primary">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold" :class="providerOf(post.link_provider).cls">{{ providerOf(post.link_provider).short }}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-semibold text-gray-900">{{ post.link_label || 'Open link' }}</span>
            <span class="block truncate text-[11px] text-gray-400">{{ providerOf(post.link_provider).label }} · {{ hostOf(post.link_url) }}</span>
          </span>
          <BaseIcon name="external-link" :size="16" class="text-gray-400" />
        </a>
      </template>

      <div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
        <span>{{ post.likes_count ? `${post.likes_count} like${post.likes_count === 1 ? '' : 's'}` : '' }}</span>
        <span>{{ post.comments_count ? `${post.comments_count} comment${post.comments_count === 1 ? '' : 's'}` : '' }}</span>
      </div>
      <div class="grid grid-cols-2 gap-1 border-t border-gray-100 pt-1">
        <button type="button" class="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition hover:bg-gray-50" :class="post.liked_by_me ? 'text-oc-primary' : 'text-gray-600'" @click="likePost(post)">
          <BaseIcon name="heart" :size="16" :filled="post.liked_by_me" /> Like
        </button>
        <button type="button" class="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50" @click="toggleComments(post)">
          <BaseIcon name="info" :size="16" /> Comment
        </button>
      </div>

      <!-- Comments -->
      <div v-if="thread(post).open" class="mt-3 space-y-3 border-t border-gray-100 pt-3">
        <form v-if="!post.comments_locked || isStaff" class="flex items-start gap-2" @submit.prevent="sendComment(post)">
          <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">{{ initials(user?.name) }}</span>
          <div class="min-w-0 flex-1">
            <p v-if="thread(post).replyTo" class="mb-1 text-[11px] text-gray-500">Replying to <b>{{ thread(post).replyTo?.author?.name }}</b> · <button type="button" class="underline" @click="thread(post).replyTo = null">cancel</button></p>
            <div class="flex gap-2">
              <input v-model="thread(post).draft" class="field-input !rounded-full" placeholder="Write a comment…" maxlength="1000" @keydown.enter.prevent="sendComment(post)">
              <button type="submit" class="btn-primary !rounded-full !px-4" :disabled="!thread(post).draft.trim() || thread(post).sending">Send</button>
            </div>
          </div>
        </form>
        <p v-else class="text-center text-xs text-gray-400">Comments are turned off for this announcement.</p>

        <div v-if="thread(post).loading && !thread(post).items.length" class="h-12 animate-pulse rounded-xl bg-gray-50" />

        <div v-for="comment in thread(post).items" :key="comment.id" class="space-y-2">
          <div class="flex items-start gap-2">
            <img v-if="comment.author?.avatar" :src="mediaUrl(comment.author.avatar)" class="h-8 w-8 rounded-full object-cover" :alt="comment.author.name" @error="imageFallback">
            <span v-else class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">{{ initials(comment.author?.name) }}</span>
            <div class="min-w-0 flex-1">
              <div class="inline-block max-w-full rounded-2xl bg-gray-100 px-3 py-2">
                <p class="text-xs font-bold text-gray-900">{{ comment.author?.name }}<span v-if="comment.author?.badge" class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">{{ comment.author.badge === 'admin' ? 'Admin' : 'Instructor' }}</span><span v-if="comment.is_pinned" class="ml-1 text-[10px] font-semibold text-amber-600">Pinned</span></p>
                <p class="whitespace-pre-line break-words text-sm text-gray-800"><template v-for="(part, i) in linkSegments(comment.body)" :key="i"><a v-if="part.url" :href="part.url" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">{{ part.text }}</a><template v-else>{{ part.text }}</template></template></p>
              </div>
              <div class="mt-0.5 flex flex-wrap items-center gap-3 px-2 text-[11px] font-semibold text-gray-500">
                <button type="button" :class="comment.liked_by_me ? 'text-oc-primary' : ''" @click="likeComment(comment)">Like<span v-if="comment.likes_count"> · {{ comment.likes_count }}</span></button>
                <button type="button" @click="thread(post).replyTo = comment">Reply</button>
                <span class="font-normal text-gray-400">{{ timeAgo(comment.created_at) }}</span>
                <button v-if="isStaff" type="button" @click="pinComment(post, comment)">{{ comment.is_pinned ? 'Unpin' : 'Pin' }}</button>
                <button v-if="isStaff && !comment.author?.badge && !mine(comment)" type="button" @click="muteAuthor(comment)">Mute</button>
                <button v-if="isStaff || mine(comment)" type="button" class="text-rose-500" @click="removeComment(post, comment)">Delete</button>
              </div>
              <div v-if="comment.replies?.length" class="mt-2 space-y-2 border-l-2 border-gray-100 pl-3">
                <div v-for="reply in comment.replies" :key="reply.id" class="flex items-start gap-2">
                  <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">{{ initials(reply.author?.name) }}</span>
                  <div class="min-w-0">
                    <div class="inline-block max-w-full rounded-2xl bg-gray-100 px-3 py-1.5">
                      <p class="text-xs font-bold text-gray-900">{{ reply.author?.name }}<span v-if="reply.author?.badge" class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">{{ reply.author.badge === 'admin' ? 'Admin' : 'Instructor' }}</span></p>
                      <p class="whitespace-pre-line break-words text-sm text-gray-800">{{ reply.body }}</p>
                    </div>
                    <div class="mt-0.5 flex gap-3 px-2 text-[11px] font-semibold text-gray-500">
                      <button type="button" :class="reply.liked_by_me ? 'text-oc-primary' : ''" @click="likeComment(reply)">Like<span v-if="reply.likes_count"> · {{ reply.likes_count }}</span></button>
                      <span class="font-normal text-gray-400">{{ timeAgo(reply.created_at) }}</span>
                      <button v-if="isStaff || mine(reply)" type="button" class="text-rose-500" @click="removeComment(post, reply)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button v-if="thread(post).page < thread(post).last" type="button" class="text-xs font-semibold text-gray-500 hover:underline" :disabled="thread(post).loading" @click="loadComments(post, true)">View more comments</button>
      </div>
    </article>

    <div v-if="page < lastPage" class="flex justify-center">
      <button type="button" class="btn-secondary" :disabled="loading" @click="page++; load()">{{ loading ? 'Loading…' : 'Load older announcements' }}</button>
    </div>
  </div>
</template>
