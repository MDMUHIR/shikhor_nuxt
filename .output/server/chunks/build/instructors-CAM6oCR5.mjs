import { b as useApi, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DoSlkVxW.mjs';
import { c as formatNumber } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/instructors/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData } = useApi();
		const { initial } = useInitials();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("instructors-list", () => apiData("/instructors"))), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: "Our instructors — Shikhor Academy",
			description: "Meet the expert instructors teaching at Shikhor Academy."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Instructors</span></nav><div class="text-center"><h1 class="text-3xl font-extrabold text-gray-900 md:text-4xl">Learn from our instructors</h1><p class="mx-auto mt-2 max-w-2xl text-sm text-gray-500 md:text-base">Experienced teachers who build and run the courses on Shikhor Academy.</p></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card h-72 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-8",
				title: "Could not load instructors",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(data)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-8",
				icon: "users",
				title: "Instructors are coming soon",
				message: "Browse our courses in the meantime.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else {
				_push(`<div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(data), (instructor) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: instructor.id,
						to: `/instructors/${instructor.id}`,
						class: "card group flex flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lg"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="h-20 bg-gradient-to-r from-oc-primary/70 to-oc-primary"${_scopeId}></div><div class="-mt-12 flex justify-center"${_scopeId}>`);
								if (instructor.avatar) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(instructor.avatar))}${ssrRenderAttr("alt", instructor.name)} class="h-24 w-24 rounded-full border-4 border-white object-cover shadow"${_scopeId}>`);
								else _push(`<span class="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-brand-light text-3xl font-extrabold text-oc-primary shadow"${_scopeId}>${ssrInterpolate(unref(initial)(instructor.name))}</span>`);
								_push(`</div><div class="flex flex-1 flex-col p-5 text-center"${_scopeId}><h2 class="text-lg font-bold text-gray-900 group-hover:text-oc-primary"${_scopeId}>${ssrInterpolate(instructor.name)}</h2>`);
								if (instructor.headline) _push(`<p class="mt-1 text-sm font-semibold text-oc-primary"${_scopeId}>${ssrInterpolate(instructor.headline)}</p>`);
								else _push(`<!---->`);
								if (instructor.bio) _push(`<p class="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600"${_scopeId}>${ssrInterpolate(instructor.bio)}</p>`);
								else _push(`<!---->`);
								_push(`<div class="mt-4 flex justify-center gap-6 border-t border-gray-100 pt-4 text-xs text-gray-500"${_scopeId}><span${_scopeId}><b class="block text-base text-gray-900"${_scopeId}>${ssrInterpolate(instructor.courses_count)}</b> course${ssrInterpolate(instructor.courses_count === 1 ? "" : "s")}</span><span${_scopeId}><b class="block text-base text-gray-900"${_scopeId}>${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(instructor.students_count))}</b> student${ssrInterpolate(instructor.students_count === 1 ? "" : "s")}</span></div></div>`);
							} else return [
								createVNode("div", { class: "h-20 bg-gradient-to-r from-oc-primary/70 to-oc-primary" }),
								createVNode("div", { class: "-mt-12 flex justify-center" }, [instructor.avatar ? (openBlock(), createBlock("img", {
									key: 0,
									src: ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(instructor.avatar),
									alt: instructor.name,
									class: "h-24 w-24 rounded-full border-4 border-white object-cover shadow",
									onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
								}, null, 40, [
									"src",
									"alt",
									"onError"
								])) : (openBlock(), createBlock("span", {
									key: 1,
									class: "flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-brand-light text-3xl font-extrabold text-oc-primary shadow"
								}, toDisplayString(unref(initial)(instructor.name)), 1))]),
								createVNode("div", { class: "flex flex-1 flex-col p-5 text-center" }, [
									createVNode("h2", { class: "text-lg font-bold text-gray-900 group-hover:text-oc-primary" }, toDisplayString(instructor.name), 1),
									instructor.headline ? (openBlock(), createBlock("p", {
										key: 0,
										class: "mt-1 text-sm font-semibold text-oc-primary"
									}, toDisplayString(instructor.headline), 1)) : createCommentVNode("", true),
									instructor.bio ? (openBlock(), createBlock("p", {
										key: 1,
										class: "mt-2 line-clamp-3 flex-1 text-sm leading-6 text-gray-600"
									}, toDisplayString(instructor.bio), 1)) : createCommentVNode("", true),
									createVNode("div", { class: "mt-4 flex justify-center gap-6 border-t border-gray-100 pt-4 text-xs text-gray-500" }, [createVNode("span", null, [createVNode("b", { class: "block text-base text-gray-900" }, toDisplayString(instructor.courses_count), 1), createTextVNode(" course" + toDisplayString(instructor.courses_count === 1 ? "" : "s"), 1)]), createVNode("span", null, [createVNode("b", { class: "block text-base text-gray-900" }, toDisplayString(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(instructor.students_count)), 1), createTextVNode(" student" + toDisplayString(instructor.students_count === 1 ? "" : "s"), 1)])])
								])
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/instructors/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/instructors/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var instructors_default = index_vue_vue_type_script_setup_true_lang_default;

export { instructors_default as default };
//# sourceMappingURL=instructors-CAM6oCR5.mjs.map
