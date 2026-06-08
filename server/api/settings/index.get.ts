import { getSiteSettings } from '../../repositories/siteSettingsRepository'

export default defineEventHandler(() => getSiteSettings())
