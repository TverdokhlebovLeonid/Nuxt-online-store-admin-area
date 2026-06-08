import type { Category } from '@/types/product'

export function useCategories() {
  return useHttpData<Category[]>(
    'categories',
    (fetch): Promise<Category[]> => fetch<Category[]>('/api/categories'),
    { default: (): Category[] => [] },
  )
}
