import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-C75kbax7.mjs';
import { a as formatDate, s as statusLabel, b as formatMoney } from './format-eJzdzGa2.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createTextVNode, unref, toDisplayString, createVNode, useSSRContext } from 'vue';
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

// app/pages/orders/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const id = Number(route.params.id);
		const { apiData } = useApi();
		const { data: order, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`order-${id}`, async () => {
			return (await apiData("/orders") ?? []).find((item) => Number(item.id) === id) ?? null;
		})), __temp = await __temp, __restore(), __temp);
		const justPlaced = computed(() => route.query.success === "1");
		const pipeline = [
			"pending",
			"confirmed",
			"processing",
			"shipped",
			"delivered"
		];
		const currentStep = computed(() => {
			if (!order.value) return -1;
			if ([
				"cancelled",
				"returned",
				"refunded"
			].includes(order.value.status)) return -1;
			return pipeline.indexOf(order.value.status);
		});
		const isStopped = computed(() => !!order.value && [
			"cancelled",
			"returned",
			"refunded"
		].includes(order.value.status));
		function itemAttributes(attributes) {
			return (attributes || []).map((attribute) => `${attribute.attribute}: ${attribute.value}`).join(" · ");
		}
		useSeoMeta({
			title: () => order.value ? `${order.value.order_number} — Shikhor Academy` : "Order — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_StatusBadge = StatusBadge_default;
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
			_push(`<span class="mx-1.5">/</span>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/orders",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`My orders`);
					else return [createTextVNode("My orders")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(order)?.order_number || "Order")}</span></nav>`);
			if (unref(pending)) _push(`<div class="space-y-4"><div class="card h-32 animate-pulse bg-gray-100"></div><div class="card h-64 animate-pulse bg-gray-100"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this order",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(order)) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "shopping-bag",
				title: "Order not found",
				message: "This order does not exist or does not belong to your account.",
				"action-label": "Back to my orders",
				"action-to": "/orders"
			}, null, _parent));
			else {
				_push(`<!--[-->`);
				if (unref(justPlaced)) {
					_push(`<div class="mb-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "check-circle",
						size: 18,
						class: "mt-0.5 shrink-0"
					}, null, _parent));
					_push(`<span>Thank you! Your order has been placed. Payment is confirmed manually by an administrator.</span></div>`);
				} else _push(`<!---->`);
				_push(`<div class="flex flex-wrap items-start justify-between gap-4"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Order</p><h1 class="mt-1 text-2xl font-extrabold text-gray-900 md:text-3xl">${ssrInterpolate(unref(order).order_number)}</h1><p class="mt-1 text-sm text-gray-500">Placed ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(order).created_at, true))}</p></div><div class="flex flex-wrap items-center gap-2">`);
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(order).payment_status }, null, _parent));
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(order).status }, null, _parent));
				_push(`<button type="button" class="btn-ghost"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""} aria-label="Refresh order">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "refresh",
					size: 16
				}, null, _parent));
				_push(` Refresh </button></div></div><section class="card mt-6 p-5"><h2 class="text-sm font-bold text-gray-900">Progress</h2>`);
				if (!unref(isStopped)) {
					_push(`<ol class="mt-4 grid grid-cols-5 gap-1"><!--[-->`);
					ssrRenderList$2(pipeline, (step, index) => {
						_push(`<li class="flex flex-col items-center text-center"><span class="${ssrRenderClass([index <= unref(currentStep) ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-400", "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"])}">`);
						if (index < unref(currentStep)) _push(ssrRenderComponent(_component_BaseIcon, {
							name: "check",
							size: 15
						}, null, _parent));
						else _push(`<!--[-->${ssrInterpolate(index + 1)}<!--]-->`);
						_push(`</span><span class="${ssrRenderClass([index <= unref(currentStep) ? "text-gray-800" : "text-gray-400", "mt-1.5 text-[11px] font-medium"])}">${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(step))}</span></li>`);
					});
					_push(`<!--]--></ol>`);
				} else _push(`<p class="mt-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600"> This order is ${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(unref(order).status).toLowerCase())}. Contact support if you need help. </p>`);
				if (unref(order).status_history?.length) {
					_push(`<div class="mt-5 space-y-3 border-t border-gray-100 pt-4"><!--[-->`);
					ssrRenderList$2(unref(order).status_history, (entry, index) => {
						_push(`<div class="flex gap-3"><span class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-oc-primary"></span><div><p class="text-sm font-semibold text-gray-800">${ssrInterpolate(entry.label || ("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(entry.status))}</p>`);
						if (entry.note) _push(`<p class="text-xs text-gray-500">${ssrInterpolate(entry.note)}</p>`);
						else _push(`<!---->`);
						_push(`<p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(entry.created_at, true))}</p></div></div>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</section><div class="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"><div class="space-y-6">`);
				if (unref(order).items?.length) {
					_push(`<section class="card overflow-hidden"><h2 class="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">Products</h2><ul class="divide-y divide-gray-100"><!--[-->`);
					ssrRenderList$2(unref(order).items, (item) => {
						_push(`<li class="flex gap-4 p-4"><div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.image))}${ssrRenderAttr("alt", item.name)} class="h-full w-full object-cover"></div><div class="min-w-0 flex-1">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/store/${item.slug}`,
							class: "line-clamp-2 text-sm font-semibold text-gray-800 hover:text-oc-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(item.name)}`);
								else return [createTextVNode(toDisplayString(item.name), 1)];
							}),
							_: 2
						}, _parent));
						if (itemAttributes(item.attributes)) _push(`<p class="mt-0.5 text-xs text-gray-500">${ssrInterpolate(itemAttributes(item.attributes))}</p>`);
						else _push(`<!---->`);
						_push(`<p class="mt-1 text-xs text-gray-500">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.unit_price))} × ${ssrInterpolate(item.quantity)}</p></div><span class="text-sm font-bold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.line_total))}</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				if (unref(order).course_items?.length) {
					_push(`<section class="card overflow-hidden"><h2 class="border-b border-gray-100 px-5 py-4 text-sm font-bold text-gray-900">Courses</h2><ul class="divide-y divide-gray-100"><!--[-->`);
					ssrRenderList$2(unref(order).course_items, (item) => {
						_push(`<li class="flex gap-4 p-4"><div class="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.image))}${ssrRenderAttr("alt", item.name)} class="h-full w-full object-cover"></div><div class="min-w-0 flex-1">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/courses/${item.slug}`,
							class: "line-clamp-2 text-sm font-semibold text-gray-800 hover:text-oc-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(item.name)}`);
								else return [createTextVNode(toDisplayString(item.name), 1)];
							}),
							_: 2
						}, _parent));
						_push(`<p class="mt-0.5 text-xs text-gray-500">${ssrInterpolate(item.access_days === 0 ? "Lifetime access" : `${item.access_days ?? 365} days access`)}</p>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/my-courses",
							class: "mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-oc-primary hover:underline"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(` Go to my courses `);
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-right",
										size: 12
									}, null, _parent, _scopeId));
								} else return [createTextVNode(" Go to my courses "), createVNode(_component_BaseIcon, {
									name: "arrow-right",
									size: 12
								})];
							}),
							_: 2
						}, _parent));
						_push(`</div><span class="text-sm font-bold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.line_total))}</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				if (unref(order).notes) _push(`<section class="card p-5"><h2 class="text-sm font-bold text-gray-900">Order notes</h2><p class="mt-2 text-sm text-gray-600">${ssrInterpolate(unref(order).notes)}</p></section>`);
				else _push(`<!---->`);
				_push(`</div><aside class="space-y-4"><section class="card p-5"><h2 class="text-sm font-bold text-gray-900">Payment summary</h2><dl class="mt-3 space-y-2 text-sm text-gray-600"><div class="flex justify-between gap-3"><dt>Products</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.products_subtotal))}</dd></div><div class="flex justify-between gap-3"><dt>Courses</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.courses_subtotal))}</dd></div><div class="flex justify-between gap-3"><dt>Subtotal</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.subtotal))}</dd></div>`);
				if (unref(order).pricing?.discount) _push(`<div class="flex justify-between gap-3 text-emerald-600"><dt>Discount${ssrInterpolate(unref(order).pricing.coupon_code ? ` (${unref(order).pricing.coupon_code})` : "")}</dt><dd class="font-semibold">−${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing.discount))}</dd></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-between gap-3"><dt>Delivery</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(unref(order).pricing?.delivery_charge ? ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing.delivery_charge) : "Free")}</dd></div><div class="flex items-baseline justify-between gap-3 border-t border-gray-100 pt-3"><dt class="font-semibold text-gray-700">Total</dt><dd class="text-xl font-extrabold text-oc-primary">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.total))}</dd></div></dl><p class="mt-3 text-xs text-gray-500"> Method: <span class="font-semibold text-gray-700">${ssrInterpolate(unref(order).payment_method || "Not set")}</span></p></section><section class="card p-5"><h2 class="text-sm font-bold text-gray-900">Customer</h2><div class="mt-3 space-y-1.5 text-sm text-gray-600"><p class="font-semibold text-gray-800">${ssrInterpolate(unref(order).customer?.name)}</p><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "mail",
					size: 14,
					class: "text-gray-400"
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(order).customer?.email)}</p><p class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "phone",
					size: 14,
					class: "text-gray-400"
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(order).customer?.phone)}</p>`);
				if (unref(order).customer?.phone_alt) {
					_push(`<p class="flex items-center gap-2">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "phone",
						size: 14,
						class: "text-gray-400"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(order).customer.phone_alt)}</p>`);
				} else _push(`<!---->`);
				_push(`</div></section>`);
				if (unref(order).shipping_address?.line1) {
					_push(`<section class="card p-5"><h2 class="text-sm font-bold text-gray-900">Shipping address</h2><p class="mt-2 text-sm leading-6 text-gray-600">${ssrInterpolate(unref(order).shipping_address.line1)}<br>`);
					if (unref(order).shipping_address.line2) _push(`<!--[-->${ssrInterpolate(unref(order).shipping_address.line2)}<br><!--]-->`);
					else _push(`<!---->`);
					_push(` ${ssrInterpolate(unref(order).shipping_address.city)}, ${ssrInterpolate(unref(order).shipping_address.district)}<br> ${ssrInterpolate(unref(order).shipping_address.country)}</p>`);
					if (unref(order).shipping?.method) _push(`<p class="mt-2 text-xs text-gray-500">Delivery: ${ssrInterpolate(unref(order).shipping.method)}</p>`);
					else _push(`<!---->`);
					_push(`</section>`);
				} else _push(`<!---->`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/orders",
					class: "btn-secondary w-full"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Back to my orders`);
						else return [createTextVNode("Back to my orders")];
					}),
					_: 1
				}, _parent));
				_push(`</aside></div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/orders/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-JlX8H2na.mjs.map
