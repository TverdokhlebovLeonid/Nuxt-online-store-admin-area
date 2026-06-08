export interface ConfirmOptions {
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'primary' | 'danger'
}

const state = reactive({
  open: false,
  title: 'Подтверждение',
  message: '',
  confirmLabel: 'Подтвердить',
  cancelLabel: 'Отмена',
  variant: 'danger' as 'primary' | 'danger',
  loading: false,
})

let resolvePromise: ((value: boolean) => void) | null = null

function settle(result: boolean) {
  const resolve = resolvePromise
  resolvePromise = null
  state.open = false
  state.loading = false
  resolve?.(result)
}

export function useConfirm() {
  function confirm(options: ConfirmOptions): Promise<boolean> {
    if (resolvePromise) settle(false)

    state.title = options.title ?? 'Подтверждение'
    state.message = options.message
    state.confirmLabel = options.confirmLabel ?? 'Подтвердить'
    state.cancelLabel = options.cancelLabel ?? 'Отмена'
    state.variant = options.variant ?? 'danger'
    state.loading = false
    state.open = true

    return new Promise<boolean>((resolve) => {
      resolvePromise = resolve
    })
  }

  function accept() {
    settle(true)
  }

  function reject() {
    settle(false)
  }

  function setLoading(loading: boolean) {
    state.loading = loading
  }

  return { state: readonly(state), confirm, accept, reject, setLoading }
}
