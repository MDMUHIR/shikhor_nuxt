import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, m as mediaUrl, r as renderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { b as formatMoney } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, reactive, watch, ref, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vModelText, toDisplayString, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './useToast-8ge3kL-h.mjs';

// app/pages/admin/products/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { apiData} = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: product, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => `admin-product-${route.params.slug}`, () => apiData(`/admin/products/${route.params.slug}`), { watch: [() => route.params.slug] })), __temp = await __temp, __restore(), __temp);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-product-detail-categories", () => apiData("/categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: () => product.value ? `${product.value.name} — Products` : "Product — Admin",
			robots: "noindex"
		});
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
		watch(product, (value) => {
			if (!value) return;
			Object.assign(form, {
				name: value.name || "",
				slug: value.slug || "",
				category_id: value.category_id ?? "",
				price: value.price ?? 0,
				offer_price: value.offer_price ?? "",
				stock: value.stock ?? 0,
				status: value.status || "active",
				short_description: value.short_description || "",
				description: value.description || ""
			});
		}, { immediate: true });
		ref([]);
		const newPreviews = ref([]);
		const variantModal = ref(false);
		const variantForm = reactive({
			id: null,
			sku: "",
			price: 0,
			offer_price: "",
			stock: 0,
			attributes: []
		});
		function openVariant(variant) {
			Object.assign(variantForm, {
				id: null,
				sku: "",
				price: 0,
				offer_price: "",
				stock: 0,
				attributes: ([]).map((attribute) => ({
					attribute: attribute.attribute,
					value: attribute.value
				}))
			});
			resetErrors();
			variantModal.value = true;
		}
		function addAttribute() {
			variantForm.attributes.push({
				attribute: "",
				value: ""
			});
		}
		function removeAttribute(index) {
			variantForm.attributes.splice(index, 1);
		}
		async function saveVariant() {
			if (!product.value) return;
			const attributes = variantForm.attributes.filter((attribute) => attribute.attribute.trim() && attribute.value.trim()).map((attribute) => ({
				attribute: attribute.attribute.trim(),
				value: attribute.value.trim()
			}));
			const body = {
				sku: variantForm.sku,
				price: variantForm.price,
				offer_price: variantForm.offer_price === "" ? null : Number(variantForm.offer_price),
				stock: variantForm.stock,
				attributes
			};
			if (await run(() => apiData(variantForm.id ? `/admin/variants/${variantForm.id}` : `/admin/products/${product.value.id}/variants`, {
				method: "POST",
				body
			}), variantForm.id ? "Variant saved." : "Variant added.") === void 0) return;
			variantModal.value = false;
			await refresh();
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: unref(product) ? unref(product).name : "Product",
				subtitle: unref(product) ? `Slug /${unref(product).slug} · ${unref(product).images?.length ?? 0} images · ${unref(product).variants?.length ?? 0} variants` : "Edit product details and variants.",
				icon: "store"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/products",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-left",
										size: 16
									}, null, _parent, _scopeId));
									_push(` All products `);
								} else return [createVNode(_component_BaseIcon, {
									name: "arrow-left",
									size: 16
								}), createTextVNode(" All products ")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(product)) _push(ssrRenderComponent(_component_NuxtLink, {
							to: `/store/${unref(product).slug}`,
							target: "_blank",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "external-link",
										size: 15
									}, null, _parent, _scopeId));
									_push(` View in store `);
								} else return [createVNode(_component_BaseIcon, {
									name: "external-link",
									size: 15
								}), createTextVNode(" View in store ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/admin/products",
						class: "btn-secondary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "arrow-left",
							size: 16
						}), createTextVNode(" All products ")]),
						_: 1
					}), unref(product) ? (openBlock(), createBlock(_component_NuxtLink, {
						key: 0,
						to: `/store/${unref(product).slug}`,
						target: "_blank",
						class: "btn-secondary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "external-link",
							size: 15
						}), createTextVNode(" View in store ")]),
						_: 1
					}, 8, ["to"])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) _push(`<div class="space-y-3"><div class="card h-24 animate-pulse bg-gray-50"></div><div class="card h-64 animate-pulse bg-gray-50"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this product",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(product)) {
				_push(`<div class="space-y-4"><section class="card p-5"><div class="mb-4 flex flex-wrap items-center justify-between gap-2"><h2 class="text-sm font-bold text-gray-900">Product details</h2>`);
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(product).status }, null, _parent));
				_push(`</div><form class="space-y-4"><div class="grid gap-4 md:grid-cols-2"><div class="md:col-span-2"><label class="field-label" for="detail-name">Name</label><input id="detail-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required>`);
				if (unref(fieldError)("name")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("name"))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="detail-slug">Slug</label><input id="detail-slug"${ssrRenderAttr("value", unref(form).slug)} type="text" class="field-input">`);
				if (unref(fieldError)("slug")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("slug"))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="field-label" for="detail-category">Category</label><select id="detail-category" class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}>Uncategorised</option><!--[-->`);
				ssrRenderList$2(unref(categories), (category) => {
					_push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
				});
				_push(`<!--]--></select></div><div><label class="field-label" for="detail-price">Price (BDT)</label><input id="detail-price"${ssrRenderAttr("value", unref(form).price)} type="number" min="0" step="0.01" class="field-input"></div><div><label class="field-label" for="detail-offer">Offer price</label><input id="detail-offer"${ssrRenderAttr("value", unref(form).offer_price)} type="number" min="0" step="0.01" class="field-input" placeholder="Optional"></div><div><label class="field-label" for="detail-stock">Stock</label><input id="detail-stock"${ssrRenderAttr("value", unref(form).stock)} type="number" min="0" class="field-input"></div><div><label class="field-label" for="detail-status">Status</label><select id="detail-status" class="field-input"><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "active") : ssrLooseEqual(unref(form).status, "active")) ? " selected" : ""}>Active</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}>Draft</option><option value="discontinued"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "discontinued") : ssrLooseEqual(unref(form).status, "discontinued")) ? " selected" : ""}>Discontinued</option></select></div><div class="md:col-span-2"><label class="field-label" for="detail-short">Short description</label><input id="detail-short"${ssrRenderAttr("value", unref(form).short_description)} type="text" class="field-input"></div><div class="md:col-span-2"><label class="field-label" for="detail-description">Description</label><textarea id="detail-description" rows="4" class="field-input">${ssrInterpolate(unref(form).description)}</textarea></div></div><div><label class="field-label">Add images</label><input type="file" accept="image/*" multiple class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary">`);
				if (unref(newPreviews).length) {
					_push(`<div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
					ssrRenderList$2(unref(newPreviews), (src, index) => {
						_push(`<img${ssrRenderAttr("src", src)} alt="New product image" class="h-16 w-16 rounded-lg object-cover">`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<!---->`);
				_push(`</div><div class="flex justify-end"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>`);
				if (unref(busy)) _push(ssrRenderComponent(_component_BaseIcon, {
					name: "refresh",
					size: 15,
					class: "animate-spin"
				}, null, _parent));
				else _push(ssrRenderComponent(_component_BaseIcon, {
					name: "save",
					size: 15
				}, null, _parent));
				_push(` Save product </button></div></form></section><section class="card p-5"><h2 class="mb-3 text-sm font-bold text-gray-900">Product images</h2>`);
				if (!unref(product).images?.length) _push(ssrRenderComponent(_component_EmptyState, {
					icon: "image",
					title: "No images",
					message: "Add product images above and save."
				}, null, _parent));
				else {
					_push(`<div class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6"><!--[-->`);
					ssrRenderList$2(unref(product).images, (image) => {
						_push(`<div class="group relative overflow-hidden rounded-xl border border-gray-100"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(image.url))} alt="Product image" class="h-24 w-full object-cover">`);
						if (image.is_featured) _push(`<span class="absolute left-1.5 top-1.5 badge bg-amber-50 text-amber-700 ring-amber-200">Featured</span>`);
						else _push(`<!---->`);
						_push(`<button type="button" class="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-rose-600 shadow-sm hover:bg-white" aria-label="Delete image">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 12
						}, null, _parent));
						_push(`</button></div>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</section><section class="card p-5"><div class="mb-3 flex flex-wrap items-center justify-between gap-2"><div><h2 class="text-sm font-bold text-gray-900">Variants</h2><p class="text-xs text-gray-500">Products with variants require students to choose one before adding to cart.</p></div><button type="button" class="btn-primary !px-3 !py-2 text-xs">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "plus",
					size: 14
				}, null, _parent));
				_push(` Add variant </button></div>`);
				if (!unref(product).variants?.length) _push(ssrRenderComponent(_component_EmptyState, {
					icon: "layers",
					title: "No variants",
					message: "The product sells with its base price and stock.",
					"action-label": "Add a variant",
					onAction: ($event) => openVariant()
				}, null, _parent));
				else {
					_push(`<div class="space-y-3"><!--[-->`);
					ssrRenderList$2(unref(product).variants, (variant) => {
						_push(`<article class="rounded-xl border border-gray-100 p-3"><div class="flex flex-wrap items-start justify-between gap-2"><div><p class="text-sm font-bold text-gray-900">${ssrInterpolate(variant.sku)}</p><p class="text-xs text-gray-500">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(variant.offer_price ?? variant.price))} `);
						if (variant.offer_price) _push(`<span class="ml-1 text-gray-400 line-through">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(variant.price))}</span>`);
						else _push(`<!---->`);
						_push(` · ${ssrInterpolate(variant.stock)} in stock </p><div class="mt-1 flex flex-wrap gap-1"><!--[-->`);
						ssrRenderList$2(variant.attributes, (attribute) => {
							_push(`<span class="badge bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(attribute.attribute)}: ${ssrInterpolate(attribute.value)}</span>`);
						});
						_push(`<!--]--></div></div><div class="flex items-center gap-1"><label class="btn-secondary !px-2 !py-1.5 text-xs">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "upload",
							size: 13
						}, null, _parent));
						_push(` Image <input type="file" accept="image/*" class="hidden"></label><button type="button" class="btn-ghost !p-1.5" aria-label="Edit variant">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "edit",
							size: 14
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete variant">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 14
						}, null, _parent));
						_push(`</button></div></div>`);
						if (variant.images?.length) {
							_push(`<div class="mt-2 flex flex-wrap gap-2"><!--[-->`);
							ssrRenderList$2(variant.images, (image) => {
								_push(`<div class="relative"><img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(image.url))} alt="Variant image" class="h-14 w-14 rounded-lg object-cover"><button type="button" class="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-rose-600 shadow" aria-label="Delete variant image">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "x",
									size: 10
								}, null, _parent));
								_push(`</button></div>`);
							});
							_push(`<!--]--></div>`);
						} else _push(`<!---->`);
						_push(`</article>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</section></div>`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(variantModal),
				title: unref(variantForm).id ? "Edit variant" : "Add variant",
				size: "md",
				onClose: ($event) => variantModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(variantForm).id ? "Save variant" : "Add variant")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => variantModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: saveVariant
					}, toDisplayString(unref(variantForm).id ? "Save variant" : "Add variant"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="variant-sku"${_scopeId}>SKU</label><input id="variant-sku"${ssrRenderAttr("value", unref(variantForm).sku)} type="text" class="field-input" placeholder="Generated if empty"${_scopeId}>`);
						if (unref(fieldError)("sku")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("sku"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="variant-price"${_scopeId}>Price (BDT)</label><input id="variant-price"${ssrRenderAttr("value", unref(variantForm).price)} type="number" min="0" step="0.01" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="variant-offer"${_scopeId}>Offer price</label><input id="variant-offer"${ssrRenderAttr("value", unref(variantForm).offer_price)} type="number" min="0" step="0.01" class="field-input" placeholder="Optional"${_scopeId}></div><div${_scopeId}><label class="field-label" for="variant-stock"${_scopeId}>Stock</label><input id="variant-stock"${ssrRenderAttr("value", unref(variantForm).stock)} type="number" min="0" class="field-input"${_scopeId}></div></div><div${_scopeId}><div class="mb-1 flex items-center justify-between"${_scopeId}><span class="field-label !mb-0"${_scopeId}>Attributes</span><button type="button" class="text-[11px] font-semibold text-oc-primary hover:underline"${_scopeId}>+ Add attribute</button></div>`);
						if (!unref(variantForm).attributes.length) _push(`<div class="rounded-lg border border-dashed border-gray-200 px-3 py-2 text-xs text-gray-400"${_scopeId}> No attributes. Examples: Size / Medium, Colour / Blue. </div>`);
						else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList$2(unref(variantForm).attributes, (attribute, index) => {
							_push(`<div class="mt-2 grid grid-cols-[1fr_1fr_auto] gap-2"${_scopeId}><input${ssrRenderAttr("value", attribute.attribute)} type="text" class="field-input !py-1.5 text-xs" placeholder="Attribute"${_scopeId}><input${ssrRenderAttr("value", attribute.value)} type="text" class="field-input !py-1.5 text-xs" placeholder="Value"${_scopeId}><button type="button" class="btn-ghost !p-1.5 text-rose-600" aria-label="Remove attribute"${_scopeId}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "x",
								size: 13
							}, null, _parent, _scopeId));
							_push(`</button></div>`);
						});
						_push(`<!--]--></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(saveVariant, ["prevent"])
					}, [createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
						createVNode("div", { class: "sm:col-span-2" }, [
							createVNode("label", {
								class: "field-label",
								for: "variant-sku"
							}, "SKU"),
							withDirectives(createVNode("input", {
								id: "variant-sku",
								"onUpdate:modelValue": ($event) => unref(variantForm).sku = $event,
								type: "text",
								class: "field-input",
								placeholder: "Generated if empty"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(variantForm).sku]]),
							unref(fieldError)("sku") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("sku")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "variant-price"
						}, "Price (BDT)"), withDirectives(createVNode("input", {
							id: "variant-price",
							"onUpdate:modelValue": ($event) => unref(variantForm).price = $event,
							type: "number",
							min: "0",
							step: "0.01",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(variantForm).price,
							void 0,
							{ number: true }
						]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "variant-offer"
						}, "Offer price"), withDirectives(createVNode("input", {
							id: "variant-offer",
							"onUpdate:modelValue": ($event) => unref(variantForm).offer_price = $event,
							type: "number",
							min: "0",
							step: "0.01",
							class: "field-input",
							placeholder: "Optional"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(variantForm).offer_price]])]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "variant-stock"
						}, "Stock"), withDirectives(createVNode("input", {
							id: "variant-stock",
							"onUpdate:modelValue": ($event) => unref(variantForm).stock = $event,
							type: "number",
							min: "0",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(variantForm).stock,
							void 0,
							{ number: true }
						]])])
					]), createVNode("div", null, [
						createVNode("div", { class: "mb-1 flex items-center justify-between" }, [createVNode("span", { class: "field-label !mb-0" }, "Attributes"), createVNode("button", {
							type: "button",
							class: "text-[11px] font-semibold text-oc-primary hover:underline",
							onClick: addAttribute
						}, "+ Add attribute")]),
						!unref(variantForm).attributes.length ? (openBlock(), createBlock("div", {
							key: 0,
							class: "rounded-lg border border-dashed border-gray-200 px-3 py-2 text-xs text-gray-400"
						}, " No attributes. Examples: Size / Medium, Colour / Blue. ")) : createCommentVNode("", true),
						(openBlock(true), createBlock(Fragment, null, renderList$2(unref(variantForm).attributes, (attribute, index) => {
							return openBlock(), createBlock("div", {
								key: index,
								class: "mt-2 grid grid-cols-[1fr_1fr_auto] gap-2"
							}, [
								withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => attribute.attribute = $event,
									type: "text",
									class: "field-input !py-1.5 text-xs",
									placeholder: "Attribute"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, attribute.attribute]]),
								withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => attribute.value = $event,
									type: "text",
									class: "field-input !py-1.5 text-xs",
									placeholder: "Value"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, attribute.value]]),
								createVNode("button", {
									type: "button",
									class: "btn-ghost !p-1.5 text-rose-600",
									"aria-label": "Remove attribute",
									onClick: ($event) => removeAttribute(index)
								}, [createVNode(_component_BaseIcon, {
									name: "x",
									size: 13
								})], 8, ["onClick"])
							]);
						}), 128))
					])], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/products/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-CmmFSuyE.mjs.map
