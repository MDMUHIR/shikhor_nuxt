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

const me_get = defineEventHandler(async (event) => {
  var _a, _b;
  const token = getCookie(event, "shikhor_token");
  if (!token) {
    return { user: null };
  }
  const result = await laravelFetch(event, "user", { token });
  if (result.status >= 400 || !result.body || typeof result.body !== "object") {
    deleteCookie(event, "shikhor_token", { path: "/" });
    return { user: null };
  }
  return {
    user: {
      id: result.body.id,
      name: result.body.name,
      email: result.body.email,
      type: result.body.type,
      avatar: (_a = result.body.avatar) != null ? _a : null,
      created_at: (_b = result.body.created_at) != null ? _b : null
    }
  };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
