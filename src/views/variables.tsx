import React from 'react';
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
import ErrorMessage from 'components/ErrorMessage';
import { defaultVariables } from 'api/defaults';

const Variables: React.FC = () => {
  const { data: { variables } = defaultVariables, isLoading, error } = useVariables();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const oddStyle = { backgroundColor: isDarkMode ? 'gray.900' : 'gray.50' };
  const hoverStyle = { backgroundColor: isDarkMode ? 'gray.700' : 'gray.100' };

  return (
    <AdminContainer current="Variables">
      <ErrorMessage errors={[error]} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={2}>Loading…</Td>
            </Tr>
          )}
          {variables.length === 0 && (
            <Tr>
              <Td colSpan={2}>No variables added.</Td>
            </Tr>
          )}
          {variables.map((v: Variable) => (
            <Tr key={v.key} _odd={oddStyle} _hover={hoverStyle}>
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
