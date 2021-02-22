import React from 'react';
import {
  Box,
  Flex,
  Text,
  Icon,
  Center,
  Tooltip,
} from '@chakra-ui/react';
import { MdDone, MdClose, MdLoop } from 'react-icons/md';
import dayjs from 'dayjs';

import compareObjectProps from 'utils/memo';
import type { DagRun as DagRunType } from 'interfaces';

interface Props {
  dagRun: DagRunType;
}

const DagRun: React.FC<Props> = ({ dagRun }) => {
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
};

export default React.memo(DagRun, compareObjectProps);
