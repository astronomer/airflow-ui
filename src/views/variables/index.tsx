import React, { FunctionComponent } from 'react';
import {
  Code,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from '@chakra-ui/react';

import { useVariables } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Variable } from 'interfaces';

const Variables: FunctionComponent = () => {
  const { data, error } = useVariables();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  return (
    <AdminContainer current="variables">
      <Table>
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {status === 'loading' && (
            <Tr>
              <Td colSpan={2}>Loading…</Td>
            </Tr>
          )}
          {data && data.variables.length === 0 && (
            <Tr>
              <Td colSpan={2}>No variables added.</Td>
            </Tr>
          )}
          {data && data.variables.map((v: Variable) => (
            <Tr
              key={v.key}
              _odd={{
                backgroundColor: isDarkMode ? 'gray.900' : 'gray.50',
              }}
              _hover={{
                backgroundColor: isDarkMode ? 'gray.700' : 'gray.100',
              }}
            >
              <Td><Code>{v.key}</Code></Td>
              <Td><Code>{v.value}</Code></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </AdminContainer>
  );
};

export default Variables;
