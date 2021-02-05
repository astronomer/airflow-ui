import React, { useEffect } from 'react';
import Chart from 'react-google-charts';
import {
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';

import theme from 'theme';
import { useDagRuns } from 'api';
import type { DagRun } from 'interfaces';

interface Props {
  timeframe: string;
}

const Dashboard: React.FC<Props> = ({ timeframe }) => {
  const { data: dagRunData, refetch } = useDagRuns('~', timeframe);

  useEffect(() => {
    refetch();
  }, [timeframe]);

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
  if (barChartData.length) {
    return (
      <Chart
        width="500px"
        height="300px"
        chartType="BarChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Dag', 'Successful Runs', 'Failed Runs'],
          ...barChartData,
        ]}
        options={{
          title: 'Recent Dag Runs',
          chartArea: { width: '50%' },
          isStacked: true,
          backgroundColor: useColorModeValue(theme.colors.gray[100], theme.colors.gray[700]),
          hAxis: {
            title: 'Total Runs',
            minValue: 0,
          },
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

export default Dashboard;
