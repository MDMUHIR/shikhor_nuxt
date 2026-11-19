import { _ as _plugin_vue_export_helper_default, s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

// app/components/AppToast.vue?vue&type=script&setup=true&lang.ts
var AppToast_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppToast",
	__ssrInlineRender: true,
	setup(__props) {
		const { toasts} = useToast();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end" }, _attrs))} data-v-1ca4c90a><!--[-->`);
			ssrRenderList$2(unref(toasts), (toast) => {
				_push(`<div class="${ssrRenderClass([{
					"border-emerald-200 bg-emerald-50/95 text-emerald-900": toast.type === "success",
					"border-rose-200 bg-rose-50/95 text-rose-900": toast.type === "error",
					"border-blue-200 bg-blue-50/95 text-blue-900": toast.type === "info"
				}, "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur"])}" role="status" aria-live="polite" data-v-1ca4c90a>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: toast.type === "success" ? "check-circle" : toast.type === "error" ? "alert-circle" : "info",
					size: 20,
					class: "mt-0.5"
				}, null, _parent));
				_push(`<div class="min-w-0 flex-1" data-v-1ca4c90a>`);
				if (toast.title) _push(`<p class="text-sm font-bold" data-v-1ca4c90a>${ssrInterpolate(toast.title)}</p>`);
				else _push(`<!---->`);
				_push(`<p class="${ssrRenderClass([{ "mt-0.5": toast.title }, "text-sm"])}" data-v-1ca4c90a>${ssrInterpolate(toast.message)}</p></div><button type="button" class="rounded p-1 opacity-60 transition hover:bg-black/5 hover:opacity-100" aria-label="Dismiss" data-v-1ca4c90a>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "x",
					size: 15
				}, null, _parent));
				_push(`</button></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
// app/components/AppToast.vue
var _sfc_setup = AppToast_vue_vue_type_script_setup_true_lang_default.setup;
AppToast_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppToast.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppToast_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppToast_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1ca4c90a"]]), { __name: "AppToast" });

export { AppToast_default as A };
//# sourceMappingURL=AppToast-BVq0FJQZ.mjs.map
