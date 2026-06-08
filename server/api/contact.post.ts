import { sendContactEmail } from '../services/mailService'

export default defineEventHandler(async (event) => {
  const input = await useValidatedBody(event, contactSchema)
  return sendContactEmail(input)
})
