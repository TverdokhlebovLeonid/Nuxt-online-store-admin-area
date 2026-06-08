<script setup lang="ts">
usePageSeo({
  title: 'Доставка металлоискателей',
  description:
    'Бесплатная доставка по Москве в пределах МКАД. Отправка металлоискателей по регионам России за 2–4 дня.',
  path: '/delivery',
})

const points = [
  'Тщательная упаковка перед отправкой по регионам осуществляется бесплатно.',
  'Доставка до выбранной вами транспортной компании бесплатна.',
  'При выборе доставки детали согласуются с персональным менеджером.',
  'Страхование отправления.',
  'Доставка до пункта выдачи либо курьером до двери.',
  'Средний срок доставки — 2–4 дня.',
]
</script>

<template>
  <div class="flex flex-col gap-8">
    <header>
      <h1 class="text-3xl font-bold text-ink">Доставка в пределах МКАД — бесплатно</h1>
      <p class="mt-1 text-muted">Доставляем по Москве и регионам России</p>
    </header>

    <div class="grid gap-4 sm:grid-cols-2">
      <UiCard
        v-for="(point, index) in points"
        :key="index"
        class="flex gap-4"
      >
        <span
          class="grid size-8 shrink-0 place-items-center rounded-full bg-brand-50 text-sm font-bold text-brand-700"
          aria-hidden="true"
        >
          {{ index + 1 }}
        </span>
        <p class="text-muted">{{ point }}</p>
      </UiCard>
    </div>
  </div>
</template>
