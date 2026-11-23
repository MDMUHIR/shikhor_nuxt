import { A as AdminPageHeader_default } from './AdminPageHeader-rLJAWqO6.mjs';
import { a as useRoute, b as useApi, u as useAuth, m as mediaUrl, N as NuxtLink, B as BaseIcon_default, s as ssrRenderList$2, r as renderList$2 } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-D6yA547L.mjs';
import { E as ErrorState_default } from './ErrorState-ssgGFunz.mjs';
import { u as useFormHandler } from './useFormHandler-BxN2lZMT.mjs';
import { u as useAsyncData } from './asyncData-D6RAgWyr.mjs';
import { E as EmptyState_default } from './EmptyState-Dbt0XLNN.mjs';
import { A as AppModal_default } from './AppModal-Ck9dWK3r.mjs';
import { u as useConfirm } from './useConfirm-CnJ5-A8T.mjs';
import { u as useToast } from './useToast-8ge3kL-h.mjs';
import { f as formatDuration } from './format-DP0uQCCC.mjs';
import { defineComponent, computed, withAsyncContext, ref, reactive, watch, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, createCommentVNode, withModifiers, withDirectives, vModelText, toDisplayString, Fragment, vModelSelect, vModelCheckbox, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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

// app/components/CourseAttachmentsManager.vue?vue&type=script&setup=true&lang.ts
var CourseAttachmentsManager_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CourseAttachmentsManager",
	__ssrInlineRender: true,
	props: { courseId: {} },
	async setup(__props) {
		let __temp, __restore;
		const props = __props;
		const { apiData} = useApi();
		const { busy, fieldError } = useFormHandler();
		const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => `course-attachments-${props.courseId}`, () => apiData(`/admin/courses/${props.courseId}/attachments`).catch(() => []), { watch: [() => props.courseId] })), __temp = await __temp, __restore(), __temp);
		const title = ref("");
		const url = ref("");
		const file = ref(null);
		ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "card p-5" }, _attrs))}><h2 class="text-sm font-bold text-gray-900">Course attachments</h2><p class="mt-1 text-xs text-gray-500">PDF, PowerPoint, Word, Excel, images or ZIP (max 50 MB). Enrolled students can view and download them.</p>`);
			if (unref(data)?.length) {
				_push(`<ul class="mt-4 space-y-1.5"><!--[-->`);
				ssrRenderList$2(unref(data), (item) => {
					_push(`<li class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm"><span class="truncate text-gray-700"><span class="mr-2 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase text-gray-500">${ssrInterpolate(item.kind)}</span>${ssrInterpolate(item.title)} `);
					if (item.lesson) _push(`<span class="text-[11px] text-gray-400"> · ${ssrInterpolate(item.lesson.title)}</span>`);
					else _push(`<!---->`);
					_push(`</span><button type="button" class="text-xs font-semibold text-rose-600 hover:underline"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>Remove</button></li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<p class="mt-4 text-sm text-gray-500">No attachments yet.</p>`);
			_push(`<div class="mt-4 grid gap-2 sm:grid-cols-2"><input${ssrRenderAttr("value", unref(title))} class="field-input" placeholder="Title (e.g. Week 1 slides)" maxlength="255"><input${ssrRenderAttr("value", unref(url))} type="url" class="field-input" placeholder="…or an https:// link"><input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip,.txt,.csv,.png,.jpg,.jpeg,.webp" class="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary sm:col-span-2"></div>`);
			if (unref(fieldError)("file")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("file"))}</p>`);
			else _push(`<!---->`);
			if (unref(fieldError)("external_url")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("external_url"))}</p>`);
			else _push(`<!---->`);
			_push(`<button type="button" class="btn-primary mt-3"${ssrIncludeBooleanAttr(unref(busy) || !unref(title) || !unref(url) && !unref(file)) ? " disabled" : ""}>${ssrInterpolate(unref(busy) ? "Uploading…" : "Add attachment")}</button></section>`);
		};
	}
});
// app/components/CourseAttachmentsManager.vue
var _sfc_setup$2 = CourseAttachmentsManager_vue_vue_type_script_setup_true_lang_default.setup;
CourseAttachmentsManager_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CourseAttachmentsManager.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var CourseAttachmentsManager_default = Object.assign(CourseAttachmentsManager_vue_vue_type_script_setup_true_lang_default, { __name: "CourseAttachmentsManager" });
// app/components/LessonResourcesManager.vue?vue&type=script&setup=true&lang.ts
var LessonResourcesManager_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LessonResourcesManager",
	__ssrInlineRender: true,
	props: { lessonId: {} },
	async setup(__props) {
		let __temp, __restore;
		const props = __props;
		const { apiData} = useApi();
		const { busy, fieldError } = useFormHandler();
		const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => `lesson-resources-${props.lessonId}`, () => apiData(`/admin/lessons/${props.lessonId}/resources`).catch(() => []), { watch: [() => props.lessonId] })), __temp = await __temp, __restore(), __temp);
		const title = ref("");
		const url = ref("");
		const file = ref(null);
		ref(null);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-gray-100 bg-gray-50/60 p-3" }, _attrs))}><p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500">Downloads &amp; links</p>`);
			if (unref(data)?.length) {
				_push(`<ul class="mb-3 space-y-1.5"><!--[-->`);
				ssrRenderList$2(unref(data), (resource) => {
					_push(`<li class="flex items-center justify-between gap-2 text-sm"><span class="truncate text-gray-700">${ssrInterpolate(resource.title)} <span class="text-[11px] text-gray-400">${ssrInterpolate(resource.external_url ? "link" : "file")}</span></span><button type="button" class="text-xs font-semibold text-rose-600 hover:underline"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>Remove</button></li>`);
				});
				_push(`<!--]--></ul>`);
			} else _push(`<!---->`);
			_push(`<div class="grid gap-2 sm:grid-cols-2"><input${ssrRenderAttr("value", unref(title))} class="field-input" placeholder="Title" maxlength="255"><input${ssrRenderAttr("value", unref(url))} type="url" class="field-input" placeholder="https:// link (optional)"><input type="file" class="block w-full text-xs text-gray-500 sm:col-span-2"></div>`);
			if (unref(fieldError)("file")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("file"))}</p>`);
			else _push(`<!---->`);
			if (unref(fieldError)("external_url")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("external_url"))}</p>`);
			else _push(`<!---->`);
			_push(`<button type="button" class="btn-secondary mt-2"${ssrIncludeBooleanAttr(unref(busy) || !unref(title) || !unref(url) && !unref(file)) ? " disabled" : ""}>Add resource</button></div>`);
		};
	}
});
// app/components/LessonResourcesManager.vue
var _sfc_setup$1 = LessonResourcesManager_vue_vue_type_script_setup_true_lang_default.setup;
LessonResourcesManager_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LessonResourcesManager.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var LessonResourcesManager_default = Object.assign(LessonResourcesManager_vue_vue_type_script_setup_true_lang_default, { __name: "LessonResourcesManager" });
// app/pages/admin/courses/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		const route = useRoute();
		const { apiData, apiUpload } = useApi();
		const { isAdmin } = useAuth();
		const { ask } = useConfirm();
		const { busy, fieldError, run, resetErrors } = useFormHandler();
		const isNew = computed(() => route.params.id === "new");
		const courseId = computed(() => Number(route.params.id));
		const { data: course, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => `admin-course-${route.params.id}`, () => isNew.value ? Promise.resolve(null) : apiData(`/admin/courses/${courseId.value}`), { watch: [() => route.params.id] })), __temp = await __temp, __restore(), __temp);
		const { data: categories } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("admin-course-category-options", () => apiData("/admin/course-categories").catch(() => []))), __temp = await __temp, __restore(), __temp);
		const { data: instructors } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData("admin-course-instructor-options", async () => {
			if (!isAdmin.value) return [];
			return (await apiData("/admin/users").catch(() => [])).filter((u) => u.type === "instructor" && u.is_active !== false);
		})), __temp = await __temp, __restore(), __temp);
		const tab = ref("details");
		const tabs = [
			{
				value: "details",
				label: "Details",
				icon: "edit"
			},
			{
				value: "curriculum",
				label: "Curriculum",
				icon: "list"
			},
			{
				value: "quizzes",
				label: "Quizzes",
				icon: "check-circle"
			}
		];
		function setTab(value) {
			tab.value = value;
		}
		ref(null);
		const thumbnailPreview = ref("");
		const details = reactive({
			title: "",
			slug: "",
			subtitle: "",
			description: "",
			course_category_id: "",
			instructor_id: "",
			level: "all",
			language: "en",
			price: 0,
			offer_price: "",
			lifetime: true,
			access_days: 30,
			status: "draft",
			is_featured: false,
			promo_video_url: "",
			requirements: "",
			outcomes: ""
		});
		watch(course, (value) => {
			if (!value) return;
			Object.assign(details, {
				title: value.title || "",
				slug: value.slug || "",
				subtitle: value.subtitle || "",
				description: value.description || "",
				course_category_id: value.category_id ?? "",
				instructor_id: value.instructor_id ?? "",
				level: value.level || "all",
				language: value.language || "en",
				price: value.price ?? 0,
				offer_price: value.offer_price ?? "",
				lifetime: value.access_days === 0,
				access_days: value.access_days && value.access_days > 0 ? value.access_days : 30,
				status: value.status || "draft",
				is_featured: !!value.is_featured,
				promo_video_url: value.promo_video_url || "",
				requirements: (value.requirements || []).join("\n"),
				outcomes: (value.outcomes || []).join("\n")
			});
			thumbnailPreview.value = value.thumbnail ? mediaUrl(value.thumbnail) : "";
		}, { immediate: true });
		const sections = computed(() => course.value?.sections ?? []);
		const quizzes = computed(() => course.value?.quizzes ?? []);
		const allLessons = computed(() => sections.value.flatMap((section) => section.lessons ?? []));
		const sectionModal = ref(false);
		const sectionForm = reactive({
			id: null,
			title: "",
			description: "",
			sort_order: 0
		});
		function openSection(section) {
			Object.assign(sectionForm, {
				id: null,
				title: "",
				description: "",
				sort_order: sections.value.length
			});
			resetErrors();
			sectionModal.value = true;
		}
		async function saveSection() {
			if (await run(() => apiData("/admin/course-sections/" + (sectionForm.id ? "update" : "add"), {
				method: "POST",
				body: {
					...sectionForm.id ? { id: sectionForm.id } : { course_id: courseId.value },
					title: sectionForm.title,
					description: sectionForm.description,
					sort_order: sectionForm.sort_order
				}
			}), sectionForm.id ? "Section updated." : "Section added.") === void 0) return;
			sectionModal.value = false;
			await refresh();
		}
		const lessonModal = ref(false);
		const lessonFile = ref(null);
		const lessonForm = reactive({
			id: null,
			course_section_id: "",
			title: "",
			slug: "",
			description: "",
			type: "video",
			duration_seconds: 0,
			content: "",
			video_source: "external",
			completion_threshold: null,
			is_required: true,
			video_url: "",
			is_preview: false,
			is_published: true,
			sort_order: 0,
			remove_video: false
		});
		function onLessonFile(event) {
			lessonFile.value = event.target.files?.[0] ?? null;
		}
		async function saveLesson() {
			const payload = new FormData();
			if (lessonForm.id) payload.append("id", String(lessonForm.id));
			else payload.append("course_id", String(courseId.value));
			payload.append("course_section_id", String(lessonForm.course_section_id || ""));
			payload.append("title", lessonForm.title);
			payload.append("slug", lessonForm.slug);
			payload.append("description", lessonForm.description);
			payload.append("type", lessonForm.type);
			payload.append("duration_seconds", String(lessonForm.duration_seconds || 0));
			payload.append("content", lessonForm.content);
			payload.append("is_preview", lessonForm.is_preview ? "1" : "0");
			payload.append("is_published", lessonForm.is_published ? "1" : "0");
			payload.append("sort_order", String(lessonForm.sort_order || 0));
			payload.append("is_required", lessonForm.is_required ? "1" : "0");
			if (lessonForm.completion_threshold) payload.append("completion_threshold", String(lessonForm.completion_threshold));
			if (lessonForm.type === "video") {
				payload.append("video_source", lessonForm.video_source);
				payload.append("video_url", lessonForm.video_url);
				if (lessonFile.value) payload.append("video", lessonFile.value);
				if (lessonForm.remove_video) payload.append("remove_video", "1");
			}
			if (await run(() => apiUpload("/admin/lessons/" + (lessonForm.id ? "update" : "add"), payload), lessonForm.id ? "Lesson saved." : "Lesson added.") === void 0) return;
			lessonModal.value = false;
			await refresh();
		}
		const quizModal = ref(false);
		const quizForm = reactive({
			id: null,
			title: "",
			description: "",
			lesson_id: "",
			pass_percentage: 60,
			time_limit_minutes: "",
			max_attempts: "",
			is_published: true,
			sort_order: 0
		});
		function openQuiz(quiz) {
			Object.assign(quizForm, {
				id: null,
				title: "",
				description: "",
				lesson_id: "",
				pass_percentage: 60,
				time_limit_minutes: "",
				max_attempts: "",
				is_published: true,
				sort_order: quizzes.value.length
			});
			resetErrors();
			quizModal.value = true;
		}
		async function saveQuiz() {
			const body = {
				...quizForm.id ? { id: quizForm.id } : { course_id: courseId.value },
				title: quizForm.title,
				description: quizForm.description,
				lesson_id: quizForm.lesson_id || null,
				pass_percentage: quizForm.pass_percentage,
				time_limit_minutes: quizForm.time_limit_minutes === "" ? null : Number(quizForm.time_limit_minutes),
				max_attempts: quizForm.max_attempts === "" ? null : Number(quizForm.max_attempts),
				is_published: quizForm.is_published ? 1 : 0,
				sort_order: quizForm.sort_order
			};
			if (await run(() => apiData("/admin/quizzes/" + (quizForm.id ? "update" : "add"), {
				method: "POST",
				body
			}), quizForm.id ? "Quiz saved." : "Quiz added.") === void 0) return;
			quizModal.value = false;
			await refresh();
		}
		const questionModal = ref(false);
		const activeQuiz = ref(null);
		const questions = ref([]);
		const questionsLoading = ref(false);
		const questionForm = reactive({
			id: null,
			type: "single_choice",
			question: "",
			marks: 1,
			sort_order: 0,
			options: [{
				id: "a",
				text: ""
			}, {
				id: "b",
				text: ""
			}],
			correct: []
		});
		async function loadQuestions() {
			if (!activeQuiz.value) return;
			questionsLoading.value = true;
			try {
				const detail = await apiData(`/admin/quizzes/${activeQuiz.value.id}`);
				questions.value = detail.questions ?? [];
			} catch (err) {
				toastError(err.message || "Could not load questions.");
			} finally {
				questionsLoading.value = false;
			}
		}
		const toast = useToast();
		function toastError(message) {
			toast.error(message);
		}
		function resetQuestion() {
			Object.assign(questionForm, {
				id: null,
				type: "single_choice",
				question: "",
				marks: 1,
				sort_order: questions.value.length,
				options: [{
					id: "a",
					text: ""
				}, {
					id: "b",
					text: ""
				}],
				correct: []
			});
			resetErrors();
		}
		function editQuestion(question) {
			Object.assign(questionForm, {
				id: question.id,
				type: question.type,
				question: question.question,
				marks: question.marks,
				sort_order: question.sort_order,
				options: (question.options || []).map((option) => ({
					id: String(option.id),
					text: option.text
				})),
				correct: [...question.correct_answers || []].map(String)
			});
			resetErrors();
		}
		function addOption() {
			const id = String.fromCharCode(97 + questionForm.options.length);
			questionForm.options.push({
				id,
				text: ""
			});
		}
		function removeOption(index) {
			if (questionForm.options.length <= 2) return;
			const removed = questionForm.options[index];
			questionForm.options.splice(index, 1);
			if (removed) questionForm.correct = questionForm.correct.filter((value) => value !== removed.id);
		}
		function toggleCorrect(optionId) {
			if (questionForm.type === "multiple_choice") questionForm.correct = questionForm.correct.includes(optionId) ? questionForm.correct.filter((value) => value !== optionId) : [...questionForm.correct, optionId];
			else questionForm.correct = [optionId];
		}
		function onQuestionTypeChange() {
			if (questionForm.type === "true_false") {
				questionForm.options = [{
					id: "true",
					text: "True"
				}, {
					id: "false",
					text: "False"
				}];
				questionForm.correct = [];
				return;
			}
			if (questionForm.options.some((option) => option.id === "true" || option.id === "false")) {
				questionForm.options = [{
					id: "a",
					text: ""
				}, {
					id: "b",
					text: ""
				}];
				questionForm.correct = [];
				return;
			}
			if (questionForm.type === "single_choice" && questionForm.correct.length > 1) questionForm.correct = [questionForm.correct[0]];
		}
		async function saveQuestion() {
			if (!activeQuiz.value) return;
			const body = {
				...questionForm.id ? { id: questionForm.id } : { quiz_id: activeQuiz.value.id },
				type: questionForm.type,
				question: questionForm.question,
				options: questionForm.options.map((option) => ({
					id: option.id,
					text: option.text
				})),
				correct_answers: questionForm.correct,
				marks: questionForm.marks,
				sort_order: questionForm.sort_order
			};
			if (await run(() => apiData("/admin/quiz-questions/" + (questionForm.id ? "update" : "add"), {
				method: "POST",
				body
			}), questionForm.id ? "Question saved." : "Question added.") === void 0) return;
			await loadQuestions();
			resetQuestion();
			refresh();
		}
		async function removeQuestion(question) {
			if (!await ask({
				title: "Delete question",
				message: "Delete this question from the quiz?",
				confirmLabel: "Delete question"
			})) return;
			if (await run(() => apiData(`/admin/quiz-questions/delete/${question.id}`, { method: "DELETE" }), "Question deleted.") !== void 0) {
				await loadQuestions();
				refresh();
			}
		}
		function questionTypeLabel(type) {
			return type === "multiple_choice" ? "Multiple choice" : type === "true_false" ? "True / false" : "Single choice";
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_AdminPageHeader = AdminPageHeader_default;
			const _component_NuxtLink = NuxtLink;
			const _component_BaseIcon = BaseIcon_default;
			const _component_StatusBadge = StatusBadge_default;
			const _component_ErrorState = ErrorState_default;
			const _component_CourseAttachmentsManager = CourseAttachmentsManager_default;
			const _component_EmptyState = EmptyState_default;
			const _component_AppModal = AppModal_default;
			const _component_LessonResourcesManager = LessonResourcesManager_default;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			_push(ssrRenderComponent(_component_AdminPageHeader, {
				title: unref(isNew) ? "New course" : unref(course)?.title || "Course builder",
				subtitle: unref(isNew) ? "Create the course shell first, then add sections, lessons and quizzes." : "Edit course details, build the curriculum and attach quizzes.",
				icon: "book-open"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/courses",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "arrow-left",
										size: 16
									}, null, _parent, _scopeId));
									_push(` All courses `);
								} else return [createVNode(_component_BaseIcon, {
									name: "arrow-left",
									size: 16
								}), createTextVNode(" All courses ")];
							}),
							_: 1
						}, _parent, _scopeId));
						if (unref(course) && unref(course).status === "published") _push(ssrRenderComponent(_component_NuxtLink, {
							to: `/courses/${unref(course).slug}`,
							target: "_blank",
							class: "btn-secondary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "external-link",
										size: 15
									}, null, _parent, _scopeId));
									_push(` View on site `);
								} else return [createVNode(_component_BaseIcon, {
									name: "external-link",
									size: 15
								}), createTextVNode(" View on site ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if (unref(course)) _push(ssrRenderComponent(_component_NuxtLink, {
							to: `/community/${unref(course).slug}`,
							class: "btn-primary"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(ssrRenderComponent(_component_BaseIcon, {
										name: "video",
										size: 15
									}, null, _parent, _scopeId));
									_push(` Live classes &amp; announcements `);
								} else return [createVNode(_component_BaseIcon, {
									name: "video",
									size: 15
								}), createTextVNode(" Live classes & announcements ")];
							}),
							_: 1
						}, _parent, _scopeId));
						else _push(`<!---->`);
						if (unref(course)) _push(ssrRenderComponent(_component_StatusBadge, { status: unref(course).status }, null, _parent, _scopeId));
						else _push(`<!---->`);
					} else return [
						createVNode(_component_NuxtLink, {
							to: "/admin/courses",
							class: "btn-secondary"
						}, {
							default: withCtx(() => [createVNode(_component_BaseIcon, {
								name: "arrow-left",
								size: 16
							}), createTextVNode(" All courses ")]),
							_: 1
						}),
						unref(course) && unref(course).status === "published" ? (openBlock(), createBlock(_component_NuxtLink, {
							key: 0,
							to: `/courses/${unref(course).slug}`,
							target: "_blank",
							class: "btn-secondary"
						}, {
							default: withCtx(() => [createVNode(_component_BaseIcon, {
								name: "external-link",
								size: 15
							}), createTextVNode(" View on site ")]),
							_: 1
						}, 8, ["to"])) : createCommentVNode("", true),
						unref(course) ? (openBlock(), createBlock(_component_NuxtLink, {
							key: 1,
							to: `/community/${unref(course).slug}`,
							class: "btn-primary"
						}, {
							default: withCtx(() => [createVNode(_component_BaseIcon, {
								name: "video",
								size: 15
							}), createTextVNode(" Live classes & announcements ")]),
							_: 1
						}, 8, ["to"])) : createCommentVNode("", true),
						unref(course) ? (openBlock(), createBlock(_component_StatusBadge, {
							key: 2,
							status: unref(course).status
						}, null, 8, ["status"])) : createCommentVNode("", true)
					];
				}),
				_: 1
			}, _parent));
			if (unref(pending) && !unref(isNew)) _push(`<div class="space-y-3"><div class="card h-24 animate-pulse bg-gray-50"></div><div class="card h-64 animate-pulse bg-gray-50"></div></div>`);
			else if (unref(error)) _push(ssrRenderComponent(_component_ErrorState, {
				title: "Could not load this course",
				message: unref(error).message,
				onRetry: unref(refresh)
			}, null, _parent));
			else {
				_push(`<!--[--><div class="mb-4 flex flex-wrap gap-1 rounded-xl border border-gray-100 bg-white p-1 shadow-sm"><!--[-->`);
				ssrRenderList$2(tabs, (item) => {
					_push(`<button type="button" class="${ssrRenderClass([unref(tab) === item.value ? "bg-oc-primary text-white" : "text-gray-600 hover:bg-gray-100", "inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition sm:flex-none"])}">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: item.icon,
						size: 16
					}, null, _parent));
					_push(` ${ssrInterpolate(item.label)} `);
					if (item.value === "curriculum" && unref(course)) _push(`<span class="${ssrRenderClass([unref(tab) === "curriculum" ? "bg-white/20" : "bg-gray-100", "rounded-full px-1.5 text-[10px]"])}">${ssrInterpolate(unref(allLessons).length)}</span>`);
					else if (item.value === "quizzes" && unref(course)) _push(`<span class="${ssrRenderClass([unref(tab) === "quizzes" ? "bg-white/20" : "bg-gray-100", "rounded-full px-1.5 text-[10px]"])}">${ssrInterpolate(unref(quizzes).length)}</span>`);
					else _push(`<!---->`);
					_push(`</button>`);
				});
				_push(`<!--]--></div>`);
				if (unref(tab) === "details") {
					_push(`<form class="space-y-4"><section class="card p-5"><h2 class="mb-4 text-sm font-bold text-gray-900">Course information</h2><div class="grid gap-4 md:grid-cols-2"><div class="md:col-span-2"><label class="field-label" for="course-title">Title</label><input id="course-title"${ssrRenderAttr("value", unref(details).title)} type="text" class="field-input" required placeholder="Complete web development bootcamp">`);
					if (unref(fieldError)("title")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("title"))}</p>`);
					else _push(`<!---->`);
					_push(`</div><div><label class="field-label" for="course-slug">Slug</label><input id="course-slug"${ssrRenderAttr("value", unref(details).slug)} type="text" class="field-input" placeholder="complete-web-development-bootcamp">`);
					if (unref(fieldError)("slug")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("slug"))}</p>`);
					else _push(`<!---->`);
					_push(`</div><div><label class="field-label" for="course-subtitle">Subtitle</label><input id="course-subtitle"${ssrRenderAttr("value", unref(details).subtitle)} type="text" class="field-input" placeholder="Go from zero to job-ready">`);
					if (unref(fieldError)("subtitle")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("subtitle"))}</p>`);
					else _push(`<!---->`);
					_push(`</div><div class="md:col-span-2"><label class="field-label" for="course-description">Description</label><textarea id="course-description" rows="4" class="field-input" placeholder="What the course covers, who it is for, and the outcome students can expect.">${ssrInterpolate(unref(details).description)}</textarea></div><div><label class="field-label" for="course-category">Category</label><select id="course-category" class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(details).course_category_id) ? ssrLooseContain(unref(details).course_category_id, "") : ssrLooseEqual(unref(details).course_category_id, "")) ? " selected" : ""}>Uncategorised</option><!--[-->`);
					ssrRenderList$2(unref(categories), (category) => {
						_push(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(details).course_category_id) ? ssrLooseContain(unref(details).course_category_id, category.id) : ssrLooseEqual(unref(details).course_category_id, category.id)) ? " selected" : ""}>${ssrInterpolate(category.name)}</option>`);
					});
					_push(`<!--]--></select></div>`);
					if (unref(isAdmin)) {
						_push(`<div><label class="field-label" for="course-instructor">Instructor</label><select id="course-instructor" class="field-input"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(details).instructor_id) ? ssrLooseContain(unref(details).instructor_id, "") : ssrLooseEqual(unref(details).instructor_id, "")) ? " selected" : ""}>No instructor</option><!--[-->`);
						ssrRenderList$2(unref(instructors), (person) => {
							_push(`<option${ssrRenderAttr("value", person.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(details).instructor_id) ? ssrLooseContain(unref(details).instructor_id, person.id) : ssrLooseEqual(unref(details).instructor_id, person.id)) ? " selected" : ""}>${ssrInterpolate(person.name)}</option>`);
						});
						_push(`<!--]--></select>`);
						if (!unref(instructors)?.length) _push(`<p class="mt-1 text-[11px] text-gray-400">Create an Instructor account in Users first.</p>`);
						else _push(`<!---->`);
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`<div><label class="field-label" for="course-level">Level</label><select id="course-level" class="field-input"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(details).level) ? ssrLooseContain(unref(details).level, "all") : ssrLooseEqual(unref(details).level, "all")) ? " selected" : ""}>All levels</option><option value="beginner"${ssrIncludeBooleanAttr(Array.isArray(unref(details).level) ? ssrLooseContain(unref(details).level, "beginner") : ssrLooseEqual(unref(details).level, "beginner")) ? " selected" : ""}>Beginner</option><option value="intermediate"${ssrIncludeBooleanAttr(Array.isArray(unref(details).level) ? ssrLooseContain(unref(details).level, "intermediate") : ssrLooseEqual(unref(details).level, "intermediate")) ? " selected" : ""}>Intermediate</option><option value="advanced"${ssrIncludeBooleanAttr(Array.isArray(unref(details).level) ? ssrLooseContain(unref(details).level, "advanced") : ssrLooseEqual(unref(details).level, "advanced")) ? " selected" : ""}>Advanced</option></select></div><div><label class="field-label" for="course-language">Language</label><input id="course-language"${ssrRenderAttr("value", unref(details).language)} type="text" class="field-input" placeholder="en"></div><div><label class="field-label" for="course-promo">Promo video URL</label><input id="course-promo"${ssrRenderAttr("value", unref(details).promo_video_url)} type="url" class="field-input" placeholder="https://…">`);
					if (unref(fieldError)("promo_video_url")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("promo_video_url"))}</p>`);
					else _push(`<!---->`);
					_push(`</div></div></section><section class="card p-5"><h2 class="mb-4 text-sm font-bold text-gray-900">Pricing &amp; access</h2><div class="grid gap-4 md:grid-cols-2"><div><label class="field-label" for="course-price">Price (BDT)</label><input id="course-price"${ssrRenderAttr("value", unref(details).price)} type="number" min="0" step="0.01" class="field-input">`);
					if (unref(fieldError)("price")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("price"))}</p>`);
					else _push(`<!---->`);
					_push(`</div><div><label class="field-label" for="course-offer">Offer price (optional)</label><input id="course-offer"${ssrRenderAttr("value", unref(details).offer_price)} type="number" min="0" step="0.01" class="field-input" placeholder="Leave empty for no discount">`);
					if (unref(fieldError)("offer_price")) _push(`<p class="field-error">${ssrInterpolate(unref(fieldError)("offer_price"))}</p>`);
					else _push(`<!---->`);
					_push(`</div><div class="md:col-span-2 rounded-xl border border-gray-100 bg-gray-50/60 p-3"><label class="flex items-center gap-2 text-sm font-semibold text-gray-700"><input${ssrIncludeBooleanAttr(Array.isArray(unref(details).lifetime) ? ssrLooseContain(unref(details).lifetime, null) : unref(details).lifetime) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"> Lifetime access </label>`);
					if (!unref(details).lifetime) _push(`<div class="mt-2 max-w-xs"><label class="field-label" for="course-days">Access days</label><input id="course-days"${ssrRenderAttr("value", unref(details).access_days)} type="number" min="1" class="field-input"><p class="mt-1 text-[11px] text-gray-400">Students keep access for this many days after enrolment.</p></div>`);
					else _push(`<!---->`);
					_push(`</div></div></section><section class="card p-5"><h2 class="mb-4 text-sm font-bold text-gray-900">Publishing</h2><div class="grid gap-4 md:grid-cols-2"><div><label class="field-label" for="course-status">Status</label><select id="course-status" class="field-input"><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(details).status) ? ssrLooseContain(unref(details).status, "draft") : ssrLooseEqual(unref(details).status, "draft")) ? " selected" : ""}>Draft</option><option value="under_review"${ssrIncludeBooleanAttr(Array.isArray(unref(details).status) ? ssrLooseContain(unref(details).status, "under_review") : ssrLooseEqual(unref(details).status, "under_review")) ? " selected" : ""}>Submit for review</option><option value="published"${ssrIncludeBooleanAttr(Array.isArray(unref(details).status) ? ssrLooseContain(unref(details).status, "published") : ssrLooseEqual(unref(details).status, "published")) ? " selected" : ""}>${ssrInterpolate(unref(isAdmin) ? "Published" : "Request publishing (admin approval)")}</option><option value="unpublished"${ssrIncludeBooleanAttr(Array.isArray(unref(details).status) ? ssrLooseContain(unref(details).status, "unpublished") : ssrLooseEqual(unref(details).status, "unpublished")) ? " selected" : ""}>Unpublished</option><option value="archived"${ssrIncludeBooleanAttr(Array.isArray(unref(details).status) ? ssrLooseContain(unref(details).status, "archived") : ssrLooseEqual(unref(details).status, "archived")) ? " selected" : ""}>Archived</option></select></div>`);
					if (unref(isAdmin)) _push(`<label class="mt-7 flex items-center gap-2 text-sm font-semibold text-gray-700"><input${ssrIncludeBooleanAttr(Array.isArray(unref(details).is_featured) ? ssrLooseContain(unref(details).is_featured, null) : unref(details).is_featured) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"> Feature on the homepage </label>`);
					else _push(`<!---->`);
					_push(`<div class="md:col-span-2"><label class="field-label">Thumbnail</label><div class="flex flex-wrap items-center gap-4"><img${ssrRenderAttr("src", unref(thumbnailPreview) || "/images/placeholder.svg")} alt="Course thumbnail" class="h-24 w-36 rounded-xl border border-gray-100 object-cover"><div><input type="file" accept="image/*" class="block text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"><p class="mt-1 text-[11px] text-gray-400">Recommended 16:9, JPG or PNG.</p></div></div></div></div></section>`);
					if (unref(courseId)) _push(ssrRenderComponent(_component_CourseAttachmentsManager, { "course-id": unref(courseId) }, null, _parent));
					else _push(`<!---->`);
					_push(`<section class="card p-5"><h2 class="mb-4 text-sm font-bold text-gray-900">Learning outcomes</h2><div class="grid gap-4 md:grid-cols-2"><div><label class="field-label" for="course-requirements">Requirements (one per line)</label><textarea id="course-requirements" rows="5" class="field-input" placeholder="A computer with internet access">${ssrInterpolate(unref(details).requirements)}</textarea></div><div><label class="field-label" for="course-outcomes">What students will learn (one per line)</label><textarea id="course-outcomes" rows="5" class="field-input" placeholder="Build responsive layouts with modern CSS">${ssrInterpolate(unref(details).outcomes)}</textarea></div></div></section><div class="flex flex-wrap items-center justify-end gap-2">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/admin/courses",
						class: "btn-secondary"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`Cancel`);
							else return [createTextVNode("Cancel")];
						}),
						_: 1
					}, _parent));
					_push(`<button type="submit" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}>`);
					if (unref(busy)) _push(ssrRenderComponent(_component_BaseIcon, {
						name: "refresh",
						size: 15,
						class: "animate-spin"
					}, null, _parent));
					else _push(ssrRenderComponent(_component_BaseIcon, {
						name: "save",
						size: 16
					}, null, _parent));
					_push(` ${ssrInterpolate(unref(isNew) ? "Create course" : "Save changes")}</button></div></form>`);
				} else if (unref(tab) === "curriculum" && !unref(isNew)) {
					_push(`<div class="space-y-4"><div class="flex flex-wrap items-center justify-between gap-2"><p class="text-sm text-gray-500">${ssrInterpolate(unref(sections).length)} section${ssrInterpolate(unref(sections).length === 1 ? "" : "s")} · ${ssrInterpolate(unref(allLessons).length)} lesson${ssrInterpolate(unref(allLessons).length === 1 ? "" : "s")}</p><div class="flex gap-2"><button type="button" class="btn-secondary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "plus",
						size: 15
					}, null, _parent));
					_push(` Add lesson </button><button type="button" class="btn-primary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "plus",
						size: 15
					}, null, _parent));
					_push(` Add section </button></div></div>`);
					if (!unref(sections).length) _push(ssrRenderComponent(_component_EmptyState, {
						icon: "list",
						title: "No curriculum yet",
						message: "Add a section, then place video, text or quiz lessons inside it.",
						"action-label": "Add the first section",
						onAction: ($event) => openSection()
					}, null, _parent));
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(unref(sections), (section, sectionIndex) => {
						_push(`<section class="card overflow-hidden"><div class="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50/60 px-4 py-3"><span class="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-xs font-bold text-gray-500 ring-1 ring-gray-200">${ssrInterpolate(sectionIndex + 1)}</span><div class="min-w-0 flex-1"><h3 class="truncate text-sm font-bold text-gray-900">${ssrInterpolate(section.title)}</h3>`);
						if (section.description) _push(`<p class="truncate text-[11px] text-gray-500">${ssrInterpolate(section.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex items-center gap-0.5"><button type="button" class="btn-ghost !p-1.5"${ssrIncludeBooleanAttr(sectionIndex === 0) ? " disabled" : ""} aria-label="Move section up">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "chevron-up",
							size: 15
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5"${ssrIncludeBooleanAttr(sectionIndex === unref(sections).length - 1) ? " disabled" : ""} aria-label="Move section down">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "chevron-down",
							size: 15
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5" aria-label="Add lesson to section">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 15
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5" aria-label="Edit section">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "edit",
							size: 15
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete section">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 15
						}, null, _parent));
						_push(`</button></div></div>`);
						if (!section.lessons?.length) _push(`<div class="px-4 py-5 text-center text-xs text-gray-400"> No lessons in this section yet. <button type="button" class="font-semibold text-oc-primary hover:underline">Add one</button></div>`);
						else {
							_push(`<ul class="divide-y divide-gray-50"><!--[-->`);
							ssrRenderList$2(section.lessons, (lesson, lessonIndex) => {
								_push(`<li class="flex flex-wrap items-center gap-2 px-4 py-2.5"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-light text-oc-primary">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: lesson.type === "video" ? "video" : lesson.type === "quiz" ? "check-circle" : "blog",
									size: 15
								}, null, _parent));
								_push(`</span><div class="min-w-0 flex-1"><p class="flex flex-wrap items-center gap-1.5 text-sm font-semibold text-gray-800"><span class="truncate">${ssrInterpolate(lesson.title)}</span>`);
								if (lesson.is_preview) _push(`<span class="badge bg-blue-50 text-blue-700 ring-blue-200">Preview</span>`);
								else _push(`<!---->`);
								if (!lesson.is_published) _push(`<span class="badge bg-gray-100 text-gray-600 ring-gray-200">Hidden</span>`);
								else _push(`<!---->`);
								if (lesson.quiz) _push(`<span class="badge bg-violet-50 text-violet-700 ring-violet-200">Quiz</span>`);
								else _push(`<!---->`);
								_push(`</p><p class="text-[11px] text-gray-400">${ssrInterpolate(lesson.type)} · ${ssrInterpolate(("formatDuration" in _ctx ? _ctx.formatDuration : unref(formatDuration))(lesson.duration_seconds))} `);
								if (lesson.video_source) _push(`<!--[--> · ${ssrInterpolate(lesson.video_source)}<!--]-->`);
								else _push(`<!---->`);
								_push(`</p></div><div class="flex items-center gap-0.5"><button type="button" class="btn-ghost !p-1.5"${ssrIncludeBooleanAttr(lessonIndex === 0) ? " disabled" : ""} aria-label="Move lesson up">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "chevron-up",
									size: 14
								}, null, _parent));
								_push(`</button><button type="button" class="btn-ghost !p-1.5"${ssrIncludeBooleanAttr(lessonIndex === (section.lessons?.length ?? 1) - 1) ? " disabled" : ""} aria-label="Move lesson down">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "chevron-down",
									size: 14
								}, null, _parent));
								_push(`</button><button type="button" class="btn-ghost !p-1.5" aria-label="Edit lesson">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "edit",
									size: 14
								}, null, _parent));
								_push(`</button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete lesson">`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "trash",
									size: 14
								}, null, _parent));
								_push(`</button></div></li>`);
							});
							_push(`<!--]--></ul>`);
						}
						_push(`</section>`);
					});
					_push(`<!--]--></div>`);
				} else if (unref(tab) === "quizzes" && !unref(isNew)) {
					_push(`<div class="space-y-4"><div class="flex flex-wrap items-center justify-between gap-2"><p class="text-sm text-gray-500">Quizzes attached to this course. A quiz can be linked to one lesson.</p><button type="button" class="btn-primary">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "plus",
						size: 15
					}, null, _parent));
					_push(` Add quiz </button></div>`);
					if (!unref(quizzes).length) _push(ssrRenderComponent(_component_EmptyState, {
						icon: "check-circle",
						title: "No quizzes yet",
						message: "Create a quiz, then add questions with single or multiple correct answers.",
						"action-label": "Create the first quiz",
						onAction: ($event) => openQuiz()
					}, null, _parent));
					else _push(`<!---->`);
					_push(`<!--[-->`);
					ssrRenderList$2(unref(quizzes), (quiz) => {
						_push(`<article class="card p-4"><div class="flex flex-wrap items-start justify-between gap-2"><div class="min-w-0"><h3 class="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-900">${ssrInterpolate(quiz.title)} `);
						_push(ssrRenderComponent(_component_StatusBadge, { status: quiz.is_published ? "published" : "draft" }, null, _parent));
						if (quiz.lesson_id) _push(`<span class="badge bg-violet-50 text-violet-700 ring-violet-200"> Lesson #${ssrInterpolate(quiz.lesson_id)}</span>`);
						else _push(`<!---->`);
						_push(`</h3>`);
						if (quiz.description) _push(`<p class="mt-1 line-clamp-2 text-xs text-gray-500">${ssrInterpolate(quiz.description)}</p>`);
						else _push(`<!---->`);
						_push(`<div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-gray-500"><span>${ssrInterpolate(quiz.questions_count ?? 0)} questions</span><span>Pass ${ssrInterpolate(quiz.pass_percentage)}%</span>`);
						if (quiz.time_limit_minutes) _push(`<span>${ssrInterpolate(quiz.time_limit_minutes)} min limit</span>`);
						else _push(`<!---->`);
						if (quiz.max_attempts) _push(`<span>${ssrInterpolate(quiz.max_attempts)} attempts</span>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="flex items-center gap-1"><button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "list",
							size: 14
						}, null, _parent));
						_push(` Questions </button><button type="button" class="btn-ghost !p-1.5" aria-label="Edit quiz">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "edit",
							size: 15
						}, null, _parent));
						_push(`</button><button type="button" class="btn-ghost !p-1.5 text-rose-600 hover:bg-rose-50" aria-label="Delete quiz">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "trash",
							size: 15
						}, null, _parent));
						_push(`</button></div></div></article>`);
					});
					_push(`<!--]--></div>`);
				} else _push(ssrRenderComponent(_component_EmptyState, {
					icon: "save",
					title: "Save the course first",
					message: "Create the course details, then return here to build sections, lessons and quizzes.",
					"action-label": "Go to course details",
					onAction: ($event) => setTab("details")
				}, null, _parent));
				_push(`<!--]-->`);
			}
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(sectionModal),
				title: unref(sectionForm).id ? "Edit section" : "Add section",
				size: "md",
				onClose: ($event) => sectionModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(sectionForm).id ? "Save section" : "Add section")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => sectionModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: saveSection
					}, toDisplayString(unref(sectionForm).id ? "Save section" : "Add section"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="section-title"${_scopeId}>Title</label><input id="section-title"${ssrRenderAttr("value", unref(sectionForm).title)} type="text" class="field-input" required placeholder="Getting started"${_scopeId}>`);
						if (unref(fieldError)("title")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("title"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="section-description"${_scopeId}>Description</label><textarea id="section-description" rows="3" class="field-input"${_scopeId}>${ssrInterpolate(unref(sectionForm).description)}</textarea></div><div class="max-w-[160px]"${_scopeId}><label class="field-label" for="section-order"${_scopeId}>Sort order</label><input id="section-order"${ssrRenderAttr("value", unref(sectionForm).sort_order)} type="number" class="field-input"${_scopeId}></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(saveSection, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "section-title"
							}, "Title"),
							withDirectives(createVNode("input", {
								id: "section-title",
								"onUpdate:modelValue": ($event) => unref(sectionForm).title = $event,
								type: "text",
								class: "field-input",
								required: "",
								placeholder: "Getting started"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(sectionForm).title]]),
							unref(fieldError)("title") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("title")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "section-description"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "section-description",
							"onUpdate:modelValue": ($event) => unref(sectionForm).description = $event,
							rows: "3",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(sectionForm).description]])]),
						createVNode("div", { class: "max-w-[160px]" }, [createVNode("label", {
							class: "field-label",
							for: "section-order"
						}, "Sort order"), withDirectives(createVNode("input", {
							id: "section-order",
							"onUpdate:modelValue": ($event) => unref(sectionForm).sort_order = $event,
							type: "number",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(sectionForm).sort_order,
							void 0,
							{ number: true }
						]])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(lessonModal),
				title: unref(lessonForm).id ? "Edit lesson" : "Add lesson",
				size: "lg",
				onClose: ($event) => lessonModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(lessonForm).id ? "Save lesson" : "Add lesson")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => lessonModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: saveLesson
					}, toDisplayString(unref(lessonForm).id ? "Save lesson" : "Add lesson"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div class="grid gap-4 sm:grid-cols-2"${_scopeId}><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="lesson-title"${_scopeId}>Title</label><input id="lesson-title"${ssrRenderAttr("value", unref(lessonForm).title)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("title")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("title"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="lesson-section"${_scopeId}>Section</label><select id="lesson-section" class="field-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).course_section_id) ? ssrLooseContain(unref(lessonForm).course_section_id, "") : ssrLooseEqual(unref(lessonForm).course_section_id, "")) ? " selected" : ""}${_scopeId}>No section</option><!--[-->`);
						ssrRenderList$2(unref(sections), (section) => {
							_push(`<option${ssrRenderAttr("value", section.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).course_section_id) ? ssrLooseContain(unref(lessonForm).course_section_id, section.id) : ssrLooseEqual(unref(lessonForm).course_section_id, section.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(section.title)}</option>`);
						});
						_push(`<!--]--></select></div><div${_scopeId}><label class="field-label" for="lesson-type"${_scopeId}>Type</label><select id="lesson-type" class="field-input"${_scopeId}><option value="video"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).type) ? ssrLooseContain(unref(lessonForm).type, "video") : ssrLooseEqual(unref(lessonForm).type, "video")) ? " selected" : ""}${_scopeId}>Video</option><option value="text"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).type) ? ssrLooseContain(unref(lessonForm).type, "text") : ssrLooseEqual(unref(lessonForm).type, "text")) ? " selected" : ""}${_scopeId}>Text</option><option value="quiz"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).type) ? ssrLooseContain(unref(lessonForm).type, "quiz") : ssrLooseEqual(unref(lessonForm).type, "quiz")) ? " selected" : ""}${_scopeId}>Quiz placeholder</option></select></div><div class="sm:col-span-2"${_scopeId}><label class="field-label" for="lesson-description"${_scopeId}>Short description</label><input id="lesson-description"${ssrRenderAttr("value", unref(lessonForm).description)} type="text" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="lesson-duration"${_scopeId}>Duration (seconds)</label><input id="lesson-duration"${ssrRenderAttr("value", unref(lessonForm).duration_seconds)} type="number" min="0" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="lesson-order"${_scopeId}>Sort order</label><input id="lesson-order"${ssrRenderAttr("value", unref(lessonForm).sort_order)} type="number" class="field-input"${_scopeId}></div></div>`);
						if (unref(lessonForm).type === "video") {
							_push(`<div class="rounded-xl border border-gray-100 bg-gray-50/60 p-3"${_scopeId}><p class="mb-2 text-xs font-bold uppercase tracking-wide text-gray-500"${_scopeId}>Video</p><div class="grid gap-3 sm:grid-cols-2"${_scopeId}><div${_scopeId}><label class="field-label" for="lesson-source"${_scopeId}>Source</label><select id="lesson-source" class="field-input"${_scopeId}><option value="youtube"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).video_source) ? ssrLooseContain(unref(lessonForm).video_source, "youtube") : ssrLooseEqual(unref(lessonForm).video_source, "youtube")) ? " selected" : ""}${_scopeId}>YouTube</option><option value="external"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).video_source) ? ssrLooseContain(unref(lessonForm).video_source, "external") : ssrLooseEqual(unref(lessonForm).video_source, "external")) ? " selected" : ""}${_scopeId}>Other https URL (Vimeo, MP4, HLS)</option><option value="upload"${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).video_source) ? ssrLooseContain(unref(lessonForm).video_source, "upload") : ssrLooseEqual(unref(lessonForm).video_source, "upload")) ? " selected" : ""}${_scopeId}>Upload a video file</option></select></div>`);
							if (unref(lessonForm).video_source === "external" || unref(lessonForm).video_source === "youtube") {
								_push(`<div${_scopeId}><label class="field-label" for="lesson-video-url"${_scopeId}>Video URL</label><input id="lesson-video-url"${ssrRenderAttr("value", unref(lessonForm).video_url)} type="url" class="field-input"${ssrRenderAttr("placeholder", unref(lessonForm).video_source === "youtube" ? "https://www.youtube.com/watch?v=…" : "https://…")}${_scopeId}>`);
								if (unref(fieldError)("video_url")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("video_url"))}</p>`);
								else _push(`<!---->`);
								_push(`</div>`);
							} else _push(`<div${_scopeId}><label class="field-label" for="lesson-video-file"${_scopeId}>Video file</label><input id="lesson-video-file" type="file" accept="video/*" class="block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary"${_scopeId}><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>MP4 or WebM. Maximum 500 MB.</p></div>`);
							_push(`</div>`);
							if (unref(lessonForm).id) _push(`<label class="mt-3 flex items-center gap-2 text-xs font-medium text-rose-600"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).remove_video) ? ssrLooseContain(unref(lessonForm).remove_video, null) : unref(lessonForm).remove_video) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300"${_scopeId}> Remove the currently stored video </label>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<div class="grid gap-3 sm:grid-cols-2"${_scopeId}>`);
						if (unref(lessonForm).type === "video") {
							_push(`<div${_scopeId}><label class="field-label" for="lesson-threshold"${_scopeId}>Watch % needed to complete</label><input id="lesson-threshold"${ssrRenderAttr("value", unref(lessonForm).completion_threshold)} type="number" min="1" max="100" class="field-input" placeholder="Default 95"${_scopeId}>`);
							if (unref(fieldError)("completion_threshold")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("completion_threshold"))}</p>`);
							else _push(`<!---->`);
							_push(`</div>`);
						} else _push(`<!---->`);
						_push(`<label class="flex items-center gap-2 self-end pb-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).is_required) ? ssrLooseContain(unref(lessonForm).is_required, null) : unref(lessonForm).is_required) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Required for course completion </label></div>`);
						if (unref(lessonForm).id) _push(ssrRenderComponent(_component_LessonResourcesManager, { "lesson-id": unref(lessonForm).id }, null, _parent, _scopeId));
						else _push(`<!---->`);
						if (unref(lessonForm).type !== "video") _push(`<div${_scopeId}><label class="field-label" for="lesson-content"${_scopeId}>Content</label><textarea id="lesson-content" rows="6" class="field-input" placeholder="Lesson notes, article or instructions. Basic HTML is supported."${_scopeId}>${ssrInterpolate(unref(lessonForm).content)}</textarea></div>`);
						else _push(`<!---->`);
						_push(`<div class="flex flex-wrap gap-4"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).is_preview) ? ssrLooseContain(unref(lessonForm).is_preview, null) : unref(lessonForm).is_preview) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Free preview </label><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(lessonForm).is_published) ? ssrLooseContain(unref(lessonForm).is_published, null) : unref(lessonForm).is_published) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Published </label></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(saveLesson, ["prevent"])
					}, [
						createVNode("div", { class: "grid gap-4 sm:grid-cols-2" }, [
							createVNode("div", { class: "sm:col-span-2" }, [
								createVNode("label", {
									class: "field-label",
									for: "lesson-title"
								}, "Title"),
								withDirectives(createVNode("input", {
									id: "lesson-title",
									"onUpdate:modelValue": ($event) => unref(lessonForm).title = $event,
									type: "text",
									class: "field-input",
									required: ""
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(lessonForm).title]]),
								unref(fieldError)("title") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("title")), 1)) : createCommentVNode("", true)
							]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "lesson-section"
							}, "Section"), withDirectives(createVNode("select", {
								id: "lesson-section",
								"onUpdate:modelValue": ($event) => unref(lessonForm).course_section_id = $event,
								class: "field-input"
							}, [createVNode("option", { value: "" }, "No section"), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(sections), (section) => {
								return openBlock(), createBlock("option", {
									key: section.id,
									value: section.id
								}, toDisplayString(section.title), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(lessonForm).course_section_id]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "lesson-type"
							}, "Type"), withDirectives(createVNode("select", {
								id: "lesson-type",
								"onUpdate:modelValue": ($event) => unref(lessonForm).type = $event,
								class: "field-input"
							}, [
								createVNode("option", { value: "video" }, "Video"),
								createVNode("option", { value: "text" }, "Text"),
								createVNode("option", { value: "quiz" }, "Quiz placeholder")
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(lessonForm).type]])]),
							createVNode("div", { class: "sm:col-span-2" }, [createVNode("label", {
								class: "field-label",
								for: "lesson-description"
							}, "Short description"), withDirectives(createVNode("input", {
								id: "lesson-description",
								"onUpdate:modelValue": ($event) => unref(lessonForm).description = $event,
								type: "text",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(lessonForm).description]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "lesson-duration"
							}, "Duration (seconds)"), withDirectives(createVNode("input", {
								id: "lesson-duration",
								"onUpdate:modelValue": ($event) => unref(lessonForm).duration_seconds = $event,
								type: "number",
								min: "0",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(lessonForm).duration_seconds,
								void 0,
								{ number: true }
							]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "lesson-order"
							}, "Sort order"), withDirectives(createVNode("input", {
								id: "lesson-order",
								"onUpdate:modelValue": ($event) => unref(lessonForm).sort_order = $event,
								type: "number",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(lessonForm).sort_order,
								void 0,
								{ number: true }
							]])])
						]),
						unref(lessonForm).type === "video" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "rounded-xl border border-gray-100 bg-gray-50/60 p-3"
						}, [
							createVNode("p", { class: "mb-2 text-xs font-bold uppercase tracking-wide text-gray-500" }, "Video"),
							createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "lesson-source"
							}, "Source"), withDirectives(createVNode("select", {
								id: "lesson-source",
								"onUpdate:modelValue": ($event) => unref(lessonForm).video_source = $event,
								class: "field-input"
							}, [
								createVNode("option", { value: "youtube" }, "YouTube"),
								createVNode("option", { value: "external" }, "Other https URL (Vimeo, MP4, HLS)"),
								createVNode("option", { value: "upload" }, "Upload a video file")
							], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(lessonForm).video_source]])]), unref(lessonForm).video_source === "external" || unref(lessonForm).video_source === "youtube" ? (openBlock(), createBlock("div", { key: 0 }, [
								createVNode("label", {
									class: "field-label",
									for: "lesson-video-url"
								}, "Video URL"),
								withDirectives(createVNode("input", {
									id: "lesson-video-url",
									"onUpdate:modelValue": ($event) => unref(lessonForm).video_url = $event,
									type: "url",
									class: "field-input",
									placeholder: unref(lessonForm).video_source === "youtube" ? "https://www.youtube.com/watch?v=…" : "https://…"
								}, null, 8, ["onUpdate:modelValue", "placeholder"]), [[vModelText, unref(lessonForm).video_url]]),
								unref(fieldError)("video_url") ? (openBlock(), createBlock("p", {
									key: 0,
									class: "field-error"
								}, toDisplayString(unref(fieldError)("video_url")), 1)) : createCommentVNode("", true)
							])) : (openBlock(), createBlock("div", { key: 1 }, [
								createVNode("label", {
									class: "field-label",
									for: "lesson-video-file"
								}, "Video file"),
								createVNode("input", {
									id: "lesson-video-file",
									type: "file",
									accept: "video/*",
									class: "block w-full text-xs text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-light file:px-3 file:py-2 file:text-xs file:font-semibold file:text-oc-primary",
									onChange: onLessonFile
								}, null, 32),
								createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "MP4 or WebM. Maximum 500 MB.")
							]))]),
							unref(lessonForm).id ? (openBlock(), createBlock("label", {
								key: 0,
								class: "mt-3 flex items-center gap-2 text-xs font-medium text-rose-600"
							}, [withDirectives(createVNode("input", {
								"onUpdate:modelValue": ($event) => unref(lessonForm).remove_video = $event,
								type: "checkbox",
								class: "h-4 w-4 rounded border-gray-300"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(lessonForm).remove_video]]), createTextVNode(" Remove the currently stored video ")])) : createCommentVNode("", true)
						])) : createCommentVNode("", true),
						createVNode("div", { class: "grid gap-3 sm:grid-cols-2" }, [unref(lessonForm).type === "video" ? (openBlock(), createBlock("div", { key: 0 }, [
							createVNode("label", {
								class: "field-label",
								for: "lesson-threshold"
							}, "Watch % needed to complete"),
							withDirectives(createVNode("input", {
								id: "lesson-threshold",
								"onUpdate:modelValue": ($event) => unref(lessonForm).completion_threshold = $event,
								type: "number",
								min: "1",
								max: "100",
								class: "field-input",
								placeholder: "Default 95"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(lessonForm).completion_threshold,
								void 0,
								{ number: true }
							]]),
							unref(fieldError)("completion_threshold") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("completion_threshold")), 1)) : createCommentVNode("", true)
						])) : createCommentVNode("", true), createVNode("label", { class: "flex items-center gap-2 self-end pb-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(lessonForm).is_required = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(lessonForm).is_required]]), createTextVNode(" Required for course completion ")])]),
						unref(lessonForm).id ? (openBlock(), createBlock(_component_LessonResourcesManager, {
							key: 1,
							"lesson-id": unref(lessonForm).id
						}, null, 8, ["lesson-id"])) : createCommentVNode("", true),
						unref(lessonForm).type !== "video" ? (openBlock(), createBlock("div", { key: 2 }, [createVNode("label", {
							class: "field-label",
							for: "lesson-content"
						}, "Content"), withDirectives(createVNode("textarea", {
							id: "lesson-content",
							"onUpdate:modelValue": ($event) => unref(lessonForm).content = $event,
							rows: "6",
							class: "field-input",
							placeholder: "Lesson notes, article or instructions. Basic HTML is supported."
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(lessonForm).content]])])) : createCommentVNode("", true),
						createVNode("div", { class: "flex flex-wrap gap-4" }, [createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(lessonForm).is_preview = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(lessonForm).is_preview]]), createTextVNode(" Free preview ")]), createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(lessonForm).is_published = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(lessonForm).is_published]]), createTextVNode(" Published ")])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(quizModal),
				title: unref(quizForm).id ? "Edit quiz" : "Add quiz",
				size: "md",
				onClose: ($event) => quizModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>Cancel</button><button type="button" class="btn-primary"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(quizForm).id ? "Save quiz" : "Add quiz")}</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						disabled: unref(busy),
						onClick: ($event) => quizModal.value = false
					}, "Cancel", 8, ["disabled", "onClick"]), createVNode("button", {
						type: "button",
						class: "btn-primary",
						disabled: unref(busy),
						onClick: saveQuiz
					}, toDisplayString(unref(quizForm).id ? "Save quiz" : "Add quiz"), 9, ["disabled"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-4"${_scopeId}><div${_scopeId}><label class="field-label" for="quiz-title"${_scopeId}>Title</label><input id="quiz-title"${ssrRenderAttr("value", unref(quizForm).title)} type="text" class="field-input" required${_scopeId}>`);
						if (unref(fieldError)("title")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("title"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><label class="field-label" for="quiz-description"${_scopeId}>Description</label><textarea id="quiz-description" rows="3" class="field-input"${_scopeId}>${ssrInterpolate(unref(quizForm).description)}</textarea></div><div${_scopeId}><label class="field-label" for="quiz-lesson"${_scopeId}>Linked lesson (optional)</label><select id="quiz-lesson" class="field-input"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(quizForm).lesson_id) ? ssrLooseContain(unref(quizForm).lesson_id, "") : ssrLooseEqual(unref(quizForm).lesson_id, "")) ? " selected" : ""}${_scopeId}>Not linked</option><!--[-->`);
						ssrRenderList$2(unref(allLessons), (lesson) => {
							_push(`<option${ssrRenderAttr("value", lesson.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(quizForm).lesson_id) ? ssrLooseContain(unref(quizForm).lesson_id, lesson.id) : ssrLooseEqual(unref(quizForm).lesson_id, lesson.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(lesson.title)}</option>`);
						});
						_push(`<!--]--></select><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>Each lesson can only have one quiz.</p>`);
						if (unref(fieldError)("lesson_id")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("lesson_id"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid gap-4 sm:grid-cols-3"${_scopeId}><div${_scopeId}><label class="field-label" for="quiz-pass"${_scopeId}>Pass %</label><input id="quiz-pass"${ssrRenderAttr("value", unref(quizForm).pass_percentage)} type="number" min="0" max="100" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="quiz-time"${_scopeId}>Time limit (min)</label><input id="quiz-time"${ssrRenderAttr("value", unref(quizForm).time_limit_minutes)} type="number" min="1" class="field-input" placeholder="None"${_scopeId}></div><div${_scopeId}><label class="field-label" for="quiz-attempts"${_scopeId}>Max attempts</label><input id="quiz-attempts"${ssrRenderAttr("value", unref(quizForm).max_attempts)} type="number" min="1" class="field-input" placeholder="Unlimited"${_scopeId}></div></div><div class="flex flex-wrap items-center gap-4"${_scopeId}><label class="flex items-center gap-2 text-sm text-gray-700"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(quizForm).is_published) ? ssrLooseContain(unref(quizForm).is_published, null) : unref(quizForm).is_published) ? " checked" : ""} type="checkbox" class="h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"${_scopeId}> Published </label><div class="ml-auto w-24"${_scopeId}><label class="field-label" for="quiz-order"${_scopeId}>Order</label><input id="quiz-order"${ssrRenderAttr("value", unref(quizForm).sort_order)} type="number" class="field-input"${_scopeId}></div></div></form>`);
					} else return [createVNode("form", {
						class: "space-y-4",
						onSubmit: withModifiers(saveQuiz, ["prevent"])
					}, [
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "quiz-title"
							}, "Title"),
							withDirectives(createVNode("input", {
								id: "quiz-title",
								"onUpdate:modelValue": ($event) => unref(quizForm).title = $event,
								type: "text",
								class: "field-input",
								required: ""
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(quizForm).title]]),
							unref(fieldError)("title") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("title")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "quiz-description"
						}, "Description"), withDirectives(createVNode("textarea", {
							id: "quiz-description",
							"onUpdate:modelValue": ($event) => unref(quizForm).description = $event,
							rows: "3",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(quizForm).description]])]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "quiz-lesson"
							}, "Linked lesson (optional)"),
							withDirectives(createVNode("select", {
								id: "quiz-lesson",
								"onUpdate:modelValue": ($event) => unref(quizForm).lesson_id = $event,
								class: "field-input"
							}, [createVNode("option", { value: "" }, "Not linked"), (openBlock(true), createBlock(Fragment, null, renderList$2(unref(allLessons), (lesson) => {
								return openBlock(), createBlock("option", {
									key: lesson.id,
									value: lesson.id
								}, toDisplayString(lesson.title), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, unref(quizForm).lesson_id]]),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "Each lesson can only have one quiz."),
							unref(fieldError)("lesson_id") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("lesson_id")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid gap-4 sm:grid-cols-3" }, [
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "quiz-pass"
							}, "Pass %"), withDirectives(createVNode("input", {
								id: "quiz-pass",
								"onUpdate:modelValue": ($event) => unref(quizForm).pass_percentage = $event,
								type: "number",
								min: "0",
								max: "100",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[
								vModelText,
								unref(quizForm).pass_percentage,
								void 0,
								{ number: true }
							]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "quiz-time"
							}, "Time limit (min)"), withDirectives(createVNode("input", {
								id: "quiz-time",
								"onUpdate:modelValue": ($event) => unref(quizForm).time_limit_minutes = $event,
								type: "number",
								min: "1",
								class: "field-input",
								placeholder: "None"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(quizForm).time_limit_minutes]])]),
							createVNode("div", null, [createVNode("label", {
								class: "field-label",
								for: "quiz-attempts"
							}, "Max attempts"), withDirectives(createVNode("input", {
								id: "quiz-attempts",
								"onUpdate:modelValue": ($event) => unref(quizForm).max_attempts = $event,
								type: "number",
								min: "1",
								class: "field-input",
								placeholder: "Unlimited"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(quizForm).max_attempts]])])
						]),
						createVNode("div", { class: "flex flex-wrap items-center gap-4" }, [createVNode("label", { class: "flex items-center gap-2 text-sm text-gray-700" }, [withDirectives(createVNode("input", {
							"onUpdate:modelValue": ($event) => unref(quizForm).is_published = $event,
							type: "checkbox",
							class: "h-4 w-4 rounded border-gray-300 text-oc-primary focus:ring-oc-primary"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, unref(quizForm).is_published]]), createTextVNode(" Published ")]), createVNode("div", { class: "ml-auto w-24" }, [createVNode("label", {
							class: "field-label",
							for: "quiz-order"
						}, "Order"), withDirectives(createVNode("input", {
							id: "quiz-order",
							"onUpdate:modelValue": ($event) => unref(quizForm).sort_order = $event,
							type: "number",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(quizForm).sort_order,
							void 0,
							{ number: true }
						]])])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_AppModal, {
				open: unref(questionModal),
				title: unref(activeQuiz) ? `Questions · ${unref(activeQuiz).title}` : "Questions",
				description: "Pick the correct answer(s) for every question.",
				size: "xl",
				onClose: ($event) => questionModal.value = false
			}, {
				footer: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<button type="button" class="btn-secondary"${_scopeId}>Done</button>`);
					else return [createVNode("button", {
						type: "button",
						class: "btn-secondary",
						onClick: ($event) => questionModal.value = false
					}, "Done", 8, ["onClick"])];
				}),
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="grid gap-5 lg:grid-cols-2"${_scopeId}><div${_scopeId}><div class="mb-2 flex items-center justify-between"${_scopeId}><h3 class="text-xs font-bold uppercase tracking-wide text-gray-500"${_scopeId}>Questions (${ssrInterpolate(unref(questions).length)})</h3><button type="button" class="btn-secondary !px-2.5 !py-1.5 text-xs"${_scopeId}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "plus",
							size: 13
						}, null, _parent, _scopeId));
						_push(` New </button></div>`);
						if (unref(questionsLoading)) {
							_push(`<div class="space-y-2"${_scopeId}><!--[-->`);
							ssrRenderList$2(3, (i) => {
								_push(`<div class="h-16 animate-pulse rounded-xl bg-gray-100"${_scopeId}></div>`);
							});
							_push(`<!--]--></div>`);
						} else if (!unref(questions).length) _push(ssrRenderComponent(_component_EmptyState, {
							icon: "list",
							title: "No questions yet",
							message: "Use the form to add the first question."
						}, null, _parent, _scopeId));
						else {
							_push(`<ul class="space-y-2"${_scopeId}><!--[-->`);
							ssrRenderList$2(unref(questions), (question) => {
								_push(`<li class="rounded-xl border border-gray-100 p-3"${_scopeId}><div class="flex items-start justify-between gap-2"${_scopeId}><p class="text-sm font-semibold text-gray-800"${_scopeId}>${ssrInterpolate(question.question)}</p><div class="flex shrink-0 items-center gap-0.5"${_scopeId}><button type="button" class="btn-ghost !p-1" aria-label="Edit question"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "edit",
									size: 13
								}, null, _parent, _scopeId));
								_push(`</button><button type="button" class="btn-ghost !p-1 text-rose-600" aria-label="Delete question"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "trash",
									size: 13
								}, null, _parent, _scopeId));
								_push(`</button></div></div><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>${ssrInterpolate(questionTypeLabel(question.type))} · ${ssrInterpolate(question.marks)} mark${ssrInterpolate(question.marks === 1 ? "" : "s")}</p><div class="mt-1.5 flex flex-wrap gap-1"${_scopeId}><!--[-->`);
								ssrRenderList$2(question.options, (option) => {
									_push(`<span class="${ssrRenderClass([question.correct_answers?.map(String).includes(String(option.id)) ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-50 text-gray-600 ring-gray-200", "badge"])}"${_scopeId}>${ssrInterpolate(option.text)}</span>`);
								});
								_push(`<!--]--></div></li>`);
							});
							_push(`<!--]--></ul>`);
						}
						_push(`</div><div class="rounded-xl border border-gray-100 bg-gray-50/60 p-4"${_scopeId}><h3 class="mb-3 text-xs font-bold uppercase tracking-wide text-gray-500"${_scopeId}>${ssrInterpolate(unref(questionForm).id ? "Edit question" : "Add question")}</h3><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="field-label" for="question-type"${_scopeId}>Type</label><select id="question-type" class="field-input"${_scopeId}><option value="single_choice"${ssrIncludeBooleanAttr(Array.isArray(unref(questionForm).type) ? ssrLooseContain(unref(questionForm).type, "single_choice") : ssrLooseEqual(unref(questionForm).type, "single_choice")) ? " selected" : ""}${_scopeId}>Single choice</option><option value="multiple_choice"${ssrIncludeBooleanAttr(Array.isArray(unref(questionForm).type) ? ssrLooseContain(unref(questionForm).type, "multiple_choice") : ssrLooseEqual(unref(questionForm).type, "multiple_choice")) ? " selected" : ""}${_scopeId}>Multiple choice</option><option value="true_false"${ssrIncludeBooleanAttr(Array.isArray(unref(questionForm).type) ? ssrLooseContain(unref(questionForm).type, "true_false") : ssrLooseEqual(unref(questionForm).type, "true_false")) ? " selected" : ""}${_scopeId}>True / false</option></select></div><div${_scopeId}><label class="field-label" for="question-text"${_scopeId}>Question</label><textarea id="question-text" rows="2" class="field-input"${_scopeId}>${ssrInterpolate(unref(questionForm).question)}</textarea>`);
						if (unref(fieldError)("question")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("question"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div${_scopeId}><div class="mb-1 flex items-center justify-between"${_scopeId}><span class="field-label !mb-0"${_scopeId}>Options</span>`);
						if (unref(questionForm).type !== "true_false") _push(`<button type="button" class="text-[11px] font-semibold text-oc-primary hover:underline"${_scopeId}> + Add option </button>`);
						else _push(`<!---->`);
						_push(`</div><div class="space-y-2"${_scopeId}><!--[-->`);
						ssrRenderList$2(unref(questionForm).options, (option, index) => {
							_push(`<div class="flex items-center gap-2"${_scopeId}><input${ssrIncludeBooleanAttr(unref(questionForm).correct.includes(option.id)) ? " checked" : ""}${ssrRenderAttr("type", unref(questionForm).type === "multiple_choice" ? "checkbox" : "radio")}${ssrRenderAttr("name", `correct-${unref(questionForm).id || "new"}`)} class="h-4 w-4 shrink-0 border-gray-300 text-oc-primary focus:ring-oc-primary"${ssrRenderAttr("aria-label", `Mark option ${option.id} correct`)}${_scopeId}><input${ssrRenderAttr("value", option.text)} type="text" class="field-input !py-1.5 text-xs"${ssrRenderAttr("placeholder", `Option ${option.id.toUpperCase()}`)}${_scopeId}>`);
							if (unref(questionForm).type !== "true_false" && unref(questionForm).options.length > 2) {
								_push(`<button type="button" class="btn-ghost !p-1 text-rose-600" aria-label="Remove option"${_scopeId}>`);
								_push(ssrRenderComponent(_component_BaseIcon, {
									name: "x",
									size: 13
								}, null, _parent, _scopeId));
								_push(`</button>`);
							} else _push(`<!---->`);
							_push(`</div>`);
						});
						_push(`<!--]--></div><p class="mt-1 text-[11px] text-gray-400"${_scopeId}>Tick the correct option${ssrInterpolate(unref(questionForm).type === "multiple_choice" ? "s" : "")}.</p>`);
						if (unref(fieldError)("options")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("options"))}</p>`);
						else _push(`<!---->`);
						if (unref(fieldError)("correct_answers")) _push(`<p class="field-error"${_scopeId}>${ssrInterpolate(unref(fieldError)("correct_answers"))}</p>`);
						else _push(`<!---->`);
						_push(`</div><div class="grid grid-cols-2 gap-3"${_scopeId}><div${_scopeId}><label class="field-label" for="question-marks"${_scopeId}>Marks</label><input id="question-marks"${ssrRenderAttr("value", unref(questionForm).marks)} type="number" min="1" class="field-input"${_scopeId}></div><div${_scopeId}><label class="field-label" for="question-order"${_scopeId}>Order</label><input id="question-order"${ssrRenderAttr("value", unref(questionForm).sort_order)} type="number" class="field-input"${_scopeId}></div></div><div class="flex justify-end gap-2 pt-1"${_scopeId}>`);
						if (unref(questionForm).id) _push(`<button type="button" class="btn-secondary !px-3 !py-2 text-xs"${_scopeId}>Cancel edit</button>`);
						else _push(`<!---->`);
						_push(`<button type="button" class="btn-primary !px-3 !py-2 text-xs"${ssrIncludeBooleanAttr(unref(busy)) ? " disabled" : ""}${_scopeId}>${ssrInterpolate(unref(questionForm).id ? "Save question" : "Add question")}</button></div></div></div></div>`);
					} else return [createVNode("div", { class: "grid gap-5 lg:grid-cols-2" }, [createVNode("div", null, [createVNode("div", { class: "mb-2 flex items-center justify-between" }, [createVNode("h3", { class: "text-xs font-bold uppercase tracking-wide text-gray-500" }, "Questions (" + toDisplayString(unref(questions).length) + ")", 1), createVNode("button", {
						type: "button",
						class: "btn-secondary !px-2.5 !py-1.5 text-xs",
						onClick: resetQuestion
					}, [createVNode(_component_BaseIcon, {
						name: "plus",
						size: 13
					}), createTextVNode(" New ")])]), unref(questionsLoading) ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-2"
					}, [(openBlock(), createBlock(Fragment, null, renderList$2(3, (i) => {
						return createVNode("div", {
							key: i,
							class: "h-16 animate-pulse rounded-xl bg-gray-100"
						});
					}), 64))])) : !unref(questions).length ? (openBlock(), createBlock(_component_EmptyState, {
						key: 1,
						icon: "list",
						title: "No questions yet",
						message: "Use the form to add the first question."
					})) : (openBlock(), createBlock("ul", {
						key: 2,
						class: "space-y-2"
					}, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(questions), (question) => {
						return openBlock(), createBlock("li", {
							key: question.id,
							class: "rounded-xl border border-gray-100 p-3"
						}, [
							createVNode("div", { class: "flex items-start justify-between gap-2" }, [createVNode("p", { class: "text-sm font-semibold text-gray-800" }, toDisplayString(question.question), 1), createVNode("div", { class: "flex shrink-0 items-center gap-0.5" }, [createVNode("button", {
								type: "button",
								class: "btn-ghost !p-1",
								"aria-label": "Edit question",
								onClick: ($event) => editQuestion(question)
							}, [createVNode(_component_BaseIcon, {
								name: "edit",
								size: 13
							})], 8, ["onClick"]), createVNode("button", {
								type: "button",
								class: "btn-ghost !p-1 text-rose-600",
								"aria-label": "Delete question",
								onClick: ($event) => removeQuestion(question)
							}, [createVNode(_component_BaseIcon, {
								name: "trash",
								size: 13
							})], 8, ["onClick"])])]),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, toDisplayString(questionTypeLabel(question.type)) + " · " + toDisplayString(question.marks) + " mark" + toDisplayString(question.marks === 1 ? "" : "s"), 1),
							createVNode("div", { class: "mt-1.5 flex flex-wrap gap-1" }, [(openBlock(true), createBlock(Fragment, null, renderList$2(question.options, (option) => {
								return openBlock(), createBlock("span", {
									key: option.id,
									class: ["badge", question.correct_answers?.map(String).includes(String(option.id)) ? "bg-emerald-50 text-emerald-700 ring-emerald-200" : "bg-gray-50 text-gray-600 ring-gray-200"]
								}, toDisplayString(option.text), 3);
							}), 128))])
						]);
					}), 128))]))]), createVNode("div", { class: "rounded-xl border border-gray-100 bg-gray-50/60 p-4" }, [createVNode("h3", { class: "mb-3 text-xs font-bold uppercase tracking-wide text-gray-500" }, toDisplayString(unref(questionForm).id ? "Edit question" : "Add question"), 1), createVNode("div", { class: "space-y-3" }, [
						createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "question-type"
						}, "Type"), withDirectives(createVNode("select", {
							id: "question-type",
							"onUpdate:modelValue": ($event) => unref(questionForm).type = $event,
							class: "field-input",
							onChange: onQuestionTypeChange
						}, [
							createVNode("option", { value: "single_choice" }, "Single choice"),
							createVNode("option", { value: "multiple_choice" }, "Multiple choice"),
							createVNode("option", { value: "true_false" }, "True / false")
						], 40, ["onUpdate:modelValue"]), [[vModelSelect, unref(questionForm).type]])]),
						createVNode("div", null, [
							createVNode("label", {
								class: "field-label",
								for: "question-text"
							}, "Question"),
							withDirectives(createVNode("textarea", {
								id: "question-text",
								"onUpdate:modelValue": ($event) => unref(questionForm).question = $event,
								rows: "2",
								class: "field-input"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(questionForm).question]]),
							unref(fieldError)("question") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("question")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", null, [
							createVNode("div", { class: "mb-1 flex items-center justify-between" }, [createVNode("span", { class: "field-label !mb-0" }, "Options"), unref(questionForm).type !== "true_false" ? (openBlock(), createBlock("button", {
								key: 0,
								type: "button",
								class: "text-[11px] font-semibold text-oc-primary hover:underline",
								onClick: addOption
							}, " + Add option ")) : createCommentVNode("", true)]),
							createVNode("div", { class: "space-y-2" }, [(openBlock(true), createBlock(Fragment, null, renderList$2(unref(questionForm).options, (option, index) => {
								return openBlock(), createBlock("div", {
									key: `${option.id}-${index}`,
									class: "flex items-center gap-2"
								}, [
									createVNode("input", {
										checked: unref(questionForm).correct.includes(option.id),
										type: unref(questionForm).type === "multiple_choice" ? "checkbox" : "radio",
										name: `correct-${unref(questionForm).id || "new"}`,
										class: "h-4 w-4 shrink-0 border-gray-300 text-oc-primary focus:ring-oc-primary",
										"aria-label": `Mark option ${option.id} correct`,
										onChange: ($event) => toggleCorrect(option.id)
									}, null, 40, [
										"checked",
										"type",
										"name",
										"aria-label",
										"onChange"
									]),
									withDirectives(createVNode("input", {
										"onUpdate:modelValue": ($event) => option.text = $event,
										type: "text",
										class: "field-input !py-1.5 text-xs",
										placeholder: `Option ${option.id.toUpperCase()}`
									}, null, 8, ["onUpdate:modelValue", "placeholder"]), [[vModelText, option.text]]),
									unref(questionForm).type !== "true_false" && unref(questionForm).options.length > 2 ? (openBlock(), createBlock("button", {
										key: 0,
										type: "button",
										class: "btn-ghost !p-1 text-rose-600",
										"aria-label": "Remove option",
										onClick: ($event) => removeOption(index)
									}, [createVNode(_component_BaseIcon, {
										name: "x",
										size: 13
									})], 8, ["onClick"])) : createCommentVNode("", true)
								]);
							}), 128))]),
							createVNode("p", { class: "mt-1 text-[11px] text-gray-400" }, "Tick the correct option" + toDisplayString(unref(questionForm).type === "multiple_choice" ? "s" : "") + ".", 1),
							unref(fieldError)("options") ? (openBlock(), createBlock("p", {
								key: 0,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("options")), 1)) : createCommentVNode("", true),
							unref(fieldError)("correct_answers") ? (openBlock(), createBlock("p", {
								key: 1,
								class: "field-error"
							}, toDisplayString(unref(fieldError)("correct_answers")), 1)) : createCommentVNode("", true)
						]),
						createVNode("div", { class: "grid grid-cols-2 gap-3" }, [createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "question-marks"
						}, "Marks"), withDirectives(createVNode("input", {
							id: "question-marks",
							"onUpdate:modelValue": ($event) => unref(questionForm).marks = $event,
							type: "number",
							min: "1",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(questionForm).marks,
							void 0,
							{ number: true }
						]])]), createVNode("div", null, [createVNode("label", {
							class: "field-label",
							for: "question-order"
						}, "Order"), withDirectives(createVNode("input", {
							id: "question-order",
							"onUpdate:modelValue": ($event) => unref(questionForm).sort_order = $event,
							type: "number",
							class: "field-input"
						}, null, 8, ["onUpdate:modelValue"]), [[
							vModelText,
							unref(questionForm).sort_order,
							void 0,
							{ number: true }
						]])])]),
						createVNode("div", { class: "flex justify-end gap-2 pt-1" }, [unref(questionForm).id ? (openBlock(), createBlock("button", {
							key: 0,
							type: "button",
							class: "btn-secondary !px-3 !py-2 text-xs",
							onClick: resetQuestion
						}, "Cancel edit")) : createCommentVNode("", true), createVNode("button", {
							type: "button",
							class: "btn-primary !px-3 !py-2 text-xs",
							disabled: unref(busy),
							onClick: saveQuestion
						}, toDisplayString(unref(questionForm).id ? "Save question" : "Add question"), 9, ["disabled"])])
					])])])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
// app/pages/admin/courses/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/courses/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-k6dMsTE_.mjs.map
