import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { App } from './App';

const queryClient = new QueryClient();

export const ProvidedApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
