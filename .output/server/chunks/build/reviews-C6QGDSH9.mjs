import { b as useApi, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { L as LoadingSkeleton_default } from './LoadingSkeleton-BdeYArX2.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { c as formatNumber, i as initials, a as formatDate } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/reviews.vue?vue&type=script&setup=true&lang.ts
var reviews_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "reviews",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData } = useApi();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("reviews-aggregate", async () => {
			const courses = ((await apiData("/courses", { query: {
				per_page: 6,
				sort: "rating"
			} }).catch(() => null))?.data ?? []).slice(0, 6);
			return { groups: (await Promise.all(courses.map(async (course) => {
				const result = await apiData(`/courses/${course.slug}/reviews`, { query: { per_page: 6 } }).catch(() => null);
				return result ? {
					course,
					summary: result.summary,
					reviews: result.reviews.data.map((review) => ({
						...review,
						course: {
							id: course.id,
							title: course.title,
							slug: course.slug
						}
					}))
				} : null;
			}))).filter((batch) => !!batch) };
		})), __temp = await __temp, __restore(), __temp);
		const reviews = computed(() => (data.value?.groups ?? []).flatMap((group) => group.reviews));
		const totalReviews = computed(() => data.value?.groups.reduce((sum, group) => sum + (group.summary?.count || 0), 0) ?? 0);
		const average = computed(() => {
			const groups = data.value?.groups.filter((group) => group.summary?.count) ?? [];
			if (!groups.length) return 0;
			return groups.reduce((sum, group) => sum + group.summary.average * group.summary.count, 0) / groups.reduce((sum, group) => sum + group.summary.count, 0);
		});
		useSeoMeta({
			title: "Student reviews — Shikhor Academy",
			description: "Real reviews from students enrolled in Shikhor Academy courses."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_RatingStars = RatingStars_default;
			const _component_LoadingSkeleton = LoadingSkeleton_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Reviews</span></nav><div class="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white md:p-8"><h1 class="text-2xl font-extrabold md:text-3xl">Student reviews</h1><p class="mt-2 max-w-2xl text-sm text-white/90"> Approved reviews from our most popular courses. A review can only be written by an enrolled student. </p></div><div class="mt-5 card flex flex-wrap items-center gap-6 p-5"><div class="text-center"><p class="text-3xl font-extrabold text-gray-900">${ssrInterpolate(Number(unref(average) || 0).toFixed(1))}</p>`);
			_push(ssrRenderComponent(_component_RatingStars, {
				rating: unref(average),
				"show-value": false,
				size: 16
			}, null, _parent));
			_push(`</div><div class="h-10 w-px bg-gray-200"></div><p class="text-sm text-gray-600"><span class="font-bold text-gray-900">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(totalReviews)))}</span> approved reviews across ${ssrInterpolate(unref(data)?.groups.length || 0)} courses.</p></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6">`);
				_push(ssrRenderComponent(_component_LoadingSkeleton, {
					count: 4,
					type: "row"
				}, null, _parent));
				_push(`</div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load reviews",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(reviews).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "star",
				title: "No reviews yet",
				message: "Be the first to finish a course and share your experience.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else {
				_push(`<!--[-->`);
				ssrRenderList$2(unref(data)?.groups, (group) => {
					_push(`<div class="mt-8">`);
					if (group.summary.count) {
						_push(`<div class="mb-3 flex flex-wrap items-center justify-between gap-2">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/courses/${group.course.slug}`,
							class: "text-base font-bold text-gray-900 hover:text-oc-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(group.course.title)}`);
								else return [createTextVNode(toDisplayString(group.course.title), 1)];
							}),
							_: 2
						}, _parent));
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: group.summary.average,
							count: group.summary.count,
							size: 14
						}, null, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`<div class="grid gap-4 md:grid-cols-2"><!--[-->`);
					ssrRenderList$2(group.reviews, (review) => {
						_push(`<figure class="card p-5"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2.5"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(review.user?.name))}</span><div><p class="text-sm font-semibold text-gray-800">${ssrInterpolate(review.user?.name || "Student")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(review.created_at))}</p></div></div>`);
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: review.rating,
							"show-value": false,
							size: 13
						}, null, _parent));
						_push(`</div><blockquote class="mt-3 text-sm leading-6 text-gray-600">`);
						if (review.title) _push(`<span class="block font-semibold text-gray-800">${ssrInterpolate(review.title)}</span>`);
						else _push(`<!---->`);
						_push(` ${ssrInterpolate(review.comment)}</blockquote></figure>`);
					});
					_push(`<!--]--></div></div>`);
				});
				_push(`<!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/reviews.vue
var _sfc_setup = reviews_vue_vue_type_script_setup_true_lang_default.setup;
reviews_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/reviews.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var reviews_default = reviews_vue_vue_type_script_setup_true_lang_default;

export { reviews_default as default };
//# sourceMappingURL=reviews-C6QGDSH9.mjs.map
