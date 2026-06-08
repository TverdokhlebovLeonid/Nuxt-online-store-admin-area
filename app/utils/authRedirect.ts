const ADMIN_LOGIN_PATH = '/admin/login'

export function isAuthLoginRequest(url: string) {
  return url.includes('/api/auth/login')
}

export function redirectToAdminLogin(redirectPath?: string) {
  const route = useRoute()
  if (route.path === ADMIN_LOGIN_PATH) return

  const redirect = redirectPath ?? route.fullPath
  return navigateTo({
    path: ADMIN_LOGIN_PATH,
    query: redirect !== ADMIN_LOGIN_PATH ? { redirect } : undefined,
  })
}

export function handleUnauthorized(statusCode: number | undefined, requestUrl?: string) {
  if (statusCode !== 401) return false
  if (requestUrl && isAuthLoginRequest(requestUrl)) return false

  void redirectToAdminLogin()
  return true
}
