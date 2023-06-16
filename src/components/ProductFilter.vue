<template>
  <div class="flex items-center mb-4">
    <label for="sorting" class="block text-lg font-bold text-gray-900 mr-2">
      {{ label.toUpperCase() }}
    </label>
    <select
      id="sorting"
      class="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded focus:ring-gray-500 focus:border-gray-500 block p-2.5"
      @change="updateSorting($event)"
    >
      <option value="" selected>Choose a sorting</option>
      <option v-for="sType in SORTING" :key="sType" :value="sType">
        {{ sType.toUpperCase() }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { SORTING } from '@/const';

defineProps({
  label: {
    type: String,
    default: 'Select an option'
  }
});
const emits = defineEmits(['sorting-updated']);

const updateSorting = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value;
  if (!selectedValue) return;

  emits('sorting-updated', selectedValue);
};
</script>
