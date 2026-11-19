# PROMPT — Rebuild SHIKHOR as a Nuxt frontend wired to the Laravel API

> Copy everything below into your coding agent (Claude Code, Codex, Cursor, etc.).
> It is written to be self-contained; the agent should inspect both repos before editing anything.

---

## 0. Your mission

You are a senior full-stack engineer. Rebuild the SHIKHOR learning-platform frontend as a **Nuxt 4 (Vue 3) application** application and wire it **completely** to the existing Laravel API at `C:\Users\mdmuhir\Desktop\laravel-api`.

The current frontend lives at `C:\Users\mdmuhir\Desktop\shikhor-next`. It is **not actually Nuxt** today: it is a Vite 6 + React 19 + `react-router-dom` 7 SPA (`package.json` name `react-example`) that renders **hard-coded mock data** from `src/data/*`. It has no API client, no auth persistence against the backend, no cart, no checkout, no order history, no wishlist, no quizzes wired to the API, no certificates, and no blog pages.

Your job:

1. Convert/rebuild it into a real **Nuxt 4 (Vue 3, TypeScript)** app in the same repository (preserve branding, layout, Tailwind design tokens, and reusable components by porting them).
2. Replace **every mock-data source** used by customer-facing or admin functionality with live API data.
3. Add all **missing pages and flows** listed in §8.
4. Deliver a working, tested, production-shaped app — not a prototype.

Do not stop at scaffolding. This task is complete only when a real student can register, buy a course and a product, learn, take a quiz, review, earn/download a certificate, and an admin can manage all of that against the live Laravel API.

---

## 1. Repos, services, and paths

| Thing | Location |
| --- | --- |
| Backend (source of truth) | `C:\Users\mdmuhir\Desktop\laravel-api` |
| Backend API docs | `COURSES-API.md` (accurate) and `API.md` (stale route dump — ignore for shapes) |
| Frontend to rebuild | `C:\Users\mdmuhir\Desktop\shikhor-next` |
| Existing routes (react-router) | `src/App.tsx` |
| Existing global state / mock data | `src/context/AppContext.tsx`, `src/data/*`, `src/types.ts` |
| Existing pages | `src/pages/*` |
| Existing components | `src/components/*` |
| Static assets / branding | `public/*` (`shikhor academy poster*.png`, payment banner, etc.) |

Backend runtime facts:

- Laravel **13.42**, PHP **8.3+**, API-only under `/api`.
- Run it locally: `cd C:\Users\mdmuhir\Desktop\laravel-api && php artisan serve` → `http://127.0.0.1:8000`.
- Seeded demo users: `admin@gmail.com` / `admin` (type `admin`) and `customer@gmail.com` / `customer` (type `customer`).
- Auth is **Laravel Sanctum bearer tokens** (not cookie-session SPA auth). Login returns `data.accessToken`.
- CORS allowed origins already include `http://localhost:3000` and `http://127.0.0.1:3000` (`config/cors.php` / `.env`). If you need another origin, update `CORS_ALLOWED_ORIGINS` — do not weaken CORS to `*`.
- Rate limits: `auth` 5/min/IP, `sensitive` 10/min/user, `cart` 120/min/user, global `api` 60/min.

Before writing code, read these backend files to confirm request/response shapes:

- `routes/api.php`
- `app/Http/Controllers/{Auth,Cart,CourseCart,Order,WishList,Coupon,Product,Category,Blog,Banner,DeliveryCharge}Controller.php`
- `app/Http/Controllers/{Course,CourseSection,Lesson,Enrollment,CourseReview,Quiz,Certificate}Controller.php`
- `app/Services/CourseFormatter.php`
- `COURSES-API.md`

**Never invent an endpoint.** If a feature has no API, follow §10 (Known backend gaps).

---

## 2. Target stack and project setup

Use the latest stable at implementation time:

- **Latest stable Nuxt 4** (Vue 3, TypeScript `strict: true`); use Nuxt's file-based routing, SSR, and Nitro server.
- **Tailwind CSS v4** using a Nuxt-compatible setup (prefer `@tailwindcss/vite` with Nuxt's Vite integration, or the official Nuxt module if it is stable/compatible), preserving the current palette, fonts (`Plus Jakarta Sans`, `Hind Siliguri`), radial background, and component look from `src/index.css`.
- `lucide-vue-next` icons; use Vue-compatible motion (such as `motion-v`) only if needed to preserve existing animations.
- Data fetching: Nuxt `$fetch`/`ofetch` + typed API client and `useFetch`/`useAsyncData` for SSR-safe public data. Use Pinia or Nuxt composables (`useState`) for auth/cart UI state; no unnecessary global store.
- Forms: VeeValidate + Zod (or Vue-native equivalent typed validation). Toast system of your choice (small, accessible).
- Tests: Playwright (public + purchase + learn + admin smoke), `vue-tsc --noEmit` + ESLint.

Repository layout to produce:

```
shikhor-next/
├── app/
│   ├── (marketing)/            # public pages with shared Navbar/Footer
│   ├── (auth)/login|register/
│   ├── (student)/              # my-courses, learn, quizzes, certificates, profile, orders, wishlist, cart, checkout
│   ├── admin/                  # admin layout + pages, guarded
│   ├── api/                    # Next route handlers (BFF proxy + auth + upload)
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   └── error.tsx
├── src/ (or lib/)
│   ├── components/             # ported + new UI
│   ├── lib/api/                # typed client, endpoints, errors
│   ├── lib/types.ts            # API-facing types
│   ├── lib/format.ts           # money, dates (bn-BD/en), media URLs
│   ├── lib/auth.ts             # server-side session helpers
│   └── content/                # ONLY static marketing copy (clearly separated)
├── public/
├── tests/e2e/
├── .env.example
├── nuxt.config.ts
└── package.json
```

Migration mechanics:

- Keep `public/` assets and `src/index.css` styling; port reusable components to Vue SFCs (`.vue`) rather than rewriting their markup from scratch.
- Remove `index.html`, `vite.config.ts`, `src/main.tsx`, `src/App.tsx` router, and obsolete Vite lock/config files only after the Nuxt app runs.
- Do **not** delete `public/` assets or the `.git` history.
- Use Nuxt's `~/` and `@/` aliases consistently.

`.env.example`:

```dotenv
# Laravel API origin (no trailing slash; server-only)
API_URL=http://127.0.0.1:8000
# Used to prefix relative image paths like "images/courses/foo.jpg"
NUXT_PUBLIC_MEDIA_URL=http://127.0.0.1:8000
# Optional public site URL
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 3. Architecture: secure BFF + typed client

Implement this exact pattern using Nitro server routes; it avoids CORS in the browser and keeps the Sanctum token out of `localStorage`. Use Nuxt server route conventions (`server/api/...`) and ensure cookie access is server-side via `getCookie`/`setCookie`/`deleteCookie`.

### 3.1 Nitro auth endpoints (httpOnly cookie)

- `POST /api/auth/login` (Nitro endpoint) → forwards `{email,password}` to Laravel `/api/login`; on `status:true`, sets `shikhor_token` (httpOnly, secure in prod, sameSite=lax, 30 days, path=/) and returns `{ user: { name, email, type } }`.
- `POST /api/auth/register` (Nitro endpoint) → Laravel `/api/register`; then either log in automatically (call `/api/login`) or return a “please log in” result. Return clear validation errors.
- `POST /api/auth/logout` (Nitro endpoint) → calls Laravel `/api/logout` with the token, then clears the cookie.
- `GET /api/auth/me` (Nitro endpoint) → calls Laravel `/api/user`, returns the user or `null`.

Laravel quirks:

- `register` success returns only `data.accessToken` (no user object).
- `login` returns `data.{name,email,type,accessToken,token_type}`.
- `GET /api/user` returns the raw user model (id, name, email, type, …).
- All app-level failures return **HTTP 200** with `{ "status": false, "message": "…" }`. Your helper must treat `status === false` as an error.

### 3.2 Generic authenticated proxy

Create Nitro route `server/api/proxy/[...path].ts` supporting `GET POST PUT PATCH DELETE`:

- Forwards to `${API_URL}/api/${path.join('/')}${query}`.
- Adds `Authorization: Bearer <shikhor_token>` when the cookie exists, plus `Accept: application/json`.
- Forwards JSON bodies as-is.
- For `multipart/form-data` (admin uploads), **stream** the incoming body: `fetch(url, { method, headers: { Authorization, Accept, 'Content-Type': req.headers.get('content-type') }, body: req.body, duplex: 'half' })`. Do not buffer 500 MB videos into memory.
- Returns Laravel’s status code and JSON unmodified.
- No open-proxy risk: restrict to a known path allowlist (courses, cart, orders, my, lessons, quizzes, certificates, admin, wishlist, coupon, user, logout) or simply never forward absolute URLs — path segments only.

Typed API helpers (`composables/useApi.ts` and/or `utils/api.ts`):

```ts
// publicFetch: server-side $fetch/ofetch to Laravel; use Nuxt useAsyncData/useFetch
// for SSR hydration and cache/revalidation where appropriate.
// apiFetch: browser calls /api/proxy/...; throws ApiError on HTTP >= 400
//            OR body.status === false; exposes message + field errors (422 `errors`)
// mediaUrl(relativePath): prefixes NUXT_PUBLIC_MEDIA_URL; returns placeholder on null
```

Cancellation, retries for 429 (`Retry-After`), and optimistic UI for cart toggles are expected.

### 3.3 SSR vs client-side interactivity

- Public catalog/detail/blog/store pages: **SSR pages** using `useAsyncData`/`useFetch` or server-side API helpers with appropriate cache/revalidation (courses 60s, course detail 60s, blogs 120s) + `useSeoMeta`/`definePageMeta`.
- Personalized pages (`my-courses`, `learn`, `cart`, `checkout`, `orders`, `admin`): SSR or client-side Nuxt pages/composables that read the httpOnly cookie server-side or call the same-origin BFF. Never cache personalized responses.
- Route protection: Nuxt route middleware (e.g. `middleware/admin.ts` and `middleware/auth.ts`) redirects non-admins and unauthenticated users to `/login?next=…`. Admin check is `user.type === 'admin'`.
- Do not rely on hidden UI for security — every admin mutation still requires the backend token (it does).

---

## 4. API contract and quirks (memorize these)

| Topic | Detail |
| --- | --- |
| Envelope | `{ status: boolean, message: string, data: any }`. `status:false` = app error even with HTTP 200. |
| Validation errors | HTTP 422, `{ message, errors: { field: [msg] } }`. |
| Pagination | Laravel paginator at `data`: `data.data[]`, `current_page`, `last_page`, `per_page`, `total`. |
| Course reviews | `data.summary`, `data.reviews.data[]` (paginator nested one level deeper). |
| Blogs | Root-level `{ status, blogs: [], pagination: {...} }` — **not** inside `data`. |
| Admin users list | Uses `{ success: true, data }` — handle both envelope keys. |
| Money | Decimal strings/nullable; format as BDT (`Intl.NumberFormat('en-BD', { style:'currency', currency:'BDT' })`), ৳ symbol acceptable. Compute totals from the **order response**, never trust client math. |
| Images | Relative paths like `images/courses/foo.jpg`, `images/...`. Always `mediaUrl()`. Use `mediaUrl()` for images; optionally configure `@nuxt/image` for remote API images if it works reliably with the API host. |
| Auth user types | `admin` and `customer` only. No instructor role. |
| Soft deletes | Courses are soft-deleted; admin lists show active records only. |
| Course access | Time-limited (`access_days`), `0` = lifetime. Enrollment may be `active|expired|revoked`. Always show expiry/remaining days. |
| Videos | External (`video.url`) or uploaded (`video.stream_url`, signed, expires in 60 min). Detect YouTube/Vimeo/HLS/MP4 for correct player. Never cache/prefetch signed URLs. |
| Certificates PDF | Requires `Authorization` header → download via proxy, `blob()` + object URL; a plain `<a href>` will fail. |
| Payments | **No gateway is integrated.** `payment_method` is a free string (e.g. `cash_on_delivery`, `bank_transfer`, `bkash_manual`). Admin marks `payment_status = paid`. Do not fake a bKash/Nagad gateway. |

---

## 5. Full endpoint inventory

### 5.1 Public

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/products` | All products (no pagination), with `category`, `images`, `variants.images`, `variants.attributes` |
| GET | `/api/products/search` | `q` or `search`, `per_page`, `page`; paginated |
| GET | `/api/products/{idOrSlug}` | Single product |
| GET | `/api/categories` | Product categories |
| GET | `/api/banners?active_only=1` | Home banners |
| GET | `/api/delivery-charges` | District delivery charges |
| GET | `/api/blogs` | `search`, `tag`, `per_page`, `page`; root-level `blogs` + `pagination` |
| GET | `/api/blogs/{id}` | Blog detail (`?increment_views=1`) |
| GET | `/api/blog-categories`, `/api/blog-tags` | |
| GET | `/api/courses` | `search`, `category` (slug or id), `level`, `featured`, `sort` (`latest/price_asc/price_desc/rating/popular`), `per_page`, `page` |
| GET | `/api/courses/{slug}` | Detail + `sections[].lessons[]`, `quizzes[]`, `reviews_summary` |
| GET | `/api/courses/{slug}/reviews` | `per_page`, `rating` |
| GET | `/api/course-categories` | Active categories + `courses_count` |
| GET | `/api/certificates/verify/{number}` | Public verification |
| GET | `/api/lessons/{lesson}/stream` | Signed URL only; generated by course payloads |

### 5.2 Auth

| Method | Path | Body |
| --- | --- | --- |
| POST | `/api/register` | `name`, `email`, `password` |
| POST | `/api/login` | `email`, `password` |
| GET | `/api/user` | – (auth) |
| GET | `/api/logout` | – (auth) |
| GET | `/api/auth/google` / `/api/auth/google/callback` | Optional OAuth; web-session based, may skip |

### 5.3 Student — commerce

| Method | Path | Body |
| --- | --- | --- |
| GET | `/api/cart` | Product cart (raw models) |
| POST | `/api/cart/add` | `items: [{product_id, variant_id?, quantity}]` **or** `product_id`, `variant_id?`, `quantity` |
| POST | `/api/cart/update` | `cart_id`, `quantity` |
| DELETE | `/api/cart/delete/{id}` | – |
| POST | `/api/cart/toggle-selection` | `cart_id`, `is_selected` (bool) |
| POST | `/api/cart/select-all`, `/api/cart/deselect-all` | – |
| GET | `/api/cart/courses` | Course cart + subtotal |
| POST | `/api/cart/courses/add` | `course_id` **or** `course_ids[]` |
| POST | `/api/cart/courses/toggle-selection` | `id` |
| POST | `/api/cart/courses/select-all`, `/api/cart/courses/deselect-all` | – |
| DELETE | `/api/cart/courses/delete/{id}` | – |
| GET | `/api/wishlist` | |
| POST | `/api/wishlist/add` | `product_id`, `variant_id?` |
| DELETE | `/api/wishlist/delete/{id}` | – |
| POST | `/api/verify-coupon` | `code` → coupon `{ code, type, discount }` |
| GET | `/api/orders` | Current user's orders (with items, course_items, status history) |
| POST | `/api/orders/add` | Cart checkout (see §6.3) |
| POST | `/api/orders/direct` | `items[]` and/or `course_ids[]` + `payment_method` |

### 5.4 Student — learning

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/my/courses` | Enrollments + course + progress |
| GET | `/api/my/courses/{slug}` | Enrollment detail + progress + certificate |
| GET | `/api/my/courses/{slug}/learn` | Full curriculum with unlocked content |
| GET | `/api/lessons/{id}` | Single lesson (403-style app error if locked) |
| POST | `/api/lessons/{id}/complete` | |
| POST | `/api/lessons/{id}/incomplete` | |
| POST | `/api/lessons/{id}/progress` | `position_seconds` (auto-completes near end) |
| GET | `/api/courses/{slug}/reviews/mine` | |
| POST | `/api/courses/{slug}/reviews` | `rating` 1–5, `title?`, `comment?` |
| DELETE | `/api/courses/{slug}/reviews` | |
| GET | `/api/quizzes/{id}` | Questions without answers + attempts info |
| POST | `/api/quizzes/{id}/submit` | `answers: { [questionId]: ["a"] }` |
| GET | `/api/quizzes/{id}/attempts` | |
| GET | `/api/quiz-attempts/{id}` | |
| POST | `/api/courses/{slug}/certificate` | Issue (requires 100% lessons) |
| GET | `/api/my/certificates` | |
| GET | `/api/certificates/{number}` | Owner only |
| GET | `/api/certificates/{number}/download` | PDF; requires auth header |

### 5.5 Admin (`/api/admin/*`, requires `type === 'admin'`)

| Area | Endpoints |
| --- | --- |
| Course categories | `GET course-categories`, `POST course-categories/add`, `POST course-categories/update`, `DELETE course-categories/delete/{id}` |
| Courses | `GET courses` (search/status/category_id), `GET courses/{id}`, `POST courses/add`, `POST courses/update`, `DELETE courses/delete/{id}` |
| Sections | `GET courses/{courseId}/sections`, `POST course-sections/add|update|reorder`, `DELETE course-sections/delete/{id}` |
| Lessons | `GET courses/{courseId}/lessons`, `GET lessons/{id}`, `POST lessons/add|update|reorder`, `DELETE lessons/delete/{id}` (multipart for video upload) |
| Enrollments | `GET enrollments`, `POST enrollments/grant|extend|revoke/{id}|reactivate/{id}` |
| Reviews | `GET reviews`, `POST reviews/{id}/approve|reject`, `DELETE reviews/delete/{id}` |
| Quizzes | `GET quizzes`, `GET quizzes/{id}`, `POST quizzes/add|update`, `DELETE quizzes/delete/{id}`, `POST quiz-questions/add|update`, `DELETE quiz-questions/delete/{id}` |
| Certificates | `GET certificates`, `POST certificates/revoke/{id}|restore/{id}` |
| Orders | `GET orders`, `GET orders/{id}`, `POST orders/update` (`status`, `payment_status`, `notes`, `delivery_charge`, `shipping_method`, `products[].pivot.quantity`, `status_note`) |
| Products | `GET products/{slug}` (admin detail), `POST products/add|update`, `DELETE products/delete/{id}`, variant/image endpoints (see `routes/api.php`) |
| Product categories | `POST categories/add`, `DELETE categories/delete/{id}` |
| Coupons | `GET coupon`, `POST coupon/add|update`, `DELETE coupon/delete/{id}` |
| Blogs | `GET blogs`, `POST blogs/add|update`, `DELETE blogs/delete/{id}`, blog-categories/tags add/update/delete |
| Banners | `GET banners`, `POST banners/add|update`, `DELETE banners/delete/{id}` |
| Delivery charges | `GET delivery-charges`, `POST delivery-charges/add|update`, `DELETE delivery-charges/delete/{id}` |
| Users | `GET users`, `POST users/add|update`, `DELETE users/delete/{id}` |

Confirm every body field by reading the controller before building the form.

---

## 6. Required behaviour in detail

### 6.1 Catalog and course detail

- Home: active banners, course categories, featured/popular courses, latest blogs, store highlights, approved testimonials (from course reviews of featured courses; cap at 6 courses).
- `/courses`: server-rendered filter/search/sort/pagination; filters must be URL state (`?search=&category=&level=&sort=&page=`), shareable and back-button safe.
- `/courses/[slug]`: thumbnail, promo video, rating summary, outcomes, requirements, curriculum with locked lessons, quizzes list, reviews (paginated + rating breakdown), sticky purchase card showing price/offer/discount/access duration, “Add to cart” and “Buy now”.
- If already enrolled: replace purchase CTA with “Continue learning”.
- Lesson list must show lock icons, lesson type (video/text/quiz), duration, preview badge.

### 6.2 Cart (new page)

Single `/cart` page with two sections, physical products and courses:

- Product rows: image, name, variant attributes, unit price, quantity stepper (`cart/update` with `cart_id`), remove, per-row checkbox (`cart/toggle-selection` with `cart_id`), select/deselect all.
- Course rows: thumbnail, title, access duration, price, remove (`cart/courses/delete/{id}`), checkbox (`cart/courses/toggle-selection` with `id`).
- Coupon field (`verify-coupon`); show discount preview (`percentage` vs fixed).
- Totals come from the same math the backend uses (selected products + selected courses − discount), but the authoritative total is the order response.
- Empty state with links to `/courses` and `/store`.

### 6.3 Checkout (new page)

`/checkout` collects:

```json
{
  "customer": { "name": "", "email": "", "phone": "", "phone_alt": "" },
  "shipping_address": { "line1": "", "line2": "", "district": "", "city": "", "country": "Bangladesh" },
  "payment_method": "cash_on_delivery",
  "pricing": { "currency": "BDT", "delivery_charge": 0, "discount_type": "fixed|percentage", "discount": 0, "coupon_code": "" },
  "shipping": { "method": "standard", "estimated_delivery_days": 3 },
  "notes": ""
}
```

- District dropdown from `/api/delivery-charges`; delivery charge updates from the selected district (course-only orders should not be charged delivery — confirm backend behaviour and, if needed, send `delivery_charge: 0` and explain in UI).
- If only courses are in the cart, hide the address/shipping step but still send minimal customer info.
- Must be a real form with validation (phone format, required fields), order summary, coupon re-validation.
- On success: clear cart state, redirect to `/orders/[id]?placed=1`, show order number and next steps (“Your course access is active — start learning”, or “We will confirm your payment”).
- Handle backend errors visibly (stock, unavailable course, coupon invalid).

### 6.4 Orders (new pages)

- `/orders`: list with order number, date, status badge, payment status, total, item count, links.
- `/orders/[id]`: physical items (with variant attributes/stock snapshot), course items (with access days), pricing breakdown (`products_subtotal`, `courses_subtotal`, `discount`, `delivery_charge`, `total`), shipping address, status timeline from `status_history`, and “Continue learning” links for course items.
- Cancelled/refunded orders must show that course access was revoked.

### 6.5 Learning experience

- `/my-courses`: grid/list of enrolled courses with progress bar, remaining days (or “Lifetime”), resume button, certificate badge when complete, filter by `active`/`expired`/`revoked`.
- `/learn/[slug]`: the core product.
  - Left: curriculum sidebar grouped by section; completed checkmarks; current lesson highlight; locked state.
  - Main: video player (external URL/iframe or signed `<video>`), text content (sanitized HTML), or quiz launcher.
  - Progress: “Mark complete”, “Mark incomplete”, and throttled `position_seconds` updates (e.g. every 15–30s and on pause/unload). Respect `last_position_seconds` on resume.
  - Next/previous lesson navigation; expiry banner when ≤7 days remain; expired state with renewal CTA (add to cart again is blocked while active but allowed after expiry — verify).
  - Quiz lesson: “Start quiz”, attempts remaining, pass mark.
  - Certificate CTA appears at 100%; on success, link to `/certificates`.
- Signed stream URLs expire in 60 minutes: on video error/403, refetch the lesson and swap the URL. Support `Range` (Laravel streams files) and do not preload the whole file.
- Sanitize any HTML lesson content (`content`) before rendering.

### 6.6 Quizzes (replace mock exams)

- `/quizzes/[id]`: fetch quiz, render questions (single choice, multiple choice, true/false), timer based on `time_limit_minutes` if present, one submission, confirm before submit.
- `/quizzes/[id]/result/[attemptId]`: score, percentage, pass/fail, per-question review using the submit response (`review[].is_correct`, `correct_answers`), attempts remaining, retry when allowed.
- Show attempts history from `/api/quizzes/{id}/attempts`.
- The old mock “Exams”, “Leaderboard”, and “Result Lookup” pages have **no backend** — see §10.

### 6.7 Reviews

- Course detail: list + rating breakdown; “Write a review” visible only when enrolled; edit/delete own review (`reviews/mine`); optimistic refresh of summary.
- Admin review moderation: filter by course/status/rating, approve/reject/delete.

### 6.8 Certificates

- `/certificates`: list with course, number, issue date, status, download button.
- `/certificates/verify` + `/certificates/verify/[number]`: public verification form/result; show valid/revoked clearly.
- Download: `fetch('/api/proxy/certificates/{number}/download')` → blob → temporary anchor. Handle 403/404.
- Course learn page: “Get certificate” when `progress.is_complete` and no certificate yet; then show number + download.

### 6.9 Auth UX

- `/login` and `/register` pages (keep the existing modal as a wrapper if desired, but direct URLs must work and support `?next=` redirects).
- Persist session via httpOnly cookie; A global auth composable/store hydrates from `/api/auth/me` on app load. Navbar shows name/avatar initials, dropdown: My courses, Orders, Certificates, Wishlist, Profile, Admin (if admin), Logout.
- Handle 401 (cookie expired/token revoked) by clearing state and redirecting to `/login?next=…`.
- Registration errors (duplicate email) must render inline.

### 6.10 Profile

- `/profile`: name, email, type, joined date, enrolled courses, orders, certificates.
- Show a “read-only” notice: the backend has no self-service profile update or password-reset endpoint. Do not build fake persistence.

### 6.11 Wishlist (new page)

- `/wishlist`: product-only wishlist (`product_id` + optional `variant_id`), move to cart, remove. Handle empty state.

### 6.12 Blog (new pages)

- `/blog` list with search, tag filter, pagination (root-level `blogs` + `pagination`).
- `/blog/[id]` detail: title, author, date, views, tags, sanitized HTML content, image, related posts.
- Blog image field is `image_path` (relative) — use `mediaUrl`.

### 6.13 Store (rebuild with real data)

- `/store`: products from `/api/products` (client-side filter by category + local search, or use `/api/products/search` for paginated search), sort by price, show stock/variant availability.
- `/store/[slug]`: gallery, variant selector (required when variants exist; update price/stock/image), quantity, add to cart, wishlist, description.
- Variant images live under `variants[].images`; attributes under `variants[].attributes` (`attribute`/`value`).
- Do not use mock `ProductItem` fields (`pages`, `author`, `downloadCount`) — map only real fields; hide unsupported metadata.

### 6.14 Admin panel

Rebuild `/admin` as a guarded layout with sidebar navigation. **Every list and form must use the real admin API**, with loading/error/empty states and optimistic-safe saves.

Required screens:

1. **Dashboard** — counts from admin endpoints (courses, products, orders, users, enrollments, reviews) + latest orders/reviews. Do not fabricate revenue charts unless computed from orders.
2. **Courses** — list/search/filter, create/edit (fields in §5.5), publish/unpublish, soft delete, thumbnail upload.
3. **Course builder** (`/admin/courses/[id]`) — sections CRUD + reorder, lessons CRUD + reorder + move between sections, lesson types (video/text/quiz), external URL or video upload with progress, duration, preview/published flags, quiz + question editor (options/correct answers/marks), enrollment list for that course.
4. **Course categories** CRUD with image upload.
5. **Enrollments** — filter, grant access to a user, extend days, revoke, reactivate; show source (`order|manual`) and expiry.
6. **Reviews** — moderation queue.
7. **Certificates** — list, revoke, restore.
8. **Orders** — list/filter, detail, update status/payment/notes and item quantities; warn that cancelling/refunding revokes course access.
9. **Products** — list/create/edit, variants, images, stock, featured image, category.
10. **Product categories**, **Coupons**, **Banners**, **Delivery charges**, **Blogs + blog categories/tags**, **Users**.
11. Remove mock “notices/exams/leaderboard” admin modules unless mapped to real data.

Admin UX requirements:

- Reorder via drag-and-drop (dnd-kit) or up/down buttons that call `reorder` endpoints with the full ordered array.
- Video upload must show real progress and enforce the backend limit (`COURSE_VIDEO_MAX_SIZE_KB`, default 512 MB) and accepted types.
- File inputs for thumbnails/banners/blog images must send `multipart/form-data` through the proxy; preview immediately from the response path.
- Confirm dialogs for destructive actions; disable buttons while saving; surface backend `message` verbatim.

---

## 7. UI/UX, i18n, SEO, accessibility

- Preserve SHIKHOR branding: logo, blue/indigo palette, Bengali+English typography, existing card/hero styling, motion.
- Keep the bn/en language toggle (`LanguageContext`) and translate UI chrome. API content is single-language; render it as-is. Use `lang` attributes and Noto Sans Bengali fallback.
- Fully responsive: 360px mobile → desktop; sticky mobile purchase/CTA bars; collapsible curriculum on mobile.
- Every data view needs: skeleton loading, empty state, error state with retry, and disabled/pending states on mutations.
- Accessibility: semantic landmarks, focus-visible rings, labelled inputs, `aria-live` for toasts, keyboard-operable modals/dropdowns, color contrast ≥ 4.5:1.
- SEO: `useSeoMeta`/`useHead` for courses, blogs, products (title, description, OG image via `mediaUrl`), canonical URLs, Nitro sitemap/robots routes or Nuxt-compatible modules.
- Performance: use Nuxt SSR and hydration correctly, optional `@nuxt/image`, lazy-load below-the-fold, avoid unnecessary client-only fetching for public catalog, keep client bundles small, no layout shift on images.
- Never expose tokens, signed video URLs, or correct quiz answers in server logs or client caches.

---

## 8. Page map and gap analysis

### 8.1 Existing routes → rebuild

| Current (react-router) | New Nuxt page | Data source |
| --- | --- | --- |
| `/` | `pages/index.vue` | banners, courses, blogs, reviews, products |
| `/courses` | `pages/courses/index.vue` | `/api/courses`, `/api/course-categories` |
| `/courses/:slug` | `pages/courses/[slug].vue` | course detail + reviews |
| `/store` | `pages/store/index.vue` | `/api/products` |
| `/store/:productId` | `pages/store/[slug].vue` | product detail |
| `/reviews` | `pages/reviews.vue` | aggregated course reviews (cap queries) |
| `/profile` | `pages/profile.vue` | `/api/user`, orders, enrollments, certificates |
| `/learn`, `/my-courses` | `pages/my-courses.vue` | `/api/my/courses` |
| `/learn/:courseId`, `/watch` | `pages/learn/[slug].vue` | `/api/my/courses/{slug}/learn` |
| `/exams*`, `/leaderboard*`, `/result*` | **See §10** (no backend) | — |
| `/instructors*`, `/learning-paths` | Keep as **static marketing** (`src/content/`) | no backend |
| `/admin/*` | `pages/admin/*` | admin endpoints |

### 8.2 Must be created (currently missing)

- `/cart`
- `/checkout`
- `/orders`, `/orders/[id]`
- `/wishlist`
- `/blog`, `/blog/[id]`, `/blog/tag/[tag]` (optional)
- `/certificates`, `/certificates/verify`, `/certificates/verify/[number]`
- `/quizzes/[id]`, `/quizzes/[id]/result/[attemptId]`
- `/login`, `/register` as real pages
- `/my-courses`, `/learn/[slug]` as API-driven pages (they exist only as mock UIs)
- Admin: course builder, sections/lessons, quizzes/questions, enrollments, certificates, order detail, product variants/images, blogs/categories/tags, coupons, banners, delivery charges, users (rewire existing mock admin screens)
- Global: Nuxt loading/error handling, `error.vue`, `pages/404.vue`, 401/403 states, sitemap and robots routes

### 8.3 Must be deleted or quarantined

- All imports of `COURSES_DATA`, `EXAMS_DATA`, `PRODUCTS`, `INSTRUCTORS`, `STUDENT_REVIEWS`, `INITIAL_LECTURE_COMMENTS`, mock `usersList`, `PaymentRecord` seeding, etc. from any production page.
- `src/types.ts` mock-only types (`Exam`, `LeaderboardEntry`, `ExamQuestion`, `UserExamRecord`, `PaymentRecord` as a fake gateway record). Replace with API types; keep only types that map to real responses.
- Fake checkout success logic (`handlePaymentSuccess` mutating `enrolledCourseIds`) — replace with real order → enrollment refresh.

---

## 9. Data-fetching state checklist

For every API-backed page, implement:

1. Loading skeleton (not a full-page spinner).
2. Empty state with a next action.
3. Error state showing backend `message`, plus retry.
4. Optimistic update + rollback for cart quantity/toggle, wishlist, lesson complete.
5. Debounced search (300 ms) with URL sync.
6. Pagination that preserves filters.

Global concerns:

- Cart badge counts (products + courses) refresh after add/remove and on focus.
- After login, refetch cart, wishlist, enrollments.
- After order placement, invalidate/refetch cart, orders, my-courses, certificates.
- After admin mutations, invalidate the affected list (SWR or router.refresh()).

---

## 10. Known backend gaps — do NOT fake them

| Missing backend capability | Required handling |
| --- | --- |
| No instructor API / instructor role | Keep `/instructors` only as static marketing content; do not attach fake course counts/students. |
| No global reviews endpoint | `/reviews` may aggregate reviews from up to 6 featured courses server-side, clearly labelled. Otherwise hide the page and remove from nav. |
| No exams, leaderboard, result lookup, notices, live classes | These are mock-only. **Remove them from navigation** and delete the pages, or keep as clearly-labelled static demo pages. Default: remove/hide, and note it in your report. Use course quizzes instead. |
| No self-service profile update / password reset / email verification | Profile is read-only; no fake save. Login/register only. |
| No payment gateway | Checkout records a manual payment method; show “payment instructions / admin confirmation” state. Never simulate a successful charge. |
| No multi-currency | BDT only. |
| No course wishlist | Wishlist is products only. |
| No lesson comments/Q&A | Remove mock comments UI or hide it. |
| No coupon usage tracking in `verifyCoupon` (fields may not exist) | Use only `code/type/discount`; let the order endpoint compute the final total. |

If you believe a gap genuinely blocks the product, **stop and ask** with a short proposal; do not silently invent endpoints or persistence.

---

## 11. Implementation phases (work in this order)

1. **Audit** — inventory existing components/pages, mock data, and API shapes. Post a one-page plan + gap list before coding.
2. **Nuxt scaffold** — Nuxt 4 + Vue 3 + TS + Tailwind v4, port layout/navbar/footer/theme, `globals.css`, fonts, static assets. App must build.
3. **API foundation** — types, `mediaUrl`, `publicFetch`, `apiFetch`, Nitro BFF login/register/logout/me + generic proxy, global auth composable/store, route guards, error/toast primitives.
4. **Public catalog** — home, courses, course detail, store, product detail, blog, reviews, certificate verification. Fully server-rendered and real.
5. **Commerce** — cart (products + courses), coupon, checkout, order success/history/detail, wishlist.
6. **Learning** — my-courses, player, progress, quizzes, reviews, certificates (issue/list/download).
7. **Admin** — layout + dashboard, courses/builder/lessons/sections/quizzes, enrollments, reviews, certificates, orders, products/variants, categories, coupons, banners, blogs, delivery charges, users.
8. **Polish** — loading/error/empty states, responsive pass, a11y, SEO, i18n, performance.
9. **Tests** — Playwright happy paths + admin smoke; `tsc --noEmit`; lint; production build.

Run `npm run build` (Nuxt production build) after each major phase. Do not accumulate broken phases.

---

## 12. Acceptance criteria (must all pass)

### Student journey
- [ ] Register a new account, log out, log in; session survives refresh; protected routes redirect to login with `next`.
- [ ] Browse courses with search/category/level/sort; filters are in the URL and survive back navigation.
- [ ] Open a course: locked lessons hide content; preview lessons play.
- [ ] Add a course to cart, apply a valid and invalid coupon, place an order; enrollment becomes active immediately (default config).
- [ ] `/my-courses` shows the course with expiry/remaining days and 0% progress.
- [ ] In `/learn/[slug]`, play an external video and an uploaded (signed) video; progress saves; reload resumes at the saved position.
- [ ] Complete all lessons; pass the linked quiz; progress reaches 100%; quiz result review is correct.
- [ ] Submit a review; it appears on the public course page and updates the average.
- [ ] Request a certificate, download the PDF, verify it publicly.
- [ ] Add a physical product with a required variant to cart, checkout with address + delivery charge, see it in `/orders/[id]`.
- [ ] Add/remove wishlist items.
- [ ] Expired enrollment shows a renewal state and lesson access is denied.
- [ ] Admin cancels an order → course access is revoked for the student.

### Admin journey
- [ ] Non-admin cannot access `/admin` (UI + API).
- [ ] Create category → course → section → lesson (external + uploaded) → quiz + questions; publish.
- [ ] Reorder sections/lessons and verify order in the student curriculum.
- [ ] Upload a thumbnail and a video; preview works; oversized upload shows a clear error.
- [ ] Grant/extend/revoke/reactivate an enrollment; student access changes accordingly.
- [ ] Approve/reject a review and see the public rating change.
- [ ] Revoke/restore a certificate; public verification reflects it.
- [ ] Update order status/payment; timeline updates; paid-only enrollment mode works when configured.
- [ ] Create/edit a product with variants and images; it appears in the store.

### Technical
- [ ] `nuxt build` passes with zero Vue/TypeScript errors and zero ESLint errors.
- [ ] No production page imports mock data (`src/data/*`).
- [ ] No hard-coded API URLs outside env/config.
- [ ] No token in `localStorage`; `shikhor_token` is httpOnly.
- [ ] All mutation errors surface the backend `message`.
- [ ] Lighthouse mobile: Performance ≥ 80, Accessibility ≥ 90 on home/course detail (reasonable target).
- [ ] Playwright suite green.

---

## 13. Deliverables

1. The rebuilt Nuxt app in `C:\Users\mdmuhir\Desktop\shikhor-next`, running with `npm run dev`.
2. `.env.example` and a short `FRONTEND.md` covering setup, env vars, architecture (BFF/proxy/cookies), route map, and known gaps.
3. A `CHANGELOG-FRONTEND.md` summarizing: pages created, pages removed, mock data removed, backend quirks handled, and any backend changes requested.
4. Test results: `npm run build`, `npm run lint`, `npx playwright test` outputs.
5. A short screen/route list validating §12 (screenshots welcome if your environment supports them).

---

## 14. Working rules

- **Backend is the source of truth.** Read the controller before building a form. Do not change backend business logic.
- Allowed backend edits only if strictly required for wiring: `config/cors.php` / `CORS_ALLOWED_ORIGINS`, and bug fixes you first report. Never alter API response shapes without flagging it.
- Keep changes consistent with the existing design system; port, don’t redesign.
- No `any` in API-facing code; define types from real payloads.
- Small, reviewable commits/phases. Do not leave dead mock code behind.
- If something is ambiguous, ask a focused question with 2–3 options and a recommendation. Do not guess silently.

---

## 15. First actions (do these now)

1. Read `COURSES-API.md`, `routes/api.php`, and the controllers listed in §1.
2. Inspect `src/App.tsx`, `src/context/AppContext.tsx`, `src/types.ts`, `src/data/*`, and all `src/pages/*` to inventory what is reusable.
3. Start the backend (`php artisan serve`) and probe: `/api/courses`, `/api/products`, `/api/course-categories`, `/api/blogs`, login as seeded admin/customer.
4. Post a concise audit: component reuse plan, mock-data removal plan, page gap list, and the phase-1 scaffold you are about to create.
5. Then begin Phase 2 (scaffold) without waiting for further approval unless you hit a blocker from §10.

**Definition of done:** a real student and a real admin can complete every flow in §12 against the live Laravel API, with no mock data in any production path, and the app builds cleanly.
