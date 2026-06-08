import type { Pinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  ;($pinia as Pinia).use(createPersistedState())
})
