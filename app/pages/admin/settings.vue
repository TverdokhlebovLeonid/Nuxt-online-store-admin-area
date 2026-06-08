<script setup lang="ts">
import type { SiteSettings, SiteSettingsPayload } from '#shared/types/site'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { $api } = useNuxtApp()
const { pending, run } = useAdminAction()

const { data: settingsData, refresh } = await useHttpFetch<SiteSettings>('/api/admin/settings')
const settings = computed(() => settingsData.value)

const initial = computed<SiteSettingsPayload>(() => {
  const value = settings.value
  return {
    phone: value?.phone ?? '',
    phoneTel: value?.phoneTel ?? '',
    city: value?.city ?? '',
    streetAddress: value?.streetAddress ?? '',
    extraAddresses: value ? [...value.extraAddresses] : [],
  }
})

async function save(payload: SiteSettingsPayload) {
  await run(
    async () => {
      await $api.settings.update(payload)
      await refresh()
      await clearNuxtData('site-settings')
    },
    { successMessage: 'Настройки сохранены' },
  )
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-2xl font-bold text-ink">Контакты компании</h1>
      <p class="mt-1 text-sm text-muted">Телефон и адреса на сайте и в подвале</p>
    </div>

    <AdminSettingsForm
      :initial="initial"
      :pending="pending"
      @submit="save"
    />
  </div>
</template>
