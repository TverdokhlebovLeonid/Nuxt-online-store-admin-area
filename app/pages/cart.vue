<script setup lang="ts">
import { formatPrice } from '#shared/utils/format'

const { ready, items, isEmpty, totalPrice, count, cartStore } = useCartHydrated()
const { confirm } = useConfirm()

const orderOpen = ref(false)

usePageSeo({
  title: 'Корзина',
  description: 'Оформление заказа металлоискателей в интернет-магазине Search klad.',
  path: '/cart',
  robots: 'noindex, nofollow',
})

async function removeItem(item: (typeof items.value)[number]) {
  const ok = await confirm({
    title: 'Убрать из корзины',
    message: `Убрать «${item.name}» из корзины?`,
    confirmLabel: 'Убрать',
  })
  if (ok) cartStore.removeFromCart(item)
}

async function clearCart() {
  const ok = await confirm({
    title: 'Очистить корзину',
    message: 'Удалить все товары из корзины?',
    confirmLabel: 'Очистить',
  })
  if (ok) cartStore.clearCart()
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl font-bold text-ink">Корзина</h1>

    <div
      v-if="!ready"
      class="grid gap-6 lg:grid-cols-3"
      aria-hidden="true"
    >
      <div class="flex flex-col gap-4 lg:col-span-2">
        <div
          v-for="index in 2"
          :key="index"
          class="h-32 animate-pulse rounded-2xl bg-neutral-100"
        />
      </div>
      <div class="h-56 animate-pulse rounded-2xl bg-neutral-100 lg:col-span-1" />
    </div>

    <div
      v-else-if="isEmpty"
      class="grid place-items-center gap-4 rounded-2xl border border-dashed border-neutral-300 py-20 text-center"
    >
      <div class="grid size-16 place-items-center rounded-full bg-neutral-100 text-muted">
        <IconCart class="size-8" />
      </div>
      <p class="text-lg font-medium text-ink">В корзине пока пусто</p>
      <UiButton
        to="/store"
        label="Перейти в магазин"
      />
    </div>

    <div
      v-else
      class="grid gap-6 lg:grid-cols-3"
    >
      <div class="flex flex-col gap-4 lg:col-span-2">
        <UiCard
          v-for="item in items"
          :key="item.id"
          class="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
          <NuxtLink
            :to="`/product/${item.slug}`"
            class="grid size-24 shrink-0 place-items-center rounded-xl bg-neutral-50 p-2"
          >
            <NuxtImg
              :src="productImageSrc(item.img)"
              :alt="item.name"
              width="96"
              height="96"
              loading="lazy"
              class="max-h-full object-contain"
            />
          </NuxtLink>

          <div class="flex-1">
            <NuxtLink
              :to="`/product/${item.slug}`"
              class="font-semibold text-ink transition hover:text-brand-700"
            >
              {{ item.name }}
            </NuxtLink>
            <p class="mt-1 text-sm text-muted">{{ formatPrice(item.price) }} / шт.</p>
          </div>

          <div class="flex items-center gap-3">
            <div class="flex items-center rounded-xl border border-neutral-200">
              <UiButtonIcon
                variant="muted"
                label="Уменьшить количество"
                class="text-lg"
                :disabled="item.quantity <= 1"
                @click="cartStore.decreaseQuantity(item)"
              >
                −
              </UiButtonIcon>
              <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
              <UiButtonIcon
                variant="muted"
                label="Увеличить количество"
                class="text-lg"
                @click="cartStore.increaseQuantity(item)"
              >
                +
              </UiButtonIcon>
            </div>

            <span class="w-24 text-right font-semibold text-ink">{{
              formatPrice(item.totalPrice)
            }}</span>

            <UiButtonIcon
              variant="danger"
              label="Удалить"
              @click="removeItem(item)"
            >
              <IconTrash class="size-5" />
            </UiButtonIcon>
          </div>
        </UiCard>
      </div>

      <div class="lg:col-span-1">
        <UiCard class="sticky top-24 flex flex-col gap-4">
          <h2 class="text-lg font-semibold text-ink">Итого</h2>
          <div class="flex justify-between text-sm text-muted">
            <span>Товаров</span>
            <span>{{ count }} шт.</span>
          </div>
          <div
            class="flex justify-between border-t border-neutral-100 pt-4 text-lg font-bold text-ink"
          >
            <span>Сумма</span>
            <span>{{ formatPrice(totalPrice) }}</span>
          </div>
          <UiButton
            block
            size="lg"
            label="Оформить заказ"
            @click="orderOpen = true"
          />
          <button
            type="button"
            class="text-sm text-muted underline-offset-2 transition hover:text-red-600 hover:underline"
            @click="clearCart"
          >
            Очистить корзину
          </button>
        </UiCard>
      </div>
    </div>

    <UiModal
      v-model="orderOpen"
      title="Оформление заказа"
    >
      <OrderForm @done="orderOpen = false" />
    </UiModal>
  </div>
</template>
