<script setup lang="ts">
definePageMeta({ layout: false })

usePageSeo({
  title: 'Вход в админку',
  robots: 'noindex, nofollow',
})

const { loggedIn, login } = useAuth()
const route = useRoute()
const { pending, run } = useAdminAction()

const email = ref('')
const password = ref('')

const redirectTo = computed(() => (route.query.redirect as string) || '/admin')

if (loggedIn.value) {
  await navigateTo(redirectTo.value)
}

async function submit() {
  await run(() => login(email.value, password.value), {
    onSuccess: async () => {
      await navigateTo(redirectTo.value)
    },
  })
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-neutral-100 px-4">
    <div class="w-full max-w-sm">
      <div class="mb-6 flex flex-col items-center gap-2">
        <SiteLogo
          size="lg"
          :show-text="false"
        />
        <h1 class="text-xl font-bold text-ink">Вход в админку</h1>
      </div>

      <form
        class="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-soft"
        @submit.prevent="submit"
      >
        <UiInput
          v-model="email"
          label="E-mail"
          type="email"
          placeholder="admin@example.com"
          required
        />
        <UiInput
          v-model="password"
          label="Пароль"
          type="password"
          placeholder="••••••••"
          required
        />
        <UiButton
          type="submit"
          block
          size="lg"
          label="Войти"
          :loading="pending"
        />
      </form>
    </div>
  </div>
</template>
