<script setup lang="ts">
import { buildLocalBusinessSchema } from '@/utils/schema'

const { siteUrl, siteName } = useSiteConfig()
const { data: settings } = useSiteSettings()

usePageSeo({
  title: 'Контакты',
  description: () =>
    `Контакты магазина Search klad: ${settings.value.addresses.join(', ')}. Телефон ${settings.value.phone}. Консультация и поддержка.`,
  path: '/contacts',
})

useStructuredData(
  () => buildLocalBusinessSchema(siteUrl.value, siteName.value, settings.value),
  'local-business',
)
</script>

<template>
  <div class="flex flex-col gap-8">
    <header>
      <h1 class="text-3xl font-bold text-ink">Контакты</h1>
      <p class="mt-1 text-muted">Свяжитесь с нами удобным способом</p>
    </header>

    <div class="grid gap-6 lg:grid-cols-3">
      <UiCard class="flex flex-col gap-4 lg:col-span-1">
        <h2 class="text-lg font-semibold text-ink">Адреса</h2>
        <address class="not-italic">
          <ul class="space-y-3">
            <li
              v-for="point in settings.addresses"
              :key="point"
              class="flex gap-3 text-muted"
            >
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </address>
        <div class="border-t border-neutral-100 pt-4">
          <p class="text-sm text-muted">Телефон</p>
          <a
            :href="`tel:${settings.phoneTel}`"
            class="text-xl font-bold text-ink transition hover:text-brand-700"
          >
            {{ settings.phone }}
          </a>
        </div>
      </UiCard>

      <UiCard :padding="false" class="overflow-hidden lg:col-span-2">
        <div
          class="flex min-h-[280px] items-center justify-center bg-neutral-200 text-muted sm:min-h-[360px] lg:min-h-[450px]"
        >
          Ваша карта
        </div>
      </UiCard>
    </div>
  </div>
</template>
