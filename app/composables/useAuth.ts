export function useAuth() {
  const { loggedIn, user, fetch: refreshSession, clear } = useUserSession()

  async function login(email: string, password: string) {
    const { fetch } = useHttp()
    await fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    await refreshSession()
  }

  async function logout() {
    await clear()
    await navigateTo('/admin/login')
  }

  return { loggedIn, user, login, logout }
}
