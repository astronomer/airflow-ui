import React from 'react';
import {
  Box,
  Text,
  Icon,
  Center,
  Tooltip,
  Spinner,
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
      bg = 'green.500';
      icon = MdDone;
      break;
    case 'failed':
      bg = 'red.400';
      icon = MdClose;
      break;
    case 'running':
      bg = 'green.300';
      break;
    default:
      break;
  }
  const Label = (
    <Box>
      <Text>
        Status:
        {' '}
        <Text as="span" color={bg} fontWeight="bold">{dagRun.state}</Text>
      </Text>
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
        m="1"
      >
        {dagRun.state === 'running' && (
          <Spinner size="xs" speed="0.85s" />
        )}
        {dagRun.state !== 'running' && (
          <Icon as={icon} />
        )}
      </Center>
    </Tooltip>
  );
};

export default React.memo(DagRun, compareObjectProps);
