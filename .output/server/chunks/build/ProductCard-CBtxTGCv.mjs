import { o as productImage, N as NuxtLink, i as imageFallback } from '../virtual/entry.mjs';
import { h as discountPercent, b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

// app/components/ProductCard.vue?vue&type=script&setup=true&lang.ts
var ProductCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductCard",
	__ssrInlineRender: true,
	props: { product: {} },
	setup(__props) {
		const props = __props;
		const image = computed(() => productImage(props.product));
		const effective = computed(() => {
			if (props.product.variants?.length) {
				const prices = props.product.variants.map((variant) => Number(variant.offer_price ?? variant.price));
				return Math.min(...prices);
			}
			return Number(props.product.offer_price ?? props.product.price);
		});
		const original = computed(() => {
			if (props.product.variants?.length) return 0;
			return props.product.offer_price && props.product.offer_price < props.product.price ? props.product.price : 0;
		});
		const off = computed(() => original.value ? discountPercent(props.product.price, props.product.offer_price) : 0);
		const inStock = computed(() => {
			if (props.product.variants?.length) return props.product.variants.some((variant) => Number(variant.stock) > 0);
			return Number(props.product.stock) > 0;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(NuxtLink, mergeProps({
				to: `/store/${__props.product.slug}`,
				class: "card group flex h-full flex-col overflow-hidden"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative aspect-square overflow-hidden border-b-2 border-neo-ink bg-gray-50"${_scopeId}><img${ssrRenderAttr("src", unref(image))}${ssrRenderAttr("alt", __props.product.name)} loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"${_scopeId}>`);
						if (unref(off)) _push(`<span class="absolute left-3 top-3 rounded-full border-2 border-neo-ink bg-neo-pink px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink"${_scopeId}>-${ssrInterpolate(unref(off))}%</span>`);
						else _push(`<!---->`);
						if (!unref(inStock)) _push(`<span class="absolute right-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-semibold text-white"${_scopeId}>Out of stock</span>`);
						else if (__props.product.variants?.length) _push(`<span class="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700"${_scopeId}>${ssrInterpolate(__props.product.variants.length)} options</span>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex flex-1 flex-col p-4"${_scopeId}>`);
						if (__props.product.category) _push(`<p class="mb-1 text-[11px] font-semibold uppercase tracking-wide text-oc-primary"${_scopeId}>${ssrInterpolate(__props.product.category.name)}</p>`);
						else _push(`<!---->`);
						_push(`<h3 class="line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary"${_scopeId}>${ssrInterpolate(__props.product.name)}</h3>`);
						if (__props.product.short_description) _push(`<p class="mt-1.5 line-clamp-2 text-xs text-gray-500"${_scopeId}>${ssrInterpolate(__props.product.short_description)}</p>`);
						else _push(`<!---->`);
						_push(`<div class="mt-auto flex items-baseline gap-1.5 pt-3"${_scopeId}><span class="text-lg font-extrabold text-oc-primary"${_scopeId}>${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(effective)))}</span>`);
						if (unref(original)) _push(`<span class="text-xs text-gray-400 line-through"${_scopeId}>${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(original)))}</span>`);
						else _push(`<!---->`);
						_push(`</div></div>`);
					} else return [createVNode("div", { class: "relative aspect-square overflow-hidden border-b-2 border-neo-ink bg-gray-50" }, [
						createVNode("img", {
							src: unref(image),
							alt: __props.product.name,
							loading: "lazy",
							class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
							onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
						}, null, 40, [
							"src",
							"alt",
							"onError"
						]),
						unref(off) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "absolute left-3 top-3 rounded-full border-2 border-neo-ink bg-neo-pink px-2.5 py-0.5 text-[11px] font-extrabold text-neo-ink"
						}, "-" + toDisplayString(unref(off)) + "%", 1)) : createCommentVNode("", true),
						!unref(inStock) ? (openBlock(), createBlock("span", {
							key: 1,
							class: "absolute right-3 top-3 rounded-full bg-gray-900/80 px-2.5 py-1 text-[11px] font-semibold text-white"
						}, "Out of stock")) : __props.product.variants?.length ? (openBlock(), createBlock("span", {
							key: 2,
							class: "absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-gray-700"
						}, toDisplayString(__props.product.variants.length) + " options", 1)) : createCommentVNode("", true)
					]), createVNode("div", { class: "flex flex-1 flex-col p-4" }, [
						__props.product.category ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mb-1 text-[11px] font-semibold uppercase tracking-wide text-oc-primary"
						}, toDisplayString(__props.product.category.name), 1)) : createCommentVNode("", true),
						createVNode("h3", { class: "line-clamp-2 text-sm font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary" }, toDisplayString(__props.product.name), 1),
						__props.product.short_description ? (openBlock(), createBlock("p", {
							key: 1,
							class: "mt-1.5 line-clamp-2 text-xs text-gray-500"
						}, toDisplayString(__props.product.short_description), 1)) : createCommentVNode("", true),
						createVNode("div", { class: "mt-auto flex items-baseline gap-1.5 pt-3" }, [createVNode("span", { class: "text-lg font-extrabold text-oc-primary" }, toDisplayString(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(effective))), 1), unref(original) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "text-xs text-gray-400 line-through"
						}, toDisplayString(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(original))), 1)) : createCommentVNode("", true)])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/components/ProductCard.vue
var _sfc_setup = ProductCard_vue_vue_type_script_setup_true_lang_default.setup;
ProductCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductCard_default = Object.assign(ProductCard_vue_vue_type_script_setup_true_lang_default, { __name: "ProductCard" });

export { ProductCard_default as P };
//# sourceMappingURL=ProductCard-CBtxTGCv.mjs.map
