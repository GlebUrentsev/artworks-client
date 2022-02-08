/* eslint-disable no-underscore-dangle */
import { Reducer } from 'react';
import { CartProduct, Product } from '../../common/types/ProductTypes';

type Action =
  | { type: 'initialize'; payload: Product[] }
  | { type: 'addToCart'; payload: CartProduct }
  | { type: 'clearCart' };

type ProductsProviderState = {
  products: Product[];
  cart: CartProduct[];
};

export const reducer: Reducer<ProductsProviderState, Action> = (state: ProductsProviderState, action: Action) => {
  switch (action.type) {
    case 'initialize': {
      return {
        ...state,
        products: action.payload,
      };
    }

    case 'addToCart': {
      const { _id: id, image, price, name, currency } = action.payload;
      const newCartProduct = {
        _id: id,
        image,
        price,
        name,
        currency,
      };

      return {
        ...state,
        cart: [...state.cart, newCartProduct],
      };
    }

    case 'clearCart': {
      return {
        ...state,
        cart: [],
      };
    }

    default:
      return state;
  }
};
