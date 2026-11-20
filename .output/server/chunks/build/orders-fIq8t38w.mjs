import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { A as AdminStat_default } from './AdminStat-DEGFcaUv.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { c as formatNumber, b as formatMoney, s as statusLabel, a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, unref, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/admin/orders/index.vue?vue&type=script&setup=true&lang.ts
var perPage = 20;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Orders — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const status = ref("");
		const payment = ref("");
		const search = ref("");
		const page = ref(1);
		const { data: orders, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-orders", () => apiData("/admin/orders"))), __temp = await __temp, __restore(), __temp);
		const allOrders = computed(() => orders.value ?? []);
		const filtered = computed(() => {
			const term = search.value.trim().toLowerCase();
			return allOrders.value.filter((order) => {
				if (status.value && order.status !== status.value) return false;
				if (payment.value && order.payment_status !== payment.value) return false;
				if (!term) return true;
				return order.order_number.toLowerCase().includes(term) || (order.customer?.name || "").toLowerCase().includes(term) || (order.customer?.email || "").toLowerCase().includes(term) || (order.customer?.phone || "").includes(term);
			});
		});
		const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
		const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage));
		watch([
			status,
			payment,
			search
		], () => page.value = 1);
		const totals = computed(() => {
			const list = allOrders.value;
			const revenue = list.filter((order) => ["paid", "partially_refunded"].includes(order.payment_status)).reduce((sum, order) => sum + Number(order.pricing?.total ?? 0) - Number(order.pricing?.refunded_amount ?? 0), 0);
			return {
				count: list.length,
				revenue,
				pending: list.filter((order) => order.status === "pending").length,
				unpaid: list.filter((order) => order.payment_status !== "paid").length
			};
		});
		function itemCount(order) {
			return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0);
		}
		function clearFilters() {
			status.value = "";
			payment.value = "";
			search.value = "";
			page.value = 1;
		}
		const statuses = [
			"pending",
			"confirmed",
			"processing",
			"shipped",
			"delivered",
			"enrolled",
			"cancelled",
			"returned",
			"refunded"
		];
		const paymentStatuses = [
			"pending",
			"paid",
			"failed",
			"cancelled",
			"partially_refunded",
			"refunded"
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_AdminStat = AdminStat_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_NuxtLink = NuxtLink;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Orders",
				subtitle: "Review payments, follow delivery and manage order status.",
				icon: "shopping-bag"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "refresh",
							size: 15
						}, null, _parent, _scopeId));
						_push(` Refresh </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(pending),
						onClick: ($event) => unref(refresh)()
					}, [createVNode(_component_BaseIcon, {
						name: "refresh",
						size: 15
					}), createTextVNode(" Refresh ")], 8, ["disabled", "onClick"])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">`);
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Orders",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(totals).count),
				icon: "shopping-bag",
				tone: "blue"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Revenue",
				value: ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(totals).revenue),
				icon: "chart",
				tone: "emerald",
				hint: "Paid orders, net of refunds"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Awaiting confirmation",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(totals).pending),
				icon: "clock",
				tone: "amber"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Payment outstanding",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(totals).unpaid),
				icon: "credit-card",
				tone: "rose"
			}, null, _parent));
			_push(`</div><div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="relative md:col-span-5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search order number, name, email or phone…" aria-label="Search orders"></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by order status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All order statuses</option><!--[-->`);
			ssrRenderList$2(statuses, (item) => {
				_push(`<option${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), item) : ssrLooseEqual(unref(status), item)) ? " selected" : ""}>${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(item))}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by payment status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(payment)) ? ssrLooseContain(unref(payment), "") : ssrLooseEqual(unref(payment), "")) ? " selected" : ""}>All payment statuses</option><!--[-->`);
			ssrRenderList$2(paymentStatuses, (item) => {
				_push(`<option${ssrRenderAttr("value", item)}${ssrIncludeBooleanAttr(Array.isArray(unref(payment)) ? ssrLooseContain(unref(payment), item) : ssrLooseEqual(unref(payment), item)) ? " selected" : ""}>${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(item))}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-1"><button type="button" class="btn-secondary w-full" aria-label="Clear filters">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(`</button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load orders",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "shopping-bag",
				title: unref(allOrders).length ? "No orders match these filters" : "No orders yet",
				message: unref(allOrders).length ? "Try clearing the search or status filters." : "Orders placed in the store or for courses will appear here.",
				"action-label": unref(allOrders).length ? "Clear filters" : void 0,
				onAction: clearFilters
			}, null, _parent));
			else {
				_push(`<!--[--><div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[960px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Order</th><th class="px-3 py-2.5 font-semibold">Customer</th><th class="px-3 py-2.5 font-semibold">Items</th><th class="px-3 py-2.5 font-semibold">Total</th><th class="px-3 py-2.5 font-semibold">Payment</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(paged), (order) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><p class="font-semibold text-gray-900">${ssrInterpolate(order.order_number)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.created_at, true))}</p></td><td class="px-3 py-3"><p class="text-gray-700">${ssrInterpolate(order.customer?.name || order.user?.name || "—")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(order.customer?.phone || order.customer?.email)}</p></td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(itemCount(order))} item${ssrInterpolate(itemCount(order) === 1 ? "" : "s")} <p class="text-[11px] text-gray-400">`);
					if (order.items?.length) _push(`<!--[-->${ssrInterpolate(order.items.length)} product${ssrInterpolate(order.items.length === 1 ? "" : "s")}<!--]-->`);
					else _push(`<!---->`);
					if (order.items?.length && order.course_items?.length) _push(`<!--[--> · <!--]-->`);
					else _push(`<!---->`);
					if (order.course_items?.length) _push(`<!--[-->${ssrInterpolate(order.course_items.length)} course${ssrInterpolate(order.course_items.length === 1 ? "" : "s")}<!--]-->`);
					else _push(`<!---->`);
					_push(`</p></td><td class="px-3 py-3 font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(order.pricing?.total))}</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: order.payment_status }, null, _parent));
					_push(`</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: order.status }, null, _parent));
					_push(`</td><td class="px-4 py-3 text-right">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${order.id}`,
						class: "btn-secondary !px-2.5 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "eye",
									size: 14
								}, null, _parent, _scopeId));
								_push(` Manage `);
							} else return [createVNode(_component_BaseIcon, {
								name: "eye",
								size: 14
							}), createTextVNode(" Manage ")];
						}),
						_: 2
					}, _parent));
					_push(`</td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div><div class="mt-5 flex justify-center">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(page),
					"last-page": unref(lastPage),
					total: unref(filtered).length,
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/admin/orders/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = index_vue_vue_type_script_setup_true_lang_default;

export { orders_default as default };
//# sourceMappingURL=orders-fIq8t38w.mjs.map
