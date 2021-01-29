import React, { useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import {
  Button,
  Box,
  Flex,
  Code,
  List,
  ListItem,
  Tag,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import cronstrue from 'cronstrue';

import DagContainer from 'containers/DagContainer';
import ErrorMessage from 'components/ErrorMessage';
import { useDag, useDagTasks, useDagRuns } from 'api';
import type { Dag as DagType, Task, DagTag } from 'interfaces';
import { defaultDagRuns, defaultDagTasks } from 'api/defaults';
import drawChart from './drawChart';
import SidebarTask from './SidebarTask';

const Dag: React.FC = () => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: DagType['dagId'] }}} = useReactRouter();
  const [sidebarTask, setSidebarTask] = useState<Task | null>(null);

  const { data: dag, isLoading: dagLoading, error: dagError } = useDag(dagId);
  const {
    data: { tasks } = defaultDagTasks, isLoading: tasksLoading, error: tasksError,
  } = useDagTasks(dagId);
  const {
    data: { dagRuns } = defaultDagRuns, isLoading: dagRunsLoading, error: dagRunsError,
  } = useDagRuns(dagId);
  console.log(dagRuns);

  useEffect(() => {
    drawChart(400, 600);
  }, []);

  const setTask = (task: Task) => {
    setSidebarTask(task);
  };

  if (!dag) return null;

  const formatDigits = (digit: number) => (
    digit.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  );

  const formatCron = (cron: string) => (
    cron[0] !== '@' ? cronstrue.toString(cron, { verbose: true }) : ''
  );

  return (
    <DagContainer current="Overview">
      {(dagLoading || dagRunsLoading || tasksLoading) && (
        <Text>Loading…</Text>
      )}
      <ErrorMessage errors={[dagError, tasksError, dagRunsError]} />
      <List styleType="none" mt="8">
        {dag.description && (
          <ListItem>
            Description:
            {' '}
            {dag.description}
          </ListItem>
        )}
        {dag.owners && (
          <ListItem>
            Owner(s):
            {' '}
            {dag.owners.join(', ')}
          </ListItem>
        )}
        <ListItem>{dag.isPaused}</ListItem>
        {dag.fileloc && (
          <ListItem>
            File Location:
            {' '}
            <Code>{dag.fileloc}</Code>
          </ListItem>
        )}
        {dag.fileToken && (
          <ListItem>
            File Token:
            {' '}
            <Code>{dag.fileToken}</Code>
          </ListItem>
        )}
        {dag.scheduleInterval && (
          <ListItem>
            Schedule:
            {' '}
            {dag.scheduleInterval.type === 'CronExpression'
              ? (
                <>
                  {formatCron(dag.scheduleInterval.value)}
                  <Code>{dag.scheduleInterval.value}</Code>
                </>
              )
              : (
                <>
                  {dag.scheduleInterval.days}
                  d
                  {' '}
                  {formatDigits(dag.scheduleInterval.seconds)}
                  :
                  {formatDigits(dag.scheduleInterval.microseconds)}
                </>
              )}
          </ListItem>
        )}
        {dag.tags && (
          <ListItem>
            Tags:
            {' '}
            {dag.tags.map((tag: DagTag) => (
              <Tag key={tag.name} mr={1}>{tag.name}</Tag>
            ))}
          </ListItem>
        )}
      </List>
      <Box
        mt={2}
        p={4}
        borderRadius="4px"
        borderWidth="4px"
        borderColor={useColorModeValue('gray.100', 'gray.700')}
      >
        <Flex>
          {tasks.map((task: Task) => (
            <div key={task.taskId}>
              <Button
                onClick={() => setTask(task)}
                mt={4}
                variant="outline"
              >
                {task.taskId}
              </Button>
            </div>
          ))}
        </Flex>
      </Box>
      <Box id="chart" mt={4} />
      {sidebarTask && <SidebarTask task={sidebarTask} />}
    </DagContainer>
  );
};

export default Dag;
