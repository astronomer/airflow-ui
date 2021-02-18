import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import nock from 'nock';

import Connections from 'views/admin/Connections';
import { defaultConnections } from 'api/defaults';

import {
  defaultHeaders, QueryWrapper, RouterWrapper, url,
} from './utils';

test('Show a loading indicator and then show the connections', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/connections')
    .reply(200, {
      connections: [
        {
          conn_type: 'string',
          connection_id: 'string',
          host: 'string',
          login: 'string',
          port: 0,
          schema: 'string',
        },
      ],
      total_entries: 0,
    });
  const { getByText } = render(
    <RouterWrapper><Connections /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  expect(getByText('Loading…')).toBeInTheDocument();
  waitFor(() => expect(getByText('string')).toBeInTheDocument());
});

test('Show Empty State text if there are no connections', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/connections')
    .reply(200, defaultConnections);

  const { getByText } = render(
    <RouterWrapper><Connections /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  waitFor(() => expect(getByText('No connections added.')).toBeInTheDocument());
});
