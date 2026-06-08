<script setup lang="ts">
const emit = defineEmits<{
  sent: []
}>()

const { form, consent, canSubmit, sent, resultMessage, submit, reset } = useContactForm({
  type: 'callback',
})

function handleClose() {
  reset()
  emit('sent')
}
</script>

<template>
  <div>
    <div
      v-if="!sent"
      class="flex flex-col gap-5"
    >
      <p class="text-sm text-muted">
        Оставьте контакты — менеджер перезвонит вам в ближайшее время.
      </p>

      <ContactFormFields
        v-model:name="form.name"
        v-model:phone="form.phone"
        v-model:email="form.email"
        v-model:message="form.message"
        v-model:consent="consent"
        show-message
        message-label="Сообщение"
        message-placeholder="Текст письма"
      />

      <UiButton
        block
        size="lg"
        label="Отправить"
        :disabled="!canSubmit"
        @click="submit"
      />
    </div>

    <ContactFormSent
      v-else
      :message="resultMessage"
      @close="handleClose"
    />
  </div>
</template>
