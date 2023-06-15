<template>
  <tr class="bg-white border-b">
    <td class="px-6 py-4">{{ product.id }}</td>
    <td class="px-6 py-4">
      <img :src="product.thumbnail" :alt="product.title" loading="lazy" class="w-24 h-auto" />
    </td>
    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
      {{ product.title }}
    </th>
    <td class="px-6 py-4">{{ product.rating }}</td>
    <td class="px-6 py-4">${{ product.price }}</td>
    <td class="px-6 py-4">
      <button
        type="button"
        class="focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        :class="buttonClasses"
      >
        {{ isDetailsVisible ? 'Close' : 'Show' }}
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, type PropType, computed } from 'vue';

defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const isDetailsVisible = ref(false);
const buttonClasses = computed(() =>
  isDetailsVisible.value
    ? 'bg-red-700 hover:bg-red-800 focus:ring-red-300'
    : 'bg-green-700 hover:bg-green-800 focus:ring-green-300'
);
</script>
