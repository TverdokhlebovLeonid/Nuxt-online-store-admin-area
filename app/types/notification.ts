export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface NotificationMessage {
  text: string
  type: NotificationType
  duration?: number
}

export interface NotificationItem extends NotificationMessage {
  id: number
}

export type NotificationStyles = {
  [key in NotificationType]: {
    class: string
    icon: string
  }
}
