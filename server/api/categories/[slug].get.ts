import { getCategoryBySlug } from '../../repositories/categoryRepository'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Не указан slug категории' })
  }

  const category = await getCategoryBySlug(slug)

  if (!category) {
    throw createError({ statusCode: 404, message: 'Категория не найдена' })
  }

  return category
})
