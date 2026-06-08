<script setup lang="ts">
const props = defineProps<{
  showMessage?: boolean
  messageLabel?: string
  messagePlaceholder?: string
}>()

const name = defineModel<string>('name', { required: true })
const phone = defineModel<string>('phone', { required: true })
const email = defineModel<string>('email', { required: true })
const message = defineModel<string>('message', { default: '' })
const consent = defineModel<boolean>('consent', { required: true })

type ContactField =
  | {
      kind: 'input'
      key: 'name' | 'phone' | 'email'
      label: string
      type?: string
      placeholder: string
      required?: boolean
    }
  | {
      kind: 'textarea'
      key: 'message'
      label: string
      placeholder?: string
      rows?: number
    }

const inputFields: ContactField[] = [
  { kind: 'input', key: 'name', label: 'Имя', placeholder: 'Иван', required: true },
  {
    kind: 'input',
    key: 'phone',
    label: 'Телефон',
    type: 'tel',
    placeholder: '+7 (___) ___-__-__',
    required: true,
  },
  {
    kind: 'input',
    key: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'mail@example.com',
    required: true,
  },
]

const fields = computed<ContactField[]>(() => {
  const list: ContactField[] = [...inputFields]

  if (props.showMessage) {
    list.push({
      kind: 'textarea',
      key: 'message',
      label: props.messageLabel || 'Сообщение',
      placeholder: props.messagePlaceholder,
      rows: 3,
    })
  }

  return list
})

type InputFieldKey = 'name' | 'phone' | 'email'

const inputModels = { name, phone, email } as const

function getInputValue(key: InputFieldKey): string {
  return inputModels[key].value
}

function setInputValue(key: InputFieldKey, value: string | number | undefined) {
  inputModels[key].value = value == null ? '' : String(value)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <template
      v-for="field in fields"
      :key="field.key"
    >
      <UiInput
        v-if="field.kind === 'input'"
        :model-value="getInputValue(field.key)"
        :label="field.label"
        :type="field.type"
        :placeholder="field.placeholder"
        :required="field.required"
        @update:model-value="setInputValue(field.key, $event)"
      />
      <UiTextarea
        v-else-if="field.kind === 'textarea'"
        v-model="message"
        :label="field.label"
        :placeholder="field.placeholder"
        :rows="field.rows"
      />
    </template>

    <UiCheckbox v-model="consent"> Я согласен на обработку персональных данных </UiCheckbox>
  </div>
</template>
