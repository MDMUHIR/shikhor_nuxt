import { B as BaseIcon_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

// app/components/AdminPageHeader.vue?vue&type=script&setup=true&lang.ts
var AdminPageHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminPageHeader",
	__ssrInlineRender: true,
	props: {
		title: {},
		subtitle: {},
		icon: { default: "dashboard" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-6 flex flex-wrap items-start justify-between gap-4" }, _attrs))}><div class="flex items-start gap-3"><span class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-light text-oc-primary">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: __props.icon,
				size: 22
			}, null, _parent));
			_push(`</span><div><h1 class="text-xl font-extrabold text-gray-900 md:text-2xl">${ssrInterpolate(__props.title)}</h1>`);
			if (__props.subtitle) _push(`<p class="mt-0.5 max-w-2xl text-sm text-gray-500">${ssrInterpolate(__props.subtitle)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="flex flex-wrap items-center gap-2">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></div>`);
		};
	}
});
// app/components/AdminPageHeader.vue
var _sfc_setup = AdminPageHeader_vue_vue_type_script_setup_true_lang_default.setup;
AdminPageHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminPageHeader.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminPageHeader_default = Object.assign(AdminPageHeader_vue_vue_type_script_setup_true_lang_default, { __name: "AdminPageHeader" });

export { AdminPageHeader_default as A };
//# sourceMappingURL=AdminPageHeader-rLJAWqO6.mjs.map
