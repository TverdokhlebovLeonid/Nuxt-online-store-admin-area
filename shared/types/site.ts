export interface SiteSettings {
  phone: string
  phoneTel: string
  city: string
  streetAddress: string
  extraAddresses: string[]
  addresses: string[]
}

export type SiteSettingsPayload = Omit<SiteSettings, 'addresses'>
