import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

export const url = process.env.SERVER_URL || '';

export const defaultHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-credentials': 'true',
};

export const RouterWrapper: React.FC<{}> = ({ children }) => {
  const history = createMemoryHistory();
  return <Router history={history}>{children}</Router>;
};

export const QueryWrapper: React.FC<{}> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
