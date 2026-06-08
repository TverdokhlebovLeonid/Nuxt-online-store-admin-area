export function toAbsoluteUrl(siteUrl: string, path: string): string {
  const origin = siteUrl.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${origin}${normalized}`
}

export function toAbsoluteImageUrl(
  siteUrl: string,
  imagePath: string | undefined,
): string | undefined {
  if (!imagePath) return undefined
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath
  return toAbsoluteUrl(siteUrl, imagePath)
}
