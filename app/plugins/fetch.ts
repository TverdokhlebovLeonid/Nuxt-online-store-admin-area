import { createContactRepository } from '@/repository/contact'
import { createProductRepository } from '@/repository/product'
import { createSettingsRepository } from '@/repository/settings'
import { createUploadRepository } from '@/repository/upload'
import { handleUnauthorized } from '@/utils/authRedirect'
import { notifyRequestError } from '@/utils/notifyRequest'

export default defineNuxtPlugin({
  name: 'fetch',
  parallel: true,
  setup() {
    const config = useRuntimeConfig()

    const fetch = $fetch.create({
      baseURL: config.public.apiBaseUrl,
      retry: false,
      onRequest({ options }) {
        options.headers.append('Accept', 'application/json')
      },
      onResponseError({ response, request }) {
        if (handleUnauthorized(response.status, String(request))) return
        notifyRequestError(response)
      },
    })

    const api = {
      contact: createContactRepository(fetch),
      products: createProductRepository(fetch),
      settings: createSettingsRepository(fetch),
      upload: createUploadRepository(fetch),
    }

    return {
      provide: {
        http: { fetch },
        api,
      },
    }
  },
})
