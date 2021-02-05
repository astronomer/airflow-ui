import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import {
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import dayjs from 'dayjs';

import theme from 'theme';
import { useTaskInstances } from 'api';
import type { TaskInstance } from 'interfaces';

interface Props {
  timeframe: string;
}

const Timeline: React.FC<Props> = ({ timeframe }) => {
  const { data: taskInstanceData, refetch } = useTaskInstances('~', '~', timeframe);

  useEffect(() => {
    refetch();
  }, [timeframe]);

  const timelineData = taskInstanceData
    ? taskInstanceData.taskInstances.map((taskInstance: TaskInstance) => [
      `${taskInstance.dagId} - ${taskInstance.taskId}`,
      dayjs(taskInstance.startDate),
      dayjs(taskInstance.endDate),
    ])
    : [];

  if (timelineData.length) {
    return (
      <Chart
        height="300px"
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: 'string', id: 'DagRun' },
            { type: 'date', id: 'Start' },
            { type: 'date', id: 'End' },
          ],
          ...timelineData,
        ]}
        options={{
          backgroundColor: useColorModeValue(theme.colors.gray[100], theme.colors.gray[700]),
        }}
      />
    );
  }

  return (
    <Center height="300px">
      <Text>No Data. Try another time range</Text>
    </Center>
  );
};

export default Timeline;
