import { randomUUID } from 'node:crypto'
import { existsSync, mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
}

const MAX_SIZE = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  await requireAdmin(event)

  const parts = await readMultipartFormData(event)
  const file = parts?.find((part) => part.name === 'file' && part.filename)

  if (!file?.data?.length) {
    throw createError({ statusCode: 400, message: 'Файл не получен' })
  }

  const ext = file.type ? ALLOWED_TYPES[file.type] : undefined
  if (!ext) {
    throw createError({
      statusCode: 415,
      message: 'Недопустимый тип файла (JPG, PNG, WEBP, GIF, SVG)',
    })
  }

  if (file.data.length > MAX_SIZE) {
    throw createError({ statusCode: 413, message: 'Файл слишком большой (максимум 5 МБ)' })
  }

  const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir, { recursive: true })
  }

  await writeFile(join(uploadDir, fileName), file.data)

  return { path: `/uploads/${fileName}` }
})
