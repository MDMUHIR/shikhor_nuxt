import { b as useApi, w as useWishlist, t as useCart, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2, o as productImage, i as imageFallback, B as BaseIcon_default } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/wishlist.vue?vue&type=script&setup=true&lang.ts
var wishlist_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "wishlist",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData} = useApi();
		useWishlist();
		useCart();
		useToast();
		const { data: items, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("wishlist-page", async () => {
			return await apiData("/wishlist") ?? [];
		})), __temp = await __temp, __restore(), __temp);
		const busy = ref(null);
		function attributes(item) {
			return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(" · ");
		}
		function price(item) {
			return Number(item.effective_price ?? item.variant?.offer_price ?? item.variant?.price ?? item.product?.offer_price ?? item.product?.price ?? 0);
		}
		function stock(item) {
			return Number(item.effective_stock ?? item.variant?.stock ?? item.product?.stock ?? 0);
		}
		useSeoMeta({
			title: "Wishlist — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_BaseIcon = BaseIcon_default;
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Wishlist</span></nav><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Your wishlist</h1><p class="mt-1 text-sm text-gray-500">Saved products you want to revisit later.</p></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/store",
				class: "btn-secondary hidden sm:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Visit store`);
					else return [createTextVNode("Visit store")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card animate-pulse overflow-hidden"><div class="aspect-[4/3] bg-gray-200"></div><div class="space-y-2 p-4"><div class="h-4 w-4/5 rounded bg-gray-200"></div><div class="h-5 w-24 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load your wishlist",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(items)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "heart",
				title: "Your wishlist is empty",
				message: "Tap the heart on any product to save it here for later.",
				"action-label": "Browse the store",
				"action-to": "/store"
			}, null, _parent));
			else {
				_push(`<div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(items), (item) => {
					_push(`<article class="${ssrRenderClass([{ "opacity-60": unref(busy) === item.id }, "card flex flex-col overflow-hidden"])}">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/store/${item.product?.slug}`,
						class: "block aspect-[4/3] bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<img${ssrRenderAttr("src", ("productImage" in _ctx ? _ctx.productImage : unref(productImage))(item.product, item.variant))}${ssrRenderAttr("alt", item.product?.name || "Product")} class="h-full w-full object-cover"${_scopeId}>`);
							else return [createVNode("img", {
								src: ("productImage" in _ctx ? _ctx.productImage : unref(productImage))(item.product, item.variant),
								alt: item.product?.name || "Product",
								class: "h-full w-full object-cover",
								onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
							}, null, 40, [
								"src",
								"alt",
								"onError"
							])];
						}),
						_: 2
					}, _parent));
					_push(`<div class="flex flex-1 flex-col p-4">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/store/${item.product?.slug}`,
						class: "line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(item.product?.name)}`);
							else return [createTextVNode(toDisplayString(item.product?.name), 1)];
						}),
						_: 2
					}, _parent));
					if (attributes(item)) _push(`<p class="mt-0.5 text-xs text-gray-500">${ssrInterpolate(attributes(item))}</p>`);
					else _push(`<!---->`);
					_push(`<div class="mt-1 flex items-baseline gap-2"><span class="text-lg font-extrabold text-oc-primary">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(price(item)))}</span>`);
					if (item.variant?.offer_price && item.variant.offer_price < item.variant.price) _push(`<span class="text-xs text-gray-400 line-through">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.variant.price))}</span>`);
					else _push(`<!---->`);
					_push(`</div><p class="${ssrRenderClass([stock(item) > 0 ? "text-emerald-600" : "text-rose-600", "mt-1 text-xs"])}">${ssrInterpolate(stock(item) > 0 ? `${stock(item)} in stock` : "Out of stock")}</p><div class="mt-auto flex gap-2 pt-4"><button type="button" class="btn-primary flex-1"${ssrIncludeBooleanAttr(unref(busy) === item.id || stock(item) <= 0) ? " disabled" : ""}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "cart",
						size: 15
					}, null, _parent));
					_push(` Add to cart </button><button type="button" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition hover:border-rose-300 hover:text-rose-500"${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""} aria-label="Remove from wishlist">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 16
					}, null, _parent));
					_push(`</button></div></div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/wishlist.vue
var _sfc_setup = wishlist_vue_vue_type_script_setup_true_lang_default.setup;
wishlist_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var wishlist_default = wishlist_vue_vue_type_script_setup_true_lang_default;

export { wishlist_default as default };
//# sourceMappingURL=wishlist-BwJ6QgVb.mjs.map
