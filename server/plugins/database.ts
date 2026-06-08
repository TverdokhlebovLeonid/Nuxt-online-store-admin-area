import { existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { migrate } from 'drizzle-orm/libsql/migrator'
import { seedDatabase } from '../database/seed'
import { getMigrationsFolder, resolveFileDatabaseUrl } from '../utils/databasePath'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()

  const databaseUrl = resolveFileDatabaseUrl(config.databaseUrl, config.databaseRootDir)

  if (databaseUrl.startsWith('file:')) {
    const filePath = databaseUrl.slice('file:'.length)
    const dir = dirname(filePath)
    if (dir && !existsSync(dir)) {
      mkdirSync(dir, { recursive: true })
    }
  }

  const db = useDb()

  try {
    await migrate(db, { migrationsFolder: getMigrationsFolder() })
  } catch (error) {
    console.error('[database] migration failed:', error)
    throw error
  }

  try {
    await seedDatabase()
  } catch (error) {
    console.error('[database] seeding failed:', error)
    throw error
  }
})
