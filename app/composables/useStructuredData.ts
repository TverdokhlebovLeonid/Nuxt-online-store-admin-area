type JsonLd = Record<string, unknown> | Record<string, unknown>[]

export function useStructuredData(data: MaybeRefOrGetter<JsonLd | undefined>, id = 'default') {
  useHead({
    script: computed(() => {
      const value = toValue(data)
      if (!value) return []

      return [
        {
          type: 'application/ld+json',
          key: `schema-org-${id}`,
          innerHTML: JSON.stringify(value),
        },
      ]
    }),
  })
}
