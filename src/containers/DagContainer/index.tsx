import React, { useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Switch,
  useColorMode,
} from '@chakra-ui/react';

import { useDag, useDagRuns, useSaveDag } from 'api';
import ErrorMessage from 'components/ErrorMessage';
import SectionNavBtn from 'components/SectionNavBtn';
import AppContainer from 'containers/AppContainer';
import type { Dag } from 'interfaces';

interface Props {
  current: string;
}

const DagContainer: React.FC<Props> = ({ children, current }) => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();
  const [isPaused, setIsPaused] = useState(false);
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const { data: dag, status, error } = useDag(dagId);
  const { data: { dagRuns }, status: dagRunsStatus, error: dagRunsError } = useDagRuns(dagId);
  console.log(dagRuns);

  const mutation = useSaveDag(dagId);

  useEffect(() => {
    if (dag && dag.isPaused !== isPaused) {
      setIsPaused(dag.isPaused);
    }
  }, [dag, isPaused]);

  const toggleDagPaused = (): void => {
    mutation.mutate({ is_paused: !isPaused });
    setIsPaused(!isPaused);
  }

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
        bg={isDarkMode ? 'gray.700' : 'gray.100'}
      >
        <Heading as="h1">
          <Box
            as="span"
            color={isDarkMode ? 'gray.500' : 'gray.400'}
          >
            <Link to="/dags" color="currentColor" _hover={{ color: 'blue.500' }}>DAGs</Link>
            {'/'}
          </Box>
          {dag && dag.dagId}
          <Box as="span" color={isDarkMode ? 'gray.500' : 'gray.400'}>/</Box>
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
      <Box p="4">
        <ErrorMessage errors={[error, mutation.error]} />
        {children}
      </Box>
    </AppContainer>
  );
};

export default DagContainer;
