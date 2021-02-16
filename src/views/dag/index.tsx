import React from 'react';
import useReactRouter from 'use-react-router';
import {
  Button,
  Box,
  Flex,
  Code,
  Tag,
  useColorModeValue,
  Text,
  Icon,
  Center,
  Tooltip,
  Table,
  Tr,
  Td,
  Th,
  Tbody,
} from '@chakra-ui/react';
import cronstrue from 'cronstrue';
import { MdDone, MdClose, MdLoop } from 'react-icons/md';
import dayjs from 'dayjs';

import { useDag, useDagTasks, useDagRuns } from 'api';
import { defaultDagRuns, defaultTasks } from 'api/defaults';

import DagContainer from 'containers/DagContainer';
import ErrorMessage from 'components/ErrorMessage';

import { formatScheduleCode } from 'utils';

import type {
  Dag as DagType, Task, DagTag, DagRun,
} from 'interfaces';

const Dag: React.FC = () => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: DagType['dagId'] }}} = useReactRouter();

  const { data: dag, isLoading: dagLoading, error: dagError } = useDag(dagId);
  const {
    data: { tasks } = defaultTasks, isLoading: tasksLoading, error: tasksError,
  } = useDagTasks(dagId);
  const {
    data: { dagRuns } = defaultDagRuns, isLoading: dagRunsLoading, error: dagRunsError,
  } = useDagRuns(dagId);

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

export default Dag;
