import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { defineComponent, withAsyncContext, computed, ref, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, isRef, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/admin/blog-tags.vue?vue&type=script&setup=true&lang.ts
var blog_tags_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "blog-tags",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Blog tags — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: tags, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-blog-tags", () => apiData("/blog-tags"))), __temp = await __temp, __restore(), __temp);
		const list = computed(() => tags.value ?? []);
		const modalOpen = ref(false);
		const editing = ref(null);
		const name = ref("");
		function openCreate() {
			editing.value = null;
			name.value = "";
			resetErrors();
			modalOpen.value = true;
		}
		async function save() {
			if (await run(() => apiData(`/admin/blog-tags/${editing.value ? "update" : "add"}`, {
				method: "POST",
				body: editing.value ? {
					tag_id: editing.value.id,
					name: name.value
				} : { name: name.value }
			}), editing.value ? "Tag updated." : "Tag created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Blog tags",
				subtitle: "Short keywords students can use to discover related articles.",
				icon: "tag"
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
						_push(` New tag </button>`);
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
					}), createTextVNode(" New tag ")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList$2(10, (i) => {
					_push(`<div class="h-8 w-24 animate-pulse rounded-full bg-gray-100"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load blog tags",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(list).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "tag",
				title: "No tags yet",
				message: "Create tags such as “study tips”, “exams” or “career”.",
				"action-label": "Create the first tag",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="card p-4"><div class="flex flex-wrap gap-2"><!--[-->`);
				ssrRenderList$2(unref(list), (tag) => {
					_push(`<div class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white py-1 pl-3 pr-1 text-sm"><span class="font-medium text-gray-700">${ssrInterpolate(tag.name)}</span><button type="button" class="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-oc-primary"${ssrRenderAttr("aria-label", `Edit ${tag.name}`)}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 12
					}, null, _parent));
					_push(`</button><button type="button" class="rounded-full p-1 text-gray-400 hover:bg-rose-50 hover:text-rose-600"${ssrRenderAttr("aria-label", `Delete ${tag.name}`)}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 12
					}, null, _parent));
					_push(`</button></div>`);
				});
				_push(`<!--]--></div></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit tag" : "New tag",
				size: "sm",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save tag" : "Create tag")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save tag" : "Create tag"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form${_scopeId}><label class="field-label" for="tag-name"${_scopeId}>Name</label><input id="tag-name"${ssrRenderAttr("value", unref(name))} type="text" class="field-input" required placeholder="Study tips"${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</form>`);
					} else return [createVNode("form", { onSubmit: withModifiers(save, ["prevent"]) }, [
						createVNode("label", {
							class: "field-label",
							for: "tag-name"
						}, "Name"),
						withDirectives(createVNode("input", {
							id: "tag-name",
							"onUpdate:modelValue": ($event) => isRef(name) ? name.value = $event : null,
							type: "text",
							class: "field-input",
							required: "",
							placeholder: "Study tips"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(name)]]),
						unref(fieldError)("name") ? (openBlock(), createBlock("p", {
							key: 0,
							class: "field-error"
						}, toDisplayString(unref(fieldError)("name")), 1)) : createCommentVNode("", true)
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/blog-tags.vue
var _sfc_setup = blog_tags_vue_vue_type_script_setup_true_lang_default.setup;
blog_tags_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blog-tags.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_tags_default = blog_tags_vue_vue_type_script_setup_true_lang_default;

export { blog_tags_default as default };
//# sourceMappingURL=blog-tags-D-OXzYUH.mjs.map
