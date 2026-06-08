<script setup lang="ts">
import type { Product } from '@/types/product'
import { formatPrice } from '#shared/utils/format'

definePageMeta({ layout: 'admin', middleware: 'admin' })

const { $api } = useNuxtApp()
const { run } = useAdminAction()
const { confirm } = useConfirm()

const {
  data: productsData,
  refresh,
  pending: loading,
} = await useHttpFetch<Product[]>('/api/admin/products')

const products = computed(() => productsData.value ?? [])

const deleting = ref<number | null>(null)

async function remove(product: Product) {
  const ok = await confirm({
    title: 'Удалить товар',
    message: `Удалить «${product.name}»? Действие нельзя отменить.`,
    confirmLabel: 'Удалить',
  })
  if (!ok) return

  deleting.value = product.id
  await run(
    () => $api.products.remove(product.id),
    {
      successMessage: `Товар «${product.name}» удалён`,
      onSuccess: () => refresh(),
    },
  )
  deleting.value = null
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-ink">Товары</h1>
        <p class="mt-1 text-sm text-muted">Всего: {{ products.length }}</p>
      </div>
      <UiButton
        to="/admin/products/new"
        label="+ Добавить товар"
      />
    </div>

    <UiCard :padding="false" class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-neutral-100 bg-neutral-50 text-left text-muted">
              <th class="px-4 py-3 font-medium">Товар</th>
              <th class="px-4 py-3 font-medium">Категория</th>
              <th class="px-4 py-3 font-medium">Цена</th>
              <th class="px-4 py-3 font-medium">Акция</th>
              <th class="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <tr v-if="loading && !products.length">
              <td colspan="5" class="px-4 py-10 text-center text-muted">Загрузка…</td>
            </tr>
            <tr v-else-if="!products.length">
              <td colspan="5" class="px-4 py-10 text-center text-muted">Товаров пока нет</td>
            </tr>
            <tr
              v-for="product in products"
              :key="product.id"
              class="border-b border-neutral-50 transition hover:bg-neutral-50/60"
            >
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="grid size-12 shrink-0 place-items-center rounded-lg bg-neutral-50">
                    <img
                      v-if="product.img"
                      :src="product.img"
                      :alt="product.name"
                      class="max-h-full object-contain"
                    />
                  </div>
                  <div class="min-w-0">
                    <p class="truncate font-medium text-ink">{{ product.name }}</p>
                    <p class="truncate text-xs text-muted">{{ product.slug }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-muted">{{ product.category }}</td>
              <td class="px-4 py-3">
                <span class="font-medium text-ink">{{
                  formatPrice(product.sale ? product.salePrice : product.price)
                }}</span>
              </td>
              <td class="px-4 py-3">
                <UiBadge v-if="product.sale" color="red">Скидка</UiBadge>
                <span v-else class="text-muted">—</span>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-2">
                  <UiButton
                    :to="`/admin/products/${product.id}`"
                    variant="secondary"
                    size="sm"
                    label="Изменить"
                  />
                  <UiButton
                    variant="danger"
                    size="sm"
                    label="Удалить"
                    :loading="deleting === product.id"
                    @click="remove(product)"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </UiCard>
  </div>
</template>
