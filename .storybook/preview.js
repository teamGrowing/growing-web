import React from 'react';

import GlobalStyle from '../src/styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import myTheme from '../src/styles/theme/DefaultTheme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

export const decorators = [
  (Story) => (
    <>
      <GlobalStyle />
      <ThemeProvider theme={myTheme}>
        <Story />
      </ThemeProvider>
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};
