import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import App from './App';
import { AuthProvider } from './auth';

const queryClient = new QueryClient();

const airflowTheme = {
  ...theme,
  config: {
    ...theme.config,
    useSystemColorMode: true,
    initialColorMode: 'dark',
  },
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '36px',
    '6xl': '48px',
  },
};

render(
  <BrowserRouter basename="/">
    <ChakraProvider theme={airflowTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
          {/* Uncomment below to debug ReactQuery */}
          {/* <ReactQueryDevtoolsPanel /> */}
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
