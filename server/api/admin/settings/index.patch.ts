import { updateSiteSettings } from '../../../repositories/siteSettingsRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const input = await useValidatedBody(event, siteSettingsUpdateSchema)
  return updateSiteSettings(input)
})
