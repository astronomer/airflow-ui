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
import Pagination from 'components/Pagination';
import { defaultPools } from 'api/defaults';

const Pools: React.FC = () => {
  const { data: { pools, totalEntries } = defaultPools, isLoading, error } = usePools();
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
              isDisabled
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
          {(pools.length === 0 && !isLoading) && (
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
      {!isLoading && (
        <Box display="flex" alignItems="center" mt="2" mb="6" px="2" fontSize="sm">
          <span>
            {`1-${pools.length} of ${totalEntries} Pool${totalEntries === 1 ? '' : 's'}`}
          </span>
          <Pagination ml={4} />
        </Box>
      )}
    </AdminContainer>
  );
};

export default Pools;
