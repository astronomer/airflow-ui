import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';
// import humps from 'humps';
import {
  ColorModeProvider,
  CSSReset,
  ThemeProvider,
  theme,
} from '@chakra-ui/core';
import App from './App';

const USERNAME = 'admin';
const PASSWORD = 'admin';
const authorization = `Basic ${btoa(`${USERNAME}:${PASSWORD}`)}`;

render(
  <BrowserRouter basename="/">
    <RestfulProvider
      base="http://127.0.0.1:28080/api/v1/"
      // resolve={data => humps.camelizeKeys(data)}
      requestOptions={() => ({
        headers: { Authorization: authorization },
      })}
    >
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </RestfulProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
