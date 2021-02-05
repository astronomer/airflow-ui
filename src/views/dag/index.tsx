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
  Icon,
  Center,
  Tooltip,
} from '@chakra-ui/react';
import cronstrue from 'cronstrue';
import { MdDone, MdClose, MdLoop } from 'react-icons/md';
import dayjs from 'dayjs';

import DagContainer from 'containers/DagContainer';
import ErrorMessage from 'components/ErrorMessage';
import { useDag, useDagTasks, useDagRuns } from 'api';
import type {
  Dag as DagType, Task, DagTag, DagRun,
} from 'interfaces';
import { defaultDagRuns, defaultDagTasks } from 'api/defaults';
import { formatScheduleCode } from 'utils';

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

  useEffect(() => {
    drawChart(400, 600);
  }, []);

  const setTask = (task: Task) => {
    setSidebarTask(task);
  };

  if (!dag) return null;

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
            {dag.scheduleInterval.type === 'CronExpression' && formatCron(dag.scheduleInterval.value)}
            {' '}
            <Code>{formatScheduleCode(dag.scheduleInterval)}</Code>
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
      <Box py="1">
        <Text>Recent Runs:</Text>
        <Flex mt="1">
          {dagRuns.map((dagRun: DagRun) => {
            let bg = 'white';
            let icon = MdLoop;
            switch (dagRun.state) {
              case 'success':
                bg = 'green.400';
                icon = MdDone;
                break;
              case 'failed':
                bg = 'red.400';
                icon = MdClose;
                break;
              case 'running':
                break;
              default:
                break;
            }
            const Label = (
              <Box>
                <Flex>
                  Status:
                  {' '}
                  <Text color={bg}>{dagRun.state}</Text>
                </Flex>
                <Text>
                  Run:
                  {' '}
                  {dagRun.dagRunId}
                </Text>
                <Text>
                  Started:
                  {' '}
                  {dayjs(dagRun.startDate).format('HH:mm:ss D-M-YY')}
                </Text>
                {dagRun.endDate && (
                  <Text>
                    End:
                    {' '}
                    {dayjs(dagRun.endDate).format('HH:mm:ss D-M-YY')}
                  </Text>
                )}
              </Box>
            );
            return (
              <Tooltip
                bg={useColorModeValue('gray.300', 'gray.500')}
                label={Label}
                aria-label="Dag Run Details"
                key={dagRun.dagRunId}
                hasArrow
              >
                <Center
                  height="20px"
                  width="20px"
                  borderRadius="20px"
                  bg={bg}
                  mx="1"
                >
                  <Icon as={icon} />
                </Center>
              </Tooltip>
            );
          })}
        </Flex>
      </Box>
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
