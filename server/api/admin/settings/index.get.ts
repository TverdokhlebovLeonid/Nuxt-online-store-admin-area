import { getSiteSettings } from '../../../repositories/siteSettingsRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return getSiteSettings()
})
