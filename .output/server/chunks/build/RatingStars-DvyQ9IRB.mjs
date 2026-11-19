import { s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';

// app/components/RatingStars.vue?vue&type=script&setup=true&lang.ts
var RatingStars_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RatingStars",
	__ssrInlineRender: true,
	props: {
		rating: { default: 0 },
		count: { default: 0 },
		size: { default: 15 },
		showValue: {
			type: Boolean,
			default: true
		}
	},
	setup(__props) {
		const props = __props;
		const percent = computed(() => Math.max(0, Math.min(100, Number(props.rating || 0) / 5 * 100)));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<span${ssrRenderAttrs(mergeProps({
				class: "inline-flex items-center gap-1.5",
				title: `${Number(__props.rating).toFixed(1)} out of 5`
			}, _attrs))}><span class="relative inline-flex"><span class="flex gap-0.5 text-gray-300"><!--[-->`);
			ssrRenderList$2(5, (n) => {
				_push(ssrRenderComponent(_component_BaseIcon, {
					key: `bg-${n}`,
					name: "star",
					filled: "",
					size: __props.size
				}, null, _parent));
			});
			_push(`<!--]--></span><span class="absolute inset-0 flex gap-0.5 overflow-hidden text-amber-400" style="${ssrRenderStyle({ width: `${unref(percent)}%` })}"><!--[-->`);
			ssrRenderList$2(5, (n) => {
				_push(ssrRenderComponent(_component_BaseIcon, {
					key: `fg-${n}`,
					name: "star",
					filled: "",
					size: __props.size
				}, null, _parent));
			});
			_push(`<!--]--></span></span>`);
			if (__props.showValue) _push(`<span class="text-xs font-semibold text-gray-700">${ssrInterpolate(Number(__props.rating || 0).toFixed(1))}</span>`);
			else _push(`<!---->`);
			if (__props.count) _push(`<span class="text-xs text-gray-500">(${ssrInterpolate(__props.count)})</span>`);
			else _push(`<!---->`);
			_push(`</span>`);
		};
	}
});
// app/components/RatingStars.vue
var _sfc_setup = RatingStars_vue_vue_type_script_setup_true_lang_default.setup;
RatingStars_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RatingStars.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RatingStars_default = Object.assign(RatingStars_vue_vue_type_script_setup_true_lang_default, { __name: "RatingStars" });

export { RatingStars_default as R };
//# sourceMappingURL=RatingStars-DvyQ9IRB.mjs.map
