<script setup lang="ts">
import type { SiteSettingsPayload } from '#shared/types/site'

const props = defineProps<{
  initial: SiteSettingsPayload
  pending?: boolean
}>()

const emit = defineEmits<{
  submit: [payload: SiteSettingsPayload]
}>()

const form = reactive<SiteSettingsPayload>({
  phone: props.initial.phone,
  phoneTel: props.initial.phoneTel,
  city: props.initial.city,
  streetAddress: props.initial.streetAddress,
  extraAddresses: [...props.initial.extraAddresses],
})

const extraAddressesText = computed({
  get: () => form.extraAddresses.join('\n'),
  set: (value: string) => {
    form.extraAddresses = linesToArray(value)
  },
})

watch(
  () => props.initial,
  (value) => {
    form.phone = value.phone
    form.phoneTel = value.phoneTel
    form.city = value.city
    form.streetAddress = value.streetAddress
    form.extraAddresses = [...value.extraAddresses]
  },
)

type SettingsField =
  | {
      kind: 'input'
      key: 'phone' | 'phoneTel' | 'city' | 'streetAddress'
      label: string
      placeholder: string
      required?: boolean
      hint?: string
    }
  | {
      kind: 'textarea'
      key: 'extraAddresses'
      label: string
      placeholder: string
      rows?: number
      hint?: string
    }

const settingsFields: SettingsField[] = [
  {
    kind: 'input',
    key: 'phone',
    label: 'Телефон (отображение)',
    placeholder: '+7 (900) 000-00-00',
    required: true,
  },
  {
    kind: 'input',
    key: 'phoneTel',
    label: 'Телефон (ссылка tel:)',
    placeholder: '+79001112233',
    required: true,
    hint: 'Только цифры после +, без пробелов и скобок',
  },
  {
    kind: 'input',
    key: 'city',
    label: 'Город',
    placeholder: 'Москва',
    required: true,
  },
  {
    kind: 'input',
    key: 'streetAddress',
    label: 'Улица и дом',
    placeholder: 'Верхнелихоборская ул, 8А',
    required: true,
  },
  {
    kind: 'textarea',
    key: 'extraAddresses',
    label: 'Дополнительные адреса',
    placeholder: 'По одному адресу на строку',
    rows: 4,
    hint: 'Отображаются на странице «Контакты» после основного адреса',
  },
]

function submit() {
  emit('submit', { ...form, extraAddresses: [...form.extraAddresses] })
}
</script>

<template>
  <form
    class="flex max-w-2xl flex-col gap-5"
    @submit.prevent="submit"
  >
    <template
      v-for="field in settingsFields"
      :key="field.key"
    >
      <UiInput
        v-if="field.kind === 'input'"
        v-model="form[field.key]"
        :label="field.label"
        :placeholder="field.placeholder"
        :required="field.required"
      />
      <UiTextarea
        v-else-if="field.kind === 'textarea'"
        v-model="extraAddressesText"
        :label="field.label"
        :placeholder="field.placeholder"
        :rows="field.rows"
      />
      <p
        v-if="field.hint"
        class="-mt-3 text-xs text-muted"
      >
        {{ field.hint }}
      </p>
    </template>

    <div class="flex gap-3">
      <UiButton
        type="submit"
        label="Сохранить"
        :loading="pending"
      />
    </div>
  </form>
</template>
