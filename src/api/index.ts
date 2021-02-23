import axios, { AxiosResponse } from 'axios';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import humps from 'humps';

import type {
  Dag, DagRun, Health, Version,
} from 'interfaces';
import type {
  DagsResponse,
  DagRunsResponse,
  TasksResponse,
  TaskInstancesResponse,
  EventLogsResponse,
  ConnectionsResponse,
  PoolsResponse,
  VariablesResponse,
  TriggerDagRequest,
} from 'interfaces/api';
import { useToast } from '@chakra-ui/react';
import { camelToSnakeCase } from 'utils';
import DagRuns from 'views/browse/DagRuns';

axios.defaults.baseURL = process.env.SERVER_URL;
axios.interceptors.response.use(
  (res) => (res.data ? humps.camelizeKeys(res.data) as unknown as AxiosResponse : res),
);

const refetchInterval = 1000;

export function useDags() {
  return useQuery<DagsResponse, Error>(
    'dags',
    (): Promise<DagsResponse> => axios.get('/dags'),
    { refetchInterval },
  );
}

export function useDag(dagId: Dag['dagId']) {
  return useQuery<Dag, Error>(
    ['dag', dagId],
    (): Promise<Dag> => axios.get(`dags/${dagId}/details`),
    { refetchInterval },
  );
}

export function useDagTasks(dagId: Dag['dagId']) {
  return useQuery<TasksResponse, Error>(
    'dagTasks',
    (): Promise<TasksResponse> => axios.get(`dags/${dagId}/tasks`),
  );
}

export function useDagRuns(dagId: Dag['dagId'], dateMin?: string) {
  return useQuery<DagRunsResponse, Error>(
    ['dagRun', dagId],
    (): Promise<DagRunsResponse> => axios.get(`dags/${dagId}/dagRuns${dateMin ? `?start_date_gte=${dateMin}` : ''}`),
    { refetchInterval },
  );
}

export function useTaskInstances(dagId: Dag['dagId'], dagRunId: DagRun['dagRunId'], dateMin?: string) {
  return useQuery<TaskInstancesResponse, Error>(
    ['taskInstance', dagRunId],
    (): Promise<TaskInstancesResponse> => (
      axios.get(`dags/${dagId}/dagRuns/${dagRunId}/taskInstances${dateMin ? `?start_date_gte=${dateMin}` : ''}`)
    ),
  );
}

export function useEventLogs() {
  return useQuery<EventLogsResponse, Error>(
    'eventLogs',
    (): Promise<EventLogsResponse> => axios.get('/eventLogs'),
  );
}

export function useHealth() {
  return useQuery<Health, Error>(
    'health',
    (): Promise<Health> => axios.get('/health'),
  );
}

export function useConfig() {
  return useQuery<any, Error>('config', () => axios.get('/config'));
}

export function useConnections() {
  return useQuery<ConnectionsResponse, Error>(
    'connections',
    (): Promise<ConnectionsResponse> => axios.get('/connections'),
  );
}

export function usePools() {
  return useQuery<PoolsResponse, Error>(
    'pools',
    (): Promise<PoolsResponse> => axios.get('/pools'),
  );
}

export function useVariables() {
  return useQuery<VariablesResponse, Error>(
    'variables',
    (): Promise<VariablesResponse> => axios.get('/variables'),
  );
}

export function useVersion() {
  return useQuery<Version, Error>(
    'version',
    (): Promise<Version> => axios.get('/version'),
  );
}

export function useTriggerDag(dagId: Dag['dagId']) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (trigger: TriggerDagRequest) => axios.post(`dags/${dagId}/dagRuns`, camelToSnakeCase(trigger)),
    {
      onSettled: (res, error) => {
        if (error) {
          toast({
            title: 'Error triggering DAG',
            description: (error as Error).message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'DAG Triggered',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          const dagRunData = queryClient.getQueryData(['dagRun', dagId]) as unknown as DagRunsResponse;
          if (dagRunData) {
            queryClient.setQueryData(['dagRun', dagId], {
              dagRuns: [...dagRunData.dagRuns, res],
              totalEntries: dagRunData.totalEntries += 1,
            });
          } else {
            queryClient.setQueryData(['dagRun', dagId], {
              dagRuns: [res],
              totalEntries: 1,
            });
          }
        }
        queryClient.invalidateQueries(['dagRun', dagId]);
      },
    },
  );
}

export function useSaveDag(dagId: Dag['dagId']) {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation(
    (updatedValues: Record<string, any>) => axios.patch(`dags/${dagId}`, camelToSnakeCase(updatedValues)),
    {
      onMutate: async (updatedValues: Record<string, any>) => {
        await queryClient.cancelQueries(['dag', dagId]);
        const previousDag = queryClient.getQueryData(['dag', dagId]) as Dag;
        const previousDags = queryClient.getQueryData('dags') as DagsResponse;

        const newDags = previousDags.dags.map((dag) => (
          dag.dagId === dagId ? { ...dag, ...updatedValues } : dag
        ));
        const newDag = {
          ...previousDag,
          ...updatedValues,
        };

        // optimistically set the dag before the async request
        queryClient.setQueryData(['dag', dagId], () => newDag);
        queryClient.setQueryData('dags', (old) => ({
          ...(old as Dag[]),
          ...{
            dags: newDags,
            totalEntries: previousDags.totalEntries,
          },
        }));
        return { [dagId]: previousDag, dags: previousDags };
      },
      onSettled: (res, error, variables, context) => {
        const previousDag = (context as any)[dagId] as Dag;
        const previousDags = (context as any).dags as DagsResponse;
        // rollback to previous cache on error
        if (error) {
          queryClient.setQueryData(['dag', dagId], previousDag);
          queryClient.setQueryData('dags', previousDags);
          toast({
            title: 'Error updating DAG',
            description: (error as Error).message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        } else {
          // check if server response is different from our optimistic update
          if (JSON.stringify(res) !== JSON.stringify(previousDag)) {
            queryClient.setQueryData(['dag', dagId], res);
            queryClient.setQueryData('dags', {
              dags: previousDags.dags.map((dag) => (
                dag.dagId === dagId ? res : dag
              )),
              totalEntries: previousDags.totalEntries,
            });
          }
          toast({
            title: 'DAG Updated',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
        queryClient.invalidateQueries(['dag', dagId]);
      },
    },
  );
}
