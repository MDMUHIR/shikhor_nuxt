import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, u as useAuth, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { A as AdminStat_default } from './AdminStat-DEGFcaUv.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { c as formatNumber, a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, reactive, withCtx, createVNode, createTextVNode, unref, withModifiers, withDirectives, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, vModelSelect, Fragment, vModelCheckbox, useSSRContext } from 'vue';
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

// app/pages/admin/users.vue?vue&type=script&setup=true&lang.ts
var users_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "users",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Users — Admin",
			robots: "noindex"
		});
		const { apiData, apiUpload } = useApi();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { initial } = useInitials();
		const { user: currentUser } = useAuth();
		const { data: users, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-users", () => apiData("/admin/users"))), __temp = await __temp, __restore(), __temp);
		const search = ref("");
		const type = ref("");
		const filtered = computed(() => {
			const term = search.value.trim().toLowerCase();
			return (users.value ?? []).filter((user) => {
				if (type.value && user.type !== type.value) return false;
				if (!term) return true;
				return user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
			});
		});
		const counts = computed(() => {
			const list = users.value ?? [];
			return {
				total: list.length,
				admins: list.filter((user) => ["admin", "super_admin"].includes(user.type)).length,
				customers: list.filter((user) => user.type === "customer").length
			};
		});
		const modalOpen = ref(false);
		const editing = ref(null);
		const form = reactive({
			name: "",
			email: "",
			type: "customer",
			password: "",
			is_active: true,
			headline: "",
			bio: ""
		});
		const photo = ref(null);
		const photoInput = ref(null);
		function openCreate() {
			editing.value = null;
			photo.value = null;
			Object.assign(form, {
				name: "",
				email: "",
				type: "customer",
				password: "",
				is_active: true,
				headline: "",
				bio: ""
			});
			resetErrors();
			modalOpen.value = true;
		}
		async function save() {
			const body = editing.value ? {
				id: editing.value.id,
				name: form.name,
				email: form.email,
				type: form.type,
				is_active: form.is_active,
				headline: form.headline,
				bio: form.bio,
				...form.password ? { password: form.password } : {}
			} : {
				name: form.name,
				email: form.email,
				type: form.type,
				password: form.password,
				is_active: form.is_active,
				headline: form.headline,
				bio: form.bio
			};
			if (await run(async () => {
				const saved = await apiData(`/admin/users/${editing.value ? "update" : "add"}`, {
					method: "POST",
					body
				});
				if (photo.value) {
					const upload = new FormData();
					upload.append("avatar", photo.value);
					await apiUpload(`/admin/users/${saved.id}/avatar`, upload);
				}
				return saved;
			}, editing.value ? "User updated." : "User created.") === void 0) return;
			modalOpen.value = false;
			await refresh();
		}
		useToast();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_AdminStat = AdminStat_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Users",
				subtitle: "Manage administrator and student accounts.",
				icon: "users"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New user </button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New user ")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="mb-4 grid gap-3 sm:grid-cols-3">`);
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "All accounts",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(counts).total),
				icon: "users",
				tone: "blue"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Administrators",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(counts).admins),
				icon: "shield",
				tone: "violet"
			}, null, _parent));
			_push(ssrRenderComponent(_component_AdminStat, {
				label: "Students",
				value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(counts).customers),
				icon: "user",
				tone: "emerald"
			}, null, _parent));
			_push(`</div><div class="card mb-4 p-3"><div class="grid gap-2 sm:grid-cols-12"><div class="relative sm:col-span-7">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 16,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search by name or email…" aria-label="Search users"></div><div class="sm:col-span-3"><select class="field-input" aria-label="Filter by account type"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), "") : ssrLooseEqual(unref(type), "")) ? " selected" : ""}>All account types</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), "admin") : ssrLooseEqual(unref(type), "admin")) ? " selected" : ""}>Administrators</option><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), "customer") : ssrLooseEqual(unref(type), "customer")) ? " selected" : ""}>Students</option><option value="instructor"${ssrIncludeBooleanAttr(Array.isArray(unref(type)) ? ssrLooseContain(unref(type), "instructor") : ssrLooseEqual(unref(type), "instructor")) ? " selected" : ""}>Instructors</option></select></div><div class="sm:col-span-2"><button type="button" class="btn-secondary w-full">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 15
			}, null, _parent));
			_push(` Reset </button></div></div></div>`);
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(5, (i) => {
					_push(`<div class="card h-14 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load users",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(filtered).length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "users",
				title: "No users match these filters",
				message: "Try a different search term or account type.",
				"action-label": unref(search) || unref(type) ? "Clear filters" : void 0,
				onAction: ($event) => {
					search.value = "";
					type.value = "";
				}
			}, null, _parent));
			else {
				_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[640px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">User</th><th class="px-3 py-2.5 font-semibold">Type</th><th class="px-3 py-2.5 font-semibold">Joined</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(filtered), (account) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3"><div class="flex items-center gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(unref(initial)(account.name))}</span><div class="min-w-0"><p class="truncate font-semibold text-gray-900">${ssrInterpolate(account.name)} `);
					if (account.id === unref(currentUser)?.id) _push(`<span class="badge ml-1 bg-blue-50 text-blue-700 ring-blue-200">You</span>`);
					else _push(`<!---->`);
					_push(`</p><p class="truncate text-[11px] text-gray-400">${ssrInterpolate(account.email)}</p></div></div></td><td class="px-3 py-3"><span class="${ssrRenderClass([account.type === "admin" ? "bg-violet-50 text-violet-700 ring-violet-200" : "bg-gray-50 text-gray-600 ring-gray-200", "badge"])}">${ssrInterpolate(account.type === "admin" || account.type === "super_admin" ? "Administrator" : account.type === "instructor" ? "Instructor" : "Student")}</span></td><td class="px-3 py-3 text-xs text-gray-500">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(account.created_at))} `);
					if (account.is_active === false) _push(`<span class="ml-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-600">Inactive</span>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-4 py-3"><div class="flex items-center justify-end gap-1"><button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 14
					}, null, _parent));
					_push(` Edit </button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50 disabled:opacity-40"${ssrIncludeBooleanAttr(account.id === unref(currentUser)?.id) ? " disabled" : ""} aria-label="Delete user">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 15
					}, null, _parent));
					_push(`</button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modalOpen),
				title: unref(editing) ? "Edit user" : "New user",
				size: "md",
				onClose: ($event) => modalOpen.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save user" : "Create user")}</button>`);
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
					}, toDisplayString(unref(editing) ? "Save user" : "Create user"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="user-name"${_scopeId}>Name</label><input id="user-name"${ssrRenderAttr("value", unref(form).name)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("name")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("name"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="user-email"${_scopeId}>Email</label><input id="user-email"${ssrRenderAttr("value", unref(form).email)} type="email" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("email")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("email"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="user-type"${_scopeId}>Account type</label><select id="user-type" class="field-input"${_scopeId}><option value="customer"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "customer") : ssrLooseEqual(unref(form).type, "customer")) ? " selected" : ""}${_scopeId}>Student</option><option value="instructor"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "instructor") : ssrLooseEqual(unref(form).type, "instructor")) ? " selected" : ""}${_scopeId}>Instructor</option><option value="admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "admin") : ssrLooseEqual(unref(form).type, "admin")) ? " selected" : ""}${_scopeId}>Administrator</option>`);
						if (unref(form).type === "super_admin") _push(`<option value="super_admin"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "super_admin") : ssrLooseEqual(unref(form).type, "super_admin")) ? " selected" : ""}${_scopeId}>Super administrator</option>`);
						else _push(`<!---->`);
						_push(`</select>`);
						if (unref(fieldError)("type")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("type"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="user-password"${_scopeId}>${ssrInterpolate(unref(editing) ? "New password (optional)" : "Password")}</label><input id="user-password"${ssrRenderAttr("value", unref(form).password)} type="password" class="field-input" autocomplete="new-password"${ssrIncludeBooleanAttr(!unref(editing)) ? " required" : ""} minlength="6"${ssrRenderAttr("placeholder", unref(editing) ? "Leave empty to keep current" : "At least 6 characters")}${_scopeId}>`);
						if (unref(fieldError)("password")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("password"))}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (unref(form).type === "instructor") {
							_push(`<!--[--><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="user-headline"${_scopeId}>Headline (shown on the instructors page)</label><input id="user-headline"${ssrRenderAttr("value", unref(form).headline)} class="field-input" maxlength="255" placeholder="e.g. IELTS expert · 10 years teaching"${_scopeId}></div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="user-bio"${_scopeId}>Bio</label><textarea id="user-bio" rows="3" maxlength="1000" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).bio)}</textarea></div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="user-photo"${_scopeId}>Photo (JPG/PNG/WebP, max 2 MB)</label><input id="user-photo" type="file" accept="image/jpeg,image/png,image/webp" class="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}>`);
							if (unref(fieldError)("avatar")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("avatar"))}</p>`);
							else _push(`<!---->`);
							_push(`</div><!--]-->`);
						} else _push(`<!---->`);
						_push(`<label class="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${ssrIncludeBooleanAttr(unref(editing)?.id === unref(currentUser)?.id) ? " disabled" : ""}${_scopeId}> Active (inactive users cannot sign in) </label></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
						createVNode("div", { class: "sm:col-span-2" }, [
							createVNode("label", {
								class: "field-label",
								for: "user-name"
							}, "Name"),
							withDirectives(createVNode("input", {
								id: "user-name",
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
						createVNode("div", { class: "sm:col-span-2" }, [
							createVNode("label", {
								class: "field-label",
								for: "user-email"
							}, "Email"),
							withDirectives(createVNode("input", {
								id: "user-email",
								"onUpdate:modelValue": ($event) => unref(form).email = $event,
								type: "email",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).email]]),
							unref(fieldError)("email") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("email")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "user-type"
							}, "Account type"),
							withDirectives(createVNode("select", {
								id: "user-type",
								"onUpdate:modelValue": ($event) => unref(form).type = $event,
								class: "field-input"
							}, [
								createVNode("option", { value: "customer" }, "Student"),
								createVNode("option", { value: "instructor" }, "Instructor"),
								createVNode("option", { value: "admin" }, "Administrator"),
								unref(form).type === "super_admin" ? (openBlock(), createBlock("option", {
									key: 0,
									value: "super_admin"
								}, "Super administrator")) : createCommentVNode("", true)
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).type]]),
							unref(fieldError)("type") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("type")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "user-password"
							}, toDisplayString(unref(editing) ? "New password (optional)" : "Password"), 1),
							withDirectives(createVNode("input", {
								id: "user-password",
								"onUpdate:modelValue": ($event) => unref(form).password = $event,
								type: "password",
								class: "field-input",
								autocomplete: "new-password",
								required: !unref(editing),
								minlength: "6",
								placeholder: unref(editing) ? "Leave empty to keep current" : "At least 6 characters"
							}, null, 8, [
								"onUpdate:modelValue",
								"required",
								"placeholder"
							]), [[vModelText, unref(form).password]]),
							unref(fieldError)("password") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("password")), 1)) : createCommentVNode("", true)
						]),
						unref(form).type === "instructor" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
							createVNode("div", { class: "sm:col-span-2" }, [createVNode("label", {
								class: "field-label",
								for: "user-headline"
							}, "Headline (shown on the instructors page)"), withDirectives(createVNode("input", {
								id: "user-headline",
								"onUpdate:modelValue": ($event) => unref(form).headline = $event,
								class: "field-input",
								maxlength: "255",
								placeholder: "e.g. IELTS expert · 10 years teaching"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).headline]])]),
							createVNode("div", { class: "sm:col-span-2" }, [createVNode("label", {
								class: "field-label",
								for: "user-bio"
							}, "Bio"), withDirectives(createVNode("textarea", {
								id: "user-bio",
								"onUpdate:modelValue": ($event) => unref(form).bio = $event,
								rows: "3",
								maxlength: "1000",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).bio]])]),
							createVNode("div", { class: "sm:col-span-2" }, [
								createVNode("label", {
									class: "field-label",
									for: "user-photo"
								}, "Photo (JPG/PNG/WebP, max 2 MB)"),
								createVNode("input", {
									id: "user-photo",
									ref_key: "photoInput",
									ref: photoInput,
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									class: "block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
									onChange: ($event) => photo.value = $event.target.files?.[0] ?? null
								}, null, 40, ["onChange"]),
								unref(fieldError)("avatar") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("avatar")), 1)) : createCommentVNode("", true)
							])
						], 64)) : createCommentVNode("", true),
						createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700 sm:col-span-2" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary",
							disabled: unref(editing)?.id === unref(currentUser)?.id
						}, null, 8, ["onUpdate:modelValue", "disabled"]), [[vModelCheckbox, unref(form).is_active]]), createTextVNode(" Active (inactive users cannot sign in) ")])
					])], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/users.vue
var _sfc_setup = users_vue_vue_type_script_setup_true_lang_default.setup;
users_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var users_default = users_vue_vue_type_script_setup_true_lang_default;

export { users_default as default };
//# sourceMappingURL=users-Dfwzwebl.mjs.map
