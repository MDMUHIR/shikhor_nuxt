import { a as useRoute, m as useRouter, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { B as BlogCard_default } from './BlogCard-fPLIsBTg.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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
import './media-DoSlkVxW.mjs';
import './format-DP0uQCCC.mjs';

// app/pages/blog/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const router = useRouter();
		const { apiFetch, apiData } = useApi();
		const search = ref(String(route.query.search || ""));
		const tag = ref(String(route.query.tag || ""));
		const { data: tags } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("blog-tags", () => apiData("/blog-tags").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("blog-list", () => apiFetch("/blogs", { query: {
			per_page: 9,
			page: Number(route.query.page) || 1,
			search: search.value.trim() || void 0,
			tag: tag.value || void 0
		} }), { watch: [() => route.query] })), __temp = await __temp, __restore(), __temp);
		const blogs = computed(() => data.value?.blogs ?? []);
		const pagination = computed(() => data.value?.pagination);
		function apply(patch) {
			const query = {};
			for (const [key, value] of Object.entries({
				...route.query,
				...patch
			})) {
				if (value === void 0 || value === "" || value === null) continue;
				query[key] = String(value);
			}
			if (!("page" in patch)) delete query.page;
			router.push({
				path: "/blog",
				query
			});
		}
		function changePage(page) {
			apply({ page });
			(void 0).scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
		watch(() => route.query, () => {
			search.value = String(route.query.search || "");
			tag.value = String(route.query.tag || "");
		});
		useSeoMeta({
			title: "Blog — Shikhor Academy",
			description: "Study tips, course updates and learning guides from the Shikhor Academy team."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_BlogCard = BlogCard_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Blog</span></nav><div class="rounded-2xl bg-gradient-to-r from-indigo-700 to-oc-primary p-6 text-white md:p-8"><h1 class="text-2xl font-extrabold md:text-3xl">Learning notes</h1><p class="mt-2 max-w-2xl text-sm text-white/85">Study strategies, course announcements and practical guides.</p></div><div class="mt-5 grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]"><aside class="space-y-4"><div><label class="field-label" for="blog-search">Search articles</label><div class="relative">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input id="blog-search"${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search…"></div></div>`);
			if (unref(tags)?.length) {
				_push(`<div class="card p-4"><p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">Tags</p><div class="flex flex-wrap gap-1.5"><!--[-->`);
				ssrRenderList$2(unref(tags), (item) => {
					_push(`<button type="button" class="${ssrRenderClass([unref(tag) === item.slug ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-2.5 py-1 text-xs font-semibold transition"])}">${ssrInterpolate(item.name)}</button>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</aside><div>`);
			if (unref(pending)) {
				_push(`<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card animate-pulse overflow-hidden"><div class="aspect-[16/10] bg-gray-200"></div><div class="space-y-2 p-5"><div class="h-3 w-1/3 rounded bg-gray-200"></div><div class="h-4 w-4/5 rounded bg-gray-200"></div><div class="h-3 w-2/3 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load the blog",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(blogs).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "blog",
				title: "No articles found",
				message: unref(search) || unref(tag) ? "Try a different search or tag." : "Articles will appear here soon."
			}, null, _parent));
			else {
				_push(`<!--[--><div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(blogs), (blog) => {
					_push(ssrRenderComponent(_component_BlogCard, {
						key: blog.id,
						blog
					}, null, _parent));
				});
				_push(`<!--]--></div><div class="mt-8">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(pagination)?.current_page ?? 1,
					"last-page": unref(pagination)?.last_page ?? 1,
					total: unref(pagination)?.total,
					onChange: changePage
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div></div></div>`);
		};
	}
});
// app/pages/blog/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_default = index_vue_vue_type_script_setup_true_lang_default;

export { blog_default as default };
//# sourceMappingURL=blog-BoRzoBXK.mjs.map
