<script setup lang="ts">
import { mainNavLinks } from '@/utils/siteNav'

const { count: cartCount } = useCartHydrated()
const route = useRoute()
const { data: categories } = useCategories()

const mobileOpen = ref(false)
const catalogOpen = ref(false)
const callbackOpen = defineModel<boolean>('callback', { default: false })

const storeLink = mainNavLinks[0]!
const secondaryNavLinks = mainNavLinks.slice(1)

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    catalogOpen.value = false
  },
)

function openCallbackFromMobile() {
  callbackOpen.value = true
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-neutral-200/70 bg-white/90 backdrop-blur scroll-lock-pad"
  >
    <UiContainer>
      <div class="flex h-16 items-center justify-between gap-4 lg:h-20">
        <NuxtLink
          to="/"
          class="shrink-0"
        >
          <SiteLogo hide-text-on-mobile />
        </NuxtLink>

        <nav class="hidden items-center gap-1 lg:flex">
          <div
            class="relative"
            @mouseenter="catalogOpen = true"
            @mouseleave="catalogOpen = false"
          >
            <NuxtLink
              :to="storeLink.url"
              class="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-ink transition hover:bg-brand-50 hover:text-brand-700"
            >
              {{ storeLink.title }}
              <IconChevronDown
                class="size-4 transition"
                :class="catalogOpen && 'rotate-180'"
              />
            </NuxtLink>
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              leave-active-class="transition duration-100 ease-in"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div
                v-if="catalogOpen"
                class="absolute left-0 top-full w-60 overflow-hidden rounded-xl border border-neutral-200 bg-white py-2 shadow-card"
              >
                <NuxtLink
                  v-for="category in categories"
                  :key="category.slug"
                  :to="`/category/${category.slug}`"
                  class="block px-4 py-2 text-sm text-ink transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </Transition>
          </div>

          <NuxtLink
            v-for="link in secondaryNavLinks"
            :key="link.url"
            :to="link.url"
            class="rounded-lg px-4 py-2 text-sm font-medium text-ink transition hover:bg-brand-50 hover:text-brand-700"
            active-class="bg-brand-50 text-brand-700"
          >
            {{ link.title }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink transition hover:bg-brand-50 hover:text-brand-700 sm:flex"
            @click="callbackOpen = true"
          >
            <IconPhone class="size-5" />
            Перезвонить
          </button>

          <UiButtonIcon
            to="/cart"
            variant="brand"
            size="lg"
            label="Корзина"
          >
            <IconCart class="size-6" />
            <template
              v-if="cartCount"
              #badge
            >
              <UiBadge>{{ cartCount }}</UiBadge>
            </template>
          </UiButtonIcon>

          <UiButtonIcon
            variant="brand"
            size="lg"
            label="Меню"
            class="lg:hidden"
            @click="mobileOpen = !mobileOpen"
          >
            <IconMenu
              v-if="!mobileOpen"
              class="size-6"
            />
            <IconClose
              v-else
              class="size-6"
            />
          </UiButtonIcon>
        </div>
      </div>
    </UiContainer>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="border-t border-neutral-200 bg-white lg:hidden"
      >
        <UiContainer>
          <nav class="flex flex-col py-3">
            <NuxtLink
              :to="storeLink.url"
              class="rounded-lg px-3 py-2.5 font-medium text-ink transition hover:bg-brand-50"
            >
              {{ storeLink.title }}
            </NuxtLink>
            <div class="px-3">
              <button
                type="button"
                class="flex w-full items-center justify-between py-2 text-sm font-semibold text-muted"
                @click="catalogOpen = !catalogOpen"
              >
                Категории
                <IconChevronDown
                  class="size-4 transition"
                  :class="catalogOpen && 'rotate-180'"
                />
              </button>
              <div
                v-show="catalogOpen"
                class="flex flex-col pb-2 pl-3"
              >
                <NuxtLink
                  v-for="category in categories"
                  :key="category.slug"
                  :to="`/category/${category.slug}`"
                  class="rounded-lg px-2 py-2 text-sm text-ink transition hover:bg-brand-50"
                >
                  {{ category.name }}
                </NuxtLink>
              </div>
            </div>
            <NuxtLink
              v-for="link in secondaryNavLinks"
              :key="link.url"
              :to="link.url"
              class="rounded-lg px-3 py-2.5 font-medium text-ink transition hover:bg-brand-50"
            >
              {{ link.title }}
            </NuxtLink>
            <button
              type="button"
              class="mt-1 rounded-lg px-3 py-2.5 text-left font-medium text-brand-700 transition hover:bg-brand-50"
              @click="openCallbackFromMobile"
            >
              Перезвонить мне
            </button>
          </nav>
        </UiContainer>
      </div>
    </Transition>
  </header>
</template>
