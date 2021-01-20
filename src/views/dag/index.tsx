import React, { FunctionComponent, useEffect, useState } from 'react';
import useReactRouter from 'use-react-router';
import {
  Button,
  Box,
  Flex,
  Code,
  List,
  ListItem,
  Tag,
  useColorMode,
} from '@chakra-ui/react';

import drawChart from './drawChart';
import DagContainer from 'containers/DagContainer';
import SidebarTask from './SidebarTask';
import ErrorMessage from 'components/ErrorMessage';

import { useDag, useDagTasks } from 'api';
import type { Dag as DagType, Task } from 'interfaces';

const Dag: FunctionComponent = () => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: DagType['dagId'] }}} = useReactRouter();
  const [sidebarTask, setSidebarTask] = useState<Task | null>(null);
  const { colorMode } = useColorMode();

  const { data: dag, status: dagStatus, error: dagError } = useDag(dagId);
  const { data: { tasks }, status: tasksStatus, error: tasksError } = useDagTasks(dagId);

  useEffect(() => {
    drawChart(400, 600);
  }, []);

  const setTask = (task: Task) => {
    setSidebarTask(task);
  }

  if (!dag) return null;

  return (
    <DagContainer current="overview">
      <ErrorMessage errors={[dagError, tasksError]} />
      <List styleType="none" mt="8">
        {dag && dag.description && (
          <ListItem>
            Description:
            {' '}
            {dag.description}
          </ListItem>
        )}
        {dag && dag.owners && (
          <ListItem>
            Owner(s):
            {' '}
            {dag.owners.join(', ')}
          </ListItem>
        )}
        <ListItem>{dag && dag.isPaused}</ListItem>
        {dag && dag.fileloc && (
          <ListItem>
            File Location:
            {' '}
            <Code>{dag.fileloc}</Code>
          </ListItem>
        )}
        {dag && dag.fileToken && (
          <ListItem>
            File Token:
            {' '}
            <Code>{dag.fileToken}</Code>
          </ListItem>
        )}
        {dag && dag.tags && (
          <ListItem>
            Tags:
            {' '}
            {dag.tags.map((tag) => (
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
        borderColor={colorMode === 'light' ? 'gray.100' : 'gray.700'}
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
