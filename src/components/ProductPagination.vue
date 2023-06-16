<template>
  <div class="mt-4 flex justify-center items-center">
    <span
      v-if="currentPage - 1"
      class="px-3 py-2 mr-1 leading-tight border cursor-pointer"
      @click="changeCurrentPage(1)"
    >
      First
    </span>
    <span
      v-if="currentPage - 1"
      class="px-3 py-2 mr-1 leading-tight border cursor-pointer"
      @click="changeCurrentPage(currentPage - 1)"
    >
      Previous
    </span>
    <span
      class="px-3 py-2 mr-1 leading-tight border cursor-pointer"
      :class="{ 'bg-blue-300': currentPage === n }"
      v-for="n in paginatorEntries"
      :key="n.toString()"
      @click="$emit('change-page', n)"
    >
      {{ n }}
    </span>
    <span
      v-if="currentPage !== numberOfPages"
      class="px-3 py-2 mr-1 leading-tight border cursor-pointer"
      @click="changeCurrentPage(currentPage + 1)"
    >
      Next
    </span>
    <span
      v-if="currentPage !== numberOfPages"
      class="px-3 py-2 mr-1 leading-tight border cursor-pointer"
      @click="changeCurrentPage(numberOfPages)"
    >
      Last
    </span>
  </div>
</template>

<script setup lang="ts">
import { BASE_PAGINATION_LIMIT, PAGINATION_RANGE } from '@/const';
import { onMounted, ref } from 'vue';

const props = defineProps({
  total: {
    type: Number,
    required: true,
    validator(value: number) {
      return value > 0;
    }
  },
  currentPage: {
    type: Number,
    required: true
  }
});
const emits = defineEmits(['change-page']);

const paginatorEntries = ref<number[]>();
const numberOfPages = ref(Math.ceil(props.total / BASE_PAGINATION_LIMIT));

const changeCurrentPage = (newPage: number) => {
  emits('change-page', newPage);

  updatePaginatorList(newPage);
};

onMounted(() => {
  updatePaginatorList(props.currentPage);
});

// methods
const generateIndexedArray = (len: number) => {
  return Array(len)
    .fill(0)
    .map((_, index) => index + 1);
};

const updatePaginatorList = (currentPage: number) => {
  if (numberOfPages.value <= BASE_PAGINATION_LIMIT) {
    paginatorEntries.value = generateIndexedArray(numberOfPages.value);
    return;
  }

  if (currentPage <= PAGINATION_RANGE + 1) {
    paginatorEntries.value = generateIndexedArray(BASE_PAGINATION_LIMIT);
    return;
  }

  if (currentPage + PAGINATION_RANGE > numberOfPages.value) {
    paginatorEntries.value = generateIndexedArray(BASE_PAGINATION_LIMIT).map(
      (item) => item + numberOfPages.value - BASE_PAGINATION_LIMIT
    );
    return;
  }

  paginatorEntries.value = generateIndexedArray(BASE_PAGINATION_LIMIT).map(
    (_, index) => currentPage - PAGINATION_RANGE + index
  );
};
</script>
