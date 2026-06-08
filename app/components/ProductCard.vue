<script setup lang="ts">
import type { Product } from '@/types/product'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  order: [product: Product]
}>()
</script>

<template>
  <UiCard
    :padding="false"
    hover
    class="group flex flex-col overflow-hidden"
  >
    <NuxtLink
      :to="`/product/${product.slug}`"
      class="flex flex-1 flex-col"
    >
      <div class="relative aspect-4/3 overflow-hidden bg-neutral-50">
        <span
          v-if="product.sale"
          class="absolute left-3 top-3 z-10 rounded-lg bg-red-600 px-2 py-1 text-xs font-bold text-white"
        >
          Скидка
        </span>
        <NuxtImg
          :src="productImageSrc(product.img)"
          :alt="product.name"
          width="400"
          height="300"
          loading="lazy"
          class="size-full object-contain p-4 transition duration-300 group-hover:scale-105"
        />
      </div>
      <div class="flex flex-1 flex-col gap-2 p-5">
        <h3 class="line-clamp-2 font-semibold text-ink">{{ product.name }}</h3>
        <p class="line-clamp-3 flex-1 text-sm text-muted">{{ product.shortDescription }}</p>
        <UiPriceTag
          :price="product.price"
          :sale-price="product.salePrice"
          :sale="product.sale"
          class="mt-2"
        />
      </div>
    </NuxtLink>
    <div class="px-5 pb-5">
      <UiButton
        block
        label="В корзину"
        @click="emit('order', product)"
      />
    </div>
  </UiCard>
</template>
