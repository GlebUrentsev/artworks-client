import React from 'react';

import { AdaptiveLayout } from '../AdaptiveLayout';
import { FeaturedProduct } from '../Featured';
import { Photography } from '../Photography';
import { Header } from '../../components/Header';
import { ProductsProvider } from '../../state';

const App = () => {
  return (
    <ProductsProvider>
      <AdaptiveLayout>
        <Header />
        <FeaturedProduct />
        <Photography />
      </AdaptiveLayout>
    </ProductsProvider>
  );
};

export default App;
