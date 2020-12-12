import React, { FunctionComponent, useState, useEffect, ChangeEvent } from 'react';
import useReactRouter from 'use-react-router';
import { Link } from 'react-router-dom';
import { useGet, useMutate } from 'restful-react';
import humps from 'humps';
import {
  Box,
  Button,
  Heading,
  Switch,
  useColorMode,
} from '@chakra-ui/react';

import AppContainer from '../AppContainer';

import type { Dag } from '../../interfaces';

interface Props {
  current: string;
}

const DagContainer: FunctionComponent<Props> = ({ children, current }) => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();
  const { data: dag, refetch: refetchDag }: { data: Dag, refetch } = useGet({
    path: `dags/${dagId}`,
    resolve: (d) => humps.camelizeKeys(d),
  });
  const { mutate: updateDag } = useMutate({
    verb: 'PATCH',
    path: `dags/${dagId}`,
  });
  const { colorMode } = useColorMode();
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (dag) {
      setIsPaused(dag.isPaused);
    }
  }, [dag]);

  const toggleDagPaused = (e: ChangeEvent<HTMLInputElement>): void => {
    updateDag({
      is_paused: !e.target.checked,
    }).then(refetchDag());
  };

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
            <Link to="/dags">{dag && dag.isSubdag ? 'SubDAG' : 'DAG'}</Link>
            /
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
              onChange={(e) => toggleDagPaused(e)}
            />
          )}
        </Box>
      </Box>
      <Box p="4">{children}</Box>
    </AppContainer>
  );
};

export default DagContainer;
