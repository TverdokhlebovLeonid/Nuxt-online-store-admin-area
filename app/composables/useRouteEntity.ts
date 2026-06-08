interface RouteEntityOptions {
  paramName?: string
}

export async function useRouteEntity<T>(
  resource: string,
  endpoint: string,
  options: RouteEntityOptions = {},
): Promise<{ data: Ref<T>; slug: ComputedRef<string> }> {
  const { paramName = 'id' } = options
  const route = useRoute()
  const slug = computed(() => String(route.params[paramName]))

  const { data } = await useHttpDataAsync(
    () => `${resource}:${slug.value}`,
    (fetch) => fetch<T>(`${endpoint}/${slug.value}`),
    { watch: [slug] },
  )

  return { data: data as Ref<T>, slug }
}
