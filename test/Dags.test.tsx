import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import nock from 'nock';

import Dags from '../src/views/dags';
import { QueryWrapper, RouterWrapper } from './wrappers';

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

nock('http://127.0.0.1:28080')
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
  })
  .persist()
  .intercept('/api/v1/dags/dagId1', 'PATCH')
  .reply(200, { ...sampleDag, ...{ isPaused: !sampleDag.isPaused } });

nock('http://127.0.0.1:28080')
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
  })
  .persist()
  .get('/api/v1/dags')
  .reply(200, {
    dags: [sampleDag],
    totalEntries: 1,
  });

nock('http://127.0.0.1:28080')
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
  })
  .persist()
  .get('/api/v1/version')
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
  nock('http://127.0.0.1:28080')
    .defaultReplyHeaders({
      'access-control-allow-origin': '*',
      'access-control-allow-credentials': 'true',
    })
    .get('/api/v1/dags')
    .reply(404, undefined);

  const { getByText } = render(
    <QueryWrapper><Dags /></QueryWrapper>,
    {
      wrapper: RouterWrapper,
    },
  );
  waitFor(() => expect(getByText('No DAGs found.')).toBeInTheDocument());
});
