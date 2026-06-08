<script setup lang="ts">
defineOptions({ inheritAttrs: false })

defineProps<{
  options: readonly (string | number)[]
}>()

const model = defineModel<string | number>({ required: true })
</script>

<template>
  <div
    class="inline-flex items-center gap-1 rounded-lg border border-neutral-200 p-0.5"
    role="group"
    v-bind="$attrs"
  >
    <button
      v-for="option in options"
      :key="String(option)"
      type="button"
      class="cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition"
      :class="
        model === option ? 'bg-brand-600 text-white' : 'text-muted hover:bg-neutral-100'
      "
      :aria-pressed="model === option"
      @click="model = option"
    >
      <slot
        name="option"
        :option="option"
      >
        {{ option }}
      </slot>
    </button>
  </div>
</template>
