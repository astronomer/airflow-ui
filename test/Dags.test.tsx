import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';

import Dags from '../src/views/dags';
import { RouterWrapper } from './wrappers';

let sampleDag = {
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

const mockDags = {
  data: {
    dags: [sampleDag],
    totalEntries: 1,
  },
  loading: false,
  error: null,
};

const mockMutation = {
  mutate: (args: Record<string, any>) => {
    sampleDag = { ...sampleDag, ...args };
  },
};

jest.mock('../src/api', () => ({
  useDags: jest.fn(() => mockDags),
  useVersion: jest.fn(() => ({
    data: { version: '', gitVersion: '' },
    loading: false,
    error: null,
  })),
  useSaveDag: jest.fn(() => mockMutation),
}));

describe('Dags Table', () => {
  it('Clicking a switch should pause/unpause a dag', async () => {
    const { getByRole } = render(
      <Dags />,
      {
        wrapper: RouterWrapper,
      },
    );
    const toggle = getByRole('switch');

    expect(toggle.firstChild?.checked).toBeTruthy();
    fireEvent.click(toggle);
    waitFor(() => expect(toggle.firstChild?.checked).toBeFalsy());
  });
});
