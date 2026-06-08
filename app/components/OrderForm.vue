<script setup lang="ts">
const emit = defineEmits<{
  done: []
}>()

const cartStore = useCartStore()

const { form, consent, canSubmit, sent, resultMessage, submit, reset } = useContactForm({
    type: 'order',
    buildOrder: () => ({
      items: cartStore.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      itemCount: cartStore.count,
      totalPrice: cartStore.totalPrice,
    }),
    onSuccess: () => cartStore.clearCart(),
  })

function handleClose() {
  reset()
  emit('done')
}
</script>

<template>
  <div>
    <div
      v-if="!sent"
      class="flex flex-col gap-5"
    >
      <ContactFormFields
        v-model:name="form.name"
        v-model:phone="form.phone"
        v-model:email="form.email"
        v-model:message="form.message"
        v-model:consent="consent"
        show-message
        message-label="Адрес доставки"
        message-placeholder="Город, улица, дом…"
      />

      <UiButton
        block
        size="lg"
        label="Отправить заказ"
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
