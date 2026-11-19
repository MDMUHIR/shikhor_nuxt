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
const register_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i;
  const body = await readBody(event);
  if (!(body == null ? void 0 : body.name) || !(body == null ? void 0 : body.email) || !(body == null ? void 0 : body.password)) {
    const errors = {};
    if (!(body == null ? void 0 : body.name)) errors.name = ["Name is required."];
    if (!(body == null ? void 0 : body.email)) errors.email = ["Email is required."];
    if (!(body == null ? void 0 : body.password)) errors.password = ["Password is required."];
    throw createError({
      statusCode: 422,
      statusMessage: "Please complete all required fields.",
      data: { message: "Please complete all required fields.", errors }
    });
  }
  const result = await laravelFetch(event, "register", {
    method: "POST",
    body: { name: body.name, email: body.email, password: body.password }
  });
  const payload = result.body || {};
  let token = (_a = payload.data) == null ? void 0 : _a.accessToken;
  if (result.status >= 400 || payload.status === false || payload.success === false) {
    const message = typeof payload.message === "string" && payload.message || (result.status === 422 ? "Please check your details." : "Registration failed.");
    throw createError({
      statusCode: result.status === 422 ? 422 : 400,
      statusMessage: message,
      data: { message, errors: payload.errors }
    });
  }
  if (!token) {
    const login = await laravelFetch(
      event,
      "login",
      { method: "POST", body: { email: body.email, password: body.password } }
    );
    token = (_c = (_b = login.body) == null ? void 0 : _b.data) == null ? void 0 : _c.accessToken;
    if (!token) {
      throw createError({
        statusCode: 502,
        statusMessage: "Account created, but automatic sign in failed. Please log in.",
        data: { message: "Account created, but automatic sign in failed. Please log in." }
      });
    }
    setCookie(event, COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE
    });
    return {
      user: {
        name: (_e = (_d = login.body) == null ? void 0 : _d.data) == null ? void 0 : _e.name,
        email: (_g = (_f = login.body) == null ? void 0 : _f.data) == null ? void 0 : _g.email,
        type: (_i = (_h = login.body) == null ? void 0 : _h.data) == null ? void 0 : _i.type
      }
    };
  }
  setCookie(event, COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE
  });
  const me = await laravelFetch(
    event,
    "user",
    { token }
  );
  return {
    user: me.body ? { id: me.body.id, name: me.body.name, email: me.body.email, type: me.body.type } : { name: body.name, email: body.email, type: "customer" }
  };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
