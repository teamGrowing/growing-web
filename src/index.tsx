/* eslint-disable no-prototype-builtins */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import myTheme from './styles/theme/DefaultTheme';
import AsyncBoundary from './services/AsyncBoundary';
import FullScreenLoading from './components/common/FullScreenLoader';
import FullScreenError from './components/common/FullScreenError';
import { Store, StoreContext } from './stores/RootStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
      staleTime: 1000 * 20, //  default to 20 seconds
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StoreContext.Provider value={Store}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyle />
          <ThemeProvider theme={myTheme}>
            <AsyncBoundary
              pendingFallback={<FullScreenLoading />}
              rejectedFallback={({ error, resetErrorBoundary }) => (
                <FullScreenError
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <App />
            </AsyncBoundary>
          </ThemeProvider>
        </StoreContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

if (
  !new (class {
    x: any;
  })().hasOwnProperty('x')
)
  throw new Error('Transpiler is not configured correctly');
