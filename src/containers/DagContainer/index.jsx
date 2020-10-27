import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
} from '@chakra-ui/core';

import AppContainer from '../AppContainer';

const DagContainer = ({ children, current }) => {
  const { match: { params: { dagId } } } = useReactRouter();
  const { data: dag, refetch: refetchDag } = useGet({
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

  const toggleDagPaused = (e) => {
    updateDag({
      is_paused: !e.target.checked,
    }).then(refetchDag());
  };

  return (
    <AppContainer>
      <Box
        pt="4"
        mx={-4}
        px="4"
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
              to={`/dags/${dagId}/`}
              variant={current === 'overview' ? 'solid' : 'ghost'}
              variantColor="blue"
              mr="2"
            >
              Overview
            </Button>
            <Button
              as={Link}
              to={`/dags/${dagId}/graph`}
              variant={current === 'graph' ? 'solid' : 'ghost'}
              mr="2"
            >
              Graph
            </Button>
            <Button
              as={Link}
              to={`/dags/${dagId}/code`}
              variant={current === 'code' ? 'solid' : 'ghost'}
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

DagContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  current: PropTypes.string.isRequired,
};

export default DagContainer;
