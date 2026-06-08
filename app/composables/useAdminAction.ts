interface AdminActionOptions<T> {
  successMessage?: string
  onSuccess?: (result: T) => void | Promise<void>
}

export function useAdminAction() {
  const pending = ref(false)
  const notify = useNotification()

  async function run<T>(
    action: () => Promise<T>,
    options: AdminActionOptions<T> = {},
  ): Promise<T | undefined> {
    pending.value = true
    try {
      const result = await action()
      if (options.successMessage) notify.success(options.successMessage)
      await options.onSuccess?.(result)
      return result
    } catch {
      return undefined
    } finally {
      pending.value = false
    }
  }

  return { pending, run }
}
