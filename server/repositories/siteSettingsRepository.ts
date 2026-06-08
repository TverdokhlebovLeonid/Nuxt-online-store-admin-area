import { eq } from 'drizzle-orm'
import type { SiteSettings } from '#shared/types/site'
import { siteSettings, type SiteSettingsUpdate } from '../database/schema'
import { SETTINGS_ID } from '../database/seed/siteSettings'

function formatPrimaryAddress(city: string, streetAddress: string) {
  return `${city}, ${streetAddress}`
}

function toSiteSettings(row: typeof siteSettings.$inferSelect): SiteSettings {
  const primary = formatPrimaryAddress(row.city, row.streetAddress)
  return {
    phone: row.phone,
    phoneTel: row.phoneTel,
    city: row.city,
    streetAddress: row.streetAddress,
    extraAddresses: row.extraAddresses,
    addresses: [primary, ...row.extraAddresses],
  }
}

export async function getSiteSettings() {
  const row = await useDb().query.siteSettings.findFirst({
    where: eq(siteSettings.id, SETTINGS_ID),
  })

  if (!row) {
    throw createError({ statusCode: 500, message: 'Настройки сайта не инициализированы' })
  }

  return toSiteSettings(row)
}

export async function updateSiteSettings(input: SiteSettingsUpdate) {
  await useDb()
    .update(siteSettings)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(siteSettings.id, SETTINGS_ID))

  return getSiteSettings()
}
