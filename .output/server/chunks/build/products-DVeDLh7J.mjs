import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink, r as renderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-BI1HjP-K.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { A as AppModal_default } from './AppModal-CdCNCKrW.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { p as productImage } from './media-DFMfymxc.mjs';
import { b as formatMoney } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, ref, computed, watch, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, vModelSelect, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

// app/pages/admin/products/index.vue?vue&type=script&setup=true&lang.ts
var perPage = 12;
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Products — Admin",
			robots: "noindex"
		});
		const { apiData, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: products, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-products", () => apiData("/products"))), __temp = await __temp, __restore(), __temp);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-product-category-options", () => apiData("/categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const search = ref("");
		const status = ref("");
		const categoryId = ref("");
		const page = ref(1);
		const filtered = computed(() => {
			const term = search.value.trim().toLowerCase();
			return (products.value ?? []).filter((product) => {
				if (status.value && product.status !== status.value) return false;
				if (categoryId.value && String(product.category_id) !== categoryId.value) return false;
				if (!term) return true;
				return product.name.toLowerCase().includes(term) || product.slug.toLowerCase().includes(term);
			});
		});
		const lastPage = computed(() => Math.max(1, Math.ceil(filtered.value.length / perPage)));
		const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage));
		watch([
			search,
			status,
			categoryId
		], () => page.value = 1);
		const modalOpen = ref(false);
		const imageFiles = ref([]);
		const imagePreviews = ref([]);
		const form = reactive({
			name: "",
			slug: "",
			category_id: "",
			price: 0,
			offer_price: "",
			stock: 0,
			status: "active",
			short_description: "",
			description: ""
		});
		function openCreate() {
			Object.assign(form, {
				name: "",
				slug: "",
				category_id: "",
				price: 0,
				offer_price: "",
				stock: 0,
				status: "active",
				short_description: "",
				description: ""
			});
			imageFiles.value = [];
			imagePreviews.value = [];
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
			payload.append("name", form.name);
			payload.append("slug", form.slug);
			payload.append("category_id", String(form.category_id || ""));
			payload.append("price", String(form.price || 0));
			if (form.offer_price !== "" && form.offer_price !== null) payload.append("offer_price", String(form.offer_price));
			payload.append("stock", String(form.stock || 0));
			payload.append("status", form.status);
			payload.append("short_description", form.short_description);
			payload.append("description", form.description);
			imageFiles.value.forEach((file, index) => {
				payload.append(`images[${index}][url]`, file);
				payload.append(`images[${index}][is_featured]`, index === 0 ? "1" : "0");
			});
			if (await run(() => apiUpload("/admin/products/add", payload), "Product created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		function priceOf(product) {
			return product.offer_price ?? product.price;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_NuxtLink = NuxtLink;
			const _component_PaginationLinks = PaginationLinks_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Products",
				subtitle: "Manage the physical store catalog, stock, variants and images.",
				icon: "store"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New product </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New product ")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="relative md:col-span-5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search products…" aria-label="Search products"></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All statuses</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "active") : ssrLooseEqual(unref(status), "active")) ? " selected" : ""}>Active</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "draft") : ssrLooseEqual(unref(status), "draft")) ? " selected" : ""}>Draft</option><option value="discontinued"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "discontinued") : ssrLooseEqual(unref(status), "discontinued")) ? " selected" : ""}>Discontinued</option></select></div><div class="md:col-span-3"><select class="field-input" aria-label="Filter by category"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), "") : ssrLooseEqual(unref(categoryId), "")) ? " selected" : ""}>All categories</option><!--[-->`);
			ssrRenderList$2(unref(categories), (category) => {
				_push(`<option${ssrRenderAttr("value", String(category.id))}${ssrIncludeBooleanAttr(Array.isArray(unref(categoryId)) ? ssrLooseContain(unref(categoryId), String(category.id)) : ssrLooseEqual(unref(categoryId), String(category.id))) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-1"><button type="button" class="btn-secondary w-full" aria-label="Clear filters">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(`</button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-44 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load products",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "store",
				title: unref(products)?.length ?? 0 ? "No products match these filters" : "No products yet",
				message: unref(products)?.length ?? 0 ? "Try clearing the search or filters." : "Add your first physical product to start selling in the store.",
				"action-label": unref(products)?.length ?? 0 ? "Clear filters" : "Add a product",
				onAction: ($event) => unref(products)?.length ?? 0 ? (search.value = "", status.value = "", categoryId.value = "") : openCreate()
			}, null, _parent));
			else {
				_push(`<!--[--><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"><!--[-->`);
				ssrRenderList$2(unref(paged), (product) => {
					_push(`<article class="card flex flex-col overflow-hidden"><div class="flex items-start gap-3 p-4"><img${ssrRenderAttr("src", ("productImage" in _ctx ? _ctx.productImage : unref(productImage))(product))}${ssrRenderAttr("alt", product.name)} class="h-20 w-20 shrink-0 rounded-xl object-cover"><div class="min-w-0 flex-1"><h2 class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(product.name)}</h2><p class="truncate text-[11px] text-gray-400">/${ssrInterpolate(product.slug)}</p><p class="mt-1 text-xs text-gray-500">${ssrInterpolate(product.category?.name || "Uncategorised")}</p><div class="mt-1 flex flex-wrap items-center gap-1.5">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: product.status }, null, _parent));
					_push(`<span class="badge bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(product.variants?.length ?? 0)} variants</span></div></div></div><div class="mt-auto flex items-center justify-between border-t border-gray-100 px-4 py-2.5"><div><p class="text-sm font-extrabold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(priceOf(product)))}</p><p class="${ssrRenderClass([product.stock > 0 ? "text-gray-400" : "text-rose-500", "text-[11px]"])}">${ssrInterpolate(product.stock > 0 ? `${product.stock} in stock` : "Out of stock")}</p></div><div class="flex items-center gap-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/products/${product.slug}`,
						class: "btn-secondary !px-2.5 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "edit",
									size: 14
								}, null, _parent, _scopeId));
								_push(` Edit `);
							} else return [createVNode(_component_BaseIcon, {
								name: "edit",
								size: 14
							}), createTextVNode(" Edit ")];
						}),
						_: 2
					}, _parent));
					_push(`<button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete product">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 15
					}, null, _parent));
					_push(`</button></div></div></article>`);
				});
				_push(`<!--]--></div><div class="mt-5 flex justify-center">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(page),
					"last-page": unref(lastPage),
					total: unref(filtered).length,
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: "New product",
				description: "Create the product shell. Variants and extra images can be added after saving.",
				size: "lg",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Create product</button>`);
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
					}, "Create product", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="product-name"${_scopeId}>Name</label><input id="product-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="product-slug"${_scopeId}>Slug</label><input id="product-slug"${ssrRenderAttr("value", unref(form).slug)} type="text" class="field-input" placeholder="Generated from name"${_scopeId}>`);
						if (unref(fieldError)("slug")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("slug"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="product-category"${_scopeId}>Category</label><select id="product-category" class="field-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Uncategorised</option><!--[-->`);
						ssrRenderList$2(unref(categories), (category) => {
							_push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="field-label" for="product-price"${_scopeId}>Price (BDT)</label><input id="product-price"${ssrRenderAttr("value", unref(form).price)} type="number" min="0" step="0.01" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="product-offer"${_scopeId}>Offer price</label><input id="product-offer"${ssrRenderAttr("value", unref(form).offer_price)} type="number" min="0" step="0.01" class="field-input" placeholder="Optional"${_scopeId}></div><div${_scopeId}><label class="field-label" for="product-stock"${_scopeId}>Stock</label><input id="product-stock"${ssrRenderAttr("value", unref(form).stock)} type="number" min="0" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="product-status"${_scopeId}>Status</label><select id="product-status" class="field-input"${_scopeId}><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="discontinued"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "discontinued") : ssrLooseEqual(unref(form).status, "discontinued")) ? " selected" : ""}${_scopeId}>Discontinued</option></select></div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="product-short"${_scopeId}>Short description</label><input id="product-short"${ssrRenderAttr("value", unref(form).short_description)} type="text" class="field-input"${_scopeId}></div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="product-description"${_scopeId}>Description</label><textarea id="product-description" rows="4" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="sm:col-span-2"${_scopeId}><label class="field-label"${_scopeId}>Images</label><input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}>`);
						if (unref(imagePreviews).length) {
							_push(`<div class="mt-2 flex flex-wrap gap-2"${_scopeId}><!--[-->`);
							ssrRenderList$2(unref(imagePreviews), (src, index) => {
								_push(`<img${ssrRenderAttr("src", src)} alt="Selected product image" class="h-14 w-14 rounded-lg object-cover"${_scopeId}>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</div></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
						createVNode("div", { class: "sm:col-span-2" }, [
							createVNode("label", {
								class: "field-label",
								for: "product-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "product-name",
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
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "product-slug"
							}, "Slug"),
							withDirectives(createVNode("input", {
								id: "product-slug",
								"onUpdate:modelValue": ($event) => unref(form).slug = $event,
								type: "text",
								class: "field-input",
								placeholder: "Generated from name"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).slug]]),
							unref(fieldError)("slug") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("slug")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "product-category"
						}, "Category"), withDirectives(createVNode("select", {
							id: "product-category",
							"onUpdate:modelValue": ($event) => unref(form).category_id = $event,
							class: "field-input"
						}, [createVNode("option", { value: "" }, "Uncategorised"), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(categories), (category) => {
							return openBlock(), createBlock("option", {
								key: category.id,
								value: category.id
							}, toDisplayString(category.name), 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).category_id]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "product-price"
						}, "Price (BDT)"), withDirectives(createVNode("input", {
							id: "product-price",
							"onUpdate:modelValue": ($event) => unref(form).price = $event,
							type: "number",
							min: "0",
							step: "0.01",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(form).price,
							void 0,
							{ number: true }
						]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "product-offer"
						}, "Offer price"), withDirectives(createVNode("input", {
							id: "product-offer",
							"onUpdate:modelValue": ($event) => unref(form).offer_price = $event,
							type: "number",
							min: "0",
							step: "0.01",
							class: "field-input",
							placeholder: "Optional"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).offer_price]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "product-stock"
						}, "Stock"), withDirectives(createVNode("input", {
							id: "product-stock",
							"onUpdate:modelValue": ($event) => unref(form).stock = $event,
							type: "number",
							min: "0",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(form).stock,
							void 0,
							{ number: true }
						]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "product-status"
						}, "Status"), withDirectives(createVNode("select", {
							id: "product-status",
							"onUpdate:modelValue": ($event) => unref(form).status = $event,
							class: "field-input"
						}, [
							createVNode("option", { value: "active" }, "Active"),
							createVNode("option", { value: "draft" }, "Draft"),
							createVNode("option", { value: "discontinued" }, "Discontinued")
						], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).status]])]),
						createVNode("div", { class: "sm:col-span-2" }, [createVNode("label", {
							class: "field-label",
							for: "product-short"
						}, "Short description"), withDirectives(createVNode("input", {
							id: "product-short",
							"onUpdate:modelValue": ($event) => unref(form).short_description = $event,
							type: "text",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).short_description]])]),
						createVNode("div", { class: "sm:col-span-2" }, [createVNode("label", {
							class: "field-label",
							for: "product-description"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "product-description",
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "4",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]),
						createVNode("div", { class: "sm:col-span-2" }, [
							createVNode("label", { class: "field-label" }, "Images"),
							createVNode("input", {
								type: "file",
								accept: "image/*",
								multiple: "",
								class: "block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
								onChange: onImages
							}, null, 32),
							unref(imagePreviews).length ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-2 flex flex-wrap gap-2"
							}, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(imagePreviews), (src, index) => {
								return openBlock(), createBlock("img", {
									key: index,
									src,
									alt: "Selected product image",
									class: "h-14 w-14 rounded-lg object-cover"
								}, null, 8, ["src"]);
							}), 128))])) : createCommentVNode("", true)
						])
					])], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/products/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var products_default = index_vue_vue_type_script_setup_true_lang_default;

export { products_default as default };
//# sourceMappingURL=products-DVeDLh7J.mjs.map
