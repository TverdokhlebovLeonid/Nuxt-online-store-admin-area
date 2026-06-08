<script setup lang="ts">
import type { Product, ProductPayload } from '@/types/product'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const route = useRoute()
const { $api } = useNuxtApp()
const id = Number(route.params.id)
const { pending, run } = useAdminAction()

const { data: productData } = await useHttpFetch<Product>(`/api/admin/products/${id}`)
const product = computed(() => productData.value)

async function update(payload: ProductPayload) {
  await run(() => $api.products.update(id, payload), {
    successMessage: 'Изменения сохранены',
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
      <h1 class="mt-1 text-2xl font-bold text-ink">Редактирование: {{ product?.name }}</h1>
    </div>

    <AdminProductForm
      v-if="product"
      :product="product"
      submit-label="Сохранить"
      :pending="pending"
      @submit="update"
    />
  </div>
</template>
