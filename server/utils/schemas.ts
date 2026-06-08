import { z } from 'zod'

const SORT_KEYS = ['popularity', 'priceAsc', 'priceDesc'] as const

export const productListQuerySchema = z.object({
  category: z.string().trim().min(1).optional(),
  q: z.string().trim().min(1).optional(),
  sort: z.enum(SORT_KEYS).default('popularity'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(60).default(12),
})
export type ProductListQuery = z.infer<typeof productListQuerySchema>

export const productInputSchema = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(200)
    .regex(/^[\w.-]+$/, 'Только латиница, цифры, дефис, точка и нижнее подчёркивание'),
  price: z.number().int().nonnegative(),
  salePrice: z.number().int().nonnegative().default(0),
  brand: z.string().trim().max(120).default(''),
  category: z.string().trim().min(1),
  type: z.string().trim().max(120).default(''),
  shortDescription: z.string().trim().max(1000).default(''),
  description: z.array(z.string().trim().min(1)).default([]),
  specs: z.array(z.string().trim().min(1)).default([]),
  country: z.string().trim().max(120).default(''),
  sale: z.boolean().default(false),
  img: z.string().trim().max(500).default(''),
})
export type ProductInput = z.infer<typeof productInputSchema>

export const productUpdateSchema = productInputSchema.partial()
export type ProductUpdate = z.infer<typeof productUpdateSchema>

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(6).max(200),
})

const phonePattern = /^[\d\s+()-]{7,20}$/

export const contactSchema = z.object({
  type: z.enum(['callback', 'order']).default('callback'),
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().regex(phonePattern, 'Некорректный телефон'),
  email: z.email().trim(),
  message: z.string().trim().max(2000).default(''),
  order: z
    .object({
      items: z.array(
        z.object({
          name: z.string(),
          quantity: z.number().int().positive(),
          price: z.number().nonnegative(),
        }),
      ),
      itemCount: z.number().int().nonnegative(),
      totalPrice: z.number().nonnegative(),
    })
    .optional(),
})
export type ContactInput = z.infer<typeof contactSchema>

export const siteSettingsUpdateSchema = z.object({
  phone: z.string().trim().min(7).max(40),
  phoneTel: z.string().trim().regex(/^\+[\d]{10,15}$/, 'Формат: +79201234567'),
  city: z.string().trim().min(1).max(120),
  streetAddress: z.string().trim().min(1).max(300),
  extraAddresses: z.array(z.string().trim().min(1).max(300)).default([]),
})
export type SiteSettingsInput = z.infer<typeof siteSettingsUpdateSchema>
