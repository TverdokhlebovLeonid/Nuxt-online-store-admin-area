<script setup lang="ts">
import { buildWebsiteSchema } from '@/utils/schema'

const route = useRoute()
const callbackOpen = ref(false)
const { data: settings } = useSiteSettings()
const { siteUrl, siteName } = useSiteConfig()

const showHero = computed(() => route.name === 'index')

useStructuredData(() => buildWebsiteSchema(siteUrl.value, siteName.value, settings.value))
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <SiteHeader v-model:callback="callbackOpen" />

    <HeroSlider v-if="showHero" />

    <main class="flex-1">
      <UiContainer>
        <div class="py-8 lg:py-12">
          <slot />
        </div>
      </UiContainer>
    </main>

    <SiteFooter />

    <LoadingOverlay />

    <UiModal v-model="callbackOpen" title="Обратный звонок">
      <CallbackForm @sent="callbackOpen = false" />
    </UiModal>
  </div>
</template>
