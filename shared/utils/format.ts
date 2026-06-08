export function formatPrice(value: number): string {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function pluralRu(
  count: number,
  forms: readonly [one: string, few: string, many: string],
): string {
  const mod100 = Math.abs(count) % 100
  const mod10 = mod100 % 10

  if (mod100 >= 11 && mod100 <= 14) return forms[2]
  if (mod10 === 1) return forms[0]
  if (mod10 >= 2 && mod10 <= 4) return forms[1]
  return forms[2]
}

const PRODUCT_FORMS = ['товар', 'товара', 'товаров'] as const

export function pluralProducts(count: number): string {
  return pluralRu(count, PRODUCT_FORMS)
}
