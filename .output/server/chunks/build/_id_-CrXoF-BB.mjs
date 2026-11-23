import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, m as mediaUrl, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { C as CourseCard_default } from './CourseCard-8VpI1tTj.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { c as formatNumber } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './RatingStars-DvyQ9IRB.mjs';

// app/pages/instructors/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { apiData } = useApi();
		const { initial } = useInitials();
		const { data: instructor, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`instructor-${route.params.id}`, () => apiData(`/instructors/${route.params.id}`))), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: () => instructor.value ? `${instructor.value.name} — Instructor at Shikhor Academy` : "Instructor — Shikhor Academy",
			description: () => instructor.value?.headline || instructor.value?.bio?.slice(0, 150) || "Instructor at Shikhor Academy"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_EmptyState = EmptyState_default;
			const _component_CourseCard = CourseCard_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1200px] px-4 py-8 md:px-6 md:py-12" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
			_push(`<span class="mx-1.5">/</span>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/instructors",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Instructors`);
					else return [createTextVNode("Instructors")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(instructor)?.name)}</span></nav>`);
			if (unref(pending)) _push(`<div class="card h-56 animate-pulse bg-gray-50"></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "users",
				title: "Instructor not found",
				message: "This instructor does not exist or is no longer teaching.",
				"action-label": "All instructors",
				"action-to": "/instructors"
			}, null, _parent));
			else if (unref(instructor)) {
				_push(`<!--[--><section class="card flex flex-col items-center gap-6 p-6 text-center md:flex-row md:items-start md:p-8 md:text-left">`);
				if (unref(instructor).avatar) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(unref(instructor).avatar))}${ssrRenderAttr("alt", unref(instructor).name)} class="h-32 w-32 shrink-0 rounded-full object-cover shadow">`);
				else _push(`<span class="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-brand-light text-5xl font-extrabold text-oc-primary">${ssrInterpolate(unref(initial)(unref(instructor).name))}</span>`);
				_push(`<div class="min-w-0"><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Instructor</p><h1 class="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">${ssrInterpolate(unref(instructor).name)}</h1>`);
				if (unref(instructor).headline) _push(`<p class="mt-1 text-base font-semibold text-gray-600">${ssrInterpolate(unref(instructor).headline)}</p>`);
				else _push(`<!---->`);
				if (unref(instructor).bio) _push(`<p class="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">${ssrInterpolate(unref(instructor).bio)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="mt-4 flex justify-center gap-8 text-sm text-gray-500 md:justify-start"><span><b class="text-lg text-gray-900">${ssrInterpolate(unref(instructor).courses_count)}</b> course${ssrInterpolate(unref(instructor).courses_count === 1 ? "" : "s")}</span><span><b class="text-lg text-gray-900">${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(instructor).students_count))}</b> student${ssrInterpolate(unref(instructor).students_count === 1 ? "" : "s")}</span></div></div></section><section class="mt-8"><h2 class="text-xl font-extrabold text-gray-900">Courses by ${ssrInterpolate(unref(instructor).name)}</h2>`);
				if (!unref(instructor).courses.length) _push(ssrRenderComponent(_component_EmptyState, {
					class: "mt-4",
					icon: "book-open",
					title: "No published courses yet",
					message: "Check back soon."
				}, null, _parent));
				else {
					_push(`<div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
					ssrRenderList$2(unref(instructor).courses, (course) => {
						_push(ssrRenderComponent(_component_CourseCard, {
							key: course.id,
							course
						}, null, _parent));
					});
					_push(`<!--]--></div>`);
				}
				_push(`</section><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/instructors/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/instructors/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-CrXoF-BB.mjs.map
