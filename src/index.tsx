/* eslint-disable no-prototype-builtins */
import './styles/font.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import queryClient from 'libs/react-query/react-query';
import 'libs/dayjs';
import 'libs/swiper';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import myTheme from './styles/theme/DefaultTheme';
import AsyncBoundary from './components/common/AsyncBoundary/AsyncBoundary';
import FullScreenLoading from './components/common/FullScreenLoader/FullScreenLoader';
import FullScreenError from './components/common/FullScreenError/FullScreenError';

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  // eslint-disable-next-line consistent-return
  return worker.start();
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
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
});
