import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Flex,
  Link,
  Tr,
  Td,
  Tag,
  Tooltip,
  useColorModeValue,
  Switch,
} from '@chakra-ui/react';

import compareObjectProps from 'utils/memo';
import type { Dag, DagTag } from 'interfaces';
import { useSaveDag } from 'api';

interface Props {
  dag: Dag;
}

const DagRow: React.FC<Props> = ({ dag }) => {
  const mutation = useSaveDag(dag.dagId);
  const togglePaused = () => mutation.mutate({ isPaused: !dag.isPaused });

  return (
    <Tr
      _odd={{
        backgroundColor: useColorModeValue('gray.50', 'gray.900'),
      }}
      _hover={{
        backgroundColor: useColorModeValue('gray.100', 'gray.700'),
      }}
    >
      <Td onClick={(e) => e.stopPropagation()} paddingRight="0" width="58px">
        <Tooltip
          label={dag.isPaused ? 'Activate DAG' : 'Pause DAG'}
          aria-label={dag.isPaused ? 'Activate DAG' : 'Pause DAG'}
          hasArrow
        >
          {/* span helps tooltip find its position */}
          <span>
            <Switch
              role="switch"
              isChecked={!dag.isPaused}
              onChange={togglePaused}
              colorScheme="teal"
            />
          </span>
        </Tooltip>
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

export default React.memo(DagRow, compareObjectProps);
