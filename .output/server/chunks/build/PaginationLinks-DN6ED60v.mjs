import { B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

// app/components/PaginationLinks.vue?vue&type=script&setup=true&lang.ts
var PaginationLinks_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PaginationLinks",
	__ssrInlineRender: true,
	props: {
		currentPage: {},
		lastPage: {},
		total: {}
	},
	emits: ["change"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const pages = computed(() => {
			const total = props.lastPage;
			const current = props.currentPage;
			if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
			const set = /* @__PURE__ */ new Set([
				1,
				total,
				current,
				current - 1,
				current + 1
			]);
			if (current <= 3) [
				2,
				3,
				4
			].forEach((p) => set.add(p));
			if (current >= total - 2) [
				total - 3,
				total - 2,
				total - 1
			].forEach((p) => set.add(p));
			const sorted = [...set].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
			const result = [];
			sorted.forEach((page, index) => {
				if (index > 0 && page - sorted[index - 1] > 1) result.push("...");
				result.push(page);
			});
			return result;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			if (__props.lastPage > 1) {
				_push(`<nav${ssrRenderAttrs(mergeProps({
					class: "flex flex-wrap items-center justify-center gap-2",
					"aria-label": "Pagination"
				}, _attrs))}><button class="btn-secondary px-3 py-2"${ssrIncludeBooleanAttr(__props.currentPage <= 1) ? " disabled" : ""} aria-label="Previous page">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "chevron-left",
					size: 16
				}, null, _parent));
				_push(`</button><!--[-->`);
				ssrRenderList$2(unref(pages), (page, index) => {
					_push(`<!--[-->`);
					if (page === "...") _push(`<span class="px-2 text-gray-400">…</span>`);
					else _push(`<button class="${ssrRenderClass([page === __props.currentPage ? "bg-oc-primary text-white" : "border border-gray-200 bg-white text-gray-700 hover:border-oc-primary/40 hover:text-oc-primary", "min-w-10 rounded-lg px-3 py-2 text-sm font-semibold transition"])}">${ssrInterpolate(page)}</button>`);
					_push(`<!--]-->`);
				});
				_push(`<!--]--><button class="btn-secondary px-3 py-2"${ssrIncludeBooleanAttr(__props.currentPage >= __props.lastPage) ? " disabled" : ""} aria-label="Next page">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "chevron-right",
					size: 16
				}, null, _parent));
				_push(`</button>`);
				if (__props.total) _push(`<span class="ml-2 text-xs text-gray-500">${ssrInterpolate(__props.total)} results</span>`);
				else _push(`<!---->`);
				_push(`</nav>`);
			} else _push(`<!---->`);
		};
	}
});
// app/components/PaginationLinks.vue
var _sfc_setup = PaginationLinks_vue_vue_type_script_setup_true_lang_default.setup;
PaginationLinks_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaginationLinks.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var PaginationLinks_default = Object.assign(PaginationLinks_vue_vue_type_script_setup_true_lang_default, { __name: "PaginationLinks" });

export { PaginationLinks_default as P };
//# sourceMappingURL=PaginationLinks-DN6ED60v.mjs.map
