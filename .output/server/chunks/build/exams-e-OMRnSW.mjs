import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { c as useSeoMeta, b as useApi, s as ssrRenderList$2, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { n as negativeMarkingLabel } from './exam-CSv7Xs_5.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

// app/pages/exams/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Exams — Shikhor Academy",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("exams-list", () => apiData("/exams"))), __temp = await __temp, __restore(), __temp);
		const filter = ref("all");
		const exams = computed(() => {
			const list = data.value ?? [];
			if (filter.value === "open") return list.filter((e) => e.state === "open");
			if (filter.value === "upcoming") return list.filter((e) => e.state === "upcoming");
			if (filter.value === "done") return list.filter((e) => e.attempts_used > 0);
			return list;
		});
		function badge(exam) {
			if (exam.in_progress_attempt_id) return {
				label: "In progress",
				cls: "bg-blue-50 text-blue-700 ring-blue-200"
			};
			if (exam.state === "upcoming") return {
				label: "Upcoming",
				cls: "bg-amber-50 text-amber-700 ring-amber-200"
			};
			if (exam.state === "closed") return {
				label: "Closed",
				cls: "bg-gray-50 text-gray-600 ring-gray-200"
			};
			return {
				label: "Open",
				cls: "bg-emerald-50 text-emerald-700 ring-emerald-200"
			};
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1100px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><h1 class="text-2xl font-extrabold text-gray-900 md:text-3xl">Exams</h1><p class="mt-1 text-sm text-gray-500">Timed exams are marked automatically the moment you submit.</p><div class="mt-5 flex flex-wrap gap-1.5"><!--[-->`);
			ssrRenderList$2([
				{
					value: "all",
					label: "All"
				},
				{
					value: "open",
					label: "Open now"
				},
				{
					value: "upcoming",
					label: "Upcoming"
				},
				{
					value: "done",
					label: "Attempted"
				}
			], (item) => {
				_push(`<button type="button" class="${ssrRenderClass([unref(filter) === item.value ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200", "rounded-full px-3.5 py-1.5 text-xs font-semibold transition"])}">${ssrInterpolate(item.label)}</button>`);
			});
			_push(`<!--]--></div>`);
			if (unref(pending)) {
				_push(`<div class="mt-6 grid gap-4 md:grid-cols-2"><!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<div class="card h-40 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				class: "mt-6",
				title: "Could not load exams",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(exams).length) _push(ssrRenderComponent(_component_EmptyState, {
				class: "mt-6",
				icon: "list",
				title: "No exams here",
				message: "Exams from your enrolled courses and open mock tests appear here."
			}, null, _parent));
			else {
				_push(`<div class="mt-6 grid gap-4 md:grid-cols-2"><!--[-->`);
				ssrRenderList$2(unref(exams), (exam) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: exam.id,
						to: `/exams/${exam.id}`,
						class: "card flex flex-col p-5 transition hover:border-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex items-start justify-between gap-3"${_scopeId}><h2 class="text-base font-bold text-gray-900"${_scopeId}>${ssrInterpolate(exam.title)}</h2><span class="${ssrRenderClass([badge(exam).cls, "badge shrink-0"])}"${_scopeId}>${ssrInterpolate(badge(exam).label)}</span></div>`);
								if (exam.course) _push(`<p class="mt-1 text-xs text-gray-500"${_scopeId}>${ssrInterpolate(exam.course.title)}</p>`);
								else _push(`<!---->`);
								_push(`<dl class="mt-4 grid grid-cols-3 gap-2 text-center text-xs"${_scopeId}><div class="rounded-lg bg-gray-50 p-2"${_scopeId}><dt class="text-gray-400"${_scopeId}>Questions</dt><dd class="text-sm font-bold text-gray-800"${_scopeId}>${ssrInterpolate(exam.questions_count)}</dd></div><div class="rounded-lg bg-gray-50 p-2"${_scopeId}><dt class="text-gray-400"${_scopeId}>Time</dt><dd class="text-sm font-bold text-gray-800"${_scopeId}>${ssrInterpolate(exam.duration_minutes)} min</dd></div><div class="rounded-lg bg-gray-50 p-2"${_scopeId}><dt class="text-gray-400"${_scopeId}>Marks</dt><dd class="text-sm font-bold text-gray-800"${_scopeId}>${ssrInterpolate(exam.total_marks)}</dd></div></dl><p class="${ssrRenderClass([exam.negative_marking ? "font-semibold text-rose-600" : "text-gray-400", "mt-3 text-[11px]"])}"${_scopeId}>${ssrInterpolate(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(exam))}</p>`);
								if (exam.best_percentage !== null) _push(`<p class="mt-2 text-xs text-gray-600"${_scopeId}> Best score: <span class="${ssrRenderClass([exam.passed ? "text-emerald-600" : "text-gray-800", "font-bold"])}"${_scopeId}>${ssrInterpolate(exam.best_percentage)}%</span> · ${ssrInterpolate(exam.attempts_used)} attempt${ssrInterpolate(exam.attempts_used === 1 ? "" : "s")}</p>`);
								else _push(`<!---->`);
								if (exam.state === "upcoming" && exam.starts_at) _push(`<p class="mt-2 text-xs text-amber-700"${_scopeId}>Starts ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(exam.starts_at, true))}</p>`);
								else _push(`<!---->`);
							} else return [
								createVNode("div", { class: "flex items-start justify-between gap-3" }, [createVNode("h2", { class: "text-base font-bold text-gray-900" }, toDisplayString(exam.title), 1), createVNode("span", { class: ["badge shrink-0", badge(exam).cls] }, toDisplayString(badge(exam).label), 3)]),
								exam.course ? (openBlock(), createBlock("p", {
									key: 0,
									class: "mt-1 text-xs text-gray-500"
								}, toDisplayString(exam.course.title), 1)) : createCommentVNode("", true),
								createVNode("dl", { class: "mt-4 grid grid-cols-3 gap-2 text-center text-xs" }, [
									createVNode("div", { class: "rounded-lg bg-gray-50 p-2" }, [createVNode("dt", { class: "text-gray-400" }, "Questions"), createVNode("dd", { class: "text-sm font-bold text-gray-800" }, toDisplayString(exam.questions_count), 1)]),
									createVNode("div", { class: "rounded-lg bg-gray-50 p-2" }, [createVNode("dt", { class: "text-gray-400" }, "Time"), createVNode("dd", { class: "text-sm font-bold text-gray-800" }, toDisplayString(exam.duration_minutes) + " min", 1)]),
									createVNode("div", { class: "rounded-lg bg-gray-50 p-2" }, [createVNode("dt", { class: "text-gray-400" }, "Marks"), createVNode("dd", { class: "text-sm font-bold text-gray-800" }, toDisplayString(exam.total_marks), 1)])
								]),
								createVNode("p", { class: ["mt-3 text-[11px]", exam.negative_marking ? "font-semibold text-rose-600" : "text-gray-400"] }, toDisplayString(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(exam)), 3),
								exam.best_percentage !== null ? (openBlock(), createBlock("p", {
									key: 1,
									class: "mt-2 text-xs text-gray-600"
								}, [
									createTextVNode(" Best score: "),
									createVNode("span", { class: ["font-bold", exam.passed ? "text-emerald-600" : "text-gray-800"] }, toDisplayString(exam.best_percentage) + "%", 3),
									createTextVNode(" · " + toDisplayString(exam.attempts_used) + " attempt" + toDisplayString(exam.attempts_used === 1 ? "" : "s"), 1)
								])) : createCommentVNode("", true),
								exam.state === "upcoming" && exam.starts_at ? (openBlock(), createBlock("p", {
									key: 2,
									class: "mt-2 text-xs text-amber-700"
								}, "Starts " + toDisplayString(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(exam.starts_at, true)), 1)) : createCommentVNode("", true)
							];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
		};
	}
});
// app/pages/exams/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exams/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var exams_default = index_vue_vue_type_script_setup_true_lang_default;

export { exams_default as default };
//# sourceMappingURL=exams-e-OMRnSW.mjs.map
