import React, { FunctionComponent } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGet } from 'restful-react';
import humps from 'humps';
import {
  Badge,
  Flex,
  Link,
  Heading,
  List,
  ListItem,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/core';

import AppContainer from '../../containers/AppContainer';

interface Props {}

const Dags: FunctionComponent<Props> = () => {
  const { data, loading } = useGet({
    path: '/dags',
    resolve: (d) => humps.camelizeKeys(d),
  });
  return (
    <AppContainer>
      <Heading as="h1">DAGs</Heading>
      <List styleType="none" mt="8">
        {(loading || !data) && (
          <ListItem>No DAGs yet!</ListItem>
        )}
        {data && data.dags.map((dag) => (
          <ListItem key={dag.dagId} py="2px" borderTopWidth="2px">
            <Flex align="center" justifyContent="space-between">
              <Heading as="h4" size="sm" flex="1">
                <Link as={RouterLink} to={`/dags/${dag.dagId}`}>{dag.dagId}</Link>
              </Heading>
              <Badge mr="4">{dag.scheduleInterval && dag.scheduleInterval.value}</Badge>
              <Flex fontSize="sm" textAlign="right">
                <Stat color="teal.500" backgroundColor="teal.100" px="1" mr="2px">
                  <StatNumber fontSize="0.85em">10</StatNumber>
                  <StatLabel fontSize="0.75em">RUNNING</StatLabel>
                </Stat>
                <Stat color="green.500" backgroundColor="green.100" px="1" mr="2px">
                  <StatNumber fontSize="0.85em">1,034</StatNumber>
                  <StatLabel fontSize="0.75em">SUCCESS</StatLabel>
                </Stat>
                <Stat color="red.500" backgroundColor="red.100" px="1">
                  <StatNumber fontSize="0.85em">10</StatNumber>
                  <StatLabel fontSize="0.75em">FAILED</StatLabel>
                </Stat>
              </Flex>
            </Flex>
          </ListItem>
        ))}
      </List>
    </AppContainer>
  );
};

export default Dags;
