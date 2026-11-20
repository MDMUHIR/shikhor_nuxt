import { b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { s as statusLabel, a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

// app/pages/my-courses.vue?vue&type=script&setup=true&lang.ts
var my_courses_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "my-courses",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData } = useApi();
		const { data: dashboard } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("my-dashboard", () => apiData("/my/dashboard").catch(() => null))), __temp = await __temp, __restore(), __temp);
		const { data: courses, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("my-courses-page", async () => {
			return await apiData("/my/courses") ?? [];
		})), __temp = await __temp, __restore(), __temp);
		const filter = ref("all");
		const filtered = computed(() => {
			const list = courses.value ?? [];
			if (filter.value === "all") return list;
			if (filter.value === "expired") return list.filter((item) => !item.enrollment.is_active);
			return list.filter((item) => item.enrollment.is_active);
		});
		const activeCount = computed(() => (courses.value ?? []).filter((item) => item.enrollment.is_active).length);
		function progressOf(item) {
			return Math.max(0, Math.min(100, Number(item.progress?.percentage ?? 0)));
		}
		useSeoMeta({
			title: "My courses — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">My courses</span></nav><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My courses</h1><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(activeCount))} active course${ssrInterpolate(unref(activeCount) === 1 ? "" : "s")} · pick up where you left off.</p></div><div class="flex gap-2">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certificates",
				class: "btn-secondary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "award",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Certificates`);
					} else return [createVNode(_component_BaseIcon, {
						name: "award",
						size: 16
					}), createTextVNode(" Certificates")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/courses",
				class: "btn-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "book-open",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Browse courses`);
					} else return [createVNode(_component_BaseIcon, {
						name: "book-open",
						size: 16
					}), createTextVNode(" Browse courses")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div>`);
			if (unref(dashboard)) {
				_push(`<div class="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4"><div class="card p-4"><p class="text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(dashboard).stats.active_courses)}</p><p class="text-xs text-gray-500">Active courses</p></div><div class="card p-4"><p class="text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(dashboard).stats.completed_courses)}</p><p class="text-xs text-gray-500">Completed</p></div><div class="card p-4"><p class="text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(dashboard).stats.lessons_completed)}</p><p class="text-xs text-gray-500">Lessons done</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/certificates",
					class: "card p-4"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<p class="text-2xl font-extrabold text-gray-900"${_scopeId}>${ssrInterpolate(unref(dashboard).stats.certificates)}</p><p class="text-xs text-gray-500"${_scopeId}>Certificates</p>`);
						else return [createVNode("p", { class: "text-2xl font-extrabold text-gray-900" }, toDisplayString(unref(dashboard).stats.certificates), 1), createVNode("p", { class: "text-xs text-gray-500" }, "Certificates")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			if (unref(dashboard)?.continue_learning?.length) {
				_push(`<section class="mt-5"><h2 class="text-sm font-bold text-gray-900">Continue learning</h2><div class="mt-2 grid gap-3 md:grid-cols-2"><!--[-->`);
				ssrRenderList$2(unref(dashboard).continue_learning, (item) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: item.enrollment_id,
						to: `/learn/${item.course?.slug}${item.resume_lesson ? `?lesson=${item.resume_lesson.id}` : ""}`,
						class: "card flex items-center gap-3 p-3 hover:border-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="min-w-0 flex-1"${_scopeId}><p class="truncate text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(item.course?.title)}</p><p class="truncate text-[11px] text-gray-500"${_scopeId}>${ssrInterpolate(item.resume_lesson ? `Resume: ${item.resume_lesson.title}` : "Start learning")}</p><div class="mt-2 h-1.5 rounded-full bg-gray-100"${_scopeId}><div class="h-full rounded-full bg-oc-primary" style="${ssrRenderStyle({ width: `${Math.min(100, Number(item.progress_percentage))}%` })}"${_scopeId}></div></div></div>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "arrow-right",
									size: 16,
									class: "text-oc-primary"
								}, null, _parent, _scopeId));
							} else return [createVNode("div", { class: "min-w-0 flex-1" }, [
								createVNode("p", { class: "truncate text-sm font-semibold text-gray-800" }, toDisplayString(item.course?.title), 1),
								createVNode("p", { class: "truncate text-[11px] text-gray-500" }, toDisplayString(item.resume_lesson ? `Resume: ${item.resume_lesson.title}` : "Start learning"), 1),
								createVNode("div", { class: "mt-2 h-1.5 rounded-full bg-gray-100" }, [createVNode("div", {
									class: "h-full rounded-full bg-oc-primary",
									style: { width: `${Math.min(100, Number(item.progress_percentage))}%` }
								}, null, 4)])
							]), createVNode(_component_BaseIcon, {
								name: "arrow-right",
								size: 16,
								class: "text-oc-primary"
							})];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></section>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-5 flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList$2([
				{
					value: "all",
					label: "All"
				},
				{
					value: "active",
					label: "Active"
				},
				{
					value: "expired",
					label: "Expired"
				}
			], (item) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(filter) === item.value ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3.5 py-1.5 text-xs font-semibold transition"])}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card animate-pulse overflow-hidden"><div class="aspect-video bg-gray-200"></div><div class="space-y-2 p-4"><div class="h-4 w-4/5 rounded bg-gray-200"></div><div class="h-2 w-full rounded bg-gray-200"></div><div class="h-8 w-28 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load your courses",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(courses)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "book-open",
				title: "You are not enrolled yet",
				message: "Buy a course and it will appear here with progress tracking and certificates.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "filter",
				title: "No courses in this view",
				message: "Try another filter to see the rest of your courses.",
				"action-label": "Show all",
				onAction: ($event) => filter.value = "all"
			}, null, _parent));
			else {
				_push(`<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(filtered), (item) => {
					_push(`<article class="card flex flex-col overflow-hidden"><div class="relative aspect-video bg-gray-50"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.course.thumbnail))}${ssrRenderAttr("alt", item.course.title)} class="h-full w-full object-cover"><span class="${ssrRenderClass([item.enrollment.is_active ? "bg-emerald-500 text-white" : "bg-gray-800/80 text-white", "absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold"])}">${ssrInterpolate(item.enrollment.is_active ? "Active" : ("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(item.enrollment.status))}</span></div><div class="flex flex-1 flex-col p-4">`);
					if (item.course.category) _push(`<p class="text-[11px] font-semibold uppercase tracking-wide text-oc-primary">${ssrInterpolate(item.course.category.name)}</p>`);
					else _push(`<!---->`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${item.course.slug}`,
						class: "mt-1 line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(item.course.title)}`);
							else return [createTextVNode(toDisplayString(item.course.title), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<div class="mt-3"><div class="flex items-center justify-between text-xs text-gray-500"><span>${ssrInterpolate(item.progress?.completed_lessons ?? 0)}/${ssrInterpolate(item.progress?.total_lessons ?? item.course.total_lessons)} lessons</span><span class="font-semibold text-gray-700">${ssrInterpolate(progressOf(item))}%</span></div><div class="mt-1 h-2 overflow-hidden rounded-full bg-gray-100"><span class="block h-full rounded-full bg-oc-primary transition-all" style="${ssrRenderStyle({ width: `${progressOf(item)}%` })}"></span></div></div><p class="mt-3 text-xs text-gray-500">`);
					if (item.enrollment.is_lifetime) _push(`<!--[-->Lifetime access<!--]-->`);
					else if (item.enrollment.remaining_days !== null) _push(`<!--[-->${ssrInterpolate(item.enrollment.remaining_days)} day${ssrInterpolate(item.enrollment.remaining_days === 1 ? "" : "s")} left<!--]-->`);
					else _push(`<!--[-->Access ends ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.enrollment.expires_at))}<!--]-->`);
					_push(`</p><div class="mt-auto pt-4">`);
					if (item.enrollment.is_active) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/learn/${item.course.slug}`,
						class: "btn-primary w-full"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "play",
									size: 15
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(progressOf(item) > 0 ? "Continue learning" : "Start course")}`);
							} else return [createVNode(_component_BaseIcon, {
								name: "play",
								size: 15
							}), createTextVNode(" " + toDisplayString(progressOf(item) > 0 ? "Continue learning" : "Start course"), 1)];
						}),
						_: 2
					}, _parent));
					else _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${item.course.slug}`,
						class: "btn-secondary w-full"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` Renew access `);
							else return [createTextVNode(" Renew access ")];
						}),
						_: 2
					}, _parent));
					_push(`</div></div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/my-courses.vue
var _sfc_setup = my_courses_vue_vue_type_script_setup_true_lang_default.setup;
my_courses_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-courses.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var my_courses_default = my_courses_vue_vue_type_script_setup_true_lang_default;

export { my_courses_default as default };
//# sourceMappingURL=my-courses-BOvJRFDB.mjs.map
