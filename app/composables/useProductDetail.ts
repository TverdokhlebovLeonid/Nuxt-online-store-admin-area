import type { Product } from '@/types/product'

export async function useProductDetail(paramName = 'id'): Promise<{
  product: Ref<Product>
  slug: ComputedRef<string>
}> {
  const { data: product, slug } = await useRouteEntity<Product>('product', '/api/products', {
    paramName,
  })

  return { product, slug }
}
