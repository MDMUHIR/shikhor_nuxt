import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { B as BlogCard_default } from './BlogCard-BW4roZtV.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { e as excerpt, a as formatDate, c as formatNumber, g as sanitizeHtml } from './format-eJzdzGa2.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
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

// app/pages/blog/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const id = String(route.params.id);
		const { apiData, apiFetch } = useApi();
		const { data: blog, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`blog-${id}`, () => apiData(`/blogs/${id}`, { query: { increment_views: 1 } }))), __temp = await __temp, __restore(), __temp);
		const { data: relatedResponse } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`blog-related-${id}`, () => apiFetch("/blogs", { query: { per_page: 4 } }).catch(() => null))), __temp = await __temp, __restore(), __temp);
		const related = computed(() => (relatedResponse.value?.blogs ?? []).filter((item) => item.id !== blog.value?.id).slice(0, 3));
		const image = computed(() => mediaUrl(blog.value?.image));
		useSeoMeta({
			title: () => blog.value ? `${blog.value.title} — Shikhor Academy` : "Article — Shikhor Academy",
			description: () => excerpt(blog.value?.content, 160),
			ogImage: () => blog.value?.image ? mediaUrl(blog.value.image) : void 0,
			ogType: "article"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_BlogCard = BlogCard_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
				to: "/blog",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Blog`);
					else return [createTextVNode("Blog")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="truncate text-gray-700">${ssrInterpolate(unref(blog)?.title || "Article")}</span></nav>`);
			if (unref(pending)) {
				_push(`<div class="space-y-4"><div class="h-8 w-3/4 animate-pulse rounded bg-gray-200"></div><div class="h-4 w-40 animate-pulse rounded bg-gray-200"></div><div class="aspect-[16/9] animate-pulse rounded-2xl bg-gray-200"></div><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="h-4 w-full animate-pulse rounded bg-gray-200"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Article not found",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(blog)) {
				_push(`<article><h1 class="text-2xl font-extrabold leading-tight text-gray-900 md:text-4xl">${ssrInterpolate(unref(blog).title)}</h1><div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500"><span class="inline-flex items-center gap-1">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "user",
					size: 13
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(blog).author?.name)}</span><span class="inline-flex items-center gap-1">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "calendar",
					size: 13
				}, null, _parent));
				_push(` ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(blog).published_at))}</span><span class="inline-flex items-center gap-1">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "eye",
					size: 13
				}, null, _parent));
				_push(` ${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(blog).views))} views</span></div><div class="mt-5 overflow-hidden rounded-2xl bg-gray-100"><img${ssrRenderAttr("src", unref(image))}${ssrRenderAttr("alt", unref(blog).title)} class="aspect-[16/9] w-full object-cover"></div><div class="prose-content mt-6">${("sanitizeHtml" in _ctx ? _ctx.sanitizeHtml : unref(sanitizeHtml))(unref(blog).content) ?? ""}</div>`);
				if (unref(blog).tags?.length) {
					_push(`<div class="mt-8 flex flex-wrap items-center gap-2"><span class="text-xs font-semibold text-gray-500">Tags:</span><!--[-->`);
					ssrRenderList$2(unref(blog).tags, (tag) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: tag,
							to: {
								path: "/blog",
								query: { tag }
							},
							class: "badge bg-gray-50 text-gray-600 ring-gray-200 hover:bg-brand-light hover:text-oc-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(tag)}`);
								else return [createTextVNode(toDisplayString(tag), 1)];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5"><p class="text-sm font-semibold text-gray-800">Want to keep learning?</p><p class="mt-1 text-sm text-gray-600">Browse structured courses with quizzes and certificates.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "btn-primary mt-3"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Browse courses`);
						else return [createTextVNode("Browse courses")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if (unref(related).length) {
					_push(`<section class="mt-10"><h2 class="mb-4 text-lg font-bold text-gray-900">More articles</h2><div class="grid grid-cols-1 gap-5 sm:grid-cols-3"><!--[-->`);
					ssrRenderList$2(unref(related), (item) => {
						_push(ssrRenderComponent(_component_BlogCard, {
							key: item.id,
							blog: item
						}, null, _parent));
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				_push(`</article>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/blog/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-BpXAg9x2.mjs.map
