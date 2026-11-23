import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { a as useRoute, b as useApi, l as useState, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2 } from '../virtual/entry.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
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

// app/pages/quizzes/[id]/result/[attemptId].vue?vue&type=script&setup=true&lang.ts
var _attemptId__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[attemptId]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const id = Number(route.params.id);
		const attemptId = Number(route.params.attemptId);
		const courseSlug = computed(() => String(route.query.course || ""));
		const { apiData } = useApi();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(`quiz-result-${attemptId}`, async () => {
			return {
				attempt: await apiData(`/quiz-attempts/${attemptId}`),
				quiz: await apiData(`/quizzes/${id}`).catch(() => null)
			};
		})), __temp = await __temp, __restore(), __temp);
		const review = useState(`quiz-review-${attemptId}`, () => null);
		const attempt = computed(() => data.value?.attempt ?? null);
		const quiz = computed(() => data.value?.quiz ?? null);
		const questionsById = computed(() => {
			const map = /* @__PURE__ */ new Map();
			for (const question of quiz.value?.questions ?? []) map.set(question.id, {
				question: question.question,
				options: question.options
			});
			return map;
		});
		function optionText(questionId, optionId) {
			return questionsById.value.get(questionId)?.options?.find((option) => option.id === optionId)?.text ?? optionId;
		}
		function selectedTexts(questionId) {
			return (attempt.value?.answers?.[String(questionId)] ?? []).map((optionId) => optionText(questionId, optionId));
		}
		const reviewRows = computed(() => {
			if (review.value?.length) return review.value.map((item) => ({
				questionId: item.question_id,
				question: questionsById.value.get(item.question_id)?.question ?? `Question #${item.question_id}`,
				selected: item.selected.map((optionId) => optionText(item.question_id, optionId)),
				correct: item.correct_answers.map((optionId) => optionText(item.question_id, optionId)),
				isCorrect: item.is_correct,
				marks: item.marks
			}));
			return (quiz.value?.questions ?? []).map((question) => ({
				questionId: question.id,
				question: question.question,
				selected: selectedTexts(question.id),
				correct: [],
				isCorrect: null,
				marks: question.marks
			}));
		});
		const backTo = computed(() => courseSlug.value ? `/learn/${courseSlug.value}` : "/my-courses");
		useSeoMeta({
			title: () => quiz.value ? `${quiz.value.title} — Result` : "Quiz result — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[820px] px-4 py-8 md:px-6 md:py-10" }, _attrs))}>`);
			if (unref(pending)) _push(`<div class="space-y-4"><div class="card h-48 animate-pulse bg-gray-100"></div><div class="card h-64 animate-pulse bg-gray-100"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this result",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(attempt)) {
				_push(`<!--[--><nav class="mb-4 text-xs text-gray-500" aria-label="Breadcrumb">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(backTo),
					class: "hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Learning`);
						else return [createTextVNode("Learning")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="mx-1.5">/</span>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/quizzes/${unref(id)}${unref(courseSlug) ? `?course=${unref(courseSlug)}` : ""}`,
					class: "hover:text-oc-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Quiz`);
						else return [createTextVNode("Quiz")];
					}),
					_: 1
				}, _parent));
				_push(`<span class="mx-1.5">/</span><span class="text-gray-700">Result</span></nav><section class="${ssrRenderClass([unref(attempt).passed ? "bg-gradient-to-r from-emerald-600 to-teal-500" : "bg-gradient-to-r from-rose-600 to-orange-500", "overflow-hidden rounded-2xl p-6 text-center text-white md:p-8"])}"><span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: unref(attempt).passed ? "award" : "rotate-ccw",
					size: 32
				}, null, _parent));
				_push(`</span><h1 class="mt-3 text-2xl font-extrabold">${ssrInterpolate(unref(attempt).passed ? "Congratulations!" : "Keep practising")}</h1><p class="mt-1 text-sm text-white/85">${ssrInterpolate(unref(attempt).passed ? "You passed this quiz." : "You did not reach the pass mark this time.")}</p><div class="mx-auto mt-5 grid max-w-md grid-cols-3 gap-2"><div class="rounded-xl bg-white/15 p-3"><p class="text-[11px] uppercase tracking-wide text-white/70">Score</p><p class="text-xl font-extrabold">${ssrInterpolate(unref(attempt).score)}/${ssrInterpolate(unref(attempt).total_marks)}</p></div><div class="rounded-xl bg-white/15 p-3"><p class="text-[11px] uppercase tracking-wide text-white/70">Percentage</p><p class="text-xl font-extrabold">${ssrInterpolate(Math.round(unref(attempt).percentage))}%</p></div><div class="rounded-xl bg-white/15 p-3"><p class="text-[11px] uppercase tracking-wide text-white/70">Pass mark</p><p class="text-xl font-extrabold">${ssrInterpolate(unref(quiz)?.pass_percentage ?? "—")}%</p></div></div></section><div class="mt-4 flex flex-wrap items-center justify-between gap-3"><p class="text-xs text-gray-500">Submitted ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(unref(attempt).completed_at, true))}</p><div class="flex gap-2">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(backTo),
					class: "btn-secondary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Back to course`);
						else return [createTextVNode("Back to course")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/quizzes/${unref(id)}${unref(courseSlug) ? `?course=${unref(courseSlug)}` : ""}`,
					class: "btn-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "rotate-ccw",
								size: 15
							}, null, _parent, _scopeId));
							_push(` Try again `);
						} else return [createVNode(_component_BaseIcon, {
							name: "rotate-ccw",
							size: 15
						}), createTextVNode(" Try again ")];
					}),
					_: 1
				}, _parent));
				_push(`</div></div>`);
				if (!unref(review) && unref(quiz)) {
					_push(`<section class="mt-4 flex items-start gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-xs text-blue-700">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "info",
						size: 16,
						class: "mt-0.5 shrink-0"
					}, null, _parent));
					_push(` Detailed correct answers are shown immediately after submitting. You can still review the answers you chose below. </section>`);
				} else _push(`<!---->`);
				if (unref(reviewRows).length) {
					_push(`<section class="mt-5 space-y-3"><h2 class="text-sm font-bold text-gray-900">Answer review</h2><!--[-->`);
					ssrRenderList$2(unref(reviewRows), (row, index) => {
						_push(`<article class="card p-4"><div class="flex items-start justify-between gap-3"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(index + 1)}. ${ssrInterpolate(row.question)}</p>`);
						if (row.isCorrect !== null) _push(`<span class="${ssrRenderClass([row.isCorrect ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200", "badge shrink-0"])}">${ssrInterpolate(row.isCorrect ? "Correct" : "Incorrect")}</span>`);
						else _push(`<span class="badge shrink-0 bg-gray-50 text-gray-600 ring-gray-200">${ssrInterpolate(row.marks)} mark${ssrInterpolate(row.marks === 1 ? "" : "s")}</span>`);
						_push(`</div><div class="mt-2 space-y-1 text-xs"><p class="text-gray-500"> Your answer: <span class="font-semibold text-gray-800">${ssrInterpolate(row.selected.length ? row.selected.join(", ") : "Not answered")}</span></p>`);
						if (row.correct.length) _push(`<p class="text-gray-500"> Correct answer: <span class="font-semibold text-emerald-700">${ssrInterpolate(row.correct.join(", "))}</span></p>`);
						else _push(`<!---->`);
						_push(`</div></article>`);
					});
					_push(`<!--]--></section>`);
				} else _push(`<!---->`);
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
// app/pages/quizzes/[id]/result/[attemptId].vue
var _sfc_setup = _attemptId__vue_vue_type_script_setup_true_lang_default.setup;
_attemptId__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/quizzes/[id]/result/[attemptId].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _attemptId__default = _attemptId__vue_vue_type_script_setup_true_lang_default;

export { _attemptId__default as default };
//# sourceMappingURL=_attemptId_-Tyf2BZ0g.mjs.map
