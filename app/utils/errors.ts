function readPayloadMessage(payload: unknown): string | undefined {
  if (!payload || typeof payload !== 'object') return undefined

  const message = (payload as { message?: unknown }).message
  return typeof message === 'string' && message ? message : undefined
}

export function getErrorMessage(error: unknown, fallback = 'Что-то пошло не так'): string {
  const source = error as {
    data?: unknown
    _data?: unknown
    statusMessage?: unknown
    message?: unknown
  } | null

  const fromData = readPayloadMessage(source?.data) ?? readPayloadMessage(source?._data)
  if (fromData) return fromData

  const statusMessage = source?.statusMessage
  if (typeof statusMessage === 'string' && statusMessage) return statusMessage

  const message = source?.message
  if (typeof message === 'string' && message) return message

  return fallback
}
