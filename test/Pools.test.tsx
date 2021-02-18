import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import nock from 'nock';

import Pools from 'views/admin/Pools';
import { defaultPools } from 'api/defaults';

import {
  defaultHeaders, QueryWrapper, RouterWrapper, url,
} from './utils';

test('Show a loading indicator and then show the pools', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/pools')
    .reply(200, {
      pools: [
        {
          name: 'string',
          occupied_slots: 0,
          open_slots: 0,
          queued_slots: 0,
          slots: 0,
          used_slots: 0,
        },
      ],
      total_entries: 0,
    });
  const { getByText } = render(
    <RouterWrapper><Pools /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  expect(getByText('Loading…')).toBeInTheDocument();
  waitFor(() => expect(getByText('string')).toBeInTheDocument());
});

test('Show Empty State text if there are no pools', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/pools')
    .reply(200, defaultPools);

  const { getByText } = render(
    <RouterWrapper><Pools /></RouterWrapper>,
    {
      wrapper: QueryWrapper,
    },
  );
  waitFor(() => expect(getByText('No pools added.')).toBeInTheDocument());
});
