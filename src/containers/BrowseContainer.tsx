import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import SectionNavBtn from 'components/SectionNavBtn';
import AppContainer from 'containers/AppContainer';

interface Props {
  current: string;
}

const BrowseContainer: React.FC<Props> = ({ children, current }) => {
  const navItems = [
    {
      label: 'Event Logs',
      path: '/browse/event-logs',
    },
    {
      label: 'DAG Runs',
      path: '/browse/dag-runs',
    },
    {
      label: 'Jobs',
      path: '/browse/jobs',
    },
    {
      label: 'Task Instances',
      path: '/browse/task-instances',
    },
    {
      label: 'Task Reschedules',
      path: '/browse/task-reschedules',
    },
    {
      label: 'SLA Misses',
      path: '/browse/sla-misses',
    },
  ];

  return (
    <AppContainer>
      <Box
        pt={4}
        mx={-4}
        px={4}
        pb="2"
        bg={useColorModeValue('gray.100', 'gray.700')}
      >
        <Heading as="h1">
          <Box
            as="span"
            color={useColorModeValue('gray.400', 'gray.500')}
          >
            Browse/
          </Box>
          {current}
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
        >
          <Box as="nav">
            {navItems.map((item) => (
              <SectionNavBtn key={item.label} item={item} currentLabel={current} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box py="4">{children}</Box>
    </AppContainer>
  );
};

export default BrowseContainer;
