<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    showText?: boolean
    hideTextOnMobile?: boolean
  }>(),
  {
    size: 'md',
    showText: true,
    hideTextOnMobile: false,
  },
)

const iconClass = computed(() => {
  const sizes = {
    sm: 'size-8 rounded-lg text-sm',
    md: 'size-9 rounded-xl',
    lg: 'size-12 rounded-2xl text-lg',
  }
  return sizes[props.size]
})

const textClass = computed(() => {
  const base = 'font-bold tracking-tight text-ink'
  return props.hideTextOnMobile ? `hidden text-lg sm:block ${base}` : `text-lg ${base}`
})
</script>

<template>
  <div class="flex items-center gap-2">
    <span
      class="grid place-items-center bg-brand-600 font-black text-white"
      :class="iconClass"
    >
      SK
    </span>
    <span
      v-if="showText"
      :class="textClass"
    >
      Search<span class="text-brand-600">klad</span>
    </span>
  </div>
</template>
