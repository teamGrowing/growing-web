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
import { enableMocking } from 'mocks/msw';
import MSWToolbar from 'mocks/toolbar/MSWToolbar';
import ApiErrorBoundary from 'components/common/fallback/ApiErrorBoundary';
import RootErrorBoundary from 'components/common/fallback/RootErrorBoundary';
import RootSuspense from 'components/common/fallback/RootSuspense';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import myTheme from './styles/theme/DefaultTheme';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

enableMocking().then(() => {
  root.render(
    // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyle />
        <ThemeProvider theme={myTheme}>
          {process.env.NODE_ENV === 'development' && <MSWToolbar />}
          <RootErrorBoundary>
            <ApiErrorBoundary>
              <RootSuspense>
                <App />
              </RootSuspense>
            </ApiErrorBoundary>
          </RootErrorBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
    // </React.StrictMode>
  );
});
