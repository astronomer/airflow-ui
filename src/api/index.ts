/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
// TODO: fix types for react-query functions
import axios from 'axios';
import humps from 'humps';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import type { Dag, Task } from 'interfaces';

interface Dags {
  dags: Dag[],
  totalEntries: number,
}

interface TaskData {
  totalEntries: number;
  tasks: Task[];
}

axios.defaults.baseURL = 'http://127.0.0.1:28080/api/v1/';
// intercept responses and turn them to camelCase
axios.interceptors.response.use(
  (res) => humps.camelizeKeys(res.data) as any,
  error => Promise.reject(error)
);

export function useDags() {
  return useQuery<Dags, Error>(
    'dags',
    (): Promise<any> => axios.get('/dags'),
    { refetchInterval: 500 }
  );
}

export function useDag(dagId: Dag['dagId']) {
  return useQuery<Dag, Error>(['dag', dagId], (): Promise<any> => axios.get(`dags/${dagId}`));
}

export function useDagTasks(dagId: Dag['dagId']) {
  return useQuery<TaskData, Error>('dagTasks', (): Promise<any> => axios.get(`dags/${dagId}/tasks`));
}

export function useConfig() {
  return useQuery<any, Error>('config', (): Promise<any> => axios.get('/config'));
}

export function useConnections() {
  return useQuery<any, Error>('connections', (): Promise<any> => axios.get('/connections'));
}

export function usePools() {
  return useQuery<any, Error>('pools', (): Promise<any> => axios.get('/pools'));
}

export function useVariables() {
  return useQuery<any, Error>('variables', (): Promise<any> => axios.get('/variables'));
}

export function useSaveDag(dagId: Dag['dagId']) {
  const queryClient = useQueryClient();
  return useMutation<any, Error>((updateDag) => axios.patch(`dags/${dagId}`, updateDag),
  {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(['dag', dagId]);
      const previousDag = queryClient.getQueryData(['dag', dagId])

      // optimistically set the dag before the async request
      queryClient.setQueryData(['dag', dagId], (old) => ({
        ...(old as Dag),
        ...(variables as unknown as Record<string, any>),
      }))
      return { [dagId]: previousDag }
    },
    onSettled: (res, error, variables, context) => {
      // rollback to previous cache on error
      if (error && (context as any)?.previousDag)
        queryClient.setQueryData<Dag>(['dag', dagId], (context as any)[dagId])
      else
        queryClient.setQueryData(['dag', dagId], res);
      queryClient.invalidateQueries(['dag', dagId])
    },
  })
}
