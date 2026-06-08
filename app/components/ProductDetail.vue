<script setup lang="ts">
import type { Product } from '@/types/product'
import { buildBreadcrumbSchema } from '@/utils/schema'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  order: []
}>()

const { siteUrl } = useSiteConfig()
const { data: categories } = useCategories()

const categoryName = computed(
  () =>
    categories.value?.find((category) => category.slug === props.product.category)?.name ??
    props.product.category,
)

const breadcrumbItems = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Магазин', to: '/store' },
  { label: categoryName.value, to: `/category/${props.product.category}` },
  { label: props.product.name },
])

useStructuredData(() => buildBreadcrumbSchema(siteUrl.value, breadcrumbItems.value), 'breadcrumbs')
</script>

<template>
  <div class="flex flex-col gap-8">
    <Breadcrumbs :items="breadcrumbItems" />

    <div class="grid gap-8 lg:grid-cols-2">
      <UiCard
        :padding="false"
        class="grid place-items-center overflow-hidden bg-white p-8"
      >
        <NuxtImg
          :src="productImageSrc(product.img)"
          :alt="product.name"
          width="640"
          height="420"
          fetchpriority="high"
          class="max-h-[420px] w-full object-contain"
        />
      </UiCard>

      <div class="flex flex-col gap-5">
        <div>
          <p class="text-sm font-medium text-brand-700">
            <NuxtLink
              :to="`/category/${product.category}`"
              class="transition hover:underline"
            >
              {{ product.type || categoryName }}
            </NuxtLink>
          </p>
          <h1 class="mt-1 text-2xl font-bold text-ink lg:text-3xl">{{ product.name }}</h1>
        </div>

        <UiPriceTag
          :price="product.price"
          :sale-price="product.salePrice"
          :sale="product.sale"
          size="lg"
        />

        <UiButton
          size="lg"
          class="sm:w-fit"
          label="Добавить в корзину"
          @click="emit('order')"
        />

        <UiCard class="bg-neutral-50/60">
          <h2 class="text-sm font-semibold text-ink">Характеристики</h2>
          <ul class="mt-3 space-y-2">
            <li
              v-for="(item, index) in product.specs"
              :key="index"
              class="flex gap-2 text-sm text-muted"
            >
              <span class="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-500" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </UiCard>
      </div>
    </div>

    <UiCard>
      <h2 class="text-lg font-semibold text-ink">Описание</h2>
      <div class="mt-4 space-y-3 leading-relaxed text-muted">
        <p
          v-for="(paragraph, index) in product.description"
          :key="index"
        >
          {{ paragraph }}
        </p>
      </div>
      <p class="mt-4 text-sm text-ink">
        <strong>Страна производитель:</strong> {{ product.country }}
      </p>
    </UiCard>
  </div>
</template>
