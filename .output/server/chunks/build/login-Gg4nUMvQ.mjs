import { a as useRoute, u as useAuth, n as navigateTo, c as useSeoMeta, B as BaseIcon_default, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { defineComponent, computed, reactive, ref, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderDynamicModel, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { isAuthenticated, isAdmin } = useAuth();
		useToast();
		const next = computed(() => {
			const value = String(route.query.next || "");
			return value.startsWith("/") ? value : "";
		});
		const form = reactive({
			email: "",
			password: ""
		});
		const showPassword = ref(false);
		const submitting = ref(false);
		const formError = ref("");
		if (isAuthenticated.value) [__temp, __restore] = withAsyncContext(() => navigateTo(next.value || (isAdmin.value ? "/admin" : "/"))), await __temp, __restore();
		useSeoMeta({
			title: "Sign in — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto grid w-full max-w-[1000px] gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-2 lg:items-center" }, _attrs))}><div class="card neo-banner neo-lavender hidden p-10 lg:block"><span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "book-open",
				size: 26
			}, null, _parent));
			_push(`</span><h1 class="mt-6 text-3xl font-extrabold leading-tight">Welcome back to Shikhor Academy</h1><p class="mt-3 text-sm leading-6 text-white/80"> Pick up your lessons, track progress, review quizzes and download the certificates you have earned. </p><ul class="mt-8 space-y-3 text-sm text-white/85"><li class="flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "check-circle",
				size: 16
			}, null, _parent));
			_push(` Resume lessons exactly where you paused</li><li class="flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "check-circle",
				size: 16
			}, null, _parent));
			_push(` Practice quizzes with instant results</li><li class="flex items-center gap-2">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "check-circle",
				size: 16
			}, null, _parent));
			_push(` Verifiable certificates on completion</li></ul></div><div class="card w-full p-6 md:p-8"><h2 class="text-2xl font-extrabold text-gray-900">Sign in</h2><p class="mt-1 text-sm text-gray-500">Use the email and password for your account.</p><form class="mt-6 space-y-4"><div><label class="field-label" for="login-email">Email</label><input id="login-email"${ssrRenderAttr("value", unref(form).email)} type="email" class="field-input" autocomplete="email" placeholder="you@example.com" autofocus></div><div><label class="field-label" for="login-password">Password</label><div class="relative"><input id="login-password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} class="field-input pr-16" autocomplete="current-password" placeholder="Your password"><button type="button" class="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-gray-500 hover:text-oc-primary">${ssrInterpolate(unref(showPassword) ? "Hide" : "Show")}</button></div></div>`);
			if (unref(formError)) _push(`<p class="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">${ssrInterpolate(unref(formError))}</p>`);
			else _push(`<!---->`);
			_push(`<button type="submit" class="btn-primary w-full"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "user",
				size: 16
			}, null, _parent));
			_push(` ${ssrInterpolate(unref(submitting) ? "Signing in…" : "Sign in")}</button></form><p class="mt-5 text-center text-sm text-gray-500"> New to Shikhor? `);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: {
					path: "/register",
					query: unref(next) ? { next: unref(next) } : {}
				},
				class: "font-semibold text-oc-primary hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Create an account`);
					else return [createTextVNode("Create an account")];
				}),
				_: 1
			}, _parent));
			_push(`</p><p class="mt-3 text-center text-xs text-gray-400">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`← Back to home`);
					else return [createTextVNode("← Back to home")];
				}),
				_: 1
			}, _parent));
			_push(`</p></div></div>`);
		};
	}
});
// app/pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = login_vue_vue_type_script_setup_true_lang_default;

export { login_default as default };
//# sourceMappingURL=login-Gg4nUMvQ.mjs.map
