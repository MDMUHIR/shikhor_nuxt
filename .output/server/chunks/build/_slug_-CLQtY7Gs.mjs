import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { a as useRoute, b as useApi, u as useAuth, o as useCart, q as useWishlist, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { b as formatMoney, e as excerpt, g as sanitizeHtml } from './format-eJzdzGa2.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/store/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const slug = String(route.params.slug);
		const { apiData} = useApi();
		useAuth();
		useCart();
		const wishlist = useWishlist();
		useToast();
		const { data: product, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`product-${slug}`, () => apiData(`/products/${slug}`))), __temp = await __temp, __restore(), __temp);
		const selectedVariantId = ref(null);
		const quantity = ref(1);
		const activeImage = ref("");
		const adding = ref(false);
		const wishlisting = ref(false);
		const selectedVariant = computed(() => product.value?.variants.find((variant) => variant.id === selectedVariantId.value) ?? null);
		const gallery = computed(() => {
			const variantImages = selectedVariant.value?.images ?? [];
			if (variantImages.length) return variantImages;
			return product.value?.images ?? [];
		});
		const images = computed(() => {
			const list = gallery.value.map((image) => mediaUrl(image.url));
			return list.length ? list : [mediaUrl(null)];
		});
		const effectivePrice = computed(() => {
			if (selectedVariant.value) return Number(selectedVariant.value.offer_price ?? selectedVariant.value.price);
			if (product.value?.variants.length) return null;
			return Number(product.value?.offer_price ?? product.value?.price ?? 0);
		});
		const displayPrice = computed(() => {
			if (effectivePrice.value !== null) return formatMoney(effectivePrice.value);
			if (product.value?.variants.length) {
				const min = Math.min(...product.value.variants.map((variant) => Number(variant.offer_price ?? variant.price)));
				return `From ${formatMoney(min)}`;
			}
			return formatMoney(0);
		});
		const stock = computed(() => {
			if (selectedVariant.value) return Number(selectedVariant.value.stock);
			if (product.value?.variants.length) return null;
			return Number(product.value?.stock ?? 0);
		});
		const inStock = computed(() => stock.value === null ? product.value?.variants.some((variant) => Number(variant.stock) > 0) ?? false : stock.value > 0);
		const needsVariant = computed(() => !!product.value?.variants.length && !selectedVariant.value);
		const inWishlist = computed(() => product.value ? wishlist.has(product.value.id, selectedVariantId.value) : false);
		const image = computed(() => activeImage.value || images.value[0] || mediaUrl(null));
		function attrs(variant) {
			return (variant.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(" · ");
		}
		watch(() => product.value, (value) => {
			if (!value) return;
			activeImage.value = images.value[0] || "";
			if (value.variants.length) {
				const preferred = value.variants.find((variant) => Number(variant.stock) > 0) ?? value.variants[0];
				selectedVariantId.value = preferred?.id ?? null;
			}
		}, { immediate: true });
		watch(selectedVariantId, () => {
			quantity.value = 1;
			activeImage.value = images.value[0] || "";
		});
		watch(images, (list) => {
			if (!list.includes(activeImage.value)) activeImage.value = list[0] || "";
		});
		useSeoMeta({
			title: () => product.value ? `${product.value.name} — Shikhor Store` : "Product — Shikhor Store",
			description: () => product.value?.short_description || excerpt(product.value?.description, 160) || "Product details",
			ogImage: () => mediaUrl(product.value?.images?.find((item) => item.is_featured)?.url ?? product.value?.images?.[0]?.url)
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}>`);
			if (unref(pending)) _push(`<div class="grid gap-8 lg:grid-cols-2"><div class="aspect-square animate-pulse rounded-2xl bg-gray-200"></div><div class="space-y-4"><div class="h-4 w-24 animate-pulse rounded bg-gray-200"></div><div class="h-9 w-3/4 animate-pulse rounded bg-gray-200"></div><div class="h-5 w-32 animate-pulse rounded bg-gray-200"></div><div class="h-24 w-full animate-pulse rounded bg-gray-200"></div></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Product not found",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(product)) {
				_push(`<!--[--><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
					to: "/store",
					class: "hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Store`);
						else return [createTextVNode("Store")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(product).name)}</span></nav><div class="grid gap-8 lg:grid-cols-2"><div><div class="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50"><img${ssrRenderAttr("src", unref(image))}${ssrRenderAttr("alt", unref(product).name)} class="aspect-square w-full object-cover"></div>`);
				if (unref(images).length > 1) {
					_push(`<div class="mt-3 flex gap-2 overflow-x-auto pb-1"><!--[-->`);
					ssrRenderList$2(unref(images), (item, index) => {
						_push(`<button type="button" class="${ssrRenderClass([unref(activeImage) === item ? "border-oc-primary" : "border-transparent hover:border-gray-300", "h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition"])}"><img${ssrRenderAttr("src", item)} alt="" class="h-full w-full object-cover"></button>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</div><div>`);
				if (unref(product).category) _push(`<p class="text-xs font-bold uppercase tracking-widest text-oc-primary">${ssrInterpolate(unref(product).category.name)}</p>`);
				else _push(`<!---->`);
				_push(`<h1 class="mt-1 text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">${ssrInterpolate(unref(product).name)}</h1>`);
				if (unref(product).short_description) _push(`<p class="mt-2 text-sm text-gray-600">${ssrInterpolate(unref(product).short_description)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="mt-4 flex items-baseline gap-2"><span class="text-3xl font-extrabold text-oc-primary">${ssrInterpolate(unref(displayPrice))}</span>`);
				if (unref(selectedVariant)?.offer_price && unref(selectedVariant).offer_price < unref(selectedVariant).price) _push(`<span class="text-sm text-gray-400 line-through">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(selectedVariant).price))}</span>`);
				else _push(`<!---->`);
				_push(`</div><p class="${ssrRenderClass([unref(inStock) ? "text-emerald-600" : "text-rose-600", "mt-1 text-xs"])}">${ssrInterpolate(unref(inStock) ? unref(stock) === null ? "Options available" : `${unref(stock)} in stock` : "Out of stock")}</p>`);
				if (unref(product).variants.length) {
					_push(`<div class="mt-5"><p class="field-label">Choose an option <span class="text-rose-500">*</span></p><div class="grid gap-2 sm:grid-cols-2"><!--[-->`);
					ssrRenderList$2(unref(product).variants, (variant) => {
						_push(`<button type="button" class="${ssrRenderClass([unref(selectedVariantId) === variant.id ? "border-oc-primary bg-brand-light ring-1 ring-oc-primary/30" : "border-gray-200 bg-white hover:border-gray-300", "rounded-xl border p-3 text-left transition"])}"${ssrIncludeBooleanAttr(Number(variant.stock) <= 0) ? " disabled" : ""}><span class="block text-sm font-semibold text-gray-800">${ssrInterpolate(attrs(variant) || variant.sku)}</span><span class="mt-0.5 flex items-center justify-between text-xs text-gray-500"><span>${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(variant.offer_price ?? variant.price))}</span><span class="${ssrRenderClass(Number(variant.stock) > 0 ? "text-emerald-600" : "text-rose-500")}">${ssrInterpolate(Number(variant.stock) > 0 ? `${variant.stock} left` : "Sold out")}</span></span></button>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`<div class="mt-5 flex flex-wrap items-center gap-3"><div class="flex items-center rounded-xl border border-gray-200"><button type="button" class="px-3 py-2.5 text-gray-500 transition hover:text-oc-primary" aria-label="Decrease quantity">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "minus",
					size: 16
				}, null, _parent));
				_push(`</button><input${ssrRenderAttr("value", unref(quantity))} type="number" min="1"${ssrRenderAttr("max", unref(stock) ?? 99)} class="w-14 border-0 bg-transparent text-center text-sm font-semibold focus:outline-none" aria-label="Quantity"><button type="button" class="px-3 py-2.5 text-gray-500 transition hover:text-oc-primary" aria-label="Increase quantity">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "plus",
					size: 16
				}, null, _parent));
				_push(`</button></div><button type="button" class="btn-primary flex-1 sm:flex-none"${ssrIncludeBooleanAttr(unref(adding) || !unref(inStock)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "cart",
					size: 16
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(adding) ? "Adding…" : "Add to cart")}</button><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(adding) || !unref(inStock)) ? " disabled" : ""}>Buy now</button><button type="button" class="${ssrRenderClass([unref(inWishlist) ? "text-rose-500" : "text-gray-400", "flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition hover:border-rose-300"])}"${ssrRenderAttr("aria-label", unref(inWishlist) ? "Remove from wishlist" : "Add to wishlist")}${ssrIncludeBooleanAttr(unref(wishlisting)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "heart",
					size: 18,
					filled: unref(inWishlist)
				}, null, _parent));
				_push(`</button></div>`);
				if (unref(needsVariant)) _push(`<p class="mt-2 text-xs text-amber-600">Select an option to continue.</p>`);
				else _push(`<!---->`);
				_push(`<div class="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4 text-xs text-gray-600"><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "truck",
					size: 15,
					class: "text-oc-primary"
				}, null, _parent));
				_push(` Delivery charge by district</p><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "shield",
					size: 15,
					class: "text-oc-primary"
				}, null, _parent));
				_push(` Manual payment confirmation</p><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "refresh",
					size: 15,
					class: "text-oc-primary"
				}, null, _parent));
				_push(` Stock checked at checkout</p><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "phone",
					size: 15,
					class: "text-oc-primary"
				}, null, _parent));
				_push(` Support 7 days a week</p></div>`);
				if (unref(product).description) _push(`<div class="mt-6"><h2 class="text-base font-bold text-gray-900">Product details</h2><div class="prose-content mt-2">${("sanitizeHtml" in _ctx ? _ctx.sanitizeHtml : unref(sanitizeHtml))(unref(product).description) ?? ""}</div></div>`);
				else _push(`<!---->`);
				_push(`</div></div><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/store/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/store/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CLQtY7Gs.mjs.map
