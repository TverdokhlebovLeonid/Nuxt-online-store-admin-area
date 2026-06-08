import type { createContactRepository } from '@/repository/contact'
import type { createProductRepository } from '@/repository/product'
import type { createSettingsRepository } from '@/repository/settings'
import type { createUploadRepository } from '@/repository/upload'

type Api = {
  contact: ReturnType<typeof createContactRepository>
  products: ReturnType<typeof createProductRepository>
  settings: ReturnType<typeof createSettingsRepository>
  upload: ReturnType<typeof createUploadRepository>
}

type HttpClient = {
  fetch: typeof $fetch
}

declare module '#app' {
  interface NuxtApp {
    $http: HttpClient
    $api: Api
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: HttpClient
    $api: Api
  }
}

export {}
