<script setup lang="ts">
import type { ProductPayload } from '@/types/product'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { $api } = useNuxtApp()
const { pending, run } = useAdminAction()

async function create(payload: ProductPayload) {
  await run(() => $api.products.create(payload), {
    successMessage: 'Товар создан',
    onSuccess: async () => {
      await navigateTo('/admin')
    },
  })
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <NuxtLink
        to="/admin"
        class="text-sm text-muted transition hover:text-brand-700"
      >
        ← К списку
      </NuxtLink>
      <h1 class="mt-1 text-2xl font-bold text-ink">Новый товар</h1>
    </div>

    <AdminProductForm
      submit-label="Создать"
      :pending="pending"
      @submit="create"
    />
  </div>
</template>
