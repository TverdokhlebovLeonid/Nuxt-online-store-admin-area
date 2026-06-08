import { getProductById } from '../../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getValidatedId(event)
  const product = await getProductById(id)
  if (!product) {
    throw createError({ statusCode: 404, message: 'Товар не найден' })
  }

  return product
})
