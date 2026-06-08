import type { ProductListResponse } from '@/types/product'

interface ListingOptions {
  category?: MaybeRefOrGetter<string | undefined>
  perPage?: number
}

export function useProductListing(options: ListingOptions = {}) {
  const category = computed(() => toValue(options.category))

  const page = ref(1)
  const perPage = ref(options.perPage ?? 12)
  const sort = ref<SortKey>('popularity')
  const search = ref('')

  const debouncedSearch = ref('')
  let searchTimer: ReturnType<typeof setTimeout> | undefined
  watch(search, (value) => {
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      debouncedSearch.value = value
    }, 300)
  })
  onScopeDispose(() => clearTimeout(searchTimer))

  const query = computed(() => ({
    category: category.value || undefined,
    q: debouncedSearch.value || undefined,
    sort: sort.value,
    page: page.value,
    limit: perPage.value,
  }))

  const { data, pending, refresh } = useHttpData<ProductListResponse>(
    () => `products:${category.value ?? 'all'}`,
    (fetch): Promise<ProductListResponse> =>
      fetch<ProductListResponse>('/api/products', { query: query.value }),
    { watch: [query] },
  )

  watch([category, sort, debouncedSearch, perPage], () => {
    page.value = 1
  })

  const items = computed(() => data.value?.items ?? [])
  const total = computed(() => data.value?.total ?? 0)
  const totalPages = computed(() => data.value?.totalPages ?? 1)

  function nextPage() {
    if (page.value < totalPages.value) page.value++
  }

  function prevPage() {
    if (page.value > 1) page.value--
  }

  return {
    items,
    total,
    totalPages,
    page,
    perPage,
    sort,
    search,
    pending,
    nextPage,
    prevPage,
    refresh,
  }
}
