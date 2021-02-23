import React from 'react';
import useReactRouter from 'use-react-router';
import {
  Button,
  Flex,
  Code,
  Tag,
  Text,
  Table,
  Tr,
  Td,
  Th,
  Tbody,
} from '@chakra-ui/react';
import cronstrue from 'cronstrue';

import {
  useDag, useDagTasks, useDagRuns, useTaskInstances,
} from 'api';
import { defaultDagRuns, defaultTaskInstances, defaultTasks } from 'api/defaults';
import { formatScheduleCode } from 'utils';
import compareObjectProps from 'utils/memo';
import type {
  Dag as DagType, Task, DagTag, DagRun as DagRunType, TaskInstance,
} from 'interfaces';

import DagContainer from 'containers/DagContainer';
import ErrorMessage from 'components/ErrorMessage';
import DagRun from './DagRun';

interface RouterProps {
  match: { params: { dagId: DagType['dagId'] } }
}

interface DagProps {
  dag: DagType;
  tasks: Task[];
  dagRuns: DagRunType[];
  taskInstances: TaskInstance[];
  isLoading: boolean;
  errors: (Error | null)[];
}

const Dag: React.FC<DagProps> = ({
  dag,
  tasks,
  dagRuns,
  isLoading,
  errors,
  taskInstances,
}) => {
  const formatCron = (cron: string) => (
    cron[0] !== '@' ? cronstrue.toString(cron, { verbose: true }) : ''
  );
  console.log(taskInstances);

  return (
    <DagContainer current="Overview">
      {isLoading && (
        <Text>Loading…</Text>
      )}
      <ErrorMessage errors={errors} />
      <Table size="sm" mt="8">
        <Tbody>
          {dag.description && (
            <Tr>
              <Th>Description</Th>
              <Td>{dag.description}</Td>
            </Tr>
          )}
          {dag.owners && (
            <Tr>
              <Th>Owner(s)</Th>
              <Td>{dag.owners.join(', ')}</Td>
            </Tr>
          )}
          {dag.fileloc && (
            <Tr>
              <Th>File Location</Th>
              <Td><Code>{dag.fileloc}</Code></Td>
            </Tr>
          )}
          {dag.fileToken && (
            <Tr>
              <Th>File Token</Th>
              <Td><Code>{dag.fileToken}</Code></Td>
            </Tr>
          )}
          {dag.scheduleInterval && (
            <Tr>
              <Th>Schedule</Th>
              <Td>
                {dag.scheduleInterval.type === 'CronExpression' && formatCron(dag.scheduleInterval.value)}
                {' '}
                <Code>{formatScheduleCode(dag.scheduleInterval)}</Code>
              </Td>
            </Tr>
          )}
          {dag.tags && (
            <Tr>
              <Th>Tags</Th>
              <Td>
                {dag.tags.map((tag: DagTag) => (
                  <Tag key={tag.name} mr={1}>{tag.name}</Tag>
                ))}
              </Td>
            </Tr>
          )}
          <Tr>
            <Th>Recent Runs</Th>
            <Td>
              <Flex>
                {dagRuns.map((dagRun: DagRunType) => (
                  <DagRun dagRun={dagRun} key={dagRun.dagRunId} />
                ))}
              </Flex>
            </Td>
          </Tr>
          <Tr>
            <Th>Tasks</Th>
            <Td>
              <Flex>
                {tasks.map((task: Task) => (
                  <div key={task.taskId}>
                    <Button
                      m={2}
                      variant="outline"
                    >
                      {task.taskId}
                    </Button>
                  </div>
                ))}
              </Flex>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </DagContainer>
  );
};

const MemoDag = React.memo(Dag, compareObjectProps);

const DagWrapper: React.FC = () => {
  const { match: { params: { dagId } } }: RouterProps = useReactRouter();

  const { data: dag, isLoading: dagLoading, error: dagError } = useDag(dagId);
  const {
    data: { tasks } = defaultTasks, isLoading: tasksLoading, error: tasksError,
  } = useDagTasks(dagId);
  const {
    data: { dagRuns } = defaultDagRuns, isLoading: dagRunsLoading, error: dagRunsError,
  } = useDagRuns(dagId);
  const {
    data: { taskInstances } = defaultTaskInstances,
    isLoading: taskInstancesLoading,
    error: taskInstancesError,
  } = useTaskInstances(dagId, '~');

  if (!dag) return null;
  return (
    <MemoDag
      dag={dag}
      isLoading={dagLoading || dagRunsLoading || tasksLoading || taskInstancesLoading}
      errors={[dagError, tasksError, dagRunsError, taskInstancesError]}
      dagRuns={dagRuns}
      tasks={tasks}
      taskInstances={taskInstances}
    />
  );
};

export default DagWrapper;
