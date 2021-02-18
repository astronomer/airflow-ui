import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import nock from 'nock';

import Dags from 'views/dags';
import {
  defaultHeaders, QueryWrapper, RouterWrapper, url,
} from './utils';

const sampleDag = {
  dagId: 'dagId1',
  description: 'string',
  fileToken: 'string',
  fileloc: 'string',
  isPaused: false,
  isSubdag: true,
  rootDagId: 'string',
  owners: [
    'string',
  ],
  tags: [
    {
      name: 'string',
    },
  ],
};

nock(url)
  .defaultReplyHeaders(defaultHeaders)
  .persist()
  .intercept('/dags/dagId1', 'PATCH')
  .reply(200, { ...sampleDag, ...{ isPaused: !sampleDag.isPaused } });

nock(url)
  .defaultReplyHeaders(defaultHeaders)
  .persist()
  .get('/dags')
  .reply(200, {
    dags: [sampleDag],
    totalEntries: 1,
  });

nock(url)
  .defaultReplyHeaders(defaultHeaders)
  .persist()
  .get('/version')
  .reply(200, { version: '', gitVersion: '' });

test('Show a loading indicator and have a DAG count of 0 before data loads', async () => {
  const { getByText } = render(
    <QueryWrapper><Dags /></QueryWrapper>,
    {
      wrapper: RouterWrapper,
    },
  );
  expect(getByText('Loading…')).toBeInTheDocument();
  expect(getByText('All (0)')).toBeInTheDocument();
  await waitFor(() => expect(getByText('All (1)')).toBeInTheDocument());
});

test('Clicking on a toggle will change its state and show a success toast', async () => {
  const { getByText, getByRole } = render(
    <QueryWrapper><Dags /></QueryWrapper>,
    {
      wrapper: RouterWrapper,
    },
  );
  await waitFor(() => expect(getByText('All (1)')).toBeInTheDocument());
  const toggle = getByRole('switch');
  expect(toggle.firstChild?.checked).toBeTruthy();
  fireEvent.click(toggle);
  waitFor(() => expect(getByText('DAG Updated')).toBeInTheDocument());
  waitFor(() => expect(toggle.firstChild?.checked).toBeFalsy());
});

test('Show Empty State text if there are no dags', () => {
  nock(url)
    .defaultReplyHeaders(defaultHeaders)
    .get('/dags')
    .reply(404, undefined);

  const { getByText } = render(
    <QueryWrapper><Dags /></QueryWrapper>,
    {
      wrapper: RouterWrapper,
    },
  );
  waitFor(() => expect(getByText('No DAGs found.')).toBeInTheDocument());
});
