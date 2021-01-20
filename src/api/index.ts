/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// TODO: fix types for react-query functions
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useToast } from '@chakra-ui/react';

import type {
  Dag,
  Task,
  DagRun,
  Variable,
} from 'interfaces';

interface Dags {
  dags: Dag[],
  totalEntries: number,
}

interface TaskData {
  totalEntries: number;
  tasks: Task[];
}

interface DagRunData {
  dagRuns: DagRun[];
  totalEntries: number;
}

interface VariablesData {
  totalEntries: number;
  variables: Variable[];
}

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
    (): Promise<any> => axios.get(`dags/${dagId}/dagRuns`),
    { placeholderData: { dagRuns: [], totalEntries: 0 } },
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
      // rollback to previous cache on error
        if (error && (context as any)?.previousDag) {
          queryClient.setQueryData<Dag>(['dag', dagId], (context as any)[dagId]);
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

export function useAddVariable() {
  const queryClient = useQueryClient();
  return useMutation<any, Error>((addVariable) => axios.post('/variables', addVariable),
  {
    onMutate: async () => {
      await queryClient.cancelQueries('variables');
    },
    onSuccess: (data) => {
      const prevData = queryClient.getQueryData('variables');
      const newVars = [...prevData.variables, data];
      const nextData = { totalEntries: newVars.length, variables: newVars };
      queryClient.setQueryData<VariablesData>('variables', nextData);
    },
  });
}

export function useDeleteVariable(variableKey: Variable['key']) {
  const queryClient = useQueryClient();
  return useMutation<any, Error>((deleteVariable) => axios.delete(`/variables/${variableKey}`, deleteVariable),
  {
    onMutate: async () => {
      await queryClient.cancelQueries('variables');
    },
    onSuccess: () => {
      const prevData = queryClient.getQueryData('variables');
      const newVars = prevData.variables.filter(var => var.key !== variableKey);
      // console.log({ newVars });
      // const nextData = { totalEntries: newVars.length, variables: newVars };
      // queryClient.setQueryData<VariablesData>('variables', nextData);
    },
  });
}
