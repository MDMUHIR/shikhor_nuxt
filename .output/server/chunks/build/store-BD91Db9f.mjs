import { b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { P as ProductCard_default } from './ProductCard-DyIfuyt-.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { c as formatNumber } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
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
import './media-DoSlkVxW.mjs';

// app/pages/store/index.vue?vue&type=script&setup=true&lang.ts
var perPage = 12;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData } = useApi();
		const { data: products, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("store-products", () => apiData("/products"))), __temp = await __temp, __restore(), __temp);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("store-categories", () => apiData("/categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const search = ref("");
		const category = ref("");
		const sort = ref("newest");
		const inStockOnly = ref(false);
		const page = ref(1);
		const filtered = computed(() => {
			let list = products.value ?? [];
			const term = search.value.trim().toLowerCase();
			if (term) list = list.filter((product) => product.name.toLowerCase().includes(term) || (product.short_description || "").toLowerCase().includes(term) || (product.category?.name || "").toLowerCase().includes(term));
			if (category.value) list = list.filter((product) => String(product.category_id) === category.value);
			if (inStockOnly.value) list = list.filter((product) => product.variants?.length ? product.variants.some((variant) => Number(variant.stock) > 0) : Number(product.stock) > 0);
			const priceOf = (product) => product.variants?.length ? Math.min(...product.variants.map((variant) => Number(variant.offer_price ?? variant.price))) : Number(product.offer_price ?? product.price);
			if (sort.value === "price_asc") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
			else if (sort.value === "price_desc") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
			else if (sort.value === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
			return list;
		});
		const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
		const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage));
		watch([
			search,
			category,
			sort,
			inStockOnly
		], () => {
			page.value = 1;
		});
		function clearFilters() {
			search.value = "";
			category.value = "";
			sort.value = "newest";
			inStockOnly.value = false;
			page.value = 1;
		}
		useSeoMeta({
			title: "Store — Shikhor Academy",
			description: "Learning essentials, devices and study accessories from the Shikhor Academy store."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_ProductCard = ProductCard_default;
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Store</span></nav><div class="rounded-2xl bg-gradient-to-r from-slate-900 to-oc-primary p-6 text-white md:p-8"><h1 class="text-2xl font-extrabold md:text-3xl">Shikhor Store</h1><p class="mt-2 max-w-2xl text-sm text-white/85"> Hand-picked study tools and accessories. Pay cash on delivery, by bank transfer or manual bKash. </p></div><div class="card mt-5 grid gap-3 p-4 md:grid-cols-12"><div class="relative md:col-span-5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 17,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search products…" aria-label="Search products"></div><div class="md:col-span-3"><select class="field-input" aria-label="Category"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), "") : ssrLooseEqual(unref(category), "")) ? " selected" : ""}>All categories</option><!--[-->`);
			ssrRenderList$2(unref(categories), (item) => {
				_push(`<option${ssrRenderAttr("value", String(item.id))}${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), String(item.id)) : ssrLooseEqual(unref(category), String(item.id))) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-2"><select class="field-input" aria-label="Sort by"><option value="newest"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "newest") : ssrLooseEqual(unref(sort), "newest")) ? " selected" : ""}>Newest</option><option value="price_asc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price_asc") : ssrLooseEqual(unref(sort), "price_asc")) ? " selected" : ""}>Price: low to high</option><option value="price_desc"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "price_desc") : ssrLooseEqual(unref(sort), "price_desc")) ? " selected" : ""}>Price: high to low</option><option value="name"${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), "name") : ssrLooseEqual(unref(sort), "name")) ? " selected" : ""}>Name A–Z</option></select></div><label class="flex items-center gap-2 text-sm text-gray-600 md:col-span-2"><input${ssrIncludeBooleanAttr(Array.isArray(unref(inStockOnly)) ? ssrLooseContain(unref(inStockOnly), null) : unref(inStockOnly)) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"> In stock only </label></div><div class="mt-6 flex items-center justify-between gap-3"><p class="text-sm text-gray-600">`);
			if (!unref(pending)) _push(`<span>${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(filtered).length))} product${ssrInterpolate(unref(filtered).length === 1 ? "" : "s")}</span>`);
			else _push(`<span>Loading products…</span>`);
			_push(`</p>`);
			if (unref(search) || unref(category) || unref(inStockOnly) || unref(sort) !== "newest") _push(`<button type="button" class="text-xs font-semibold text-rose-600 hover:underline"> Clear filters </button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(pending)) {
				_push(`<div class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
				ssrRenderList$2(8, (i) => {
					_push(`<div class="card animate-pulse overflow-hidden"><div class="aspect-square bg-gray-200"></div><div class="space-y-2 p-4"><div class="h-3 w-1/3 rounded bg-gray-200"></div><div class="h-4 w-4/5 rounded bg-gray-200"></div><div class="h-5 w-24 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-4",
				title: "Could not load the store",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-4",
				icon: "store",
				title: "No products found",
				message: "Try a different search or clear the filters.",
				"action-label": "Clear filters",
				onAction: clearFilters
			}, null, _parent));
			else {
				_push(`<!--[--><div class="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
				ssrRenderList$2(unref(paged), (product) => {
					_push(ssrRenderComponent(_component_ProductCard, {
						key: product.id,
						product
					}, null, _parent));
				});
				_push(`<!--]--></div><div class="mt-8">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(page),
					"last-page": unref(lastPage),
					total: unref(filtered).length,
					onChange: ($event) => page.value = $event
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/store/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/store/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var store_default = index_vue_vue_type_script_setup_true_lang_default;

export { store_default as default };
//# sourceMappingURL=store-BD91Db9f.mjs.map
