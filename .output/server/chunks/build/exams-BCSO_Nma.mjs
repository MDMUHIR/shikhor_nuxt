import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { c as useSeoMeta, b as useApi, u as useAuth, B as BaseIcon_default, s as ssrRenderList$2, N as NuxtLink, r as renderList$2, n as navigateTo } from '../virtual/entry.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { n as negativeMarkingLabel } from './exam-CSv7Xs_5.mjs';
import { defineComponent, withAsyncContext, ref, reactive, computed, withCtx, createVNode, createTextVNode, unref, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, Fragment, vModelSelect, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './format-DP0uQCCC.mjs';
import './useToast-8ge3kL-h.mjs';

// app/pages/admin/exams/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		useSeoMeta({
			title: "Exams — Admin",
			robots: "noindex"
		});
		const { apiData } = useApi();
		const { isAdmin } = useAuth();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const { data: exams, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-exams", () => apiData("/admin/exams"))), __temp = await __temp, __restore(), __temp);
		const { data: courses } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-exam-courses", () => apiData("/admin/courses", { query: { per_page: 100 } }).then((r) => r.data).catch(() => []))), __temp = await __temp, __restore(), __temp);
		const modal = ref(false);
		const editing = ref(null);
		const blank = () => ({
			course_id: "",
			title: "",
			description: "",
			instructions: "",
			duration_minutes: 30,
			pass_percentage: 50,
			max_attempts: "",
			negative_marking: false,
			negative_marking_type: "fraction",
			negative_marking_value: .25,
			allow_negative_total: false,
			shuffle_questions: false,
			shuffle_options: false,
			show_answers: "after_submit",
			starts_at: "",
			ends_at: "",
			is_published: false
		});
		const form = reactive(blank());
		function openCreate() {
			editing.value = null;
			Object.assign(form, blank(), { course_id: isAdmin.value ? "" : courses.value?.[0]?.id ?? "" });
			resetErrors();
			modal.value = true;
		}
		async function save() {
			const body = {
				...editing.value ? { id: editing.value.id } : {},
				...form,
				course_id: form.course_id || null,
				max_attempts: form.max_attempts === "" ? null : Number(form.max_attempts),
				starts_at: form.starts_at || null,
				ends_at: form.ends_at || null
			};
			const result = await run(() => apiData(`/admin/exams/${editing.value ? "update" : "add"}`, {
				method: "POST",
				body
			}), editing.value ? "Exam saved." : "Exam created — now add questions.");
			if (result === void 0) return;
			modal.value = false;
			if (!editing.value) await navigateTo(`/admin/exams/${result.id}`);
			else await refresh();
		}
		const preview = computed(() => negativeMarkingLabel({
			negative_marking: form.negative_marking,
			negative_marking_type: form.negative_marking_type,
			negative_marking_value: Number(form.negative_marking_value)
		}));
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_BaseIcon = BaseIcon_default;
			const _component_ErrorState = ErrorState_default;
			const _component_EmptyState = EmptyState_default;
			const _component_NuxtLink = NuxtLink;
			const _component_StatusBadge = StatusBadge_default;
			const _component_AppModal = AppModal_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: "Exams",
				subtitle: "Timed, auto-marked exams with optional negative marking.",
				icon: "list"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button type="button" class="btn-primary"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 16
						}, null, _parent, _scopeId));
						_push(` New exam</button>`);
					} else return [createVNode("button", {
						type: "button",
						class: "btn-primary",
						onClick: openCreate
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 16
					}), createTextVNode(" New exam")])];
				}),
				_: 1
			}, _parent));
			if (unref(pending)) {
				_push(`<div class="space-y-2"><!--[-->`);
				ssrRenderList$2(4, (i) => {
					_push(`<div class="card h-16 animate-pulse bg-gray-50"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load exams",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else if (!unref(exams)?.length) _push(ssrRenderComponent(_component_EmptyState, {
				icon: "list",
				title: "No exams yet",
				message: "Create an exam, add questions, then publish it.",
				"action-label": "Create an exam",
				onAction: openCreate
			}, null, _parent));
			else {
				_push(`<div class="card overflow-hidden"><div class="overflow-x-auto"><table class="w-full min-w-[820px] text-left text-sm"><thead class="border-b border-gray-100 bg-gray-50/60 text-[11px] uppercase tracking-wide text-gray-400"><tr><th class="px-4 py-2.5 font-semibold">Exam</th><th class="px-3 py-2.5 font-semibold">Course</th><th class="px-3 py-2.5 font-semibold">Questions</th><th class="px-3 py-2.5 font-semibold">Negative marking</th><th class="px-3 py-2.5 font-semibold">Attempts</th><th class="px-3 py-2.5 font-semibold">Status</th><th class="px-4 py-2.5 text-right font-semibold">Actions</th></tr></thead><tbody class="divide-y divide-gray-50"><!--[-->`);
				ssrRenderList$2(unref(exams), (exam) => {
					_push(`<tr class="hover:bg-gray-50/60"><td class="px-4 py-3">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/exams/${exam.id}`,
						class: "font-semibold text-gray-900 hover:text-oc-primary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(exam.title)}`);
							else return [createTextVNode(toDisplayString(exam.title), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<p class="text-[11px] text-gray-400">${ssrInterpolate(exam.duration_minutes)} min · ${ssrInterpolate(exam.total_marks)} marks · pass ${ssrInterpolate(exam.pass_percentage)}%</p></td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(exam.course?.title || "Standalone")}</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(exam.questions_count)}</td><td class="${ssrRenderClass([exam.negative_marking ? "font-semibold text-rose-600" : "text-gray-400", "px-3 py-3 text-xs"])}">${ssrInterpolate(("negativeMarkingLabel" in _ctx ? _ctx.negativeMarkingLabel : unref(negativeMarkingLabel))(exam))}</td><td class="px-3 py-3 text-gray-600">${ssrInterpolate(exam.attempts_count)}</td><td class="px-3 py-3">`);
					_push(ssrRenderComponent(_component_StatusBadge, { status: exam.is_published ? "published" : "draft" }, null, _parent));
					_push(`</td><td class="px-4 py-3"><div class="flex items-center justify-end gap-1">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/exams/${exam.id}`,
						class: "btn-secondary !px-2.5 !py-1.5 text-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Questions &amp; results`);
							else return [createTextVNode("Questions & results")];
						}),
						_: 2
					}, _parent));
					_push(`<button type="button" class="btn-ghost !px-2 !py-1.5 text-xs">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "edit",
						size: 14
					}, null, _parent));
					_push(` Settings</button><button type="button" class="btn-ghost !px-2 !py-1.5 text-xs text-rose-600 hover:bg-rose-50">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "trash",
						size: 14
					}, null, _parent));
					_push(`</button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div></div>`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(modal),
				title: unref(editing) ? "Exam settings" : "New exam",
				size: "lg",
				onClose: ($event) => modal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(editing) ? "Save exam" : "Create exam")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => modal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: save
					}, toDisplayString(unref(editing) ? "Save exam" : "Create exam"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="exam-title"${_scopeId}>Title</label><input id="exam-title"${ssrRenderAttr("value", unref(form).title)} class="field-input" required maxlength="255"${_scopeId}>`);
						if (unref(fieldError)("title")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("title"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="exam-course"${_scopeId}>Course</label><select id="exam-course" class="field-input"${_scopeId}>`);
						if (unref(isAdmin)) _push(`<option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).course_id) ? ssrLooseContain(unref(form).course_id, "") : ssrLooseEqual(unref(form).course_id, "")) ? " selected" : ""}${_scopeId}>Standalone — open to every signed-in student</option>`);
						else _push(`<!---->`);
						_push(`<!--[-->`);
						ssrRenderList$2(unref(courses), (course) => {
							_push(`<option${ssrRenderAttr("value", course.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).course_id) ? ssrLooseContain(unref(form).course_id, course.id) : ssrLooseEqual(unref(form).course_id, course.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(course.title)} (enrolled students only)</option>`);
						});
						_push(`<!--]--></select>`);
						if (unref(fieldError)("course_id")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("course_id"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="exam-duration"${_scopeId}>Duration (minutes)</label><input id="exam-duration"${ssrRenderAttr("value", unref(form).duration_minutes)} type="number" min="1" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("duration_minutes")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("duration_minutes"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="exam-pass"${_scopeId}>Pass mark (%)</label><input id="exam-pass"${ssrRenderAttr("value", unref(form).pass_percentage)} type="number" min="0" max="100" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="exam-attempts"${_scopeId}>Max attempts</label><input id="exam-attempts"${ssrRenderAttr("value", unref(form).max_attempts)} type="number" min="1" class="field-input" placeholder="Unlimited"${_scopeId}></div><div${_scopeId}><label class="field-label" for="exam-answers"${_scopeId}>Show correct answers</label><select id="exam-answers" class="field-input"${_scopeId}><option value="after_submit"${ssrIncludeBooleanAttr(Array.isArray(unref(form).show_answers) ? ssrLooseContain(unref(form).show_answers, "after_submit") : ssrLooseEqual(unref(form).show_answers, "after_submit")) ? " selected" : ""}${_scopeId}>Right after submitting</option><option value="after_exam_end"${ssrIncludeBooleanAttr(Array.isArray(unref(form).show_answers) ? ssrLooseContain(unref(form).show_answers, "after_exam_end") : ssrLooseEqual(unref(form).show_answers, "after_exam_end")) ? " selected" : ""}${_scopeId}>After the exam closes</option><option value="never"${ssrIncludeBooleanAttr(Array.isArray(unref(form).show_answers) ? ssrLooseContain(unref(form).show_answers, "never") : ssrLooseEqual(unref(form).show_answers, "never")) ? " selected" : ""}${_scopeId}>Never</option></select></div><div${_scopeId}><label class="field-label" for="exam-start"${_scopeId}>Opens</label><input id="exam-start"${ssrRenderAttr("value", unref(form).starts_at)} type="datetime-local" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="exam-end"${_scopeId}>Closes</label><input id="exam-end"${ssrRenderAttr("value", unref(form).ends_at)} type="datetime-local" class="field-input"${_scopeId}>`);
						if (unref(fieldError)("ends_at")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("ends_at"))}</p>`);
						else _push(`<!---->`);
						_push(`</div></div><fieldset class="${ssrRenderClass([unref(form).negative_marking ? "border-rose-200 bg-rose-50/40" : "border-gray-100 bg-gray-50/60", "rounded-xl border p-4"])}"${_scopeId}><legend class="px-1 text-xs font-bold uppercase tracking-wide text-gray-500"${_scopeId}>Negative marking</legend><label class="flex items-center gap-2 text-sm font-semibold text-gray-800"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).negative_marking) ? ssrLooseContain(unref(form).negative_marking, null) : unref(form).negative_marking) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Deduct marks for wrong answers </label>`);
						if (unref(form).negative_marking) {
							_push(`<div class="mt-3 grid gap-3 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="neg-type"${_scopeId}>Deduction type</label><select id="neg-type" class="field-input"${_scopeId}><option value="fraction"${ssrIncludeBooleanAttr(Array.isArray(unref(form).negative_marking_type) ? ssrLooseContain(unref(form).negative_marking_type, "fraction") : ssrLooseEqual(unref(form).negative_marking_type, "fraction")) ? " selected" : ""}${_scopeId}>Fraction of the question&#39;s marks</option><option value="fixed"${ssrIncludeBooleanAttr(Array.isArray(unref(form).negative_marking_type) ? ssrLooseContain(unref(form).negative_marking_type, "fixed") : ssrLooseEqual(unref(form).negative_marking_type, "fixed")) ? " selected" : ""}${_scopeId}>Fixed marks per wrong answer</option></select></div><div${_scopeId}><label class="field-label" for="neg-value"${_scopeId}>${ssrInterpolate(unref(form).negative_marking_type === "fraction" ? "Fraction (0–1, e.g. 0.25)" : "Marks to deduct")}</label><input id="neg-value"${ssrRenderAttr("value", unref(form).negative_marking_value)} type="number" min="0"${ssrRenderAttr("max", unref(form).negative_marking_type === "fraction" ? 1 : void 0)} step="0.05" class="field-input"${_scopeId}>`);
							if (unref(fieldError)("negative_marking_value")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("negative_marking_value"))}</p>`);
							else _push(`<!---->`);
							_push(`</div><label class="flex items-center gap-2 text-sm text-gray-700 sm:col-span-2"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).allow_negative_total) ? ssrLooseContain(unref(form).allow_negative_total, null) : unref(form).allow_negative_total) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Allow the final score to go below zero </label><p class="text-xs text-rose-700 sm:col-span-2"${_scopeId}>Students will see: “${ssrInterpolate(unref(preview))}”. Unanswered questions are never penalised. You can override the penalty per question.</p></div>`);
						} else _push(`<!---->`);
						_push(`</fieldset><div class="grid gap-4"${_scopeId}><div${_scopeId}><label class="field-label" for="exam-desc"${_scopeId}>Description</label><textarea id="exam-desc" rows="2" class="field-input"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div${_scopeId}><label class="field-label" for="exam-instr"${_scopeId}>Instructions</label><textarea id="exam-instr" rows="3" class="field-input" placeholder="Shown to students before they start"${_scopeId}>${ssrInterpolate(unref(form).instructions)}</textarea></div></div><div class="flex flex-wrap gap-5"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).shuffle_questions) ? ssrLooseContain(unref(form).shuffle_questions, null) : unref(form).shuffle_questions) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"${_scopeId}> Shuffle questions</label><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).shuffle_options) ? ssrLooseContain(unref(form).shuffle_options, null) : unref(form).shuffle_options) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"${_scopeId}> Shuffle options</label><label class="flex items-center gap-2 text-sm font-semibold text-gray-800"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_published) ? ssrLooseContain(unref(form).is_published, null) : unref(form).is_published) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary"${_scopeId}> Published</label></div>`);
						if (unref(fieldError)("is_published")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("is_published"))}</p>`);
						else _push(`<!---->`);
						_push(`</form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(save, ["prevent"])
					}, [
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
							createVNode("div", { class: "sm:col-span-2" }, [
								createVNode("label", {
									class: "field-label",
									for: "exam-title"
								}, "Title"),
								withDirectives(createVNode("input", {
									id: "exam-title",
									"onUpdate:modelValue": ($event) => unref(form).title = $event,
									class: "field-input",
									required: "",
									maxlength: "255"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).title]]),
								unref(fieldError)("title") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("title")), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", { class: "sm:col-span-2" }, [
								createVNode("label", {
									class: "field-label",
									for: "exam-course"
								}, "Course"),
								withDirectives(createVNode("select", {
									id: "exam-course",
									"onUpdate:modelValue": ($event) => unref(form).course_id = $event,
									class: "field-input"
								}, [unref(isAdmin) ? (openBlock(), createBlock("option", {
									key: 0,
									value: ""
								}, "Standalone — open to every signed-in student")) : createCommentVNode("", true), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(courses), (course) => {
									return openBlock(), createBlock("option", {
										key: course.id,
										value: course.id
									}, toDisplayString(course.title) + " (enrolled students only)", 9, ["value"]);
								}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).course_id]]),
								unref(fieldError)("course_id") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("course_id")), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", null, [
								createVNode("label", {
									class: "field-label",
									for: "exam-duration"
								}, "Duration (minutes)"),
								withDirectives(createVNode("input", {
									id: "exam-duration",
									"onUpdate:modelValue": ($event) => unref(form).duration_minutes = $event,
									type: "number",
									min: "1",
									class: "field-input",
									required: ""
								}, null, 8, ["onUpdate:modelValue"]), [[
									vModelText,
									unref(form).duration_minutes,
									void 0,
									{ number: true }
								]]),
								unref(fieldError)("duration_minutes") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("duration_minutes")), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "exam-pass"
							}, "Pass mark (%)"), withDirectives(createVNode("input", {
								id: "exam-pass",
								"onUpdate:modelValue": ($event) => unref(form).pass_percentage = $event,
								type: "number",
								min: "0",
								max: "100",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(form).pass_percentage,
								void 0,
								{ number: true }
							]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "exam-attempts"
							}, "Max attempts"), withDirectives(createVNode("input", {
								id: "exam-attempts",
								"onUpdate:modelValue": ($event) => unref(form).max_attempts = $event,
								type: "number",
								min: "1",
								class: "field-input",
								placeholder: "Unlimited"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).max_attempts]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "exam-answers"
							}, "Show correct answers"), withDirectives(createVNode("select", {
								id: "exam-answers",
								"onUpdate:modelValue": ($event) => unref(form).show_answers = $event,
								class: "field-input"
							}, [
								createVNode("option", { value: "after_submit" }, "Right after submitting"),
								createVNode("option", { value: "after_exam_end" }, "After the exam closes"),
								createVNode("option", { value: "never" }, "Never")
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).show_answers]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "exam-start"
							}, "Opens"), withDirectives(createVNode("input", {
								id: "exam-start",
								"onUpdate:modelValue": ($event) => unref(form).starts_at = $event,
								type: "datetime-local",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).starts_at]])]),
							createVNode("div", null, [
								createVNode("label", {
									class: "field-label",
									for: "exam-end"
								}, "Closes"),
								withDirectives(createVNode("input", {
									id: "exam-end",
									"onUpdate:modelValue": ($event) => unref(form).ends_at = $event,
									type: "datetime-local",
									class: "field-input"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).ends_at]]),
								unref(fieldError)("ends_at") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("ends_at")), 1)) : createCommentVNode("", true)
							])
						]),
						createVNode("fieldset", { class: ["rounded-xl border p-4", unref(form).negative_marking ? "border-rose-200 bg-rose-50/40" : "border-gray-100 bg-gray-50/60"] }, [
							createVNode("legend", { class: "px-1 text-xs font-bold uppercase tracking-wide text-gray-500" }, "Negative marking"),
							createVNode("label", { class: "flex items-center gap-2 text-sm font-semibold text-gray-800" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).negative_marking = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).negative_marking]]), createTextVNode(" Deduct marks for wrong answers ")]),
							unref(form).negative_marking ? (openBlock(), createBlock("div", {
								key: 0,
								class: "mt-3 grid gap-3 sm:grid-cols-2"
							}, [
								createVNode("div", null, [createVNode("label", {
									class: "field-label",
									for: "neg-type"
								}, "Deduction type"), withDirectives(createVNode("select", {
									id: "neg-type",
									"onUpdate:modelValue": ($event) => unref(form).negative_marking_type = $event,
									class: "field-input"
								}, [createVNode("option", { value: "fraction" }, "Fraction of the question's marks"), createVNode("option", { value: "fixed" }, "Fixed marks per wrong answer")], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(form).negative_marking_type]])]),
								createVNode("div", null, [
									createVNode("label", {
										class: "field-label",
										for: "neg-value"
									}, toDisplayString(unref(form).negative_marking_type === "fraction" ? "Fraction (0–1, e.g. 0.25)" : "Marks to deduct"), 1),
									withDirectives(createVNode("input", {
										id: "neg-value",
										"onUpdate:modelValue": ($event) => unref(form).negative_marking_value = $event,
										type: "number",
										min: "0",
										max: unref(form).negative_marking_type === "fraction" ? 1 : void 0,
										step: "0.05",
										class: "field-input"
									}, null, 8, ["onUpdate:modelValue", "max"]), [[
										vModelText,
										unref(form).negative_marking_value,
										void 0,
										{ number: true }
									]]),
									unref(fieldError)("negative_marking_value") ? (openBlock(), createBlock("p", {
										key: 0,
										class: "field-error"
									}, toDisplayString(unref(fieldError)("negative_marking_value")), 1)) : createCommentVNode("", true)
								]),
								createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700 sm:col-span-2" }, [withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).allow_negative_total = $event,
									type: "checkbox",
									class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).allow_negative_total]]), createTextVNode(" Allow the final score to go below zero ")]),
								createVNode("p", { class: "text-xs text-rose-700 sm:col-span-2" }, "Students will see: “" + toDisplayString(unref(preview)) + "”. Unanswered questions are never penalised. You can override the penalty per question.", 1)
							])) : createCommentVNode("", true)
						], 2),
						createVNode("div", { class: "grid gap-4" }, [createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "exam-desc"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "exam-desc",
							"onUpdate:modelValue": ($event) => unref(form).description = $event,
							rows: "2",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).description]])]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "exam-instr"
						}, "Instructions"), withDirectives(createVNode("textarea", {
							id: "exam-instr",
							"onUpdate:modelValue": ($event) => unref(form).instructions = $event,
							rows: "3",
							class: "field-input",
							placeholder: "Shown to students before they start"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).instructions]])])]),
						createVNode("div", { class: "flex flex-wrap gap-5" }, [
							createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).shuffle_questions = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300 text-oc-primary"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).shuffle_questions]]), createTextVNode(" Shuffle questions")]),
							createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).shuffle_options = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300 text-oc-primary"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).shuffle_options]]), createTextVNode(" Shuffle options")]),
							createVNode("label", { class: "flex items-center gap-2 text-sm font-semibold text-gray-800" }, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(form).is_published = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300 text-oc-primary"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(form).is_published]]), createTextVNode(" Published")])
						]),
						unref(fieldError)("is_published") ? (openBlock(), createBlock("p", {
							key: 0,
							class: "field-error"
						}, toDisplayString(unref(fieldError)("is_published")), 1)) : createCommentVNode("", true)
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/exams/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/exams/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var exams_default = index_vue_vue_type_script_setup_true_lang_default;

export { exams_default as default };
//# sourceMappingURL=exams-BCSO_Nma.mjs.map
