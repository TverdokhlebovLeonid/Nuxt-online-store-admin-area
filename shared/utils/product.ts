const FALLBACK_IMAGE = '/images/error.webp'

export function productImageSrc(img?: string | null): string {
  return img || FALLBACK_IMAGE
}
