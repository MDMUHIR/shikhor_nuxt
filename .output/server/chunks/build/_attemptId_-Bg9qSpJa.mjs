import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { u as useConfirm } from './useConfirm-CnJ5-A8T.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { n as negativeMarkingLabel, f as formatClock } from './exam-CSv7Xs_5.mjs';
import { defineComponent, withAsyncContext, ref, computed, reactive, watch, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

// app/pages/exams/attempt/[attemptId].vue?vue&type=script&setup=true&lang.ts
var _attemptId__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[attemptId]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const attemptId = Number(route.params.attemptId);
		const { apiData } = useApi();
		const { ask } = useConfirm();
		const toast = useToast();
		const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`exam-attempt-${attemptId}`, () => apiData(`/exam-attempts/${attemptId}`))), __temp = await __temp, __restore(), __temp);
		const result = ref(null);
		const take = computed(() => data.value && "questions" in data.value ? data.value : null);
		const shown = computed(() => result.value ?? (data.value && "review" in data.value ? data.value : null));
		const answers = reactive({});
		const current = ref(0);
		const flagged = reactive({});
		const deadline = ref(0);
		const now = ref(Date.now());
		const saveState = ref("idle");
		const submitting = ref(false);
		watch(take, (state) => {
			if (!state) return;
			for (const [key, value] of Object.entries(state.answers ?? {})) answers[Number(key)] = [...value];
			deadline.value = Date.now() + state.seconds_left * 1e3;
		}, { immediate: true });
		const secondsLeft = computed(() => Math.max(0, Math.ceil((deadline.value - now.value) / 1e3)));
		const questions = computed(() => take.value?.questions ?? []);
		const question = computed(() => questions.value[current.value]);
		const answeredCount = computed(() => questions.value.filter((q) => (answers[q.id] ?? []).length > 0).length);
		const lowTime = computed(() => secondsLeft.value <= 60);
		function selected(q, optionId) {
			return (answers[q.id] ?? []).includes(optionId);
		}
		function payload() {
			const out = {};
			for (const q of questions.value) out[q.id] = answers[q.id] ?? [];
			return out;
		}
		async function submit(auto = false) {
			if (submitting.value || result.value) return;
			if (!auto) {
				const unanswered = questions.value.length - answeredCount.value;
				if (!await ask({
					title: "Submit exam",
					message: unanswered ? `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. Submit anyway? You cannot change answers afterwards.` : "Submit your answers now? You cannot change them afterwards.",
					confirmLabel: "Submit exam",
					tone: "primary"
				})) return;
			}
			submitting.value = true;
			try {
				result.value = await apiData(`/exam-attempts/${attemptId}/submit`, {
					method: "POST",
					body: { answers: payload() }
				});
				if (auto) toast.info("Time is up — your exam was submitted automatically.");
			} catch (err) {
				toast.error(err.message);
				await refresh();
			} finally {
				submitting.value = false;
			}
		}
		watch(secondsLeft, (value) => {
			if (take.value && !result.value && value === 0) submit(true);
		});
		const statusStyle = {
			correct: "border-emerald-200 bg-emerald-50/50",
			wrong: "border-rose-200 bg-rose-50/50",
			unanswered: "border-gray-200 bg-gray-50/50"
		};
		useSeoMeta({
			title: "Exam — Shikhor Academy",
			robots: "noindex"
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ErrorState = ErrorState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_EmptyState = EmptyState_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto w-full max-w-[1000px] px-4 py-6 md:px-6 md:py-8" }, _attrs))}>`);
			if (unref(pending)) _push(`<div class="card h-64 animate-pulse bg-gray-50"></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this attempt",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(shown)) {
				_push(`<!--[--><section class="card overflow-hidden"><div class="${ssrRenderClass([unref(shown).attempt.passed ? "bg-emerald-50" : "bg-rose-50", "p-6 text-center"])}"><p class="${ssrRenderClass([unref(shown).attempt.passed ? "text-emerald-600" : "text-rose-600", "text-xs font-bold uppercase tracking-widest"])}">${ssrInterpolate(unref(shown).attempt.passed ? "Passed" : "Not passed")} `);
				if (unref(shown).attempt.status === "expired") _push(`<!--[--> · time ran out<!--]-->`);
				else _push(`<!---->`);
				_push(`</p><h1 class="mt-1 text-lg font-bold text-gray-900">${ssrInterpolate(unref(shown).exam.title)}</h1><p class="mt-3 text-5xl font-extrabold text-gray-900">${ssrInterpolate(unref(shown).attempt.score)}<span class="text-xl font-semibold text-gray-400"> / ${ssrInterpolate(unref(shown).attempt.total_marks)}</span></p><p class="mt-1 text-sm text-gray-600">${ssrInterpolate(unref(shown).attempt.percentage)}% · pass mark ${ssrInterpolate(unref(shown).attempt.pass_percentage)}%</p></div><dl class="grid grid-cols-2 divide-x divide-y divide-gray-100 text-center sm:grid-cols-4 sm:divide-y-0"><div class="p-4"><dt class="text-[11px] text-gray-400">Correct</dt><dd class="text-xl font-extrabold text-emerald-600">${ssrInterpolate(unref(shown).attempt.correct_count)}</dd></div><div class="p-4"><dt class="text-[11px] text-gray-400">Wrong</dt><dd class="text-xl font-extrabold text-rose-600">${ssrInterpolate(unref(shown).attempt.wrong_count)}</dd></div><div class="p-4"><dt class="text-[11px] text-gray-400">Unanswered</dt><dd class="text-xl font-extrabold text-gray-700">${ssrInterpolate(unref(shown).attempt.unanswered_count)}</dd></div><div class="p-4"><dt class="text-[11px] text-gray-400">Negative marks</dt><dd class="${ssrRenderClass([unref(shown).attempt.negative_marks_total ? "text-rose-600" : "text-gray-700", "text-xl font-extrabold"])}">−${ssrInterpolate(unref(shown).attempt.negative_marks_total)}</dd></div></dl>`);
				if (unref(shown).attempt.negative_marking) _push(`<p class="border-t border-gray-100 px-5 py-3 text-center text-xs text-gray-500">${ssrInterpolate(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(unref(shown).exam))}</p>`);
				else _push(`<!---->`);
				_push(`<div class="flex flex-wrap justify-center gap-2 border-t border-gray-100 p-4">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/exams/${unref(shown).exam.id}`,
					class: "btn-primary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`Back to exam`);
						else return [createTextVNode("Back to exam")];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/exams",
					class: "btn-secondary"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`All exams`);
						else return [createTextVNode("All exams")];
					}),
					_: 1
				}, _parent));
				_push(`</div></section><section class="mt-6"><h2 class="text-base font-bold text-gray-900">Review</h2>`);
				if (!unref(shown).answers_visible) _push(`<p class="mt-1 text-xs text-gray-500"> Correct answers are hidden for this exam${ssrInterpolate(unref(shown).exam.show_answers === "after_exam_end" ? " until it closes" : "")}. </p>`);
				else _push(`<!---->`);
				_push(`<ol class="mt-3 space-y-3"><!--[-->`);
				ssrRenderList$2(unref(shown).review, (item, index) => {
					_push(`<li class="${ssrRenderClass([statusStyle[item.status], "rounded-2xl border p-4"])}"><div class="flex items-start justify-between gap-3"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(index + 1)}. ${ssrInterpolate(item.question)}</p><span class="${ssrRenderClass([item.awarded > 0 ? "text-emerald-600" : item.awarded < 0 ? "text-rose-600" : "text-gray-400", "shrink-0 text-xs font-bold"])}">${ssrInterpolate(item.awarded > 0 ? "+" : "")}${ssrInterpolate(item.awarded)} / ${ssrInterpolate(item.marks)}</span></div><ul class="mt-3 space-y-1.5"><!--[-->`);
					ssrRenderList$2(item.options, (option) => {
						_push(`<li class="${ssrRenderClass([[item.correct_answers?.includes(String(option.id)) ? "bg-emerald-100 font-semibold text-emerald-800" : item.selected.includes(String(option.id)) ? "bg-rose-100 text-rose-800" : "bg-white text-gray-700"], "flex items-center gap-2 rounded-lg px-3 py-2 text-sm"])}"><span class="flex-1">${ssrInterpolate(option.text)}</span>`);
						if (item.selected.includes(String(option.id))) _push(`<span class="text-[11px] font-semibold">Your answer</span>`);
						else _push(`<!---->`);
						if (item.correct_answers?.includes(String(option.id))) _push(`<span class="text-[11px] font-semibold">Correct</span>`);
						else _push(`<!---->`);
						_push(`</li>`);
					});
					_push(`<!--]--></ul>`);
					if (item.status === "unanswered") _push(`<p class="mt-2 text-xs text-gray-500">You skipped this question (no penalty).</p>`);
					else _push(`<!---->`);
					if (item.explanation) _push(`<p class="mt-2 rounded-lg bg-white/70 p-3 text-xs leading-5 text-gray-600"><span class="font-semibold">Explanation:</span> ${ssrInterpolate(item.explanation)}</p>`);
					else _push(`<!---->`);
					_push(`</li>`);
				});
				_push(`<!--]--></ol></section><!--]-->`);
			} else if (unref(take) && unref(question)) {
				_push(`<!--[--><div class="sticky top-0 z-30 -mx-4 mb-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6"><div class="flex items-center justify-between gap-3"><div class="min-w-0"><p class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(unref(take).exam.title)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(unref(answeredCount))}/${ssrInterpolate(unref(questions).length)} answered · <span class="${ssrRenderClass(unref(saveState) === "error" ? "text-rose-500" : "")}">${ssrInterpolate(unref(saveState) === "saving" ? "Saving…" : unref(saveState) === "error" ? "Not saved — retrying" : unref(saveState) === "saved" ? "All answers saved" : "")}</span></p></div><div class="flex items-center gap-3"><span class="${ssrRenderClass([unref(lowTime) ? "animate-pulse bg-rose-100 text-rose-600" : "bg-gray-100 text-gray-800", "rounded-xl px-2.5 py-1.5 font-mono text-base font-extrabold tabular-nums sm:px-3 sm:text-lg"])}">${ssrInterpolate(("formatClock" in _ctx ? _ctx.formatClock : unref(formatClock))(unref(secondsLeft)))}</span><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(submitting)) ? " disabled" : ""}>${ssrInterpolate(unref(submitting) ? "Submitting…" : "Submit")}</button></div></div></div><div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_260px]"><section class="card p-5 md:p-6"><div class="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500"><span class="font-semibold">Question ${ssrInterpolate(unref(current) + 1)} of ${ssrInterpolate(unref(questions).length)}</span><span>${ssrInterpolate(unref(question).marks)} mark${ssrInterpolate(unref(question).marks === 1 ? "" : "s")} `);
				if (unref(take).attempt.negative_marking && unref(question).negative_marks) _push(`<span class="ml-2 font-semibold text-rose-600">−${ssrInterpolate(unref(question).negative_marks)} if wrong</span>`);
				else _push(`<!---->`);
				_push(`</span></div><h2 class="mt-3 whitespace-pre-line text-base font-semibold leading-7 text-gray-900">${ssrInterpolate(unref(question).question)}</h2>`);
				if (unref(question).type === "multiple_choice") _push(`<p class="mt-1 text-xs text-gray-500">Select all that apply. Every correct option is needed for marks.</p>`);
				else _push(`<!---->`);
				_push(`<ul class="mt-4 space-y-2"><!--[-->`);
				ssrRenderList$2(unref(question).options, (option) => {
					_push(`<li><button type="button" class="${ssrRenderClass([selected(unref(question), option.id) ? "border-oc-primary bg-brand-light font-semibold text-gray-900" : "border-gray-200 hover:border-gray-300", "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition"])}"><span class="${ssrRenderClass([[unref(question).type === "multiple_choice" ? "rounded" : "rounded-full", selected(unref(question), option.id) ? "border-oc-primary bg-oc-primary text-white" : "border-gray-300"], "flex h-5 w-5 shrink-0 items-center justify-center border-2"])}">`);
					if (selected(unref(question), option.id)) _push(ssrRenderComponent(_component_BaseIcon, {
						name: "check",
						size: 12
					}, null, _parent));
					else _push(`<!---->`);
					_push(`</span> ${ssrInterpolate(option.text)}</button></li>`);
				});
				_push(`<!--]--></ul><div class="mt-5 flex flex-wrap items-center justify-between gap-2"><div class="flex gap-2"><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(current) === 0) ? " disabled" : ""}>`);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "arrow-left",
					size: 14
				}, null, _parent));
				_push(` Previous</button><button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(current) === unref(questions).length - 1) ? " disabled" : ""}>Next `);
				_push(ssrRenderComponent(_component_BaseIcon, {
					name: "arrow-right",
					size: 14
				}, null, _parent));
				_push(`</button></div><div class="flex gap-2">`);
				if ((unref(answers)[unref(question).id] ?? []).length) _push(`<button type="button" class="btn-ghost text-xs">Clear answer</button>`);
				else _push(`<!---->`);
				_push(`<button type="button" class="${ssrRenderClass([unref(flagged)[unref(question).id] ? "text-amber-600" : "", "btn-ghost text-xs"])}">${ssrInterpolate(unref(flagged)[unref(question).id] ? "Unmark review" : "Mark for review")}</button></div></div></section><aside class="card h-fit p-4 lg:sticky lg:top-24"><p class="text-xs font-bold uppercase tracking-wide text-gray-400">Questions</p><div class="mt-3 grid grid-cols-6 gap-1.5 sm:grid-cols-8 lg:grid-cols-5"><!--[-->`);
				ssrRenderList$2(unref(questions), (q, index) => {
					_push(`<button type="button" class="${ssrRenderClass([[index === unref(current) ? "ring-2 ring-oc-primary" : "", (unref(answers)[q.id] ?? []).length ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"], "relative h-9 rounded-lg text-xs font-bold transition"])}">${ssrInterpolate(index + 1)} `);
					if (unref(flagged)[q.id]) _push(`<span class="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber-400"></span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--></div><p class="mt-3 text-[11px] text-gray-400">Blue = answered · grey = not answered · yellow dot = marked for review</p></aside></div><!--]-->`);
			} else _push(ssrRenderComponent(_component_EmptyState, {
				icon: "list",
				title: "Attempt unavailable",
				message: "This attempt could not be loaded.",
				"action-label": "Back to exams",
				"action-to": "/exams"
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/exams/attempt/[attemptId].vue
var _sfc_setup = _attemptId__vue_vue_type_script_setup_true_lang_default.setup;
_attemptId__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/exams/attempt/[attemptId].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _attemptId__default = _attemptId__vue_vue_type_script_setup_true_lang_default;

export { _attemptId__default as default };
//# sourceMappingURL=_attemptId_-Bg9qSpJa.mjs.map
