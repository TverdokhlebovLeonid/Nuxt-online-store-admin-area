<script setup lang="ts">
import { footerInfoLinks } from '@/utils/siteNav'

const { data: categories } = useCategories()
const { data: settings } = useSiteSettings()
const year = new Date().getFullYear()

const primaryAddress = computed(
  () => settings.value.addresses[0] || `${settings.value.city}, ${settings.value.streetAddress}`,
)
</script>

<template>
  <footer class="mt-20 border-t border-neutral-200 bg-white">
    <UiContainer>
      <div class="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <SiteLogo />
          <p class="mt-4 text-sm text-muted">
            Российский производитель металлоискателей фирмы АКА. Поисковая и досмотровая техника
            высокого класса.
          </p>
        </div>

        <nav>
          <h3 class="text-sm font-semibold text-ink">Каталог</h3>
          <ul class="mt-4 space-y-2">
            <li
              v-for="category in categories"
              :key="category.slug"
            >
              <NuxtLink
                :to="`/category/${category.slug}`"
                class="text-sm text-muted transition hover:text-brand-700"
              >
                {{ category.name }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav>
          <h3 class="text-sm font-semibold text-ink">Информация</h3>
          <ul class="mt-4 space-y-2">
            <li
              v-for="link in footerInfoLinks"
              :key="link.url"
            >
              <NuxtLink
                :to="link.url"
                class="text-sm text-muted transition hover:text-brand-700"
              >
                {{ link.title }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <div>
          <h3 class="text-sm font-semibold text-ink">Контакты</h3>
          <ul class="mt-4 space-y-2 text-sm text-muted">
            <li>{{ primaryAddress }}</li>
            <li>
              <a
                :href="`tel:${settings.phoneTel}`"
                class="font-semibold text-ink transition hover:text-brand-700"
              >
                {{ settings.phone }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-between gap-2 border-t border-neutral-100 py-6 text-sm text-muted sm:flex-row"
      >
        <span>Search klad</span>
        <span>© {{ year }} — All rights reserved</span>
      </div>
    </UiContainer>
  </footer>
</template>
