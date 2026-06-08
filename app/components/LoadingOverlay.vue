<script setup lang="ts">
const loadingStore = useLoadingStore()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loadingStore.active"
      class="fixed inset-0 z-50 grid place-items-center bg-white/80 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-4">
        <UiSpinner class="size-12 text-brand-600" />
        <p class="text-sm font-medium text-muted">Отправка…</p>
      </div>
    </div>
  </Transition>
</template>
