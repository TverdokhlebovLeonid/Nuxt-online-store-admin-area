export const useLoadingStore = defineStore('loading', () => {
  const active = ref(false)

  function start() {
    active.value = true
  }

  function finish() {
    active.value = false
  }

  return { active, start, finish }
})
