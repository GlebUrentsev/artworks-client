import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import { GlobalStyles } from '../../styled-utils/GlobalStyles';

const App = React.lazy(() => import('./App'));

const queryClient = new QueryClient();

export const ProvidedApp = () => {
  return (
    <React.Suspense fallback="Loading...">
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <App />
      </QueryClientProvider>
    </React.Suspense>
  );
};
