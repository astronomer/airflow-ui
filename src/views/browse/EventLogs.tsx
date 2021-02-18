import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
} from '@chakra-ui/react';

import { useEventLogs } from 'api';
import BrowseContainer from 'containers/BrowseContainer';

import type { EventLog } from 'interfaces';
import ErrorMessage from 'components/ErrorMessage';
import Pagination from 'components/Pagination';
import { defaultEventLogs } from 'api/defaults';

const EventLogs: React.FC = () => {
  const { data: { eventLogs, totalEntries } = defaultEventLogs, isLoading, error } = useEventLogs();
  const oddStyle = { backgroundColor: useColorModeValue('gray.50', 'gray.900') };
  const hoverStyle = { backgroundColor: useColorModeValue('gray.100', 'gray.700') };

  return (
    <BrowseContainer current="Event Logs">
      <ErrorMessage errors={[error]} />
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>DTTM</Th>
            <Th>DAG ID</Th>
            <Th>Event</Th>
            <Th>Execution Date</Th>
            <Th>Owner</Th>
            <Th>Extra</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading && (
            <Tr>
              <Td colSpan={4}>Loading…</Td>
            </Tr>
          )}
          {(eventLogs.length === 0 && !isLoading) && (
            <Tr>
              <Td colSpan={4}>No event logs.</Td>
            </Tr>
          )}
          {eventLogs.map((eL: EventLog) => (
            <Tr key={eL.eventLogId} _odd={oddStyle} _hover={hoverStyle}>
              <Td>{eL.eventLogId}</Td>
              <Td />
              <Td>
                <Link
                  as={RouterLink}
                  to={`/dags/${eL.dagId}`}
                  fontWeight="bold"
                >
                  {eL.dagId}
                </Link>
              </Td>
              <Td>{eL.event}</Td>
              <Td>{eL.executionDate}</Td>
              <Td>{eL.owner}</Td>
              <Td>{eL.extra}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {!isLoading && (
        <Box display="flex" alignItems="center" mt="2" mb="6" px="2" fontSize="sm">
          <span>
            {`1-${eventLogs.length} of ${totalEntries} Event Log${totalEntries === 1 ? '' : 's'}`}
          </span>
          <Pagination ml={4} />
        </Box>
      )}
    </BrowseContainer>
  );
};

export default EventLogs;
