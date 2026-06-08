import type { SiteSettingsRow } from '../schema'

export const SETTINGS_ID = 1

export const seedSiteSettings: SiteSettingsRow = {
  id: SETTINGS_ID,
  phone: '+7 (900) 000-11-11',
  phoneTel: '+79000001111',
  city: 'Москва',
  streetAddress: 'улица Свободы, дом 1',
  extraAddresses: ['Химки, улица Правды, дом 5'],
  updatedAt: new Date(),
}
