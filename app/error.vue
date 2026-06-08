<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error.statusCode || 404)

const title = computed(() =>
  statusCode.value === 404 ? 'Страница не найдена' : `Ошибка ${statusCode.value}`,
)

const description = computed(() =>
  statusCode.value === 404
    ? 'Запрашиваемая страница не существует или была удалена.'
    : 'Произошла ошибка при загрузке страницы. Попробуйте позже.',
)

usePageSeo({
  title,
  description,
  robots: 'noindex, nofollow',
})

function handleError() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <main class="grid min-h-screen place-items-center bg-neutral-50 px-4">
    <div class="flex max-w-md flex-col items-center gap-4 text-center">
      <p
        class="text-7xl font-black text-brand-600"
        aria-hidden="true"
      >
        {{ statusCode }}
      </p>
      <h1 class="text-2xl font-bold text-ink">{{ title }}</h1>
      <p class="text-muted">{{ description }}</p>
      <nav class="flex flex-wrap justify-center gap-3">
        <UiButton
          size="lg"
          label="На главную"
          @click="handleError"
        />
        <UiButton
          to="/store"
          variant="secondary"
          size="lg"
          label="В каталог"
        />
      </nav>
    </div>
  </main>
</template>
