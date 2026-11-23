import { b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createTextVNode, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/certificates/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiData } = useApi();
		useToast();
		const { data: certificates, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("my-certificates-page", async () => {
			return await apiData("/my/certificates") ?? [];
		})), __temp = await __temp, __restore(), __temp);
		const downloading = ref(null);
		useSeoMeta({
			title: "Certificates — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1000px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Certificates</span></nav><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">My certificates</h1><p class="mt-1 text-sm text-gray-500">Download your certificates or share a number for public verification.</p></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certificates/verify",
				class: "btn-secondary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "verify",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Verify a certificate`);
					} else return [createVNode(_component_BaseIcon, {
						name: "verify",
						size: 16
					}), createTextVNode(" Verify a certificate")];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 grid gap-4 sm:grid-cols-2"><!--[-->`);
				ssrRenderList$2(2, (i) => {
					_push(`<div class="card animate-pulse p-5"><div class="h-10 w-10 rounded-xl bg-gray-200"></div><div class="mt-3 h-4 w-2/3 rounded bg-gray-200"></div><div class="mt-2 h-3 w-1/2 rounded bg-gray-200"></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load your certificates",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(certificates)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "award",
				title: "No certificates yet",
				message: "Complete every lesson in a course, then claim your certificate from the course player.",
				"action-label": "Go to my courses",
				"action-to": "/my-courses"
			}, null, _parent));
			else {
				_push(`<div class="mt-6 grid gap-4 sm:grid-cols-2"><!--[-->`);
				ssrRenderList$2(unref(certificates), (certificate) => {
					_push(`<article class="card overflow-hidden"><div class="flex items-start gap-4 p-5"><span class="${ssrRenderClass([certificate.is_valid ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400", "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"])}">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "award",
						size: 24
					}, null, _parent));
					_push(`</span><div class="min-w-0 flex-1"><div class="flex flex-wrap items-center gap-2"><h2 class="line-clamp-2 text-sm font-bold text-gray-900">${ssrInterpolate(certificate.course?.title || "Course certificate")}</h2>`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: certificate.status }, null, _parent));
					_push(`</div><p class="mt-1 font-mono text-xs text-gray-500">${ssrInterpolate(certificate.certificate_number)}</p><p class="mt-0.5 text-xs text-gray-400">Issued ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(certificate.issued_at))}</p></div></div><div class="flex flex-wrap gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3"><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(!certificate.is_valid || unref(downloading) === certificate.id) ? " disabled" : ""}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "download",
						size: 15
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(downloading) === certificate.id ? "Preparing…" : "Download PDF")}</button>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/certificates/verify/${certificate.certificate_number}`,
						class: "btn-secondary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "verify",
									size: 15
								}, null, _parent, _scopeId));
								_push(` Verify `);
							} else return [createVNode(_component_BaseIcon, {
								name: "verify",
								size: 15
							}), createTextVNode(" Verify ")];
						}),
						_: 2
					}, _parent));
					if (certificate.course) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${certificate.course.slug}`,
						class: "btn-ghost"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View course`);
							else return [createTextVNode("View course")];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					_push(`</div></article>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/certificates/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/certificates/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var certificates_default = index_vue_vue_type_script_setup_true_lang_default;

export { certificates_default as default };
//# sourceMappingURL=certificates-qP-xKDeq.mjs.map
