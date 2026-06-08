import { eq } from 'drizzle-orm'
import { users } from '../../database/schema'

export default defineEventHandler(async (event) => {
  const { email, password } = await useValidatedBody(event, loginSchema)

  const user = await useDb().query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user || !(await verifyPassword(user.passwordHash, password))) {
    throw createError({ statusCode: 401, message: 'Неверный email или пароль' })
  }

  const sessionUser = { id: user.id, email: user.email, role: user.role }
  await setUserSession(event, { user: sessionUser })

  return { user: sessionUser }
})
