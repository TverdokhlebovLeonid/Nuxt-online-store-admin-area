<script setup lang="ts">
import type { SortKey } from '@/types/product'
import { SORT_OPTIONS } from '@/constants/catalog'

const search = defineModel<string>('search', { required: true })
const sort = defineModel<SortKey>('sort', { required: true })
const perPage = defineModel<number>('perPage', { required: true })

const pageSizes = [8, 12, 24] as const
</script>

<template>
  <div
    class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-soft"
  >
    <UiInput
      v-model.trim="search"
      type="search"
      size="sm"
      placeholder="Поиск по названию…"
      class="w-full sm:w-72"
    >
      <template #leading>
        <IconSearch class="size-4 text-muted" />
      </template>
    </UiInput>

    <div class="flex items-center gap-3">
      <UiSelect
        v-model="sort"
        :options="SORT_OPTIONS"
        prefix="Сортировать"
      />
      <UiSegmentedControl
        v-model="perPage"
        :options="pageSizes"
        class="hidden sm:inline-flex"
      />
    </div>
  </div>
</template>
