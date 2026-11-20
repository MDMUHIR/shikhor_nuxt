import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, r as renderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-BI1HjP-K.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DFMfymxc.mjs';
import { e as excerpt, a as formatDate, c as formatNumber } from './format-owYeCpVb.mjs';
import { defineComponent, ref, withAsyncContext, computed, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
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

// app/pages/admin/blogs/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Blogs — Admin",
			robots: "noindex"
		});
		const { apiData, apiFetch, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const page = ref(1);
		const search = ref("");
		const { data: tags } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-blog-tags-options", () => apiData("/blog-tags").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-blogs", () => apiFetch("/admin/blogs", { query: {
			page: page.value,
			per_page: 10,
			search: search.value.trim() || void 0
		} }), { watch: [page] })), __temp = await __temp, __restore(), __temp);
		const blogs = computed(() => data.value?.blogs ?? []);
		const pagination = computed(() => data.value?.pagination);
		const modalOpen = ref(false);
		const editing = ref(null);
		const imageFiles = ref([]);
		const imagePreviews = ref([]);
		const existingImage = ref("");
		const form = reactive({
			title: "",
			content: "",
			is_published: false,
			tags: []
		});
		function openCreate() {
			editing.value = null;
			Object.assign(form, {
				title: "",
				content: "",
				is_published: false,
				tags: []
			});
			imageFiles.value = [];
			imagePreviews.value = [];
			existingImage.value = "";
			resetErrors();
			modalOpen.value = true;
		}
		function onImages(event) {
			const files = Array.from(event.target.files ?? []);
			imageFiles.value = files;
			imagePreviews.value = files.map((file) => URL.createObjectURL(file));
		}
		async function save() {
			const payload = new FormData();
			if (editing.value) payload.append("blog_id", String(editing.value.id));
			payload.append("title", form.title);
			payload.append("content", form.content);
			payload.append("is_published", form.is_published ? "1" : "0");
			form.tags.forEach((tagId, index) => payload.append(`tags[${index}]`, String(tagId)));
			imageFiles.value.forEach((file, index) => payload.append(`images[${index}]`, file));
			if (await run(() => apiUpload(`/admin/blogs/${editing.value ? "update" : "add"}`, payload), editing.value ? "Blog saved." : "Blog created.") === void 0) return;
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
			const _component_PaginationLinks = PaginationLinks_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Blogs",
				subtitle: "Write course updates, study tips and announcements for the storefront blog.",
				icon: "blog"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/blog-tags",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "tag",
										size: 15
									}, null, _parent, _scopeId));
									_push(` Tags `);
								} else return [createVNode(_component_BaseIcon, {
									name: "tag",
									size: 15
								}), createTextVNode(" Tags ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/blog-categories",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "layers",
										size: 15
									}, null, _parent, _scopeId));
									_push(` Categories `);
								} else return [createVNode(_component_BaseIcon, {
									name: "layers",
									size: 15
								}), createTextVNode(" Categories ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New post </button>`);
					} else return [
						createVNode(_component_NuxtLink, {
							to: "/admin/blog-tags",
							class: "btn-secondary"
						}, {
							default: withCtx(() => [createVNode(_component_BaseIcon, {
								name: "tag",
								size: 15
							}), createTextVNode(" Tags ")]),
							_: 1
						}),
						createVNode(_component_NuxtLink, {
							to: "/admin/blog-categories",
							class: "btn-secondary"
						}, {
							default: withCtx(() => [createVNode(_component_BaseIcon, {
								name: "layers",
								size: 15
							}), createTextVNode(" Categories ")]),
							_: 1
						}),
						createVNode("button", {
							type: "button",
							class: "btn-primary",
							onClick: openCreate
						}, [createVNode(_component_BaseIcon, {
							name: "plus",
							size: 16
						}), createTextVNode(" New post ")])
					];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="relative max-w-md">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search posts…" aria-label="Search blogs"></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(5, (i) => {
					_push(`<div class="card h-20 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load blogs",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(blogs).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "blog",
				title: unref(search) ? "No posts match your search" : "No blog posts yet",
				message: unref(search) ? "Try a different keyword." : "Write your first article to share news and study tips.",
				"action-label": unref(search) ? "Clear search" : "Write a post",
				onAction: ($event) => unref(search) ? (search.value = "", page.value = 1, unref(refresh)()) : openCreate()
			}, null, _parent));
			else {
				_push(`<!--[--><div class="space-y-2"><!--[-->`);
				ssrRenderList$2(unref(blogs), (blog) => {
					_push(`<article class="card flex flex-wrap items-center gap-3 p-3"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(blog.image))}${ssrRenderAttr("alt", blog.title)} class="h-16 w-24 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><h2 class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(blog.title)}</h2><p class="mt-0.5 line-clamp-1 text-xs text-gray-500">${ssrInterpolate(("excerpt" in _ctx ? _ctx.excerpt : unref(excerpt))(blog.content, 120))}</p><div class="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-gray-400">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: blog.published_at ? "published" : "draft" }, null, _parent));
					_push(`<span>${ssrInterpolate(blog.author?.name)}</span>`);
					if (blog.published_at) _push(`<span>· ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(blog.published_at))}</span>`);
					else _push(`<!---->`);
					_push(`<span>· ${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(blog.views))} views</span><!--[-->`);
					ssrRenderList$2(blog.tags, (tag) => {
						_push(`<span class="badge bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(tag)}</span>`);
					});
					_push(`<!--]--></div></div><div class="flex items-center gap-1">`);
					if (blog.published_at) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/blog/${blog.id}`,
						target: "_blank",
						class: "btn-ghost !p-1.5",
						"aria-label": "View post"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(ssrRenderComponent(_component_BaseIcon, {
								name: "external-link",
								size: 15
							}, null, _parent, _scopeId));
							else return [createVNode(_component_BaseIcon, {
								name: "external-link",
								size: 15
							})];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`<button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 14
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete post">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 15
					}, null, _parent));
					_push(`</button></div></article>`);
				});
				_push(`<!--]--></div><div class="mt-5 flex justify-center">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(pagination)?.current_page ?? 1,
					"last-page": unref(pagination)?.last_page ?? 1,
					total: unref(pagination)?.total,
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit post" : "New post",
				description: "Content supports basic HTML. Images replace the existing gallery when uploaded.",
				size: "lg",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save post" : "Create post")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save post" : "Create post"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="blog-title"${_scopeId}>Title</label><input id="blog-title"${ssrRenderAttr("value", unref(form).title)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("title")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("title"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="blog-content"${_scopeId}>Content</label><textarea id="blog-content" rows="10" class="field-input font-mono text-xs" required placeholder="&lt;p&gt;Write your article…&lt;/p&gt;"${_scopeId}>${ssrInterpolate(unref(form).content)}</textarea>`);
						if (unref(fieldError)("content")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("content"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label"${_scopeId}>Images</label>`);
						if (unref(existingImage) && !unref(imagePreviews).length) _push(`<div class="mb-2"${_scopeId}><img${ssrRenderAttr("src", unref(existingImage))} alt="Current blog image" class="h-24 w-40 rounded-xl border border-gray-100 object-cover"${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>Current image. Upload new files to replace it.</p></div>`);
						else _push(`<!---->`);
						if (unref(imagePreviews).length) {
							_push(`<div class="mb-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
							ssrRenderList$2(unref(imagePreviews), (src, index) => {
								_push(`<img${ssrRenderAttr("src", src)} alt="New blog image" class="h-20 w-28 rounded-lg object-cover"${_scopeId}>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`<input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}></div><div${_scopeId}><label class="field-label"${_scopeId}>Tags</label><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
						ssrRenderList$2(unref(tags), (tag) => {
							_push(`<label class="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600 has-[:checked]:border-oc-primary has-[:checked]:bg-brand-light has-[:checked]:text-oc-primary"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).tags) ? ssrLooseContain(unref(form).tags, tag.id) : unref(form).tags) ? " checked" : ""} type="checkbox"${ssrRenderAttr("value", tag.id)} class="h-3 w-3 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> ${ssrInterpolate(tag.name)}</label>`);
						});
						_push(`<!--]-->`);
						if (!unref(tags)?.length) _push(`<span class="text-xs text-gray-400"${_scopeId}>No tags yet — create tags first.</span>`);
						else _push(`<!---->`);
						_push(`</div></div><label class="flex items-center gap-2 text-sm font-semibold text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_published) ? ssrLooseContain(unref(form).is_published, null) : unref(form).is_published) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Publish immediately </label></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "blog-title"
							}, "Title"),
							withDirectives(createVNode("input", {
								id: "blog-title",
								"onUpdate:modelValue": ($event) => unref(form).title = $event,
								type: "text",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).title]]),
							unref(fieldError)("title") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("title")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "blog-content"
							}, "Content"),
							withDirectives(createVNode("textarea", {
								id: "blog-content",
								"onUpdate:modelValue": ($event) => unref(form).content = $event,
								rows: "10",
								class: "field-input font-mono text-xs",
								required: "",
								placeholder: "<p>Write your article…</p>"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).content]]),
							unref(fieldError)("content") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("content")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", { class: "field-label" }, "Images"),
							unref(existingImage) && !unref(imagePreviews).length ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mb-2"
							}, [createVNode("img", {
								src: unref(existingImage),
								alt: "Current blog image",
								class: "h-24 w-40 rounded-xl border border-gray-100 object-cover",
								onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
							}, null, 40, ["src", "onError"]), createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "Current image. Upload new files to replace it.")])) : createCommentVNode("", true),
							unref(imagePreviews).length ? (openBlock(), createBlock("div", {
								key: 1,
								class: "mb-2 flex flex-wrap gap-2"
							}, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(imagePreviews), (src, index) => {
								return openBlock(), createBlock("img", {
									key: index,
									src,
									alt: "New blog image",
									class: "h-20 w-28 rounded-lg object-cover"
								}, null, 8, ["src"]);
							}), 128))])) : createCommentVNode("", true),
							createVNode("input", {
								type: "file",
								accept: "image/*",
								multiple: "",
								class: "block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
								onChange: onImages
							}, null, 32)
						]),
						createVNode("div", null, [createVNode("label", { class: "field-label" }, "Tags"), createVNode("div", { class: "flex flex-wrap gap-2" }, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(tags), (tag) => {
							return openBlock(), createBlock("label", {
								key: tag.id,
								class: "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs text-gray-600 has-[:checked]:border-oc-primary has-[:checked]:bg-brand-light has-[:checked]:text-oc-primary"
							}, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).tags = $event,
								type: "checkbox",
								value: tag.id,
								class: "h-3 w-3 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
							}, null, 8, ["onUpdate:modelValue", "value"]), [[vModelCheckbox, unref(form).tags]]), createTextVNode(" " + toDisplayString(tag.name), 1)]);
						}), 128)), !unref(tags)?.length ? (openBlock(), createBlock("span", {
							key: 0,
							class: "text-xs text-gray-400"
						}, "No tags yet — create tags first.")) : createCommentVNode("", true)])]),
						createVNode("label", { class: "flex items-center gap-2 text-sm font-semibold text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).is_published = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).is_published]]), createTextVNode(" Publish immediately ")])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/blogs/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/blogs/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blogs_default = index_vue_vue_type_script_setup_true_lang_default;

export { blogs_default as default };
//# sourceMappingURL=blogs-B6ICZ7cn.mjs.map
