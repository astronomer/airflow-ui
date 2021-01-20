import React, { FunctionComponent, useState, FormEvent } from 'react';
import {
  Button,
  Code,
  IconButton,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorMode,
} from '@chakra-ui/react';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';

import { useAddVariable, useDeleteVariable, useVariables } from 'api';
import AdminContainer from 'containers/AdminContainer';

import type { Variable } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';

const Variables: FunctionComponent = () => {
  const { data: { variables }, error } = useVariables();
  const addVariable = useAddVariable();
  const deleteVariable = useDeleteVariable();
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

  const handleEditVariable = () => {
    window.alert('To do!');
  }

  const handleDeleteVariable = (variableKey: Variable['key']) => {
    deleteVariable.mutate(variableKey);
  }

  return (
    <AdminContainer current="Variables">
      <ErrorMessage errors={[error]} />
      <form onSubmit={onSubmit}>
      <Table>
        <Thead>
          <Tr>
            <Th>Key</Th>
            <Th>Value</Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
            {status === 'loading' && (
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
              <Tr key={v.key} _odd={oddStyle} _hover={hoverStyle}>
                <Td><Code>{v.key}</Code></Td>
                <Td><Code>{v.value}</Code></Td>
                <Td textAlign="right">
                  <IconButton
                    variant="outline"
                    colorScheme="teal"
                    aria-label="Edit Variable"
                    size="sm"
                    icon={<MdEdit />}
                    onClick={() => handleEditVariable()}
                  />
                  <IconButton
                    variant="outline"
                    colorScheme="red"
                    aria-label="Delete Variable"
                    size="sm"
                    marginLeft={2}
                    icon={<MdDelete />}
                    onClick={() => handleDeleteVariable(v.key)}
                  />
                </Td>
              </Tr>
            ))}
            <Tr key="add" _odd={oddStyle} _hover={hoverStyle}>
              <Td>
                <Input
                  name="key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
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
