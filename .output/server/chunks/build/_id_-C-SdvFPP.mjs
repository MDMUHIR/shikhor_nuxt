import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, s as ssrRenderList$2, N as NuxtLink, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { defineComponent, computed, withAsyncContext, reactive, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
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

// app/pages/quizzes/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const id = Number(route.params.id);
		const courseSlug = computed(() => String(route.query.course || ""));
		const { apiData} = useApi();
		useToast();
		const { data: quiz, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`quiz-${id}`, () => apiData(`/quizzes/${id}`))), __temp = await __temp, __restore(), __temp);
		const answers = reactive({});
		const submitting = ref(false);
		const formError = ref("");
		const remainingSeconds = ref(null);
		const totalQuestions = computed(() => quiz.value?.questions?.length ?? 0);
		const answeredCount = computed(() => quiz.value?.questions?.filter((question) => (answers[question.id] || []).length > 0).length ?? 0);
		const attemptsLeft = computed(() => quiz.value?.attempts_remaining);
		const canAttempt = computed(() => attemptsLeft.value === null || (attemptsLeft.value ?? 0) > 0);
		const timeLabel = computed(() => {
			if (remainingSeconds.value === null) return "";
			const minutes = Math.floor(remainingSeconds.value / 60);
			const seconds = remainingSeconds.value % 60;
			return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
		});
		function optionsOf(question) {
			return question.options || [];
		}
		function isChecked(question, optionId) {
			return (answers[question.id] || []).includes(optionId);
		}
		useSeoMeta({
			title: () => quiz.value ? `${quiz.value.title} — Quiz` : "Quiz — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[860px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}>`);
			if (unref(pending)) {
				_push(`<div class="space-y-4"><div class="card h-40 animate-pulse bg-gray-100"></div><!--[-->`);
				ssrRenderList$2(3, (i) => {
					_push(`<div class="card h-44 animate-pulse bg-gray-100"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Quiz unavailable",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(courseSlug) ? `/learn/${unref(courseSlug)}` : "/my-courses",
						class: "btn-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Back to course`);
							else return [createTextVNode("Back to course")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_NuxtLink, {
						to: unref(courseSlug) ? `/learn/${unref(courseSlug)}` : "/my-courses",
						class: "btn-primary"
					}, {
						default: withCtx(() => [createTextVNode("Back to course")]),
						_: 1
					}, 8, ["to"])];
				}),
				_: 1
			}, _parent));
			else if (unref(quiz)) {
				_push(`<!--[--><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(courseSlug) ? `/learn/${unref(courseSlug)}` : "/my-courses",
					class: "hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Learning`);
						else return [createTextVNode("Learning")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="mx-1.5">/</span><span class="text-gray-700">${ssrInterpolate(unref(quiz).title)}</span></nav><div class="card p-6"><div class="flex flex-wrap items-start justify-between gap-4"><div><p class="eyebrow">Quiz</p><h1 class="mt-1 text-2xl font-extrabold text-gray-900">${ssrInterpolate(unref(quiz).title)}</h1>`);
				if (unref(quiz).description) _push(`<p class="mt-2 text-sm text-gray-600">${ssrInterpolate(unref(quiz).description)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (unref(remainingSeconds) !== null) _push(`<div class="rounded-xl bg-rose-50 px-4 py-2 text-center"><p class="text-[11px] font-semibold uppercase tracking-wide text-rose-500">Time left</p><p class="text-xl font-extrabold text-rose-600">${ssrInterpolate(unref(timeLabel))}</p></div>`);
				else _push(`<!---->`);
				_push(`</div><dl class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"><div class="rounded-xl bg-gray-50 p-3 text-center"><dt class="text-[11px] uppercase tracking-wide text-gray-400">Questions</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(totalQuestions))}</dd></div><div class="rounded-xl bg-gray-50 p-3 text-center"><dt class="text-[11px] uppercase tracking-wide text-gray-400">Total marks</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(quiz).total_marks)}</dd></div><div class="rounded-xl bg-gray-50 p-3 text-center"><dt class="text-[11px] uppercase tracking-wide text-gray-400">Pass mark</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(quiz).pass_percentage)}%</dd></div><div class="rounded-xl bg-gray-50 p-3 text-center"><dt class="text-[11px] uppercase tracking-wide text-gray-400">Attempts left</dt><dd class="text-lg font-extrabold text-gray-900">${ssrInterpolate(unref(quiz).attempts_remaining === null ? "∞" : unref(quiz).attempts_remaining)}</dd></div></dl>`);
				if (unref(quiz).has_passed) {
					_push(`<div class="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "check-circle",
						size: 18
					}, null, _parent));
					_push(` You have already passed this quiz with a best score of ${ssrInterpolate(Math.round(unref(quiz).best_percentage))}%. </div>`);
				} else if (!unref(canAttempt)) {
					_push(`<div class="mt-4 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "alert-circle",
						size: 18
					}, null, _parent));
					_push(` You have used all of your attempts for this quiz. </div>`);
				} else _push(`<!---->`);
				_push(`</div><form class="mt-5 space-y-4"><!--[-->`);
				ssrRenderList$2(unref(quiz).questions, (question, index) => {
					_push(`<article class="card p-5"><div class="flex items-start justify-between gap-3"><div class="flex gap-2"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-light text-xs font-bold text-oc-primary">${ssrInterpolate(index + 1)}</span><div><p class="text-sm font-semibold leading-6 text-gray-900">${ssrInterpolate(question.question)}</p><p class="mt-1 text-[11px] text-gray-400">${ssrInterpolate(question.type === "multiple_choice" ? "Select all that apply" : "Select one answer")} · ${ssrInterpolate(question.marks)} mark${ssrInterpolate(question.marks === 1 ? "" : "s")}</p></div></div>`);
					if ((unref(answers)[question.id] || []).length) _push(`<span class="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Answered</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="mt-3 space-y-2 pl-9"><!--[-->`);
					ssrRenderList$2(optionsOf(question), (option) => {
						_push(`<label class="${ssrRenderClass([isChecked(question, option.id) ? "border-oc-primary bg-brand-light" : "border-gray-200 hover:border-gray-300", "flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition"])}"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${ssrIncludeBooleanAttr(isChecked(question, option.id)) ? " checked" : ""}${ssrRenderAttr("name", `question-${question.id}`)}><span class="text-gray-700">${ssrInterpolate(option.text)}</span></label>`);
					});
					_push(`<!--]--></div></article>`);
				});
				_push(`<!--]--><div class="sticky bottom-4 card flex flex-wrap items-center justify-between gap-3 p-4"><p class="text-sm text-gray-600"><strong class="text-gray-900">${ssrInterpolate(unref(answeredCount))}</strong> / ${ssrInterpolate(unref(totalQuestions))} answered </p><div class="flex items-center gap-2">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(courseSlug) ? `/learn/${unref(courseSlug)}` : "/my-courses",
					class: "btn-secondary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Exit`);
						else return [createTextVNode("Exit")];
					}),
					_: 1
				}, _parent));
				_push(`<button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(submitting) || !unref(canAttempt)) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "check",
					size: 16
				}, null, _parent));
				_push(` ${ssrInterpolate(unref(submitting) ? "Submitting…" : "Submit quiz")}</button></div></div>`);
				if (unref(formError)) _push(`<p class="field-error">${ssrInterpolate(unref(formError))}</p>`);
				else _push(`<!---->`);
				_push(`</form><!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/quizzes/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quizzes/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-C-SdvFPP.mjs.map
