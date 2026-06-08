import { sql } from 'drizzle-orm'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
})

export const products = sqliteTable(
  'products',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    price: integer('price').notNull(),
    salePrice: integer('sale_price').notNull().default(0),
    brand: text('brand').notNull().default(''),
    category: text('category').notNull(),
    type: text('type').notNull().default(''),
    shortDescription: text('short_description').notNull().default(''),
    description: text('description', { mode: 'json' })
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'`),
    specs: text('specs', { mode: 'json' })
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'`),
    country: text('country').notNull().default(''),
    sale: integer('sale', { mode: 'boolean' }).notNull().default(false),
    img: text('img').notNull().default(''),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`(unixepoch())`),
  },
  (table) => [index('products_category_idx').on(table.category)],
)

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin'] })
    .notNull()
    .default('admin'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type SeedProduct = Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>
export type SeedCategory = Omit<typeof categories.$inferInsert, 'id'>

export const siteSettings = sqliteTable('site_settings', {
  id: integer('id').primaryKey(),
  phone: text('phone').notNull(),
  phoneTel: text('phone_tel').notNull(),
  city: text('city').notNull(),
  streetAddress: text('street_address').notNull(),
  extraAddresses: text('extra_addresses', { mode: 'json' })
    .$type<string[]>()
    .notNull()
    .default(sql`'[]'`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

export type SiteSettingsRow = typeof siteSettings.$inferSelect
export type SiteSettingsUpdate = Partial<Omit<SiteSettingsRow, 'id' | 'updatedAt'>>
