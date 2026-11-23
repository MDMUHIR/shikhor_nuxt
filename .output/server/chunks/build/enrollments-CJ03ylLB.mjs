import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink, r as renderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, openBlock, createBlock, Fragment, vModelSelect, toDisplayString, createCommentVNode, vModelText, isRef, useSSRContext } from 'vue';
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
import './useToast-8ge3kL-h.mjs';

// app/pages/admin/enrollments.vue?vue&type=script&setup=true&lang.ts
var enrollments_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "enrollments",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Enrollments — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const status = ref("");
		const courseId = ref("");
		const search = ref("");
		const page = ref(1);
		const { data: courses } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-enrollment-courses", () => apiData("/admin/courses", { query: { per_page: 100 } }).then((result) => result.data).catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data: users } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-enrollment-users", () => apiData("/admin/users").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-enrollments", () => apiData("/admin/enrollments", { query: {
			per_page: 20,
			page: page.value,
			status: status.value || void 0,
			course_id: courseId.value || void 0,
			search: search.value.trim() || void 0
		} }), { watch: [
			page,
			status,
			courseId,
			search
		] })), __temp = await __temp, __restore(), __temp);
		const enrollments = computed(() => data.value?.data ?? []);
		watch([
			status,
			courseId,
			search
		], () => page.value = 1);
		const grantModal = ref(false);
		const grantForm = reactive({
			user_id: "",
			course_id: "",
			access_days: "",
			expires_at: ""
		});
		function openGrant() {
			Object.assign(grantForm, {
				user_id: "",
				course_id: "",
				access_days: "",
				expires_at: ""
			});
			resetErrors();
			grantModal.value = true;
		}
		async function grant() {
			if (await run(() => apiData("/admin/enrollments/grant", {
				method: "POST",
				body: {
					user_id: Number(grantForm.user_id),
					course_id: Number(grantForm.course_id),
					...grantForm.access_days !== "" ? { access_days: Number(grantForm.access_days) } : {},
					...grantForm.expires_at ? { expires_at: grantForm.expires_at } : {}
				}
			}), "Course access granted.") === void 0) return;
			grantModal.value = false;
			await refresh();
		}
		const extendModal = ref(false);
		const extendTarget = ref(null);
		const extendDays = ref(30);
		async function extend() {
			if (!extendTarget.value) return;
			if (await run(() => apiData("/admin/enrollments/extend", {
				method: "POST",
				body: {
					id: extendTarget.value.id,
					days: Number(extendDays.value)
				}
			}), "Enrollment extended.") === void 0) return;
			extendModal.value = false;
			await refresh();
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
				title: "Enrollments",
				subtitle: "Grant, extend and revoke course access for students.",
				icon: "users"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Grant access </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openGrant
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" Grant access ")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="card mb-4 p-3"><div class="grid gap-2 md:grid-cols-12"><div class="md:col-span-4"><input${ssrRenderAttr("value", unref(search))} type="search" class="field-input mb-2" placeholder="Search student name or email…" aria-label="Search students"><select class="field-input" aria-label="Filter by status"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "") : ssrLooseEqual(unref(status), "")) ? " selected" : ""}>All statuses</option><option value="active"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "active") : ssrLooseEqual(unref(status), "active")) ? " selected" : ""}>Active</option><option value="suspended"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "suspended") : ssrLooseEqual(unref(status), "suspended")) ? " selected" : ""}>Suspended</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "expired") : ssrLooseEqual(unref(status), "expired")) ? " selected" : ""}>Expired</option><option value="completed"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "completed") : ssrLooseEqual(unref(status), "completed")) ? " selected" : ""}>Completed</option><option value="cancelled"${ssrIncludeBooleanAttr(Array.isArray(unref(status)) ? ssrLooseContain(unref(status), "cancelled") : ssrLooseEqual(unref(status), "cancelled")) ? " selected" : ""}>Cancelled</option></select></div><div class="md:col-span-5"><select class="field-input" aria-label="Filter by course"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), "") : ssrLooseEqual(unref(courseId), "")) ? " selected" : ""}>All courses</option><!--[-->`);
			ssrRenderList$2(unref(courses), (course) => {
				_push(`<option${ssrRenderAttr("value", course.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(courseId)) ? ssrLooseContain(unref(courseId), course.id) : ssrLooseEqual(unref(courseId), course.id)) ? " selected" : ""}>${ssrInterpolate(course.title)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-3"><button type="button" class="btn-secondary w-full">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(` Clear filters </button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(6, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load enrollments",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(enrollments).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "users",
				title: "No enrollments found",
				message: "Enrollments appear when course orders are placed or when you grant access manually.",
				"action-label": "Grant access",
				onAction: openGrant
			}, null, _parent));
			else {
				_push(`<!--[--><div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[900px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Student</th><th class="px-3 py-2.5 font-semibold">Course</th><th class="px-3 py-2.5 font-semibold">Source</th><th class="px-3 py-2.5 font-semibold">Enrolled</th><th class="px-3 py-2.5 font-semibold">Expires</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(enrollments), (enrollment) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><p class="font-semibold text-gray-900">${ssrInterpolate(enrollment.user?.name || "Deleted user")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(enrollment.user?.email)}</p></td><td class="px-3 py-3"><p class="max-w-[220px] truncate text-gray-700">${ssrInterpolate(enrollment.course?.title || "Deleted course")}</p>`);
					if (enrollment.order_id) _push(`<p class="text-[11px] text-gray-400">Order #${ssrInterpolate(enrollment.order_id)}</p>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-3 py-3"><span class="${ssrRenderClass([enrollment.source === "manual" ? "bg-violet-50 text-violet-700 ring-violet-200" : "bg-blue-50 text-blue-700 ring-blue-200", "badge"])}">${ssrInterpolate(enrollment.source)}</span></td><td class="px-3 py-3 text-xs text-gray-600">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(enrollment.enrolled_at))}</td><td class="px-3 py-3 text-xs text-gray-600">${ssrInterpolate(enrollment.expires_at ? ("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(enrollment.expires_at) : "Lifetime")} `);
					if (enrollment.remaining_days !== null && enrollment.is_active) _push(`<p class="text-[11px] text-amber-600">${ssrInterpolate(enrollment.remaining_days)} days left</p>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: enrollment.status }, null, _parent));
					_push(`</td><td class="px-4 py-3"><div class="flex flex-wrap items-center justify-end gap-1">`);
					if (enrollment.order_id) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${enrollment.order_id}`,
						class: "btn-ghost !px-2 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Order`);
							else return [createTextVNode("Order")];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					if (enrollment.status !== "cancelled") {
						_push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "calendar",
							size: 13
						}, null, _parent));
						_push(` Extend </button>`);
					} else _push(`<!---->`);
					if (enrollment.status !== "cancelled") _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50"> Revoke </button>`);
					else _push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-emerald-600 hover:bg-emerald-50"> Reactivate </button>`);
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
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(grantModal),
				title: "Grant course access",
				description: "Manually enroll a student. Leave access days empty to use the course default.",
				size: "md",
				onClose: ($event) => grantModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Grant access</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => grantModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: grant
					}, "Grant access", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="grant-user"${_scopeId}>Student</label><select id="grant-user" class="field-input" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(grantForm).user_id) ? ssrLooseContain(unref(grantForm).user_id, "") : ssrLooseEqual(unref(grantForm).user_id, "")) ? " selected" : ""}${_scopeId}>Select a user</option><!--[-->`);
						ssrRenderList$2(unref(users), (user) => {
							_push(`<option${ssrRenderAttr("value", user.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(grantForm).user_id) ? ssrLooseContain(unref(grantForm).user_id, user.id) : ssrLooseEqual(unref(grantForm).user_id, user.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(user.name)} · ${ssrInterpolate(user.email)}</option>`);
						});
						_push(`<!--]--></select>`);
						if (unref(fieldError)("user_id")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("user_id"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="grant-course"${_scopeId}>Course</label><select id="grant-course" class="field-input" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(grantForm).course_id) ? ssrLooseContain(unref(grantForm).course_id, "") : ssrLooseEqual(unref(grantForm).course_id, "")) ? " selected" : ""}${_scopeId}>Select a course</option><!--[-->`);
						ssrRenderList$2(unref(courses), (course) => {
							_push(`<option${ssrRenderAttr("value", course.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(grantForm).course_id) ? ssrLooseContain(unref(grantForm).course_id, course.id) : ssrLooseEqual(unref(grantForm).course_id, course.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(course.title)}</option>`);
						});
						_push(`<!--]--></select>`);
						if (unref(fieldError)("course_id")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("course_id"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="grant-days"${_scopeId}>Access days</label><input id="grant-days"${ssrRenderAttr("value", unref(grantForm).access_days)} type="number" min="1" class="field-input" placeholder="Course default"${_scopeId}></div><div${_scopeId}><label class="field-label" for="grant-expiry"${_scopeId}>Or expiry date</label><input id="grant-expiry"${ssrRenderAttr("value", unref(grantForm).expires_at)} type="date" class="field-input"${_scopeId}></div></div><p class="text-[11px] text-gray-400"${_scopeId}>If both are set the explicit expiry date is used.</p></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(grant, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "grant-user"
							}, "Student"),
							withDirectives(createVNode("select", {
								id: "grant-user",
								"onUpdate:modelValue": ($event) => unref(grantForm).user_id = $event,
								class: "field-input",
								required: ""
							}, [createVNode("option", {
								value: "",
								disabled: ""
							}, "Select a user"), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(users), (user) => {
								return openBlock(), createBlock("option", {
									key: user.id,
									value: user.id
								}, toDisplayString(user.name) + " · " + toDisplayString(user.email), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(grantForm).user_id]]),
							unref(fieldError)("user_id") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("user_id")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "grant-course"
							}, "Course"),
							withDirectives(createVNode("select", {
								id: "grant-course",
								"onUpdate:modelValue": ($event) => unref(grantForm).course_id = $event,
								class: "field-input",
								required: ""
							}, [createVNode("option", {
								value: "",
								disabled: ""
							}, "Select a course"), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(courses), (course) => {
								return openBlock(), createBlock("option", {
									key: course.id,
									value: course.id
								}, toDisplayString(course.title), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(grantForm).course_id]]),
							unref(fieldError)("course_id") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("course_id")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "grant-days"
						}, "Access days"), withDirectives(createVNode("input", {
							id: "grant-days",
							"onUpdate:modelValue": ($event) => unref(grantForm).access_days = $event,
							type: "number",
							min: "1",
							class: "field-input",
							placeholder: "Course default"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(grantForm).access_days]])]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "grant-expiry"
						}, "Or expiry date"), withDirectives(createVNode("input", {
							id: "grant-expiry",
							"onUpdate:modelValue": ($event) => unref(grantForm).expires_at = $event,
							type: "date",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(grantForm).expires_at]])])]),
						createVNode("p", { class: "text-[11px] text-gray-400" }, "If both are set the explicit expiry date is used.")
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(extendModal),
				title: "Extend enrollment",
				description: unref(extendTarget) ? `${unref(extendTarget).user?.name} · ${unref(extendTarget).course?.title}` : "",
				size: "sm",
				onClose: ($event) => extendModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Extend access</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => extendModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: extend
					}, "Extend access", 8, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="extend-days"${_scopeId}>Additional days</label><input id="extend-days"${ssrRenderAttr("value", unref(extendDays))} type="number" min="1" class="field-input" required${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>Days are added from the current expiry date, or from today if already expired.</p>`);
						if (unref(fieldError)("days")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("days"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(extend, ["prevent"])
					}, [createVNode("div", null, [
						createVNode("label", {
							class: "field-label",
							for: "extend-days"
						}, "Additional days"),
						withDirectives(createVNode("input", {
							id: "extend-days",
							"onUpdate:modelValue": ($event) => isRef(extendDays) ? extendDays.value = $event : null,
							type: "number",
							min: "1",
							class: "field-input",
							required: ""
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(extendDays),
							void 0,
							{ number: true }
						]]),
						createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "Days are added from the current expiry date, or from today if already expired."),
						unref(fieldError)("days") ? (openBlock(), createBlock("p", {
							key: 0,
							class: "field-error"
						}, toDisplayString(unref(fieldError)("days")), 1)) : createCommentVNode("", true)
					])], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/enrollments.vue
var _sfc_setup = enrollments_vue_vue_type_script_setup_true_lang_default.setup;
enrollments_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/enrollments.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var enrollments_default = enrollments_vue_vue_type_script_setup_true_lang_default;

export { enrollments_default as default };
//# sourceMappingURL=enrollments-CJ03ylLB.mjs.map
