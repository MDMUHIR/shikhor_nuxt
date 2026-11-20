import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { c as useSeoMeta, b as useApi, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
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

// app/pages/notifications.vue?vue&type=script&setup=true&lang.ts
var notifications_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "notifications",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Notifications — Shikhor Academy",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const toast = useToast();
		const page = ref(1);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("notifications-page", () => apiData("/notifications", { query: {
			page: page.value,
			per_page: 20
		} }), { watch: [page] })), __temp = await __temp, __restore(), __temp);
		const items = computed(() => data.value?.notifications?.data ?? []);
		const unread = computed(() => data.value?.unread_count ?? 0);
		async function markRead(item) {
			if (item.read_at) return;
			try {
				await apiData(`/notifications/${item.id}/read`, { method: "POST" });
				item.read_at = (/* @__PURE__ */ new Date()).toISOString();
				if (data.value) data.value.unread_count = Math.max(0, data.value.unread_count - 1);
			} catch (err) {
				toast.error(err.message);
			}
		}
		function linkFor(item) {
			if (item.kind === "certificate_issued") return "/certificates";
			if (item.kind === "course_enrolled") return "/my-courses";
			if (item.kind === "payment_received" && item.data?.order_id) return `/orders/${item.data.order_id}`;
			return null;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[800px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><div class="flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Notifications</h1><p class="mt-1 text-sm text-gray-500">${ssrInterpolate(unref(unread))} unread</p></div>`);
			if (unref(unread)) _push(`<button type="button" class="btn-secondary">Mark all as read</button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 space-y-2"><!--[-->`);
				ssrRenderList$2(5, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load notifications",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(items).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "check-circle",
				title: "You're all caught up",
				message: "Payment, enrollment and certificate updates will show up here."
			}, null, _parent));
			else {
				_push(`<ul class="mt-6 space-y-2"><!--[-->`);
				ssrRenderList$2(unref(items), (item) => {
					_push(`<li class="${ssrRenderClass([item.read_at ? "" : "border-oc-primary/40 bg-brand-light/40", "card flex items-start gap-3 p-4"])}"><span class="${ssrRenderClass([item.read_at ? "bg-gray-200" : "bg-oc-primary", "mt-1.5 h-2 w-2 shrink-0 rounded-full"])}"></span><div class="min-w-0 flex-1"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(item.title)}</p><p class="text-sm text-gray-600">${ssrInterpolate(item.message)}</p><p class="mt-1 text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(item.created_at, true))}</p></div><div class="flex shrink-0 gap-2">`);
					if (linkFor(item)) _push(ssrRenderComponent(_component_NuxtLink, {
						to: linkFor(item),
						class: "btn-ghost !px-2 !py-1 text-xs",
						onClick: ($event) => markRead(item)
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View`);
							else return [createTextVNode("View")];
						}),
						_: 2
					}, _parent));
					else _push(`<!---->`);
					if (!item.read_at) _push(`<button type="button" class="btn-ghost !px-2 !py-1 text-xs">Mark read</button>`);
					else _push(`<!---->`);
					_push(`</div></li>`);
				});
				_push(`<!--]--></ul>`);
			}
			_push(`<div class="flex justify-center pt-4">`);
			_push(ssrRenderComponent(_component_PaginationLinks, {
				"current-page": unref(data)?.notifications?.current_page ?? 1,
				"last-page": unref(data)?.notifications?.last_page ?? 1,
				onChange: (value) => page.value = value
			}, null, _parent));
			_push(`</div></div>`);
		};
	}
});
// app/pages/notifications.vue
var _sfc_setup = notifications_vue_vue_type_script_setup_true_lang_default.setup;
notifications_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/notifications.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var notifications_default = notifications_vue_vue_type_script_setup_true_lang_default;

export { notifications_default as default };
//# sourceMappingURL=notifications-DQ_W1Wrh.mjs.map
