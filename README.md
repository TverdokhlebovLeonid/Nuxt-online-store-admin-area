# Search klad (Nuxt 4)

[English](#english) · [Русский](#русский)

---

## English

Metal detector online store. Products are stored in a database, with authentication and an admin panel with CRUD.

### Stack

- **Nuxt 4.4+** / **TypeScript** / **Vue 3** (Composition API)
- **Pinia** (state)
- **Drizzle ORM** + **libSQL/SQLite** (`@libsql/client`) — database and migrations
- **nuxt-auth-utils** — sessions (sealed cookie) and password hashing (scrypt)
- **Zod** — request body and query validation for all endpoints
- **Nodemailer** — email delivery via `MailService`
- **Tailwind CSS v4** + **custom UI components** (`app/components/ui/`) — no external UI libraries

### Getting Started

```bash
npm install
cp .env.example .env
npm run dev
```

On first run, migrations are applied automatically and seeding runs:
a catalog and an administrator account are created.

#### Environment Variables

| Variable                        | Purpose                                                   |
| ------------------------------- | --------------------------------------------------------- |
| `NUXT_SESSION_PASSWORD`         | Session secret (≥32 characters), required                 |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Administrator account (created on first seed)             |
| `DATABASE_URL`                  | `file:.data/app.db` locally or libSQL/Turso URL in prod   |
| `DATABASE_AUTH_TOKEN`           | Token for remote libSQL/Turso (optional)                  |
| `SMTP_*`, `MAIL_TO`             | Email delivery settings                                   |

### Database

```bash
npm run db:generate   # generate migrations from schema.ts
npm run db:migrate    # apply migrations manually (auto-applied in dev)
npm run db:studio     # Drizzle Studio
```

### Admin Panel

- `/admin/login` — sign in (email + password from `ADMIN_*`)

---

## Русский

Интернет-магазин металлоискателей. Товары хранятся в БД, есть авторизация и админка с CRUD.

### Стек

- **Nuxt 4.4+** / **TypeScript** / **Vue 3** (Composition API)
- **Pinia** (state)
- **Drizzle ORM** + **libSQL/SQLite** (`@libsql/client`) — БД и миграции
- **nuxt-auth-utils** — сессии (sealed cookie) и хэширование паролей (scrypt)
- **Zod** — валидация тела и query всех эндпоинтов
- **Nodemailer** — отправка писем через `MailService`
- **Tailwind CSS v4** + **собственные UI-компоненты** (`app/components/ui/`) — без внешних UI-библиотек

### Запуск

```bash
npm install
cp .env.example .env
npm run dev
```

При первом запуске автоматически применяются миграции и выполняется сидинг:
создаётся каталог и учётная запись администратора.

#### Переменные окружения

| Переменная                      | Назначение                                                |
| ------------------------------- | --------------------------------------------------------- |
| `NUXT_SESSION_PASSWORD`         | Секрет для сессий (≥32 символов), обязателен              |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Учётка администратора (создаётся при первом сидинге)      |
| `DATABASE_URL`                  | `file:.data/app.db` локально или libSQL/Turso URL в проде |
| `DATABASE_AUTH_TOKEN`           | Токен для удалённого libSQL/Turso (опционально)           |
| `SMTP_*`, `MAIL_TO`             | Настройки отправки писем                                  |

### База данных

```bash
npm run db:generate   # сгенерировать миграции из schema.ts
npm run db:migrate    # применить миграции вручную (в дев применяются автоматически)
npm run db:studio     # Drizzle Studio
```

### Админка

- `/admin/login` — вход (email + пароль из `ADMIN_*`)
