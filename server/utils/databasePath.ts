import { existsSync } from 'node:fs'
import { isAbsolute, join, resolve } from 'node:path'

export function resolveFileDatabaseUrl(url: string, rootDir = process.cwd()): string {
  if (!url.startsWith('file:')) {
    return url
  }

  const filePath = url.slice('file:'.length)
  if (isAbsolute(filePath)) {
    return url
  }

  return `file:${resolve(rootDir, filePath)}`
}

export function getMigrationsFolder(): string {
  const candidates = [
    join(process.cwd(), 'server/database/migrations'),
    join(process.cwd(), '../server/database/migrations'),
  ]

  for (const dir of candidates) {
    if (existsSync(dir)) {
      return dir
    }
  }

  throw new Error(
    `[database] migrations folder not found (cwd: ${process.cwd()}). Run \`npm run build\` before preview.`,
  )
}
