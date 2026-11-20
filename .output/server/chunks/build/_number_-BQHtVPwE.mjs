import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, B as BaseIcon_default, N as NuxtLink } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/certificates/verify/[number].vue?vue&type=script&setup=true&lang.ts
var _number__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[number]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const number = String(route.params.number);
		const { apiData } = useApi();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`certificate-verify-${number}`, () => apiData(`/certificates/verify/${encodeURIComponent(number)}`))), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: () => `Certificate ${number} — Verification`,
			description: "Public verification of a Shikhor Academy certificate.",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[720px] px-4 py-10 md:px-6 md:py-14" }, _attrs))}>`);
			if (unref(pending)) _push(`<div class="card h-72 animate-pulse bg-gray-100"></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Verification failed",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(data)) {
				_push(`<!--[--><div class="${ssrRenderClass([unref(data).valid ? "bg-gradient-to-r from-emerald-600 to-teal-500" : "bg-gradient-to-r from-gray-700 to-gray-500", "overflow-hidden rounded-2xl p-6 text-center text-white md:p-8"])}"><span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: unref(data).valid ? "verify" : "alert-circle",
					size: 32
				}, null, _parent));
				_push(`</span><h1 class="mt-3 text-2xl font-extrabold">${ssrInterpolate(unref(data).valid ? "Certificate verified" : "Certificate not valid")}</h1><p class="mt-1 text-sm text-white/85">${ssrInterpolate(unref(data).valid ? "This certificate was issued by Shikhor Academy and is currently valid." : unref(data).message || "We could not verify this certificate.")}</p></div>`);
				if (unref(data).valid) {
					_push(`<div class="card mt-5 divide-y divide-gray-100"><div class="flex flex-wrap items-center justify-between gap-2 p-4"><span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Certificate number</span><span class="font-mono text-sm font-semibold text-gray-800">${ssrInterpolate(unref(data).certificate_number)}</span></div><div class="flex flex-wrap items-center justify-between gap-2 p-4"><span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Student</span><span class="text-sm font-semibold text-gray-800">${ssrInterpolate(unref(data).student_name || "—")}</span></div><div class="flex flex-wrap items-center justify-between gap-2 p-4"><span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Course</span><span class="text-sm font-semibold text-gray-800">${ssrInterpolate(unref(data).course_title || "—")}</span></div><div class="flex flex-wrap items-center justify-between gap-2 p-4"><span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Issued</span><span class="text-sm font-semibold text-gray-800">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(data).issued_at))}</span></div><div class="flex flex-wrap items-center justify-between gap-2 p-4"><span class="text-xs font-semibold uppercase tracking-wide text-gray-400">Status</span>`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: unref(data).status }, null, _parent));
					_push(`</div></div>`);
				} else {
					_push(`<div class="card mt-5 p-6 text-center"><p class="text-sm text-gray-600">${ssrInterpolate(unref(data).message || "No certificate matches this number. Check the number and try again.")}</p>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/certificates/verify",
						class: "btn-primary mt-4"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Try another number`);
							else return [createTextVNode("Try another number")];
						}),
						_: 1
					}, _parent));
					_push(`</div>`);
				}
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/certificates/verify",
					class: "mt-5 block text-center text-xs font-semibold text-oc-primary hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Verify another certificate`);
						else return [createTextVNode("Verify another certificate")];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/certificates/verify/[number].vue
var _sfc_setup = _number__vue_vue_type_script_setup_true_lang_default.setup;
_number__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/certificates/verify/[number].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _number__default = _number__vue_vue_type_script_setup_true_lang_default;

export { _number__default as default };
//# sourceMappingURL=_number_-BQHtVPwE.mjs.map
