export interface ContactOrderPayload {
  items: { name: string; quantity: number; price: number }[]
  itemCount: number
  totalPrice: number
}

export interface ContactPayload {
  type: 'callback' | 'order'
  name: string
  phone: string
  email: string
  message?: string
  order?: ContactOrderPayload
}

export function createContactRepository(appFetch: typeof $fetch) {
  return {
    send(body: ContactPayload) {
      return appFetch<{ delivered: boolean }>('/api/contact', {
        method: 'POST',
        body,
      })
    },
  }
}
