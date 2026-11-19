import { c as defineEventHandler, r as readBody, e as createError, f as setCookie } from '../../../_/nitro.mjs';
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

const COOKIE = "shikhor_token";
const MAX_AGE = 60 * 60 * 24 * 30;
function setAuthCookie(event, token) {
  setCookie(event, COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE
  });
}
const login_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.email) || !(body == null ? void 0 : body.password)) {
    throw createError({
      statusCode: 422,
      statusMessage: "Email and password are required.",
      data: { message: "Email and password are required.", errors: { email: ["Email is required."] } }
    });
  }
  const result = await laravelFetch(event, "login", {
    method: "POST",
    body: { email: body.email, password: body.password }
  });
  const payload = result.body || {};
  if (result.status >= 400 || payload.status === false || payload.success === false || !((_a = payload.data) == null ? void 0 : _a.accessToken)) {
    const message = typeof payload.message === "string" && payload.message || (result.status === 422 ? "Please check your details." : "Invalid email or password.");
    throw createError({
      statusCode: result.status === 422 ? 422 : 401,
      statusMessage: message,
      data: { message, errors: payload.errors }
    });
  }
  setAuthCookie(event, payload.data.accessToken);
  return {
    user: {
      name: payload.data.name,
      email: payload.data.email,
      type: payload.data.type
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
