import type { Category, Product } from '@/types/product'
import type { SiteSettings } from '#shared/types/site'
import { toAbsoluteImageUrl, toAbsoluteUrl } from '#shared/utils/url'

type SchemaGraph = Record<string, unknown>

function organization(siteUrl: string, siteName: string, settings: SiteSettings): SchemaGraph {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    url: siteUrl,
    telephone: settings.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressCountry: 'RU',
    },
  }
}

export function buildWebsiteSchema(
  siteUrl: string,
  siteName: string,
  settings: SiteSettings,
): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(siteUrl, siteName, settings),
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        inLanguage: 'ru-RU',
        publisher: { '@id': `${siteUrl}/#organization` },
      },
    ],
  }
}

export function buildBreadcrumbSchema(
  siteUrl: string,
  items: { label: string; to?: string }[],
): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.to ? { item: toAbsoluteUrl(siteUrl, item.to) } : {}),
    })),
  }
}

export function buildProductSchema(siteUrl: string, product: Product): SchemaGraph {
  const url = toAbsoluteUrl(siteUrl, `/product/${product.slug}`)
  const image = toAbsoluteImageUrl(siteUrl, product.img)
  const price = product.sale ? product.salePrice : product.price
  const description =
    product.shortDescription ||
    product.description[0] ||
    `Купить ${product.name} в интернет-магазине Search klad.`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: product.name,
        description,
        sku: String(product.id),
        image: image ? [image] : undefined,
        brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
        offers: {
          '@type': 'Offer',
          url,
          priceCurrency: 'RUB',
          price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    ],
  }
}

export function buildCategorySchema(
  siteUrl: string,
  category: Category,
  productCount: number,
): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.name,
    url: toAbsoluteUrl(siteUrl, `/category/${category.slug}`),
    description: `${category.name} — каталог из ${productCount} товаров. Доставка по России.`,
    inLanguage: 'ru-RU',
  }
}

export function buildLocalBusinessSchema(
  siteUrl: string,
  siteName: string,
  settings: SiteSettings,
): SchemaGraph {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(siteUrl, siteName, settings),
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/contacts#localbusiness`,
        name: siteName,
        url: toAbsoluteUrl(siteUrl, '/contacts'),
        telephone: settings.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: settings.streetAddress,
          addressLocality: settings.city,
          addressCountry: 'RU',
        },
      },
    ],
  }
}
