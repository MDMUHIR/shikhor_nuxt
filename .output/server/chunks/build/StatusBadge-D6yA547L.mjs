import { d as statusClasses, s as statusLabel } from './format-DP0uQCCC.mjs';
import { defineComponent, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';

// app/components/StatusBadge.vue?vue&type=script&setup=true&lang.ts
var StatusBadge_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatusBadge",
	__ssrInlineRender: true,
	props: { status: {} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<span${ssrRenderAttrs(mergeProps({ class: ["badge", ("statusClasses" in _ctx ? _ctx.statusClasses : unref(statusClasses))(__props.status)] }, _attrs))}>${ssrInterpolate(("statusLabel" in _ctx ? _ctx.statusLabel : unref(statusLabel))(__props.status))}</span>`);
		};
	}
});
// app/components/StatusBadge.vue
var _sfc_setup = StatusBadge_vue_vue_type_script_setup_true_lang_default.setup;
StatusBadge_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/StatusBadge.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var StatusBadge_default = Object.assign(StatusBadge_vue_vue_type_script_setup_true_lang_default, { __name: "StatusBadge" });

export { StatusBadge_default as S };
//# sourceMappingURL=StatusBadge-D6yA547L.mjs.map
