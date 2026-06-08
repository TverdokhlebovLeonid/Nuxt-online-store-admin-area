<script setup lang="ts">
import { formatPrice } from '#shared/utils/format'

const props = withDefaults(
  defineProps<{
    price: number
    salePrice?: number
    sale?: boolean
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    sale: false,
    size: 'md',
  },
)

const sizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
}

const discount = computed(() => (props.sale ? props.price - (props.salePrice ?? props.price) : 0))
</script>

<template>
  <div class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
    <template v-if="!sale">
      <span
        class="font-bold text-ink"
        :class="sizes[size]"
      >
        {{ formatPrice(price) }}
      </span>
    </template>
    <template v-else>
      <span
        class="font-bold text-red-600"
        :class="sizes[size]"
      >
        {{ formatPrice(salePrice ?? price) }}
      </span>
      <span class="text-sm text-muted line-through">{{ formatPrice(price) }}</span>
      <span
        v-if="discount"
        class="rounded-md bg-red-50 px-1.5 py-0.5 text-xs font-semibold text-red-600"
      >
        −{{ formatPrice(discount) }}
      </span>
    </template>
  </div>
</template>
