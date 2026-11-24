import { a as useRoute, q as useRouter, b as useApi, u as useAuth, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { L as LoadingSkeleton_default } from './LoadingSkeleton-BdeYArX2.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { C as CourseCard_default } from './CourseCard-BGkMh-wt.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { c as formatNumber } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, watch, mergeProps, withCtx, createTextVNode, unref, nextTick, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrInterpolate } from 'vue/server-renderer';
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
import './RatingStars-DvyQ9IRB.mjs';

// app/pages/courses/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const router = useRouter();
		const { apiData } = useApi();
		const { isAuthenticated } = useAuth();
		const search = ref(String(route.query.search || ""));
		const category = ref(String(route.query.category || ""));
		const level = ref(String(route.query.level || ""));
		const sort = ref(String(route.query.sort || "latest"));
		let syncing = false;
		const levels = [
			{
				value: "",
				label: "All levels"
			},
			{
				value: "beginner",
				label: "Beginner"
			},
			{
				value: "intermediate",
				label: "Intermediate"
			},
			{
				value: "advanced",
				label: "Advanced"
			}
		];
		const sorts = [
			{
				value: "latest",
				label: "Newest"
			},
			{
				value: "popular",
				label: "Most popular"
			},
			{
				value: "rating",
				label: "Top rated"
			},
			{
				value: "price_asc",
				label: "Price: low to high"
			},
			{
				value: "price_desc",
				label: "Price: high to low"
			}
		];
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("course-categories", () => apiData("/course-categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("courses-list", () => {
			const query = {
				per_page: 12,
				page: Number(route.query.page) || 1,
				sort: sort.value
			};
			if (search.value.trim()) query.search = search.value.trim();
			if (category.value) query.category = category.value;
			if (level.value) query.level = level.value;
			return apiData("/courses", { query });
		}, { watch: [() => route.query] })), __temp = await __temp, __restore(), __temp);
		const courses = computed(() => data.value?.data ?? []);
		const currentPage = computed(() => data.value?.current_page ?? 1);
		const lastPage = computed(() => data.value?.last_page ?? 1);
		const { data: enrolledCourseIds } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("courses-enrolled-ids", async () => {
			if (!isAuthenticated.value) return [];
			return (await apiData("/my/courses").catch(() => []) ?? []).filter((item) => item.enrollment?.is_active).map((item) => item.course.id);
		}, { watch: [isAuthenticated] })), __temp = await __temp, __restore(), __temp);
		const enrolledSet = computed(() => new Set(enrolledCourseIds.value ?? []));
		const visibleCourses = computed(() => courses.value.filter((course) => !enrolledSet.value.has(course.id)));
		const allOwned = computed(() => courses.value.length > 0 && visibleCourses.value.length === 0);
		function syncFromRoute() {
			syncing = true;
			search.value = String(route.query.search || "");
			category.value = String(route.query.category || "");
			level.value = String(route.query.level || "");
			sort.value = String(route.query.sort || "latest");
			nextTick(() => syncing = false);
		}
		function apply(patch, resetPage = true) {
			const query = {};
			for (const [key, value] of Object.entries({
				...route.query,
				...patch
			})) {
				if (value === void 0 || value === "" || value === null) continue;
				if (key === "page" && resetPage && !("page" in patch)) continue;
				query[key] = String(value);
			}
			if (resetPage && !("page" in patch)) delete query.page;
			router.push({
				path: "/courses",
				query
			});
		}
		function changePage(page) {
			apply({ page }, false);
			(void 0).scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}
		function clearFilters() {
			search.value = "";
			category.value = "";
			level.value = "";
			sort.value = "latest";
			router.push({ path: "/courses" });
		}
		const hasFilters = computed(() => !!(route.query.search || route.query.category || route.query.level || route.query.sort && route.query.sort !== "latest"));
		watch(() => route.query, syncFromRoute);
		watch(category, () => !syncing && apply({ category: category.value || void 0 }));
		watch(level, () => !syncing && apply({ level: level.value || void 0 }));
		watch(sort, () => !syncing && apply({ sort: sort.value }));
		useSeoMeta({
			title: "Courses — Shikhor Academy",
			description: "Browse expert-led courses by category, level and price. Learn at your own pace with quizzes and certificates."
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_LoadingSkeleton = LoadingSkeleton_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_CourseCard = CourseCard_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full md:container px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Home`);
					else return [createTextVNode("Home")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Courses</span></nav><div class="card neo-banner neo-lavender p-6 md:p-8"><h1 class="text-2xl font-extrabold md:text-3xl">Find your next course</h1><p class="mt-2 max-w-2xl text-sm text-white/85"> Structured lessons, practical quizzes and certificates. Filter by topic, level or price. </p></div><div class="card mt-5 p-4"><form class="grid gap-3 md:grid-cols-12"><div class="relative md:col-span-5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 17,
				class: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
			}, null, _parent));
			_push(`<input${ssrRenderAttr("value", unref(search))} type="search" class="field-input pl-9" placeholder="Search courses…" aria-label="Search courses"></div><div class="md:col-span-3"><select class="field-input" aria-label="Category"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), "") : ssrLooseEqual(unref(category), "")) ? " selected" : ""}>All categories</option><!--[-->`);
			ssrRenderList$2(unref(categories), (item) => {
				_push(`<option${ssrRenderAttr("value", item.slug)}${ssrIncludeBooleanAttr(Array.isArray(unref(category)) ? ssrLooseContain(unref(category), item.slug) : ssrLooseEqual(unref(category), item.slug)) ? " selected" : ""}>${ssrInterpolate(item.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-2"><select class="field-input" aria-label="Level"><!--[-->`);
			ssrRenderList$2(levels, (item) => {
				_push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(level)) ? ssrLooseContain(unref(level), item.value) : ssrLooseEqual(unref(level), item.value)) ? " selected" : ""}>${ssrInterpolate(item.label)}</option>`);
			});
			_push(`<!--]--></select></div><div class="md:col-span-2"><select class="field-input" aria-label="Sort by"><!--[-->`);
			ssrRenderList$2(sorts, (item) => {
				_push(`<option${ssrRenderAttr("value", item.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(sort)) ? ssrLooseContain(unref(sort), item.value) : ssrLooseEqual(unref(sort), item.value)) ? " selected" : ""}>${ssrInterpolate(item.label)}</option>`);
			});
			_push(`<!--]--></select></div></form>`);
			if (unref(hasFilters)) {
				_push(`<div class="mt-3 flex flex-wrap items-center gap-2 text-xs"><span class="text-gray-500">Active filters:</span>`);
				if (unref(route).query.search) _push(`<span class="badge bg-brand-light text-oc-primary ring-blue-200">“${ssrInterpolate(unref(route).query.search)}”</span>`);
				else _push(`<!---->`);
				if (unref(route).query.category) _push(`<span class="badge bg-brand-light text-oc-primary ring-blue-200">${ssrInterpolate(unref(route).query.category)}</span>`);
				else _push(`<!---->`);
				if (unref(route).query.level) _push(`<span class="badge bg-brand-light text-oc-primary ring-blue-200">${ssrInterpolate(unref(route).query.level)}</span>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="font-semibold text-rose-600 hover:underline"> Clear all </button></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="mt-6 flex items-center justify-between gap-3"><p class="text-sm text-gray-600">`);
			if (!unref(pending)) _push(`<span>${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(data)?.total))} course${ssrInterpolate(unref(data)?.total === 1 ? "" : "s")}</span>`);
			else _push(`<span>Loading courses…</span>`);
			_push(`</p></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-4">`);
				_push(ssrRenderComponent(_component_LoadingSkeleton, { count: 6 }, null, _parent));
				_push(`</div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-4",
				title: "Could not load courses",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(allOwned)) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-4",
				icon: "book-open",
				title: "You already own these courses",
				message: "You are enrolled in every course on this page. Continue learning from your dashboard.",
				"action-label": "Go to my courses",
				"action-to": "/my-courses"
			}, null, _parent));
			else if (!unref(visibleCourses).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-4",
				icon: "search",
				title: "No courses match your filters",
				message: "Try a different search term, category or level.",
				"action-label": "Clear filters",
				onAction: clearFilters
			}, null, _parent));
			else {
				_push(`<!--[--><div class="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"><!--[-->`);
				ssrRenderList$2(unref(visibleCourses), (course) => {
					_push(ssrRenderComponent(_component_CourseCard, {
						key: course.id,
						course,
						compact: ""
					}, null, _parent));
				});
				_push(`<!--]--></div><div class="mt-8">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(currentPage),
					"last-page": unref(lastPage),
					total: unref(data)?.total,
					onChange: changePage
				}, null, _parent));
				_push(`</div><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/courses/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/courses/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var courses_default = index_vue_vue_type_script_setup_true_lang_default;

export { courses_default as default };
//# sourceMappingURL=courses-BTM7oJvY.mjs.map
