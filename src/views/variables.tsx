import React, { useState, FormEvent } from 'react';
import {
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';

import { useAddVariable, useVariables } from 'api';
import { defaultVariables } from 'api/defaults';

import AdminContainer from 'containers/AdminContainer';

import ErrorMessage from 'components/ErrorMessage';
import VariableRow from 'components/VariableRow';

import type { Variable } from 'interfaces';

const Variables: React.FC = () => {
  const { data: { variables } = defaultVariables, isLoading, error } = useVariables();
  const addVariable = useAddVariable();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const oddStyle = { backgroundColor: isDarkMode ? 'gray.900' : 'gray.50' };
  const hoverStyle = { backgroundColor: isDarkMode ? 'gray.700' : 'gray.100' };
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    addVariable.mutate({ key, value });
  }

  return (
    <AdminContainer current="Variables">
      <ErrorMessage errors={[error]} />
      <form onSubmit={onSubmit}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Key</Th>
              <Th>Value</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {isLoading && (
              <Tr>
                <Td colSpan={3}>Loading…</Td>
              </Tr>
            )}
            {variables.length === 0 && (
              <Tr>
                <Td colSpan={3}>No variables added.</Td>
              </Tr>
            )}
            {variables.map((v: Variable) => (
              <VariableRow key={v.key} variable={v} isDarkMode={isDarkMode} />
            ))}
            <Tr key="add" _odd={oddStyle} _hover={hoverStyle}>
              <Td>
                <Input
                  name="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  placeholder="KEY"
                  isRequired
                />
              </Td>
              <Td>
                <Input
                  name="value"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="value"
                  isRequired
                />
              </Td>
              <Td textAlign="right">
                <Button type="submit" colorScheme="teal" leftIcon={<MdAdd />}>Add</Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </form>
    </AdminContainer>
  );
};

export default Variables;
