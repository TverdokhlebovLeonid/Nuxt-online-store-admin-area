import type { Product } from '#shared/types/catalog'
import type { products } from '../database/schema'

type ProductRow = typeof products.$inferSelect

export function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    price: row.price,
    salePrice: row.salePrice,
    brand: row.brand,
    category: row.category,
    type: row.type,
    shortDescription: row.shortDescription,
    description: row.description,
    specs: row.specs,
    country: row.country,
    sale: row.sale,
    img: row.img,
  }
}
