<script setup lang="ts">
import type { Product, ProductPayload } from '@/types/product'

const props = defineProps<{
  product?: Product
  submitLabel?: string
  pending?: boolean
}>()

const emit = defineEmits<{
  submit: [payload: ProductPayload]
}>()

const { $api } = useNuxtApp()
const { data: categories } = useCategories()
const { run, pending: uploadPending } = useAdminAction()
const { confirm } = useConfirm()

const form = reactive<ProductPayload>({
  name: props.product?.name ?? '',
  slug: props.product?.slug ?? '',
  price: props.product?.price ?? 0,
  salePrice: props.product?.salePrice ?? 0,
  brand: props.product?.brand ?? 'АКА',
  category: props.product?.category ?? '',
  type: props.product?.type ?? '',
  shortDescription: props.product?.shortDescription ?? '',
  description: props.product?.description ?? [],
  specs: props.product?.specs ?? [],
  country: props.product?.country ?? 'Россия',
  sale: props.product?.sale ?? false,
  img: props.product?.img ?? '',
})

const fileInput = ref<HTMLInputElement | null>(null)

async function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  await run(
    async () => {
      const { path } = await $api.upload.image(file)
      form.img = path
    },
    { successMessage: 'Изображение загружено' },
  )
  input.value = ''
}

async function removeImage() {
  const ok = await confirm({
    title: 'Убрать изображение',
    message: 'Удалить изображение товара?',
    confirmLabel: 'Убрать',
  })
  if (ok) form.img = ''
}

const descriptionText = ref(form.description.join('\n'))
const specsText = ref(form.specs.join('\n'))

const categoryOptions = computed(() =>
  (categories.value ?? []).map((category) => ({ label: category.name, value: category.slug })),
)

type MainField =
  | {
      kind: 'input'
      key: 'name' | 'slug' | 'type' | 'brand' | 'country'
      label: string
      placeholder?: string
      errorKey?: 'name' | 'slug'
      required?: boolean
    }
  | {
      kind: 'select'
      key: 'category'
      label: string
      errorKey: 'category'
      required?: boolean
    }

const mainFields: MainField[] = [
  { kind: 'input', key: 'name', label: 'Название', errorKey: 'name', required: true },
  { kind: 'input', key: 'slug', label: 'Slug (URL)', errorKey: 'slug', required: true },
  { kind: 'select', key: 'category', label: 'Категория', errorKey: 'category', required: true },
  { kind: 'input', key: 'type', label: 'Тип', placeholder: 'Грунтовые металлоискатели' },
  { kind: 'input', key: 'brand', label: 'Бренд' },
  { kind: 'input', key: 'country', label: 'Страна' },
]

const errors = reactive<Record<string, string>>({})

function validate(): boolean {
  errors.name = form.name.trim().length < 2 ? 'Минимум 2 символа' : ''
  errors.slug = /^[\w.-]+$/.test(form.slug) ? '' : 'Только латиница, цифры, дефис, точка, _'
  errors.category = form.category ? '' : 'Выберите категорию'
  errors.price = form.price >= 0 ? '' : 'Некорректная цена'
  return !errors.name && !errors.slug && !errors.category && !errors.price
}

function submit() {
  if (!validate()) return

  emit('submit', {
    ...form,
    price: Number(form.price),
    salePrice: Number(form.salePrice),
    description: linesToArray(descriptionText.value),
    specs: linesToArray(specsText.value),
  })
}
</script>

<template>
  <form
    class="flex flex-col gap-6"
    @submit.prevent="submit"
  >
    <div class="grid gap-6 lg:grid-cols-2">
      <UiCard class="flex flex-col gap-4">
        <h2 class="text-sm font-semibold text-ink">Основное</h2>
        <template
          v-for="field in mainFields"
          :key="field.key"
        >
          <UiSelect
            v-if="field.kind === 'select' && categoryOptions.length"
            v-model="form.category"
            :options="categoryOptions"
            :label="field.label"
            :error="errors[field.errorKey]"
            :required="field.required"
          />
          <UiInput
            v-else-if="field.kind === 'input'"
            v-model="form[field.key]"
            :label="field.label"
            :placeholder="field.placeholder"
            :error="field.errorKey ? errors[field.errorKey] : undefined"
            :required="field.required"
          />
        </template>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-ink">Изображение</label>
          <div class="flex items-start gap-4">
            <div
              class="grid size-24 shrink-0 place-items-center overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50"
            >
              <img
                v-if="form.img"
                :src="form.img"
                alt="Превью"
                class="size-full object-contain"
              />
              <span
                v-else
                class="px-1 text-center text-xs text-muted"
              >
                Нет фото
              </span>
            </div>
            <div class="flex flex-1 flex-col gap-2">
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onFileChange"
              />
              <div class="flex flex-wrap gap-2">
                <UiButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  label="Загрузить с компьютера"
                  :loading="uploadPending"
                  @click="fileInput?.click()"
                />
                <UiButton
                  v-if="form.img"
                  type="button"
                  variant="ghost"
                  size="sm"
                  label="Убрать"
                  @click="removeImage"
                />
              </div>
              <p class="text-xs text-muted">JPG, PNG, WEBP, GIF · до 5 МБ</p>
            </div>
          </div>
          <UiInput
            v-model="form.img"
            placeholder="или укажите путь: /images/..."
          />
        </div>
      </UiCard>

      <UiCard class="flex flex-col gap-4">
        <h2 class="text-sm font-semibold text-ink">Цена</h2>
        <UiInput
          v-model.number="form.price"
          label="Цена, ₽"
          type="number"
          :error="errors.price"
          required
        />
        <UiInput
          v-model.number="form.salePrice"
          label="Цена со скидкой, ₽"
          type="number"
        />
        <UiCheckbox v-model="form.sale">Товар по акции (показывать скидку)</UiCheckbox>

        <h2 class="mt-2 text-sm font-semibold text-ink">Краткое описание</h2>
        <UiTextarea
          v-model="form.shortDescription"
          :rows="3"
          placeholder="Короткое описание для карточки"
        />
      </UiCard>
    </div>

    <UiCard class="flex flex-col gap-4">
      <h2 class="text-sm font-semibold text-ink">Подробное описание</h2>
      <UiTextarea
        v-model="descriptionText"
        :rows="6"
        placeholder="Один абзац на строку"
      />
      <p class="text-xs text-muted">Каждая строка — отдельный абзац.</p>

      <h2 class="mt-2 text-sm font-semibold text-ink">Характеристики</h2>
      <UiTextarea
        v-model="specsText"
        :rows="6"
        placeholder="Одна характеристика на строку"
      />
      <p class="text-xs text-muted">Каждая строка — отдельный пункт списка.</p>
    </UiCard>

    <div class="flex gap-3">
      <UiButton
        type="submit"
        size="lg"
        :label="submitLabel ?? 'Сохранить'"
        :loading="pending"
      />
      <UiButton
        to="/admin"
        variant="ghost"
        size="lg"
        label="Отмена"
      />
    </div>
  </form>
</template>
