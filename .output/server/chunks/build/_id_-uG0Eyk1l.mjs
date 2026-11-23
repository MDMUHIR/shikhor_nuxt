import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, m as mediaUrl } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { a as formatDate, b as formatMoney, s as statusLabel } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, reactive, watch, computed, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './useToast-8ge3kL-h.mjs';

// app/pages/admin/orders/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { apiData } = useApi();
		const { busy, fieldError, run } = useFormHandler();
		const { data: order, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => `admin-order-${route.params.id}`, () => apiData(`/admin/orders/${route.params.id}`), "$rcMAEvQkyh")), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: () => order.value ? `Order ${order.value.order_number} — Admin` : "Order — Admin",
			robots: "noindex"
		});
		const form = reactive({
			status: "",
			payment_status: "",
			delivery_charge: 0,
			shipping_method: "",
			notes: "",
			status_note: ""
		});
		watch(order, (value) => {
			if (!value) return;
			Object.assign(form, {
				status: value.status || "pending",
				payment_status: value.payment_status || "pending",
				delivery_charge: value.pricing?.delivery_charge ?? 0,
				shipping_method: value.shipping?.method || "",
				notes: value.notes || "",
				status_note: ""
			});
		}, { immediate: true });
		const needsEnrollment = computed(() => !!order.value?.course_items?.some((item) => !item.enrolled) && ![
			"cancelled",
			"refunded",
			"returned"
		].includes(order.value?.status ?? ""));
		async function enrollStudent() {
			if (!order.value) return;
			const unpaid = order.value.payment_status !== "paid" && Number(order.value.pricing?.total ?? 0) > 0;
			if (unpaid && !(void 0).confirm("This order is not marked as paid. Enroll the student anyway?")) return;
			if (await run(() => apiData(`/admin/orders/${order.value.id}/enroll`, {
				method: "POST",
				body: { allow_unpaid: unpaid }
			}), "Student enrolled — they can now open the course.") !== void 0) await refresh();
		}
		const hasProducts = computed(() => (order.value?.items?.length ?? 0) > 0);
		const courseOnly = computed(() => !hasProducts.value && (order.value?.course_items?.length ?? 0) > 0);
		const statuses = computed(() => {
			const base = courseOnly.value ? [
				"pending",
				"confirmed",
				"enrolled",
				"cancelled"
			] : [
				"pending",
				"confirmed",
				"processing",
				"shipped",
				"delivered",
				"cancelled",
				"returned"
			];
			const current = order.value?.status;
			return current && !base.includes(current) ? [current, ...base] : base;
		});
		const paymentStatuses = computed(() => [
			"pending",
			"paid",
			"failed",
			"cancelled"
		].includes(order.value?.payment_status ?? "") ? [
			"pending",
			"paid",
			"failed",
			"cancelled"
		] : [
			order.value?.payment_status ?? "pending",
			"pending",
			"paid",
			"failed",
			"cancelled"
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: unref(order) ? `Order ${unref(order).order_number}` : "Order",
				subtitle: unref(order) ? `Placed ${("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(order).created_at, true)} · ${unref(order).customer?.name}` : "Order details and fulfilment.",
				icon: "shopping-bag"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/orders",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-left",
										size: 16
									}, null, _parent, _scopeId));
									_push(` All orders `);
								} else return [createVNode(_component_BaseIcon, {
									name: "arrow-left",
									size: 16
								}), createTextVNode(" All orders ")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(order)) {
							_push(`<!--[-->`);
							if (unref(needsEnrollment)) {
								_push(`<button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "check-circle",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Approve &amp; enroll student </button>`);
							} else _push(`<!---->`);
							_push(ssrRenderComponent(_component_StatusBadge, { status: unref(order).payment_status }, null, _parent, _scopeId));
							_push(ssrRenderComponent(_component_StatusBadge, { status: unref(order).status }, null, _parent, _scopeId));
							_push(`<!--]-->`);
						} else _push(`<!---->`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/admin/orders",
						class: "btn-secondary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "arrow-left",
							size: 16
						}), createTextVNode(" All orders ")]),
						_: 1
					}), unref(order) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
						unref(needsEnrollment) ? (openBlock(), createBlock("button", {
							key: 0,
							type: "button",
							class: "btn-primary",
							disabled: unref(busy),
							onClick: enrollStudent
						}, [createVNode(_component_BaseIcon, {
							name: "check-circle",
							size: 16
						}), createTextVNode(" Approve & enroll student ")], 8, ["disabled"])) : createCommentVNode("", true),
						createVNode(_component_StatusBadge, { status: unref(order).payment_status }, null, 8, ["status"]),
						createVNode(_component_StatusBadge, { status: unref(order).status }, null, 8, ["status"])
					], 64)) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) _push(`<div class="space-y-3"><div class="card h-32 animate-pulse bg-gray-50"></div><div class="card h-64 animate-pulse bg-gray-50"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this order",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(order)) {
				_push(`<div class="grid gap-4 xl:grid-cols-3"><div class="space-y-4 xl:col-span-2"><section class="card"><div class="border-b border-gray-100 px-5 py-3.5"><h2 class="text-sm font-bold text-gray-900">Items</h2><p class="text-xs text-gray-500">${ssrInterpolate(unref(order).summary?.total_items ?? 0)} line${ssrInterpolate((unref(order).summary?.total_items ?? 0) === 1 ? "" : "s")} · ${ssrInterpolate(unref(order).summary?.total_quantity ?? 0)} unit${ssrInterpolate((unref(order).summary?.total_quantity ?? 0) === 1 ? "" : "s")}</p></div><div class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(order).items, (item) => {
					_push(`<div class="flex flex-wrap items-center gap-3 px-5 py-3"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.image))}${ssrRenderAttr("alt", item.name)} class="h-14 w-14 rounded-xl object-cover"><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-gray-800">${ssrInterpolate(item.name)}</p><p class="text-[11px] text-gray-400">`);
					if (item.sku) _push(`<span>SKU ${ssrInterpolate(item.sku)}</span>`);
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(item.attributes, (attribute) => {
						_push(`<span class="ml-1"> · ${ssrInterpolate(attribute.attribute)}: ${ssrInterpolate(attribute.value)}</span>`);
					});
					_push(`<!--]--></p></div><div class="text-right"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.line_total))}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.unit_price))} × ${ssrInterpolate(item.quantity)}</p></div></div>`);
				});
				_push(`<!--]--><!--[-->`);
				ssrRenderList$2(unref(order).course_items, (item) => {
					_push(`<div class="flex flex-wrap items-center gap-3 px-5 py-3"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(item.image))}${ssrRenderAttr("alt", item.name)} class="h-14 w-14 rounded-xl object-cover"><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-gray-800">${ssrInterpolate(item.name)}</p><p class="text-[11px] text-gray-400"> Course <span class="${ssrRenderClass(item.enrolled ? "font-semibold text-emerald-600" : "font-semibold text-amber-600")}"> · ${ssrInterpolate(item.enrolled ? "Enrolled" : "Not enrolled yet")}</span>`);
					if (item.access_days !== null) _push(`<span> · ${ssrInterpolate(item.access_days === 0 ? "Lifetime access" : `${item.access_days} days access`)}</span>`);
					else _push(`<!---->`);
					_push(`</p></div><div class="text-right"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.line_total))}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(item.unit_price))}</p></div></div>`);
				});
				_push(`<!--]-->`);
				if (!unref(order).items?.length && !unref(order).course_items?.length) _push(`<p class="px-5 py-6 text-center text-xs text-gray-400"> This order has no line items. </p>`);
				else _push(`<!---->`);
				_push(`</div><div class="border-t border-gray-100 bg-gray-50/60 px-5 py-3"><dl class="ml-auto max-w-xs space-y-1 text-sm"><div class="flex items-center justify-between gap-4"><dt class="text-gray-500">Products</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.products_subtotal))}</dd></div><div class="flex items-center justify-between gap-4"><dt class="text-gray-500">Courses</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.courses_subtotal))}</dd></div><div class="flex items-center justify-between gap-4"><dt class="text-gray-500">Delivery</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.delivery_charge))}</dd></div>`);
				if (Number(unref(order).pricing?.discount) > 0) {
					_push(`<div class="flex items-center justify-between gap-4"><dt class="text-gray-500"> Discount `);
					if (unref(order).pricing?.coupon_code) _push(`<span class="text-[11px]">(${ssrInterpolate(unref(order).pricing.coupon_code)})</span>`);
					else _push(`<!---->`);
					_push(`</dt><dd class="font-semibold text-emerald-600">−${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.discount))}</dd></div>`);
				} else _push(`<!---->`);
				_push(`<div class="flex items-center justify-between gap-4 border-t border-gray-200 pt-1.5 text-base"><dt class="font-bold text-gray-900">Total</dt><dd class="font-extrabold text-oc-primary">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(order).pricing?.total))}</dd></div></dl></div></section><section class="card p-5"><h2 class="mb-4 text-sm font-bold text-gray-900">Status history</h2>`);
				if (!unref(order).status_history?.length) _push(ssrRenderComponent(_component_EmptyState, {
					icon: "clock",
					title: "No history yet",
					message: "Status changes will be recorded here."
				}, null, _parent));
				else {
					_push(`<ol class="relative space-y-4 border-l border-gray-200 pl-5"><!--[-->`);
					ssrRenderList$2(unref(order).status_history, (history, index) => {
						_push(`<li class="relative"><span class="${ssrRenderClass([index === unref(order).status_history.length - 1 ? "bg-oc-primary" : "bg-gray-300", "absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-white"])}"></span><div class="flex flex-wrap items-center gap-2"><p class="text-sm font-semibold text-gray-800">${ssrInterpolate(history.label || ("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(history.status))}</p>`);
						_push(ssrRenderComponent(_component_StatusBadge, { status: history.status }, null, _parent));
						_push(`</div><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(history.created_at, true))} `);
						if (history.created_by) _push(`<span> · by ${ssrInterpolate(history.created_by)}</span>`);
						else _push(`<!---->`);
						_push(`</p>`);
						if (history.note) _push(`<p class="mt-0.5 text-xs text-gray-600">${ssrInterpolate(history.note)}</p>`);
						else _push(`<!---->`);
						_push(`</li>`);
					});
					_push(`<!--]--></ol>`);
				}
				_push(`</section></div><div class="space-y-4"><section class="card p-5"><h2 class="mb-3 text-sm font-bold text-gray-900">Customer</h2><dl class="space-y-2 text-sm"><div><dt class="text-[11px] uppercase tracking-wide text-gray-400">Name</dt><dd class="font-semibold text-gray-800">${ssrInterpolate(unref(order).customer?.name || "—")}</dd></div><div><dt class="text-[11px] uppercase tracking-wide text-gray-400">Email</dt><dd class="text-gray-700">${ssrInterpolate(unref(order).customer?.email || "—")}</dd></div><div><dt class="text-[11px] uppercase tracking-wide text-gray-400">Phone</dt><dd class="text-gray-700">${ssrInterpolate(unref(order).customer?.phone || "—")} `);
				if (unref(order).customer?.phone_alt) _push(`<span>/ ${ssrInterpolate(unref(order).customer.phone_alt)}</span>`);
				else _push(`<!---->`);
				_push(`</dd></div>`);
				if (unref(order).user) _push(`<div><dt class="text-[11px] uppercase tracking-wide text-gray-400">Account</dt><dd class="text-gray-700">${ssrInterpolate(unref(order).user.name)} (#${ssrInterpolate(unref(order).user.id)})</dd></div>`);
				else _push(`<!---->`);
				_push(`</dl></section>`);
				if (unref(hasProducts)) {
					_push(`<section class="card p-5"><h2 class="mb-3 text-sm font-bold text-gray-900">Shipping address</h2><address class="text-sm not-italic leading-relaxed text-gray-600">${ssrInterpolate(unref(order).shipping_address?.line1 || "—")}<br>`);
					if (unref(order).shipping_address?.line2) _push(`<!--[-->${ssrInterpolate(unref(order).shipping_address.line2)}<br><!--]-->`);
					else _push(`<!---->`);
					_push(` ${ssrInterpolate(unref(order).shipping_address?.city)}`);
					if (unref(order).shipping_address?.district) _push(`<span>, ${ssrInterpolate(unref(order).shipping_address.district)}</span>`);
					else _push(`<!---->`);
					_push(`<br> ${ssrInterpolate(unref(order).shipping_address?.country)}</address><p class="mt-3 text-xs text-gray-500"> Method: ${ssrInterpolate(unref(order).shipping?.method || "—")} `);
					if (unref(order).shipping?.estimated_delivery_days) _push(`<span> · ${ssrInterpolate(unref(order).shipping.estimated_delivery_days)} days</span>`);
					else _push(`<!---->`);
					_push(`</p></section>`);
				} else _push(`<!---->`);
				_push(`<section class="card p-5"><h2 class="mb-3 text-sm font-bold text-gray-900">Update order</h2><form class="space-y-3"><div><label class="field-label" for="order-status">Order status</label><select id="order-status" class="field-input"><!--[-->`);
				ssrRenderList$2(unref(statuses), (item) => {
					_push(`<option${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, item) : ssrLooseEqual(unref(form).status, item)) ? " selected" : ""}>${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(item))}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(fieldError)("status")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("status"))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="order-payment">Payment status</label><select id="order-payment" class="field-input"><!--[-->`);
				ssrRenderList$2(unref(paymentStatuses), (item) => {
					_push(`<option${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).payment_status) ? ssrLooseContain(unref(form).payment_status, item) : ssrLooseEqual(unref(form).payment_status, item)) ? " selected" : ""}>${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(item))}</option>`);
				});
				_push(`<!--]--></select>`);
				if (unref(fieldError)("payment_status")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("payment_status"))}</p>`);
				else _push(`<!---->`);
				if (unref(order).payment_status === "paid") _push(`<p class="mt-1 text-[11px] text-gray-400">Refunds are issued from the Payments page.</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (unref(hasProducts)) _push(`<div class="grid grid-cols-2 gap-3"><div><label class="field-label" for="order-delivery">Delivery charge</label><input id="order-delivery"${ssrRenderAttr("value", unref(form).delivery_charge)} type="number" min="0" step="0.01" class="field-input"></div><div><label class="field-label" for="order-method">Shipping method</label><input id="order-method"${ssrRenderAttr("value", unref(form).shipping_method)} type="text" class="field-input" placeholder="Courier"></div></div>`);
				else _push(`<!---->`);
				_push(`<div><label class="field-label" for="order-note">Status note (optional)</label><input id="order-note"${ssrRenderAttr("value", unref(form).status_note)} type="text" class="field-input" placeholder="Visible in the status history"></div><div><label class="field-label" for="order-notes">Internal notes</label><textarea id="order-notes" rows="3" class="field-input" placeholder="Packing instructions, payment reference…">${ssrInterpolate(unref(form).notes)}</textarea></div><button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>`);
				if (unref(busy)) _push(ssrRenderComponent(_component_BaseIcon, {
					name: "refresh",
					size: 15,
					class: "animate-spin"
				}, null, _parent));
				else _push(ssrRenderComponent(_component_BaseIcon, {
					name: "save",
					size: 15
				}, null, _parent));
				_push(` Save order </button><p class="text-[11px] text-gray-400"> Course orders: set the status to Enrolled (or use Approve &amp; enroll) to give the student access. Cancelling revokes it. </p></form></section></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/admin/orders/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-uG0Eyk1l.mjs.map
