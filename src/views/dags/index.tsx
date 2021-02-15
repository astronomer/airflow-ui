import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

import AppContainer from 'containers/AppContainer';
import { useDags } from 'api';
import ErrorMessage from 'components/ErrorMessage';
import type { Dag } from 'interfaces';
import { defaultDags } from 'api/defaults';
import Pagination from 'components/Pagination';
import DagRow from './DagRow';

const Dags: React.FC = () => {
  const { data: { dags, totalEntries } = defaultDags, isLoading, error } = useDags();

  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredDags = dags.filter((dag: Dag) => {
    switch (filter) {
      case 'active':
        return dag.isPaused === false;
      case 'paused':
        return dag.isPaused === true;
      default:
        return true;
    }
  });

  const allCount = dags.length;
  const pausedCount = dags.filter((d: Dag) => d.isPaused).length;
  const activeCount = allCount - pausedCount;

  return (
    <AppContainer>
      <Box
        position="fixed"
        zIndex={1}
        display="flex"
        top="56px"
        right="0"
        left="57px"
        width="100%"
        py={2}
        px={4}
        borderBottomWidth="2px"
        borderBottomColor="gray"
        backgroundColor={useColorModeValue('white', 'gray.800')}
      >
        <Flex>
          <Button onClick={() => setFilter('all')} size="sm" mr={1} colorScheme={filter === 'all' ? 'blue' : undefined}>
            All (
            {allCount}
            )
          </Button>
          <Button onClick={() => setFilter('active')} size="sm" mr={1} colorScheme={filter === 'active' ? 'blue' : undefined}>
            Active (
            {activeCount}
            )
          </Button>
          <Button onClick={() => setFilter('paused')} size="sm" colorScheme={filter === 'paused' ? 'blue' : undefined}>
            Paused (
            {pausedCount}
            )
          </Button>
        </Flex>
        <Box pr={4} mr={4} borderRightWidth="1px" />
        <InputGroup flex="1" size="sm">
          <InputLeftElement>
            <Icon as={MdSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            maxWidth="400px"
            placeholder="Find DAGs…"
            isDisabled
          />
        </InputGroup>
      </Box>
      <Box marginTop={16}>
        <ErrorMessage errors={[error]} />
      </Box>
      <Table size="sm">
        <Thead position="sticky" top={0}>
          <Tr
            borderBottomWidth="1px"
            textAlign="left"
          >
            <Th />
            <Th>DAG ID</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={2}>Loading…</Td>
            </Tr>
          )}
          {filteredDags.map((dag: Dag) => (
            <DagRow
              dag={dag}
              key={dag.dagId}
            />
          ))}
        </Tbody>
      </Table>
      <Box display="flex" alignItems="center" mt="2" mb="6" px="2" fontSize="sm">
        <span>
          {`1-${filteredDags.length} of ${totalEntries} DAG${totalEntries === 1 ? '' : 's'}`}
        </span>
        <Pagination ml={4} />
      </Box>
    </AppContainer>
  );
};

export default Dags;
