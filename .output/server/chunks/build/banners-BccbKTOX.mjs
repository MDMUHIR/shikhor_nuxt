import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DoSlkVxW.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, openBlock, createBlock, toDisplayString, createCommentVNode, withDirectives, vModelText, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

// app/pages/admin/banners.vue?vue&type=script&setup=true&lang.ts
var banners_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "banners",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Banners — Admin",
			robots: "noindex"
		});
		const { apiData, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: banners, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-banners", () => apiData("/admin/banners"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => banners.value ?? []);
		const modalOpen = ref(false);
		const editing = ref(null);
		const imageFile = ref(null);
		const preview = ref("");
		const imageInput = ref(null);
		const form = reactive({
			title: "",
			description: "",
			link: "",
			is_active: true,
			sort_order: 0
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				title: "",
				description: "",
				link: "",
				is_active: true,
				sort_order: list.value.length
			});
			imageFile.value = null;
			preview.value = "";
			if (imageInput.value) imageInput.value.value = "";
			resetErrors();
			modalOpen.value = true;
		}
		function onImage(event) {
			imageFile.value = event.target.files?.[0] ?? null;
			preview.value = imageFile.value ? URL.createObjectURL(imageFile.value) : "";
		}
		async function save() {
			const payload = new FormData();
			if (editing.value) payload.append("banner_id", String(editing.value.id));
			payload.append("title", form.title);
			payload.append("description", form.description);
			payload.append("link", form.link);
			payload.append("is_active", form.is_active ? "1" : "0");
			payload.append("is_published", form.is_active ? "1" : "0");
			payload.append("sort_order", String(form.sort_order));
			if (imageFile.value) payload.append("image", imageFile.value);
			if (await run(() => apiUpload(`/admin/banners/${editing.value ? "update" : "add"}`, payload), editing.value ? "Banner updated." : "Banner added.") === void 0) return;
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
				title: "Homepage banners",
				subtitle: "Control the hero carousel shown on the storefront home page.",
				icon: "image"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New banner </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New banner ")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="space-y-3"><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card h-32 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load banners",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "image",
				title: "No banners yet",
				message: "Add a wide promotional image, an optional link and a sort order to build the carousel.",
				"action-label": "Create the first banner",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="space-y-3"><!--[-->`);
				ssrRenderList$2(unref(list), (banner) => {
					_push(`<article class="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(banner.image))}${ssrRenderAttr("alt", banner.title || "Banner")} class="h-28 w-full shrink-0 rounded-xl object-cover sm:w-52"><div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><h2 class="text-sm font-bold text-gray-900">${ssrInterpolate(banner.title || "Untitled banner")}</h2><span class="${ssrRenderClass([banner.is_active ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-100 text-gray-600 ring-gray-200", "badge"])}">${ssrInterpolate(banner.is_active ? "Active" : "Hidden")}</span><span class="badge bg-gray-50 text-gray-600 ring-gray-200">Order ${ssrInterpolate(banner.sort_order)}</span></div><p class="mt-1 line-clamp-2 text-xs text-gray-500">${ssrInterpolate(banner.description || "No description.")}</p>`);
					if (banner.link) _push(`<p class="mt-1 truncate text-[11px] text-oc-primary">${ssrInterpolate(banner.link)}</p>`);
					else _push(`<!---->`);
					_push(`</div><div class="flex flex-wrap items-center gap-1 sm:flex-col sm:items-stretch"><button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: banner.is_active ? "eye" : "check",
						size: 13
					}, null, _parent));
					_push(` ${ssrInterpolate(banner.is_active ? "Hide" : "Activate")}</button><button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 13
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs text-rose-600 hover:bg-rose-50">`);
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
				title: unref(editing) ? "Edit banner" : "New banner",
				description: "Wide images (for example 1600×600) work best in the hero carousel.",
				size: "lg",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save banner" : "Create banner")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save banner" : "Create banner"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label"${_scopeId}>Image</label><div class="flex flex-wrap items-center gap-4"${_scopeId}><img${ssrRenderAttr("src", unref(preview) || "/images/placeholder.svg")} alt="Banner preview" class="h-24 w-40 rounded-xl border border-gray-100 object-cover"${_scopeId}><div${_scopeId}><input type="file" accept="image/*"${ssrIncludeBooleanAttr(!unref(editing)) ? " required" : ""} class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>JPG, PNG or GIF up to 2 MB.</p>`);
						if (unref(fieldError)("image")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("image"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></div></div><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="banner-title"${_scopeId}>Title</label><input id="banner-title"${ssrRenderAttr("value", unref(form).title)} type="text" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="banner-link"${_scopeId}>Link</label><input id="banner-link"${ssrRenderAttr("value", unref(form).link)} type="url" class="field-input" placeholder="https://…"${_scopeId}>`);
						if (unref(fieldError)("link")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("link"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></div><div${_scopeId}><label class="field-label" for="banner-description"${_scopeId}>Description</label><textarea id="banner-description" rows="3" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="banner-order"${_scopeId}>Sort order</label><input id="banner-order"${ssrRenderAttr("value", unref(form).sort_order)} type="number" class="field-input"${_scopeId}></div><label class="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Show on homepage </label></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [createVNode("label", { class: "field-label" }, "Image"), createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [createVNode("img", {
							src: unref(preview) || "/images/placeholder.svg",
							alt: "Banner preview",
							class: "h-24 w-40 rounded-xl border border-gray-100 object-cover",
							onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
						}, null, 40, ["src", "onError"]), createVNode("div", null, [
							createVNode("input", {
								ref_key: "imageInput",
								ref: imageInput,
								type: "file",
								accept: "image/*",
								required: !unref(editing),
								class: "block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
								onChange: onImage
							}, null, 40, ["required"]),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "JPG, PNG or GIF up to 2 MB."),
							unref(fieldError)("image") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("image")), 1)) : createCommentVNode("", true)
						])])]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "banner-title"
						}, "Title"), withDirectives(createVNode("input", {
							id: "banner-title",
							"onUpdate:modelValue": ($event) => unref(form).title = $event,
							type: "text",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).title]])]), createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "banner-link"
							}, "Link"),
							withDirectives(createVNode("input", {
								id: "banner-link",
								"onUpdate:modelValue": ($event) => unref(form).link = $event,
								type: "url",
								class: "field-input",
								placeholder: "https://…"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).link]]),
							unref(fieldError)("link") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("link")), 1)) : createCommentVNode("", true)
						])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "banner-description"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "banner-description",
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "3",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "banner-order"
						}, "Sort order"), withDirectives(createVNode("input", {
							id: "banner-order",
							"onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
							type: "number",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(form).sort_order,
							void 0,
							{ number: true }
						]])]), createVNode("label", { class: "mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).is_active]]), createTextVNode(" Show on homepage ")])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/banners.vue
var _sfc_setup = banners_vue_vue_type_script_setup_true_lang_default.setup;
banners_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/banners.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var banners_default = banners_vue_vue_type_script_setup_true_lang_default;

export { banners_default as default };
//# sourceMappingURL=banners-BccbKTOX.mjs.map
