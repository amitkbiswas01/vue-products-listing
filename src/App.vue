<template>
  <div>
    <h1 class="text-2xl mb-4">Products Listing</h1>
    <ul v-if="data">
      <li v-for="product in data.products" :key="product.title">
        <h3>{{ product.title }}</h3>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

type Product = {
  title: string
  brand: string
  category: string
  description: string
  discountPercentage: number
  images: string[]
  price: number
  rating: number
  stock: number
  thumbnail: string
}

type ProductsResponse = {
  limit: number
  products: Product[]
  skip: number
  total: number
}

const { data } = useQuery({
  queryKey: ['products'],
  queryFn: async (): Promise<ProductsResponse> =>
    await fetch('https://dummyjson.com/products').then((response) => response.json())
})
</script>
