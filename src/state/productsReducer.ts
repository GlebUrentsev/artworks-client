import { Reducer } from 'react';
import { Product } from '../common/types/ProductTypes';

type Action = { type: 'initialize'; payload: Product[] };

type ProductsProviderState = {
  products?: Product[];
};

export const reducer: Reducer<ProductsProviderState, Action> = (state: ProductsProviderState, action: Action) => {
  switch (action.type) {
    case 'initialize': {
      const products = action.payload;

      return {
        products,
      };
    }

    default:
      return state;
  }
};
