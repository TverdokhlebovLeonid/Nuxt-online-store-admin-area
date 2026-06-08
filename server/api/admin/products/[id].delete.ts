import { deleteProduct } from '../../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const id = getValidatedId(event)
  const deleted = await deleteProduct(id)
  if (!deleted) {
    throw createError({ statusCode: 404, message: 'Товар не найден' })
  }

  return { ok: true }
})
