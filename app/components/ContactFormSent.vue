<script setup lang="ts">
defineProps<{
  message: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-6 text-center">
    <div class="grid size-14 place-items-center rounded-full bg-brand-50 text-brand-600">
      <IconCheck class="size-7" />
    </div>
    <p class="text-lg font-medium text-ink">{{ message }}</p>
    <UiButton
      variant="secondary"
      label="Закрыть"
      @click="emit('close')"
    />
  </div>
</template>
