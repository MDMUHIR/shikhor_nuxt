import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { c as useSeoMeta, b as useApi, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { b as formatMoney, a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, reactive, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
import './useToast-BG2fH8c_.mjs';

// app/pages/admin/payments.vue?vue&type=script&setup=true&lang.ts
var payments_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "payments",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Payments — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { run, busy, fieldError} = useFormHandler();
		const status = ref("");
		const provider = ref("");
		const page = ref(1);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-payments", () => apiData("/admin/payments", { query: {
			per_page: 20,
			page: page.value,
			status: status.value || void 0,
			provider: provider.value || void 0
		} }), { watch: [
			page,
			status,
			provider
		] })), __temp = await __temp, __restore(), __temp);
		const payments = computed(() => data.value?.data ?? []);
		watch([status, provider], () => page.value = 1);
		const refundModal = ref(false);
		const target = ref(null);
		const refundForm = reactive({
			amount: null,
			reason: ""
		});
		const refundable = computed(() => target.value ? Number(target.value.amount) - Number(target.value.refunded_amount) : 0);
		async function submitRefund() {
			if (!target.value) return;
			if (await run(() => apiData(`/admin/payments/${target.value.id}/refund`, {
				method: "POST",
				body: {
					amount: refundForm.amount || void 0,
					reason: refundForm.reason || void 0
				}
			}), "Refund processed.") === void 0) return;
			refundModal.value = false;
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			const _component_PaginationLinks = PaginationLinks_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Payments",
				subtitle: "Verified payments, gateway status and refunds.",
				icon: "credit-card"
			}, null, _parent));
			_push(`<div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="md:col-span-3"><select class="field-input" aria-label="Filter by status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All statuses</option><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "pending") : ssrLooseEqual(unref(status), "pending")) ? " selected" : ""}>Pending</option><option value="processing"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "processing") : ssrLooseEqual(unref(status), "processing")) ? " selected" : ""}>Processing</option><option value="successful"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "successful") : ssrLooseEqual(unref(status), "successful")) ? " selected" : ""}>Successful</option><option value="failed"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "failed") : ssrLooseEqual(unref(status), "failed")) ? " selected" : ""}>Failed</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "cancelled") : ssrLooseEqual(unref(status), "cancelled")) ? " selected" : ""}>Cancelled</option><option value="refunded"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "refunded") : ssrLooseEqual(unref(status), "refunded")) ? " selected" : ""}>Refunded</option></select></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by provider"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(provider)) ? ssrLooseContain(unref(provider), "") : ssrLooseEqual(unref(provider), "")) ? " selected" : ""}>All providers</option><option value="stripe"${ssrIncludeBooleanAttr(Array.isArray(unref(provider)) ? ssrLooseContain(unref(provider), "stripe") : ssrLooseEqual(unref(provider), "stripe")) ? " selected" : ""}>Stripe</option><option value="manual"${ssrIncludeBooleanAttr(Array.isArray(unref(provider)) ? ssrLooseContain(unref(provider), "manual") : ssrLooseEqual(unref(provider), "manual")) ? " selected" : ""}>Manual</option></select></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-14 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load payments",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(payments).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "credit-card",
				title: "No payments found",
				message: "Payments appear here once students start paying for orders."
			}, null, _parent));
			else {
				_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[860px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Order</th><th class="px-3 py-2.5 font-semibold">Student</th><th class="px-3 py-2.5 font-semibold">Provider</th><th class="px-3 py-2.5 font-semibold">Amount</th><th class="px-3 py-2.5 font-semibold">Refunded</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-3 py-2.5 font-semibold">Date</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(payments), (payment) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${payment.order_id}`,
						class: "font-semibold text-oc-primary hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(payment.order_number || `#${payment.order_id}`)}`);
							else return [createTextVNode(toDisplayString(payment.order_number || `#${payment.order_id}`), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</td><td class="px-3 py-3"><p class="font-medium text-gray-800">${ssrInterpolate(payment.user?.name || "—")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(payment.user?.email)}</p></td><td class="px-3 py-3 capitalize text-gray-600">${ssrInterpolate(payment.provider)}</td><td class="px-3 py-3 font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(payment.amount, payment.currency))}</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(Number(payment.refunded_amount) ? ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(payment.refunded_amount, payment.currency) : "—")}</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: payment.status }, null, _parent));
					if (payment.failure_reason) _push(`<p class="mt-0.5 text-[11px] text-rose-500">${ssrInterpolate(payment.failure_reason)}</p>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-3 py-3 text-xs text-gray-500">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(payment.paid_at || payment.created_at, true))}</td><td class="px-4 py-3 text-right">`);
					if (payment.status === "successful" && Number(payment.amount) > Number(payment.refunded_amount)) _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"> Refund </button>`);
					else _push(`<!---->`);
					_push(`</td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			}
			_push(`<div class="flex justify-center pt-4">`);
			_push(ssrRenderComponent(_component_PaginationLinks, {
				"current-page": unref(data)?.current_page ?? 1,
				"last-page": unref(data)?.last_page ?? 1,
				total: unref(data)?.total,
				onChange: (value) => page.value = value
			}, null, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(refundModal),
				title: "Refund payment",
				size: "sm",
				onClose: ($event) => refundModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Process refund</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => refundModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: submitRefund
					}, "Process refund", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}> Refundable: <span class="font-bold text-gray-900"${_scopeId}>${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(refundable), unref(target)?.currency))}</span>. A full refund removes the student&#39;s course access and releases the coupon. </p><div${_scopeId}><label class="field-label" for="refund-amount"${_scopeId}>Amount (leave empty for full refund)</label><input id="refund-amount"${ssrRenderAttr("value", unref(refundForm).amount)} type="number" min="0.01" step="0.01"${ssrRenderAttr("max", unref(refundable))} class="field-input"${_scopeId}>`);
						if (unref(fieldError)("amount")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("amount"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="refund-reason"${_scopeId}>Reason</label><input id="refund-reason"${ssrRenderAttr("value", unref(refundForm).reason)} class="field-input" maxlength="500"${_scopeId}></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(submitRefund, ["prevent"])
					}, [
						createVNode("p", { class: "text-sm text-gray-600" }, [
							createTextVNode(" Refundable: "),
							createVNode("span", { class: "font-bold text-gray-900" }, toDisplayString(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(refundable), unref(target)?.currency)), 1),
							createTextVNode(". A full refund removes the student's course access and releases the coupon. ")
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "refund-amount"
							}, "Amount (leave empty for full refund)"),
							withDirectives(createVNode("input", {
								id: "refund-amount",
								"onUpdate:modelValue": ($event) => unref(refundForm).amount = $event,
								type: "number",
								min: "0.01",
								step: "0.01",
								max: unref(refundable),
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue", "max"]), [[
								vModelText,
								unref(refundForm).amount,
								void 0,
								{ number: true }
							]]),
							unref(fieldError)("amount") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("amount")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "refund-reason"
						}, "Reason"), withDirectives(createVNode("input", {
							id: "refund-reason",
							"onUpdate:modelValue": ($event) => unref(refundForm).reason = $event,
							class: "field-input",
							maxlength: "500"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(refundForm).reason]])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/payments.vue
var _sfc_setup = payments_vue_vue_type_script_setup_true_lang_default.setup;
payments_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/payments.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var payments_default = payments_vue_vue_type_script_setup_true_lang_default;

export { payments_default as default };
//# sourceMappingURL=payments-NgD805Nj.mjs.map
