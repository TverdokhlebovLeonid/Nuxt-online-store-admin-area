import nodemailer, { type Transporter } from 'nodemailer'
import { formatPrice } from '#shared/utils/format'
import type { ContactInput } from '../utils/schemas'

let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  const { mail } = useRuntimeConfig()

  if (!mail.user || !mail.pass) {
    return null
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: { user: mail.user, pass: mail.pass },
    })
  }

  return transporter
}

const escapeHtml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[char] ?? char,
  )

function renderTemplate(input: ContactInput): { subject: string; html: string } {
  const isOrder = input.type === 'order'
  const subject = isOrder ? 'Новый заказ — Search klad' : 'Обратный звонок — Search klad'

  const rows: string[] = [
    ['Имя', input.name],
    ['Телефон', input.phone],
    ['E-mail', input.email],
    input.message ? ['Сообщение', input.message] : null,
  ]
    .filter((row): row is [string, string] => row !== null)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#475569">${label}</td><td style="padding:6px 12px;color:#0f172a">${escapeHtml(value)}</td></tr>`,
    )

  let orderBlock = ''
  if (isOrder && input.order) {
    const items = input.order.items
      .map(
        (item) =>
          `<tr><td style="padding:6px 12px">${escapeHtml(item.name)}</td><td style="padding:6px 12px;text-align:center">${item.quantity}</td><td style="padding:6px 12px;text-align:right">${formatPrice(item.price * item.quantity)}</td></tr>`,
      )
      .join('')

    orderBlock = `
      <h3 style="margin:24px 0 8px;color:#0f172a">Состав заказа</h3>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0">
        <thead>
          <tr style="background:#f8fafc;text-align:left">
            <th style="padding:8px 12px">Товар</th>
            <th style="padding:8px 12px;text-align:center">Кол-во</th>
            <th style="padding:8px 12px;text-align:right">Сумма</th>
          </tr>
        </thead>
        <tbody>${items}</tbody>
        <tfoot>
          <tr style="font-weight:700;background:#f0fdf4">
            <td style="padding:8px 12px" colspan="2">Итого (${input.order.itemCount} шт.)</td>
            <td style="padding:8px 12px;text-align:right">${formatPrice(input.order.totalPrice)}</td>
          </tr>
        </tfoot>
      </table>`
  }

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#0f172a">
      <h2 style="color:#16a34a">${subject}</h2>
      <table style="width:100%;border-collapse:collapse">${rows.join('')}</table>
      ${orderBlock}
    </div>`

  return { subject, html }
}

export async function sendContactEmail(input: ContactInput): Promise<{ delivered: boolean }> {
  const { mail } = useRuntimeConfig()
  const tx = getTransporter()

  if (!tx) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Service Unavailable',
      message: 'Сервис отправки писем не настроен',
    })
  }

  const { subject, html } = renderTemplate(input)

  try {
    await tx.sendMail({
      from: mail.user,
      to: mail.to || mail.user,
      replyTo: input.email,
      subject,
      html,
    })
    return { delivered: true }
  } catch (error) {
    console.error('[mail] send failed:', error)
    throw createError({
      statusCode: 502,
      statusMessage: 'Bad Gateway',
      message: 'Не удалось отправить письмо. Попробуйте позже.',
    })
  }
}
