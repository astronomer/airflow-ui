import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import nock from 'nock';

import Variables from 'views/admin/Variables';
import { defaultVariables } from 'api/defaults';

import {
  defaultHeaders, QueryWrapper, RouterWrapper, url,
} from './utils';

test('Show a loading indicator and then show the variables', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/variables')
    .reply(200, {
      variables: [
        {
          key: 'string',
        },
      ],
      total_entries: 0,
    });
  const { getByText } = render(
    <RouterWrapper><Variables /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  expect(getByText('Loading…')).toBeInTheDocument();
  waitFor(() => expect(getByText('string')).toBeInTheDocument());
});

test('Show Empty State text if there are no variables', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/variables')
    .reply(200, defaultVariables);

  const { getByText } = render(
    <RouterWrapper><Variables /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  waitFor(() => expect(getByText('No variables added.')).toBeInTheDocument());
});
