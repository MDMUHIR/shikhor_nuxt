import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { defineComponent, withAsyncContext, computed, ref, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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
import './format-DP0uQCCC.mjs';
import './useToast-8ge3kL-h.mjs';

// app/pages/admin/blog-categories.vue?vue&type=script&setup=true&lang.ts
var blog_categories_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "blog-categories",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Blog categories — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: categories, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-blog-categories", () => apiData("/blog-categories"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => categories.value ?? []);
		const modalOpen = ref(false);
		const editing = ref(null);
		const form = reactive({
			name: "",
			description: "",
			color: "#0a7cc9",
			sort_order: 0,
			is_active: true
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				name: "",
				description: "",
				color: "#0a7cc9",
				sort_order: list.value.length,
				is_active: true
			});
			resetErrors();
			modalOpen.value = true;
		}
		async function save() {
			const body = editing.value ? {
				category_id: editing.value.id,
				name: form.name,
				description: form.description,
				color: form.color,
				sort_order: form.sort_order,
				is_active: form.is_active ? 1 : 0
			} : {
				name: form.name,
				description: form.description,
				color: form.color,
				sort_order: form.sort_order
			};
			if (await run(() => apiData(`/admin/blog-categories/${editing.value ? "update" : "add"}`, {
				method: "POST",
				body
			}), editing.value ? "Category saved." : "Category created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Blog categories",
				subtitle: "Group articles by topic. Only active categories appear on the blog.",
				icon: "layers"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/blogs",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-left",
										size: 15
									}, null, _parent, _scopeId));
									_push(` Blogs `);
								} else return [createVNode(_component_BaseIcon, {
									name: "arrow-left",
									size: 15
								}), createTextVNode(" Blogs ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New category </button>`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/admin/blogs",
						class: "btn-secondary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "arrow-left",
							size: 15
						}), createTextVNode(" Blogs ")]),
						_: 1
					}), createVNode("button", {
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
					_push(`<div class="card h-20 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load blog categories",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "layers",
				title: "No blog categories yet",
				message: "Create categories such as “Study guides”, “Career advice” or “Campus news”.",
				"action-label": "Create the first category",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(list), (category) => {
					_push(`<article class="card p-4"><div class="flex items-start justify-between gap-2"><div class="flex items-center gap-2"><span class="h-3 w-3 rounded-full" style="${ssrRenderStyle({ backgroundColor: category.color || "#0a7cc9" })}"></span><h2 class="text-sm font-bold text-gray-900">${ssrInterpolate(category.name)}</h2></div>`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: category.is_active === false ? "draft" : "published" }, null, _parent));
					_push(`</div><p class="mt-1 line-clamp-2 text-xs text-gray-500">${ssrInterpolate(category.description || "No description.")}</p><div class="mt-3 flex items-center justify-between border-t border-gray-100 pt-2"><span class="text-[11px] text-gray-400">Order ${ssrInterpolate(category.sort_order ?? 0)}</span><div class="flex items-center gap-1"><button type="button" class="btn-ghost !px-2 !py-1 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 13
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600 hover:bg-rose-50">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 13
					}, null, _parent));
					_push(`</button></div></div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit blog category" : "New blog category",
				size: "md",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save category" : "Create category")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save category" : "Create category"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="blog-category-name"${_scopeId}>Name</label><input id="blog-category-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="blog-category-description"${_scopeId}>Description</label><textarea id="blog-category-description" rows="3" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="grid gap-4 sm:grid-cols-3"${_scopeId}><div${_scopeId}><label class="field-label" for="blog-category-color"${_scopeId}>Colour</label><div class="flex items-center gap-2"${_scopeId}><input id="blog-category-color"${ssrRenderAttr("value", unref(form).color)} type="color" class="h-10 w-12 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"${_scopeId}><input${ssrRenderAttr("value", unref(form).color)} type="text" class="field-input" maxlength="7"${_scopeId}></div></div><div${_scopeId}><label class="field-label" for="blog-category-order"${_scopeId}>Sort order</label><input id="blog-category-order"${ssrRenderAttr("value", unref(form).sort_order)} type="number" class="field-input"${_scopeId}></div>`);
						if (unref(editing)) _push(`<label class="mt-7 flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Active </label>`);
						else _push(`<!---->`);
						_push(`</div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "blog-category-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "blog-category-name",
								"onUpdate:modelValue": ($event) => unref(form).name = $event,
								type: "text",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).name]]),
							unref(fieldError)("name") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("name")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "blog-category-description"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "blog-category-description",
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "3",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-3" }, [
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "blog-category-color"
							}, "Colour"), createVNode("div", { class: "flex items-center gap-2" }, [withDirectives(createVNode("input", {
								id: "blog-category-color",
								"onUpdate:modelValue": ($event) => unref(form).color = $event,
								type: "color",
								class: "h-10 w-12 cursor-pointer rounded-lg border border-gray-200 bg-white p-1"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).color]]), withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).color = $event,
								type: "text",
								class: "field-input",
								maxlength: "7"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).color]])])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "blog-category-order"
							}, "Sort order"), withDirectives(createVNode("input", {
								id: "blog-category-order",
								"onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
								type: "number",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(form).sort_order,
								void 0,
								{ number: true }
							]])]),
							unref(editing) ? (openBlock(), createBlock("label", {
								key: 0,
								class: "mt-7 flex items-center gap-2 text-sm text-gray-700"
							}, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).is_active]]), createTextVNode(" Active ")])) : createCommentVNode("", true)
						])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/blog-categories.vue
var _sfc_setup = blog_categories_vue_vue_type_script_setup_true_lang_default.setup;
blog_categories_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog-categories.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_categories_default = blog_categories_vue_vue_type_script_setup_true_lang_default;

export { blog_categories_default as default };
//# sourceMappingURL=blog-categories-DRXGYSHU.mjs.map
