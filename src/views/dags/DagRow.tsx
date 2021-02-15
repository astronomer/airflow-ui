import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { MdCheckCircle, MdError } from 'react-icons/md';
import {
  Flex,
  Badge,
  Box,
  Link,
  Spinner,
  Tr,
  Td,
  Tag,
  TagLabel,
  Tooltip,
  useColorModeValue,
  Switch,
} from '@chakra-ui/react';

import type { Dag, DagTag } from 'interfaces';
import { useSaveDag } from 'api';
import { formatScheduleCode } from 'utils';

interface Props {
  dag: Dag;
}

const DagRow: React.FC<Props> = ({ dag }) => {
  const [isPaused, setIsPaused] = useState(dag.isPaused);
  const mutation = useSaveDag(dag.dagId);

  const togglePaused = () => {
    mutation.mutate({ is_paused: !isPaused });
    setIsPaused(!isPaused);
  };

  return (
    <Tr
      key={dag.dagId}
      _odd={{
        backgroundColor: useColorModeValue('gray.50', 'gray.900'),
      }}
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.700'),
      }}
    >
      <Td onClick={(e) => e.stopPropagation()} paddingRight="0" width="58px">
        <Switch
          id="pause"
          isChecked={!isPaused}
          onChange={togglePaused}
        />
      </Td>
      <Td>
        <Flex alignItems="center">
          <Link
            as={RouterLink}
            to={`/dags/${dag.dagId}`}
            fontWeight="bold"
          >
            {dag.dagId}
          </Link>
          {dag.tags.map((tag: DagTag) => (
            <Tag
              size="sm"
              mt="1"
              ml="1"
              mb="1"
              key={tag.name}
            >
              {tag.name}
            </Tag>
          ))}
        </Flex>
      </Td>
    </Tr>
  );
};

export default DagRow;
