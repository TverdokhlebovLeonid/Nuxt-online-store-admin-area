import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL || 'file:.data/app.db'
const isLocalFile = databaseUrl.startsWith('file:')

export default defineConfig({
  dialect: 'turso',
  schema: './server/database/schema.ts',
  out: './server/database/migrations',
  dbCredentials: isLocalFile
    ? { url: databaseUrl }
    : {
        url: databaseUrl,
        authToken: process.env.DATABASE_AUTH_TOKEN ?? '',
      },
})
