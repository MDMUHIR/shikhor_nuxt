import { B as BaseIcon_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

// app/components/ErrorState.vue?vue&type=script&setup=true&lang.ts
var ErrorState_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ErrorState",
	__ssrInlineRender: true,
	props: {
		message: {},
		title: {}
	},
	emits: ["retry"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center rounded-2xl border border-rose-100 bg-rose-50/60 px-6 py-12 text-center" }, _attrs))}><div class="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-rose-600 shadow-sm">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "alert-circle",
				size: 24
			}, null, _parent));
			_push(`</div><h3 class="text-base font-bold text-gray-900">${ssrInterpolate(__props.title || "Something went wrong")}</h3><p class="mt-1 max-w-md text-sm text-gray-600">${ssrInterpolate(__props.message || "We could not load this content.")}</p><div class="mt-5 flex flex-wrap items-center justify-center gap-2"><button type="button" class="btn-secondary">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "refresh",
				size: 16
			}, null, _parent));
			_push(` Try again </button>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div>`);
		};
	}
});
// app/components/ErrorState.vue
var _sfc_setup = ErrorState_vue_vue_type_script_setup_true_lang_default.setup;
ErrorState_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ErrorState.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ErrorState_default = Object.assign(ErrorState_vue_vue_type_script_setup_true_lang_default, { __name: "ErrorState" });

export { ErrorState_default as E };
//# sourceMappingURL=ErrorState-ssgGFunz.mjs.map
