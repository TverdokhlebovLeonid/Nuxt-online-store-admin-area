import type { AsyncData, AsyncDataOptions, UseFetchOptions } from '#app'
import { handleUnauthorized } from '@/utils/authRedirect'
import { getErrorMessage } from '@/utils/errors'

type AppFetch = typeof $fetch

type KeysOf<T> = Array<T extends T ? (keyof T extends string ? keyof T : never) : never>

type AsyncDataResult<T, E = unknown> = Pick<
  AsyncData<T, E>,
  'data' | 'error' | 'pending' | 'refresh' | 'status' | 'execute' | 'clear'
>

export function useHttp() {
  return useNuxtApp().$http
}

function useAppFetch(): AppFetch {
  if (import.meta.server) {
    return useRequestFetch() as AppFetch
  }
  return useNuxtApp().$http.fetch
}

function throwFatalRequestError(error: {
  statusCode?: number
  statusMessage?: string
  message?: string
  data?: unknown
}) {
  throw createError({
    statusCode: error.statusCode,
    statusMessage: error.statusMessage,
    message: getErrorMessage(error, error.statusMessage ?? 'Ошибка запроса'),
    fatal: true,
    data: error.data,
  })
}

export function useCritical<T, E = unknown>(
  asyncDataRes: AsyncDataResult<T, E>,
): AsyncDataResult<T, E> {
  watch(
    () => asyncDataRes.error.value,
    (error) => {
      if (!error) return

      const requestError = error as Parameters<typeof throwFatalRequestError>[0]
      const requestUrl =
        typeof requestError.data === 'object' &&
        requestError.data !== null &&
        'url' in requestError.data &&
        typeof requestError.data.url === 'string'
          ? requestError.data.url
          : undefined

      if (handleUnauthorized(requestError.statusCode, requestUrl)) return

      throwFatalRequestError(requestError)
    },
    { immediate: true },
  )

  return asyncDataRes
}

export function useHttpData<T>(
  key: MaybeRefOrGetter<string>,
  handler: (fetch: AppFetch) => Promise<T>,
  options?: AsyncDataOptions<T, T, KeysOf<T>, T>,
) {
  const fetch = useAppFetch()
  return useCritical(useAsyncData<T>(key, () => handler(fetch), options))
}

export async function useHttpDataAsync<T>(
  key: MaybeRefOrGetter<string>,
  handler: (fetch: AppFetch) => Promise<T>,
  options?: AsyncDataOptions<T, T, KeysOf<T>, T>,
) {
  const fetch = useAppFetch()
  return useCritical(await useAsyncData<T>(key, () => handler(fetch), options))
}

export async function useHttpFetch<T>(url: MaybeRefOrGetter<string>, options?: UseFetchOptions<T>) {
  const fetch = useAppFetch()
  return useCritical(await useFetch(url, { ...options, $fetch: fetch } as UseFetchOptions<T>))
}
