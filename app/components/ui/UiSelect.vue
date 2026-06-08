<script setup lang="ts" generic="T extends string | number">
defineProps<{
  options: { label: string; value: T }[]
  label?: string
  prefix?: string
  error?: string
  required?: boolean
}>()

const model = defineModel<T>({ required: true })

const open = ref(false)
const root = ref<HTMLElement | null>(null)
const labelId = useId()

function select(value: T) {
  model.value = value
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (root.value && !root.value.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onUnmounted(() => document.removeEventListener('click', onDocumentClick))
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label
      v-if="label"
      :id="labelId"
      class="text-sm font-medium text-ink"
    >
      {{ label }}
      <span
        v-if="required"
        class="text-red-500"
      >
        *
      </span>
    </label>
    <div
      ref="root"
      class="relative"
    >
      <button
        type="button"
        class="flex w-full items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium text-ink transition hover:border-brand-400 cursor-pointer"
        :class="error ? 'border-red-400 hover:border-red-500' : 'border-neutral-300'"
        :aria-labelledby="label ? labelId : undefined"
        @click="open = !open"
      >
        <span
          v-if="prefix"
          class="text-muted"
        >
          {{ prefix }}:
        </span>
        <span>{{ options.find((o) => o.value === model)?.label }}</span>
        <IconChevronDown
          class="ml-auto size-4 shrink-0 text-muted transition cursor-pointer hover:text-brand-500"
          :class="open && 'rotate-180'"
        />
      </button>
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition duration-100 ease-in"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <ul
          v-if="open"
          class="absolute z-30 mt-2 min-w-full overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-card"
        >
          <li
            v-for="option in options"
            :key="String(option.value)"
          >
            <button
              type="button"
              class="block w-full px-4 py-2 text-left text-sm transition hover:bg-brand-50 cursor-pointer"
              :class="option.value === model ? 'font-semibold text-brand-700' : 'text-ink'"
              @click="select(option.value)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
      </Transition>
    </div>
    <p
      v-if="error"
      class="text-xs text-red-600"
    >
      {{ error }}
    </p>
  </div>
</template>
