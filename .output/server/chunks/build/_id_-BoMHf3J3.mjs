import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { a as useRoute, b as useApi, c as useSeoMeta, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, r as renderList$2 } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AdminStat_default } from './AdminStat-DEGFcaUv.mjs';
import { P as PaginationLinks_default } from './PaginationLinks-DN6ED60v.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-C4QuXXFq.mjs';
import { u as useAsyncData } from './asyncData-Bcy_CjYi.mjs';
import { n as negativeMarkingLabel } from './exam-CSv7Xs_5.mjs';
import { a as formatDate } from './format-DP0uQCCC.mjs';
import { defineComponent, ref, withAsyncContext, computed, reactive, watch, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, withDirectives, vModelSelect, vModelText, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
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
import './useToast-BG2fH8c_.mjs';

// app/pages/admin/exams/[id].vue?vue&type=script&setup=true&lang.ts
var letters = "abcdefghij";
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const examId = Number(route.params.id);
		const { apiData } = useApi();
		const { busy, fieldError, run} = useFormHandler();
		const tab = ref("questions");
		const { data: exam, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`admin-exam-${examId}`, () => apiData(`/admin/exams/${examId}`))), __temp = await __temp, __restore(), __temp);
		const resultsPage = ref(1);
		const { data: results, refresh: refreshResults } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(`admin-exam-results-${examId}`, () => apiData(`/admin/exams/${examId}/attempts`, { query: { page: resultsPage.value } }), { watch: [resultsPage] })), __temp = await __temp, __restore(), __temp);
		useSeoMeta({
			title: () => `${exam.value?.title ?? "Exam"} — Admin`,
			robots: "noindex"
		});
		const locked = computed(() => (exam.value?.attempts_count ?? 0) > 0);
		const modal = ref(false);
		const editingId = ref(null);
		const form = reactive({
			type: "single_choice",
			question: "",
			options: [],
			correct: [],
			marks: 1,
			negative_marks: "",
			explanation: ""
		});
		function freshOptions(count = 4) {
			return Array.from({ length: count }, (_, i) => ({
				id: letters[i],
				text: ""
			}));
		}
		watch(() => form.type, (type) => {
			if (type === "true_false") {
				form.options = [{
					id: "true",
					text: "True"
				}, {
					id: "false",
					text: "False"
				}];
				form.correct = [];
			} else if (form.options.length < 3 && !editingId.value) form.options = freshOptions();
			if (type !== "multiple_choice") form.correct = form.correct.slice(0, 1);
		});
		function toggleCorrect(id) {
			if (form.type === "multiple_choice") form.correct = form.correct.includes(id) ? form.correct.filter((c) => c !== id) : [...form.correct, id];
			else form.correct = [id];
		}
		function addOption() {
			const used = new Set(form.options.map((o) => o.id));
			const id = [...letters].find((l) => !used.has(l));
			if (id) form.options.push({
				id,
				text: ""
			});
		}
		function removeOption(id) {
			form.options = form.options.filter((o) => o.id !== id);
			form.correct = form.correct.filter((c) => c !== id);
		}
		async function saveQuestion() {
			const body = {
				...editingId.value ? { id: editingId.value } : { exam_id: examId },
				type: form.type,
				question: form.question,
				options: form.options.filter((o) => o.text.trim()).map((o) => ({
					id: o.id,
					text: o.text.trim()
				})),
				correct_answers: form.correct,
				marks: Number(form.marks),
				negative_marks: form.negative_marks === "" ? null : Number(form.negative_marks),
				explanation: form.explanation || null
			};
			if (await run(() => apiData(`/admin/exam-questions/${editingId.value ? "update" : "add"}`, {
				method: "POST",
				body
			}), editingId.value ? "Question saved." : "Question added.") === void 0) return;
			modal.value = false;
			await refresh();
		}
		async function togglePublish() {
			if (!exam.value) return;
			const e = exam.value;
			const full = await apiData(`/admin/exams/${e.id}`);
			if (await run(() => apiData("/admin/exams/update", {
				method: "POST",
				body: {
					...full,
					id: e.id,
					is_published: !e.is_published
				}
			}), e.is_published ? "Exam unpublished." : "Exam published.") !== void 0) await refresh();
		}
		watch(tab, (value) => value === "results" && refreshResults());
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AdminStat = AdminStat_default;
			const _component_PaginationLinks = PaginationLinks_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: unref(exam)?.title || "Exam",
				subtitle: "Questions are marked automatically; results appear as students submit.",
				icon: "list"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/exams",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-left",
										size: 16
									}, null, _parent, _scopeId));
									_push(` All exams`);
								} else return [createVNode(_component_BaseIcon, {
									name: "arrow-left",
									size: 16
								}), createTextVNode(" All exams")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(exam)) _push(`<button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(exam).is_published ? "Unpublish" : "Publish")}</button>`);
						else _push(`<!---->`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/admin/exams",
						class: "btn-secondary"
					}, {
						default: withCtx(() => [createVNode(_component_BaseIcon, {
							name: "arrow-left",
							size: 16
						}), createTextVNode(" All exams")]),
						_: 1
					}), unref(exam) ? (openBlock(), createBlock("button", {
						key: 0,
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: togglePublish
					}, toDisplayString(unref(exam).is_published ? "Unpublish" : "Publish"), 9, ["disabled"])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) _push(`<div class="card h-40 animate-pulse bg-gray-50"></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this exam",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (unref(exam)) {
				_push(`<!--[--><div class="mb-4 flex flex-wrap items-center gap-2 text-xs"><span class="badge bg-gray-50 text-gray-700 ring-gray-200">${ssrInterpolate(unref(exam).questions.length)} questions · ${ssrInterpolate(unref(exam).total_marks)} marks</span><span class="badge bg-gray-50 text-gray-700 ring-gray-200">${ssrInterpolate(unref(exam).duration_minutes)} min · pass ${ssrInterpolate(unref(exam).pass_percentage)}%</span><span class="${ssrRenderClass([unref(exam).negative_marking ? "bg-rose-50 text-rose-700 ring-rose-200" : "bg-gray-50 text-gray-600 ring-gray-200", "badge"])}">${ssrInterpolate(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(unref(exam)))}</span>`);
				_push(ssrRenderComponent(_component_StatusBadge, { status: unref(exam).is_published ? "published" : "draft" }, null, _parent));
				_push(`</div><div class="mb-4 flex gap-1.5"><!--[-->`);
				ssrRenderList$2([{
					v: "questions",
					l: "Questions"
				}, {
					v: "results",
					l: "Results"
				}], (item) => {
					_push(`<button type="button" class="${ssrRenderClass([unref(tab) === item.v ? "bg-oc-primary text-white" : "bg-gray-100 text-gray-600", "rounded-full px-4 py-1.5 text-xs font-semibold"])}">${ssrInterpolate(item.l)}</button>`);
				});
				_push(`<!--]--></div>`);
				if (unref(tab) === "questions") {
					_push(`<section><div class="mb-3 flex items-center justify-between gap-3">`);
					if (unref(locked)) _push(`<p class="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">Students have attempted this exam, so questions are locked to keep results consistent.</p>`);
					else _push(`<span></span>`);
					_push(`<button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(locked)) ? " disabled" : ""}>`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "plus",
						size: 16
					}, null, _parent));
					_push(` Add question</button></div>`);
					if (!unref(exam).questions.length) _push(ssrRenderComponent(_component_EmptyState, {
						icon: "list",
						title: "No questions yet",
						message: "Add questions, then publish the exam."
					}, null, _parent));
					else {
						_push(`<ol class="space-y-3"><!--[-->`);
						ssrRenderList$2(unref(exam).questions, (q, index) => {
							_push(`<li class="card p-4"><div class="flex items-start justify-between gap-3"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(index + 1)}. ${ssrInterpolate(q.question)}</p><div class="flex shrink-0 items-center gap-1"><span class="badge bg-blue-50 text-blue-700 ring-blue-200">${ssrInterpolate(q.marks)} marks</span>`);
							if (unref(exam).negative_marking) _push(`<span class="badge bg-rose-50 text-rose-700 ring-rose-200">${ssrInterpolate(q.negative_marks !== null ? `−${q.negative_marks} (custom)` : "default penalty")}</span>`);
							else _push(`<!---->`);
							_push(`<button type="button" class="btn-ghost !px-2 !py-1 text-xs"${ssrIncludeBooleanAttr(unref(locked)) ? " disabled" : ""}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "edit",
								size: 13
							}, null, _parent));
							_push(`</button><button type="button" class="btn-ghost !px-2 !py-1 text-xs text-rose-600"${ssrIncludeBooleanAttr(unref(locked)) ? " disabled" : ""}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "trash",
								size: 13
							}, null, _parent));
							_push(`</button></div></div><ul class="mt-2 grid gap-1 sm:grid-cols-2"><!--[-->`);
							ssrRenderList$2(q.options, (o) => {
								_push(`<li class="${ssrRenderClass([q.correct_answers.map(String).includes(String(o.id)) ? "bg-emerald-50 font-semibold text-emerald-700" : "bg-gray-50 text-gray-600", "rounded-lg px-3 py-1.5 text-xs"])}">${ssrInterpolate(o.text)}</li>`);
							});
							_push(`<!--]--></ul></li>`);
						});
						_push(`<!--]--></ol>`);
					}
					_push(`</section>`);
				} else {
					_push(`<section>`);
					if (unref(results)) {
						_push(`<div class="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">`);
						_push(ssrRenderComponent(_component_AdminStat, {
							label: "Attempts",
							value: String(unref(results).stats.attempts),
							icon: "list",
							tone: "blue"
						}, null, _parent));
						_push(ssrRenderComponent(_component_AdminStat, {
							label: "Students",
							value: String(unref(results).stats.students),
							icon: "users",
							tone: "violet"
						}, null, _parent));
						_push(ssrRenderComponent(_component_AdminStat, {
							label: "Average",
							value: `${unref(results).stats.average_percentage}%`,
							icon: "chart",
							tone: "amber"
						}, null, _parent));
						_push(ssrRenderComponent(_component_AdminStat, {
							label: "Highest",
							value: `${unref(results).stats.highest_percentage}%`,
							icon: "award",
							tone: "emerald"
						}, null, _parent));
						_push(ssrRenderComponent(_component_AdminStat, {
							label: "Pass rate",
							value: `${unref(results).stats.pass_rate}%`,
							icon: "check-circle",
							tone: "emerald"
						}, null, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					if (!unref(results)?.attempts.data.length) _push(ssrRenderComponent(_component_EmptyState, {
						icon: "chart",
						title: "No results yet",
						message: "Results appear as soon as students submit."
					}, null, _parent));
					else {
						_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[760px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">#</th><th class="px-3 py-2.5 font-semibold">Student</th><th class="px-3 py-2.5 font-semibold">Score</th><th class="px-3 py-2.5 font-semibold">✓ / ✗ / –</th><th class="px-3 py-2.5 font-semibold">Negative</th><th class="px-3 py-2.5 font-semibold">Result</th><th class="px-3 py-2.5 font-semibold">Submitted</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
						ssrRenderList$2(unref(results).attempts.data, (row, index) => {
							_push(`<tr><td class="px-4 py-3 text-gray-400">${ssrInterpolate((unref(results).attempts.current_page - 1) * unref(results).attempts.per_page + index + 1)}</td><td class="px-3 py-3"><p class="font-medium text-gray-800">${ssrInterpolate(row.user?.name)}</p><p class="text-[11px] text-gray-400">${ssrInterpolate(row.user?.email)}</p></td><td class="px-3 py-3 font-bold text-gray-900">${ssrInterpolate(row.score)}/${ssrInterpolate(row.total_marks)} <span class="text-xs font-normal text-gray-400">(${ssrInterpolate(row.percentage)}%)</span></td><td class="px-3 py-3 text-xs text-gray-600">${ssrInterpolate(row.correct_count)} / ${ssrInterpolate(row.wrong_count)} / ${ssrInterpolate(row.unanswered_count)}</td><td class="${ssrRenderClass([row.negative_marks_total ? "text-rose-600" : "text-gray-400", "px-3 py-3 text-xs"])}">−${ssrInterpolate(row.negative_marks_total)}</td><td class="px-3 py-3"><span class="${ssrRenderClass([row.passed ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-rose-200", "badge"])}">${ssrInterpolate(row.passed ? "Passed" : "Failed")}</span>`);
							if (row.status === "expired") _push(`<span class="ml-1 text-[10px] text-gray-400">auto</span>`);
							else _push(`<!---->`);
							_push(`</td><td class="px-3 py-3 text-xs text-gray-500">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(row.submitted_at, true))}</td></tr>`);
						});
						_push(`<!--]--></tbody></table></div></div>`);
					}
					_push(`<div class="flex justify-center pt-4">`);
					_push(ssrRenderComponent(_component_PaginationLinks, {
						"current-page": unref(results)?.attempts.current_page ?? 1,
						"last-page": unref(results)?.attempts.last_page ?? 1,
						onChange: (v) => resultsPage.value = v
					}, null, _parent));
					_push(`</div></section>`);
				}
				_push(`<!--]-->`);
			} else _push(`<!---->`);
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modal),
				title: unref(editingId) ? "Edit question" : "Add question",
				size: "lg",
				onClose: ($event) => modal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy) || !unref(form).correct.length) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editingId) ? "Save question" : "Add question")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => modal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy) || !unref(form).correct.length,
						onClick: saveQuestion
					}, toDisplayString(unref(editingId) ? "Save question" : "Add question"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-3 sm:grid-cols-3"${_scopeId}><div${_scopeId}><label class="field-label" for="q-type"${_scopeId}>Type</label><select id="q-type" class="field-input"${_scopeId}><option value="single_choice"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "single_choice") : ssrLooseEqual(unref(form).type, "single_choice")) ? " selected" : ""}${_scopeId}>Single choice</option><option value="multiple_choice"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "multiple_choice") : ssrLooseEqual(unref(form).type, "multiple_choice")) ? " selected" : ""}${_scopeId}>Multiple choice</option><option value="true_false"${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "true_false") : ssrLooseEqual(unref(form).type, "true_false")) ? " selected" : ""}${_scopeId}>True / False</option></select></div><div${_scopeId}><label class="field-label" for="q-marks"${_scopeId}>Marks</label><input id="q-marks"${ssrRenderAttr("value", unref(form).marks)} type="number" min="0.25" step="0.25" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("marks")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("marks"))}</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
						if (unref(exam)?.negative_marking) _push(`<div${_scopeId}><label class="field-label" for="q-neg"${_scopeId}>Penalty override</label><input id="q-neg"${ssrRenderAttr("value", unref(form).negative_marks)} type="number" min="0" step="0.25" class="field-input" placeholder="Exam default"${_scopeId}></div>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="q-text"${_scopeId}>Question</label><textarea id="q-text" rows="3" class="field-input" required${_scopeId}>${ssrInterpolate(unref(form).question)}</textarea>`);
						if (unref(fieldError)("question")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("question"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><p class="field-label"${_scopeId}>Options — tick the correct ${ssrInterpolate(unref(form).type === "multiple_choice" ? "answers" : "answer")}</p><div class="space-y-2"${_scopeId}><!--[-->`);
						ssrRenderList$2(unref(form).options, (option) => {
							_push(`<div class="flex items-center gap-2"${_scopeId}><input${ssrRenderAttr("type", unref(form).type === "multiple_choice" ? "checkbox" : "radio")}${ssrIncludeBooleanAttr(unref(form).correct.includes(option.id)) ? " checked" : ""} class="h-4 w-4 text-oc-primary"${_scopeId}><input${ssrRenderAttr("value", option.text)} class="field-input"${ssrRenderAttr("placeholder", `Option ${option.id.toUpperCase()}`)}${ssrIncludeBooleanAttr(unref(form).type === "true_false") ? " readonly" : ""}${_scopeId}>`);
							if (unref(form).type !== "true_false" && unref(form).options.length > 2) {
								_push(`<button type="button" class="btn-ghost !p-1.5 text-rose-600"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "x",
									size: 14
								}, null, _parent, _scopeId));
								_push(`</button>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div>`);
						if (unref(form).type !== "true_false" && unref(form).options.length < 10) {
							_push(`<button type="button" class="btn-ghost mt-2 text-xs"${_scopeId}>`);
							_push(ssrRenderComponent(_component_BaseIcon, {
								name: "plus",
								size: 14
							}, null, _parent, _scopeId));
							_push(` Add option</button>`);
						} else _push(`<!---->`);
						if (unref(fieldError)("correct_answers")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("correct_answers"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="q-exp"${_scopeId}>Explanation (shown with the answers)</label><textarea id="q-exp" rows="2" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).explanation)}</textarea></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(saveQuestion, ["prevent"])
					}, [
						createVNode("div", { class: "grid gap-3 sm:grid-cols-3" }, [
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "q-type"
							}, "Type"), withDirectives(createVNode("select", {
								id: "q-type",
								"onUpdate:modelValue": ($event) => unref(form).type = $event,
								class: "field-input"
							}, [
								createVNode("option", { value: "single_choice" }, "Single choice"),
								createVNode("option", { value: "multiple_choice" }, "Multiple choice"),
								createVNode("option", { value: "true_false" }, "True / False")
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).type]])]),
							createVNode("div", null, [
								createVNode("label", {
									class: "field-label",
									for: "q-marks"
								}, "Marks"),
								withDirectives(createVNode("input", {
									id: "q-marks",
									"onUpdate:modelValue": ($event) => unref(form).marks = $event,
									type: "number",
									min: "0.25",
									step: "0.25",
									class: "field-input",
									required: ""
								}, null, 8, ["onUpdate:modelValue"]), [[
									vModelText,
									unref(form).marks,
									void 0,
									{ number: true }
								]]),
								unref(fieldError)("marks") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("marks")), 1)) : createCommentVNode("", true)
							]),
							unref(exam)?.negative_marking ? (openBlock(), createBlock("div", { key: 0 }, [createVNode("label", {
								class: "field-label",
								for: "q-neg"
							}, "Penalty override"), withDirectives(createVNode("input", {
								id: "q-neg",
								"onUpdate:modelValue": ($event) => unref(form).negative_marks = $event,
								type: "number",
								min: "0",
								step: "0.25",
								class: "field-input",
								placeholder: "Exam default"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).negative_marks]])])) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "q-text"
							}, "Question"),
							withDirectives(createVNode("textarea", {
								id: "q-text",
								"onUpdate:modelValue": ($event) => unref(form).question = $event,
								rows: "3",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).question]]),
							unref(fieldError)("question") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("question")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("p", { class: "field-label" }, "Options — tick the correct " + toDisplayString(unref(form).type === "multiple_choice" ? "answers" : "answer"), 1),
							createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(form).options, (option) => {
								return openBlock(), createBlock("div", {
									key: option.id,
									class: "flex items-center gap-2"
								}, [
									createVNode("input", {
										type: unref(form).type === "multiple_choice" ? "checkbox" : "radio",
										checked: unref(form).correct.includes(option.id),
										class: "h-4 w-4 text-oc-primary",
										onChange: ($event) => toggleCorrect(option.id)
									}, null, 40, [
										"type",
										"checked",
										"onChange"
									]),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => option.text = $event,
										class: "field-input",
										placeholder: `Option ${option.id.toUpperCase()}`,
										readonly: unref(form).type === "true_false"
									}, null, 8, [
										"onUpdate:modelValue",
										"placeholder",
										"readonly"
									]), [[vModelText, option.text]]),
									unref(form).type !== "true_false" && unref(form).options.length > 2 ? (openBlock(), createBlock("button", {
										key: 0,
										type: "button",
										class: "btn-ghost !p-1.5 text-rose-600",
										onClick: ($event) => removeOption(option.id)
									}, [createVNode(_component_BaseIcon, {
										name: "x",
										size: 14
									})], 8, ["onClick"])) : createCommentVNode("", true)
								]);
							}), 128))]),
							unref(form).type !== "true_false" && unref(form).options.length < 10 ? (openBlock(), createBlock("button", {
								key: 0,
								type: "button",
								class: "btn-ghost mt-2 text-xs",
								onClick: addOption
							}, [createVNode(_component_BaseIcon, {
								name: "plus",
								size: 14
							}), createTextVNode(" Add option")])) : createCommentVNode("", true),
							unref(fieldError)("correct_answers") ? (openBlock(), createBlock("p", {
								key: 1,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("correct_answers")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "q-exp"
						}, "Explanation (shown with the answers)"), withDirectives(createVNode("textarea", {
							id: "q-exp",
							"onUpdate:modelValue": ($event) => unref(form).explanation = $event,
							rows: "2",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).explanation]])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/exams/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/exams/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-BoMHf3J3.mjs.map
