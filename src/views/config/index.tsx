import React, { FunctionComponent } from 'react';
import { useGet } from 'restful-react';
import humps from 'humps';
import {
  Code,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/core';

import AppContainer from '../../containers/AppContainer';

const Config: FunctionComponent = () => {
  const { data: config } = useGet({
    path: '/config',
    resolve: (d) => humps.camelizeKeys(d),
  });

  return (
    <AppContainer>
      <Heading as="h1">Config</Heading>
      <pre>
        <Code display="block" p="4" className="python">{config}</Code>
      </pre>

      <List styleType="none" mt="8">
        {config && config.sections && config.sections.map((section) => (
          <ListItem key={section.name}>{section.name}</ListItem>
        ))}
      </List>
    </AppContainer>
  );
};

export default Config;
