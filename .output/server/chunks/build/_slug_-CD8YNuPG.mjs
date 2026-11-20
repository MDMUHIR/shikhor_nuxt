import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { a as useRoute, m as useRouter, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { g as sanitizeHtml, f as formatDuration } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, computed, ref, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
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

// app/pages/learn/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		useRouter();
		const slug = String(route.params.slug);
		const { apiData} = useApi();
		useToast();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`learn-${slug}`, async () => {
			const [course, certificates] = await Promise.all([apiData(`/my/courses/${slug}/learn`), apiData("/my/certificates").catch(() => [])]);
			return {
				course,
				certificates: certificates ?? []
			};
		})), __temp = await __temp, __restore(), __temp);
		const course = computed(() => data.value?.course ?? null);
		const sections = computed(() => course.value?.sections ?? []);
		const allLessons = computed(() => sections.value.flatMap((section) => section.lessons));
		const progress = ref(null);
		watch(() => course.value?.progress, (value) => {
			if (value) progress.value = { ...value };
		}, { immediate: true });
		const certificates = computed(() => data.value?.certificates ?? []);
		const certificate = computed(() => {
			if (!course.value) return null;
			return certificates.value.find((item) => item.course?.id === course.value?.id) ?? null;
		});
		const selectedLessonId = ref(Number(route.query.lesson) || null);
		const activeLesson = computed(() => allLessons.value.find((lesson) => lesson.id === selectedLessonId.value) ?? null);
		ref(null);
		const savingProgress = ref(false);
		const completing = ref(false);
		const issuing = ref(false);
		const downloading = ref(false);
		ref(null);
		const progressPercent = computed(() => Math.max(0, Math.min(100, Number(progress.value?.percentage ?? 0))));
		const completedCount = computed(() => progress.value?.completed_lessons ?? allLessons.value.filter((lesson) => lesson.is_completed).length);
		const isComplete = computed(() => !!progress.value?.is_complete);
		const videoKind = computed(() => {
			const video = activeLesson.value?.video;
			if (!video) return "none";
			if (video.source === "upload" && video.stream_url) return "file";
			if (video.url && embedUrl(video.url)) return "embed";
			if (video.url) return "file";
			return "none";
		});
		const videoSrc = computed(() => activeLesson.value?.video?.stream_url || activeLesson.value?.video?.url || "");
		const embeddedSrc = computed(() => embedUrl(activeLesson.value?.video?.url) || "");
		function embedUrl(url) {
			if (!url) return "";
			const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
			if (youtube) return `https://www.youtube.com/embed/${youtube[1]}?rel=0`;
			const vimeo = url.match(/vimeo\.com\/(\d+)/);
			if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
			return "";
		}
		watch(allLessons, (lessons) => {
			if (!lessons.length) return;
			const requested = Number(route.query.lesson);
			if (requested && lessons.some((lesson) => lesson.id === requested)) {
				selectedLessonId.value = requested;
				return;
			}
			if (selectedLessonId.value && lessons.some((lesson) => lesson.id === selectedLessonId.value)) return;
			const next = lessons.find((lesson) => !lesson.is_completed && !lesson.is_locked) ?? lessons[0];
			selectedLessonId.value = next?.id ?? null;
		}, { immediate: true });
		function lessonIcon(lesson) {
			if (lesson.is_locked) return "lock";
			if (lesson.type === "quiz") return "list";
			if (lesson.type === "text") return "book";
			return lesson.is_completed ? "check-circle" : "play-circle";
		}
		useSeoMeta({
			title: () => course.value ? `${course.value.title} — Learning` : "Learning — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1400px] px-4 py-6 md:px-6 md:py-8" }, _attrs))}>`);
			if (unref(pending)) _push(`<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><div class="space-y-4"><div class="aspect-video animate-pulse rounded-2xl bg-gray-200"></div><div class="h-6 w-2/3 animate-pulse rounded bg-gray-200"></div></div><div class="h-96 animate-pulse rounded-2xl bg-gray-100"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "You cannot open this course",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${unref(slug)}`,
						class: "btn-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View course`);
							else return [createTextVNode("View course")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_NuxtLink, {
						to: `/courses/${unref(slug)}`,
						class: "btn-primary"
					}, {
						default: withCtx(() => [createTextVNode("View course")]),
						_: 1
					}, 8, ["to"])];
				}),
				_: 1
			}, _parent));
			else if (unref(course)) {
				_push(`<!--[--><div class="mb-4 flex flex-wrap items-center justify-between gap-3"><nav class="text-xs text-gray-500" aria-label="Breadcrumb">`);
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
				_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(course).title)}</span></nav><div class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/my-courses",
					class: "btn-ghost"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "arrow-left",
								size: 15
							}, null, _parent, _scopeId));
							_push(` My courses`);
						} else return [createVNode(_component_BaseIcon, {
							name: "arrow-left",
							size: 15
						}), createTextVNode(" My courses")];
					}),
					_: 1
				}, _parent));
				_push(`<button type="button" class="btn-ghost"${ssrIncludeBooleanAttr(unref(savingProgress)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "refresh",
					size: 15
				}, null, _parent));
				_push(` Sync </button></div></div><div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><div>`);
				if (unref(activeLesson)?.is_locked || !unref(course).access?.has_access) {
					_push(`<section class="card flex flex-col items-center justify-center px-6 py-16 text-center"><span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "lock",
						size: 30
					}, null, _parent));
					_push(`</span><h2 class="mt-4 text-lg font-bold text-gray-900">This lesson is locked</h2><p class="mt-1 max-w-md text-sm text-gray-500"> You need active access to this course to open the lesson content. Purchase the course or ask an admin to grant access. </p>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${unref(course).slug}`,
						class: "btn-primary mt-5"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View course details`);
							else return [createTextVNode("View course details")];
						}),
						_: 1
					}, _parent));
					_push(`</section>`);
				} else if (unref(activeLesson)) {
					_push(`<!--[-->`);
					if (unref(activeLesson).type === "video") {
						_push(`<section class="overflow-hidden rounded-2xl bg-black shadow-sm"><div class="relative aspect-video">`);
						if (unref(videoKind) === "file" && unref(videoSrc)) _push(`<video${ssrRenderAttr("src", unref(videoSrc))} controls preload="metadata" class="h-full w-full"></video>`);
						else if (unref(videoKind) === "embed") _push(`<iframe${ssrRenderAttr("src", unref(embeddedSrc))} class="h-full w-full"${ssrRenderAttr("title", unref(activeLesson).title)} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
						else {
							_push(`<div class="grid h-full place-items-center text-white/60"><div class="text-center">`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "video",
								size: 48,
								class: "mx-auto"
							}, null, _parent));
							_push(`<p class="mt-2 text-sm">No video has been attached to this lesson yet.</p></div></div>`);
						}
						_push(`</div></section>`);
					} else if (unref(activeLesson).type === "text") _push(`<section class="card p-6 md:p-8"><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Reading</p><h1 class="mt-1 text-xl font-extrabold text-gray-900 md:text-2xl">${ssrInterpolate(unref(activeLesson).title)}</h1><div class="prose-content mt-4">${("sanitizeHtml" in _ctx ? _ctx.sanitizeHtml : unref(sanitizeHtml))(unref(activeLesson).content) ?? ""}</div></section>`);
					else if (unref(activeLesson).type === "quiz") {
						_push(`<section class="card p-6 text-center md:p-10"><span class="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "list",
							size: 30
						}, null, _parent));
						_push(`</span><h1 class="mt-4 text-xl font-extrabold text-gray-900">${ssrInterpolate(unref(activeLesson).title)}</h1><p class="mt-2 text-sm text-gray-500">`);
						if (unref(activeLesson).quiz) {
							_push(`<!--[-->Pass mark ${ssrInterpolate(unref(activeLesson).quiz.pass_percentage)}%`);
							if (unref(activeLesson).quiz.time_limit_minutes) _push(`<!--[--> · ${ssrInterpolate(unref(activeLesson).quiz.time_limit_minutes)} minute limit<!--]-->`);
							else _push(`<!---->`);
							_push(`.<!--]-->`);
						} else _push(`<!---->`);
						_push(` Complete the quiz to unlock the next lesson. </p><div class="mt-5 flex flex-wrap justify-center gap-2">`);
						if (unref(activeLesson).quiz) _push(ssrRenderComponent(_component_NuxtLink, {
							to: `/quizzes/${unref(activeLesson).quiz.id}?course=${unref(course).slug}`,
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "play",
										size: 15
									}, null, _parent, _scopeId));
									_push(` ${ssrInterpolate(unref(activeLesson).is_completed ? "Retake quiz" : "Start quiz")}`);
								} else return [createVNode(_component_BaseIcon, {
									name: "play",
									size: 15
								}), createTextVNode(" " + toDisplayString(unref(activeLesson).is_completed ? "Retake quiz" : "Start quiz"), 1)];
							}),
							_: 1
						}, _parent));
						else _push(`<!---->`);
						if (!unref(activeLesson).is_completed) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(completing)) ? " disabled" : ""}> Mark as complete </button>`);
						else _push(`<!---->`);
						_push(`</div></section>`);
					} else _push(`<!---->`);
					_push(`<div class="card mt-4 p-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><h2 class="text-base font-bold text-gray-900">${ssrInterpolate(unref(activeLesson).title)}</h2>`);
					if (unref(activeLesson).description) _push(`<p class="mt-1 text-sm text-gray-600">${ssrInterpolate(unref(activeLesson).description)}</p>`);
					else _push(`<!---->`);
					_push(`<p class="mt-2 text-xs text-gray-400">`);
					if (unref(activeLesson).duration_seconds) _push(`<!--[-->${ssrInterpolate(("formatDuration" in _ctx ? _ctx.formatDuration : unref(formatDuration))(unref(activeLesson).duration_seconds))} · <!--]-->`);
					else _push(`<!---->`);
					_push(` ${ssrInterpolate(unref(activeLesson).type === "video" ? "Video lesson" : unref(activeLesson).type === "text" ? "Reading lesson" : "Quiz lesson")}</p></div><div class="flex flex-wrap gap-2">`);
					if (unref(activeLesson).is_completed) {
						_push(`<span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "check",
							size: 13
						}, null, _parent));
						_push(` Completed </span>`);
					} else _push(`<!---->`);
					if (unref(activeLesson).type !== "quiz") {
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(completing)) ? " disabled" : ""}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: unref(activeLesson).is_completed ? "rotate-ccw" : "check",
							size: 15
						}, null, _parent));
						_push(` ${ssrInterpolate(unref(activeLesson).is_completed ? "Mark incomplete" : "Mark complete")}</button>`);
					} else _push(`<!---->`);
					_push(`</div></div></div>`);
					if (unref(isComplete)) {
						_push(`<section class="mt-4 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5"><div class="flex flex-wrap items-center justify-between gap-4"><div class="flex items-start gap-3"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "award",
							size: 22
						}, null, _parent));
						_push(`</span><div><h3 class="text-sm font-bold text-gray-900">You finished this course!</h3><p class="text-xs text-gray-600">${ssrInterpolate(unref(certificate) ? `Certificate ${unref(certificate).certificate_number} is ready.` : "Claim your verifiable certificate of completion.")}</p></div></div><div class="flex gap-2">`);
						if (!unref(certificate)) {
							_push(`<button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(issuing)) ? " disabled" : ""}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "award",
								size: 15
							}, null, _parent));
							_push(` ${ssrInterpolate(unref(issuing) ? "Issuing…" : "Claim certificate")}</button>`);
						} else {
							_push(`<!--[--><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(downloading)) ? " disabled" : ""}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "download",
								size: 15
							}, null, _parent));
							_push(` ${ssrInterpolate(unref(downloading) ? "Preparing…" : "Download PDF")}</button>`);
							_push(ssrRenderComponent(_component_NuxtLink, {
								to: "/certificates",
								class: "btn-secondary"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`All certificates`);
									else return [createTextVNode("All certificates")];
								}),
								_: 1
							}, _parent));
							_push(`<!--]-->`);
						}
						_push(`</div></div></section>`);
					} else _push(`<!---->`);
					_push(`<!--]-->`);
				} else _push(ssrRenderComponent(_component_EmptyState, {
					icon: "book-open",
					title: "No lessons yet",
					message: "The instructor is still preparing the curriculum for this course.",
					"action-label": "Back to my courses",
					"action-to": "/my-courses"
				}, null, _parent));
				_push(`</div><aside class="lg:sticky lg:top-24 lg:self-start"><div class="card overflow-hidden"><div class="border-b border-gray-100 p-5"><h2 class="text-sm font-bold text-gray-900">${ssrInterpolate(unref(course).title)}</h2><div class="mt-3 flex items-center justify-between text-xs text-gray-500"><span>${ssrInterpolate(unref(completedCount))}/${ssrInterpolate(unref(progress)?.total_lessons ?? unref(allLessons).length)} lessons</span><span class="font-semibold text-gray-700">${ssrInterpolate(unref(progressPercent))}%</span></div><div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-100"><span class="block h-full rounded-full bg-oc-primary transition-all" style="${ssrRenderStyle({ width: `${unref(progressPercent)}%` })}"></span></div></div><div class="max-h-[60vh] overflow-y-auto"><!--[-->`);
				ssrRenderList$2(unref(sections), (section) => {
					_push(`<div class="border-b border-gray-100 last:border-0"><p class="bg-gray-50 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-gray-500">${ssrInterpolate(section.title)}</p><ul><!--[-->`);
					ssrRenderList$2(section.lessons, (lesson) => {
						_push(`<li><button type="button" class="${ssrRenderClass([unref(selectedLessonId) === lesson.id ? "bg-brand-light text-oc-primary" : "text-gray-700 hover:bg-gray-50", "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition"])}">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: lessonIcon(lesson),
							size: 16,
							class: lesson.is_locked ? "text-gray-400" : lesson.is_completed ? "text-emerald-500" : "text-oc-primary"
						}, null, _parent));
						_push(`<span class="${ssrRenderClass([{ "text-gray-400": lesson.is_locked }, "flex-1"])}">${ssrInterpolate(lesson.title)}</span>`);
						if (lesson.is_preview && lesson.is_locked) _push(`<span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Preview</span>`);
						else if (lesson.duration_seconds) _push(`<span class="text-[11px] text-gray-400">${ssrInterpolate(("formatDuration" in _ctx ? _ctx.formatDuration : unref(formatDuration))(lesson.duration_seconds))}</span>`);
						else _push(`<!---->`);
						_push(`</button></li>`);
					});
					_push(`<!--]--></ul></div>`);
				});
				_push(`<!--]--></div></div><div class="card mt-4 p-4"><p class="text-xs font-bold uppercase tracking-wide text-gray-400">Need help?</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/contact",
					class: "mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "phone",
								size: 15
							}, null, _parent, _scopeId));
							_push(` Contact support `);
						} else return [createVNode(_component_BaseIcon, {
							name: "phone",
							size: 15
						}), createTextVNode(" Contact support ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></aside></div><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/learn/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/learn/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CD8YNuPG.mjs.map
