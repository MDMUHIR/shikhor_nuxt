import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, n as navigateTo } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-BI1HjP-K.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { m as mediaUrl } from './media-DFMfymxc.mjs';
import { b as formatMoney, c as formatNumber } from './format-owYeCpVb.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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
import './useToast-BG2fH8c_.mjs';

// app/pages/admin/courses/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Courses — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		useFormHandler();
		const search = ref("");
		const status = ref("");
		const categoryId = ref("");
		const page = ref(1);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-categories-options", () => apiData("/admin/course-categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-courses", () => apiData("/admin/courses", { query: {
			per_page: 15,
			page: page.value,
			search: search.value.trim() || void 0,
			status: status.value || void 0,
			category_id: categoryId.value || void 0
		} }), { watch: [
			page,
			categoryId,
			status
		] })), __temp = await __temp, __restore(), __temp);
		const courses = computed(() => data.value?.data ?? []);
		const total = computed(() => data.value?.total ?? 0);
		watch([status, categoryId], () => page.value = 1);
		function clearFilters() {
			search.value = "";
			status.value = "";
			categoryId.value = "";
			page.value = 1;
			refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Courses",
				subtitle: "Create course pages, build the curriculum, attach quizzes and publish.",
				icon: "book-open"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/admin/courses/new",
						class: "btn-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "plus",
									size: 16
								}, null, _parent, _scopeId));
								_push(` New course `);
							} else return [createVNode(_component_BaseIcon, {
								name: "plus",
								size: 16
							}), createTextVNode(" New course ")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_NuxtLink, {
						to: "/admin/courses/new",
						class: "btn-primary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "plus",
							size: 16
						}), createTextVNode(" New course ")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="relative md:col-span-5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search courses by title or slug…" aria-label="Search courses"></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All statuses</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "draft") : ssrLooseEqual(unref(status), "draft")) ? " selected" : ""}>Draft</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "published") : ssrLooseEqual(unref(status), "published")) ? " selected" : ""}>Published</option><option value="archived"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "archived") : ssrLooseEqual(unref(status), "archived")) ? " selected" : ""}>Archived</option></select></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by category"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), "") : ssrLooseEqual(unref(categoryId), "")) ? " selected" : ""}>All categories</option><!--[-->`);
			ssrRenderList$2(unref(categories), (category) => {
				_push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), category.id) : ssrLooseEqual(unref(categoryId), category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-1"><button type="button" class="btn-secondary w-full" aria-label="Clear filters">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(`</button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load courses",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(courses).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "book-open",
				title: "No courses found",
				message: "Adjust the filters or create a new course to get started.",
				"action-label": unref(search) || unref(status) || unref(categoryId) ? "Clear filters" : "Create a course",
				onAction: ($event) => unref(search) || unref(status) || unref(categoryId) ? clearFilters() : ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/courses/new")
			}, null, _parent));
			else {
				_push(`<!--[--><div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[820px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Course</th><th class="px-3 py-2.5 font-semibold">Category</th><th class="px-3 py-2.5 font-semibold">Price</th><th class="px-3 py-2.5 font-semibold">Lessons</th><th class="px-3 py-2.5 font-semibold">Students</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(courses), (course) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(course.thumbnail))}${ssrRenderAttr("alt", course.title)} class="h-11 w-16 rounded-lg object-cover"><div class="min-w-0"><p class="max-w-[240px] truncate font-semibold text-gray-900">${ssrInterpolate(course.title)}</p><p class="max-w-[240px] truncate text-[11px] text-gray-400">/${ssrInterpolate(course.slug)}</p>`);
					if (course.is_featured) _push(`<span class="badge mt-1 bg-amber-50 text-amber-700 ring-amber-200">Featured</span>`);
					else _push(`<!---->`);
					_push(`</div></div></td><td class="px-3 py-3 text-xs text-gray-600">${ssrInterpolate(course.category?.name || "—")}</td><td class="px-3 py-3"><p class="font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(course.effective_price))}</p>`);
					if (course.offer_price) _push(`<p class="text-[11px] text-gray-400 line-through">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(course.price))}</p>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(course.total_lessons)}</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(course.total_students))}</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: course.status }, null, _parent));
					_push(`</td><td class="px-4 py-3"><div class="flex items-center justify-end gap-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/courses/${course.id}`,
						class: "btn-secondary !px-2.5 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "edit",
									size: 14
								}, null, _parent, _scopeId));
								_push(` Edit `);
							} else return [createVNode(_component_BaseIcon, {
								name: "edit",
								size: 14
							}), createTextVNode(" Edit ")];
						}),
						_: 2
					}, _parent));
					if (course.status === "published") _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${course.slug}`,
						target: "_blank",
						class: "btn-ghost !px-2 !py-1.5 text-xs",
						"aria-label": "View course"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_BaseIcon, {
								name: "external-link",
								size: 14
							}, null, _parent, _scopeId));
							else return [createVNode(_component_BaseIcon, {
								name: "external-link",
								size: 14
							})];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50" aria-label="Delete course">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 14
					}, null, _parent));
					_push(`</button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div><div class="mt-5 flex flex-col items-center gap-2">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(data)?.current_page ?? 1,
					"last-page": unref(data)?.last_page ?? 1,
					total: unref(total),
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/admin/courses/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/courses/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var courses_default = index_vue_vue_type_script_setup_true_lang_default;

export { courses_default as default };
//# sourceMappingURL=courses-D91pAPJ0.mjs.map
