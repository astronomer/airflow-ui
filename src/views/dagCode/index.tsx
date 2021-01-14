import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';
import { Code } from '@chakra-ui/react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github.css';

import ErrorMessage from 'components/ErrorMessage';
import DagContainer from 'containers/DagContainer';
import { useDag } from 'api';
import type { Dag } from 'interfaces';

const DagCode: FunctionComponent = () => {
  const { match: { params: { dagId } } }: { match: { params: { dagId: Dag['dagId'] }}} = useReactRouter();

  hljs.registerLanguage('python', python);

  const { data: dag, status, error } = useDag(dagId);
  if (!dag) return null;

  return (
    <DagContainer current="code">
      <ErrorMessage errors={[error]} />
      <pre>
        <Code display="block" p="4" className="python">DAG Code</Code>
      </pre>
    </DagContainer>
  );
};

export default DagCode;
