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

const queryClient = new QueryClient();

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
            pendingFallback={<div>로딩중</div>}
            rejectedFallback={() => <div>error!</div>}
          >
            <App />
          </AsyncBoundary>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
