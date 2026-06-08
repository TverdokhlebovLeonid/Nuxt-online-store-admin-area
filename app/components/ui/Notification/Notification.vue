<script setup lang="ts">
import type { NotificationItem, NotificationStyles } from '@/types/notification'

const props = defineProps<{
  message: NotificationItem
}>()

const emit = defineEmits<{
  close: []
}>()

const styles: NotificationStyles = {
  success: { class: 'bg-brand-600 text-white', icon: 'IconCheck' },
  error: { class: 'bg-red-600 text-white', icon: 'IconClose' },
  warning: { class: 'bg-amber-400 text-ink', icon: 'IconShield' },
  info: { class: 'bg-sky-600 text-white', icon: 'IconChat' },
}

const style = computed(() => styles[props.message.type])

let timer: ReturnType<typeof setTimeout> | undefined

function dismiss() {
  if (timer) clearTimeout(timer)
  emit('close')
}

onMounted(() => {
  timer = setTimeout(dismiss, props.message.duration)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <div
    role="alert"
    class="flex w-80 max-w-[calc(100vw-2rem)] items-start gap-3 rounded-xl p-4 shadow-soft"
    :class="style.class"
  >
    <component
      :is="style.icon"
      class="mt-0.5 size-5 shrink-0"
    />
    <p class="min-w-0 flex-1 text-sm font-medium leading-snug">
      {{ message.text }}
    </p>
    <UiButtonIcon
      variant="plain"
      label="Закрыть"
      @click="dismiss"
    >
      <IconClose class="size-4" />
    </UiButtonIcon>
  </div>
</template>
