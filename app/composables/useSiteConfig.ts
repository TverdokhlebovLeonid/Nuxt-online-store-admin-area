export function useSiteConfig() {
  const config = useRuntimeConfig()

  const siteUrl = computed(() => String(config.public.siteUrl).replace(/\/$/, ''))
  const siteName = computed(() => String(config.public.siteName))

  return { siteUrl, siteName }
}
