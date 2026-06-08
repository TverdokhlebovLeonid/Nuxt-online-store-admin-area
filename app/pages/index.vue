<script setup lang="ts">
import type { ProductListResponse } from '@/types/product'
import { IconShield, IconChat, IconTag, IconTruck, IconRefresh } from '#components'

usePageSeo({
  title: 'Металлоискатели АКА — официальный интернет-магазин',
  description:
    'Search klad — российский производитель металлоискателей АКА. Оригинальная продукция, гарантия, доставка по России.',
  path: '/',
})

const cartStore = useCartStore()

const { data: featuredData } = await useHttpDataAsync('featured-products', (fetch) =>
  fetch<ProductListResponse>('/api/products', { query: { limit: 4 } }),
)
const featured = computed(() => featuredData.value?.items ?? [])

const advantages = [
  {
    title: 'Гарантия производителя',
    text: 'Гарантия до 2 лет, 100% оригинальная продукция.',
    icon: IconShield,
  },
  {
    title: 'Консультация менеджера',
    text: 'Грамотная консультация и поддержка после продажи.',
    icon: IconChat,
  },
  { title: 'Лучшая цена', text: 'Нашли дешевле? Мы продадим ещё выгоднее.', icon: IconTag },
  {
    title: 'Бесплатная доставка',
    text: 'Бесплатная доставка по стране при предоплате.',
    icon: IconTruck,
  },
  {
    title: 'Возврат товара',
    text: '3 месяца на возврат — вернём 100% при сохранной упаковке.',
    icon: IconRefresh,
  },
]
</script>

<template>
  <div class="flex flex-col gap-16">
    <section class="grid items-center gap-8 lg:grid-cols-2">
      <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold tracking-tight text-ink lg:text-4xl">
          Российский производитель металлоискателей АКА
        </h1>
        <p class="leading-relaxed text-muted">
          Поставщик поисковой и досмотровой техники для государственных органов. Более 20 лет
          выпускаем металлоискатели высокого класса на российском рынке.
        </p>
        <div class="flex flex-wrap gap-3">
          <UiButton
            to="/store"
            size="lg"
            label="Каталог товаров"
          />
          <UiButton
            to="/contacts"
            variant="secondary"
            size="lg"
            label="Контакты"
          />
        </div>
      </div>
      <UiCard
        :padding="false"
        class="overflow-hidden"
      >
        <NuxtImg
          src="/images/fsb.webp"
          alt="Металлоискатели АКА — продукция Search klad"
          width="640"
          height="480"
          loading="lazy"
          class="h-full w-full object-cover"
        />
      </UiCard>
    </section>

    <section class="flex flex-col gap-6">
      <div class="flex items-end justify-between">
        <div>
          <h2 class="text-2xl font-bold text-ink">Популярные товары</h2>
          <p class="mt-1 text-sm text-muted">Лучшие модели нашего каталога</p>
        </div>
        <UiButton
          to="/store"
          variant="ghost"
          size="sm"
          label="Все товары →"
        />
      </div>
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <ProductCard
          v-for="product in featured"
          :key="product.id"
          :product="product"
          @order="cartStore.addToCart"
        />
      </div>
    </section>

    <section class="rounded-3xl bg-brand-50/60 p-8 lg:p-12">
      <h2 class="text-center text-2xl font-bold text-ink">Почему клиенты выбирают нас</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in advantages"
          :key="item.title"
          class="flex gap-4 rounded-2xl bg-white p-5 shadow-soft"
        >
          <div class="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-600 text-white">
            <component
              :is="item.icon"
              class="size-6"
            />
          </div>
          <div>
            <h3 class="font-semibold text-ink">{{ item.title }}</h3>
            <p class="mt-1 text-sm text-muted">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
