import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { a as formatDate, b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/orders/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { apiData } = useApi();
		const { data: orders, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("orders-page", async () => {
			return await apiData("/orders") ?? [];
		})), __temp = await __temp, __restore(), __temp);
		const filter = ref("all");
		const justPlaced = computed(() => route.query.success === "1");
		const filtered = computed(() => {
			const list = orders.value ?? [];
			if (filter.value === "all") return list;
			if (filter.value === "processing") return list.filter((order) => [
				"confirmed",
				"processing",
				"shipped"
			].includes(order.status));
			if (filter.value === "completed") return list.filter((order) => order.status === "delivered");
			return list.filter((order) => order.status === filter.value);
		});
		const filters = [
			{
				value: "all",
				label: "All"
			},
			{
				value: "pending",
				label: "Pending"
			},
			{
				value: "processing",
				label: "In progress"
			},
			{
				value: "completed",
				label: "Delivered"
			},
			{
				value: "cancelled",
				label: "Cancelled"
			}
		];
		function itemCount(order) {
			return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0);
		}
		function isCourseOnly(order) {
			return (order.course_items?.length ?? 0) > 0 && !(order.items?.length ?? 0);
		}
		function displayStatus(order) {
			if (isCourseOnly(order) && [
				"shipped",
				"delivered",
				"completed"
			].includes(order.status)) return "enrolled";
			return order.status;
		}
		useSeoMeta({
			title: "My orders — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">My orders</span></nav><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My orders</h1><p class="mt-1 text-sm text-gray-500">Track payments, delivery and course access from a single place.</p></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/store",
				class: "btn-secondary hidden sm:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Continue shopping`);
					else return [createTextVNode("Continue shopping")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(justPlaced)) {
				_push(`<div class="mt-5 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "check-circle",
					size: 18,
					class: "mt-0.5 shrink-0"
				}, null, _parent));
				_push(`<span>Your order was placed. An administrator will confirm the payment shortly.</span></div>`);
			} else _push(`<!---->`);
			_push(`<div class="mt-5 flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList$2(filters, (item) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(filter) === item.value ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3.5 py-1.5 text-xs font-semibold transition"])}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-5 space-y-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card animate-pulse p-5"><div class="flex items-center justify-between"><div class="h-4 w-40 rounded bg-gray-200"></div><div class="h-6 w-24 rounded bg-gray-200"></div></div><div class="mt-3 h-4 w-2/3 rounded bg-gray-200"></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-5",
				title: "Could not load your orders",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(orders)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-5",
				icon: "shopping-bag",
				title: "No orders yet",
				message: "When you buy a course or a product, your orders will appear here.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-5",
				icon: "filter",
				title: "No orders in this view",
				message: "Try a different filter to see your other orders.",
				"action-label": "Show all orders",
				onAction: ($event) => filter.value = "all"
			}, null, _parent));
			else {
				_push(`<div class="mt-5 space-y-3"><!--[-->`);
				ssrRenderList$2(unref(filtered), (order) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: order.id,
						to: `/orders/${order.id}`,
						class: "card block p-5 transition hover:border-oc-primary/30 hover:shadow-md"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex flex-wrap items-start justify-between gap-3"${_scopeId}><div${_scopeId}><p class="text-sm font-bold text-gray-900"${_scopeId}>${ssrInterpolate(order.order_number)}</p><p class="mt-0.5 text-xs text-gray-500"${_scopeId}>Placed ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.created_at, true))}</p></div><div class="flex items-center gap-2"${_scopeId}>`);
								_push(ssrRenderComponent(_component_StatusBadge, { status: order.payment_status }, null, _parent, _scopeId));
								_push(ssrRenderComponent(_component_StatusBadge, { status: displayStatus(order) }, null, _parent, _scopeId));
								_push(`</div></div><div class="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500"${_scopeId}><span class="inline-flex items-center gap-1.5"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "shopping-bag",
									size: 14
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(itemCount(order))} item${ssrInterpolate(itemCount(order) === 1 ? "" : "s")}</span><span class="inline-flex items-center gap-1.5"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "credit-card",
									size: 14
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(order.payment_method || "Payment pending")}</span>`);
								if (order.course_items?.length) {
									_push(`<span class="inline-flex items-center gap-1.5"${_scopeId}>`);
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "book-open",
										size: 14
									}, null, _parent, _scopeId));
									_push(` ${ssrInterpolate(order.course_items.length)} course${ssrInterpolate(order.course_items.length === 1 ? "" : "s")}</span>`);
								} else _push(`<!---->`);
								_push(`</div><div class="mt-4 flex items-center justify-between border-t border-gray-100 pt-3"${_scopeId}><span class="text-xs text-gray-500"${_scopeId}>Total</span><span class="text-lg font-extrabold text-oc-primary"${_scopeId}>${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(order.pricing?.total))}</span></div>`);
							} else return [
								createVNode("div", { class: "flex flex-wrap items-start justify-between gap-3" }, [createVNode("div", null, [createVNode("p", { class: "text-sm font-bold text-gray-900" }, toDisplayString(order.order_number), 1), createVNode("p", { class: "mt-0.5 text-xs text-gray-500" }, "Placed " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.created_at, true)), 1)]), createVNode("div", { class: "flex items-center gap-2" }, [createVNode(_component_StatusBadge, { status: order.payment_status }, null, 8, ["status"]), createVNode(_component_StatusBadge, { status: displayStatus(order) }, null, 8, ["status"])])]),
								createVNode("div", { class: "mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-500" }, [
									createVNode("span", { class: "inline-flex items-center gap-1.5" }, [createVNode(_component_BaseIcon, {
										name: "shopping-bag",
										size: 14
									}), createTextVNode(" " + toDisplayString(itemCount(order)) + " item" + toDisplayString(itemCount(order) === 1 ? "" : "s"), 1)]),
									createVNode("span", { class: "inline-flex items-center gap-1.5" }, [createVNode(_component_BaseIcon, {
										name: "credit-card",
										size: 14
									}), createTextVNode(" " + toDisplayString(order.payment_method || "Payment pending"), 1)]),
									order.course_items?.length ? (openBlock(), createBlock("span", {
										key: 0,
										class: "inline-flex items-center gap-1.5"
									}, [createVNode(_component_BaseIcon, {
										name: "book-open",
										size: 14
									}), createTextVNode(" " + toDisplayString(order.course_items.length) + " course" + toDisplayString(order.course_items.length === 1 ? "" : "s"), 1)])) : createCommentVNode("", true)
								]),
								createVNode("div", { class: "mt-4 flex items-center justify-between border-t border-gray-100 pt-3" }, [createVNode("span", { class: "text-xs text-gray-500" }, "Total"), createVNode("span", { class: "text-lg font-extrabold text-oc-primary" }, toDisplayString(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(order.pricing?.total)), 1)])
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/orders/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/orders/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = index_vue_vue_type_script_setup_true_lang_default;

export { orders_default as default };
//# sourceMappingURL=orders-djpIaFMo.mjs.map
