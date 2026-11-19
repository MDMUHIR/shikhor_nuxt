export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event)
  const site = String(config.public.siteUrl || 'http://localhost:3000').replace(/\/+$/, '')

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Private areas',
    'Disallow: /admin',
    'Disallow: /cart',
    'Disallow: /checkout',
    'Disallow: /orders',
    'Disallow: /wishlist',
    'Disallow: /profile',
    'Disallow: /my-courses',
    'Disallow: /learn',
    'Disallow: /certificates',
    'Disallow: /quizzes',
    '',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=86400')
  return body
})
