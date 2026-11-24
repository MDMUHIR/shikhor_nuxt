import { m as mediaUrl, N as NuxtLink, B as BaseIcon_default, i as imageFallback } from '../virtual/entry.mjs';
import { a as formatDate, c as formatNumber, e as excerpt } from './format-DP0uQCCC.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

// app/components/BlogCard.vue?vue&type=script&setup=true&lang.ts
var BlogCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BlogCard",
	__ssrInlineRender: true,
	props: { blog: {} },
	setup(__props) {
		const props = __props;
		const image = computed(() => mediaUrl(props.blog.image));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(ssrRenderComponent(_component_NuxtLink, mergeProps({
				to: `/blog/${__props.blog.id}`,
				class: "card group flex h-full flex-col overflow-hidden"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative aspect-[16/10] overflow-hidden bg-gray-100"${_scopeId}><img${ssrRenderAttr("src", unref(image))}${ssrRenderAttr("alt", __props.blog.title)} loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"${_scopeId}></div><div class="flex flex-1 flex-col p-5"${_scopeId}><div class="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-500"${_scopeId}><span class="inline-flex items-center gap-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "calendar",
							size: 12
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(__props.blog.published_at))}</span><span class="inline-flex items-center gap-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "eye",
							size: 12
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(__props.blog.views))}</span></div><h3 class="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary"${_scopeId}>${ssrInterpolate(__props.blog.title)}</h3><p class="mt-2 line-clamp-3 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(("excerpt" in _ctx ? _ctx.excerpt : unref(excerpt))(__props.blog.content, 140))}</p><div class="mt-auto flex items-center justify-between pt-4 text-xs text-gray-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(__props.blog.author?.name)}</span><span class="inline-flex items-center gap-1 font-semibold text-oc-primary"${_scopeId}>Read `);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "arrow-right",
							size: 13
						}, null, _parent, _scopeId));
						_push(`</span></div></div>`);
					} else return [createVNode("div", { class: "relative aspect-[16/10] overflow-hidden bg-gray-100" }, [createVNode("img", {
						src: unref(image),
						alt: __props.blog.title,
						loading: "lazy",
						class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
						onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
					}, null, 40, [
						"src",
						"alt",
						"onError"
					])]), createVNode("div", { class: "flex flex-1 flex-col p-5" }, [
						createVNode("div", { class: "mb-2 flex flex-wrap items-center gap-2 text-[11px] text-gray-500" }, [createVNode("span", { class: "inline-flex items-center gap-1" }, [createVNode(_component_BaseIcon, {
							name: "calendar",
							size: 12
						}), createTextVNode(" " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(__props.blog.published_at)), 1)]), createVNode("span", { class: "inline-flex items-center gap-1" }, [createVNode(_component_BaseIcon, {
							name: "eye",
							size: 12
						}), createTextVNode(" " + toDisplayString(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(__props.blog.views)), 1)])]),
						createVNode("h3", { class: "line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary" }, toDisplayString(__props.blog.title), 1),
						createVNode("p", { class: "mt-2 line-clamp-3 text-sm text-gray-500" }, toDisplayString(("excerpt" in _ctx ? _ctx.excerpt : unref(excerpt))(__props.blog.content, 140)), 1),
						createVNode("div", { class: "mt-auto flex items-center justify-between pt-4 text-xs text-gray-500" }, [createVNode("span", null, toDisplayString(__props.blog.author?.name), 1), createVNode("span", { class: "inline-flex items-center gap-1 font-semibold text-oc-primary" }, [createTextVNode("Read "), createVNode(_component_BaseIcon, {
							name: "arrow-right",
							size: 13
						})])])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/components/BlogCard.vue
var _sfc_setup = BlogCard_vue_vue_type_script_setup_true_lang_default.setup;
BlogCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BlogCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BlogCard_default = Object.assign(BlogCard_vue_vue_type_script_setup_true_lang_default, { __name: "BlogCard" });

export { BlogCard_default as B };
//# sourceMappingURL=BlogCard-DSThImtk.mjs.map
