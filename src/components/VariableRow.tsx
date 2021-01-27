import React from 'react';
import {
  Code,
  IconButton,
  Tr,
  Td,
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { useDeleteVariable } from 'api';
import type { Variable } from 'interfaces';

interface Props {
  variable: Variable;
  isDarkMode: boolean;
}

const VariableRow: React.FC<Props> = ({ variable, isDarkMode }) => {
  const deleteVariable = useDeleteVariable(variable.key);
  const oddStyle = { backgroundColor: isDarkMode ? 'gray.900' : 'gray.50' };
  const hoverStyle = { backgroundColor: isDarkMode ? 'gray.700' : 'gray.100' };

  const handleEditVariable = () => {
    window.alert('Coming soon!');
  };

  const handleDeleteVariable = () => {
    deleteVariable.mutate();
  };

  return (
    <Tr _odd={oddStyle} _hover={hoverStyle}>
      <Td><Code>{variable.key}</Code></Td>
      <Td><Code>{variable.value}</Code></Td>
      <Td textAlign="right">
        <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Edit Variable"
          size="sm"
          icon={<MdEdit />}
          onClick={handleEditVariable}
        />
        <IconButton
          variant="outline"
          colorScheme="red"
          aria-label="Delete Variable"
          size="sm"
          marginLeft={2}
          icon={<MdDelete />}
          onClick={handleDeleteVariable}
        />
      </Td>
    </Tr>
  );
};

export default VariableRow;
