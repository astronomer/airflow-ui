import React from 'react';
import Chart from 'react-google-charts';
import { Link } from 'react-router-dom';
import {
  Box, SimpleGrid, Text, Heading, Tag, TagLabel, Icon, Code, Flex,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeartbeat } from 'react-icons/fa';

import AppContainer from 'containers/AppContainer';
import {
  useAllDagRuns, useHealth, useEventLogs, useTaskInstances,
} from 'api';
import type { DagRun, EventLog } from 'interfaces';

dayjs.extend(relativeTime);

const getStatusColor = (status: string): string => (
  status === 'healthy' ? 'green' : 'red'
);

const Dashboard: React.FC = () => {
  const { data: health } = useHealth();
  const yesterday = dayjs().subtract(1, 'days');
  const { data: dagRunData } = useAllDagRuns(yesterday.format());
  const { data: eventLogData } = useEventLogs();
  const { data: taskInstanceData } = useTaskInstances('~', '~', yesterday.format());

  const logs = eventLogData
    ? eventLogData.eventLogs.filter((log: EventLog) => dayjs(log.when) > yesterday)
    : [];

  const summary: Record<string, { failedCount: number; successCount: number }> = {};
  if (dagRunData) {
    dagRunData.dagRuns.forEach((dagRun: DagRun) => {
      if (!summary[dagRun.dagId]) {
        summary[dagRun.dagId] = { failedCount: 0, successCount: 0 };
      }
      if (dagRun.state === 'success') {
        summary[dagRun.dagId].successCount += 1;
      }
      if (dagRun.state === 'failed') {
        summary[dagRun.dagId].failedCount += 1;
      }
    });
  }

  const timelineData = taskInstanceData
    ? taskInstanceData.taskInstances.map((taskInstance: any) => [
      `${taskInstance.taskId}`,
      dayjs(taskInstance.startDate),
      dayjs(taskInstance.endDate),
    ]).filter((entry: any[]) => !!entry[2])
    : [];

  return (
    <AppContainer>
      <Heading textAlign="center" py="3">Activity in the last 24 hours</Heading>
      <Chart
        height="300px"
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'string', id: 'President' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' },
          ],
          ...timelineData,
        ]}
      />
      <SimpleGrid columns={2} spacing={10}>
        {health && (
          <Box>
            <Tag size="md" rounded="full" colorScheme={getStatusColor(health.metadatabase.status)}>
              <TagLabel>Metadata Database</TagLabel>
            </Tag>
            <Tag size="md" rounded="full" colorScheme={getStatusColor(health.scheduler.status)}>
              <TagLabel mr="1">Scheduler</TagLabel>
              <Icon as={FaHeartbeat} mr="1" />
              <TagLabel>
                {dayjs(health.scheduler.latestSchedulerHeartbeat).fromNow()}
              </TagLabel>
            </Tag>
          </Box>
        )}
        <Box
          borderWidth="2px"
          borderColor="gray"
          p={1}
        >
          <Text fontWeight="bold">Dag Runs</Text>
          {Object.keys(summary).map((key) => (
            <Box
              key={key}
              p="1"
            >
              <Text fontWeight="bold"><Link to={`/dags/${key}`}>{key}</Link></Text>
              <Text>
                Successful Runs:
                {' '}
                {summary[key].successCount}
              </Text>
              <Text>
                Failed Runs:
                {' '}
                {summary[key].failedCount}
              </Text>
            </Box>
          ))}
        </Box>
        <Box
          borderWidth="2px"
          borderColor="gray"
          p={1}
        >
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Recent Logs</Text>
            <Link to="/browse/event-logs">See all</Link>
          </Flex>
          <Box overflow="scroll" maxHeight="400px">
            {logs.map((log: any) => (
              <pre key={log.eventLogId}>
                <Code p="1">
                  {dayjs(log.when).format('HH:mm:ss')}
                  {': '}
                  {log.dagId}
                  {' '}
                  {log.event}
                </Code>
              </pre>
            ))}
          </Box>
        </Box>
      </SimpleGrid>
    </AppContainer>
  );
};

export default Dashboard;
