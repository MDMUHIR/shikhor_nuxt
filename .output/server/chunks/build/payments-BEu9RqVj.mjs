import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { c as useSeoMeta, b as useApi, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { a as formatDate, b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/payments.vue?vue&type=script&setup=true&lang.ts
var payments_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "payments",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Payment history — Shikhor Academy",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const page = ref(1);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("my-payments", () => apiData("/my/payments", { query: {
			page: page.value,
			per_page: 15
		} }), { watch: [page] })), __temp = await __temp, __restore(), __temp);
		const payments = computed(() => data.value?.data ?? []);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Payment history</h1><p class="mt-1 text-sm text-gray-500">Every payment attempt for your orders.</p>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 space-y-2"><!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load payments",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(payments).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "credit-card",
				title: "No payments yet",
				message: "Payments for your orders will appear here.",
				"action-label": "Browse courses",
				"action-to": "/courses"
			}, null, _parent));
			else {
				_push(`<ul class="mt-6 space-y-2"><!--[-->`);
				ssrRenderList$2(unref(payments), (payment) => {
					_push(`<li class="card flex flex-wrap items-center justify-between gap-3 p-4"><div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/orders/${payment.order_id}`,
						class: "text-sm font-semibold text-oc-primary hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(payment.order_number || `Order #${payment.order_id}`)}`);
							else return [createTextVNode(toDisplayString(payment.order_number || `Order #${payment.order_id}`), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<p class="text-[11px] text-gray-400"><span class="capitalize">${ssrInterpolate(payment.provider)}</span> · ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(payment.paid_at || payment.created_at, true))}</p></div><div class="flex items-center gap-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: payment.status }, null, _parent));
					_push(`<div class="text-right"><p class="text-sm font-bold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(payment.amount, payment.currency))}</p>`);
					if (Number(payment.refunded_amount)) _push(`<p class="text-[11px] text-rose-500">Refunded ${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(payment.refunded_amount, payment.currency))}</p>`);
					else _push(`<!---->`);
					_push(`</div></div></li>`);
				});
				_push(`<!--]--></ul>`);
			}
			_push(`<div class="flex justify-center pt-4">`);
			_push(ssrRenderComponent(_component_PaginationLinks, {
				"current-page": unref(data)?.current_page ?? 1,
				"last-page": unref(data)?.last_page ?? 1,
				onChange: (value) => page.value = value
			}, null, _parent));
			_push(`</div></div>`);
		};
	}
});
// app/pages/payments.vue
var _sfc_setup = payments_vue_vue_type_script_setup_true_lang_default.setup;
payments_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payments.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var payments_default = payments_vue_vue_type_script_setup_true_lang_default;

export { payments_default as default };
//# sourceMappingURL=payments-BEu9RqVj.mjs.map
