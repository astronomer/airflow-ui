import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MdCheckCircle, MdError, MdSearch } from 'react-icons/md';
import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Tag,
  TagLabel,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react';

import AppContainer from 'containers/AppContainer';
import SidebarDag from './SidebarDag';
import { useDags } from 'api';
import ErrorMessage from 'components/ErrorMessage';

import type { Dag, DagTag } from 'interfaces';

interface Dags {
  dags: Dag[],
  totalEntries: number,
}

const Dags: FunctionComponent = () => {
  const { data, status, error } = useDags();
  if (error) console.log(error)
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const bg = isDarkMode ? 'gray.800' : 'white';

  const [filter, setFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [sidebarDag, setSidebarDag] = useState('');

  const showDagSideBar = (dagId: string) => setSidebarDag(dagId);
  const filteredDags = data && data.dags ?
    data.dags.filter((dag: Dag) => {
      switch (filter) {
        case 'active':
          return dag.isPaused === false;
        case 'paused':
          return dag.isPaused === true;
        default:
          return true;
      }
    }) :
    [];

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
      {error &&
        <Flex>
          <Text color="red">{error.message}</Text>
        </Flex>
      }
      <Table marginTop={16}>
        <Thead>
          <Tr
            borderBottomWidth="1px"
            textAlign="left"
          >
            <Th>DAG ID</Th>
            <Th></Th>
            <Th>SCHEDULE</Th>
            <Th textAlign="right">PAST WEEK</Th>
          </Tr>
        </Thead>
        <Tbody>
          <ErrorMessage errors={[error]} />
          {status === 'loading' && (
            <Tr>
              <Td colSpan={4}>Loading…</Td>
            </Tr>
          )}
          {filteredDags.map(dag => (
            <Tr
              key={dag.dagId}
              onClick={() => showDagSideBar(dag.dagId)}
              _odd={{
                backgroundColor: isDarkMode ? 'gray.900' : 'gray.50',
              }}
              _hover={{
                backgroundColor: isDarkMode ? 'gray.700' : 'gray.100',
              }}
            >
              <Td>
                <Link
                  as={RouterLink}
                  to={`/dags/${dag.dagId}`}
                  fontWeight="bold"
                >
                  {dag.dagId}
                </Link>
                {dag.tags.map((tag: DagTag) => (
                  <Tag
                    size="sm"
                    mt="1"
                    ml="1"
                    mb="1"
                    key={tag.name}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Td>
              <Td />
              <Td>
                <Badge mr="4">{dag.scheduleInterval && dag.scheduleInterval.value}</Badge>
              </Td>
              <Td textAlign="right">
                <Tooltip label={`${'10'} running`} aria-label={`${'10'} running`} placement="bottom" hasArrow>
                  <span><Tag size="sm" rounded="full" colorScheme="teal" mr={1}>
                    <Spinner size="sm" speed="0.85s" ml={-1} mr={1} />
                    <TagLabel>{'10'}</TagLabel>
                  </Tag></span>
                </Tooltip>
                <Tooltip label={`${'1,034'} successful`} aria-label={`${'1,034'} successful`} placement="bottom" hasArrow>
                  <span><Tag size="sm" rounded="full" colorScheme="green" mr={1}>
                    <Box as={MdCheckCircle} size="1rem" ml={-1} mr={1} />
                    <TagLabel>{'1,034'}</TagLabel>
                  </Tag></span>
                </Tooltip>
                <Tooltip label={`${'12'} failed`} aria-label={`${'12'} failed`} placement="bottom" hasArrow>
                  <span><Tag size="sm" rounded="full" colorScheme="red">
                    <Box as={MdError} size="1rem" ml={-1} mr={1} />
                    <TagLabel>{'12'}</TagLabel>
                  </Tag></span>
                </Tooltip>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {data && `${filteredDags.length} of ${data.totalEntries} DAG${data.totalEntries !== 1 && 's'}`}
      <SidebarDag dagId={sidebarDag} dags={data && data.dags} />
    </AppContainer>
  );
};

export default Dags;
