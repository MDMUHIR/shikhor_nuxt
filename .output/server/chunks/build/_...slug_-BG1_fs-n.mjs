import { i as createError$2 } from '../virtual/entry.mjs';
import { defineComponent, useSSRContext } from 'vue';
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
import 'vue/server-renderer';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import 'unhead/utils';

// app/pages/[...slug].vue?vue&type=script&setup=true&lang.ts
var ____slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[...slug]",
	__ssrInlineRender: true,
	setup(__props) {
		throw createError$2({
			statusCode: 404,
			statusMessage: "Page not found"
		});
	}
});
// app/pages/[...slug].vue
var _sfc_setup = ____slug__vue_vue_type_script_setup_true_lang_default.setup;
____slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ____slug__default = ____slug__vue_vue_type_script_setup_true_lang_default;

export { ____slug__default as default };
//# sourceMappingURL=_...slug_-BG1_fs-n.mjs.map
