import { renderHook } from '@testing-library/react-hooks';
import nock from 'nock';

import { useDags } from '../src/api';
import { QueryWrapper } from './wrappers';
import { defaultDags } from '../src/api/defaults';

const expectation = nock('http://127.0.0.1:28080')
  .defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-credentials': 'true',
  })
  .get('/api/v1/dags')
  .reply(200, { dags: [], totalEntries: 0 });

test('at first the query should be loading with no data, after data should be populated', async () => {
  const { result, waitFor } = renderHook(() => useDags(), { wrapper: QueryWrapper });

  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.data).toBeUndefined();
  await waitFor(() => result.current.isSuccess);
  expect(result.current.data).toEqual(defaultDags);
  expectation.done();
});
