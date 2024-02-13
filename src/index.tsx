/* eslint-disable no-prototype-builtins */
import './styles/font.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import myTheme from './styles/theme/DefaultTheme';
import AsyncBoundary from './components/common/AsyncBoundary/AsyncBoundary';
import FullScreenLoading from './components/common/FullScreenLoader/FullScreenLoader';
import FullScreenError from './components/common/FullScreenError/FullScreenError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
      useErrorBoundary: true,
      staleTime: 1000 * 20, //  default to 20 seconds
      refetchOnWindowFocus: false,
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
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
