export interface Product {
  id: number
  name: string
  slug: string
  price: number
  salePrice: number
  brand: string
  category: string
  type: string
  shortDescription: string
  description: string[]
  specs: string[]
  country: string
  sale: boolean
  img: string
}

export interface Category {
  id: number
  name: string
  slug: string
}

export type SortKey = 'popularity' | 'priceAsc' | 'priceDesc'

export interface ProductListResult {
  items: Product[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export type ProductPayload = Omit<Product, 'id'>

export interface CartItem extends Product {
  quantity: number
  totalPrice: number
}
