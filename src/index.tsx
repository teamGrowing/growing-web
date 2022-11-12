import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './styles/GlobalStyle';
import { myTheme } from './styles/theme/DefaultTheme';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <ThemeProvider theme={myTheme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </>
);
