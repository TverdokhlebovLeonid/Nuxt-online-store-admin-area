<script setup lang="ts">
withDefaults(
  defineProps<{
    color?: 'brand' | 'red' | 'neutral'
  }>(),
  {
    color: 'red',
  },
)

const colors = {
  brand: 'bg-brand-600 text-white',
  red: 'bg-red-600 text-white',
  neutral: 'bg-neutral-200 text-ink',
}
</script>

<template>
  <span
    class="inline-flex min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold leading-5"
    :class="colors[color]"
  >
    <slot />
  </span>
</template>
