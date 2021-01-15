import React, { FunctionComponent, useState, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
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

interface NavBtnItem {
  label: string;
  path: string;
  currentSlug: string;
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

  const renderNavBtn = (item: NavBtnItem) => (
    <Button
      key={item.currentSlug}
      as={Link}
      to={item.path}
      variant={current === item.currentSlug ? 'solid' : 'ghost'}
      colorScheme="blue"
      size="sm"
      mr="2"
    >
      {item.label}
    </Button>
  );

  const navItems = [
    {
      label: 'Overview',
      path: `/dags/${dagId}`,
      currentSlug: 'overview',
    },
    {
      label: 'Tree',
      path: `/dags/${dagId}/tree`,
      currentSlug: 'tree',
    },
    {
      label: 'Graph',
      path: `/dags/${dagId}/graph`,
      currentSlug: 'graph',
    },
    {
      label: 'Code',
      path: `/dags/${dagId}/code`,
      currentSlug: 'code',
    },
  ];

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
            <Link to="/dags" color="currentColor" _hover={{ color: 'blue.500' }}>DAGs</Link>
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
            {navItems.map((item) => renderNavBtn(item))}
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
