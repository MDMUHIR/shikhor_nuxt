import { u as useAuth, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/profile.vue?vue&type=script&setup=true&lang.ts
var profile_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "profile",
	__ssrInlineRender: true,
	setup(__props) {
		const { user, isAdmin} = useAuth();
		const { initial } = useInitials();
		const signingOut = ref(false);
		const links = [
			{
				label: "My courses",
				description: "Continue lessons and track progress",
				to: "/my-courses",
				icon: "book-open"
			},
			{
				label: "My orders",
				description: "Payments, delivery and order history",
				to: "/orders",
				icon: "shopping-bag"
			},
			{
				label: "Certificates",
				description: "Download and verify your certificates",
				to: "/certificates",
				icon: "award"
			},
			{
				label: "Wishlist",
				description: "Products you saved for later",
				to: "/wishlist",
				icon: "heart"
			}
		];
		useSeoMeta({
			title: "My profile — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[900px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">My profile</span></nav><div class="card overflow-hidden"><div class="bg-gradient-to-r from-oc-primary to-indigo-600 p-6 text-white md:p-8"><div class="flex flex-wrap items-center gap-4"><span class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-xl font-extrabold">${ssrInterpolate(unref(initial)(unref(user)?.name))}</span><div><h1 class="text-2xl font-extrabold">${ssrInterpolate(unref(user)?.name)}</h1><p class="text-sm text-white/85">${ssrInterpolate(unref(user)?.email)}</p><p class="mt-1 inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: unref(isAdmin) ? "shield" : "user",
				size: 12
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(isAdmin) ? "Administrator" : "Student")}</p></div></div></div><div class="p-6 md:p-8"><div class="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "info",
				size: 18,
				class: "mt-0.5 shrink-0"
			}, null, _parent));
			_push(`<p>Profile details are read-only in this version. Contact support if you need to change your name or email.</p></div><dl class="mt-5 grid gap-4 sm:grid-cols-2"><div class="rounded-xl border border-gray-100 p-4"><dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Full name</dt><dd class="mt-1 text-sm font-semibold text-gray-800">${ssrInterpolate(unref(user)?.name)}</dd></div><div class="rounded-xl border border-gray-100 p-4"><dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Email</dt><dd class="mt-1 break-all text-sm font-semibold text-gray-800">${ssrInterpolate(unref(user)?.email)}</dd></div><div class="rounded-xl border border-gray-100 p-4"><dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Account type</dt><dd class="mt-1 text-sm font-semibold text-gray-800">${ssrInterpolate(unref(isAdmin) ? "Administrator" : "Student")}</dd></div><div class="rounded-xl border border-gray-100 p-4"><dt class="text-xs font-semibold uppercase tracking-wide text-gray-400">Member since</dt><dd class="mt-1 text-sm font-semibold text-gray-800">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(user)?.created_at))}</dd></div></dl><h2 class="mt-8 text-sm font-bold uppercase tracking-wide text-gray-500">Quick links</h2><div class="mt-3 grid gap-3 sm:grid-cols-2"><!--[-->`);
			ssrRenderList$2(links, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.to,
					to: link.to,
					class: "flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-oc-primary/30 hover:shadow-sm"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-oc-primary"${_scopeId}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: link.icon,
								size: 18
							}, null, _parent, _scopeId));
							_push(`</span><span class="min-w-0"${_scopeId}><span class="block text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(link.label)}</span><span class="block text-xs text-gray-500"${_scopeId}>${ssrInterpolate(link.description)}</span></span>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "chevron-right",
								size: 16,
								class: "ml-auto shrink-0 text-gray-300"
							}, null, _parent, _scopeId));
						} else return [
							createVNode("span", { class: "flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-oc-primary" }, [createVNode(_component_BaseIcon, {
								name: link.icon,
								size: 18
							}, null, 8, ["name"])]),
							createVNode("span", { class: "min-w-0" }, [createVNode("span", { class: "block text-sm font-semibold text-gray-800" }, toDisplayString(link.label), 1), createVNode("span", { class: "block text-xs text-gray-500" }, toDisplayString(link.description), 1)]),
							createVNode(_component_BaseIcon, {
								name: "chevron-right",
								size: 16,
								class: "ml-auto shrink-0 text-gray-300"
							})
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div><div class="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-5">`);
			if (unref(isAdmin)) _push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "btn-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "dashboard",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Admin console`);
					} else return [createVNode(_component_BaseIcon, {
						name: "dashboard",
						size: 16
					}), createTextVNode(" Admin console")];
				}),
				_: 1
			}, _parent));
			else _push(`<span class="text-xs text-gray-400">Signed in as a student.</span>`);
			_push(`<button type="button" class="btn-secondary text-rose-600"${ssrIncludeBooleanAttr(unref(signingOut)) ? " disabled" : ""}>`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "logout",
				size: 16
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(signingOut) ? "Signing out…" : "Sign out")}</button></div></div></div></div>`);
		};
	}
});
// app/pages/profile.vue
var _sfc_setup = profile_vue_vue_type_script_setup_true_lang_default.setup;
profile_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var profile_default = profile_vue_vue_type_script_setup_true_lang_default;

export { profile_default as default };
//# sourceMappingURL=profile-D5lo9sGp.mjs.map
