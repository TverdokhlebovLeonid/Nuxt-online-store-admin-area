# Search klad (Nuxt 4)

Интернет-магазин металлоискателей. Товары хранятся в БД, есть авторизация и админка с CRUD.

## Стек

- **Nuxt 4.4+** / **TypeScript** / **Vue 3** (Composition API)
- **Pinia** (state)
- **Drizzle ORM** + **libSQL/SQLite** (`@libsql/client`) — БД и миграции
- **nuxt-auth-utils** — сессии (sealed cookie) и хэширование паролей (scrypt)
- **Zod** — валидация тела и query всех эндпоинтов
- **Nodemailer** — отправка писем через `MailService`
- **Tailwind CSS v4** + **собственные UI-компоненты** (`app/components/ui/`) — без внешних UI-библиотек

## Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

При первом запуске автоматически применяются миграции и выполняется сидинг:
создаётся каталог и учётная запись администратора.

### Переменные окружения

| Переменная                      | Назначение                                                |
| ------------------------------- | --------------------------------------------------------- |
| `NUXT_SESSION_PASSWORD`         | Секрет для сессий (≥32 символов), обязателен              |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Учётка администратора (создаётся при первом сидинге)      |
| `DATABASE_URL`                  | `file:.data/app.db` локально или libSQL/Turso URL в проде |
| `DATABASE_AUTH_TOKEN`           | Токен для удалённого libSQL/Turso (опционально)           |
| `SMTP_*`, `MAIL_TO`             | Настройки отправки писем                                  |

## База данных

```bash
npm run db:generate   # сгенерировать миграции из schema.ts
npm run db:migrate    # применить миграции вручную (в дев применяются автоматически)
npm run db:studio     # Drizzle Studio
```

## Админка

- `/admin/login` — вход (email + пароль из `ADMIN_*`)
