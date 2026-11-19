import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DoSlkVxW.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, openBlock, createBlock, toDisplayString, createCommentVNode, withDirectives, vModelText, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

// app/pages/admin/course-categories.vue?vue&type=script&setup=true&lang.ts
var course_categories_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "course-categories",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Course categories — Admin",
			robots: "noindex"
		});
		const { apiData, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: categories, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-course-categories", () => apiData("/admin/course-categories"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => categories.value ?? []);
		const activeCount = computed(() => list.value.filter((item) => item.status !== false).length);
		const modalOpen = ref(false);
		const editing = ref(null);
		const imageFile = ref(null);
		const imageInput = ref(null);
		const preview = ref("");
		const form = reactive({
			name: "",
			slug: "",
			description: "",
			status: true,
			sort_order: 0
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				name: "",
				slug: "",
				description: "",
				status: true,
				sort_order: list.value.length
			});
			imageFile.value = null;
			preview.value = "";
			resetErrors();
			modalOpen.value = true;
		}
		function onImageChange(event) {
			const file = event.target.files?.[0] ?? null;
			imageFile.value = file;
			preview.value = file ? URL.createObjectURL(file) : "";
		}
		async function save() {
			const payload = new FormData();
			if (editing.value) payload.append("id", String(editing.value.id));
			payload.append("name", form.name);
			payload.append("slug", form.slug);
			payload.append("description", form.description);
			payload.append("status", form.status ? "1" : "0");
			payload.append("sort_order", String(form.sort_order));
			if (imageFile.value) payload.append("image", imageFile.value);
			if (!await run(() => apiUpload(`/admin/course-categories/${editing.value ? "update" : "add"}`, payload), editing.value ? "Category updated." : "Category created.")) return;
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
				title: "Course categories",
				subtitle: "Group the catalog so students can browse by topic.",
				icon: "layers"
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
			_push(`<div class="mb-4 flex flex-wrap gap-2 text-xs text-gray-500"><span class="badge bg-gray-100 text-gray-600 ring-gray-200">${ssrInterpolate(unref(list).length)} total</span><span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">${ssrInterpolate(unref(activeCount))} visible</span></div>`);
			if (unref(pending)) {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-[104px] animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load course categories",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "layers",
				title: "No course categories yet",
				message: "Create categories such as Web Development, Design or Marketing to organise your catalog.",
				"action-label": "Create the first category",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(list), (category) => {
					_push(`<article class="card flex flex-col p-4"><div class="flex items-start gap-3"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(category.image))}${ssrRenderAttr("alt", category.name)} class="h-14 w-14 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><div class="flex items-start justify-between gap-2"><h2 class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(category.name)}</h2><span class="${ssrRenderClass([category.status === false ? "bg-gray-100 text-gray-600 ring-gray-200" : "bg-emerald-50 text-emerald-700 ring-emerald-200", "badge shrink-0"])}">${ssrInterpolate(category.status === false ? "Hidden" : "Visible")}</span></div><p class="truncate text-[11px] text-gray-400">/${ssrInterpolate(category.slug)}</p><p class="mt-1 text-xs text-gray-500">${ssrInterpolate(category.courses_count ?? 0)} course${ssrInterpolate((category.courses_count ?? 0) === 1 ? "" : "s")} · order ${ssrInterpolate(category.sort_order ?? 0)}</p></div></div><p class="mt-3 line-clamp-2 min-h-[32px] text-xs text-gray-500">${ssrInterpolate(category.description || "No description yet.")}</p><div class="mt-3 flex items-center justify-end gap-1 border-t border-gray-100 pt-2"><button type="button" class="btn-ghost !px-2 !py-1 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: category.status === false ? "eye" : "x",
						size: 14
					}, null, _parent));
					_push(` ${ssrInterpolate(category.status === false ? "Show" : "Hide")}</button><button type="button" class="btn-ghost !px-2 !py-1 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 14
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600 hover:bg-rose-50">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 14
					}, null, _parent));
					_push(`</button></div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit course category" : "New course category",
				description: unref(editing) ? "Update how this category appears in the catalog." : "Give the category a clear name and an optional cover image.",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>`);
						if (unref(busy)) _push(ssrRenderComponent(_component_BaseIcon, {
							name: "refresh",
							size: 15,
							class: "animate-spin"
						}, null, _parent, _scopeId));
						else _push(`<!---->`);
						_push(` ${ssrInterpolate(unref(editing) ? "Save changes" : "Create category")}</button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => modalOpen.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: save
					}, [unref(busy) ? (openBlock(), createBlock(_component_BaseIcon, {
						key: 0,
						name: "refresh",
						size: 15,
						class: "animate-spin"
					})) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(unref(editing) ? "Save changes" : "Create category"), 1)], 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><img${ssrRenderAttr("src", unref(preview) || "/images/placeholder.svg")} alt="Category cover preview" class="h-20 w-20 rounded-xl border border-gray-100 object-cover"${_scopeId}><div${_scopeId}><label class="field-label" for="category-image"${_scopeId}>Cover image</label><input id="category-image" type="file" accept="image/*" class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>JPG or PNG. Leave empty to keep the current image.</p>`);
						if (unref(fieldError)("image")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("image"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></div><div${_scopeId}><label class="field-label" for="category-name"${_scopeId}>Name</label><input id="category-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" placeholder="Web development" required${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="category-slug"${_scopeId}>Slug</label><input id="category-slug"${ssrRenderAttr("value", unref(form).slug)} type="text" class="field-input" placeholder="web-development"${_scopeId}>`);
						if (unref(fieldError)("slug")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("slug"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="category-order"${_scopeId}>Sort order</label><input id="category-order"${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" class="field-input"${_scopeId}></div></div><div${_scopeId}><label class="field-label" for="category-description"${_scopeId}>Description</label><textarea id="category-description" rows="3" class="field-input" placeholder="What will students learn in this category?"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
						if (unref(fieldError)("description")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("description"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, null) : unref(form).status) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Show this category in the catalog </label></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", { class: "flex items-center gap-4" }, [createVNode("img", {
							src: unref(preview) || "/images/placeholder.svg",
							alt: "Category cover preview",
							class: "h-20 w-20 rounded-xl border border-gray-100 object-cover",
							onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
						}, null, 40, ["src", "onError"]), createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "category-image"
							}, "Cover image"),
							createVNode("input", {
								id: "category-image",
								ref_key: "imageInput",
								ref: imageInput,
								type: "file",
								accept: "image/*",
								class: "block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
								onChange: onImageChange
							}, null, 544),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "JPG or PNG. Leave empty to keep the current image."),
							unref(fieldError)("image") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("image")), 1)) : createCommentVNode("", true)
						])]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "category-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "category-name",
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								type: "text",
								class: "field-input",
								placeholder: "Web development",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
							unref(fieldError)("name") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("name")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "category-slug"
							}, "Slug"),
							withDirectives(createVNode("input", {
								id: "category-slug",
								"onUpdate:modelValue": ($event) => unref(form).slug = $event,
								type: "text",
								class: "field-input",
								placeholder: "web-development"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).slug]]),
							unref(fieldError)("slug") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("slug")), 1)) : createCommentVNode("", true)
						]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "category-order"
						}, "Sort order"), withDirectives(createVNode("input", {
							id: "category-order",
							"onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
							type: "number",
							min: "0",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(form).sort_order,
							void 0,
							{ number: true }
						]])])]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "category-description"
							}, "Description"),
							withDirectives(createVNode("textarea", {
								id: "category-description",
								"onUpdate:modelValue": ($event) => unref(form).description = $event,
								rows: "3",
								class: "field-input",
								placeholder: "What will students learn in this category?"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]]),
							unref(fieldError)("description") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("description")), 1)) : createCommentVNode("", true)
						]),
						createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).status = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).status]]), createTextVNode(" Show this category in the catalog ")])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/course-categories.vue
var _sfc_setup = course_categories_vue_vue_type_script_setup_true_lang_default.setup;
course_categories_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/course-categories.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var course_categories_default = course_categories_vue_vue_type_script_setup_true_lang_default;

export { course_categories_default as default };
//# sourceMappingURL=course-categories-8xneUy4H.mjs.map
