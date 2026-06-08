export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=86400')

  return `User-agent: *
    Allow: /
    Disallow: /admin
    Disallow: /api
    Disallow: /cart

    Sitemap: ${siteUrl}/sitemap.xml
    `
})
