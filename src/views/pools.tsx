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
    <AdminContainer
      current="Pools"
      toolBar={(
        <Box width="100%" display="flex" justifyContent="space-between">
          <InputGroup flex="1" size="sm" maxWidth="300px">
            <InputLeftElement>
              <Icon as={MdSearch} color="gray.300" />
            </InputLeftElement>
            <Input
              type="search"
              placeholder="Find Pool…"
            />
          </InputGroup>
          <Button size="sm" colorScheme="teal">Add Pool</Button>
        </Box>
      )}
    >
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
