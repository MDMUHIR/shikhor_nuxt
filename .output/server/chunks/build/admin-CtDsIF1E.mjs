import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData, E as ErrorState_default } from './asyncData-XPSmPmaM.mjs';
import { A as AdminStat_default } from './AdminStat-DEGFcaUv.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-BI1HjP-K.mjs';
import { R as RatingStars_default } from './RatingStars-DvyQ9IRB.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { b as formatMoney, c as formatNumber, a as formatDate } from './format-owYeCpVb.mjs';
import { defineComponent, withAsyncContext, computed, withCtx, createVNode, createTextVNode, unref, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/admin/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Admin dashboard — Shikhor Academy",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { initial } = useInitials();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("admin-dashboard", async () => {
			const [courses, publishedCourses, orders, enrollments, reviews, certificates, products, users] = await Promise.all([
				apiData("/admin/courses", { query: { per_page: 1 } }),
				apiData("/admin/courses", { query: {
					status: "published",
					per_page: 1
				} }),
				apiData("/admin/orders"),
				apiData("/admin/enrollments", { query: { per_page: 5 } }),
				apiData("/admin/reviews", { query: { per_page: 5 } }),
				apiData("/admin/certificates", { query: { per_page: 1 } }),
				apiData("/products"),
				apiData("/admin/users")
			]);
			return {
				courses,
				publishedCourses,
				orders,
				enrollments,
				reviews,
				certificates,
				products,
				users
			};
		})), __temp = await __temp, __restore(), __temp);
		const revenue = computed(() => (data.value?.orders ?? []).filter((order) => ![
			"cancelled",
			"refunded",
			"returned"
		].includes(order.status)).reduce((total, order) => total + Number(order.pricing?.total ?? 0), 0));
		const stats = computed(() => {
			const orders = data.value?.orders ?? [];
			return {
				revenue: revenue.value,
				orders: orders.length,
				pendingOrders: orders.filter((order) => order.status === "pending").length,
				courses: data.value?.courses.total ?? 0,
				publishedCourses: data.value?.publishedCourses.total ?? 0,
				enrollments: data.value?.enrollments.total ?? 0,
				reviews: data.value?.reviews.total ?? 0,
				certificates: data.value?.certificates.total ?? 0,
				products: data.value?.products.length ?? 0,
				customers: (data.value?.users ?? []).filter((user) => user.type !== "admin").length
			};
		});
		const recentOrders = computed(() => (data.value?.orders ?? []).slice(0, 6));
		const recentEnrollments = computed(() => data.value?.enrollments.data ?? []);
		const recentReviews = computed(() => data.value?.reviews.data ?? []);
		const quickLinks = [
			{
				label: "Add a course",
				to: "/admin/courses/new",
				icon: "plus",
				hint: "Build curriculum and quizzes"
			},
			{
				label: "Review orders",
				to: "/admin/orders",
				icon: "shopping-bag",
				hint: "Update payment and delivery"
			},
			{
				label: "Publish a blog",
				to: "/admin/blogs",
				icon: "blog",
				hint: "Write and tag articles"
			},
			{
				label: "Manage users",
				to: "/admin/users",
				icon: "users",
				hint: "Admins and students"
			}
		];
		function orderItems(order) {
			return order.summary?.total_items ?? (order.items?.length ?? 0) + (order.course_items?.length ?? 0);
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_AdminStat = AdminStat_default;
			const _component_EmptyState = EmptyState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_RatingStars = RatingStars_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Dashboard",
				subtitle: "A live snapshot of students, courses, store sales and learning activity.",
				icon: "dashboard"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/courses/new",
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "plus",
										size: 16
									}, null, _parent, _scopeId));
									_push(` New course `);
								} else return [createVNode(_component_BaseIcon, {
									name: "plus",
									size: 16
								}), createTextVNode(" New course ")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(pending)) ? " disabled" : ""}${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "refresh",
							size: 16
						}, null, _parent, _scopeId));
						_push(` Refresh </button>`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/admin/courses/new",
						class: "btn-primary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "plus",
							size: 16
						}), createTextVNode(" New course ")]),
						_: 1
					}), createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(pending),
						onClick: ($event) => unref(refresh)()
					}, [createVNode(_component_BaseIcon, {
						name: "refresh",
						size: 16
					}), createTextVNode(" Refresh ")], 8, ["disabled", "onClick"])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><!--[-->`);
				ssrRenderList$2(8, (i) => {
					_push(`<div class="card h-[86px] animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load the dashboard",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else {
				_push(`<!--[--><div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">`);
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Revenue (all orders)",
					value: ("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(unref(stats).revenue),
					icon: "chart",
					tone: "emerald",
					hint: "Excludes cancelled & refunded"
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Orders",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).orders),
					icon: "shopping-bag",
					tone: "blue",
					hint: `${unref(stats).pendingOrders} awaiting confirmation`
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Students",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).customers),
					icon: "users",
					tone: "violet",
					hint: "Customer accounts"
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Enrollments",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).enrollments),
					icon: "book-open",
					tone: "amber",
					hint: "Course access records"
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Courses",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).courses),
					icon: "book",
					tone: "blue",
					hint: `${unref(stats).publishedCourses} published`
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Products",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).products),
					icon: "store",
					tone: "gray",
					hint: "Store catalog"
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Certificates",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).certificates),
					icon: "award",
					tone: "emerald",
					hint: "Issued to students"
				}, null, _parent));
				_push(ssrRenderComponent(_component_AdminStat, {
					label: "Reviews",
					value: ("formatNumber" in _ctx ? _ctx.formatNumber : unref(formatNumber))(unref(stats).reviews),
					icon: "star",
					tone: "amber",
					hint: "Moderate student feedback"
				}, null, _parent));
				_push(`</div><div class="mt-5 grid gap-4 xl:grid-cols-3"><section class="card xl:col-span-2"><div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5"><div><h2 class="text-sm font-bold text-gray-900">Recent orders</h2><p class="text-xs text-gray-500">Latest placements across courses and products.</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/orders",
					class: "text-xs font-semibold text-oc-primary hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`View all`);
						else return [createTextVNode("View all")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if (!unref(recentOrders).length) _push(ssrRenderComponent(_component_EmptyState, {
					class: "m-4",
					icon: "shopping-bag",
					title: "No orders yet",
					message: "Orders placed by students will appear here."
				}, null, _parent));
				else {
					_push(`<div class="overflow-x-auto"><table class="w-full min-w-[620px] text-left text-sm"><thead class="border-b border-gray-100 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-5 py-2.5 font-semibold">Order</th><th class="px-3 py-2.5 font-semibold">Customer</th><th class="px-3 py-2.5 font-semibold">Items</th><th class="px-3 py-2.5 font-semibold">Total</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-5 py-2.5"></th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
					ssrRenderList$2(unref(recentOrders), (order) => {
						_push(`<tr class="hover:bg-gray-50/60"><td class="px-5 py-3"><p class="font-semibold text-gray-900">${ssrInterpolate(order.order_number)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(order.created_at, true))}</p></td><td class="px-3 py-3"><p class="text-gray-700">${ssrInterpolate(order.customer?.name || order.user?.name || "—")}</p><p class="truncate text-[11px] text-gray-400">${ssrInterpolate(order.customer?.email || order.user?.email)}</p></td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(orderItems(order))}</td><td class="px-3 py-3 font-semibold text-gray-900">${ssrInterpolate(("formatMoney" in _ctx ? _ctx.formatMoney : unref(formatMoney))(order.pricing?.total))}</td><td class="px-3 py-3">`);
						_push(ssrRenderComponent(_component_StatusBadge, { status: order.status }, null, _parent));
						_push(`</td><td class="px-5 py-3 text-right">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/admin/orders/${order.id}`,
							class: "text-xs font-semibold text-oc-primary hover:underline"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Open`);
								else return [createTextVNode("Open")];
							}),
							_: 2
						}, _parent));
						_push(`</td></tr>`);
					});
					_push(`<!--]--></tbody></table></div>`);
				}
				_push(`</section><div class="space-y-4"><section class="card"><div class="border-b border-gray-100 px-5 py-3.5"><h2 class="text-sm font-bold text-gray-900">Quick actions</h2></div><div class="grid gap-1 p-2"><!--[-->`);
				ssrRenderList$2(quickLinks, (link) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: link.to,
						to: link.to,
						class: "flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<span class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light text-oc-primary"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: link.icon,
									size: 17
								}, null, _parent, _scopeId));
								_push(`</span><span class="min-w-0"${_scopeId}><span class="block text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(link.label)}</span><span class="block truncate text-[11px] text-gray-400"${_scopeId}>${ssrInterpolate(link.hint)}</span></span>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "chevron-right",
									size: 15,
									class: "ml-auto text-gray-300"
								}, null, _parent, _scopeId));
							} else return [
								createVNode("span", { class: "flex h-9 w-9 items-center justify-center rounded-lg bg-brand-light text-oc-primary" }, [createVNode(_component_BaseIcon, {
									name: link.icon,
									size: 17
								}, null, 8, ["name"])]),
								createVNode("span", { class: "min-w-0" }, [createVNode("span", { class: "block text-sm font-semibold text-gray-800" }, toDisplayString(link.label), 1), createVNode("span", { class: "block truncate text-[11px] text-gray-400" }, toDisplayString(link.hint), 1)]),
								createVNode(_component_BaseIcon, {
									name: "chevron-right",
									size: 15,
									class: "ml-auto text-gray-300"
								})
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></section><section class="card"><div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5"><h2 class="text-sm font-bold text-gray-900">New enrollments</h2>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/enrollments",
					class: "text-xs font-semibold text-oc-primary hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`All`);
						else return [createTextVNode("All")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if (!unref(recentEnrollments).length) _push(ssrRenderComponent(_component_EmptyState, {
					class: "m-4",
					icon: "users",
					title: "No enrollments yet",
					message: "Enrollments from course orders and manual grants appear here."
				}, null, _parent));
				else {
					_push(`<ul class="divide-y divide-gray-50"><!--[-->`);
					ssrRenderList$2(unref(recentEnrollments), (enrollment) => {
						_push(`<li class="flex items-center gap-3 px-5 py-3"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-light text-[11px] font-bold text-oc-primary">${ssrInterpolate(unref(initial)(enrollment.user?.name))}</span><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-gray-800">${ssrInterpolate(enrollment.user?.name || "Student")}</p><p class="truncate text-[11px] text-gray-400">${ssrInterpolate(enrollment.course?.title || "Course")}</p></div>`);
						_push(ssrRenderComponent(_component_StatusBadge, { status: enrollment.status }, null, _parent));
						_push(`</li>`);
					});
					_push(`<!--]--></ul>`);
				}
				_push(`</section></div></div><section class="card mt-4"><div class="flex items-center justify-between border-b border-gray-100 px-5 py-3.5"><div><h2 class="text-sm font-bold text-gray-900">Latest reviews</h2><p class="text-xs text-gray-500">Approve, reject or remove student feedback.</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/reviews",
					class: "text-xs font-semibold text-oc-primary hover:underline"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Moderate`);
						else return [createTextVNode("Moderate")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
				if (!unref(recentReviews).length) _push(ssrRenderComponent(_component_EmptyState, {
					class: "m-4",
					icon: "star",
					title: "No reviews yet",
					message: "Student reviews will show up here for moderation."
				}, null, _parent));
				else {
					_push(`<div class="grid gap-3 p-4 md:grid-cols-2"><!--[-->`);
					ssrRenderList$2(unref(recentReviews), (review) => {
						_push(`<article class="rounded-xl border border-gray-100 p-3"><div class="flex items-start justify-between gap-2"><div><p class="text-sm font-semibold text-gray-800">${ssrInterpolate(review.course?.title || "Course")}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(review.user?.name || "Student")} · ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(review.created_at))}</p></div>`);
						_push(ssrRenderComponent(_component_StatusBadge, { status: review.is_approved ? "approved" : "pending" }, null, _parent));
						_push(`</div>`);
						_push(ssrRenderComponent(_component_RatingStars, {
							rating: review.rating,
							size: 13,
							class: "mt-1.5"
						}, null, _parent));
						if (review.comment) _push(`<p class="mt-1.5 line-clamp-2 text-xs text-gray-600">${ssrInterpolate(review.comment)}</p>`);
						else _push(`<!---->`);
						_push(`</article>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</section><!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/admin/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = index_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-CtDsIF1E.mjs.map
