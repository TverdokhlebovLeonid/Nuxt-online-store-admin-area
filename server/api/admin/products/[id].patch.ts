import {
  getProductById,
  getProductBySlug,
  updateProduct,
} from '../../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getValidatedId(event)
  const existing = await getProductById(id)
  if (!existing) {
    throw createError({ statusCode: 404, message: 'Товар не найден' })
  }

  const input = await useValidatedBody(event, productUpdateSchema)

  if (input.slug && input.slug !== existing.slug) {
    const clash = await getProductBySlug(input.slug)
    if (clash) {
      throw createError({ statusCode: 409, message: 'Товар с таким slug уже существует' })
    }
  }

  return updateProduct(id, input)
})
