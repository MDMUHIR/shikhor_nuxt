import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { b as formatMoney } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

// app/pages/admin/coupons.vue?vue&type=script&setup=true&lang.ts
var coupons_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "coupons",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Coupons — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: coupons, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-coupons", () => apiData("/admin/coupon"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => coupons.value ?? []);
		const modalOpen = ref(false);
		const editing = ref(null);
		const form = reactive({
			code: "",
			type: "percentage",
			discount: 10
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				code: "",
				type: "percentage",
				discount: 10
			});
			resetErrors();
			modalOpen.value = true;
		}
		async function save() {
			if (await run(() => apiData(`/admin/coupon/${editing.value ? "update" : "add"}`, {
				method: "POST",
				body: {
					...editing.value ? { id: editing.value.id } : {},
					...form
				}
			}), editing.value ? "Coupon updated." : "Coupon created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Coupons",
				subtitle: "Create discount codes that students can apply at checkout.",
				icon: "ticket"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New coupon </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New coupon ")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(5, (i) => {
					_push(`<div class="card h-14 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load coupons",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "ticket",
				title: "No coupons yet",
				message: "Create a fixed or percentage discount code for your students.",
				"action-label": "Create the first coupon",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[560px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Code</th><th class="px-3 py-2.5 font-semibold">Type</th><th class="px-3 py-2.5 font-semibold">Discount</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(list), (coupon) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><span class="rounded-lg bg-brand-light px-2.5 py-1 font-mono text-xs font-bold tracking-wide text-oc-primary">${ssrInterpolate(coupon.code)}</span></td><td class="px-3 py-3"><span class="${ssrRenderClass([coupon.type === "percentage" ? "bg-violet-50 text-violet-700 ring-violet-200" : "bg-blue-50 text-blue-700 ring-blue-200", "badge"])}">${ssrInterpolate(coupon.type === "percentage" ? "Percentage" : "Fixed amount")}</span></td><td class="px-3 py-3 font-semibold text-gray-900">${ssrInterpolate(coupon.type === "percentage" ? `${coupon.discount}%` : ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(coupon.discount))}</td><td class="px-4 py-3"><div class="flex items-center justify-end gap-1"><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 14
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 14
					}, null, _parent));
					_push(`</button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit coupon" : "New coupon",
				size: "sm",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save coupon" : "Create coupon")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => modalOpen.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: save
					}, toDisplayString(unref(editing) ? "Save coupon" : "Create coupon"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="coupon-code"${_scopeId}>Code</label><input id="coupon-code"${ssrRenderAttr("value", unref(form).code)} type="text" class="field-input font-mono uppercase" required placeholder="EID2026"${_scopeId}>`);
						if (unref(fieldError)("code")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("code"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="coupon-type"${_scopeId}>Type</label><select id="coupon-type" class="field-input"${_scopeId}><option value="percentage"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "percentage") : ssrLooseEqual(unref(form).type, "percentage")) ? " selected" : ""}${_scopeId}>Percentage</option><option value="fixed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "fixed") : ssrLooseEqual(unref(form).type, "fixed")) ? " selected" : ""}${_scopeId}>Fixed amount</option></select>`);
						if (unref(fieldError)("type")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("type"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="coupon-discount"${_scopeId}>${ssrInterpolate(unref(form).type === "percentage" ? "Discount (%)" : "Discount (BDT)")}</label><input id="coupon-discount"${ssrRenderAttr("value", unref(form).discount)} type="number" min="0"${ssrRenderAttr("max", unref(form).type === "percentage" ? 100 : void 0)} step="0.01" class="field-input"${_scopeId}>`);
						if (unref(fieldError)("discount")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("discount"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "coupon-code"
							}, "Code"),
							withDirectives(createVNode("input", {
								id: "coupon-code",
								"onUpdate:modelValue": ($event) => unref(form).code = $event,
								type: "text",
								class: "field-input font-mono uppercase",
								required: "",
								placeholder: "EID2026"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).code]]),
							unref(fieldError)("code") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("code")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "coupon-type"
							}, "Type"),
							withDirectives(createVNode("select", {
								id: "coupon-type",
								"onUpdate:modelValue": ($event) => unref(form).type = $event,
								class: "field-input"
							}, [createVNode("option", { value: "percentage" }, "Percentage"), createVNode("option", { value: "fixed" }, "Fixed amount")], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).type]]),
							unref(fieldError)("type") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("type")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "coupon-discount"
							}, toDisplayString(unref(form).type === "percentage" ? "Discount (%)" : "Discount (BDT)"), 1),
							withDirectives(createVNode("input", {
								id: "coupon-discount",
								"onUpdate:modelValue": ($event) => unref(form).discount = $event,
								type: "number",
								min: "0",
								max: unref(form).type === "percentage" ? 100 : void 0,
								step: "0.01",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue", "max"]), [[
								vModelText,
								unref(form).discount,
								void 0,
								{ number: true }
							]]),
							unref(fieldError)("discount") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("discount")), 1)) : createCommentVNode("", true)
						])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/coupons.vue
var _sfc_setup = coupons_vue_vue_type_script_setup_true_lang_default.setup;
coupons_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var coupons_default = coupons_vue_vue_type_script_setup_true_lang_default;

export { coupons_default as default };
//# sourceMappingURL=coupons-bTSlK97w.mjs.map
