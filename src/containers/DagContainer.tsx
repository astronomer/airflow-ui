import React, { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Switch,
  useColorModeValue,
} from '@chakra-ui/react';

import { useDag, useSaveDag } from 'api';
import SectionNavBtn from 'components/SectionNavBtn';
import AppContainer from 'containers/AppContainer';
import type { Dag } from 'interfaces';

interface Props {
  current: string;
  displayRunSelect?: boolean;
}

const DagContainer: React.FC<Props> = ({ children, current, displayRunSelect = false }) => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();
  const [isPaused, setIsPaused] = useState(false);
  // dag error is handled in children
  const { data: dag } = useDag(dagId);

  const mutation = useSaveDag(dagId);

  useEffect(() => {
    if (dag && dag.isPaused !== isPaused) {
      setIsPaused(dag.isPaused);
    }
  }, [dag, isPaused]);

  const toggleDagPaused = (): void => {
    mutation.mutate({ is_paused: !isPaused });
    setIsPaused(!isPaused);
  };

  const navItems = [
    {
      label: 'Overview',
      path: `/dags/${dagId}`,
    },
    {
      label: 'Tree',
      path: `/dags/${dagId}/tree`,
    },
    {
      label: 'Graph',
      path: `/dags/${dagId}/graph`,
    },
    {
      label: 'Task Tries',
      path: `/dags/${dagId}/task-tries`,
    },
    {
      label: 'Landing Times',
      path: `/dags/${dagId}/landing-times`,
    },
    {
      label: 'Gantt',
      path: `/dags/${dagId}/gantt`,
    },
    {
      label: 'Code',
      path: `/dags/${dagId}/code`,
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
            _hover={{ color: 'blue.500' }}
          >
            <Link to="/dags" color="currentColor">DAGs</Link>
            /
          </Box>
          {dag && dag.dagId}
          <Box as="span" color={useColorModeValue('gray.400', 'gray.500')}>/</Box>
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
          {dag && (
            <Switch
              id="pause"
              isChecked={!isPaused}
              onChange={toggleDagPaused}
            />
          )}
        </Box>
      </Box>
      {displayRunSelect && (
        <Box
          position="sticky"
          top="0"
          zIndex="1"
          display="flex"
          justifyContent="flex-start"
          width="calc(100% + 2rem)%"
          mr={-4}
          ml={-4}
          py={2}
          px={4}
          borderBottomWidth="2px"
          borderBottomColor="gray"
          backgroundColor={useColorModeValue('white', 'gray.800')}
        >
          <Input
            type="datetime-local"
            maxWidth="200px"
            value=""
            size="sm"
          />
          <InputGroup size="sm" maxWidth="120px" ml={2}>
            <InputLeftAddon>Runs</InputLeftAddon>
            <Select value="25">
              <option value="5">5</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="365">365</option>
            </Select>
          </InputGroup>
          <InputGroup size="sm" maxWidth="370px" ml={2}>
            <InputLeftAddon>Runs</InputLeftAddon>
            <Select value="2021-01-25T14:10:13.480606+00:00">
              <option value="2021-01-25T14:10:13.480606+00:00">manual__2021-01-25T14:10:13.480606+00:00</option>
              <option value="2019-01-01T00:00:00+00:00">scheduled__2019-01-01T00:00:00+00:00</option>
            </Select>
          </InputGroup>
        </Box>
      )}
      <Box py="4">
        {children}
      </Box>
    </AppContainer>
  );
};

export default DagContainer;
