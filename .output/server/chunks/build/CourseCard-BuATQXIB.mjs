import { N as NuxtLink, B as BaseIcon_default } from '../virtual/entry.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { m as mediaUrl, i as imageFallback } from './media-DFMfymxc.mjs';
import { b as formatMoney, h as discountPercent, c as formatNumber } from './format-owYeCpVb.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

// app/components/CourseCard.vue?vue&type=script&setup=true&lang.ts
var CourseCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CourseCard",
	__ssrInlineRender: true,
	props: {
		course: {},
		compact: {
			type: Boolean,
			default: false
		}
	},
	setup(__props) {
		const props = __props;
		const image = computed(() => mediaUrl(props.course.thumbnail));
		const price = computed(() => formatMoney(props.course.effective_price));
		const original = computed(() => props.course.offer_price && props.course.offer_price < props.course.price ? formatMoney(props.course.price) : "");
		const off = computed(() => discountPercent(props.course.price, props.course.offer_price));
		const accessLabel = computed(() => props.course.access_type === "lifetime" ? "Lifetime access" : `${props.course.effective_access_days} days access`);
		const levelLabel = computed(() => {
			return {
				all: "All levels",
				beginner: "Beginner",
				intermediate: "Intermediate",
				advanced: "Advanced"
			}[props.course.level] || props.course.level;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_RatingStars = RatingStars_default;
			_push(ssrRenderComponent(_component_NuxtLink, mergeProps({
				to: `/courses/${__props.course.slug}`,
				class: "group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="relative aspect-video overflow-hidden bg-gray-100"${_scopeId}><img${ssrRenderAttr("src", unref(image))}${ssrRenderAttr("alt", __props.course.title)} loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"${_scopeId}><span class="absolute left-3 top-3 rounded-full bg-oc-primary px-2.5 py-1 text-[11px] font-semibold text-white"${_scopeId}>${ssrInterpolate(__props.course.category?.name || unref(levelLabel))}</span>`);
						if (unref(off)) _push(`<span class="absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white"${_scopeId}>-${ssrInterpolate(unref(off))}%</span>`);
						else _push(`<!---->`);
						if (__props.course.is_featured) {
							_push(`<span class="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white"${_scopeId}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "sparkles",
								size: 12
							}, null, _parent, _scopeId));
							_push(` Featured </span>`);
						} else _push(`<!---->`);
						_push(`</div><div class="flex flex-1 flex-col p-5"${_scopeId}><div class="mb-2 flex items-center justify-between gap-2 text-xs text-gray-500"${_scopeId}><span class="inline-flex items-center gap-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "layers",
							size: 13
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(__props.course.total_lessons)} lessons </span>`);
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: __props.course.rating?.average,
							count: __props.course.rating?.count,
							size: 13
						}, null, _parent, _scopeId));
						_push(`</div><h3 class="line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary"${_scopeId}>${ssrInterpolate(__props.course.title)}</h3>`);
						if (__props.course.subtitle && !__props.compact) _push(`<p class="mt-1.5 line-clamp-2 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(__props.course.subtitle)}</p>`);
						else _push(`<!---->`);
						_push(`<div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500"${_scopeId}><span class="inline-flex items-center gap-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "clock",
							size: 12
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(unref(accessLabel))}</span><span class="inline-flex items-center gap-1"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "users",
							size: 12
						}, null, _parent, _scopeId));
						_push(` ${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(__props.course.total_students))} students</span></div><div class="mt-auto flex items-end justify-between gap-2 pt-4"${_scopeId}><div class="flex items-baseline gap-1.5"${_scopeId}><span class="text-xl font-extrabold text-oc-primary"${_scopeId}>${ssrInterpolate(unref(price))}</span>`);
						if (unref(original)) _push(`<span class="text-xs text-gray-400 line-through"${_scopeId}>${ssrInterpolate(unref(original))}</span>`);
						else _push(`<!---->`);
						_push(`</div><span class="text-xs font-semibold text-gray-500"${_scopeId}>${ssrInterpolate(unref(levelLabel))}</span></div></div>`);
					} else return [createVNode("div", { class: "relative aspect-video overflow-hidden bg-gray-100" }, [
						createVNode("img", {
							src: unref(image),
							alt: __props.course.title,
							loading: "lazy",
							class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105",
							onError: "imageFallback" in _ctx ? _ctx.imageFallback : unref(imageFallback)
						}, null, 40, [
							"src",
							"alt",
							"onError"
						]),
						createVNode("span", { class: "absolute left-3 top-3 rounded-full bg-oc-primary px-2.5 py-1 text-[11px] font-semibold text-white" }, toDisplayString(__props.course.category?.name || unref(levelLabel)), 1),
						unref(off) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "absolute right-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[11px] font-bold text-white"
						}, "-" + toDisplayString(unref(off)) + "%", 1)) : createCommentVNode("", true),
						__props.course.is_featured ? (openBlock(), createBlock("span", {
							key: 1,
							class: "absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white"
						}, [createVNode(_component_BaseIcon, {
							name: "sparkles",
							size: 12
						}), createTextVNode(" Featured ")])) : createCommentVNode("", true)
					]), createVNode("div", { class: "flex flex-1 flex-col p-5" }, [
						createVNode("div", { class: "mb-2 flex items-center justify-between gap-2 text-xs text-gray-500" }, [createVNode("span", { class: "inline-flex items-center gap-1" }, [createVNode(_component_BaseIcon, {
							name: "layers",
							size: 13
						}), createTextVNode(" " + toDisplayString(__props.course.total_lessons) + " lessons ", 1)]), createVNode(_component_RatingStars, {
							rating: __props.course.rating?.average,
							count: __props.course.rating?.count,
							size: 13
						}, null, 8, ["rating", "count"])]),
						createVNode("h3", { class: "line-clamp-2 text-base font-bold leading-snug text-gray-900 transition group-hover:text-oc-primary" }, toDisplayString(__props.course.title), 1),
						__props.course.subtitle && !__props.compact ? (openBlock(), createBlock("p", {
							key: 0,
							class: "mt-1.5 line-clamp-2 text-sm text-gray-500"
						}, toDisplayString(__props.course.subtitle), 1)) : createCommentVNode("", true),
						createVNode("div", { class: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500" }, [createVNode("span", { class: "inline-flex items-center gap-1" }, [createVNode(_component_BaseIcon, {
							name: "clock",
							size: 12
						}), createTextVNode(" " + toDisplayString(unref(accessLabel)), 1)]), createVNode("span", { class: "inline-flex items-center gap-1" }, [createVNode(_component_BaseIcon, {
							name: "users",
							size: 12
						}), createTextVNode(" " + toDisplayString(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(__props.course.total_students)) + " students", 1)])]),
						createVNode("div", { class: "mt-auto flex items-end justify-between gap-2 pt-4" }, [createVNode("div", { class: "flex items-baseline gap-1.5" }, [createVNode("span", { class: "text-xl font-extrabold text-oc-primary" }, toDisplayString(unref(price)), 1), unref(original) ? (openBlock(), createBlock("span", {
							key: 0,
							class: "text-xs text-gray-400 line-through"
						}, toDisplayString(unref(original)), 1)) : createCommentVNode("", true)]), createVNode("span", { class: "text-xs font-semibold text-gray-500" }, toDisplayString(unref(levelLabel)), 1)])
					])];
				}),
				_: 1
			}, _parent));
		};
	}
});
// app/components/CourseCard.vue
var _sfc_setup = CourseCard_vue_vue_type_script_setup_true_lang_default.setup;
CourseCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CourseCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CourseCard_default = Object.assign(CourseCard_vue_vue_type_script_setup_true_lang_default, { __name: "CourseCard" });

export { CourseCard_default as C };
//# sourceMappingURL=CourseCard-BuATQXIB.mjs.map
