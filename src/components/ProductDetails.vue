<template>
  <div class="w-1/2 mx-auto flex items-center justify-center py-8 bg-white">
    <img class="object-cover w-64 h-auto mr-4" :src="data?.images[0]" :alt="data?.title" />
    <div class="flex flex-col justify-between items-start p-4 leading-normal">
      <div class="w-full flex justify-between items-center">
        <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
          {{ data?.category }}
        </span>
        <span class="mb-2 px-2.5 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          {{ `${data?.discountPercentage}% Off!` }}
        </span>
      </div>
      <h5 class="mb-4 text-2xl font-bold tracking-tight text-gray-900">
        {{ data?.title }}
      </h5>
      <p class="mb-2 font-normal text-gray-700">
        {{ data?.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getProduct } from '@/api/products';
import { useQuery } from '@tanstack/vue-query';

const props = defineProps({
  productId: {
    type: Number,
    required: true
  }
});

const { data } = useQuery({
  queryKey: ['product', props.productId],
  queryFn: () => getProduct(props.productId)
});
</script>
