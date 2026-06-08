import type { NotificationType } from '@/types/notification'

export function useNotification() {
  const store = useNotificationStore()

  function notify(text: string, type: NotificationType, duration?: number) {
    store.add({ text, type, duration })
  }

  return {
    success: (text: string, duration?: number) => notify(text, 'success', duration),
    error: (text: string, duration?: number) => notify(text, 'error', duration),
    warning: (text: string, duration?: number) => notify(text, 'warning', duration),
    info: (text: string, duration?: number) => notify(text, 'info', duration),
  }
}
