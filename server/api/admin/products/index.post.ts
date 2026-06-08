import { createProduct, getProductBySlug } from '../../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  const input = await useValidatedBody(event, productInputSchema)

  if (await getProductBySlug(input.slug)) {
    throw createError({ statusCode: 409, message: 'Товар с таким slug уже существует' })
  }

  setResponseStatus(event, 201)
  return createProduct(input)
})
