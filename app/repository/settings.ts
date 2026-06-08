import type { SiteSettingsPayload } from '#shared/types/site'

export function createSettingsRepository(appFetch: typeof $fetch) {
  return {
    update(body: SiteSettingsPayload) {
      return appFetch('/api/admin/settings', { method: 'PATCH', body })
    },
  }
}
