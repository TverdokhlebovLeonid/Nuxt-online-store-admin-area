<script setup lang="ts">
usePageSeo({
  title: 'О компании Search klad',
  description:
    'Search klad — официальный поставщик металлоискателей АКА более 20 лет. Гарантия, сервис, доставка по России.',
  path: '/about',
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl font-bold text-ink">О компании</h1>
    <UiCard class="space-y-3 leading-relaxed text-muted">
      <p>
        Search klad — официальный поставщик поисковой и досмотровой техники фирмы АКА. Более 20 лет
        мы производим металлоискатели высокого класса и поставляем оборудование государственным
        органам и частным клиентам по всей России.
      </p>
      <p>
        Гарантируем оригинальную продукцию, профессиональную консультацию и сервисную поддержку
        после продажи.
      </p>
    </UiCard>
  </div>
</template>
