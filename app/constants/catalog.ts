import type { SortKey } from '@/types/product'

export const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: 'популярности', value: 'popularity' },
  { label: 'возрастанию цены', value: 'priceAsc' },
  { label: 'убыванию цены', value: 'priceDesc' },
]
