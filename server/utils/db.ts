import { createClient } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from '../database/schema'
import { resolveFileDatabaseUrl } from './databasePath'

let instance: LibSQLDatabase<typeof schema> | undefined

export function useDb() {
  if (!instance) {
    const config = useRuntimeConfig()
    const client = createClient({
      url: resolveFileDatabaseUrl(config.databaseUrl, config.databaseRootDir),
      authToken: config.databaseAuthToken || undefined,
    })
    instance = drizzle(client, { schema })
  }
  return instance
}
