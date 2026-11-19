import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-C75kbax7.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { a as formatDate } from './format-eJzdzGa2.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
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

// app/pages/admin/reviews.vue?vue&type=script&setup=true&lang.ts
var reviews_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "reviews",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Reviews — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		useFormHandler();
		const { initial } = useInitials();
		const filter = ref("all");
		const rating = ref("");
		const courseId = ref("");
		const page = ref(1);
		const { data: courses } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-review-courses", () => apiData("/admin/courses", { query: { per_page: 100 } }).then((result) => result.data).catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-reviews", () => apiData("/admin/reviews", { query: {
			per_page: 15,
			page: page.value,
			is_approved: filter.value === "all" ? void 0 : filter.value === "approved" ? 1 : 0,
			rating: rating.value || void 0,
			course_id: courseId.value || void 0
		} }), { watch: [
			page,
			filter,
			rating,
			courseId
		] })), __temp = await __temp, __restore(), __temp);
		const reviews = computed(() => data.value?.data ?? []);
		watch([
			filter,
			rating,
			courseId
		], () => page.value = 1);
		const filters = [
			{
				value: "all",
				label: "All reviews"
			},
			{
				value: "approved",
				label: "Approved"
			},
			{
				value: "pending",
				label: "Rejected"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Course reviews",
				subtitle: "Moderate student feedback. Rejected reviews are hidden from the course page.",
				icon: "star"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "refresh",
							size: 15
						}, null, _parent, _scopeId));
						_push(` Refresh </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(pending),
						onClick: ($event) => unref(refresh)()
					}, [createVNode(_component_BaseIcon, {
						name: "refresh",
						size: 15
					}), createTextVNode(" Refresh ")], 8, ["disabled", "onClick"])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="flex flex-wrap items-center gap-2"><div class="flex flex-wrap gap-1"><!--[-->`);
			ssrRenderList$2(filters, (item) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(filter) === item.value ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3 py-1.5 text-xs font-semibold transition"])}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></div><div class="ml-auto flex flex-1 flex-wrap justify-end gap-2"><select class="field-input max-w-[150px] !py-2 text-xs" aria-label="Filter by rating"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), "") : ssrLooseEqual(unref(rating), "")) ? " selected" : ""}>Any rating</option><!--[-->`);
			ssrRenderList$2(5, (star) => {
				_push(`<option${ssrRenderAttr("value", star)}${ssrIncludeBooleanAttr(Array.isArray(unref(rating)) ? ssrLooseContain(unref(rating), star) : ssrLooseEqual(unref(rating), star)) ? " selected" : ""}>${ssrInterpolate(star)} star${ssrInterpolate(star === 1 ? "" : "s")}</option>`);
			});
			_push(`<!--]--></select><select class="field-input max-w-[240px] !py-2 text-xs" aria-label="Filter by course"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), "") : ssrLooseEqual(unref(courseId), "")) ? " selected" : ""}>All courses</option><!--[-->`);
			ssrRenderList$2(unref(courses), (course) => {
				_push(`<option${ssrRenderAttr("value", course.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), course.id) : ssrLooseEqual(unref(courseId), course.id)) ? " selected" : ""}>${ssrInterpolate(course.title)}</option>`);
			});
			_push(`<!--]--></select></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-3"><!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<div class="card h-28 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load reviews",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(reviews).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "star",
				title: "No reviews in this view",
				message: "Students can review a course once they are enrolled. Try a different filter.",
				"action-label": unref(filter) !== "all" || unref(rating) || unref(courseId) ? "Clear filters" : void 0,
				onAction: ($event) => {
					filter.value = "all";
					rating.value = "";
					courseId.value = "";
				}
			}, null, _parent));
			else {
				_push(`<div class="space-y-3"><!--[-->`);
				ssrRenderList$2(unref(reviews), (review) => {
					_push(`<article class="card p-4"><div class="flex flex-wrap items-start justify-between gap-3"><div class="flex min-w-0 items-start gap-3"><span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-bold text-oc-primary">${ssrInterpolate(unref(initial)(review.user?.name))}</span><div class="min-w-0"><p class="text-sm font-bold text-gray-900">${ssrInterpolate(review.user?.name || "Deleted user")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(review.user?.email || "—")} · ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(review.created_at, true))}</p><p class="mt-0.5 text-xs text-gray-500"> on `);
					if (review.course) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${review.course.slug}`,
						target: "_blank",
						class: "font-semibold text-oc-primary hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(review.course.title)}`);
							else return [createTextVNode(toDisplayString(review.course.title), 1)];
						}),
						_: 2
					}, _parent));
					else _push(`<span>a deleted course</span>`);
					_push(`</p></div></div><div class="flex items-center gap-2">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: review.is_approved ? "approved" : "rejected" }, null, _parent));
					_push(`<span class="badge bg-amber-50 text-amber-700 ring-amber-200">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "star",
						size: 12,
						filled: ""
					}, null, _parent));
					_push(` ${ssrInterpolate(review.rating)}</span></div></div><div class="mt-3 rounded-xl bg-gray-50/70 p-3">`);
					if (review.title) _push(`<p class="text-sm font-semibold text-gray-800">${ssrInterpolate(review.title)}</p>`);
					else _push(`<!---->`);
					_push(`<p class="mt-0.5 text-sm leading-relaxed text-gray-600">${ssrInterpolate(review.comment || "No comment provided.")}</p></div><div class="mt-3 flex flex-wrap items-center justify-end gap-1 border-t border-gray-100 pt-2">`);
					if (!review.is_approved) {
						_push(`<button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "check",
							size: 14
						}, null, _parent));
						_push(` Approve </button>`);
					} else {
						_push(`<button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-amber-600 hover:bg-amber-50">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "eye",
							size: 14
						}, null, _parent));
						_push(` Hide </button>`);
					}
					_push(`<button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-rose-600 hover:bg-rose-50">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 14
					}, null, _parent));
					_push(` Delete </button></div></article>`);
				});
				_push(`<!--]--><div class="flex justify-center pt-2">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(data)?.current_page ?? 1,
					"last-page": unref(data)?.last_page ?? 1,
					total: unref(data)?.total,
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/admin/reviews.vue
var _sfc_setup = reviews_vue_vue_type_script_setup_true_lang_default.setup;
reviews_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/reviews.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var reviews_default = reviews_vue_vue_type_script_setup_true_lang_default;

export { reviews_default as default };
//# sourceMappingURL=reviews-gPNwtUSV.mjs.map
