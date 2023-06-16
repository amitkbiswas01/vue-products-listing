export const BASE_PAGINATION_LIMIT = 5;
export const PAGINATION_RANGE = 2;
export const BASE_URL = 'https://dummyjson.com/products';

// readonly const
export const SORTING = ['asc', 'desc'] as const;
export const FILTERS = ['price', 'rating'] as const;

// types based on const
export type SortingType = (typeof SORTING)[number];
export type FilterType = (typeof FILTERS)[number];
