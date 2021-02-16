import type {
  Dag, Task, DagRun, EventLog, Connection, Variable, Pool, TaskInstance,
} from './index';

interface Entries {
  totalEntries: number;
}

export interface DagsResponse extends Entries {
  dags: Dag[];
}

export interface TasksResponse extends Entries {
  tasks: Task[];
}

export interface DagRunsResponse extends Entries {
  dagRuns: DagRun[];
}

export interface EventLogsResponse extends Entries {
  eventLogs: EventLog[];
}

export interface ConnectionsResponse extends Entries {
  connections: Connection[];
}

export interface VariablesResponse extends Entries {
  variables: Variable[];
}

export interface PoolsResponse extends Entries {
  pools: Pool[];
}

export interface TaskInstancesResponse extends Entries {
  taskInstances: TaskInstance[];
}
