<script setup lang="ts">
type Variant = 'neutral' | 'brand' | 'danger' | 'muted' | 'plain'
type Size = 'sm' | 'md' | 'lg'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    type?: 'button' | 'submit' | 'reset'
    to?: string
    label: string
    disabled?: boolean
  }>(),
  {
    variant: 'neutral',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)

const variantClasses: Record<Variant, string> = {
  neutral: 'text-muted transition hover:bg-neutral-100 hover:text-ink',
  brand: 'text-ink transition hover:bg-brand-50 hover:text-brand-700',
  danger: 'text-muted transition hover:bg-red-50 hover:text-red-600',
  muted: 'text-muted transition hover:text-ink',
  plain: 'shrink-0 opacity-80 transition hover:opacity-100',
}

const sizeClasses: Record<Size, string> = {
  sm: 'grid size-8 place-items-center rounded-lg',
  md: 'grid size-9 place-items-center rounded-lg',
  lg: 'grid size-11 place-items-center rounded-xl',
}

const classes = computed(() => [
  'cursor-pointer disabled:cursor-not-allowed disabled:opacity-40',
  variantClasses[props.variant],
  props.variant !== 'plain' && sizeClasses[props.size],
  props.variant !== 'plain' && 'relative',
])
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    :aria-label="label"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
    <span
      v-if="$slots.badge"
      class="absolute -right-0.5 -top-0.5"
    >
      <slot name="badge" />
    </span>
  </NuxtLink>
  <button
    v-else
    :type="type"
    :aria-label="label"
    :disabled="disabled"
    :class="classes"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
