import { asc, eq } from 'drizzle-orm'
import { categories } from '../database/schema'

export function listCategories() {
  return useDb().select().from(categories).orderBy(asc(categories.id))
}

export function getCategoryBySlug(slug: string) {
  return useDb().query.categories.findFirst({ where: eq(categories.slug, slug) })
}
