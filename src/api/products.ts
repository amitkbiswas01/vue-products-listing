import { BASE_PAGINATION_LIMIT, BASE_URL } from '@/const';

export function getProducts(limit = BASE_PAGINATION_LIMIT, skip = 0): Promise<ProductsResponse> {
  return fetch(
    BASE_URL +
      '?' +
      new URLSearchParams({
        limit: limit.toString(),
        skip: skip.toString()
      })
  ).then((response) => response.json());
}

export function getProduct(productId: number): Promise<Product> {
  return fetch(`${BASE_URL}/${productId}`).then((response) => response.json());
}
