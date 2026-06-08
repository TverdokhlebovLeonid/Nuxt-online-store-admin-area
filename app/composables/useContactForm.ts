import type { ContactOrderPayload } from '@/repository/contact'

interface ContactFormOptions {
  type: 'callback' | 'order'
  buildOrder?: () => ContactOrderPayload
  onSuccess?: () => void
}

const PATTERNS = {
  name: /^[A-Za-zА-Яа-яЁё]{2,30}$/,
  phone: /^[\d\s+()-]{7,20}$/,
  email: /^[^@]+@[^@]+\.[a-zA-Z]{2,6}/,
}

export function useContactForm(options: ContactFormOptions) {
  const { $api } = useNuxtApp()
  const loadingStore = useLoadingStore()
  const notify = useNotification()
  const successMessage =
    options.type === 'order' ? 'Заказ успешно отправлен' : 'Заявка успешно отправлена'

  const form = reactive({
    name: '',
    phone: '',
    email: '',
    message: '',
  })

  const consent = ref(false)
  const sent = ref(false)
  const resultMessage = ref('')

  const canSubmit = computed(
    () =>
      PATTERNS.name.test(form.name) &&
      PATTERNS.phone.test(form.phone) &&
      PATTERNS.email.test(form.email) &&
      consent.value,
  )

  async function submit() {
    loadingStore.start()

    try {
      await $api.contact.send({
        type: options.type,
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        order: options.buildOrder?.(),
      })
      resultMessage.value = 'Спасибо! Ваше сообщение отправлено.'
      sent.value = true
      notify.success(successMessage)
      options.onSuccess?.()
    } catch {
      resultMessage.value = 'Ошибка! Попробуйте позже.'
      sent.value = true
    } finally {
      loadingStore.finish()
    }
  }

  function reset() {
    form.name = ''
    form.phone = ''
    form.email = ''
    form.message = ''
    consent.value = false
    sent.value = false
  }

  return {
    form,
    consent,
    canSubmit,
    sent,
    resultMessage,
    submit,
    reset,
  }
}
