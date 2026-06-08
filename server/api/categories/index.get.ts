import { listCategories } from '../../repositories/categoryRepository'

export default defineEventHandler(() => {
  return listCategories()
})
