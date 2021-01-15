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

const fetchDags = (): Promise<any> =>
  axios.get('/dags').then((res) => humps.camelizeKeys(res.data));
export function useDags(): any { return useQuery<Dags, Error>('dags', fetchDags); }

const fetchDag = (dagId: Dag['dagId']): Promise<any> =>
  axios.get(`dags/${dagId}`).then((res) => humps.camelizeKeys(res.data));
export function useDag(dagId: Dag['dagId']) { return useQuery<Dag, Error>(['dag', dagId], () => fetchDag(dagId)); }

const fetchDagTasks = (dagId: Dag['dagId']): Promise<any> =>
  axios.get(`dags/${dagId}/tasks`).then((res) => humps.camelizeKeys(res.data));
export function useDagTasks(dagId: Dag['dagId']) { return useQuery<TaskData, Error>('dagTasks', () => fetchDagTasks(dagId)); }

const fetchConfig = (): Promise<any> => 
  axios.get('/config');
export function useConfig() { return useQuery<any, Error>('config', fetchConfig); }


export function useSaveDag(dagId: Dag['dagId']) {
  const queryClient = useQueryClient();
  return useMutation<any, Error>((updateDag) => axios.patch(`dags/${dagId}`, updateDag),
  {
    onMutate: async (variables) => {
      await queryClient.cancelQueries(['dag', dagId]);
      const previousDag = queryClient.getQueryData(['dag', dagId])

      queryClient.setQueryData(['dag', dagId], (old) => ({
        ...(old as Dag),
        ...(variables as unknown as Record<string, any>),
      }))
      return { [dagId]: previousDag }
    },
    onSuccess: (res) => {
      queryClient.setQueryData(['dag', dagId], res.data);
    },
    onError: (error, data, context) => {
      // rollback to previous
      console.log('context', context);
      if ((context as any)?.previousDag) {
        queryClient.setQueryData<Dag>(['dag', dagId], (context as any)[dagId])
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['dag', dagId])
    },
  })
}
