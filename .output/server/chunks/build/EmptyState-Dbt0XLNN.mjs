import { B as BaseIcon_default, N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

// app/components/EmptyState.vue?vue&type=script&setup=true&lang.ts
var EmptyState_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "EmptyState",
	__ssrInlineRender: true,
	props: {
		icon: { default: "info" },
		title: { default: "Nothing here yet" },
		message: { default: "There is no content to show right now." },
		actionLabel: {},
		actionTo: {}
	},
	emits: ["action"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white/70 px-6 py-14 text-center" }, _attrs))}><div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-light text-oc-primary">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: __props.icon,
				size: 26
			}, null, _parent));
			_push(`</div><h3 class="text-lg font-bold text-gray-800">${ssrInterpolate(__props.title)}</h3><p class="mt-1 max-w-md text-sm text-gray-500">${ssrInterpolate(__props.message)}</p>`);
			if (__props.actionTo) _push(ssrRenderComponent(_component_NuxtLink, {
				to: __props.actionTo,
				class: "btn-primary mt-6"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(__props.actionLabel || "Continue")}`);
					else return [createTextVNode(toDisplayString(__props.actionLabel || "Continue"), 1)];
				}),
				_: 1
			}, _parent));
			else if (__props.actionLabel) _push(`<button type="button" class="btn-primary mt-6">${ssrInterpolate(__props.actionLabel)}</button>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/components/EmptyState.vue
var _sfc_setup = EmptyState_vue_vue_type_script_setup_true_lang_default.setup;
EmptyState_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EmptyState.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var EmptyState_default = Object.assign(EmptyState_vue_vue_type_script_setup_true_lang_default, { __name: "EmptyState" });

export { EmptyState_default as E };
//# sourceMappingURL=EmptyState-Dbt0XLNN.mjs.map
