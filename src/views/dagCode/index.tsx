import React, { FunctionComponent } from 'react';
import useReactRouter from 'use-react-router';
import { useGet } from 'restful-react';
import humps from 'humps';
import { Code } from '@chakra-ui/react';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import 'highlight.js/styles/github.css';

import DagContainer from '../../containers/DagContainer';

const DagCode: FunctionComponent = () => {
  const { match: { params: { dagId } } } = useReactRouter();

  hljs.registerLanguage('python', python);

  const { data } = useGet({
    path: `dags/${dagId}`,
    resolve: (d) => humps.camelizeKeys(d),
  });

  const dag = data;

  if (!dag) return null;

  return (
    <DagContainer current="code">
      <pre>
        <Code display="block" p="4" className="python">DAG Code</Code>
      </pre>
    </DagContainer>
  );
};

export default DagCode;
