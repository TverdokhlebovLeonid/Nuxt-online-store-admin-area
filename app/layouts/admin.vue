<script setup lang="ts">
import { IconList, IconPhone, IconPlus } from '#components'

const { user, logout } = useAuth()
const { confirm } = useConfirm()
const route = useRoute()

const loggingOut = ref(false)

async function confirmLogout() {
  const ok = await confirm({
    title: 'Выход',
    message: 'Выйти из админ-панели?',
    confirmLabel: 'Выйти',
    variant: 'primary',
  })
  if (!ok) return

  loggingOut.value = true
  try {
    await logout()
  } finally {
    loggingOut.value = false
  }
}

usePageSeo({
  title: 'Админ-панель',
  robots: 'noindex, nofollow',
})

const links = [
  { label: 'Товары', to: '/admin', icon: IconList },
  { label: 'Добавить товар', to: '/admin/products/new', icon: IconPlus },
  { label: 'Контакты', to: '/admin/settings', icon: IconPhone },
]

const isActive = (to: string) => {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="flex min-h-screen bg-neutral-100">
    <aside class="hidden w-64 shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
      <div class="flex h-16 items-center gap-2 border-b border-neutral-100 px-6">
        <SiteLogo
          size="sm"
          :show-text="false"
        />
        <span class="font-bold text-ink">Админка</span>
      </div>
      <nav class="flex flex-1 flex-col gap-1 p-3">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition"
          :class="
            isActive(link.to) ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-neutral-100'
          "
        >
          <component
            :is="link.icon"
            class="size-5"
          />
          {{ link.label }}
        </NuxtLink>
      </nav>
      <div class="border-t border-neutral-100 p-3">
        <NuxtLink
          to="/"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition hover:bg-neutral-100"
        >
          <IconHome class="size-5" />
          На сайт
        </NuxtLink>
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="flex h-16 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:px-8"
      >
        <div class="flex items-center gap-2 lg:hidden">
          <SiteLogo
            size="sm"
            :show-text="false"
          />
          <span class="font-bold text-ink">Админка</span>
        </div>
        <div class="ml-auto flex items-center gap-4">
          <span class="hidden text-sm text-muted sm:block">{{ user?.email }}</span>
          <UiButton
            variant="secondary"
            size="sm"
            label="Выйти"
            :loading="loggingOut"
            @click="confirmLogout"
          />
        </div>
      </header>

      <nav
        class="flex gap-2 overflow-x-auto border-b border-neutral-200 bg-white px-4 py-2 lg:hidden"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition"
          :class="
            isActive(link.to) ? 'bg-brand-50 text-brand-700' : 'text-ink hover:bg-neutral-100'
          "
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <main class="flex-1 p-4 lg:p-8">
        <slot />
      </main>
    </div>
  </div>
</template>
