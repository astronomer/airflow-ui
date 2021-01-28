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

import { usePools } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Pool } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';
import { defaultPools } from 'api/defaults';

const Pools: React.FC = () => {
  const { data: { pools } = defaultPools, isLoading, error } = usePools();
  const oddStyle = { backgroundColor: useColorModeValue('gray.50', 'gray.900') };
  const hoverStyle = { backgroundColor: useColorModeValue('gray.100', 'gray.700') };

  return (
    <AdminContainer current="Pools">
      <ErrorMessage errors={[error]} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Slots</Th>
            <Th isNumeric>Running Slots</Th>
            <Th isNumeric>Queued Slots</Th>
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
              <Td isNumeric>{p.slots}</Td>
              <Td isNumeric>{p.usedSlots || '0'}</Td>
              <Td isNumeric>{p.queuedSlots}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminContainer>
  );
};

export default Pools;
