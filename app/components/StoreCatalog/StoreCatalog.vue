<script setup lang="ts">
import type { Product, SortKey } from '@/types/product'

defineProps<{
  items: Product[]
  total: number
  totalPages: number
  page: number
  pending: boolean
}>()

const emit = defineEmits<{
  prev: []
  next: []
  order: [product: Product]
}>()

const search = defineModel<string>('search', { required: true })
const sort = defineModel<SortKey>('sort', { required: true })
const perPage = defineModel<number>('perPage', { required: true })

const cartStore = useCartStore()

function onOrder(product: Product) {
  cartStore.addToCart(product)
  emit('order', product)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <StoreCatalogToolbar
      v-model:search="search"
      v-model:sort="sort"
      v-model:per-page="perPage"
    />

    <p class="text-sm text-muted">Найдено товаров: {{ total }}</p>

    <div
      v-if="pending"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="n in perPage"
        :key="n"
        class="h-80 animate-pulse rounded-2xl bg-neutral-100"
      />
    </div>
    <div
      v-else-if="items.length"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ProductCard
        v-for="product in items"
        :key="product.id"
        :product="product"
        @order="onOrder"
      />
    </div>
    <div
      v-else
      class="grid place-items-center rounded-2xl border border-dashed border-neutral-300 py-20 text-muted"
    >
      Товары не найдены
    </div>

    <UiPagination
      :page="page"
      :total-pages="totalPages"
      @prev="emit('prev')"
      @next="emit('next')"
    />
  </div>
</template>
