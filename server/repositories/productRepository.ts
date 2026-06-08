import type { Product, ProductListResult } from '#shared/types/catalog'
import { and, asc, desc, eq, like, sql } from 'drizzle-orm'
import { products } from '../database/schema'
import { toProduct } from '../utils/product'
import type { ProductInput, ProductListQuery, ProductUpdate } from '../utils/schemas'

const effectivePrice = sql<number>`(case when ${products.sale} then ${products.salePrice} else ${products.price} end)`

export async function listProducts(query: ProductListQuery): Promise<ProductListResult> {
  const db = useDb()
  const { category, q, sort, page, limit } = query

  const filters = [
    category ? eq(products.category, category) : undefined,
    q ? like(products.name, `%${q}%`) : undefined,
  ].filter(Boolean)

  const where = filters.length ? and(...filters) : undefined

  const orderBy =
    sort === 'priceAsc'
      ? asc(effectivePrice)
      : sort === 'priceDesc'
        ? desc(effectivePrice)
        : asc(products.id)

  const [countRow] = await db
    .select({ total: sql<number>`count(*)` })
    .from(products)
    .where(where)

  const total = countRow?.total ?? 0

  const items = await db
    .select()
    .from(products)
    .where(where)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)

  return {
    items: items.map(toProduct),
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  }
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await useDb().select().from(products).orderBy(desc(products.id))
  return rows.map(toProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const row = await useDb().query.products.findFirst({ where: eq(products.slug, slug) })
  return row ? toProduct(row) : undefined
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const row = await useDb().query.products.findFirst({ where: eq(products.id, id) })
  return row ? toProduct(row) : undefined
}

export async function createProduct(input: ProductInput): Promise<Product> {
  const [row] = await useDb().insert(products).values(input).returning()
  if (!row) throw createError({ statusCode: 500, message: 'Не удалось создать товар' })
  return toProduct(row)
}

export async function updateProduct(
  id: number,
  input: ProductUpdate,
): Promise<Product | undefined> {
  const [row] = await useDb()
    .update(products)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()
  return row ? toProduct(row) : undefined
}

export async function deleteProduct(id: number) {
  const rows = await useDb()
    .delete(products)
    .where(eq(products.id, id))
    .returning({ id: products.id })
  return !!rows.length
}
