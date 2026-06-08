import { listProducts } from '../../repositories/productRepository'

export default defineEventHandler(async (event) => {
  const query = useValidatedQuery(event, productListQuerySchema)
  return listProducts(query)
})
