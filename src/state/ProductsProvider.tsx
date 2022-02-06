import React from 'react';
import { useQuery } from 'react-query';

import { getProducts } from '../common/requests';

export const ProductsContext = React.createContext<{
  data?: any;
  isError?: boolean;
  isLoading?: boolean;
  st?: boolean;
  setSt?: React.Dispatch<React.SetStateAction<boolean>>;
}>({});

export const ProductsProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const { data, isError, isLoading } = useQuery('products', getProducts);
  const [st, setSt] = React.useState(false);
  const memoProducts = React.useMemo(
    () => ({
      data,
      isError,
      isLoading,
      setSt,
      st,
    }),
    [data, isError, isLoading, st, setSt],
  );

  return <ProductsContext.Provider value={memoProducts}>{children}</ProductsContext.Provider>;
};
