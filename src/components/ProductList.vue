<template>
  <div class="md:mx-12 relative overflow-x-auto">
    <ErrorAlert
      v-if="isError && !isErrorAlertClosed"
      :errorMsg="error"
      @close="isErrorAlertClosed = true"
    />
    <div v-if="isLoading" class="w-full my-16 flex justify-center">
      <LoadingSpinner />
    </div>
    <div v-else>
      <table class="w-full text-sm text-left text-gray-500 border">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">SI</th>
            <th scope="col" class="px-6 py-3">Preview</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Rating</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem v-for="product in data?.products" :key="product.id" :product="product" />
        </tbody>
      </table>
      <ProductPagination
        :total="data?.total"
        :currentPage="currentPage"
        @change-page="handlePagination"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { BASE_PAGINATION_LIMIT } from '@/const';
import { getProducts } from '@/api/products';
import ProductItem from '@/components/ProductItem.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import ProductPagination from '@/components/ProductPagination.vue';

const isErrorAlertClosed = ref(true);
const currentPage = ref(0);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['products', currentPage],
  queryFn: () => getProducts(BASE_PAGINATION_LIMIT, BASE_PAGINATION_LIMIT * currentPage.value)
});

const handlePagination = (newPage: number) => {
  currentPage.value = newPage;
};
</script>
