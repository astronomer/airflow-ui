import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtoolsPanel } from 'react-query/devtools';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import axios from 'axios';
import App from './App';

const USERNAME = 'admin';
const PASSWORD = 'admin';
const authorization = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;
const queryClient = new QueryClient();

const airflowTheme = {
  ...theme,
  fontSizes: {
    xs: "10px",
    sm: "12px",
    md: "14px",
    lg: "16px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "24px",
    "4xl": "28px",
    "5xl": "36px",
    "6xl": "48px",
  },
};

axios.defaults.baseURL = 'http://127.0.0.1:28080/api/v1/';
axios.defaults.headers.common['Authorization'] = authorization;

render(
  <BrowserRouter basename="/">
    <ChakraProvider theme={airflowTheme}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtoolsPanel /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
