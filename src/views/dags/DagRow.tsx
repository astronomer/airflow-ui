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
      <Td />
      <Td>
        <Badge mr="4">{dag.scheduleInterval && formatScheduleCode(dag.scheduleInterval)}</Badge>
      </Td>
      <Td textAlign="right">
        <Tooltip label={`${'10'} running`} aria-label={`${'10'} running`} placement="bottom" hasArrow>
          <span>
            <Tag size="sm" rounded="full" colorScheme="teal" mr={1}>
              <Spinner size="sm" speed="0.85s" ml={-1} mr={1} />
              <TagLabel>10</TagLabel>
            </Tag>
          </span>
        </Tooltip>
        <Tooltip label={`${'1,034'} successful`} aria-label={`${'1,034'} successful`} placement="bottom" hasArrow>
          <span>
            <Tag size="sm" rounded="full" colorScheme="green" mr={1}>
              <Box as={MdCheckCircle} size="1rem" ml={-1} mr={1} />
              <TagLabel>1,034</TagLabel>
            </Tag>
          </span>
        </Tooltip>
        <Tooltip label={`${'12'} failed`} aria-label={`${'12'} failed`} placement="bottom" hasArrow>
          <span>
            <Tag size="sm" rounded="full" colorScheme="red">
              <Box as={MdError} size="1rem" ml={-1} mr={1} />
              <TagLabel>12</TagLabel>
            </Tag>
          </span>
        </Tooltip>
      </Td>
    </Tr>
  );
};

export default DagRow;
