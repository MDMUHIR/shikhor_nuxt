import { b as useApi, o as useCart, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { i as imageFallback, m as mediaUrl, p as productImage } from './media-DFMfymxc.mjs';
import { b as formatMoney } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

// app/pages/cart.vue?vue&type=script&setup=true&lang.ts
var cart_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "cart",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData} = useApi();
		useCart();
		useToast();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("cart-page", async () => {
			const [items, courses] = await Promise.all([apiData("/cart"), apiData("/cart/courses")]);
			return {
				items: items ?? [],
				courses
			};
		})), __temp = await __temp, __restore(), __temp);
		const busy = ref(null);
		const togglingAll = ref(false);
		const couponCode = ref("");
		const coupon = ref(null);
		const couponError = ref("");
		const checkingCoupon = ref(false);
		const productItems = computed(() => data.value?.items ?? []);
		const courseItems = computed(() => data.value?.courses?.items ?? []);
		function unitPrice(item) {
			const variant = item.variant;
			const product = item.product;
			return Number(variant?.offer_price ?? variant?.price ?? product?.offer_price ?? product?.price ?? item.price ?? 0);
		}
		function itemImage(item) {
			return productImage(item.product, item.variant);
		}
		function attributes(item) {
			return (item.variant?.attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(" · ");
		}
		const selectedProducts = computed(() => productItems.value.filter((item) => item.is_selected));
		const selectedCourses = computed(() => courseItems.value.filter((item) => item.is_selected));
		const productsSubtotal = computed(() => selectedProducts.value.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0));
		const coursesSubtotal = computed(() => selectedCourses.value.reduce((sum, item) => sum + Number(item.price ?? item.course.effective_price ?? 0), 0));
		const subtotal = computed(() => productsSubtotal.value + coursesSubtotal.value);
		const selectedCount = computed(() => selectedProducts.value.length + selectedCourses.value.length);
		const totalCount = computed(() => productItems.value.length + courseItems.value.length);
		const allSelected = computed(() => totalCount.value > 0 && selectedCount.value === totalCount.value);
		const discount = computed(() => {
			if (!coupon.value) return 0;
			if (coupon.value.type === "percentage") return Math.round(subtotal.value * (Number(coupon.value.discount) / 100) * 100) / 100;
			return Math.min(subtotal.value, Number(coupon.value.discount));
		});
		const estimatedTotal = computed(() => Math.max(subtotal.value - discount.value, 0));
		watch(subtotal, () => {
			if (coupon.value) {
				coupon.value = null;
				couponCode.value = "";
			}
		});
		useSeoMeta({
			title: "Cart — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_RatingStars = RatingStars_default;
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Cart</span></nav><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Your cart</h1><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(totalCount))} item${ssrInterpolate(unref(totalCount) === 1 ? "" : "s")} · ${ssrInterpolate(unref(selectedCount))} selected for checkout</p></div>`);
			if (unref(totalCount)) {
				_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(togglingAll)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: unref(allSelected) ? "x" : "check",
					size: 15
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(allSelected) ? "Deselect all" : "Select all")}</button>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div class="space-y-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card flex animate-pulse gap-4 p-4"><div class="h-24 w-24 shrink-0 rounded-xl bg-gray-200"></div><div class="flex-1 space-y-2 py-1"><div class="h-3 w-1/3 rounded bg-gray-200"></div><div class="h-4 w-2/3 rounded bg-gray-200"></div><div class="h-6 w-24 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div><div class="card h-72 animate-pulse bg-gray-100"></div></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load your cart",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(totalCount)) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "cart",
				title: "Your cart is empty",
				message: "Add a course or a product from the store and it will show up here.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else {
				_push(`<div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div class="space-y-8">`);
				if (unref(productItems).length) {
					_push(`<section><h2 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "store",
						size: 16
					}, null, _parent));
					_push(` Products </h2><div class="space-y-3"><!--[-->`);
					ssrRenderList$2(unref(productItems), (item) => {
						_push(`<article class="${ssrRenderClass([{ "opacity-60": unref(busy) === item.id }, "card flex gap-4 p-4"])}"><label class="flex items-start pt-1"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${ssrIncludeBooleanAttr(item.is_selected) ? " checked" : ""}${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Select ${item.product?.name}`)}></label>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/store/${item.product?.slug}`,
							class: "h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<img${ssrRenderAttr("src", itemImage(item))}${ssrRenderAttr("alt", item.product?.name || "Product")} class="h-full w-full object-cover"${_scopeId}>`);
								else return [createVNode("img", {
									src: itemImage(item),
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
						_push(`<div class="flex min-w-0 flex-1 flex-col"><div class="flex items-start justify-between gap-3"><div class="min-w-0">`);
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
						_push(`<p class="mt-1 text-xs text-gray-400">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unitPrice(item)))} each</p></div><button type="button" class="btn-ghost shrink-0 text-rose-500 hover:bg-rose-50"${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""} aria-label="Remove item">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 16
						}, null, _parent));
						_push(`</button></div><div class="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3"><div class="flex items-center rounded-lg border border-gray-200"><button type="button" class="px-2.5 py-1.5 text-gray-500 hover:text-oc-primary disabled:opacity-40"${ssrIncludeBooleanAttr(unref(busy) === item.id || item.quantity <= 1) ? " disabled" : ""} aria-label="Decrease quantity">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "minus",
							size: 14
						}, null, _parent));
						_push(`</button><span class="w-9 text-center text-sm font-semibold text-gray-800">${ssrInterpolate(item.quantity)}</span><button type="button" class="px-2.5 py-1.5 text-gray-500 hover:text-oc-primary disabled:opacity-40"${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""} aria-label="Increase quantity">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 14
						}, null, _parent));
						_push(`</button></div><span class="text-base font-extrabold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unitPrice(item) * item.quantity))}</span></div></div></article>`);
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				if (unref(courseItems).length) {
					_push(`<section><h2 class="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-500">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "book-open",
						size: 16
					}, null, _parent));
					_push(` Courses </h2><div class="space-y-3"><!--[-->`);
					ssrRenderList$2(unref(courseItems), (item) => {
						_push(`<article class="${ssrRenderClass([{ "opacity-60": unref(busy) === item.id }, "card flex gap-4 p-4"])}"><label class="flex items-start pt-1"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${ssrIncludeBooleanAttr(item.is_selected) ? " checked" : ""}${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""}${ssrRenderAttr("aria-label", `Select ${item.course.title}`)}></label>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/courses/${item.course.slug}`,
							class: "h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.course.thumbnail))}${ssrRenderAttr("alt", item.course.title)} class="h-full w-full object-cover"${_scopeId}>`);
								else return [createVNode("img", {
									src: ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.course.thumbnail),
									alt: item.course.title,
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
						_push(`<div class="flex min-w-0 flex-1 flex-col"><div class="flex items-start justify-between gap-3"><div class="min-w-0">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/courses/${item.course.slug}`,
							class: "line-clamp-2 text-sm font-bold text-gray-900 hover:text-oc-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(item.course.title)}`);
								else return [createTextVNode(toDisplayString(item.course.title), 1)];
							}),
							_: 2
						}, _parent));
						_push(`<p class="mt-0.5 text-xs text-gray-500">${ssrInterpolate(item.course.total_lessons)} lessons · ${ssrInterpolate(item.course.access_days === 0 ? "Lifetime access" : `${item.course.access_days ?? 365} days access`)}</p>`);
						_push(ssrRenderComponent(_component_RatingStars, {
							class: "mt-1",
							rating: item.course.rating?.average,
							"show-value": false,
							size: 12
						}, null, _parent));
						_push(`</div><button type="button" class="btn-ghost shrink-0 text-rose-500 hover:bg-rose-50"${ssrIncludeBooleanAttr(unref(busy) === item.id) ? " disabled" : ""} aria-label="Remove course">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 16
						}, null, _parent));
						_push(`</button></div><div class="mt-auto flex items-center justify-end pt-3"><span class="text-base font-extrabold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.price ?? item.course.effective_price))}</span></div></div></article>`);
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				_push(`<p class="rounded-xl bg-brand-light/60 px-4 py-3 text-xs text-oc-primary">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "info",
					size: 14,
					class: "mr-1 inline align-[-2px]"
				}, null, _parent));
				_push(` Only selected items are included in checkout. Products are reserved when the order is placed. </p></div><aside class="lg:sticky lg:top-24 lg:self-start"><div class="card p-5"><h2 class="text-base font-bold text-gray-900">Order summary</h2><dl class="mt-4 space-y-2 text-sm text-gray-600"><div class="flex justify-between gap-3"><dt>Products</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(productsSubtotal)))}</dd></div><div class="flex justify-between gap-3"><dt>Courses</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(coursesSubtotal)))}</dd></div><div class="flex justify-between gap-3 border-t border-gray-100 pt-2"><dt>Subtotal</dt><dd class="font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(subtotal)))}</dd></div>`);
				if (unref(discount)) _push(`<div class="flex justify-between gap-3 text-emerald-600"><dt>Coupon ${ssrInterpolate(unref(coupon)?.code)}</dt><dd class="font-semibold">−${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(discount)))}</dd></div>`);
				else _push(`<!---->`);
				_push(`</dl><div class="mt-4 border-t border-gray-100 pt-4"><label class="field-label" for="coupon">Coupon code</label>`);
				if (unref(coupon)) _push(`<div class="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm"><span class="font-semibold text-emerald-700">${ssrInterpolate(unref(coupon).code)}</span><button type="button" class="text-xs font-semibold text-emerald-700 hover:underline">Remove</button></div>`);
				else _push(`<div class="flex gap-2"><input id="coupon"${ssrRenderAttr("value", unref(couponCode))} class="field-input" placeholder="e.g. SAVE10" autocomplete="off"><button type="button" class="btn-secondary shrink-0"${ssrIncludeBooleanAttr(unref(checkingCoupon)) ? " disabled" : ""}>${ssrInterpolate(unref(checkingCoupon) ? "Checking…" : "Apply")}</button></div>`);
				if (unref(couponError)) _push(`<p class="field-error">${ssrInterpolate(unref(couponError))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-4"><span class="text-sm font-semibold text-gray-600">Estimated total</span><span class="text-2xl font-extrabold text-oc-primary">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(estimatedTotal)))}</span></div><p class="mt-1 text-[11px] text-gray-400">Delivery is added at checkout for physical products.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(selectedCount) ? "/checkout" : "/courses",
					class: ["btn-primary mt-4 w-full", { "pointer-events-none opacity-60": !unref(selectedCount) }],
					"aria-disabled": !unref(selectedCount)
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "credit-card",
								size: 16
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(unref(selectedCount) ? "Proceed to checkout" : "Select items first")}`);
						} else return [createVNode(_component_BaseIcon, {
							name: "credit-card",
							size: 16
						}), createTextVNode(" " + toDisplayString(unref(selectedCount) ? "Proceed to checkout" : "Select items first"), 1)];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "btn-secondary mt-2 w-full"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Continue shopping`);
						else return [createTextVNode("Continue shopping")];
					}),
					_: 1
				}, _parent));
				_push(`</div></aside></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/cart.vue
var _sfc_setup = cart_vue_vue_type_script_setup_true_lang_default.setup;
cart_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var cart_default = cart_vue_vue_type_script_setup_true_lang_default;

export { cart_default as default };
//# sourceMappingURL=cart-EH9Mele6.mjs.map
