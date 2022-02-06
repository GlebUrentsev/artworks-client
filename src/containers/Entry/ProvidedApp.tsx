import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { App } from './App';
import { GlobalStyles } from '../../styled-utils/GlobalStyles';

const queryClient = new QueryClient();

export const ProvidedApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <App />
    </QueryClientProvider>
  );
};
