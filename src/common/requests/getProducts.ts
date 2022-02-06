import { $api } from '../http';

export const getProducts = async () => {
  try {
    const { data } = await $api.post<{ products: [{ name: string }] }>('/mock-products', {
      data: {
        filters: {
          category: ['pets'],
        },
      },
    });

    return data;
  } catch {
    console.log('Error with getting products');
  }
};
