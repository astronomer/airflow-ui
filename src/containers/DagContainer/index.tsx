import React, { FunctionComponent, useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Heading,
  Link,
  Switch,
  useColorMode,
} from '@chakra-ui/react';

import ErrorMessage from 'components/ErrorMessage';
import AppContainer from 'containers/AppContainer';
import type { Dag } from 'interfaces';
import { useDag, useSaveDag } from 'api';

interface Props {
  current: string;
}

const DagContainer: FunctionComponent<Props> = ({ children, current }) => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();
  const [isPaused, setIsPaused] = useState(false);
  const { colorMode } = useColorMode();
  const { data: dag, status, error } = useDag(dagId);
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

  return (
    <AppContainer>
      <Box
        pt={4}
        mx={-4}
        px={4}
        pb="2"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      >
        <Heading as="h1">
          <Box
            as="span"
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          >
            <Link as={RouterLink} to="/dags" color="currentColor" _hover={{ color: 'blue.500' }}>DAGs</Link>
            {'/ '}
          </Box>
          {dag && dag.dagId}
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
        >
          <Box as="nav">
            <Button
              as={Link}
              to={`/dags/${dagId}`}
              variant={current === 'overview' ? 'solid' : 'ghost'}
              colorScheme="blue"
              size="sm"
              mr="2"
            >
              Overview
            </Button>
            <Button
              as={Link}
              to={`/dags/${dagId}/graph`}
              variant={current === 'graph' ? 'solid' : 'ghost'}
              size="sm"
              mr="2"
            >
              Graph
            </Button>
            <Button
              as={Link}
              to={`/dags/${dagId}/code`}
              variant={current === 'code' ? 'solid' : 'ghost'}
              size="sm"
            >
              Code
            </Button>
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
