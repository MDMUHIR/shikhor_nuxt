import { s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

// app/components/LoadingSkeleton.vue?vue&type=script&setup=true&lang.ts
var LoadingSkeleton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LoadingSkeleton",
	__ssrInlineRender: true,
	props: {
		count: { default: 6 },
		type: { default: "card" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.type === "card") {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" }, _attrs))}><!--[-->`);
				ssrRenderList$2(__props.count, (i) => {
					_push(`<div class="card animate-pulse overflow-hidden"><div class="aspect-video bg-gray-200"></div><div class="space-y-3 p-5"><div class="h-3 w-20 rounded bg-gray-200"></div><div class="h-4 w-4/5 rounded bg-gray-200"></div><div class="h-4 w-2/3 rounded bg-gray-200"></div><div class="h-5 w-24 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><!--[-->`);
				ssrRenderList$2(__props.count, (i) => {
					_push(`<div class="card flex animate-pulse items-center gap-4 p-4"><div class="h-16 w-16 rounded-xl bg-gray-200"></div><div class="flex-1 space-y-2"><div class="h-4 w-1/3 rounded bg-gray-200"></div><div class="h-3 w-1/2 rounded bg-gray-200"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
		};
	}
});
// app/components/LoadingSkeleton.vue
var _sfc_setup = LoadingSkeleton_vue_vue_type_script_setup_true_lang_default.setup;
LoadingSkeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingSkeleton.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var LoadingSkeleton_default = Object.assign(LoadingSkeleton_vue_vue_type_script_setup_true_lang_default, { __name: "LoadingSkeleton" });

export { LoadingSkeleton_default as L };
//# sourceMappingURL=LoadingSkeleton-BdeYArX2.mjs.map
