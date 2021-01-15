import React, { FunctionComponent } from 'react';
import {
  Code,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';

import { useConfig } from 'api';
import AppContainer from 'containers/AppContainer';
import ErrorMessage from 'components/ErrorMessage';

const Config: FunctionComponent = () => {
  const { data: config, error } = useConfig();
  return (
    <AppContainer>
      <Heading as="h1">Config</Heading>
      <ErrorMessage errors={[error]} />
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
