import React from 'react';

import { AdaptiveLayout } from '../AdaptiveLayout';
import { FeaturedProduct } from '../Featured';

import { Header } from '../../components/Header';
import { ProductsProvider } from '../../state';

export const App = () => {
  return (
    <ProductsProvider>
      <AdaptiveLayout>
        <Header />
        <FeaturedProduct />
        {/* Filtered products */}
      </AdaptiveLayout>
    </ProductsProvider>
  );
};
