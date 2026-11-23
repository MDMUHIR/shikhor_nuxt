import { d as defineNuxtRouteMiddleware, u as useAuth, e as executeAsync, n as navigateTo } from '../virtual/entry.mjs';
import 'nostics';
import 'nostics/formatters/ansi';
import 'vue';
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

// app/middleware/admin.ts
var admin_default = defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	const { fetchMe, isAuthenticated, isStaff } = useAuth();
	if (!isAuthenticated.value) [__temp, __restore] = executeAsync(() => fetchMe()), await __temp, __restore();
	if (!isAuthenticated.value) return navigateTo(`/login?next=${encodeURIComponent(to.fullPath)}`);
	if (!isStaff.value) return navigateTo("/?forbidden=admin");
});

export { admin_default as default };
//# sourceMappingURL=admin-C7_WPouN.mjs.map
