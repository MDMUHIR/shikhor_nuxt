import { _ as _plugin_vue_export_helper_default, a as useRoute, q as useRouter, u as useAuth, t as useCart, w as useWishlist, N as NuxtLink, y as _virtual_public__2Flogo_default, s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useInitials } from './useInitials-C477l6Rh.mjs';
import { A as AppToast_default } from './AppToast-eGa5m3Vy.mjs';
import { defineComponent, ref, computed, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import './useToast-8ge3kL-h.mjs';

// app/components/AppHeader.vue?vue&type=script&setup=true&lang.ts
var AppHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		useRouter();
		const { user, isAuthenticated, isAdmin, isStaff} = useAuth();
		const { totalCount} = useCart();
		const { count: wishlistCount} = useWishlist();
		const { initial } = useInitials();
		const open = ref(false);
		const accountOpen = ref(false);
		const searchOpen = ref(false);
		const searchTerm = ref("");
		ref(null);
		const signingOut = ref(false);
		const links = [
			{
				label: "Home",
				href: "/"
			},
			{
				label: "Courses",
				href: "/courses"
			},
			{
				label: "Exams",
				href: "/exams"
			},
			{
				label: "Store",
				href: "/store"
			},
			{
				label: "Blog",
				href: "/blog"
			},
			{
				label: "Reviews",
				href: "/reviews"
			},
			{
				label: "Instructors",
				href: "/instructors"
			}
		];
		const initials = computed(() => initial(user.value?.name));
		function isActive(href) {
			return href === "/" ? route.path === "/" : route.path.startsWith(href);
		}
		function closeAll() {
			open.value = false;
			accountOpen.value = false;
			searchOpen.value = false;
		}
		watch(() => route.fullPath, () => closeAll());
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<header${ssrRenderAttrs(mergeProps({ class: "fixed inset-x-0 top-0 z-50 print:hidden" }, _attrs))}><div class="border-b-2 border-neo-ink bg-[#fbf5e8]/95 backdrop-blur"><div class="mx-auto flex h-18 w-full md:container items-center gap-3 px-4 md:px-6">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "flex h-12 w-24 shrink-0 items-center",
				"aria-label": "Shikhor Academy home"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", _virtual_public__2Flogo_default)} alt="Shikhor Academy" class="h-full w-full object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: _virtual_public__2Flogo_default,
						alt: "Shikhor Academy",
						class: "h-full w-full object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<nav class="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Primary"><!--[-->`);
			ssrRenderList$2(links, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.href,
					to: link.href,
					class: ["rounded-full border-2 border-transparent px-3.5 py-1.5 text-sm font-bold text-neo-ink transition hover:border-neo-ink hover:bg-white", { "!border-neo-ink bg-neo-lavender shadow-[2px_2px_0_0_#1a1a1a]": isActive(link.href) }]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="ml-auto flex items-center gap-1.5"><button type="button" class="icon-btn hidden sm:inline-flex" aria-label="Search courses">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "search",
				size: 20
			}, null, _parent));
			_push(`</button>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/wishlist",
				class: "icon-btn",
				"aria-label": "Wishlist"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "heart",
							size: 20
						}, null, _parent, _scopeId));
						if (unref(wishlistCount)) _push(`<span class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-neo-ink bg-neo-pink px-1 text-[10px] font-extrabold text-neo-ink"${_scopeId}>${ssrInterpolate(unref(wishlistCount))}</span>`);
						else _push(`<!---->`);
					} else return [createVNode(_component_BaseIcon, {
						name: "heart",
						size: 20
					}), unref(wishlistCount) ? (openBlock(), createBlock("span", {
						key: 0,
						class: "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-neo-ink bg-neo-pink px-1 text-[10px] font-extrabold text-neo-ink"
					}, toDisplayString(unref(wishlistCount)), 1)) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/cart",
				class: "icon-btn",
				"aria-label": "Cart"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "cart",
							size: 20
						}, null, _parent, _scopeId));
						if (unref(totalCount)) _push(`<span class="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-neo-ink bg-neo-mint px-1 text-[10px] font-extrabold text-neo-ink"${_scopeId}>${ssrInterpolate(unref(totalCount))}</span>`);
						else _push(`<!---->`);
					} else return [createVNode(_component_BaseIcon, {
						name: "cart",
						size: 20
					}), unref(totalCount) ? (openBlock(), createBlock("span", {
						key: 0,
						class: "absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-neo-ink bg-neo-mint px-1 text-[10px] font-extrabold text-neo-ink"
					}, toDisplayString(unref(totalCount)), 1)) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			if (unref(isAuthenticated)) {
				_push(`<div class="relative hidden lg:block"><button type="button" class="flex items-center gap-2 rounded-full border-2 border-neo-ink bg-white py-1 pl-1 pr-3 shadow-[2px_2px_0_0_#1a1a1a] transition hover:-translate-x-px hover:-translate-y-px hover:bg-neo-lavender"${ssrRenderAttr("aria-expanded", unref(accountOpen))} aria-haspopup="menu"><span class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-neo-ink bg-neo-sun text-sm font-extrabold text-neo-ink">${ssrInterpolate(unref(initials))}</span><span class="max-w-24 truncate text-sm font-semibold text-gray-700">${ssrInterpolate(unref(user)?.name)}</span>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "chevron-down",
					size: 15,
					class: "text-gray-400"
				}, null, _parent));
				_push(`</button>`);
				if (unref(accountOpen)) {
					_push(`<div class="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl bg-white py-1.5" role="menu"><div class="border-b border-gray-100 px-4 py-2.5"><p class="truncate text-sm font-semibold text-gray-800">${ssrInterpolate(unref(user)?.name)}</p><p class="truncate text-xs text-gray-500">${ssrInterpolate(unref(user)?.email)}</p></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/my-courses",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "book-open",
									size: 16
								}, null, _parent, _scopeId));
								_push(` My courses `);
							} else return [createVNode(_component_BaseIcon, {
								name: "book-open",
								size: 16
							}), createTextVNode(" My courses ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/orders",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "shopping-bag",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Orders `);
							} else return [createVNode(_component_BaseIcon, {
								name: "shopping-bag",
								size: 16
							}), createTextVNode(" Orders ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/payments",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "credit-card",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Payments `);
							} else return [createVNode(_component_BaseIcon, {
								name: "credit-card",
								size: 16
							}), createTextVNode(" Payments ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/notifications",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "check-circle",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Notifications `);
							} else return [createVNode(_component_BaseIcon, {
								name: "check-circle",
								size: 16
							}), createTextVNode(" Notifications ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/certificates",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "award",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Certificates `);
							} else return [createVNode(_component_BaseIcon, {
								name: "award",
								size: 16
							}), createTextVNode(" Certificates ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/wishlist",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "heart",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Wishlist `);
							} else return [createVNode(_component_BaseIcon, {
								name: "heart",
								size: 16
							}), createTextVNode(" Wishlist ")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/profile",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "user",
									size: 16
								}, null, _parent, _scopeId));
								_push(` Profile `);
							} else return [createVNode(_component_BaseIcon, {
								name: "user",
								size: 16
							}), createTextVNode(" Profile ")];
						}),
						_: 1
					}, _parent));
					if (unref(isStaff)) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/admin",
						class: "flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-oc-primary hover:bg-brand-light",
						role: "menuitem"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "dashboard",
									size: 16
								}, null, _parent, _scopeId));
								_push(` ${ssrInterpolate(unref(isAdmin) ? "Admin dashboard" : "Instructor dashboard")}`);
							} else return [createVNode(_component_BaseIcon, {
								name: "dashboard",
								size: 16
							}), createTextVNode(" " + toDisplayString(unref(isAdmin) ? "Admin dashboard" : "Instructor dashboard"), 1)];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`<button type="button" class="flex w-full items-center gap-2.5 border-t border-gray-100 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 disabled:opacity-60"${ssrIncludeBooleanAttr(unref(signingOut)) ? " disabled" : ""} role="menuitem">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "logout",
						size: 16
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(signingOut) ? "Signing out…" : "Log out")}</button></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(ssrRenderComponent(_component_NuxtLink, {
				to: "/login",
				class: "btn-primary hidden lg:inline-flex"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` Login `);
					else return [createTextVNode(" Login ")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button" class="icon-btn lg:hidden"${ssrRenderAttr("aria-expanded", unref(open))} aria-label="Toggle menu">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: unref(open) ? "x" : "menu",
				size: 24
			}, null, _parent));
			_push(`</button></div></div>`);
			if (unref(searchOpen)) {
				_push(`<div class="border-t-2 border-neo-ink bg-white"><form class="mx-auto flex w-full max-w-[1280px] items-center gap-2 px-4 py-3 md:px-6">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "search",
					size: 18,
					class: "text-gray-400"
				}, null, _parent));
				_push(`<input${ssrRenderAttr("value", unref(searchTerm))} type="search" class="field-input" placeholder="Search courses…" autofocus aria-label="Search courses"><button type="submit" class="btn-primary shrink-0">Search</button></form></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (unref(open)) {
				_push(`<div class="border-b-2 border-neo-ink bg-[#fbf5e8] lg:hidden"><nav class="mx-auto w-full max-w-[1280px] px-4 py-2" aria-label="Mobile"><!--[-->`);
				ssrRenderList$2(links, (link) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: link.href,
						to: link.href,
						class: ["mb-1 block rounded-xl border-2 border-transparent px-3 py-2.5 text-sm font-bold text-neo-ink hover:border-neo-ink hover:bg-white", { "!border-neo-ink bg-neo-lavender": isActive(link.href) }]
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(link.label)}`);
							else return [createTextVNode(toDisplayString(link.label), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]-->`);
				if (unref(isAuthenticated)) {
					_push(`<!--[--><div class="my-2 border-t border-gray-100"></div><p class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-gray-400">${ssrInterpolate(unref(user)?.name)}</p>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/my-courses",
						class: "block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`My courses`);
							else return [createTextVNode("My courses")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/orders",
						class: "block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Orders`);
							else return [createTextVNode("Orders")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/certificates",
						class: "block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Certificates`);
							else return [createTextVNode("Certificates")];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/profile",
						class: "block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Profile`);
							else return [createTextVNode("Profile")];
						}),
						_: 1
					}, _parent));
					if (unref(isStaff)) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/admin",
						class: "block rounded-lg px-3 py-2.5 text-sm font-semibold text-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(isAdmin) ? "Admin dashboard" : "Instructor dashboard")}`);
							else return [createTextVNode(toDisplayString(unref(isAdmin) ? "Admin dashboard" : "Instructor dashboard"), 1)];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/notifications",
						class: "block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Notifications`);
							else return [createTextVNode("Notifications")];
						}),
						_: 1
					}, _parent));
					_push(`<button type="button" class="block w-full rounded-lg px-3 py-2.5 text-left text-sm text-rose-600">Log out</button><!--]-->`);
				} else _push(ssrRenderComponent(_component_NuxtLink, {
					to: "/login",
					class: "mt-1 block rounded-lg px-3 py-2.5 text-sm font-semibold text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Login`);
						else return [createTextVNode("Login")];
					}),
					_: 1
				}, _parent));
				_push(`</nav></div>`);
			} else _push(`<!---->`);
			_push(`</header>`);
		};
	}
});
// app/components/AppHeader.vue
var _sfc_setup$3 = AppHeader_vue_vue_type_script_setup_true_lang_default.setup;
AppHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var AppHeader_default = Object.assign(AppHeader_vue_vue_type_script_setup_true_lang_default, { __name: "AppHeader" });
// app/components/AppFooter.vue?vue&type=script&setup=true&lang.ts
var AppFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AppFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const year = (/* @__PURE__ */ new Date()).getFullYear();
		const links = [
			{
				label: "Home",
				to: "/"
			},
			{
				label: "Courses",
				to: "/courses"
			},
			{
				label: "Store",
				to: "/store"
			},
			{
				label: "Blog",
				to: "/blog"
			},
			{
				label: "Verify a certificate",
				to: "/certificates/verify"
			}
		];
		const support = [
			{
				label: "My courses",
				to: "/my-courses"
			},
			{
				label: "Orders",
				to: "/orders"
			},
			{
				label: "Wishlist",
				to: "/wishlist"
			},
			{
				label: "Profile",
				to: "/profile"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<footer${ssrRenderAttrs(mergeProps({ class: "mt-16 border-t-2 border-neo-ink bg-neo-lavender/70 text-gray-800 print:hidden" }, _attrs))}><div class="mx-auto w-full max-w-[1280px] px-4 py-12 md:px-6 md:py-16"><div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"><div class="space-y-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "inline-flex h-14 w-32 items-center",
				"aria-label": "Shikhor Academy home"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", _virtual_public__2Flogo_default)} alt="Shikhor Academy" class="h-full w-full object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: _virtual_public__2Flogo_default,
						alt: "Shikhor Academy",
						class: "h-full w-full object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<p class="text-sm leading-6 text-gray-600"> Shikhor Academy is a complete online learning platform: expert-led courses, practical quizzes, verifiable certificates and a curated store — built for learners across Bangladesh. </p><div class="flex gap-2"><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="icon-btn !h-9 !w-9 hover:!bg-neo-sky" aria-label="Facebook"><svg viewBox="0 0 320 512" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg></a><a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="icon-btn !h-9 !w-9 hover:!bg-neo-pink" aria-label="YouTube"><svg viewBox="0 0 576 512" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg></a></div></div><div><h3 class="mb-4 text-base font-bold text-gray-900">Explore</h3><ul class="space-y-2.5"><!--[-->`);
			ssrRenderList$2(links, (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: link.to,
					class: "text-sm text-gray-600 transition hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div><h3 class="mb-4 text-base font-bold text-gray-900">My account</h3><ul class="space-y-2.5"><!--[-->`);
			ssrRenderList$2(support, (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: link.to,
					class: "text-sm text-gray-600 transition hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.label)}`);
						else return [createTextVNode(toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div><h3 class="mb-4 text-base font-bold text-gray-900">Contact</h3><ul class="space-y-3 text-sm text-gray-600"><li class="flex items-start gap-2.5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "phone",
				size: 16,
				class: "mt-0.5 text-oc-primary"
			}, null, _parent));
			_push(`<span>09617-331133</span></li><li class="flex items-start gap-2.5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "mail",
				size: 16,
				class: "mt-0.5 text-oc-primary"
			}, null, _parent));
			_push(`<span>support@shikhor.academy</span></li><li class="flex items-start gap-2.5">`);
			_push(ssrRenderComponent(_component_BaseIcon, {
				name: "map-pin",
				size: 16,
				class: "mt-0.5 text-oc-primary"
			}, null, _parent));
			_push(`<span>House 1085, Road 6/A, Avenue 8, Mirpur DOHS, Dhaka</span></li></ul><div class="card mt-5 p-3"><p class="text-xs font-semibold uppercase tracking-wide text-gray-400">Payments</p><p class="mt-1 text-sm text-gray-600">Cash on delivery, bKash, Nagad or card. An admin confirms every manual payment.</p></div></div></div><div class="mt-10 flex flex-col items-center justify-between gap-4 border-t-2 border-neo-ink pt-6 md:flex-row"><p class="text-sm text-gray-500">© ${ssrInterpolate(unref(year))} Shikhor Academy. All rights reserved.</p><div class="flex flex-wrap items-center gap-4 text-sm text-gray-500">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/certificates/verify",
				class: "transition hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Certificate verification`);
					else return [createTextVNode("Certificate verification")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/reviews",
				class: "transition hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Student reviews`);
					else return [createTextVNode("Student reviews")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></footer>`);
		};
	}
});
// app/components/AppFooter.vue
var _sfc_setup$2 = AppFooter_vue_vue_type_script_setup_true_lang_default.setup;
AppFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var AppFooter_default = Object.assign(AppFooter_vue_vue_type_script_setup_true_lang_default, { __name: "AppFooter" });
// app/components/WhatsAppButton.vue
var _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<a${ssrRenderAttrs(mergeProps({
		href: "https://wa.me/8801309270105?text=Hi!%20I%20have%20a%20question%20about%20Redwan's%20Method%20courses.",
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Chat with us on WhatsApp",
		class: "fixed bottom-4 right-4 z-50 flex h-12 w-12 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95"
	}, _attrs))}><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" class="h-7 w-7" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg></a>`);
}
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/WhatsAppButton.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var WhatsAppButton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]), { __name: "WhatsAppButton" });
// app/layouts/default.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_AppHeader = AppHeader_default;
	const _component_AppFooter = AppFooter_default;
	const _component_AppToast = AppToast_default;
	const _component_WhatsAppButton = WhatsAppButton_default;
	_push(`<div${ssrRenderAttrs(_attrs)}>`);
	_push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
	_push(`<main class="min-h-[60vh] pt-18 print:pt-0">`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</main>`);
	_push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
	_push(ssrRenderComponent(_component_AppToast, null, null, _parent));
	_push(ssrRenderComponent(_component_WhatsAppButton, null, null, _parent));
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { default_default as default };
//# sourceMappingURL=default-DxPk2hf4.mjs.map
