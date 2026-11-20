import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { b as formatMoney } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

// app/pages/admin/delivery-charges.vue?vue&type=script&setup=true&lang.ts
var delivery_charges_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "delivery-charges",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Delivery charges — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: charges, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-delivery-charges", () => apiData("/admin/delivery-charges"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => charges.value ?? []);
		const modalOpen = ref(false);
		const editing = ref(null);
		const form = reactive({
			name: "",
			charge: 60,
			minimum_order: "",
			status: true
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				name: "",
				charge: 60,
				minimum_order: "",
				status: true
			});
			resetErrors();
			modalOpen.value = true;
		}
		async function save() {
			if (await run(() => apiData(`/admin/delivery-charges/${editing.value ? "update" : "add"}`, {
				method: "POST",
				body: {
					...editing.value ? { id: editing.value.id } : {},
					name: form.name,
					charge: form.charge,
					minimum_order: form.minimum_order === "" ? null : Number(form.minimum_order),
					status: form.status ? 1 : 0
				}
			}), editing.value ? "Delivery charge updated." : "Delivery charge created.") === void 0) return;
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
				title: "Delivery charges",
				subtitle: "Configure shipping options and minimum order values for the store.",
				icon: "truck"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New charge </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New charge ")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<div class="card h-14 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load delivery charges",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "truck",
				title: "No delivery charges yet",
				message: "Add at least one shipping option so students can complete physical product orders.",
				"action-label": "Add a delivery charge",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[600px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Option</th><th class="px-3 py-2.5 font-semibold">Charge</th><th class="px-3 py-2.5 font-semibold">Minimum order</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(list), (charge) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><p class="font-semibold text-gray-900">${ssrInterpolate(charge.name)}</p><p class="text-[11px] text-gray-400">#${ssrInterpolate(charge.id)}</p></td><td class="px-3 py-3 font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(charge.charge))}</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(charge.minimum_order ? ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(charge.minimum_order) : "—")}</td><td class="px-3 py-3"><span class="${ssrRenderClass([charge.status ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-gray-200", "badge"])}">${ssrInterpolate(charge.status ? "Active" : "Disabled")}</span></td><td class="px-4 py-3"><div class="flex items-center justify-end gap-1"><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">${ssrInterpolate(charge.status ? "Disable" : "Enable")}</button><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">`);
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
				title: unref(editing) ? "Edit delivery charge" : "New delivery charge",
				size: "sm",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save charge" : "Create charge")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save charge" : "Create charge"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="charge-name"${_scopeId}>Name</label><input id="charge-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required placeholder="Inside Dhaka"${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid grid-cols-2 gap-3"${_scopeId}><div${_scopeId}><label class="field-label" for="charge-amount"${_scopeId}>Charge (BDT)</label><input id="charge-amount"${ssrRenderAttr("value", unref(form).charge)} type="number" min="0" step="0.01" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("charge")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("charge"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="charge-minimum"${_scopeId}>Minimum order</label><input id="charge-minimum"${ssrRenderAttr("value", unref(form).minimum_order)} type="number" min="0" step="0.01" class="field-input" placeholder="None"${_scopeId}></div></div><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Available at checkout </label></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "charge-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "charge-name",
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								type: "text",
								class: "field-input",
								required: "",
								placeholder: "Inside Dhaka"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
							unref(fieldError)("name") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("name")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid grid-cols-2 gap-3" }, [createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "charge-amount"
							}, "Charge (BDT)"),
							withDirectives(createVNode("input", {
								id: "charge-amount",
								"onUpdate:modelValue": ($event) => unref(form).charge = $event,
								type: "number",
								min: "0",
								step: "0.01",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(form).charge,
								void 0,
								{ number: true }
							]]),
							unref(fieldError)("charge") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("charge")), 1)) : createCommentVNode("", true)
						]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "charge-minimum"
						}, "Minimum order"), withDirectives(createVNode("input", {
							id: "charge-minimum",
							"onUpdate:modelValue": ($event) => unref(form).minimum_order = $event,
							type: "number",
							min: "0",
							step: "0.01",
							class: "field-input",
							placeholder: "None"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).minimum_order]])])]),
						createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).status = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).status]]), createTextVNode(" Available at checkout ")])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/delivery-charges.vue
var _sfc_setup = delivery_charges_vue_vue_type_script_setup_true_lang_default.setup;
delivery_charges_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/delivery-charges.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var delivery_charges_default = delivery_charges_vue_vue_type_script_setup_true_lang_default;

export { delivery_charges_default as default };
//# sourceMappingURL=delivery-charges-UPJSAtOJ.mjs.map
