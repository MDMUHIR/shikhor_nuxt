import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { n as negativeMarkingLabel } from './exam-CSv7Xs_5.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, withAsyncContext, ref, computed, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/exams/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const id = Number(route.params.id);
		const { apiData } = useApi();
		useToast();
		const { data: exam, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`exam-${id}`, () => apiData(`/exams/${id}`))), __temp = await __temp, __restore(), __temp);
		const starting = ref(false);
		const canStart = computed(() => {
			const e = exam.value;
			if (!e || !e.can_take) return false;
			if (e.in_progress_attempt_id) return true;
			return e.state === "open" && (e.attempts_left === null || e.attempts_left > 0);
		});
		useSeoMeta({
			title: () => `${exam.value?.title ?? "Exam"} — Shikhor Academy`,
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			const _component_ErrorState = ErrorState_default;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[860px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/exams",
				class: "hover:text-oc-primary"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`Exams`);
					else return [createTextVNode("Exams")];
				}),
				_: 1
			}, _parent));
			_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(exam)?.title)}</span></nav>`);
			if (unref(pending)) _push(`<div class="card h-64 animate-pulse bg-gray-50"></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this exam",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(exam)) {
				_push(`<!--[--><section class="card p-6"><h1 class="text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(exam).title)}</h1>`);
				if (unref(exam).course) _push(`<p class="mt-1 text-sm text-gray-500">Course: ${ssrInterpolate(unref(exam).course.title)}</p>`);
				else _push(`<!---->`);
				if (unref(exam).description) _push(`<p class="mt-3 text-sm leading-6 text-gray-600">${ssrInterpolate(unref(exam).description)}</p>`);
				else _push(`<!---->`);
				_push(`<dl class="mt-5 grid grid-cols-2 gap-3 text-center sm:grid-cols-4"><div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Questions</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(exam).questions_count)}</dd></div><div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Duration</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(exam).duration_minutes)} min</dd></div><div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Total marks</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(exam).total_marks)}</dd></div><div class="rounded-xl bg-gray-50 p-3"><dt class="text-[11px] text-gray-400">Pass mark</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(exam).pass_percentage)}%</dd></div></dl><ul class="mt-5 space-y-2 text-sm text-gray-700"><li class="flex gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "alert-circle",
					size: 16,
					class: ["mt-0.5 shrink-0", unref(exam).negative_marking ? "text-rose-500" : "text-gray-400"]
				}, null, _parent));
				_push(`<span class="${ssrRenderClass(unref(exam).negative_marking ? "font-semibold text-rose-600" : "")}">${ssrInterpolate(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(unref(exam)))}`);
				if (unref(exam).negative_marking) {
					_push(`<!--[--> · unanswered questions are never penalised`);
					if (!unref(exam).allow_negative_total) _push(`<!--[--> · your total cannot drop below 0<!--]-->`);
					else _push(`<!---->`);
					_push(`<!--]-->`);
				} else _push(`<!---->`);
				_push(`</span></li><li class="flex gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "clock",
					size: 16,
					class: "mt-0.5 shrink-0 text-gray-400"
				}, null, _parent));
				_push(` The timer is kept by the server and keeps running if you leave. When it ends your answers are submitted automatically.</li><li class="flex gap-2">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "check-circle",
					size: 16,
					class: "mt-0.5 shrink-0 text-gray-400"
				}, null, _parent));
				_push(` Marks and result appear instantly after you submit.</li>`);
				if (unref(exam).max_attempts) {
					_push(`<li class="flex gap-2">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "refresh",
						size: 16,
						class: "mt-0.5 shrink-0 text-gray-400"
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(exam).attempts_left)} of ${ssrInterpolate(unref(exam).max_attempts)} attempts left.</li>`);
				} else _push(`<!---->`);
				if (unref(exam).starts_at || unref(exam).ends_at) {
					_push(`<li class="flex gap-2">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "calendar",
						size: 16,
						class: "mt-0.5 shrink-0 text-gray-400"
					}, null, _parent));
					_push(` Open ${ssrInterpolate(unref(exam).starts_at ? ("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(exam).starts_at, true) : "now")} → ${ssrInterpolate(unref(exam).ends_at ? ("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(exam).ends_at, true) : "no end date")}</li>`);
				} else _push(`<!---->`);
				_push(`</ul>`);
				if (unref(exam).instructions) _push(`<div class="mt-5 rounded-xl border border-amber-100 bg-amber-50/60 p-4 text-sm leading-6 text-gray-700"><p class="mb-1 text-xs font-bold uppercase tracking-wide text-amber-700">Instructions</p><p class="whitespace-pre-line">${ssrInterpolate(unref(exam).instructions)}</p></div>`);
				else _push(`<!---->`);
				if (!unref(exam).can_take) {
					_push(`<p class="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-600">${ssrInterpolate(unref(exam).blocked_reason)} `);
					if (unref(exam).course) _push(ssrRenderComponent(_component_NuxtLink, {
						to: `/courses/${unref(exam).course.slug}`,
						class: "font-semibold underline"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`View course`);
							else return [createTextVNode("View course")];
						}),
						_: 1
					}, _parent));
					else _push(`<!---->`);
					_push(`</p>`);
				} else if (unref(exam).state === "upcoming") _push(`<p class="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700">This exam has not started yet.</p>`);
				else if (unref(exam).state === "closed" && !unref(exam).in_progress_attempt_id) _push(`<p class="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">This exam is closed.</p>`);
				else if (unref(exam).attempts_left === 0 && !unref(exam).in_progress_attempt_id) _push(`<p class="mt-5 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-600">You have used all of your attempts.</p>`);
				else _push(`<!---->`);
				if (unref(canStart)) {
					_push(`<button type="button" class="btn-primary mt-6 w-full sm:w-auto"${ssrIncludeBooleanAttr(unref(starting)) ? " disabled" : ""}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "play",
						size: 16
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(starting) ? "Starting…" : unref(exam).in_progress_attempt_id ? "Resume exam" : "Start exam")}</button>`);
				} else _push(`<!---->`);
				_push(`</section>`);
				if (unref(exam).attempts.length) {
					_push(`<section class="card mt-5 p-5"><h2 class="text-sm font-bold text-gray-900">Your attempts</h2><ul class="mt-3 divide-y divide-gray-100"><!--[-->`);
					ssrRenderList$2(unref(exam).attempts, (attempt, index) => {
						_push(`<li class="flex flex-wrap items-center justify-between gap-3 py-3"><div><p class="text-sm font-semibold text-gray-800">Attempt ${ssrInterpolate(unref(exam).attempts.length - index)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(attempt.submitted_at, true))}`);
						if (attempt.status === "expired") _push(`<span> · auto-submitted (time up)</span>`);
						else _push(`<!---->`);
						_push(`</p></div><div class="flex items-center gap-3"><span class="text-sm font-bold text-gray-900">${ssrInterpolate(attempt.score)}/${ssrInterpolate(attempt.total_marks)} <span class="text-xs font-normal text-gray-400">(${ssrInterpolate(attempt.percentage)}%)</span></span><span class="${ssrRenderClass([attempt.passed ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200", "badge"])}">${ssrInterpolate(attempt.passed ? "Passed" : "Not passed")}</span>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/exams/attempt/${attempt.id}`,
							class: "btn-secondary !px-3 !py-1.5 text-xs"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`Result`);
								else return [createTextVNode("Result")];
							}),
							_: 2
						}, _parent));
						_push(`</div></li>`);
					});
					_push(`<!--]--></ul></section>`);
				} else _push(`<!---->`);
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/exams/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exams/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-D5UpWqk4.mjs.map
