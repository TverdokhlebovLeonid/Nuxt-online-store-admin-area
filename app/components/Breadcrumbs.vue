<script setup lang="ts">
defineProps<{
  items: { label: string; to?: string }[]
}>()
</script>

<template>
  <nav aria-label="Хлебные крошки">
    <ol class="flex flex-wrap items-center gap-2 text-sm text-muted">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="transition hover:text-brand-700"
        >
          {{ item.label }}
        </NuxtLink>
        <span
          v-else
          class="truncate text-ink"
          aria-current="page"
        >
          {{ item.label }}
        </span>
        <span
          v-if="index < items.length - 1"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>
