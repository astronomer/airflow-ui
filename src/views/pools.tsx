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

import { usePools } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Pool } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';
import { defaultPools } from 'api/defaults';

const Pools: React.FC = () => {
  const { data: { pools } = defaultPools, isLoading, error } = usePools();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const oddStyle = { backgroundColor: isDarkMode ? 'gray.900' : 'gray.50' };
  const hoverStyle = { backgroundColor: isDarkMode ? 'gray.700' : 'gray.100' };

  return (
    <AdminContainer current="Pools">
      <ErrorMessage errors={[error]} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Slots</Th>
            <Th>Running Slots</Th>
            <Th>Queued Slots</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>Loading…</Td>
            </Tr>
          )}
          {pools.length === 0 && (
            <Tr>
              <Td colSpan={4}>No pools added.</Td>
            </Tr>
          )}
          {pools.map((p: Pool) => (
            <Tr key={p.name} _odd={oddStyle} _hover={hoverStyle}>
              <Td>{p.name}</Td>
              <Td>{p.slots}</Td>
              <Td>{p.usedSlots}</Td>
              <Td>{p.queuedSlots}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminContainer>
  );
};

export default Pools;
