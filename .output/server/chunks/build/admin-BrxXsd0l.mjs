import { a as useRoute, u as useAuth, N as NuxtLink, v as _virtual_public__2Flogo_default, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { A as AppToast_default } from './AppToast-BVq0FJQZ.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useConfirm } from './useConfirm-CnJ5-A8T.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
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

// app/components/AdminConfirmDialog.vue?vue&type=script&setup=true&lang.ts
var AdminConfirmDialog_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminConfirmDialog",
	__ssrInlineRender: true,
	setup(__props) {
		const { state, close } = useConfirm();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AppModal = AppModal_default;
			const _component_BaseIcon = BaseIcon_default;
			_push(ssrRenderComponent(_component_AppModal, mergeProps({
				open: unref(state).open,
				size: "sm",
				onClose: ($event) => unref(close)(false)
			}, _attrs), {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${_scopeId}>${ssrInterpolate(unref(state).cancelLabel)}</button><button type="button" class="${ssrRenderClass(unref(state).tone === "danger" ? "btn-danger" : "btn-primary")}"${_scopeId}>${ssrInterpolate(unref(state).confirmLabel)}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						onClick: ($event) => unref(close)(false)
					}, toDisplayString(unref(state).cancelLabel), 9, ["onClick"]), createVNode("button", {
						type: "button",
						class: unref(state).tone === "danger" ? "btn-danger" : "btn-primary",
						onClick: ($event) => unref(close)(true)
					}, toDisplayString(unref(state).confirmLabel), 11, ["onClick"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="flex items-start gap-3"${_scopeId}><span class="${ssrRenderClass([unref(state).tone === "danger" ? "bg-rose-50 text-rose-600" : "bg-brand-light text-oc-primary", "flex h-10 w-10 shrink-0 items-center justify-center rounded-full"])}"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: unref(state).tone === "danger" ? "alert-circle" : "info",
							size: 20
						}, null, _parent, _scopeId));
						_push(`</span><div${_scopeId}><h2 class="text-base font-bold text-gray-900"${_scopeId}>${ssrInterpolate(unref(state).title)}</h2><p class="mt-1 text-sm leading-relaxed text-gray-600"${_scopeId}>${ssrInterpolate(unref(state).message)}</p></div></div>`);
					} else return [createVNode("div", { class: "flex items-start gap-3" }, [createVNode("span", { class: ["flex h-10 w-10 shrink-0 items-center justify-center rounded-full", unref(state).tone === "danger" ? "bg-rose-50 text-rose-600" : "bg-brand-light text-oc-primary"] }, [createVNode(_component_BaseIcon, {
						name: unref(state).tone === "danger" ? "alert-circle" : "info",
						size: 20
					}, null, 8, ["name"])], 2), createVNode("div", null, [createVNode("h2", { class: "text-base font-bold text-gray-900" }, toDisplayString(unref(state).title), 1), createVNode("p", { class: "mt-1 text-sm leading-relaxed text-gray-600" }, toDisplayString(unref(state).message), 1)])])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/components/AdminConfirmDialog.vue
var _sfc_setup$1 = AdminConfirmDialog_vue_vue_type_script_setup_true_lang_default.setup;
AdminConfirmDialog_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminConfirmDialog.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AdminConfirmDialog_default = Object.assign(AdminConfirmDialog_vue_vue_type_script_setup_true_lang_default, { __name: "AdminConfirmDialog" });
// app/layouts/admin.vue?vue&type=script&setup=true&lang.ts
var admin_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "admin",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { user, isAdmin, isAuthenticated } = useAuth();
		const { initial } = useInitials();
		const sidebarOpen = ref(false);
		const signingOut = ref(false);
		const initials = computed(() => initial(user?.value?.name));
		const allNav = [
			{
				label: "Dashboard",
				to: "/admin",
				icon: "dashboard",
				exact: true
			},
			{
				label: "Courses",
				to: "/admin/courses",
				icon: "book-open"
			},
			{
				label: "Course categories",
				to: "/admin/course-categories",
				icon: "layers",
				adminOnly: true
			},
			{
				label: "Exams",
				to: "/admin/exams",
				icon: "list"
			},
			{
				label: "Enrollments",
				to: "/admin/enrollments",
				icon: "users",
				adminOnly: true
			},
			{
				label: "Reviews",
				to: "/admin/reviews",
				icon: "star"
			},
			{
				label: "Certificates",
				to: "/admin/certificates",
				icon: "award"
			},
			{
				label: "Orders",
				to: "/admin/orders",
				icon: "shopping-bag"
			},
			{
				label: "Payments",
				to: "/admin/payments",
				icon: "credit-card"
			},
			{
				label: "Products",
				to: "/admin/products",
				icon: "store"
			},
			{
				label: "Product categories",
				to: "/admin/categories",
				icon: "tag"
			},
			{
				label: "Coupons",
				to: "/admin/coupons",
				icon: "ticket"
			},
			{
				label: "Banners",
				to: "/admin/banners",
				icon: "image"
			},
			{
				label: "Delivery charges",
				to: "/admin/delivery-charges",
				icon: "truck"
			},
			{
				label: "Blogs",
				to: "/admin/blogs",
				icon: "blog"
			},
			{
				label: "Blog tags",
				to: "/admin/blog-tags",
				icon: "tag"
			},
			{
				label: "Blog categories",
				to: "/admin/blog-categories",
				icon: "layers"
			},
			{
				label: "Users",
				to: "/admin/users",
				icon: "user"
			}
		];
		const nav = computed(() => isAdmin.value ? allNav : allNav.filter((item) => [
			"/admin",
			"/admin/courses",
			"/admin/exams"
		].includes(item.to)));
		function active(to, exact = false) {
			return exact ? route.path === to : route.path === to || route.path.startsWith(`${to}/`);
		}
		watch(() => route.fullPath, () => sidebarOpen.value = false);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_AppToast = AppToast_default;
			const _component_AdminConfirmDialog = AdminConfirmDialog_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><aside class="${ssrRenderClass([{ "translate-x-0": unref(sidebarOpen) }, "fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform duration-200 lg:translate-x-0"])}"><div class="flex h-16 items-center justify-between border-b border-gray-100 px-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "flex h-10 w-28 items-center",
				"aria-label": "Admin home"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", _virtual_public__2Flogo_default)} alt="Shikhor Academy" class="h-full w-full object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: _virtual_public__2Flogo_default,
						alt: "Shikhor Academy",
						class: "h-full w-full object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button" class="btn-ghost lg:hidden" aria-label="Close menu">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "x",
				size: 20
			}, null, _parent));
			_push(`</button></div><nav class="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Admin"><!--[-->`);
			ssrRenderList$2(unref(nav), (item) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: item.to,
					to: item.to,
					class: ["flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900", { "bg-brand-light text-oc-primary": active(item.to, item.exact) }]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: item.icon,
								size: 17
							}, null, _parent, _scopeId));
							_push(` ${ssrInterpolate(item.label)}`);
						} else return [createVNode(_component_BaseIcon, {
							name: item.icon,
							size: 17
						}, null, 8, ["name"]), createTextVNode(" " + toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="border-t border-gray-100 p-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "external-link",
							size: 16
						}, null, _parent, _scopeId));
						_push(` View storefront `);
					} else return [createVNode(_component_BaseIcon, {
						name: "external-link",
						size: 16
					}), createTextVNode(" View storefront ")];
				}),
				_: 1
			}, _parent));
			_push(`</div></aside>`);
			if (unref(sidebarOpen)) _push(`<div class="fixed inset-0 z-40 bg-black/30 lg:hidden" aria-hidden="true"></div>`);
			else _push(`<!---->`);
			_push(`<div class="lg:pl-64"><header class="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white px-4 md:px-6"><button type="button" class="btn-ghost lg:hidden" aria-label="Open menu">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "menu",
				size: 22
			}, null, _parent));
			_push(`</button><p class="text-sm font-semibold text-gray-500">Admin console</p><div class="ml-auto flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/courses",
				class: "btn-primary hidden sm:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New course `);
					} else return [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New course ")];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex items-center gap-2"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-oc-primary text-sm font-bold text-white">${ssrInterpolate(unref(initials))}</span><div class="hidden text-right sm:block"><p class="max-w-36 truncate text-sm font-semibold text-gray-800">${ssrInterpolate(unref(user)?.name)}</p><p class="text-[11px] uppercase tracking-wide text-gray-400">${ssrInterpolate(unref(isAdmin) ? "Administrator" : "Account")}</p></div></div>`);
			if (unref(isAuthenticated)) {
				_push(`<button type="button" class="btn-ghost" aria-label="Log out"${ssrIncludeBooleanAttr(unref(signingOut)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "logout",
					size: 18
				}, null, _parent));
				_push(`</button>`);
			} else _push(`<!---->`);
			_push(`</div></header><main class="px-4 py-6 md:px-6 lg:px-8">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main></div>`);
			_push(ssrRenderComponent(_component_AppToast, null, null, _parent));
			_push(ssrRenderComponent(_component_AdminConfirmDialog, null, null, _parent));
			_push(`</div>`);
		};
	}
});
// app/layouts/admin.vue
var _sfc_setup = admin_vue_vue_type_script_setup_true_lang_default.setup;
admin_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/admin.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = admin_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-BrxXsd0l.mjs.map
