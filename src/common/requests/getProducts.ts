/* eslint-disable no-console */
import { $api } from '../http';
import { ProductsResponse } from '../types/ProductTypes';

export const getProducts = async () => {
  try {
    const { data } = await $api.get<ProductsResponse>('/products');

    return data;
  } catch (e) {
    console.log('Error with getting products', e);
  }
};
