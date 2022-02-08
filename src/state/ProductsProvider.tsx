import React from 'react';
import { useQuery } from 'react-query';

import { getProducts } from '../common/requests';
import { CartProduct, Product } from '../common/types/ProductTypes';
import { reducer } from './reducers/productsReducer';

export const ProductsContext = React.createContext<{
  products: Product[];
  isError: boolean;
  isLoading: boolean;
  cart: CartProduct[];
  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  toggleCart: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  products: [],
  isError: false,
  isLoading: false,
  cart: [],
  // TODO make noop type and default value
  addToCart: () => {},
  clearCart: () => {},
  toggleCart: () => {},
  isCartOpen: false,
});

const initialState = {
  products: [],
  cart: [],
};

export const ProductsProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [isCartOpen, setIsOpen] = React.useState(false);
  const { data, isError, isLoading } = useQuery('products', getProducts);

  const { products, cart } = state;

  React.useEffect(() => {
    if (!data) {
      return;
    }

    dispatch({ type: 'initialize', payload: data });
  }, [data]);

  const handleAddToCart = (product: CartProduct) => {
    dispatch({ type: 'addToCart', payload: product });
    setIsOpen(true);
  };

  const handleClearCart = () => {
    dispatch({ type: 'clearCart' });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        isError,
        isLoading,
        cart,
        isCartOpen,
        toggleCart: setIsOpen,
        addToCart: handleAddToCart,
        clearCart: handleClearCart,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
