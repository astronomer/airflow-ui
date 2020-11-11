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
  icons: {
    ...theme.icons,
    logs: {
      path: (
        <path
          fill="currentColor"
          d="M10.1667 18L9 16.8333L11.3333 14.5L9 12.1667L10.1667 11L12.5 13.3333L14.8333 11L16 12.1667L13.6667 14.5L16 16.8333L14.8333 18L12.5 15.6667L10.1667 18Z"
        />
      ),
      viewBox: "0 0 16 18",
    },
  },
}

render(
  <BrowserRouter basename="/">
    <RestfulProvider
      base="http://127.0.0.1:28080/api/v1/"
      // resolve={data => humps.camelizeKeys(data)}
      requestOptions={() => ({
        headers: { Authorization: authorization },
      })}
    >
      <ThemeProvider theme={airflowTheme}>
        <ColorModeProvider>
          <CSSReset />
          <App />
        </ColorModeProvider>
      </ThemeProvider>
    </RestfulProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
