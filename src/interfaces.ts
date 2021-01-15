export interface DagTag {
  name: string,
}

export interface Dag {
  dagId: string,
  rootDagId: string,
  isPaused: boolean,
  isSubdag: boolean,
  fileloc: string,
  fileToken: string,
  owners: Array<string>,
  description: string,
  scheduleInterval: {
    value: string,
  },
  // "schedule_interval": {
  // "__type": "string",
  // "days": 0,
  // "seconds": 0,
  // "microseconds": 0
  // },
  tags: DagTag[],
}

enum DagRunState {
  'success',
  // TODO: add all enums
}

export interface DagRun {
  dagRunId: string,
  dagId: Dag['dagId'],
  executionDate: Date,
  startDate: Date,
  endDate: Date,
  state: DagRunState,
  externalTrigger: boolean,
  conf: JSON,
}

export interface Task {
  taskId: string,
  owner: string,
  startDate: Date,
  endDate: Date,
}

export interface TaskInstance {
  taskId: Task['taskId'],
  dagId: Dag['dagId'],
  executionDate: Date,
  startDate: Date,
  endDate: Date,
  duration: number,
  state: string, // TODO: create enum
  tryNumber: number,
  maxTries: number,
  hostname: string,
  unixname: string,
  pool: string,
  poolSlots: number,
  queue: string,
  priorityWeight: number,
  operator: string,
  queuedWhen: string,
  pid: number
  executorConfig: string,
  slaMiss: {
    taskId: Task['taskId'],
    dagId: Dag['dagId'],
    executionDate: Date,
    emailSent: boolean,
    timestamp: Date,
    description: string,
    notification_sent: boolean,
  },
}

export interface Variable {
  key: string,
  value: string,
}
