<script setup lang="ts">
defineProps<{
  page: number
  totalPages: number
}>()

const emit = defineEmits<{
  prev: []
  next: []
}>()
</script>

<template>
  <div
    v-if="totalPages > 1"
    class="flex items-center justify-center gap-4"
  >
    <UiButton
      variant="secondary"
      size="sm"
      label="Назад"
      :disabled="page === 1"
      @click="emit('prev')"
    />
    <span class="text-sm text-muted">Страница {{ page }} из {{ totalPages }}</span>
    <UiButton
      variant="secondary"
      size="sm"
      label="Вперёд"
      :disabled="page >= totalPages"
      @click="emit('next')"
    />
  </div>
</template>
