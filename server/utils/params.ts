import type { H3Event } from 'h3'

export function getValidatedId(event: H3Event): number {
  const id = Number(getRouterParam(event, 'id'))

  if (!Number.isInteger(id)) {
    throw createError({ statusCode: 400, message: 'Некорректный id' })
  }

  return id
}
