<script setup lang="ts">
import { pluralProducts } from '#shared/utils/format'
import { buildBreadcrumbSchema, buildCategorySchema } from '@/utils/schema'

const { category, slug } = await useCategory()
const { siteUrl } = useSiteConfig()

const {
  items,
  total,
  totalPages,
  page,
  perPage,
  sort,
  search,
  pending,
  nextPage,
  prevPage,
} = useProductListing({ category: () => slug.value })

const productCountLabel = computed(() => pluralProducts(total.value))

const description = computed(
  () =>
    `${category.value.name} — ${total.value} ${productCountLabel.value} в каталоге Search klad. Оригинальная продукция АКА, доставка по России.`,
)

const breadcrumbItems = computed(() => [
  { label: 'Главная', to: '/' },
  { label: 'Магазин', to: '/store' },
  { label: category.value.name },
])

usePageSeo({
  title: () => category.value.name,
  description,
  path: () => `/category/${slug.value}`,
})

useStructuredData(() => buildBreadcrumbSchema(siteUrl.value, breadcrumbItems.value), 'breadcrumbs')
useStructuredData(
  () => buildCategorySchema(siteUrl.value, category.value, total.value),
  'category',
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <Breadcrumbs :items="breadcrumbItems" />
    <header>
      <h1 class="text-3xl font-bold text-ink">{{ category.name }}</h1>
      <p class="mt-1 text-muted">
        {{ total }} {{ productCountLabel }} в категории
      </p>
    </header>
    <StoreCatalog
      v-model:search="search"
      v-model:sort="sort"
      v-model:per-page="perPage"
      :items="items"
      :total="total"
      :total-pages="totalPages"
      :page="page"
      :pending="pending"
      @prev="prevPage"
      @next="nextPage"
    />
  </div>
</template>
