import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from 'utils/auth';
import App from './App';
import theme from './theme';

const queryClient = new QueryClient();

render(
  <BrowserRouter basename="/">
    <ChakraProvider theme={theme}>
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
