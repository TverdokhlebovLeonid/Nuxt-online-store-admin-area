import type { H3Event } from 'h3'
import type { ZodType } from 'zod'

function fail(error: { flatten: () => unknown }): never {
  throw createError({
    statusCode: 422,
    statusMessage: 'Validation Error',
    message: 'Проверьте корректность введённых данных',
    data: error.flatten(),
  })
}

export async function useValidatedBody<T>(event: H3Event, schema: ZodType<T>): Promise<T> {
  const result = schema.safeParse(await readBody(event))
  if (!result.success) fail(result.error)
  return result.data
}

export function useValidatedQuery<T>(event: H3Event, schema: ZodType<T>): T {
  const result = schema.safeParse(getQuery(event))
  if (!result.success) fail(result.error)
  return result.data
}
