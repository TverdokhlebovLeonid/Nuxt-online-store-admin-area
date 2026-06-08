import type { SiteSettings } from '#shared/types/site'

const defaultSettings: SiteSettings = {
  phone: '',
  phoneTel: '',
  city: '',
  streetAddress: '',
  extraAddresses: [],
  addresses: [],
}

export function useSiteSettings() {
  return useHttpData('site-settings', (fetch) => fetch<SiteSettings>('/api/settings'), {
    default: () => defaultSettings,
  })
}
