import React from 'react';
import {
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
import { defaultConnections } from 'api/defaults';

const Connections: React.FC = () => {
  const { data: { connections } = defaultConnections, isLoading, error } = useConnections();
  const oddStyle = { backgroundColor: useColorModeValue('gray.50', 'gray.900') };
  const hoverStyle = { backgroundColor: useColorModeValue('gray.100', 'gray.700') };

  return (
    <AdminContainer current="Connections">
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
          {connections.length === 0 && (
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
    </AdminContainer>
  );
};

export default Connections;
