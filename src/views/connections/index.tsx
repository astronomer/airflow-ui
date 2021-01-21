import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from '@chakra-ui/react';

import { useConnections } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Connection } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';

const Connections: React.FC = () => {
  const { data: { connections }, error } = useConnections();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const oddStyle = { backgroundColor: isDarkMode ? 'gray.900' : 'gray.50' };
  const hoverStyle = { backgroundColor: isDarkMode ? 'gray.700' : 'gray.100' };

  return (
    <AdminContainer current="Connections">
      <ErrorMessage errors={[error]} />
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Type</Th>
            <Th>Host</Th>
            <Th>Port</Th>
          </Tr>
        </Thead>
        <Tbody>
          {status === 'loading' && (
            <Tr>
              <Td colSpan={2}>Loading…</Td>
            </Tr>
          )}
          {connections.length === 0 && (
            <Tr>
              <Td colSpan={2}>No connections added.</Td>
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
