import { getErrorMessage } from '@/utils/errors'

export function notifyRequestError(error: unknown, fallback = 'Ошибка запроса') {
  useNotificationStore().add({
    type: 'error',
    text: getErrorMessage(error, fallback),
  })
}
