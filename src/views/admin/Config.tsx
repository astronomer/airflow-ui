import React from 'react';
import {
  Code,
  List,
  ListItem,
} from '@chakra-ui/react';

import { useConfig } from 'api';
import AdminContainer from 'containers/AdminContainer';
import ErrorMessage from 'components/ErrorMessage';

import type { ConfigSection } from 'interfaces';

const Config: React.FC = () => {
  const { data, error } = useConfig();
  return (
    <AdminContainer current="Config">
      <ErrorMessage errors={[error]} />
      <pre>
        <Code display="block" p="4" className="python">{data}</Code>
      </pre>

      <List styleType="none" mt="8">
        {data && data.sections && data.sections.map((section: ConfigSection) => (
          <ListItem key={section.name}>{section.name}</ListItem>
        ))}
      </List>
    </AdminContainer>
  );
};

export default Config;
