import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'

const rootDir = process.cwd()

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@pinia/nuxt', 'nuxt-auth-utils', '@nuxt/eslint', '@nuxt/image'],
  css: ['@/assets/css/main.css'],
  sourcemap: false,
  hooks: {
    'vite:extendConfig'(config) {
      const css = typeof config.css === 'object' && config.css !== null ? config.css : {}
      Object.assign(config, { css: { ...css, devSourcemap: true } })
    },
  },
  runtimeConfig: {
    databaseRootDir: rootDir,
    databaseUrl: process.env.DATABASE_URL || 'file:.data/app.db',
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN || '',
    admin: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      password: process.env.ADMIN_PASSWORD || 'changeme123',
    },
    mail: {
      host: process.env.SMTP_HOST || 'smtp.mail.ru',
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      to: process.env.MAIL_TO || '',
    },
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      siteName: 'Search klad',
      siteDescription:
        'Интернет-магазин металлоискателей и металлодетекторов АКА. Оригинальная продукция, доставка по России.',
    },
  },
  image: {
    format: ['webp', 'avif'],
    quality: 80,
    domains: ['api-maps.yandex.ru'],
    densities: [1],
  },
  vite: {
    build: {
      sourcemap: false,
    },
    plugins: [tailwindcss()],
  },
  nitro: {
    experimental: {
      asyncContext: true,
    },
    hooks: {
      async compiled(nitro) {
        const { cp } = await import('node:fs/promises')
        const src = join(nitro.options.rootDir, 'server/database/migrations')
        const dest = join(nitro.options.output.dir, 'server/database/migrations')
        await cp(src, dest, { recursive: true })
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Search klad',
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/webp', href: '/favicon.webp' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
