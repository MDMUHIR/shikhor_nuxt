import { B as BaseIcon_default } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';

// app/components/AdminStat.vue?vue&type=script&setup=true&lang.ts
var AdminStat_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminStat",
	__ssrInlineRender: true,
	props: {
		label: {},
		value: {},
		icon: { default: "chart" },
		hint: {},
		tone: { default: "blue" }
	},
	setup(__props) {
		const tones = {
			blue: "neo-sky",
			emerald: "neo-mint",
			amber: "neo-sun",
			violet: "neo-lavender",
			rose: "neo-pink",
			gray: "neo-cream"
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: ["card flex items-center gap-2.5 p-3 sm:gap-3 sm:p-4", tones[__props.tone]] }, _attrs))}><span class="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-neo-ink bg-white text-neo-ink min-[400px]:flex">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: __props.icon,
				size: 20
			}, null, _parent));
			_push(`</span><div class="min-w-0"><p class="truncate text-xs font-semibold text-gray-700">${ssrInterpolate(__props.label)}</p><p class="break-words text-lg font-extrabold leading-tight text-gray-900 sm:text-xl">${ssrInterpolate(__props.value)}</p>`);
			if (__props.hint) _push(`<p class="truncate text-[11px] text-gray-600">${ssrInterpolate(__props.hint)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
// app/components/AdminStat.vue
var _sfc_setup = AdminStat_vue_vue_type_script_setup_true_lang_default.setup;
AdminStat_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AdminStat.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminStat_default = Object.assign(AdminStat_vue_vue_type_script_setup_true_lang_default, { __name: "AdminStat" });

export { AdminStat_default as A };
//# sourceMappingURL=AdminStat-BlV-WKX1.mjs.map
