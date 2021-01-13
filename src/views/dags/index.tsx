import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGet } from 'restful-react';
import humps from 'humps';
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

import type { Dag, DagTag } from 'interfaces';

interface Data {
  dags: Dag[],
  totalEntries: number,
}

const Dags: FunctionComponent = () => {
  const { data, loading }: { data: Data, loading: boolean } = useGet({
    path: '/dags',
    resolve: (d) => humps.camelizeKeys(d),
  });
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const bg = isDarkMode ? 'gray.800' : 'white';

  const [currentStatus, setCurrentStatus] = useState('all');
  const [sidebarDag, setSidebarDag] = useState('');

  const showDagSideBar = (dagId: string) => setSidebarDag(dagId);

  const updateStatus = (newStatus: string) => setCurrentStatus(newStatus);

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
          <Button onClick={() => updateStatus('all')} size="sm" mr={1} colorScheme={currentStatus == 'all' ? 'blue' : null}>All</Button>
          <Button onClick={() => updateStatus('active')} size="sm" mr={1} colorScheme={currentStatus == 'active' ? 'blue' : null}>Active</Button>
          <Button onClick={() => updateStatus('paused')} size="sm" colorScheme={currentStatus == 'paused' ? 'blue' : null}>Paused</Button>
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
          {loading && (
            <Tr>
              <Td colSpan="4">Loading…</Td>
            </Tr>
          )}
          {data && data.dags.map((dag: Dag) => (
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
      {data && `${data.dags.length} of ${data.totalEntries} DAG${data.totalEntries !== 1 && 's'}`}
      <SidebarDag dagId={sidebarDag} dags={data && data.dags} />
    </AppContainer>
  );
};

export default Dags;
