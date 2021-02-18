import React from 'react';
import { MdSearch } from 'react-icons/md';
import {
  Box,
  Button,
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

import { useConnections } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Connection } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';
import Pagination from 'components/Pagination';
import { defaultConnections } from 'api/defaults';

const Connections: React.FC = () => {
  const {
    data: { connections, totalEntries } = defaultConnections, isLoading, error,
  } = useConnections();
  const oddStyle = { backgroundColor: useColorModeValue('gray.50', 'gray.900') };
  const hoverStyle = { backgroundColor: useColorModeValue('gray.100', 'gray.700') };

  return (
    <AdminContainer
      current="Connections"
      toolBar={(
        <Box width="100%" display="flex" justifyContent="space-between">
          <InputGroup flex="1" size="sm" maxWidth="300px">
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Find Connection…"
              isDisabled
            />
          </InputGroup>
          <Button size="sm" colorScheme="teal">Add Connection</Button>
        </Box>
      )}
    >
      <ErrorMessage errors={[error]} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Host</Th>
            <Th>Port</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>Loading…</Td>
            </Tr>
          )}
          {(connections.length === 0 && !isLoading) && (
            <Tr>
              <Td colSpan={4}>No connections added.</Td>
            </Tr>
          )}
          {connections.map((c: Connection) => (
            <Tr key={c.connectionId} _odd={oddStyle} _hover={hoverStyle}>
              <Td>{c.connectionId}</Td>
              <Td>{c.connType}</Td>
              <Td>{c.host}</Td>
              <Td>{c.port}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!isLoading && (
        <Box display="flex" alignItems="center" mt="2" mb="6" px="2" fontSize="sm">
          <span>
            {`1-${connections.length} of ${totalEntries} Connection${totalEntries === 1 ? '' : 's'}`}
          </span>
          <Pagination ml={4} />
        </Box>
      )}
    </AdminContainer>
  );
};

export default Connections;
