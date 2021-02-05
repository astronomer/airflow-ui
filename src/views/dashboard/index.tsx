import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Tag,
  TagLabel,
  Icon,
  Code,
  Flex,
  InputGroup,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FaHeartbeat } from 'react-icons/fa';

import AppContainer from 'containers/AppContainer';
import {
  useDagRuns, useHealth, useEventLogs,
} from 'api';
import type { DagRun, EventLog } from 'interfaces';
import Timeline from './Timeline';
import DagRunChart from './DagRunChart';

dayjs.extend(relativeTime);

const getStatusColor = (status: string): string => (
  status === 'healthy' ? 'green' : 'red'
);

export const TIMEFRAME_OPTIONS: Record<string, any> = {
  hours: { label: 'Past 12 hours', value: dayjs().subtract(12, 'hours').format() },
  day: { label: 'Past Day', value: dayjs().subtract(1, 'day').format() },
  week: { label: 'Past Week', value: dayjs().subtract(1, 'week').format() },
};

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState('day');
  const { data: health } = useHealth();
  const { data: dagRunData } = useDagRuns('~', TIMEFRAME_OPTIONS[timeframe].value);
  const { data: eventLogData } = useEventLogs();

  const onChangeTimeframe = (e: ChangeEvent) => {
    setTimeframe(e.currentTarget.value);
  };

  const logs = eventLogData
    ? eventLogData.eventLogs
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

  const barChartData: any[] = [];
  Object.keys(summary).forEach((key) => {
    barChartData.push([
      key,
      summary[key].successCount,
      summary[key].failedCount,
    ]);
  });

  return (
    <AppContainer>
      <Heading textAlign="center" py="3">
        Activity in the
        {' '}
        {TIMEFRAME_OPTIONS[timeframe].label}
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        {health && (
          <>
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
          </>
        )}
        <InputGroup size="sm" maxWidth="200px">
          <InputLeftAddon>Time Period</InputLeftAddon>
          <Select value={timeframe} onChange={onChangeTimeframe}>
            {Object.keys(TIMEFRAME_OPTIONS).map((key) => (
              <option value={key} key={key}>{TIMEFRAME_OPTIONS[key as 'week' | 'day' | 'hours'].label}</option>
            ))}
          </Select>
        </InputGroup>
      </Flex>
      <Timeline timeframe={TIMEFRAME_OPTIONS[timeframe].value} />
      <SimpleGrid columns={2} spacing={10}>
        <DagRunChart timeframe={TIMEFRAME_OPTIONS[timeframe].value} />
        <Box
          borderWidth="2px"
          borderColor="gray"
          p={1}
        >
          <Flex justifyContent="space-between">
            <Text fontWeight="bold">Recent Logs</Text>
            <Link to="/browse/event-logs">See all</Link>
          </Flex>
          <Box overflow="scroll" maxHeight="300px">
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
