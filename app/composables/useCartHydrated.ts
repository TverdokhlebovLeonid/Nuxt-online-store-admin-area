export function useCartHydrated() {
  const cartStore = useCartStore()
  const ready = ref(false)

  onMounted(() => {
    ready.value = true
  })

  const count = computed(() => (ready.value ? cartStore.count : 0))
  const items = computed(() => (ready.value ? cartStore.items : []))
  const totalPrice = computed(() => (ready.value ? cartStore.totalPrice : 0))
  const isEmpty = computed(() => ready.value && cartStore.count === 0)

  return {
    ready,
    count,
    items,
    totalPrice,
    isEmpty,
    cartStore,
  }
}
