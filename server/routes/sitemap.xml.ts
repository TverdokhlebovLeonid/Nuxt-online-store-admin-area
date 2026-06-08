import { listCategories } from '../repositories/categoryRepository'
import { getAllProducts } from '../repositories/productRepository'
import { toAbsoluteUrl } from '#shared/utils/url'

interface SitemapEntry {
  loc: string
  changefreq: 'daily' | 'weekly' | 'monthly'
  priority: number
  lastmod?: string
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderUrl(entry: SitemapEntry): string {
  const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
  return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl).replace(/\/$/, '')

  const [categories, products] = await Promise.all([listCategories(), getAllProducts()])

  const entries: SitemapEntry[] = [
    { loc: toAbsoluteUrl(siteUrl, '/'), changefreq: 'weekly', priority: 1.0 },
    { loc: toAbsoluteUrl(siteUrl, '/store'), changefreq: 'daily', priority: 0.9 },
    { loc: toAbsoluteUrl(siteUrl, '/about'), changefreq: 'monthly', priority: 0.6 },
    { loc: toAbsoluteUrl(siteUrl, '/contacts'), changefreq: 'monthly', priority: 0.7 },
    { loc: toAbsoluteUrl(siteUrl, '/delivery'), changefreq: 'monthly', priority: 0.7 },
    ...categories.map((category) => ({
      loc: toAbsoluteUrl(siteUrl, `/category/${category.slug}`),
      changefreq: 'weekly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      loc: toAbsoluteUrl(siteUrl, `/product/${product.slug}`),
      changefreq: 'weekly' as const,
      priority: 0.7,
    })),
  ]

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=3600')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${entries.map(renderUrl).join('\n')}
    </urlset>`
})
