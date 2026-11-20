import { g as getCookie, i as getRequestProtocol, u as useRuntimeConfig } from './nitro.mjs';

function baseUrl(event) {
  const config = useRuntimeConfig(event);
  return String(config.apiUrl || "http://127.0.0.1:8000").replace(/\/+$/, "");
}
async function laravelFetch(event, path, options = {}) {
  var _a;
  const method = options.method || "GET";
  const headers = {
    accept: "application/json",
    ...options.headers || {}
  };
  const token = (_a = options.token) != null ? _a : getCookie(event, "shikhor_token");
  if (token) headers.authorization = `Bearer ${token}`;
  let body;
  if (options.body !== void 0 && method !== "GET" && method !== "HEAD") {
    headers["content-type"] = "application/json";
    body = JSON.stringify(options.body);
  }
  const url = `${baseUrl(event)}/api/${path.replace(/^\/+/, "")}`;
  const response = await fetch(url, { method, headers, body });
  const contentType = response.headers.get("content-type");
  const text = await response.text();
  let parsed = null;
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }
  return {
    status: response.status,
    ok: response.ok,
    body: parsed,
    contentType
  };
}
function isSecureRequest(event) {
  return getRequestProtocol(event, { xForwardedProto: true }) === "https";
}

export { isSecureRequest as i, laravelFetch as l };
//# sourceMappingURL=laravel.mjs.map
