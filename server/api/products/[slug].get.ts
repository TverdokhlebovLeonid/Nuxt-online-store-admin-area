import { getProductBySlug } from '../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, message: 'Не указан slug товара' })
  }

  const product = await getProductBySlug(slug)

  if (!product) {
    throw createError({ statusCode: 404, message: 'Товар не найден' })
  }

  return product
})
