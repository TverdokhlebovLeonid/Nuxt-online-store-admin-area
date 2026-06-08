import { like, sql } from 'drizzle-orm'
import { categories, products, siteSettings, users } from './schema'
import { seedCategories } from './seed/categories'
import { seedProducts } from './seed/products'
import { seedSiteSettings } from './seed/siteSettings'

async function countRows(
  table: typeof categories | typeof products | typeof users | typeof siteSettings,
) {
  const [row] = await useDb()
    .select({ count: sql<number>`count(*)` })
    .from(table)
  return row?.count ?? 0
}

export async function seedDatabase() {
  const db = useDb()
  const config = useRuntimeConfig()

  if (!(await countRows(categories))) {
    await db.insert(categories).values(seedCategories)
  }

  if (!(await countRows(products))) {
    const bySlug = new Map(seedProducts.map((product) => [product.slug, product]))
    await db.insert(products).values([...bySlug.values()])
  }

  if (!(await countRows(users))) {
    const passwordHash = await hashPassword(config.admin.password)
    await db.insert(users).values({
      email: config.admin.email.toLowerCase(),
      passwordHash,
      role: 'admin',
    })
  }

  if (!(await countRows(siteSettings))) {
    await db.insert(siteSettings).values(seedSiteSettings)
  }

  await db
    .update(products)
    .set({ category: sql`REPLACE(${products.category}, '.html', '')` })
    .where(like(products.category, '%.html'))
}
