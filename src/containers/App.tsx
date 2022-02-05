import React from 'react';
import { useQuery } from 'react-query';

import { $api } from '../common/http';

const getProducts = async () => {
  try {
    const { data } = await $api.get<{ products: [{ name: string }] }>('/mock-products');

    return data;
  } catch {
    console.log('Error with getting products');
  }
};

export const App = () => {
  const { data, isLoading, isError } = useQuery('products', getProducts);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isError) {
    return <div>Error, sorry</div>;
  }

  return (
    <div>
      {data?.products.map((product) => (
        <div key={`${product.name}`}>{product.name}</div>
      ))}
    </div>
  );
};
