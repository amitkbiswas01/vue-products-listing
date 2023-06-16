<template>
  <div class="md:mx-12 relative overflow-x-auto">
    <div class="flex items-center justify-end">
      <ProductFilter
        class="mr-4"
        v-for="filter in FILTERS"
        :key="filter"
        :label="filter"
        @sorting-updated="updateSorting($event, filter)"
      />
    </div>
    <ErrorAlert
      v-if="isError && !isErrorAlertClosed"
      :error-msg="error as string"
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
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Rating</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <ProductItem v-for="product in products" :key="product.id" :product="product" />
        </tbody>
      </table>
      <ProductPagination
        :total="data?.total ?? 0"
        :currentPage="currentPage"
        @change-page="changeCurrentPage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRaw, watch } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { BASE_PAGINATION_LIMIT, type SortingType, FILTERS, type FilterType } from '@/const';
import { getProducts } from '@/api/products';
import ProductItem from '@/components/ProductItem.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import ProductPagination from '@/components/ProductPagination.vue';

const isErrorAlertClosed = ref(true);
const currentPage = ref(1);
const products = ref<Product[] | undefined>([]);
const sorting = ref<SortingType | null>(null);
const filter = ref<FilterType | null>(null);

const { isLoading, isError, data, error } = useQuery({
  queryKey: ['products', currentPage],
  queryFn: () => getProducts(BASE_PAGINATION_LIMIT, BASE_PAGINATION_LIMIT * (currentPage.value - 1))
});

watch(data, () => {
  if (!data.value?.products) return;

  products.value = structuredClone(toRaw(data.value.products));
  updateSorting(sorting.value, filter.value);
});

// methods
const changeCurrentPage = (newPage: number) => {
  if (newPage < 0) return;
  currentPage.value = newPage;
};

const updateSorting = (newSorting: SortingType | null, newFilter: FilterType | null) => {
  if (!newSorting || !newFilter) return;

  if (newSorting === 'asc') {
    products.value = products.value?.sort((a, b) => b[newFilter] - a[newFilter]);
  }
  if (newSorting === 'desc') {
    products.value = products.value?.sort((a, b) => a[newFilter] - b[newFilter]);
  }

  sorting.value = newSorting;
  filter.value = newFilter;
};
</script>
