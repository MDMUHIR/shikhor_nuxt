import { L as LoadingSkeleton_default } from './LoadingSkeleton-BdeYArX2.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-eI38IKSm.mjs';
import { a as useRoute, b as useApi, u as useAuth, o as useCart, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { m as mediaUrl } from './media-DoSlkVxW.mjs';
import { b as formatMoney, h as discountPercent, e as excerpt, c as formatNumber, g as sanitizeHtml, f as formatDuration, i as initials, a as formatDate } from './format-eJzdzGa2.mjs';
import { defineComponent, withAsyncContext, ref, reactive, watchEffect, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/courses/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const slug = String(route.params.slug);
		const { apiData} = useApi();
		const { isAuthenticated } = useAuth();
		useCart();
		useToast();
		const { data: course, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`course-${slug}`, () => apiData(`/courses/${slug}`))), __temp = await __temp, __restore(), __temp);
		const { data: enrollment, refresh: refreshEnrollment } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`course-enrollment-${slug}`, async () => {
			if (!isAuthenticated.value) return null;
			return apiData(`/my/courses/${slug}`).catch(() => null);
		})), __temp = await __temp, __restore(), __temp);
		const ratingFilter = ref(Number(route.query.rating) || 0);
		const reviewPage = ref(Number(route.query.review_page) || 1);
		const { data: reviewsData, pending: reviewsPending, refresh: refreshReviews } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`course-reviews-${slug}`, () => apiData(`/courses/${slug}/reviews`, { query: {
			per_page: 5,
			page: reviewPage.value,
			rating: ratingFilter.value || void 0
		} }), { watch: [reviewPage, ratingFilter] })), __temp = await __temp, __restore(), __temp);
		const { data: myReview, refresh: refreshMyReview } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`course-my-review-${slug}`, async () => {
			if (!isAuthenticated.value) return null;
			return apiData(`/courses/${slug}/reviews/mine`).catch(() => null);
		})), __temp = await __temp, __restore(), __temp);
		const reviewForm = reactive({
			rating: 5,
			title: "",
			comment: ""
		});
		const savingReview = ref(false);
		const reviewError = ref("");
		const deletingReview = ref(false);
		watchEffect(() => {
			if (myReview.value) {
				reviewForm.rating = myReview.value.rating;
				reviewForm.title = myReview.value.title || "";
				reviewForm.comment = myReview.value.comment || "";
			}
		});
		const isEnrolled = computed(() => !!enrollment.value?.enrollment);
		const openSections = ref(/* @__PURE__ */ new Set());
		const adding = ref(false);
		const summary = computed(() => reviewsData.value?.summary ?? course.value?.reviews_summary ?? {
			average: 0,
			count: 0
		});
		const totalLessons = computed(() => course.value?.sections?.reduce((sum, section) => sum + section.lessons.length, 0) ?? 0);
		const totalQuizzes = computed(() => course.value?.quizzes?.length ?? 0);
		const thumbnail = computed(() => mediaUrl(course.value?.thumbnail));
		const price = computed(() => formatMoney(course.value?.effective_price));
		const original = computed(() => course.value?.offer_price && course.value?.offer_price < course.value.price ? formatMoney(course.value.price) : "");
		const off = computed(() => course.value ? discountPercent(course.value.price, course.value.offer_price) : 0);
		const accessLabel = computed(() => course.value?.access_type === "lifetime" ? "Lifetime access" : `${course.value?.effective_access_days ?? 0} days access`);
		const hasPromo = computed(() => !!course.value?.promo_video_url);
		const promoEmbed = computed(() => {
			const url = course.value?.promo_video_url || "";
			const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
			if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;
			const vimeo = url.match(/vimeo\.com\/(\d+)/);
			if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
			return "";
		});
		const ratingBars = computed(() => {
			const s = summary.value;
			const total = s.count || 0;
			return [
				5,
				4,
				3,
				2,
				1
			].map((star) => {
				const count = s[`${[
					"one",
					"two",
					"three",
					"four",
					"five"
				][star - 1]}_star`] || 0;
				return {
					star,
					count,
					percent: total ? Math.round(count / total * 100) : 0
				};
			});
		});
		watch(() => course.value?.sections, (sections) => {
			if (sections?.length) openSections.value = new Set(sections.map((section) => section.id));
		}, { immediate: true });
		useSeoMeta({
			title: () => course.value ? `${course.value.title} — Shikhor Academy` : "Course — Shikhor Academy",
			description: () => course.value?.subtitle || excerpt(course.value?.description, 160) || "Course details",
			ogTitle: () => course.value?.title || "Course",
			ogDescription: () => excerpt(course.value?.description, 160),
			ogImage: () => course.value?.thumbnail ? mediaUrl(course.value.thumbnail) : void 0
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_LoadingSkeleton = LoadingSkeleton_default;
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_RatingStars = RatingStars_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_PaginationLinks = PaginationLinks_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1280px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}>`);
			if (unref(pending)) {
				_push(`<div class="grid gap-6 lg:grid-cols-3"><div class="space-y-4 lg:col-span-2"><div class="h-72 animate-pulse rounded-2xl bg-gray-200"></div><div class="h-8 w-2/3 animate-pulse rounded bg-gray-200"></div><div class="h-4 w-full animate-pulse rounded bg-gray-200"></div>`);
				_push(ssrRenderComponent(_component_LoadingSkeleton, {
					count: 3,
					type: "row"
				}, null, _parent));
				_push(`</div><div class="h-80 animate-pulse rounded-2xl bg-gray-200"></div></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Course not available",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(course)) {
				_push(`<!--[--><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
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
				_push(`<span class="mx-1.5">/</span>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/courses",
					class: "hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Courses`);
						else return [createTextVNode("Courses")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(course).title)}</span></nav><div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]"><div class="space-y-6"><section class="overflow-hidden rounded-2xl bg-gray-900"><div class="relative aspect-video">`);
				if (unref(promoEmbed)) _push(`<iframe${ssrRenderAttr("src", unref(promoEmbed))} class="h-full w-full" title="Course promo video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
				else if (unref(hasPromo)) _push(`<video${ssrRenderAttr("src", unref(course).promo_video_url || "")} controls class="h-full w-full" preload="metadata"></video>`);
				else _push(`<img${ssrRenderAttr("src", unref(thumbnail))}${ssrRenderAttr("alt", unref(course).title)} class="h-full w-full object-cover opacity-90">`);
				_push(`</div></section><section><div class="flex flex-wrap items-center gap-2 text-xs"><span class="badge bg-brand-light text-oc-primary ring-blue-200">${ssrInterpolate(unref(course).category?.name || "Course")}</span><span class="badge bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(unref(course).level)}</span><span class="badge bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(unref(course).language?.toUpperCase())}</span>`);
				if (unref(course).is_featured) _push(`<span class="badge bg-amber-50 text-amber-700 ring-amber-200">Featured</span>`);
				else _push(`<!---->`);
				_push(`</div><h1 class="mt-3 text-2xl font-extrabold leading-tight text-gray-900 md:text-3xl">${ssrInterpolate(unref(course).title)}</h1>`);
				if (unref(course).subtitle) _push(`<p class="mt-2 text-base text-gray-600">${ssrInterpolate(unref(course).subtitle)}</p>`);
				else _push(`<!---->`);
				_push(`<div class="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">`);
				_push(ssrRenderComponent(_component_RatingStars, {
					rating: unref(course).rating?.average,
					count: unref(course).rating?.count,
					size: 16
				}, null, _parent));
				_push(`<span class="inline-flex items-center gap-1.5">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "users",
					size: 15
				}, null, _parent));
				_push(` ${ssrInterpolate(("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(course).total_students))} students</span><span class="inline-flex items-center gap-1.5">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "book-open",
					size: 15
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(totalLessons))} lessons</span><span class="inline-flex items-center gap-1.5">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "clock",
					size: 15
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(accessLabel))}</span></div></section>`);
				if (unref(course).outcomes?.length) {
					_push(`<section class="card p-5"><h2 class="text-lg font-bold text-gray-900">What you will learn</h2><ul class="mt-3 grid gap-2.5 sm:grid-cols-2"><!--[-->`);
					ssrRenderList$2(unref(course).outcomes, (item, index) => {
						_push(`<li class="flex gap-2 text-sm text-gray-600">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "check",
							size: 16,
							class: "mt-0.5 shrink-0 text-emerald-600"
						}, null, _parent));
						_push(`<span>${ssrInterpolate(item)}</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				if (unref(course).description) _push(`<section class="card p-5"><h2 class="text-lg font-bold text-gray-900">About this course</h2><div class="prose-content mt-3">${("sanitizeHtml" in _ctx ? _ctx.sanitizeHtml : unref(sanitizeHtml))(unref(course).description) ?? ""}</div></section>`);
				else _push(`<!---->`);
				if (unref(course).requirements?.length) {
					_push(`<section class="card p-5"><h2 class="text-lg font-bold text-gray-900">Requirements</h2><ul class="mt-3 space-y-2"><!--[-->`);
					ssrRenderList$2(unref(course).requirements, (item, index) => {
						_push(`<li class="flex gap-2 text-sm text-gray-600">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "info",
							size: 15,
							class: "mt-0.5 shrink-0 text-oc-primary"
						}, null, _parent));
						_push(`<span>${ssrInterpolate(item)}</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				_push(`<section class="card overflow-hidden"><div class="flex items-center justify-between border-b border-gray-100 px-5 py-4"><h2 class="text-lg font-bold text-gray-900">Curriculum</h2><span class="text-xs text-gray-500">${ssrInterpolate(unref(course).sections?.length || 0)} sections · ${ssrInterpolate(unref(totalLessons))} lessons</span></div>`);
				if (unref(course).sections?.length) {
					_push(`<div class="divide-y divide-gray-100"><!--[-->`);
					ssrRenderList$2(unref(course).sections, (section) => {
						_push(`<div><button type="button" class="flex w-full items-center gap-3 px-5 py-3.5 text-left transition hover:bg-gray-50"${ssrRenderAttr("aria-expanded", unref(openSections).has(section.id))}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: unref(openSections).has(section.id) ? "chevron-up" : "chevron-down",
							size: 16,
							class: "text-gray-400"
						}, null, _parent));
						_push(`<span class="flex-1 text-sm font-semibold text-gray-800">${ssrInterpolate(section.title)}</span><span class="text-xs text-gray-400">${ssrInterpolate(section.lessons.length)} lessons</span></button>`);
						if (unref(openSections).has(section.id)) {
							_push(`<ul class="border-t border-gray-50 bg-gray-50/50"><!--[-->`);
							ssrRenderList$2(section.lessons, (lesson) => {
								_push(`<li class="flex items-center gap-3 border-b border-gray-100 px-5 py-2.5 last:border-0">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: lesson.is_locked ? "lock" : lesson.type === "quiz" ? "list" : lesson.type === "text" ? "book" : "play-circle",
									size: 16,
									class: lesson.is_locked ? "text-gray-400" : "text-oc-primary"
								}, null, _parent));
								_push(`<span class="flex-1 text-sm text-gray-700">${ssrInterpolate(lesson.title)}</span>`);
								if (lesson.is_preview) _push(`<span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Preview</span>`);
								else _push(`<!---->`);
								_push(`<span class="text-xs text-gray-400">${ssrInterpolate(("formatDuration" in _ctx ? _ctx.formatDuration : unref(formatDuration))(lesson.duration_seconds))}</span></li>`);
							});
							_push(`<!--]--></ul>`);
						} else _push(`<!---->`);
						_push(`</div>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<p class="px-5 py-6 text-sm text-gray-500">The curriculum for this course is being finalised.</p>`);
				_push(`</section>`);
				if (unref(course).quizzes?.length) {
					_push(`<section class="card p-5"><h2 class="text-lg font-bold text-gray-900">Quizzes in this course</h2><ul class="mt-3 space-y-2"><!--[-->`);
					ssrRenderList$2(unref(course).quizzes, (quiz) => {
						_push(`<li class="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "list",
							size: 16,
							class: "text-oc-primary"
						}, null, _parent));
						_push(`<span class="flex-1 text-sm text-gray-700">${ssrInterpolate(quiz.title)}</span><span class="text-xs text-gray-400">Pass ${ssrInterpolate(quiz.pass_percentage)}%</span></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				_push(`<section class="card p-5"><div class="flex flex-wrap items-center justify-between gap-3"><h2 class="text-lg font-bold text-gray-900">Student reviews</h2><div class="flex flex-wrap gap-1.5"><button type="button" class="${ssrRenderClass([unref(ratingFilter) === 0 ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3 py-1 text-xs font-semibold transition"])}">All</button><!--[-->`);
				ssrRenderList$2([
					5,
					4,
					3,
					2,
					1
				], (star) => {
					_push(`<button type="button" class="${ssrRenderClass([unref(ratingFilter) === star ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3 py-1 text-xs font-semibold transition"])}">${ssrInterpolate(star)}★</button>`);
				});
				_push(`<!--]--></div></div><div class="mt-4 grid gap-5 sm:grid-cols-[180px_1fr]"><div class="rounded-xl bg-gray-50 p-4 text-center"><p class="text-4xl font-extrabold text-gray-900">${ssrInterpolate(Number(unref(summary).average || 0).toFixed(1))}</p>`);
				_push(ssrRenderComponent(_component_RatingStars, {
					rating: unref(summary).average,
					"show-value": false,
					size: 16
				}, null, _parent));
				_push(`<p class="mt-1 text-xs text-gray-500">${ssrInterpolate(unref(summary).count)} review${ssrInterpolate(unref(summary).count === 1 ? "" : "s")}</p></div><div class="space-y-1.5"><!--[-->`);
				ssrRenderList$2(unref(ratingBars), (bar) => {
					_push(`<button type="button" class="flex w-full items-center gap-2 text-xs text-gray-500"><span class="w-8 shrink-0">${ssrInterpolate(bar.star)}★</span><span class="h-2 flex-1 overflow-hidden rounded-full bg-gray-100"><span class="block h-full rounded-full bg-amber-400" style="${ssrRenderStyle({ width: `${bar.percent}%` })}"></span></span><span class="w-8 shrink-0 text-right">${ssrInterpolate(bar.count)}</span></button>`);
				});
				_push(`<!--]--></div></div>`);
				if (unref(reviewsPending)) {
					_push(`<div class="mt-5">`);
					_push(ssrRenderComponent(_component_LoadingSkeleton, {
						count: 2,
						type: "row"
					}, null, _parent));
					_push(`</div>`);
				} else if (unref(reviewsData)?.reviews.data.length) {
					_push(`<div class="mt-6 space-y-4"><!--[-->`);
					ssrRenderList$2(unref(reviewsData).reviews.data, (review) => {
						_push(`<article class="rounded-xl border border-gray-100 p-4"><div class="flex items-center justify-between gap-3"><div class="flex items-center gap-2.5"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(("initials" in _ctx ? _ctx.initials : unref(initials))(review.user?.name))}</span><div><p class="text-sm font-semibold text-gray-800">${ssrInterpolate(review.user?.name || "Student")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(review.created_at))}</p></div></div>`);
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: review.rating,
							"show-value": false,
							size: 14
						}, null, _parent));
						_push(`</div>`);
						if (review.title) _push(`<h3 class="mt-3 text-sm font-semibold text-gray-800">${ssrInterpolate(review.title)}</h3>`);
						else _push(`<!---->`);
						if (review.comment) _push(`<p class="mt-1 text-sm leading-6 text-gray-600">${ssrInterpolate(review.comment)}</p>`);
						else _push(`<!---->`);
						_push(`</article>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<p class="mt-6 rounded-xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500"> No reviews yet${ssrInterpolate(unref(ratingFilter) ? ` for ${unref(ratingFilter)} stars` : "")}. </p>`);
				_push(`<div class="mt-5">`);
				_push(ssrRenderComponent(_component_PaginationLinks, {
					"current-page": unref(reviewsData)?.reviews.current_page ?? 1,
					"last-page": unref(reviewsData)?.reviews.last_page ?? 1,
					total: unref(reviewsData)?.reviews.total,
					onChange: ($event) => reviewPage.value = $event
				}, null, _parent));
				_push(`</div>`);
				if (unref(isEnrolled)) {
					_push(`<div class="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4"><h3 class="text-sm font-bold text-gray-800">${ssrInterpolate(unref(myReview) ? "Update your review" : "Write a review")}</h3><form class="mt-3 space-y-3"><div class="flex items-center gap-1"><!--[-->`);
					ssrRenderList$2([
						1,
						2,
						3,
						4,
						5
					], (star) => {
						_push(`<button type="button" class="rounded p-0.5 transition"${ssrRenderAttr("aria-label", `${star} star`)}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "star",
							filled: "",
							size: 24,
							class: star <= unref(reviewForm).rating ? "text-amber-400" : "text-gray-300"
						}, null, _parent));
						_push(`</button>`);
					});
					_push(`<!--]--></div><div><label class="field-label" for="review-title">Title (optional)</label><input id="review-title"${ssrRenderAttr("value", unref(reviewForm).title)} class="field-input" maxlength="255" placeholder="Summarise your experience"></div><div><label class="field-label" for="review-comment">Your review</label><textarea id="review-comment" class="field-input" rows="3" maxlength="5000" placeholder="What did you like or dislike?">${ssrInterpolate(unref(reviewForm).comment)}</textarea></div>`);
					if (unref(reviewError)) _push(`<p class="field-error">${ssrInterpolate(unref(reviewError))}</p>`);
					else _push(`<!---->`);
					_push(`<div class="flex flex-wrap gap-2"><button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(savingReview)) ? " disabled" : ""}>${ssrInterpolate(unref(savingReview) ? "Saving…" : unref(myReview) ? "Update review" : "Submit review")}</button>`);
					if (unref(myReview)) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(deletingReview)) ? " disabled" : ""}>${ssrInterpolate(unref(deletingReview) ? "Removing…" : "Delete review")}</button>`);
					else _push(`<!---->`);
					_push(`</div></form></div>`);
				} else if (unref(isAuthenticated)) _push(`<p class="mt-5 text-xs text-gray-500">Only enrolled students can review this course.</p>`);
				else _push(`<!---->`);
				_push(`</section></div><aside class="lg:sticky lg:top-24 lg:self-start"><div class="card overflow-hidden"><div class="border-b border-gray-100 p-5"><div class="flex items-baseline gap-2"><span class="text-3xl font-extrabold text-oc-primary">${ssrInterpolate(unref(price))}</span>`);
				if (unref(original)) _push(`<span class="text-sm text-gray-400 line-through">${ssrInterpolate(unref(original))}</span>`);
				else _push(`<!---->`);
				if (unref(off)) _push(`<span class="ml-auto rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600">-${ssrInterpolate(unref(off))}%</span>`);
				else _push(`<!---->`);
				_push(`</div><p class="mt-2 text-xs text-gray-500">${ssrInterpolate(unref(accessLabel))} · ${ssrInterpolate(unref(course).access_type === "lifetime" ? "one-time payment" : "limited access")}</p>`);
				if (unref(isEnrolled)) {
					_push(`<!--[-->`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/learn/${unref(course).slug}`,
						class: "btn-primary mt-4 w-full"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "play",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Continue learning `);
							} else return [createVNode(_component_BaseIcon, {
								name: "play",
								size: 16
							}), createTextVNode(" Continue learning ")];
						}),
						_: 1
					}, _parent));
					_push(`<p class="mt-2 text-center text-xs text-emerald-600">You already have access to this course.</p><!--]-->`);
				} else {
					_push(`<!--[--><button type="button" class="btn-primary mt-4 w-full"${ssrIncludeBooleanAttr(unref(adding)) ? " disabled" : ""}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "cart",
						size: 16
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(adding) ? "Adding…" : "Add to cart")}</button><button type="button" class="btn-secondary mt-2 w-full"${ssrIncludeBooleanAttr(unref(adding)) ? " disabled" : ""}> Buy now </button><!--]-->`);
				}
				_push(`</div><ul class="space-y-3 p-5 text-sm text-gray-600"><li class="flex items-center justify-between"><span class="inline-flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "book-open",
					size: 15,
					class: "text-gray-400"
				}, null, _parent));
				_push(` Lessons</span><span class="font-semibold text-gray-800">${ssrInterpolate(unref(totalLessons))}</span></li><li class="flex items-center justify-between"><span class="inline-flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "list",
					size: 15,
					class: "text-gray-400"
				}, null, _parent));
				_push(` Quizzes</span><span class="font-semibold text-gray-800">${ssrInterpolate(unref(totalQuizzes))}</span></li><li class="flex items-center justify-between"><span class="inline-flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "clock",
					size: 15,
					class: "text-gray-400"
				}, null, _parent));
				_push(` Duration</span><span class="font-semibold text-gray-800">${ssrInterpolate(unref(course).duration_minutes ? `${unref(course).duration_minutes} min` : "—")}</span></li><li class="flex items-center justify-between"><span class="inline-flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "shield",
					size: 15,
					class: "text-gray-400"
				}, null, _parent));
				_push(` Certificate</span><span class="font-semibold text-gray-800">On completion</span></li></ul><div class="border-t border-gray-100 bg-gray-50 p-5 text-xs text-gray-500"><p class="flex items-start gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "info",
					size: 14,
					class: "mt-0.5 shrink-0"
				}, null, _parent));
				_push(` No card gateway is connected. Checkout records your payment method and an admin confirms it.</p></div></div>`);
				if (unref(isAuthenticated) && !unref(isEnrolled)) {
					_push(`<div class="card mt-4 p-4 text-xs text-gray-500"><p class="flex items-start gap-2">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "heart",
						size: 14,
						class: "mt-0.5 shrink-0 text-rose-500"
					}, null, _parent));
					_push(` Looking for something else? Browse the `);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/courses",
						class: "font-semibold text-oc-primary hover:underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`full catalogue`);
							else return [createTextVNode("full catalogue")];
						}),
						_: 1
					}, _parent));
					_push(`.</p></div>`);
				} else _push(`<!---->`);
				_push(`</aside></div><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/courses/[slug].vue
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/courses/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__default as default };
//# sourceMappingURL=_slug_-dR6j08VX.mjs.map
