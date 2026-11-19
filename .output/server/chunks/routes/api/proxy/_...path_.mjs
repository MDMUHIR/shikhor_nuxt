import { c as defineEventHandler, i as getRouterParam, e as createError, u as useRuntimeConfig, j as getQuery, g as getCookie, k as getRequestHeader, l as readRawBody, m as getRequestWebStream } from '../../../_/nitro.mjs';
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

const ____path_ = defineEventHandler(async (event) => {
  const pathParam = getRouterParam(event, "path") || "";
  const segments = pathParam.split("/").filter(Boolean);
  const allowedRoots = /* @__PURE__ */ new Set([
    "products",
    "categories",
    "banners",
    "delivery-charges",
    "blogs",
    "blog-categories",
    "blog-tags",
    "courses",
    "course-categories",
    "certificates",
    "cart",
    "wishlist",
    "verify-coupon",
    "orders",
    "my",
    "lessons",
    "quizzes",
    "quiz-attempts",
    "admin",
    "user",
    "logout",
    "login",
    "register"
  ]);
  if (!segments.length || !allowedRoots.has(segments[0])) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }
  const config = useRuntimeConfig(event);
  const base = String(config.apiUrl || "http://127.0.0.1:8000").replace(/\/+$/, "");
  const query = getQuery(event);
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) if (item !== void 0) search.append(key, String(item));
    } else if (value !== void 0) {
      search.append(key, String(value));
    }
  }
  const queryString = search.toString();
  const target = `${base}/api/${segments.join("/")}${queryString ? `?${queryString}` : ""}`;
  const method = event.method.toUpperCase();
  const outHeaders = { accept: "application/json" };
  const token = getCookie(event, "shikhor_token");
  if (token) outHeaders.authorization = `Bearer ${token}`;
  let body;
  if (method !== "GET" && method !== "HEAD") {
    const contentType = getRequestHeader(event, "content-type") || "";
    if (contentType) outHeaders["content-type"] = contentType;
    if (contentType.includes("application/json") || contentType.includes("text/plain")) {
      const raw = await readRawBody(event, "utf-8");
      body = raw != null ? raw : void 0;
    } else {
      const stream = getRequestWebStream(event);
      body = stream != null ? stream : void 0;
    }
  }
  let response;
  try {
    response = await fetch(target, {
      method,
      headers: outHeaders,
      body,
      // @ts-expect-error Node fetch supports streaming request bodies with duplex
      duplex: body ? "half" : void 0
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upstream API unavailable";
    throw createError({
      statusCode: 502,
      statusMessage: "Cannot reach the Laravel API",
      data: { message, target }
    });
  }
  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (["content-encoding", "content-length", "transfer-encoding", "connection", "set-cookie"].includes(key)) return;
    responseHeaders.set(key, value);
  });
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  });
});

export { ____path_ as default };
//# sourceMappingURL=_...path_.mjs.map
