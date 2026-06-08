<script setup lang="ts">
import { buildProductSchema } from '@/utils/schema'

definePageMeta({ alias: ['/category/product/:id'] })

const route = useRoute()

if (route.path.startsWith('/category/product/')) {
  await navigateTo(`/product/${route.params.id}`, { redirectCode: 301 })
}

const cartStore = useCartStore()
const { product } = await useProductDetail()

const { siteUrl } = useSiteConfig()

const description = computed(
  () =>
    product.value.shortDescription ||
    `Купить ${product.value.name} — металлоискатели АКА с доставкой по Москве и регионам России.`,
)

usePageSeo({
  title: () => product.value.name,
  description,
  path: () => `/product/${product.value.slug}`,
  image: () => product.value.img,
  ogType: 'product',
})

useStructuredData(() => buildProductSchema(siteUrl.value, product.value), 'product')

function addToCart() {
  cartStore.addToCart(product.value)
}
</script>

<template>
  <ProductDetail
    :product="product"
    @order="addToCart"
  />
</template>
