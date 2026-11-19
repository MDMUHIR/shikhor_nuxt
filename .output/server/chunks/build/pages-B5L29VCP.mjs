import { L as LoadingSkeleton_default } from './LoadingSkeleton-BdeYArX2.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { t as appDiagnostics, b as useApi, c as useSeoMeta, s as ssrRenderList$2, B as BaseIcon_default, N as NuxtLink } from '../virtual/entry.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { C as CourseCard_default } from './CourseCard-DYMJOZvd.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { P as ProductCard_default } from './ProductCard-5U3T_spi.mjs';
import { B as BlogCard_default } from './BlogCard-BW4roZtV.mjs';
import { i as initials } from './format-eJzdzGa2.mjs';
import { defineComponent, withAsyncContext, computed, unref, withCtx, createTextVNode, createVNode, toDisplayString, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

// node_modules/nuxt/dist/app/compat/interval.js
var setInterval = (() => {
	appDiagnostics.NUXT_E1004();
});

// app/components/HeroCarousel.vue?vue&type=script&setup=true&lang.ts
var HeroCarousel_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroCarousel",
	__ssrInlineRender: true,
	props: {
		banners: {},
		title: {},
		subtitle: {}
	},
	setup(__props) {
		const props = __props;
		const slides = computed(() => props.banners.map((banner) => ({
			id: banner.id,
			title: banner.title || "Learn without limits",
			description: banner.description || "",
			image: mediaUrl(banner.image),
			link: banner.link || "/courses"
		})));
		const index = ref(0);
		let timer = null;
		const current = computed(() => slides.value[index.value]);
		computed(() => (index.value - 1 + slides.value.length) % slides.value.length);
		computed(() => (index.value + 1) % slides.value.length);
		function restart() {
			if (timer) clearInterval(timer);
			if (slides.value.length < 2) return;
			timer = setInterval();
		}
		watch(() => slides.value.length, () => {
			index.value = 0;
			restart();
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-3xl bg-gradient-to-br from-oc-primary via-indigo-600 to-violet-700 text-white shadow-xl" }, _attrs))}><div class="absolute inset-0 opacity-20" aria-hidden="true"><div class="absolute -left-16 -top-24 h-64 w-64 rounded-full bg-white blur-3xl"></div><div class="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-300 blur-3xl"></div></div>`);
			if (unref(current)) {
				_push(`<div class="relative grid min-h-[320px] items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-12"><div class="fade-in"><span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "sparkles",
					size: 13
				}, null, _parent));
				_push(` Shikhor Academy </span><h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">${ssrInterpolate(__props.title || unref(current).title)}</h1><p class="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-base">${ssrInterpolate(__props.subtitle || unref(current).description || "Expert-led courses, practical quizzes and verifiable certificates — learn at your own pace.")}</p><div class="mt-6 flex flex-wrap gap-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(current).link.startsWith("http") ? "/courses" : unref(current).link,
					class: "inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary shadow-sm transition hover:bg-blue-50"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` Explore now `);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "arrow-right",
								size: 16
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" Explore now "), createVNode(_component_BaseIcon, {
							name: "arrow-right",
							size: 16
						})];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Browse courses `);
						else return [createTextVNode(" Browse courses ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><div class="relative hidden md:block"><div class="aspect-[16/11] overflow-hidden rounded-2xl ring-1 ring-white/25 shadow-2xl"><img${ssrRenderAttr("src", unref(current).image)}${ssrRenderAttr("alt", unref(current).title)} class="h-full w-full object-cover"></div></div></div>`);
			} else {
				_push(`<div class="relative grid min-h-[320px] items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-12"><div><span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "sparkles",
					size: 13
				}, null, _parent));
				_push(` Shikhor Academy </span><h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">${ssrInterpolate(__props.title || "Learn without limits")}</h1><p class="mt-3 max-w-xl text-sm leading-6 text-white/85 md:text-base">${ssrInterpolate(__props.subtitle || "Expert-led courses, practical quizzes and verifiable certificates — learn at your own pace.")}</p><div class="mt-6 flex flex-wrap gap-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary shadow-sm transition hover:bg-blue-50"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` Explore courses `);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "arrow-right",
								size: 16
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" Explore courses "), createVNode(_component_BaseIcon, {
							name: "arrow-right",
							size: 16
						})];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/store",
					class: "inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Visit store `);
						else return [createTextVNode(" Visit store ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div><div class="hidden justify-center md:flex"><div class="grid h-48 w-48 place-items-center rounded-3xl bg-white/10 ring-1 ring-white/20">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "book-open",
					size: 72,
					class: "text-white/70"
				}, null, _parent));
				_push(`</div></div></div>`);
			}
			if (unref(slides).length > 1) {
				_push(`<div class="relative flex items-center justify-between px-6 pb-5 md:px-10"><div class="flex gap-1.5"><!--[-->`);
				ssrRenderList$2(unref(slides), (slide, i) => {
					_push(`<button type="button" class="${ssrRenderClass([i === unref(index) ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/70", "h-1.5 rounded-full transition-all"])}"${ssrRenderAttr("aria-label", `Go to slide ${i + 1}`)}></button>`);
				});
				_push(`<!--]--></div><div class="flex gap-2"><button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Previous slide">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "chevron-left",
					size: 16
				}, null, _parent));
				_push(`</button><button type="button" class="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25" aria-label="Next slide">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "chevron-right",
					size: 16
				}, null, _parent));
				_push(`</button></div></div>`);
			} else _push(`<!---->`);
			_push(`</section>`);
		};
	}
});
// app/components/HeroCarousel.vue
var _sfc_setup$1 = HeroCarousel_vue_vue_type_script_setup_true_lang_default.setup;
HeroCarousel_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroCarousel.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var HeroCarousel_default = Object.assign(HeroCarousel_vue_vue_type_script_setup_true_lang_default, { __name: "HeroCarousel" });
// app/pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const { apiFetch, apiData } = useApi();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("home", async () => {
			const [banners, categories, featured, popular, blogs, products] = await Promise.all([
				apiData("/banners", { query: { active_only: 1 } }).catch(() => []),
				apiData("/course-categories").catch(() => []),
				apiData("/courses", { query: {
					featured: 1,
					per_page: 6
				} }).catch(() => null),
				apiData("/courses", { query: {
					per_page: 6,
					sort: "popular"
				} }).catch(() => null),
				apiFetch("/blogs", { query: { per_page: 3 } }).catch(() => null),
				apiData("/products").catch(() => [])
			]);
			const featuredCourses = featured?.data?.length ? featured.data : popular?.data ?? [];
			const reviews = (await Promise.all(featuredCourses.slice(0, 3).map((course) => apiData(`/courses/${course.slug}/reviews`, { query: { per_page: 3 } }).catch(() => null)))).filter((batch) => !!batch).flatMap((batch) => batch.reviews?.data ?? []).filter((review) => review.comment).slice(0, 9);
			return {
				banners,
				categories,
				featured: featuredCourses,
				popular: (popular?.data ?? []).filter((course) => !featuredCourses.some((item) => item.id === course.id)).slice(0, 3),
				blogs: blogs?.blogs ?? [],
				products: products.slice(0, 4),
				reviews
			};
		}, { default: () => ({
			banners: [],
			categories: [],
			featured: [],
			popular: [],
			blogs: [],
			products: [],
			reviews: []
		}) })), __temp = await __temp, __restore(), __temp);
		computed(() => data.value?.featured.length ?? 0);
		const stats = computed(() => [
			{
				label: "Expert-led courses",
				value: `${data.value?.featured.length || 6}+`,
				icon: "book-open"
			},
			{
				label: "Course categories",
				value: `${data.value?.categories.length || 0}`,
				icon: "layers"
			},
			{
				label: "Verified certificates",
				value: "100%",
				icon: "award"
			},
			{
				label: "Support",
				value: "7 days",
				icon: "phone"
			}
		]);
		useSeoMeta({
			title: "Shikhor Academy — Learn without limits",
			description: "Expert-led online courses, practical quizzes, verifiable certificates and a curated store. Learn anytime, anywhere with Shikhor Academy.",
			ogTitle: "Shikhor Academy — Learn without limits",
			ogDescription: "Expert-led online courses, practical quizzes, verifiable certificates and a curated store.",
			ogType: "website"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LoadingSkeleton = LoadingSkeleton_default;
			const _component_ErrorState = ErrorState_default;
			const _component_HeroCarousel = HeroCarousel_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_NuxtLink = NuxtLink;
			const _component_CourseCard = CourseCard_default;
			const _component_EmptyState = EmptyState_default;
			const _component_RatingStars = RatingStars_default;
			const _component_ProductCard = ProductCard_default;
			const _component_BlogCard = BlogCard_default;
			_push(`<div${ssrRenderAttrs(_attrs)}><div class="mx-auto w-full max-w-[1280px] px-4 py-6 md:px-6 md:py-10">`);
			if (unref(pending)) {
				_push(`<div class="space-y-8"><div class="h-[320px] animate-pulse rounded-3xl bg-gray-200"></div>`);
				_push(ssrRenderComponent(_component_LoadingSkeleton, { count: 3 }, null, _parent));
				_push(`</div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "We could not load the homepage",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(_component_HeroCarousel, { banners: unref(data)?.banners ?? [] }, null, _parent));
				_push(`<section class="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"><!--[-->`);
				ssrRenderList$2(unref(stats), (stat) => {
					_push(`<div class="card flex items-center gap-3 p-4"><span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-oc-primary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: stat.icon,
						size: 20
					}, null, _parent));
					_push(`</span><div><p class="text-lg font-extrabold leading-none text-gray-900">${ssrInterpolate(stat.value)}</p><p class="mt-1 text-xs text-gray-500">${ssrInterpolate(stat.label)}</p></div></div>`);
				});
				_push(`<!--]--></section>`);
				if (unref(data)?.categories.length) {
					_push(`<section class="mt-12"><div class="mb-5 flex items-end justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Browse by topic</p><h2 class="mt-1 text-2xl font-extrabold text-gray-900">Course categories</h2></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/courses",
						class: "btn-secondary hidden sm:inline-flex"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`All courses`);
							else return [createTextVNode("All courses")];
						}),
						_: 1
					}, _parent));
					_push(`</div><div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"><!--[-->`);
					ssrRenderList$2(unref(data).categories.slice(0, 6), (category) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: category.id,
							to: {
								path: "/courses",
								query: { category: category.slug }
							},
							class: "card group flex flex-col items-center gap-2 p-4 text-center transition hover:-translate-y-0.5 hover:border-oc-primary/30 hover:shadow-md"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-oc-primary"${_scopeId}>`);
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "book",
										size: 22
									}, null, _parent, _scopeId));
									_push(`</span><span class="line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-oc-primary"${_scopeId}>${ssrInterpolate(category.name)}</span><span class="text-[11px] text-gray-400"${_scopeId}>${ssrInterpolate(category.courses_count ?? 0)} courses</span>`);
								} else return [
									createVNode("span", { class: "flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-light text-oc-primary" }, [createVNode(_component_BaseIcon, {
										name: "book",
										size: 22
									})]),
									createVNode("span", { class: "line-clamp-2 text-sm font-semibold text-gray-800 group-hover:text-oc-primary" }, toDisplayString(category.name), 1),
									createVNode("span", { class: "text-[11px] text-gray-400" }, toDisplayString(category.courses_count ?? 0) + " courses", 1)
								];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				_push(`<section class="mt-14"><div class="mb-5 flex items-end justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Handpicked</p><h2 class="mt-1 text-2xl font-extrabold text-gray-900">Featured courses</h2></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "btn-secondary hidden sm:inline-flex"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` View all `);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "arrow-right",
								size: 15
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" View all "), createVNode(_component_BaseIcon, {
							name: "arrow-right",
							size: 15
						})];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if (unref(data)?.featured.length) {
					_push(`<div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
					ssrRenderList$2(unref(data).featured, (course) => {
						_push(ssrRenderComponent(_component_CourseCard, {
							key: course.id,
							course
						}, null, _parent));
					});
					_push(`<!--]--></div>`);
				} else _push(ssrRenderComponent(_component_EmptyState, {
					icon: "book-open",
					title: "Courses are on the way",
					message: "New courses will appear here as soon as they are published.",
					"action-label": "Refresh",
					onAction: unref(refresh)
				}, null, _parent));
				_push(`</section><section class="mt-14 overflow-hidden rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:p-10"><div class="grid items-center gap-8 lg:grid-cols-2"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Why Shikhor</p><h2 class="mt-2 text-2xl font-extrabold text-gray-900 md:text-3xl">Everything you need to finish what you start</h2><p class="mt-3 text-sm leading-6 text-gray-600"> Track every lesson, practise with real quizzes, earn certificates you can verify publicly, and get help from a team that actually replies. </p><div class="mt-6 grid gap-4 sm:grid-cols-2"><div class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "check-circle",
					size: 18
				}, null, _parent));
				_push(`</span><div><p class="text-sm font-semibold text-gray-800">Progress that saves</p><p class="text-xs text-gray-500">Resume exactly where you paused.</p></div></div><div class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "verify",
					size: 18
				}, null, _parent));
				_push(`</span><div><p class="text-sm font-semibold text-gray-800">Verifiable certificates</p><p class="text-xs text-gray-500">Anyone can check a certificate online.</p></div></div><div class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "list",
					size: 18
				}, null, _parent));
				_push(`</span><div><p class="text-sm font-semibold text-gray-800">Structured curriculum</p><p class="text-xs text-gray-500">Sections, lessons and quizzes in order.</p></div></div><div class="flex gap-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "shield",
					size: 18
				}, null, _parent));
				_push(`</span><div><p class="text-sm font-semibold text-gray-800">Secure checkout</p><p class="text-xs text-gray-500">Manual payments confirmed by admin.</p></div></div></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "btn-primary mt-7"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Start learning`);
						else return [createTextVNode("Start learning")];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="relative"><div class="overflow-hidden rounded-2xl bg-gray-100 ring-1 ring-gray-200">`);
				if (unref(data)?.featured[0]) _push(`<img${ssrRenderAttr("src", ("mediaUrl" in _ctx ? _ctx.mediaUrl : unref(mediaUrl))(unref(data).featured[0].thumbnail))}${ssrRenderAttr("alt", unref(data).featured[0].title)} class="aspect-[4/3] w-full object-cover">`);
				else {
					_push(`<div class="grid aspect-[4/3] place-items-center text-oc-primary/40">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "book-open",
						size: 80
					}, null, _parent));
					_push(`</div>`);
				}
				_push(`</div><div class="absolute -bottom-4 left-4 hidden rounded-xl bg-white p-4 shadow-lg ring-1 ring-gray-100 sm:block">`);
				_push(ssrRenderComponent(_component_RatingStars, {
					rating: unref(data)?.featured[0]?.rating.average || 0,
					count: unref(data)?.featured[0]?.rating.count || 0
				}, null, _parent));
				_push(`<p class="mt-1 text-xs text-gray-500">Rated by real enrolled students</p></div></div></div></section>`);
				if (unref(data)?.products.length) {
					_push(`<section class="mt-14"><div class="mb-5 flex items-end justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">From the store</p><h2 class="mt-1 text-2xl font-extrabold text-gray-900">Learning essentials</h2></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/store",
						class: "btn-secondary hidden sm:inline-flex"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Visit store`);
							else return [createTextVNode("Visit store")];
						}),
						_: 1
					}, _parent));
					_push(`</div><div class="grid grid-cols-2 gap-4 lg:grid-cols-4"><!--[-->`);
					ssrRenderList$2(unref(data).products, (product) => {
						_push(ssrRenderComponent(_component_ProductCard, {
							key: product.id,
							product
						}, null, _parent));
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				if (unref(data)?.blogs.length) {
					_push(`<section class="mt-14"><div class="mb-5 flex items-end justify-between gap-3"><div><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Learning notes</p><h2 class="mt-1 text-2xl font-extrabold text-gray-900">Latest from the blog</h2></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/blog",
						class: "btn-secondary hidden sm:inline-flex"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`All articles`);
							else return [createTextVNode("All articles")];
						}),
						_: 1
					}, _parent));
					_push(`</div><div class="grid grid-cols-1 gap-5 md:grid-cols-3"><!--[-->`);
					ssrRenderList$2(unref(data).blogs, (blog) => {
						_push(ssrRenderComponent(_component_BlogCard, {
							key: blog.id,
							blog
						}, null, _parent));
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				if (unref(data)?.reviews.length) {
					_push(`<section class="mt-14"><div class="mb-5"><p class="text-xs font-bold uppercase tracking-widest text-oc-primary">Student voices</p><h2 class="mt-1 text-2xl font-extrabold text-gray-900">What learners say</h2></div><div class="grid grid-cols-1 gap-4 md:grid-cols-3"><!--[-->`);
					ssrRenderList$2(unref(data).reviews.slice(0, 6), (review) => {
						_push(`<figure class="card p-5">`);
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: review.rating,
							"show-value": false,
							size: 14
						}, null, _parent));
						_push(`<blockquote class="mt-3 line-clamp-4 text-sm leading-6 text-gray-600">“${ssrInterpolate(review.comment)}”</blockquote><figcaption class="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(review.user?.name))}</span><span class="text-xs font-semibold text-gray-700">${ssrInterpolate(review.user?.name || "Student")}</span></figcaption></figure>`);
					});
					_push(`<!--]--></div></section>`);
				} else _push(`<!---->`);
				_push(`<section class="mt-14 rounded-3xl bg-gradient-to-r from-oc-primary to-indigo-600 px-6 py-10 text-center text-white md:px-12"><h2 class="text-2xl font-extrabold md:text-3xl">Ready to learn something new?</h2><p class="mx-auto mt-2 max-w-xl text-sm text-white/85"> Join Shikhor Academy today. Buy a course, start instantly, and earn a certificate you can verify. </p><div class="mt-6 flex flex-wrap justify-center gap-3">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-oc-primary transition hover:bg-blue-50"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(` Browse courses `);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "arrow-right",
								size: 16
							}, null, _parent, _scopeId));
						} else return [createTextVNode(" Browse courses "), createVNode(_component_BaseIcon, {
							name: "arrow-right",
							size: 16
						})];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/register",
					class: "inline-flex items-center gap-2 rounded-xl border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` Create an account `);
						else return [createTextVNode(" Create an account ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></section><!--]-->`);
			}
			_push(`</div></div>`);
		};
	}
});
// app/pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-B5L29VCP.mjs.map
