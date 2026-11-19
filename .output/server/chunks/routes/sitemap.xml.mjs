import { c as defineEventHandler, u as useRuntimeConfig, n as setHeader } from '../_/nitro.mjs';
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

const sitemap_xml = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const config = useRuntimeConfig(event);
  const base = String(config.apiUrl || "http://127.0.0.1:8000").replace(/\/+$/, "");
  const site = String(config.public.siteUrl || "http://localhost:3000").replace(/\/+$/, "");
  const staticPaths = [
    { path: "/", changefreq: "daily", priority: "1.0" },
    { path: "/courses", changefreq: "daily", priority: "0.9" },
    { path: "/store", changefreq: "daily", priority: "0.8" },
    { path: "/blog", changefreq: "daily", priority: "0.8" },
    { path: "/reviews", changefreq: "weekly", priority: "0.5" },
    { path: "/instructors", changefreq: "monthly", priority: "0.4" },
    { path: "/certificates/verify", changefreq: "monthly", priority: "0.3" },
    { path: "/login", changefreq: "yearly", priority: "0.2" },
    { path: "/register", changefreq: "yearly", priority: "0.2" }
  ];
  let courses = [];
  let blogs = [];
  try {
    const [coursesResponse, blogsResponse] = await Promise.all([
      $fetch(`${base}/api/courses`, { query: { per_page: 100 } }),
      $fetch(`${base}/api/blogs`, { query: { per_page: 100 } })
    ]);
    courses = (_b = (_a = coursesResponse == null ? void 0 : coursesResponse.data) == null ? void 0 : _a.data) != null ? _b : [];
    blogs = (_c = blogsResponse == null ? void 0 : blogsResponse.blogs) != null ? _c : [];
  } catch {
  }
  const urls = [];
  for (const item of staticPaths) {
    urls.push(
      `<url><loc>${site}${item.path}</loc><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`
    );
  }
  for (const course of courses) {
    const lastmod = course.updated_at ? `<lastmod>${new Date(course.updated_at).toISOString()}</lastmod>` : "";
    urls.push(`<url><loc>${site}/courses/${encodeURIComponent(course.slug)}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.7</priority></url>`);
  }
  for (const blog of blogs) {
    const lastmod = blog.published_at ? `<lastmod>${new Date(blog.published_at).toISOString()}</lastmod>` : "";
    urls.push(`<url><loc>${site}/blog/${blog.id}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.5</priority></url>`);
  }
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  setHeader(event, "cache-control", "public, max-age=3600");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
