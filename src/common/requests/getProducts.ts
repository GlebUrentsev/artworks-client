import { $api } from '../http';
import { ProductsResponse } from '../types/ProductTypes';

export const getProducts = async () => {
  try {
    const { data } = await $api.post<ProductsResponse>('/mock-products', {
      data: {
        filters: {
          category: ['pets'],
        },
      },
    });

    return data?.products;
  } catch {
    console.log('Error with getting products');
  }
};
