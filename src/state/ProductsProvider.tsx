import React from 'react';
import { useQuery } from 'react-query';

import { getProducts } from '../common/requests';
import { Product } from '../common/types/ProductTypes';
import { reducer } from './reducers/productsReducer';

export const ProductsContext = React.createContext<{
  products: Product[];
  isError: boolean;
  isLoading: boolean;
}>({
  products: [],
  isError: false,
  isLoading: false,
});

const initialState = {
  products: [],
};

export const ProductsProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { data, isError, isLoading } = useQuery('products', getProducts);

  const { products } = state;

  React.useEffect(() => {
    if (!data) {
      return;
    }

    dispatch({ type: 'initialize', payload: data });
  }, [data]);

  return (
    <ProductsContext.Provider
      value={{
        products,
        isError,
        isLoading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
