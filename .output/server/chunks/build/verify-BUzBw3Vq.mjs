import { m as useRouter, c as useSeoMeta, B as BaseIcon_default, N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/certificates/verify.vue?vue&type=script&setup=true&lang.ts
var verify_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "verify",
	__ssrInlineRender: true,
	setup(__props) {
		useRouter();
		const number = ref("");
		const error = ref("");
		useSeoMeta({
			title: "Verify a certificate — Shikhor Academy",
			description: "Check whether a Shikhor Academy certificate is valid by entering its certificate number."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[720px] px-4 py-10 md:px-6 md:py-14" }, _attrs))}><div class="text-center"><span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "verify",
				size: 28
			}, null, _parent));
			_push(`</span><h1 class="mt-4 text-2xl font-extrabold text-gray-900 md:text-3xl">Verify a certificate</h1><p class="mx-auto mt-2 max-w-md text-sm text-gray-500"> Enter the certificate number to confirm the student, course and issue date. No account is required. </p></div><form class="card mt-6 p-6"><label class="field-label" for="certificate-number">Certificate number</label><input id="certificate-number"${ssrRenderAttr("value", unref(number))} class="field-input font-mono" placeholder="e.g. CERT-2026-0001" autocomplete="off">`);
			if (unref(error)) _push(`<p class="field-error">${ssrInterpolate(unref(error))}</p>`);
			else _push(`<!---->`);
			_push(`<button type="submit" class="btn-primary mt-4 w-full">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16
			}, null, _parent));
			_push(` Verify certificate </button></form>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certificates",
				class: "mt-5 block text-center text-xs font-semibold text-oc-primary hover:underline"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Back to my certificates`);
					else return [createTextVNode("Back to my certificates")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/certificates/verify.vue
var _sfc_setup = verify_vue_vue_type_script_setup_true_lang_default.setup;
verify_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/certificates/verify.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var verify_default = verify_vue_vue_type_script_setup_true_lang_default;

export { verify_default as default };
//# sourceMappingURL=verify-BUzBw3Vq.mjs.map
