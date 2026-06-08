import type { CartItem, Product } from '@/types/product'

export const useCartStore = defineStore(
  'cart',
  () => {
    const notify = useNotification()
    const items = ref<CartItem[]>([])
    const count = ref(0)
    const totalPrice = ref(0)

    function addToCart(product: Product) {
      const existing = items.value.find((item) => item.id === product.id)

      if (existing) {
        existing.quantity++
        existing.totalPrice = existing.quantity * existing.price
      } else {
        items.value.push({
          ...structuredClone(product),
          quantity: 1,
          totalPrice: product.price,
        })
      }

      totalPrice.value += product.price
      count.value++

      const text = existing
        ? `Количество «${product.name}» обновлено`
        : `«${product.name}» добавлен в корзину`
      notify.success(text, 4000)
    }

    function removeFromCart(item: CartItem) {
      const index = items.value.indexOf(item)
      if (index === -1) return

      items.value.splice(index, 1)
      totalPrice.value -= item.totalPrice
      count.value -= item.quantity

      if (count.value <= 0) {
        clearCart()
      }
    }

    function increaseQuantity(item: CartItem) {
      item.quantity++
      item.totalPrice = item.quantity * item.price
      totalPrice.value += item.price
      count.value++
    }

    function decreaseQuantity(item: CartItem) {
      if (item.quantity <= 1) return

      item.quantity--
      item.totalPrice = item.quantity * item.price
      totalPrice.value -= item.price
      count.value--
    }

    function clearCart() {
      items.value = []
      count.value = 0
      totalPrice.value = 0
    }

    return {
      items,
      count,
      totalPrice,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }
  },
  {
    persist: {
      pick: ['items', 'count', 'totalPrice'],
    },
  },
)
