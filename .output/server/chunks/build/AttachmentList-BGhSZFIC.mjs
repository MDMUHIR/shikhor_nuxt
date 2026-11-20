import { s as ssrRenderList$2, B as BaseIcon_default } from '../virtual/entry.mjs';
import { u as useToast } from './useToast-BG2fH8c_.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';

// app/components/AttachmentList.vue?vue&type=script&setup=true&lang.ts
var AttachmentList_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AttachmentList",
	__ssrInlineRender: true,
	props: {
		items: {},
		lockedHint: {}
	},
	setup(__props) {
		useToast();
		const busyId = ref(null);
		const badge = {
			pdf: {
				label: "PDF",
				cls: "bg-rose-50 text-rose-600"
			},
			slides: {
				label: "PPT",
				cls: "bg-orange-50 text-orange-600"
			},
			image: {
				label: "IMG",
				cls: "bg-emerald-50 text-emerald-600"
			},
			document: {
				label: "DOC",
				cls: "bg-blue-50 text-blue-600"
			},
			spreadsheet: {
				label: "XLS",
				cls: "bg-green-50 text-green-700"
			},
			archive: {
				label: "ZIP",
				cls: "bg-amber-50 text-amber-700"
			},
			link: {
				label: "LINK",
				cls: "bg-violet-50 text-violet-600"
			},
			file: {
				label: "FILE",
				cls: "bg-gray-100 text-gray-600"
			}
		};
		function sizeLabel(bytes) {
			if (!bytes) return "";
			if (bytes >= 1048576) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
			return `${Math.max(1, Math.round(bytes / 1024))} KB`;
		}
		return (_ctx, _push, _parent, _attrs) => {
			const _component_BaseIcon = BaseIcon_default;
			_push(`<ul${ssrRenderAttrs(mergeProps({ class: "divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-100" }, _attrs))}><!--[-->`);
			ssrRenderList$2(__props.items, (item) => {
				_push(`<li class="flex items-center gap-3 bg-white px-4 py-3"><span class="${ssrRenderClass([(badge[item.kind] ?? badge.file).cls, "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[10px] font-extrabold"])}">${ssrInterpolate((badge[item.kind] ?? badge.file).label)}</span><div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold text-gray-800">${ssrInterpolate(item.title)}</p><p class="truncate text-[11px] text-gray-400">`);
				if (item.lesson) _push(`<!--[-->${ssrInterpolate(item.lesson.title)} · <!--]-->`);
				else _push(`<!---->`);
				_push(`${ssrInterpolate(sizeLabel(item.size) || (item.kind === "link" ? "External link" : ""))}</p></div>`);
				if (item.locked) {
					_push(`<span class="flex items-center gap-1 text-[11px] font-semibold text-gray-400">`);
					_push(ssrRenderComponent(_component_BaseIcon, {
						name: "lock",
						size: 14
					}, null, _parent));
					_push(` ${ssrInterpolate(__props.lockedHint || "Enroll to access")}</span>`);
				} else {
					_push(`<!--[-->`);
					if (item.external_url) {
						_push(`<a${ssrRenderAttr("href", item.external_url)} target="_blank" rel="noopener noreferrer" class="btn-secondary !px-3 !py-1.5 text-xs">`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "external-link",
							size: 14
						}, null, _parent));
						_push(` Open </a>`);
					} else {
						_push(`<!--[-->`);
						if (item.kind === "pdf" || item.kind === "image") _push(`<button type="button" class="btn-ghost !px-2.5 !py-1.5 text-xs"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""}> View </button>`);
						else _push(`<!---->`);
						_push(`<button type="button" class="btn-secondary !px-3 !py-1.5 text-xs"${ssrIncludeBooleanAttr(unref(busyId) === item.id) ? " disabled" : ""}>`);
						_push(ssrRenderComponent(_component_BaseIcon, {
							name: "download",
							size: 14
						}, null, _parent));
						_push(` ${ssrInterpolate(unref(busyId) === item.id ? "…" : "Download")}</button><!--]-->`);
					}
					_push(`<!--]-->`);
				}
				_push(`</li>`);
			});
			_push(`<!--]--></ul>`);
		};
	}
});
// app/components/AttachmentList.vue
var _sfc_setup = AttachmentList_vue_vue_type_script_setup_true_lang_default.setup;
AttachmentList_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AttachmentList.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AttachmentList_default = Object.assign(AttachmentList_vue_vue_type_script_setup_true_lang_default, { __name: "AttachmentList" });

export { AttachmentList_default as A };
//# sourceMappingURL=AttachmentList-BGhSZFIC.mjs.map
