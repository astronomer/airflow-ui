import React, { FunctionComponent, useEffect } from 'react';
import useReactRouter from 'use-react-router';
import { useGet } from 'restful-react';
import humps from 'humps';
import {
  Badge,
  Box,
  Code,
  List,
  ListItem,
} from '@chakra-ui/core';

import drawChart from './drawChart';
import DagContainer from '../../containers/DagContainer';

interface Props {}

const Dag: FunctionComponent<Props> = () => {
  const { match: { params: { dagId } } } = useReactRouter();

  const { data } = useGet({
    path: `dags/${dagId}`,
    resolve: (d) => humps.camelizeKeys(d),
  });

  useEffect(() => {
    drawChart(400, 600);
  }, []);

  const dag = data;

  if (!dag) return null;

  return (
    <DagContainer dag={dag} current="overview">
      <List styleType="none" mt="8">
        {dag && dag.description && (
          <ListItem>
            Description:
            {' '}
            {dag.description}
          </ListItem>
        )}
        {dag && dag.owners && (
          <ListItem>
            Owner(s):
            {' '}
            {dag.owners.join(', ')}
          </ListItem>
        )}
        <ListItem>{dag && dag.isPaused}</ListItem>
        {dag && dag.fileloc && (
          <ListItem>
            File Location:
            {' '}
            <Code>{dag.fileloc}</Code>
          </ListItem>
        )}
        {dag && dag.fileToken && (
          <ListItem>
            File Token:
            {' '}
            <Code>{dag.fileToken}</Code>
          </ListItem>
        )}
        {dag && dag.tags && (
          <ListItem>
            Tags:
            {' '}
            {dag.tags.map((tag) => (
              <Badge key={tag.name} variantColor="blue" mr={1}>{tag.name}</Badge>
            ))}
          </ListItem>
        )}
      </List>
      <Box id="chart" mt={4} />
    </DagContainer>
  );
};

export default Dag;
