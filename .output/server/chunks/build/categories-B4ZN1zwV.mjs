import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DFMfymxc.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/admin/categories.vue?vue&type=script&setup=true&lang.ts
var categories_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "categories",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Product categories — Admin",
			robots: "noindex"
		});
		const { apiData, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: categories, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-product-categories", () => apiData("/categories"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => categories.value ?? []);
		const modalOpen = ref(false);
		const imageFile = ref(null);
		const preview = ref("");
		const form = reactive({
			name: "",
			description: ""
		});
		function openCreate() {
			form.name = "";
			form.description = "";
			imageFile.value = null;
			preview.value = "";
			resetErrors();
			modalOpen.value = true;
		}
		function onImage(event) {
			imageFile.value = event.target.files?.[0] ?? null;
			preview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : "";
		}
		async function save() {
			if (!imageFile.value) {
				toastError("Please choose a cover image.");
				return;
			}
			const payload = new FormData();
			payload.append("name", form.name);
			payload.append("description", form.description);
			payload.append("image", imageFile.value);
			if (await run(() => apiUpload("/admin/categories/add", payload), "Category created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		const toast = useToast();
		function toastError(message) {
			toast.error(message);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Product categories",
				subtitle: "Organise the store catalog. Categories need a cover image.",
				icon: "tag"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New category </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New category ")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-28 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load product categories",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "tag",
				title: "No product categories yet",
				message: "Create categories to help students browse physical products in the store.",
				"action-label": "Create the first category",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(list), (category) => {
					_push(`<article class="card flex items-start gap-3 p-4"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(category.image))}${ssrRenderAttr("alt", category.name)} class="h-20 w-20 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><h2 class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(category.name)}</h2><p class="truncate text-[11px] text-gray-400">/${ssrInterpolate(category.slug)}</p><p class="mt-1 line-clamp-2 text-xs text-gray-500">${ssrInterpolate(category.description || "No description.")}</p><button type="button" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:underline">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 13
					}, null, _parent));
					_push(` Delete </button></div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: "New product category",
				description: "Categories require a name, description and cover image.",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Create category</button>`);
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
					}, "Create category", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="product-category-name"${_scopeId}>Name</label><input id="product-category-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required placeholder="Books"${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="product-category-description"${_scopeId}>Description</label><textarea id="product-category-description" rows="3" class="field-input" required placeholder="Printed study materials and workbooks."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
						if (unref(fieldError)("description")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("description"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label"${_scopeId}>Cover image</label><div class="flex items-center gap-4"${_scopeId}><img${ssrRenderAttr("src", unref(preview) || "/images/placeholder.svg")} alt="Category preview" class="h-20 w-20 rounded-xl border border-gray-100 object-cover"${_scopeId}><input type="file" accept="image/*" required class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}></div></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "product-category-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "product-category-name",
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								type: "text",
								class: "field-input",
								required: "",
								placeholder: "Books"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
							unref(fieldError)("name") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("name")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "product-category-description"
							}, "Description"),
							withDirectives(createVNode("textarea", {
								id: "product-category-description",
								"onUpdate:modelValue": ($event) => unref(form).description = $event,
								rows: "3",
								class: "field-input",
								required: "",
								placeholder: "Printed study materials and workbooks."
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]]),
							unref(fieldError)("description") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("description")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", { class: "field-label" }, "Cover image"), createVNode("div", { class: "flex items-center gap-4" }, [createVNode("img", {
							src: unref(preview) || "/images/placeholder.svg",
							alt: "Category preview",
							class: "h-20 w-20 rounded-xl border border-gray-100 object-cover",
							onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
						}, null, 40, ["src", "onError"]), createVNode("input", {
							type: "file",
							accept: "image/*",
							required: "",
							class: "block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
							onChange: onImage
						}, null, 32)])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/categories.vue
var _sfc_setup = categories_vue_vue_type_script_setup_true_lang_default.setup;
categories_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var categories_default = categories_vue_vue_type_script_setup_true_lang_default;

export { categories_default as default };
//# sourceMappingURL=categories-B4ZN1zwV.mjs.map
