import { _ as _plugin_vue_export_helper_default, B as BaseIcon_default } from '../virtual/entry.mjs';
import { defineComponent, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

// app/components/AppModal.vue?vue&type=script&setup=true&lang.ts
var AppModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppModal",
	__ssrInlineRender: true,
	props: {
		open: { type: Boolean },
		title: { default: "" },
		description: { default: "" },
		size: { default: "md" }
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const width = computed(() => {
			return {
				sm: "max-w-md",
				md: "max-w-xl",
				lg: "max-w-3xl",
				xl: "max-w-5xl"
			}[props.size];
		});
		watch(() => props.open, (open) => {});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.open) {
					_push(`<div class="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-4" data-v-91caffc3><div class="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" aria-hidden="true" data-v-91caffc3></div><div class="${ssrRenderClass([unref(width), "relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"])}" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", __props.title || "Dialog")} data-v-91caffc3><div class="flex items-start justify-between gap-4 border-b border-gray-100 px-5 py-4" data-v-91caffc3><div data-v-91caffc3>`);
					if (__props.title) _push(`<h2 class="text-lg font-bold text-gray-900" data-v-91caffc3>${ssrInterpolate(__props.title)}</h2>`);
					else _push(`<!---->`);
					if (__props.description) _push(`<p class="mt-0.5 text-sm text-gray-500" data-v-91caffc3>${ssrInterpolate(__props.description)}</p>`);
					else _push(`<!---->`);
					_push(`</div><button type="button" class="btn-ghost -mr-1" aria-label="Close dialog" data-v-91caffc3>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "x",
						size: 20
					}, null, _parent));
					_push(`</button></div><div class="overflow-y-auto px-5 py-5" data-v-91caffc3>`);
					ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
					_push(`</div>`);
					if (_ctx.$slots.footer) {
						_push(`<div class="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3" data-v-91caffc3>`);
						ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`</div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
// app/components/AppModal.vue
var _sfc_setup = AppModal_vue_vue_type_script_setup_true_lang_default.setup;
AppModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AppModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AppModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-91caffc3"]]), { __name: "AppModal" });

export { AppModal_default as A };
//# sourceMappingURL=AppModal-CdCNCKrW.mjs.map
