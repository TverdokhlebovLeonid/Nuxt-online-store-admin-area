import type { Category } from '@/types/product'

export async function useCategory(paramName = 'id'): Promise<{
  category: Ref<Category>
  slug: ComputedRef<string>
}> {
  const { data: category, slug } = await useRouteEntity<Category>('category', '/api/categories', {
    paramName,
  })

  return { category, slug }
}
