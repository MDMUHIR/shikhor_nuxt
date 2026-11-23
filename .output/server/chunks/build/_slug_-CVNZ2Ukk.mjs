import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, u as useAuth, m as mediaUrl } from '../virtual/entry.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useLiveSessions, p as providerOf, c as countdown, a as calendarLink, t as timeAgo, l as linkSegments, h as hostOf } from './useLiveSessions-UgotH8OI.mjs';
import { i as initials } from './format-DP0uQCCC.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { f as formatClock } from './exam-CSv7Xs_5.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, reactive, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

// app/components/LiveChat.vue?vue&type=script&setup=true&lang.ts
var MAX = 500;
var LiveChat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LiveChat",
	__ssrInlineRender: true,
	props: {
		sessionId: {},
		isStaff: { type: Boolean },
		courseSlug: {}
	},
	emits: ["session"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		useApi();
		const { user } = useAuth();
		useToast();
		const messages = ref([]);
		const pinned = ref(null);
		const session = ref(null);
		const muted = ref(false);
		const draft = ref("");
		const sending = ref(false);
		const failed = ref(false);
		ref(true);
		const unseen = ref(0);
		ref(null);
		const menuFor = ref(null);
		const canWrite = computed(() => {
			const s = session.value;
			if (!s || !s.chat_enabled) return false;
			if (props.isStaff) return true;
			return !s.chat_locked && !muted.value && s.status !== "ended" && s.status !== "cancelled";
		});
		const placeholder = computed(() => {
			const s = session.value;
			if (!s) return "Chat";
			if (!s.chat_enabled) return "Chat is turned off";
			if (muted.value) return "You cannot chat right now";
			if (s.chat_locked && !props.isStaff) return "Chat is locked by the instructor";
			if (s.status === "ended") return "This class has ended";
			return "Say something…";
		});
		function mine(message) {
			return message.author?.id === user.value?.id;
		}
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "flex h-[560px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm lg:h-full lg:min-h-[480px]" }, _attrs))}><header class="flex items-center justify-between border-b border-gray-100 px-4 py-3"><div class="flex items-center gap-2"><span class="relative flex h-2.5 w-2.5">`);
			if (unref(session)?.status === "live") _push(`<span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>`);
			else _push(`<!---->`);
			_push(`<span class="${ssrRenderClass([unref(session)?.status === "live" ? "bg-red-500" : "bg-gray-300", "relative inline-flex h-2.5 w-2.5 rounded-full"])}"></span></span><h3 class="text-sm font-bold text-gray-900">Live chat</h3></div>`);
			if (unref(session)?.chat_locked) _push(`<span class="badge bg-amber-50 text-amber-700 ring-amber-200">Locked</span>`);
			else _push(`<!---->`);
			_push(`</header>`);
			if (unref(pinned)) {
				_push(`<div class="flex items-start gap-2 border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-900"><span class="mt-0.5 font-bold">Pinned</span><p class="min-w-0 flex-1 break-words"><b>${ssrInterpolate(unref(pinned).author?.name)}:</b> <!--[-->`);
				ssrRenderList$2(("linkSegments" in _ctx ? _ctx.linkSegments : unref(linkSegments))(unref(pinned).body), (part, i) => {
					_push(`<!--[-->`);
					if (part.url) _push(`<a${ssrRenderAttr("href", part.url)} target="_blank" rel="noopener noreferrer nofollow" class="font-semibold underline">${ssrInterpolate(part.text)}</a>`);
					else _push(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--></p></div>`);
			} else _push(`<!---->`);
			_push(`<div class="relative flex-1 space-y-2.5 overflow-y-auto px-4 py-3">`);
			if (unref(failed)) _push(`<p class="rounded-lg bg-rose-50 px-3 py-1.5 text-center text-[11px] text-rose-600">Reconnecting…</p>`);
			else _push(`<!---->`);
			if (!unref(messages).length) _push(`<p class="py-10 text-center text-xs text-gray-400">No messages yet. Say hello 👋</p>`);
			else _push(`<!---->`);
			_push(`<!--[-->`);
			ssrRenderList$2(unref(messages), (message) => {
				_push(`<div class="group relative flex items-start gap-2.5 text-[13px] leading-5">`);
				if (message.author?.avatar) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(message.author.avatar))}${ssrRenderAttr("alt", message.author.name)} class="mt-0.5 h-7 w-7 shrink-0 rounded-full object-cover">`);
				else _push(`<span class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(message.author?.name))}</span>`);
				_push(`<p class="min-w-0 flex-1 break-words"><span class="${ssrRenderClass([message.author?.badge ? "text-oc-primary" : mine(message) ? "text-gray-900" : "text-gray-500", "font-semibold"])}">${ssrInterpolate(message.author?.name)}</span>`);
				if (message.author?.badge) _push(`<span class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">${ssrInterpolate(message.author.badge === "admin" ? "Admin" : "Instructor")}</span>`);
				else _push(`<!---->`);
				_push(`<span class="ml-1.5 text-gray-800"><!--[-->`);
				ssrRenderList$2(("linkSegments" in _ctx ? _ctx.linkSegments : unref(linkSegments))(message.body), (part, i) => {
					_push(`<!--[-->`);
					if (part.url) _push(`<a${ssrRenderAttr("href", part.url)} target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">${ssrInterpolate(part.text)}</a>`);
					else _push(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--></span></p>`);
				if (__props.isStaff || mine(message)) {
					_push(`<div class="relative shrink-0"><button type="button" class="invisible rounded px-1 text-gray-400 hover:bg-gray-100 group-hover:visible" aria-label="Message actions">⋯</button>`);
					if (unref(menuFor) === message.id) {
						_push(`<div class="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 text-xs shadow-lg">`);
						if (__props.isStaff) _push(`<button type="button" class="block w-full px-3 py-1.5 text-left hover:bg-gray-50">${ssrInterpolate(message.is_pinned ? "Unpin" : "Pin message")}</button>`);
						else _push(`<!---->`);
						if (__props.isStaff && !message.author?.badge) _push(`<button type="button" class="block w-full px-3 py-1.5 text-left hover:bg-gray-50">Mute 30 min</button>`);
						else _push(`<!---->`);
						_push(`<button type="button" class="block w-full px-3 py-1.5 text-left text-rose-600 hover:bg-rose-50">Delete</button></div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]-->`);
			if (unref(unseen)) _push(`<button type="button" class="sticky bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-oc-primary px-3 py-1 text-[11px] font-semibold text-white shadow"> ↓ ${ssrInterpolate(unref(unseen))} new message${ssrInterpolate(unref(unseen) === 1 ? "" : "s")}</button>`);
			else _push(`<!---->`);
			_push(`</div><form class="border-t border-gray-100 p-3"><div class="flex items-end gap-2"><textarea rows="1"${ssrRenderAttr("maxlength", MAX)}${ssrIncludeBooleanAttr(!unref(canWrite)) ? " disabled" : ""}${ssrRenderAttr("placeholder", unref(placeholder))} class="field-input max-h-24 min-h-[40px] flex-1 resize-none py-2 text-sm">${ssrInterpolate(unref(draft))}</textarea><button type="submit" class="btn-primary !px-4"${ssrIncludeBooleanAttr(!unref(canWrite) || !unref(draft).trim() || unref(sending)) ? " disabled" : ""}>Send</button></div><p class="mt-1 text-right text-[10px] text-gray-400">${ssrInterpolate(unref(draft).length)}/${ssrInterpolate(MAX)}</p></form></section>`);
		};
	}
});
// app/components/LiveChat.vue
var _sfc_setup$3 = LiveChat_vue_vue_type_script_setup_true_lang_default.setup;
LiveChat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LiveChat.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var LiveChat_default = Object.assign(LiveChat_vue_vue_type_script_setup_true_lang_default, { __name: "LiveChat" });
// app/components/LiveClasses.vue?vue&type=script&setup=true&lang.ts
var LiveClasses_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LiveClasses",
	__ssrInlineRender: true,
	props: {
		slug: {},
		isStaff: { type: Boolean },
		view: {}
	},
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { apiData } = useApi();
		const toast = useToast();
		const state = useLiveSessions(props.slug);
		const { live, next, upcoming, past } = state;
		const now = ref(Date.now());
		const elapsed = computed(() => {
			const s = live.value;
			if (!s?.started_at) return "";
			return formatClock(Math.floor((now.value - new Date(s.started_at).getTime()) / 1e3));
		});
		const focus = computed(() => live.value ?? next.value);
		const minutesToStart = computed(() => focus.value ? Math.floor((new Date(focus.value.scheduled_at).getTime() - now.value) / 6e4) : 0);
		function when(value) {
			return new Date(value).toLocaleString(void 0, {
				weekday: "short",
				month: "short",
				day: "numeric",
				hour: "numeric",
				minute: "2-digit"
			});
		}
		const busy = ref(null);
		const modal = ref(false);
		const editing = ref(null);
		const saving = ref(false);
		const errors = ref({});
		const form = reactive({
			title: "",
			description: "",
			join_url: "",
			date: "",
			duration_minutes: 60,
			recording_url: "",
			chat_enabled: true,
			announce: true
		});
		function toLocalInput(iso) {
			const d = new Date(iso);
			const pad = (n) => String(n).padStart(2, "0");
			return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
		}
		function openForm(session) {
			editing.value = session ?? null;
			errors.value = {};
			const inOneHour = new Date(Date.now() + 36e5);
			inOneHour.setMinutes(0, 0, 0);
			Object.assign(form, {
				title: session?.title ?? "",
				description: session?.description ?? "",
				join_url: session?.join_url ?? "",
				date: session ? toLocalInput(session.scheduled_at) : toLocalInput(inOneHour.toISOString()),
				duration_minutes: session?.duration_minutes ?? 60,
				recording_url: session?.recording_url ?? "",
				chat_enabled: session?.chat_enabled ?? true,
				announce: true
			});
			modal.value = true;
		}
		async function save() {
			saving.value = true;
			errors.value = {};
			try {
				const body = {
					title: form.title,
					description: form.description || null,
					join_url: form.join_url.trim(),
					scheduled_at: new Date(form.date).toISOString(),
					duration_minutes: Number(form.duration_minutes) || 60,
					chat_enabled: form.chat_enabled,
					...editing.value ? { recording_url: form.recording_url.trim() || null } : { announce: form.announce }
				};
				if (editing.value) await apiData(`/live-sessions/${editing.value.id}/update`, {
					method: "POST",
					body
				});
				else await apiData(`/courses/${props.slug}/live-sessions`, {
					method: "POST",
					body
				});
				modal.value = false;
				toast.success(editing.value ? "Class updated." : "Class scheduled — students were notified.");
				await state.load();
			} catch (err) {
				errors.value = err.errors ?? {};
				toast.error(err.message);
			} finally {
				saving.value = false;
			}
		}
		__expose({ openForm });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			const _component_LiveChat = LiveChat_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (__props.view === "panel") {
				_push(`<!--[-->`);
				if (unref(state).loading.value && !unref(focus)) _push(`<div class="card h-48 animate-pulse bg-gray-50"></div>`);
				else if (unref(focus)) {
					_push(`<section class="${ssrRenderClass([unref(live) && unref(focus).chat_enabled ? "lg:grid-cols-[minmax(0,1fr)_360px]" : "", "grid gap-4"])}"><div class="space-y-3"><div class="overflow-hidden rounded-2xl bg-gray-900 shadow-sm">`);
					if (unref(live) && unref(focus).embed_url) _push(`<div class="relative aspect-video"><iframe${ssrRenderAttr("src", unref(focus).embed_url)}${ssrRenderAttr("title", unref(focus).title)} class="absolute inset-0 h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`);
					else {
						_push(`<div class="relative flex min-h-[260px] flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-oc-primary/80 p-6 text-center text-white">`);
						if (unref(live)) _push(`<span class="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-extrabold uppercase tracking-wider"><span class="h-2 w-2 animate-pulse rounded-full bg-white"></span> Live now · ${ssrInterpolate(unref(elapsed))}</span>`);
						else _push(`<span class="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider">Next class</span>`);
						_push(`<h2 class="mt-3 text-xl font-extrabold md:text-2xl">${ssrInterpolate(unref(focus).title)}</h2><p class="mt-1 text-sm text-white/70">${ssrInterpolate(when(unref(focus).scheduled_at))} · ${ssrInterpolate(unref(focus).duration_minutes)} min · ${ssrInterpolate(("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(unref(focus).provider).label)}</p>`);
						if (!unref(live)) _push(`<p class="mt-3 font-mono text-3xl font-extrabold tabular-nums">${ssrInterpolate(("countdown" in _ctx ? _ctx.countdown : unref(countdown))(unref(focus).scheduled_at, unref(now)))}</p>`);
						else _push(`<!---->`);
						if (unref(focus).join_url) {
							_push(`<a${ssrRenderAttr("href", unref(focus).join_url)} target="_blank" rel="noopener noreferrer nofollow" class="${ssrRenderClass([unref(live) || unref(minutesToStart) <= 15 ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-white/20 text-white hover:bg-white/30", "mt-5 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-extrabold shadow-lg transition"])}">`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "video",
								size: 18
							}, null, _parent));
							_push(` ${ssrInterpolate(unref(live) ? `Join ${("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(unref(focus).provider).label} class` : unref(minutesToStart) <= 15 ? "Join class" : "Open class link")}</a>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					}
					_push(`</div><div class="card flex flex-wrap items-start justify-between gap-3 p-4"><div class="min-w-0"><h3 class="text-base font-bold text-gray-900">${ssrInterpolate(unref(focus).title)}</h3>`);
					if (unref(focus).description) _push(`<p class="mt-1 whitespace-pre-line text-sm text-gray-600">${ssrInterpolate(unref(focus).description)}</p>`);
					else _push(`<!---->`);
					if (!unref(live)) {
						_push(`<a${ssrRenderAttr("href", ("calendarLink" in _ctx ? _ctx.calendarLink : unref(calendarLink))(unref(focus)))} target="_blank" rel="noopener noreferrer" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-oc-primary hover:underline">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "calendar",
							size: 13
						}, null, _parent));
						_push(` Add to Google Calendar</a>`);
					} else _push(`<!---->`);
					_push(`</div>`);
					if (__props.isStaff) {
						_push(`<div class="flex flex-wrap gap-2">`);
						if (!unref(live)) {
							_push(`<button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy) === unref(focus).id) ? " disabled" : ""}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "play",
								size: 15
							}, null, _parent));
							_push(` Go live</button>`);
						} else _push(`<!--[--><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy) === unref(focus).id) ? " disabled" : ""}>${ssrInterpolate(unref(focus).chat_locked ? "Unlock chat" : "Lock chat")}</button><button type="button" class="btn-danger"${ssrIncludeBooleanAttr(unref(busy) === unref(focus).id) ? " disabled" : ""}>End class</button><!--]-->`);
						_push(`<button type="button" class="btn-ghost">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "edit",
							size: 15
						}, null, _parent));
						_push(` Edit</button></div>`);
					} else _push(`<!---->`);
					_push(`</div></div>`);
					if (unref(live) && unref(focus).chat_enabled) _push(ssrRenderComponent(_component_LiveChat, {
						key: unref(focus).id,
						"session-id": unref(focus).id,
						"is-staff": __props.isStaff,
						"course-slug": __props.slug,
						onSession: unref(state).patch
					}, null, _parent));
					else _push(`<!---->`);
					_push(`</section>`);
				} else {
					_push(`<section class="card flex flex-wrap items-center justify-between gap-3 p-5"><div><h3 class="text-sm font-bold text-gray-900">No class scheduled</h3><p class="text-xs text-gray-500">${ssrInterpolate(__props.isStaff ? "Schedule your next live class — students are notified automatically." : "You will be notified when your instructor schedules a live class.")}</p></div>`);
					if (__props.isStaff) {
						_push(`<button type="button" class="btn-primary">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "video",
							size: 16
						}, null, _parent));
						_push(` Schedule a live class</button>`);
					} else _push(`<!---->`);
					_push(`</section>`);
				}
				_push(`<!--]-->`);
			} else {
				_push(`<!--[-->`);
				if (__props.isStaff) {
					_push(`<div class="mb-4 flex justify-end"><button type="button" class="btn-primary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "plus",
						size: 16
					}, null, _parent));
					_push(` Schedule class</button></div>`);
				} else _push(`<!---->`);
				_push(`<h3 class="mb-2 text-sm font-bold text-gray-900">Upcoming</h3>`);
				if (!unref(upcoming).length && !unref(live)) _push(ssrRenderComponent(_component_EmptyState, {
					icon: "calendar",
					title: "No upcoming classes",
					message: "Scheduled live classes will show up here."
				}, null, _parent));
				else {
					_push(`<ul class="space-y-2"><!--[-->`);
					ssrRenderList$2([...unref(live) ? [unref(live)] : [], ...unref(upcoming)], (s) => {
						_push(`<li class="card flex flex-wrap items-center gap-3 p-4"><span class="${ssrRenderClass([s.status === "live" ? "bg-red-100 text-red-600" : "bg-brand-light text-oc-primary", "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl text-center"])}"><span class="text-[10px] font-bold uppercase">${ssrInterpolate(new Date(s.scheduled_at).toLocaleString(void 0, { month: "short" }))}</span><span class="text-lg font-extrabold leading-none">${ssrInterpolate(new Date(s.scheduled_at).getDate())}</span></span><div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(s.title)} `);
						if (s.status === "live") _push(`<span class="ml-1 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">Live</span>`);
						else _push(`<!---->`);
						_push(`</p><p class="text-xs text-gray-500">${ssrInterpolate(when(s.scheduled_at))} · ${ssrInterpolate(s.duration_minutes)} min · ${ssrInterpolate(("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(s.provider).label)}</p></div>`);
						if (s.join_url) _push(`<a${ssrRenderAttr("href", s.join_url)} target="_blank" rel="noopener noreferrer nofollow" class="btn-secondary !px-3 !py-1.5 text-xs">Open link</a>`);
						else _push(`<!---->`);
						if (__props.isStaff) {
							_push(`<div class="flex gap-1">`);
							if (s.status === "scheduled") _push(`<button type="button" class="btn-primary !px-3 !py-1.5 text-xs"${ssrIncludeBooleanAttr(unref(busy) === s.id) ? " disabled" : ""}>Go live</button>`);
							else _push(`<!---->`);
							_push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">Edit</button>`);
							if (s.status === "scheduled") _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600">Cancel</button>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`</li>`);
					});
					_push(`<!--]--></ul>`);
				}
				_push(`<h3 class="mb-2 mt-6 text-sm font-bold text-gray-900">Past classes</h3>`);
				if (!unref(past).length) _push(ssrRenderComponent(_component_EmptyState, {
					icon: "clock",
					title: "Nothing yet",
					message: "Finished classes and recordings appear here."
				}, null, _parent));
				else {
					_push(`<ul class="space-y-2"><!--[-->`);
					ssrRenderList$2(unref(past), (s) => {
						_push(`<li class="${ssrRenderClass([s.status === "cancelled" ? "opacity-60" : "", "card flex flex-wrap items-center gap-3 p-4"])}"><div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(s.title)}</p><p class="text-xs text-gray-500">${ssrInterpolate(when(s.scheduled_at))} · <span class="capitalize">${ssrInterpolate(s.status)}</span></p></div>`);
						if (s.recording_url) {
							_push(`<a${ssrRenderAttr("href", s.recording_url)} target="_blank" rel="noopener noreferrer nofollow" class="btn-secondary !px-3 !py-1.5 text-xs">`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "play",
								size: 13
							}, null, _parent));
							_push(` Watch recording</a>`);
						} else _push(`<!---->`);
						if (__props.isStaff) _push(`<div class="flex gap-1"><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">${ssrInterpolate(s.recording_url ? "Edit" : "Add recording")}</button><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600">Delete</button></div>`);
						else _push(`<!---->`);
						_push(`</li>`);
					});
					_push(`<!--]--></ul>`);
				}
				_push(`<!--]-->`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modal),
				title: unref(editing) ? "Edit live class" : "Schedule a live class",
				size: "md",
				onClose: ($event) => modal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(saving)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(saving) || !unref(form).title || !unref(form).join_url) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(saving) ? "Saving…" : unref(editing) ? "Save class" : "Schedule class")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(saving),
						onClick: ($event) => modal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(saving) || !unref(form).title || !unref(form).join_url,
						onClick: save
					}, toDisplayString(unref(saving) ? "Saving…" : unref(editing) ? "Save class" : "Schedule class"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="live-title"${_scopeId}>Title</label><input id="live-title"${ssrRenderAttr("value", unref(form).title)} class="field-input" maxlength="255" required placeholder="e.g. Writing Task 2 — live practice"${_scopeId}>`);
						if (unref(errors).title) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(errors).title[0])}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="live-url"${_scopeId}>Class link</label><input id="live-url"${ssrRenderAttr("value", unref(form).join_url)} type="url" class="field-input" required placeholder="https://zoom.us/j/… · https://meet.google.com/… · YouTube / Facebook live link"${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>Only enrolled students can see this link. A YouTube live link plays right here next to the chat.</p>`);
						if (unref(errors).join_url) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(errors).join_url[0])}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid gap-3 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="live-date"${_scopeId}>Date &amp; time</label><input id="live-date"${ssrRenderAttr("value", unref(form).date)} type="datetime-local" class="field-input" required${_scopeId}>`);
						if (unref(errors).scheduled_at) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(errors).scheduled_at[0])}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="live-duration"${_scopeId}>Duration (minutes)</label><input id="live-duration"${ssrRenderAttr("value", unref(form).duration_minutes)} type="number" min="5" max="720" class="field-input"${_scopeId}></div></div><div${_scopeId}><label class="field-label" for="live-desc"${_scopeId}>Description / agenda</label><textarea id="live-desc" rows="3" class="field-input" maxlength="2000" placeholder="Topics, what to prepare, passcode…"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div>`);
						if (unref(editing)) {
							_push(`<div${_scopeId}><label class="field-label" for="live-rec"${_scopeId}>Recording link (after the class)</label><input id="live-rec"${ssrRenderAttr("value", unref(form).recording_url)} type="url" class="field-input" placeholder="https://youtu.be/…"${_scopeId}>`);
							if (unref(errors).recording_url) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(errors).recording_url[0])}</p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div class="flex flex-wrap gap-5 text-sm text-gray-700"${_scopeId}><label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).chat_enabled) ? ssrLooseContain(unref(form).chat_enabled, null) : unref(form).chat_enabled) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300"${_scopeId}> Enable live chat</label>`);
						if (!unref(editing)) _push(`<label class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).announce) ? ssrLooseContain(unref(form).announce, null) : unref(form).announce) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300"${_scopeId}> Post an announcement &amp; notify students</label>`);
						else _push(`<!---->`);
						_push(`</div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "live-title"
							}, "Title"),
							withDirectives(createVNode("input", {
								id: "live-title",
								"onUpdate:modelValue": ($event) => unref(form).title = $event,
								class: "field-input",
								maxlength: "255",
								required: "",
								placeholder: "e.g. Writing Task 2 — live practice"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).title]]),
							unref(errors).title ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(errors).title[0]), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "live-url"
							}, "Class link"),
							withDirectives(createVNode("input", {
								id: "live-url",
								"onUpdate:modelValue": ($event) => unref(form).join_url = $event,
								type: "url",
								class: "field-input",
								required: "",
								placeholder: "https://zoom.us/j/… · https://meet.google.com/… · YouTube / Facebook live link"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).join_url]]),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "Only enrolled students can see this link. A YouTube live link plays right here next to the chat."),
							unref(errors).join_url ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(errors).join_url[0]), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "live-date"
							}, "Date & time"),
							withDirectives(createVNode("input", {
								id: "live-date",
								"onUpdate:modelValue": ($event) => unref(form).date = $event,
								type: "datetime-local",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).date]]),
							unref(errors).scheduled_at ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(errors).scheduled_at[0]), 1)) : createCommentVNode("", true)
						]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "live-duration"
						}, "Duration (minutes)"), withDirectives(createVNode("input", {
							id: "live-duration",
							"onUpdate:modelValue": ($event) => unref(form).duration_minutes = $event,
							type: "number",
							min: "5",
							max: "720",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(form).duration_minutes,
							void 0,
							{ number: true }
						]])])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "live-desc"
						}, "Description / agenda"), withDirectives(createVNode("textarea", {
							id: "live-desc",
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "3",
							class: "field-input",
							maxlength: "2000",
							placeholder: "Topics, what to prepare, passcode…"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]),
						unref(editing) ? (openBlock(), createBlock("div", { key: 0 }, [
							createVNode("label", {
								class: "field-label",
								for: "live-rec"
							}, "Recording link (after the class)"),
							withDirectives(createVNode("input", {
								id: "live-rec",
								"onUpdate:modelValue": ($event) => unref(form).recording_url = $event,
								type: "url",
								class: "field-input",
								placeholder: "https://youtu.be/…"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).recording_url]]),
							unref(errors).recording_url ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(errors).recording_url[0]), 1)) : createCommentVNode("", true)
						])) : createCommentVNode("", true),
						createVNode("div", { class: "flex flex-wrap gap-5 text-sm text-gray-700" }, [createVNode("label", { class: "flex items-center gap-2" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).chat_enabled = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).chat_enabled]]), createTextVNode(" Enable live chat")]), !unref(editing) ? (openBlock(), createBlock("label", {
							key: 0,
							class: "flex items-center gap-2"
						}, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).announce = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).announce]]), createTextVNode(" Post an announcement & notify students")])) : createCommentVNode("", true)])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/components/LiveClasses.vue
var _sfc_setup$2 = LiveClasses_vue_vue_type_script_setup_true_lang_default.setup;
LiveClasses_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LiveClasses.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var LiveClasses_default = Object.assign(LiveClasses_vue_vue_type_script_setup_true_lang_default, { __name: "LiveClasses" });
// app/components/CommunityFeed.vue?vue&type=script&setup=true&lang.ts
var CommunityFeed_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CommunityFeed",
	__ssrInlineRender: true,
	props: {
		slug: {},
		isStaff: { type: Boolean }
	},
	async setup(__props, { expose: __expose }) {
		let __temp, __restore;
		const props = __props;
		const { apiData } = useApi();
		const { user } = useAuth();
		useToast();
		const page = ref(1);
		const posts = ref([]);
		const lastPage = ref(1);
		const loading = ref(false);
		const error = ref("");
		async function load(reset = false) {
			if (reset) page.value = 1;
			loading.value = true;
			error.value = "";
			try {
				const data = await apiData(`/courses/${props.slug}/posts`, { query: {
					page: page.value,
					per_page: 8
				} });
				lastPage.value = data.posts.last_page;
				posts.value = reset || page.value === 1 ? data.posts.data : [...posts.value, ...data.posts.data];
			} catch (err) {
				error.value = err.message;
			} finally {
				loading.value = false;
			}
		}
		[__temp, __restore] = withAsyncContext(() => load(true)), await __temp, __restore();
		const composer = reactive({
			title: "",
			body: "",
			link_url: "",
			link_label: "",
			is_pinned: false,
			notify: true
		});
		const posting = ref(false);
		const composerErrors = ref({});
		const showLink = ref(false);
		const menu = ref(null);
		const editing = ref(null);
		const editForm = reactive({
			title: "",
			body: "",
			link_url: "",
			link_label: ""
		});
		const threads = reactive({});
		function thread(post) {
			if (!threads[post.id]) threads[post.id] = {
				open: false,
				loading: false,
				items: [],
				page: 1,
				last: 1,
				draft: "",
				replyTo: null,
				sending: false
			};
			return threads[post.id];
		}
		const mine = (c) => c.author?.id === user.value?.id;
		__expose({ reload: () => load(true) });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_EmptyState = EmptyState_default;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
			if (__props.isStaff) {
				_push(`<section class="card p-4"><div class="flex items-start gap-3"><span class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary sm:flex">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(unref(user)?.name))}</span><div class="min-w-0 flex-1 space-y-2"><input${ssrRenderAttr("value", unref(composer).title)} class="field-input" placeholder="Title (optional) — e.g. Class on Saturday 8 PM" maxlength="255"><textarea rows="3" class="field-input" placeholder="Share an update, the next class time, homework…" maxlength="5000">${ssrInterpolate(unref(composer).body)}</textarea>`);
				if (unref(composerErrors).body) _push(`<p class="field-error">${ssrInterpolate(unref(composerErrors).body[0])}</p>`);
				else _push(`<!---->`);
				if (unref(showLink)) {
					_push(`<div class="grid gap-2 sm:grid-cols-2"><div><input${ssrRenderAttr("value", unref(composer).link_url)} type="url" class="field-input" placeholder="https:// Zoom / Meet / WhatsApp / Facebook group link">`);
					if (unref(composerErrors).link_url) _push(`<p class="field-error">${ssrInterpolate(unref(composerErrors).link_url[0])}</p>`);
					else _push(`<!---->`);
					_push(`</div><input${ssrRenderAttr("value", unref(composer).link_label)} class="field-input" placeholder="Button text (e.g. Join WhatsApp group)" maxlength="120"></div>`);
				} else _push(`<!---->`);
				_push(`<div class="flex flex-wrap items-center justify-between gap-2"><div class="flex flex-wrap items-center gap-3 text-xs text-gray-600"><button type="button" class="btn-ghost !px-2 !py-1 text-xs">${ssrInterpolate(unref(showLink) ? "Remove link" : "+ Add a link")}</button><label class="flex items-center gap-1.5"><input${ssrIncludeBooleanAttr(Array.isArray(unref(composer).is_pinned) ? ssrLooseContain(unref(composer).is_pinned, null) : unref(composer).is_pinned) ? " checked" : ""} type="checkbox" class="h-3.5 w-3.5 rounded border-gray-300"> Pin to top</label><label class="flex items-center gap-1.5"><input${ssrIncludeBooleanAttr(Array.isArray(unref(composer).notify) ? ssrLooseContain(unref(composer).notify, null) : unref(composer).notify) ? " checked" : ""} type="checkbox" class="h-3.5 w-3.5 rounded border-gray-300"> Notify students</label></div><button type="button" class="btn-primary w-full sm:w-auto"${ssrIncludeBooleanAttr(unref(posting) || !unref(composer).body.trim()) ? " disabled" : ""}>${ssrInterpolate(unref(posting) ? "Posting…" : "Post")}</button></div></div></div></section>`);
			} else _push(`<!---->`);
			if (unref(error)) _push(`<p class="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">${ssrInterpolate(unref(error))}</p>`);
			else if (!unref(posts).length && !unref(loading)) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "info",
				title: "No announcements yet",
				message: __props.isStaff ? "Post the next class time or a group link above." : "Your instructor will post class updates here."
			}, null, _parent));
			else _push(`<!---->`);
			_push(`<!--[-->`);
			ssrRenderList$2(unref(posts), (post) => {
				_push(`<article class="${ssrRenderClass([post.is_pinned ? "border-amber-200 bg-amber-50/30" : "", "card p-4"])}"><header class="flex items-start justify-between gap-3"><div class="flex items-center gap-3">`);
				if (post.author?.avatar) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(post.author.avatar))}${ssrRenderAttr("alt", post.author.name)} class="h-10 w-10 rounded-full object-cover">`);
				else _push(`<span class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(post.author?.name))}</span>`);
				_push(`<div><p class="text-sm font-bold text-gray-900">${ssrInterpolate(post.author?.name)} `);
				if (post.author?.badge) _push(`<span class="ml-1 rounded bg-oc-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">${ssrInterpolate(post.author.badge === "admin" ? "Admin" : "Instructor")}</span>`);
				else _push(`<!---->`);
				_push(`</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("timeAgo" in _ctx ? _ctx.timeAgo : unref(timeAgo))(post.created_at))}`);
				if (post.is_pinned) _push(`<span class="ml-2 font-semibold text-amber-600">Pinned</span>`);
				else _push(`<!---->`);
				if (post.comments_locked) _push(`<span class="ml-2">Comments off</span>`);
				else _push(`<!---->`);
				_push(`</p></div></div>`);
				if (__props.isStaff) {
					_push(`<div class="relative"><button type="button" class="rounded-lg px-2 py-1 text-gray-500 hover:bg-gray-100" aria-label="Announcement actions">⋯</button>`);
					if (unref(menu) === post.id) _push(`<div class="absolute right-0 z-20 mt-1 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 text-sm shadow-lg"><button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50">${ssrInterpolate(post.is_pinned ? "Unpin" : "Pin to top")}</button><button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50">Edit</button><button type="button" class="block w-full px-4 py-2 text-left hover:bg-gray-50">${ssrInterpolate(post.comments_locked ? "Turn comments on" : "Turn comments off")}</button><button type="button" class="block w-full px-4 py-2 text-left text-rose-600 hover:bg-rose-50">Delete</button></div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</header>`);
				if (unref(editing)?.id === post.id) _push(`<div class="mt-3 space-y-2"><input${ssrRenderAttr("value", unref(editForm).title)} class="field-input" placeholder="Title" maxlength="255"><textarea rows="4" class="field-input" maxlength="5000">${ssrInterpolate(unref(editForm).body)}</textarea><div class="grid gap-2 sm:grid-cols-2"><input${ssrRenderAttr("value", unref(editForm).link_url)} class="field-input" placeholder="https:// link"><input${ssrRenderAttr("value", unref(editForm).link_label)} class="field-input" placeholder="Button text"></div><div class="flex gap-2"><button type="button" class="btn-primary">Save</button><button type="button" class="btn-secondary">Cancel</button></div></div>`);
				else {
					_push(`<!--[-->`);
					if (post.title) _push(`<h3 class="mt-3 text-base font-bold text-gray-900">${ssrInterpolate(post.title)}</h3>`);
					else _push(`<!---->`);
					_push(`<p class="mt-1.5 whitespace-pre-line break-words text-sm leading-6 text-gray-700"><!--[-->`);
					ssrRenderList$2(("linkSegments" in _ctx ? _ctx.linkSegments : unref(linkSegments))(post.body), (part, i) => {
						_push(`<!--[-->`);
						if (part.url) _push(`<a${ssrRenderAttr("href", part.url)} target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">${ssrInterpolate(part.text)}</a>`);
						else _push(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
						_push(`<!--]-->`);
					});
					_push(`<!--]--></p>`);
					if (post.link_url) {
						_push(`<a${ssrRenderAttr("href", post.link_url)} target="_blank" rel="noopener noreferrer nofollow" class="mt-3 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition hover:border-oc-primary"><span class="${ssrRenderClass([("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(post.link_provider).cls, "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold"])}">${ssrInterpolate(("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(post.link_provider).short)}</span><span class="min-w-0 flex-1"><span class="block truncate text-sm font-semibold text-gray-900">${ssrInterpolate(post.link_label || "Open link")}</span><span class="block truncate text-[11px] text-gray-400">${ssrInterpolate(("providerOf" in _ctx ? _ctx.providerOf : unref(providerOf))(post.link_provider).label)} · ${ssrInterpolate(("hostOf" in _ctx ? _ctx.hostOf : unref(hostOf))(post.link_url))}</span></span>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "external-link",
							size: 16,
							class: "text-gray-400"
						}, null, _parent));
						_push(`</a>`);
					} else _push(`<!---->`);
					_push(`<!--]-->`);
				}
				_push(`<div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500"><span>${ssrInterpolate(post.likes_count ? `${post.likes_count} like${post.likes_count === 1 ? "" : "s"}` : "")}</span><span>${ssrInterpolate(post.comments_count ? `${post.comments_count} comment${post.comments_count === 1 ? "" : "s"}` : "")}</span></div><div class="grid grid-cols-2 gap-1 border-t border-gray-100 pt-1"><button type="button" class="${ssrRenderClass([post.liked_by_me ? "text-oc-primary" : "text-gray-600", "flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold transition hover:bg-gray-50"])}">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "heart",
					size: 16,
					filled: post.liked_by_me
				}, null, _parent));
				_push(` Like </button><button type="button" class="flex items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "info",
					size: 16
				}, null, _parent));
				_push(` Comment </button></div>`);
				if (thread(post).open) {
					_push(`<div class="mt-3 space-y-3 border-t border-gray-100 pt-3">`);
					if (!post.comments_locked || __props.isStaff) {
						_push(`<form class="flex items-start gap-2"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(unref(user)?.name))}</span><div class="min-w-0 flex-1">`);
						if (thread(post).replyTo) _push(`<p class="mb-1 text-[11px] text-gray-500">Replying to <b>${ssrInterpolate(thread(post).replyTo?.author?.name)}</b> · <button type="button" class="underline">cancel</button></p>`);
						else _push(`<!---->`);
						_push(`<div class="flex gap-2"><input${ssrRenderAttr("value", thread(post).draft)} class="field-input !rounded-full" placeholder="Write a comment…" maxlength="1000"><button type="submit" class="btn-primary !rounded-full !px-4"${ssrIncludeBooleanAttr(!thread(post).draft.trim() || thread(post).sending) ? " disabled" : ""}>Send</button></div></div></form>`);
					} else _push(`<p class="text-center text-xs text-gray-400">Comments are turned off for this announcement.</p>`);
					if (thread(post).loading && !thread(post).items.length) _push(`<div class="h-12 animate-pulse rounded-xl bg-gray-50"></div>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(thread(post).items, (comment) => {
						_push(`<div class="space-y-2"><div class="flex items-start gap-2">`);
						if (comment.author?.avatar) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(comment.author.avatar))} class="h-8 w-8 rounded-full object-cover"${ssrRenderAttr("alt", comment.author.name)}>`);
						else _push(`<span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(comment.author?.name))}</span>`);
						_push(`<div class="min-w-0 flex-1"><div class="inline-block max-w-full rounded-2xl bg-gray-100 px-3 py-2"><p class="text-xs font-bold text-gray-900">${ssrInterpolate(comment.author?.name)}`);
						if (comment.author?.badge) _push(`<span class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">${ssrInterpolate(comment.author.badge === "admin" ? "Admin" : "Instructor")}</span>`);
						else _push(`<!---->`);
						if (comment.is_pinned) _push(`<span class="ml-1 text-[10px] font-semibold text-amber-600">Pinned</span>`);
						else _push(`<!---->`);
						_push(`</p><p class="whitespace-pre-line break-words text-sm text-gray-800"><!--[-->`);
						ssrRenderList$2(("linkSegments" in _ctx ? _ctx.linkSegments : unref(linkSegments))(comment.body), (part, i) => {
							_push(`<!--[-->`);
							if (part.url) _push(`<a${ssrRenderAttr("href", part.url)} target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline">${ssrInterpolate(part.text)}</a>`);
							else _push(`<!--[-->${ssrInterpolate(part.text)}<!--]-->`);
							_push(`<!--]-->`);
						});
						_push(`<!--]--></p></div><div class="mt-0.5 flex flex-wrap items-center gap-3 px-2 text-[11px] font-semibold text-gray-500"><button type="button" class="${ssrRenderClass(comment.liked_by_me ? "text-oc-primary" : "")}">Like`);
						if (comment.likes_count) _push(`<span> · ${ssrInterpolate(comment.likes_count)}</span>`);
						else _push(`<!---->`);
						_push(`</button><button type="button">Reply</button><span class="font-normal text-gray-400">${ssrInterpolate(("timeAgo" in _ctx ? _ctx.timeAgo : unref(timeAgo))(comment.created_at))}</span>`);
						if (__props.isStaff) _push(`<button type="button">${ssrInterpolate(comment.is_pinned ? "Unpin" : "Pin")}</button>`);
						else _push(`<!---->`);
						if (__props.isStaff && !comment.author?.badge && !mine(comment)) _push(`<button type="button">Mute</button>`);
						else _push(`<!---->`);
						if (__props.isStaff || mine(comment)) _push(`<button type="button" class="text-rose-500">Delete</button>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (comment.replies?.length) {
							_push(`<div class="mt-2 space-y-2 border-l-2 border-gray-100 pl-3"><!--[-->`);
							ssrRenderList$2(comment.replies, (reply) => {
								_push(`<div class="flex items-start gap-2"><span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(reply.author?.name))}</span><div class="min-w-0"><div class="inline-block max-w-full rounded-2xl bg-gray-100 px-3 py-1.5"><p class="text-xs font-bold text-gray-900">${ssrInterpolate(reply.author?.name)}`);
								if (reply.author?.badge) _push(`<span class="ml-1 rounded bg-oc-primary px-1 py-px text-[9px] font-bold uppercase text-white">${ssrInterpolate(reply.author.badge === "admin" ? "Admin" : "Instructor")}</span>`);
								else _push(`<!---->`);
								_push(`</p><p class="whitespace-pre-line break-words text-sm text-gray-800">${ssrInterpolate(reply.body)}</p></div><div class="mt-0.5 flex gap-3 px-2 text-[11px] font-semibold text-gray-500"><button type="button" class="${ssrRenderClass(reply.liked_by_me ? "text-oc-primary" : "")}">Like`);
								if (reply.likes_count) _push(`<span> · ${ssrInterpolate(reply.likes_count)}</span>`);
								else _push(`<!---->`);
								_push(`</button><span class="font-normal text-gray-400">${ssrInterpolate(("timeAgo" in _ctx ? _ctx.timeAgo : unref(timeAgo))(reply.created_at))}</span>`);
								if (__props.isStaff || mine(reply)) _push(`<button type="button" class="text-rose-500">Delete</button>`);
								else _push(`<!---->`);
								_push(`</div></div></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div></div></div>`);
					});
					_push(`<!--]-->`);
					if (thread(post).page < thread(post).last) _push(`<button type="button" class="text-xs font-semibold text-gray-500 hover:underline"${ssrIncludeBooleanAttr(thread(post).loading) ? " disabled" : ""}>View more comments</button>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</article>`);
			});
			_push(`<!--]-->`);
			if (unref(page) < unref(lastPage)) _push(`<div class="flex justify-center"><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(loading)) ? " disabled" : ""}>${ssrInterpolate(unref(loading) ? "Loading…" : "Load older announcements")}</button></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/components/CommunityFeed.vue
var _sfc_setup$1 = CommunityFeed_vue_vue_type_script_setup_true_lang_default.setup;
CommunityFeed_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommunityFeed.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var CommunityFeed_default = Object.assign(CommunityFeed_vue_vue_type_script_setup_true_lang_default, { __name: "CommunityFeed" });
// app/pages/community/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const slug = String(route.params.slug);
		const { apiData } = useApi();
		const { data: course } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`community-course-${slug}`, () => apiData(`/courses/${slug}`).catch(() => null))), __temp = await __temp, __restore(), __temp);
		const live = useLiveSessions(slug);
		[__temp, __restore] = withAsyncContext(() => live.load()), await __temp, __restore();
		const isStaff = computed(() => live.role.value === "staff");
		const denied = computed(() => !live.role.value && !!live.error.value);
		const tab = ref(route.query.tab === "schedule" ? "schedule" : "announcements");
		useSeoMeta({
			title: () => `Live classes & announcements — ${course.value?.title ?? "Course"}`,
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_EmptyState = EmptyState_default;
			const _component_LiveClasses = LiveClasses_default;
			const _component_CommunityFeed = CommunityFeed_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-8" }, _attrs))}><nav class="mb-3 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/my-courses",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`My courses`);
					else return [createTextVNode("My courses")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: `/learn/${unref(slug)}`,
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(course)?.title || "Course")}`);
					else return [createTextVNode(toDisplayString(unref(course)?.title || "Course"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Live classes</span></nav><div class="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(course)?.title)}</h1><p class="text-sm text-gray-500">Live classes, announcements and discussion`);
			if (unref(isStaff)) _push(`<span> · you are teaching this course</span>`);
			else _push(`<!---->`);
			_push(`</p></div><div class="flex gap-2">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: `/learn/${unref(slug)}`,
				class: "btn-secondary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "book-open",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Lessons`);
					} else return [createVNode(_component_BaseIcon, {
						name: "book-open",
						size: 16
					}), createTextVNode(" Lessons")];
				}),
				_: 1
			}, _parent));
			if (unref(isStaff)) _push(ssrRenderComponent(_component_NuxtLink, {
				to: `/admin/courses/${unref(course)?.id}`,
				class: "btn-ghost"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "settings",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Manage course`);
					} else return [createVNode(_component_BaseIcon, {
						name: "settings",
						size: 16
					}), createTextVNode(" Manage course")];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(denied)) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "lock",
				title: "This area is for enrolled students",
				message: unref(live).error.value,
				"action-label": "View course",
				"action-to": `/courses/${unref(slug)}`
			}, null, _parent));
			else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(_component_LiveClasses, {
					slug: unref(slug),
					"is-staff": unref(isStaff),
					view: "panel"
				}, null, _parent));
				_push(`<div class="mt-6 flex gap-1.5"><!--[-->`);
				ssrRenderList$2([{
					v: "announcements",
					l: "Announcements"
				}, {
					v: "schedule",
					l: "Class schedule"
				}], (item) => {
					_push(`<button type="button" class="${ssrRenderClass([unref(tab) === item.v ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-4 py-1.5 text-sm font-semibold transition"])}">${ssrInterpolate(item.l)}</button>`);
				});
				_push(`<!--]--></div><div class="mt-4 max-w-3xl">`);
				_push(ssrRenderComponent(_component_CommunityFeed, {
					style: unref(tab) === "announcements" ? null : { display: "none" },
					slug: unref(slug),
					"is-staff": unref(isStaff)
				}, null, _parent));
				if (unref(tab) === "schedule") _push(ssrRenderComponent(_component_LiveClasses, {
					slug: unref(slug),
					"is-staff": unref(isStaff),
					view: "schedule"
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/community/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/community/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CVNZ2Ukk.mjs.map
