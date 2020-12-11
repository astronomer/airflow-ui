import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';
// import humps from 'humps';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import App from './App';

const USERNAME = 'admin';
const PASSWORD = 'admin';
const authorization = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

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

render(
  <BrowserRouter basename="/">
    <RestfulProvider
      base="http://127.0.0.1:28080/api/v1/"
      // resolve={data => humps.camelizeKeys(data)}
      requestOptions={() => ({
        headers: { Authorization: authorization },
      })}
    >
      <ChakraProvider theme={airflowTheme}>
        <App />
      </ChakraProvider>
    </RestfulProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
