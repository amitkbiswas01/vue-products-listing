<template>
  <div class="mt-4 flex justify-center items-center">
    <span
      v-if="currentPage"
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
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
});
const emits = defineEmits(['change-page']);

const paginatorEntries = ref<number[]>([1, 2, 3, 4]);
const numberOfPages = ref(Math.ceil(props.total / BASE_PAGINATION_LIMIT) - 1);

onMounted(() => {
  updatePaginatorList();
});

const updatePaginatorList = () => {
  if (props.currentPage <= PAGINATION_RANGE || props.currentPage > numberOfPages.value) return;

  paginatorEntries.value = [];

  for (
    let index = props.currentPage - PAGINATION_RANGE;
    index < props.currentPage + PAGINATION_RANGE;
    index++
  ) {
    paginatorEntries.value.push(index);
  }

  if (props.currentPage === numberOfPages.value) paginatorEntries.value.pop();
};

const changeCurrentPage = (newPage: number) => {
  emits('change-page', newPage);
  updatePaginatorList();
};
</script>
