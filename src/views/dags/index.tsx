import React, { FunctionComponent, useState } from 'react';
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
  useColorMode,
} from '@chakra-ui/react';

import AppContainer from 'containers/AppContainer';
import SidebarDag from './SidebarDag';
import { useDags } from 'api';
import ErrorMessage from 'components/ErrorMessage';

import type { Dag } from 'interfaces';
import DagRow from './DagRow';

interface Dags {
  dags: Dag[],
  totalEntries: number,
}

const Dags: FunctionComponent = () => {
  const { data: { dags, totalEntries }, status, error } = useDags();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const bg = isDarkMode ? 'gray.800' : 'white';

  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [sidebarDag, setSidebarDag] = useState('');

  const showDagSideBar = (dagId: string) => setSidebarDag(dagId);
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
        backgroundColor={bg}
      >
        <Flex>
          <Button onClick={() => setFilter('all')} size="sm" mr={1} colorScheme={filter == 'all' ? 'blue' : undefined}>All</Button>
          <Button onClick={() => setFilter('active')} size="sm" mr={1} colorScheme={filter == 'active' ? 'blue' : undefined}>Active</Button>
          <Button onClick={() => setFilter('paused')} size="sm" colorScheme={filter == 'paused' ? 'blue' : undefined}>Paused</Button>
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
          />
        </InputGroup>
      </Box>
      <ErrorMessage errors={[error]} />
      <Table marginTop={16}>
        <Thead>
          <Tr
            borderBottomWidth="1px"
            textAlign="left"
          >
            <Th></Th>
            <Th>DAG ID</Th>
            <Th></Th>
            <Th>SCHEDULE</Th>
            <Th textAlign="right">PAST WEEK</Th>
          </Tr>
        </Thead>
        <Tbody>
          {status === 'loading' && (
            <Tr>
              <Td colSpan={4}>Loading…</Td>
            </Tr>
          )}
          {filteredDags.map((dag: Dag) => 
            <DagRow dag={dag} key={dag.dagId} showDagSideBar={() => showDagSideBar(dag.dagId)} />
          )}
        </Tbody>
      </Table>
      {`${filteredDags.length} of ${totalEntries} DAG${totalEntries !== 1 && 's'}`}
      <SidebarDag dagId={sidebarDag} dags={dags} />
    </AppContainer>
  );
};

export default Dags;
