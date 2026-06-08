<script setup lang="ts">
const model = defineModel<boolean>()

const id = useId()
</script>

<template>
  <label
    :for="id"
    class="flex cursor-pointer items-start gap-3 select-none"
  >
    <input
      :id="id"
      v-model="model"
      type="checkbox"
      class="peer sr-only"
    />
    <span
      class="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 border-neutral-300 bg-white text-white transition peer-checked:border-brand-600 peer-checked:bg-brand-600 peer-focus-visible:ring-2 peer-focus-visible:ring-brand-200"
      aria-hidden="true"
    >
      <IconCheck
        class="size-3"
        :stroke-width="3"
      />
    </span>
    <span class="text-sm text-muted">
      <slot />
    </span>
  </label>
</template>
