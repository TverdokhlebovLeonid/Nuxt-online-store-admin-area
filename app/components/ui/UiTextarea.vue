<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  rows?: number
  required?: boolean
}>()

const model = defineModel<string>()

const id = useId()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :for="id"
      class="text-sm font-medium text-ink"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>
    <textarea
      :id="id"
      v-model="model"
      :placeholder="placeholder"
      :rows="rows || 4"
      class="w-full resize-y rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-ink outline-none transition placeholder:text-muted/60 focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
    />
  </div>
</template>
