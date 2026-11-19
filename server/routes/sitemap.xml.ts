interface SitemapCourse {
  slug: string
  updated_at?: string | null
}

interface SitemapBlog {
  id: number
  published_at?: string | null
}

interface Paginated<T> {
  data: T[]
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const base = String(config.apiUrl || 'http://127.0.0.1:8000').replace(/\/+$/, '')
  const site = String(config.public.siteUrl || 'http://localhost:3000').replace(/\/+$/, '')

  const staticPaths = [
    { path: '/', changefreq: 'daily', priority: '1.0' },
    { path: '/courses', changefreq: 'daily', priority: '0.9' },
    { path: '/store', changefreq: 'daily', priority: '0.8' },
    { path: '/blog', changefreq: 'daily', priority: '0.8' },
    { path: '/reviews', changefreq: 'weekly', priority: '0.5' },
    { path: '/instructors', changefreq: 'monthly', priority: '0.4' },
    { path: '/certificates/verify', changefreq: 'monthly', priority: '0.3' },
    { path: '/login', changefreq: 'yearly', priority: '0.2' },
    { path: '/register', changefreq: 'yearly', priority: '0.2' },
  ]

  let courses: SitemapCourse[] = []
  let blogs: SitemapBlog[] = []

  try {
    const [coursesResponse, blogsResponse] = await Promise.all([
      $fetch<{ data: Paginated<SitemapCourse> }>(`${base}/api/courses`, { query: { per_page: 100 } }),
      $fetch<{ blogs: SitemapBlog[] }>(`${base}/api/blogs`, { query: { per_page: 100 } }),
    ])
    courses = coursesResponse?.data?.data ?? []
    blogs = blogsResponse?.blogs ?? []
  } catch {
    // The sitemap should still respond when the API is temporarily down.
  }

  const urls: string[] = []

  for (const item of staticPaths) {
    urls.push(
      `<url><loc>${site}${item.path}</loc><changefreq>${item.changefreq}</changefreq><priority>${item.priority}</priority></url>`,
    )
  }

  for (const course of courses) {
    const lastmod = course.updated_at ? `<lastmod>${new Date(course.updated_at).toISOString()}</lastmod>` : ''
    urls.push(`<url><loc>${site}/courses/${encodeURIComponent(course.slug)}</loc>${lastmod}<changefreq>weekly</changefreq><priority>0.7</priority></url>`)
  }

  for (const blog of blogs) {
    const lastmod = blog.published_at ? `<lastmod>${new Date(blog.published_at).toISOString()}</lastmod>` : ''
    urls.push(`<url><loc>${site}/blog/${blog.id}</loc>${lastmod}<changefreq>monthly</changefreq><priority>0.5</priority></url>`)
  }

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`
})
