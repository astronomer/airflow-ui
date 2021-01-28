/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: fix types for react-query functions
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import type { Dag } from 'interfaces';
import { useToast } from '@chakra-ui/react';

axios.defaults.baseURL = 'http://127.0.0.1:28080/api/v1/';

export function useDags() {
  return useQuery<any, Error>(
    'dags',
    () => axios.get('/dags'),
    { refetchInterval: 2000 },
  );
}

export function useDag(dagId: Dag['dagId']) {
  return useQuery<any, Error>(
    ['dag', dagId],
    () => axios.get(`dags/${dagId}`),
  );
}

export function useDagTasks(dagId: Dag['dagId']) {
  return useQuery<any, Error>(
    'dagTasks',
    () => axios.get(`dags/${dagId}/tasks`),
  );
}

export function useDagRuns(dagId: Dag['dagId']) {
  return useQuery<any, Error>(
    ['dagRun', dagId],
    () => axios.get(`dags/${dagId}/dagRuns`),
  );
}

export function useEventLogs() {
  return useQuery<any, Error>(
    'eventLogs',
    () => axios.get('/eventLogs'),
  );
}

export function useConfig() {
  return useQuery<any, Error>('config', () => axios.get('/config'));
}

export function useConnections() {
  return useQuery<any, Error>(
    'connections',
    () => axios.get('/connections'),
  );
}

export function usePools() {
  return useQuery<any, Error>(
    'pools',
    () => axios.get('/pools'),
  );
}

export function useVariables() {
  return useQuery<any, Error>(
    'variables',
    () => axios.get('/variables'),
  );
}

export function useVersion() {
  return useQuery<any, Error>(
    'version',
    () => axios.get('/version'),
  );
}

export function useSaveDag(dagId: Dag['dagId']) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation<any, Error>((updateDag) => axios.patch(`dags/${dagId}`, updateDag),
    {
      onMutate: async (variables) => {
        await queryClient.cancelQueries(['dag', dagId]);
        const previousDag = queryClient.getQueryData(['dag', dagId]);

        // optimistically set the dag before the async request
        queryClient.setQueryData(['dag', dagId], (old) => ({
          ...(old as Dag),
          ...(variables as unknown as Record<string, any>),
        }));
        return { [dagId]: previousDag };
      },
      onSettled: (res, error, variables, context) => {
      // rollback to previous cache (context) on error
        if (error && (context as any)?.previousDag) {
          queryClient.setQueryData<Dag>(['dag', dagId], (context as { [id: string]: Dag })[dagId]);
          toast({
            title: 'Error updating DAG',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          queryClient.setQueryData(['dag', dagId], res);
          toast({
            title: 'DAG Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        queryClient.invalidateQueries(['dag', dagId]);
      },
    });
}
