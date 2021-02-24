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
  useDisclosure,
  Button,
  Tooltip,
} from '@chakra-ui/react';

import { useDag, useSaveDag } from 'api';

import TriggerDagModal from 'components/TriggerDagModal';

import AppContainer from 'containers/AppContainer';

import type { Dag } from 'interfaces';
import { MdPlayArrow } from 'react-icons/md';

interface Props {
  current: string;
  displayRunSelect?: boolean;
}

const DagContainer: React.FC<Props> = ({ children, displayRunSelect = false }) => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    mutation.mutate({ isPaused: !isPaused });
    setIsPaused(!isPaused);
  };

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
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
        >
          {dag && (
            <>
              <Tooltip
                label={isPaused ? 'Activate DAG' : 'Pause DAG'}
                aria-label={isPaused ? 'Activate DAG' : 'Pause DAG'}
                hasArrow
              >
                <span>
                  <Switch
                    id="pause"
                    isChecked={!isPaused}
                    onChange={toggleDagPaused}
                  />
                </span>
              </Tooltip>
              <Button
                rightIcon={<MdPlayArrow />}
                onClick={onOpen}
                size="sm"
                ml={4}
              >
                Trigger DAG
              </Button>
            </>
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
      <TriggerDagModal dagId={dagId} isOpen={isOpen} onClose={onClose} />
    </AppContainer>
  );
};

export default DagContainer;
