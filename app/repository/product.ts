import type { Product, ProductPayload } from '@/types/product'

export function createProductRepository(appFetch: typeof $fetch) {
  return {
    create(body: ProductPayload) {
      return appFetch<Product>('/api/admin/products', { method: 'POST', body })
    },
    update(id: number, body: Partial<ProductPayload>) {
      return appFetch<Product>(`/api/admin/products/${id}`, { method: 'PATCH', body })
    },
    remove(id: number) {
      return appFetch<{ ok: boolean }>(`/api/admin/products/${id}`, { method: 'DELETE' })
    },
  }
}
