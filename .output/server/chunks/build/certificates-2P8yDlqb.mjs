import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/admin/certificates.vue?vue&type=script&setup=true&lang.ts
var certificates_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "certificates",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Certificates — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		useFormHandler();
		const { initial } = useInitials();
		const status = ref("");
		const courseId = ref("");
		const page = ref(1);
		const { data: courses } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-certificate-courses", () => apiData("/admin/courses", { query: { per_page: 100 } }).then((result) => result.data).catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-certificates", () => apiData("/admin/certificates", { query: {
			per_page: 20,
			page: page.value,
			status: status.value || void 0,
			course_id: courseId.value || void 0
		} }), { watch: [
			page,
			status,
			courseId
		] })), __temp = await __temp, __restore(), __temp);
		const certificates = computed(() => data.value?.data ?? []);
		watch([status, courseId], () => page.value = 1);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Certificates",
				subtitle: "Certificates are issued automatically when students complete all required lessons and quizzes.",
				icon: "award"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "refresh",
							size: 15
						}, null, _parent, _scopeId));
						_push(` Refresh </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(pending),
						onClick: ($event) => unref(refresh)()
					}, [createVNode(_component_BaseIcon, {
						name: "refresh",
						size: 15
					}), createTextVNode(" Refresh ")], 8, ["disabled", "onClick"])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="md:col-span-4"><select class="field-input" aria-label="Filter by status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All statuses</option><option value="issued"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "issued") : ssrLooseEqual(unref(status), "issued")) ? " selected" : ""}>Issued</option><option value="revoked"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "revoked") : ssrLooseEqual(unref(status), "revoked")) ? " selected" : ""}>Revoked</option></select></div><div class="md:col-span-6"><select class="field-input" aria-label="Filter by course"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), "") : ssrLooseEqual(unref(courseId), "")) ? " selected" : ""}>All courses</option><!--[-->`);
			ssrRenderList$2(unref(courses), (course) => {
				_push(`<option${ssrRenderAttr("value", course.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), course.id) : ssrLooseEqual(unref(courseId), course.id)) ? " selected" : ""}>${ssrInterpolate(course.title)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-2"><button type="button" class="btn-secondary w-full">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(` Reset </button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load certificates",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(certificates).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "award",
				title: "No certificates found",
				message: "Certificates appear here when students complete a course and request their certificate.",
				"action-label": unref(status) || unref(courseId) ? "Clear filters" : void 0,
				onAction: ($event) => {
					status.value = "";
					courseId.value = "";
				}
			}, null, _parent));
			else {
				_push(`<!--[--><div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[860px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Certificate</th><th class="px-3 py-2.5 font-semibold">Student</th><th class="px-3 py-2.5 font-semibold">Course</th><th class="px-3 py-2.5 font-semibold">Issued</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(certificates), (certificate) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><p class="font-mono text-xs font-bold text-gray-900">${ssrInterpolate(certificate.certificate_number)}</p><p class="text-[11px] text-gray-400">#${ssrInterpolate(certificate.id)}</p></td><td class="px-3 py-3"><div class="flex items-center gap-2"><span class="flex h-7 w-7 items-center justify-center rounded-full bg-brand-light text-[10px] font-bold text-oc-primary">${ssrInterpolate(unref(initial)(certificate.user?.name))}</span><div class="min-w-0"><p class="truncate text-gray-700">${ssrInterpolate(certificate.user?.name || "—")}</p><p class="truncate text-[11px] text-gray-400">${ssrInterpolate(certificate.user?.email)}</p></div></div></td><td class="px-3 py-3">`);
					if (certificate.course) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${certificate.course.slug}`,
						target: "_blank",
						class: "max-w-[220px] truncate text-oc-primary hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(certificate.course.title)}`);
							else return [createTextVNode(toDisplayString(certificate.course.title), 1)];
						}),
						_: 2
					}, _parent));
					else _push(`<span class="text-gray-400">—</span>`);
					_push(`</td><td class="px-3 py-3 text-xs text-gray-500">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(certificate.issued_at))}</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: certificate.status }, null, _parent));
					_push(`</td><td class="px-4 py-3"><div class="flex flex-wrap items-center justify-end gap-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/certificates/verify/${certificate.certificate_number}`,
						target: "_blank",
						class: "btn-ghost !px-2 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "verify",
									size: 13
								}, null, _parent, _scopeId));
								_push(` Verify `);
							} else return [createVNode(_component_BaseIcon, {
								name: "verify",
								size: 13
							}), createTextVNode(" Verify ")];
						}),
						_: 2
					}, _parent));
					if (certificate.status === "issued") _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"> Revoke </button>`);
					else _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"> Restore </button>`);
					_push(`</div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div><div class="mt-5 flex justify-center">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(data)?.current_page ?? 1,
					"last-page": unref(data)?.last_page ?? 1,
					total: unref(data)?.total,
					onChange: (value) => page.value = value
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/admin/certificates.vue
var _sfc_setup = certificates_vue_vue_type_script_setup_true_lang_default.setup;
certificates_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/certificates.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var certificates_default = certificates_vue_vue_type_script_setup_true_lang_default;

export { certificates_default as default };
//# sourceMappingURL=certificates-2P8yDlqb.mjs.map
