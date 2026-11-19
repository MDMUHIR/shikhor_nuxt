import { c as defineEventHandler, g as getCookie, h as deleteCookie } from '../../../_/nitro.mjs';
import { l as laravelFetch } from '../../../_/laravel.mjs';
import 'unhead/server';
import 'vue';
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

const logout_post = defineEventHandler(async (event) => {
  const token = getCookie(event, "shikhor_token");
  if (token) {
    try {
      await laravelFetch(event, "logout", { token });
    } catch {
    }
  }
  deleteCookie(event, "shikhor_token", { path: "/" });
  return { ok: true };
});

export { logout_post as default };
//# sourceMappingURL=logout.post.mjs.map
