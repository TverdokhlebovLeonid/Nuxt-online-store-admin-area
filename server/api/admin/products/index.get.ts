import { getAllProducts } from '../../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  await requireAdmin(event)
  return getAllProducts()
})
