<script setup lang="ts">
usePageSeo({
  title: 'Каталог металлоискателей',
  description:
    'Интернет-магазин металлоискателей и металлодетекторов АКА. Катушки, аксессуары, доставка по Москве и регионам.',
  path: '/store',
})

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
} = useProductListing()
</script>

<template>
  <div class="flex flex-col gap-6">
    <header>
      <h1 class="text-3xl font-bold text-ink">Интернет-магазин</h1>
      <p class="mt-1 text-muted">Металлоискатели, катушки и аксессуары от производителя</p>
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
