import { toAbsoluteImageUrl, toAbsoluteUrl } from '#shared/utils/url'

type OgType = 'website' | 'article' | 'product'

interface PageSeoOptions {
  title: MaybeRefOrGetter<string>
  description?: MaybeRefOrGetter<string>
  path?: MaybeRefOrGetter<string>
  image?: MaybeRefOrGetter<string | undefined>
  ogType?: OgType
  robots?: MaybeRefOrGetter<string | undefined>
}

export function usePageSeo(options: PageSeoOptions) {
  const route = useRoute()
  const config = useRuntimeConfig()
  const { siteUrl, siteName } = useSiteConfig()

  const pageTitle = computed(() => toValue(options.title))
  const fullTitle = computed(() =>
    pageTitle.value.includes(siteName.value)
      ? pageTitle.value
      : `${pageTitle.value} | ${siteName.value}`,
  )

  const description = computed(
    () =>
      toValue(options.description) ||
      String(config.public.siteDescription) ||
      'Интернет-магазин металлоискателей АКА.',
  )

  const canonicalPath = computed(() => toValue(options.path) ?? route.path)
  const canonicalUrl = computed(() => toAbsoluteUrl(siteUrl.value, canonicalPath.value))

  const ogImage = computed(() => {
    const image = toValue(options.image)
    return image
      ? toAbsoluteImageUrl(siteUrl.value, image)
      : toAbsoluteImageUrl(siteUrl.value, '/images/fsb.webp')
  })

  const ogTypeValue = computed(() => {
    const type = options.ogType ?? 'website'
    return type === 'product' ? 'website' : type
  })

  const robots = computed(() => toValue(options.robots))

  useSeoMeta({
    title: fullTitle,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogType: ogTypeValue,
    ogSiteName: siteName.value,
    ogLocale: 'ru_RU',
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: description,
    twitterImage: ogImage,
    robots,
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })

  return { canonicalUrl, siteUrl, siteName, fullTitle, description }
}
