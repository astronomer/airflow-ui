import { hot } from 'react-hot-loader';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from './auth';

import Dag from 'views/dag';
import DagCode from 'views/dagCode';
import DagGraph from 'views/dagGraph';
import DagTree from 'views/dagTree';
import Dags from 'views/dags';
import Config from 'views/config';
import TaskInstances from 'views/task-instances';
import Variables from 'views/variables';

const App = () => (
  <Switch>

    <PrivateRoute exact path="/" component={Dags} />
    <Redirect exact path="/dags" to="/" />
    <PrivateRoute exact path="/dags/:dagId" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/code" component={DagCode} />
    <PrivateRoute exact path="/dags/:dagId/graph" component={DagGraph} />
    <PrivateRoute exact path="/dags/:dagId/tree" component={DagTree} />

    <PrivateRoute exact path="/task-instances" component={TaskInstances} />

    <PrivateRoute exact path="/config" component={Config} />
    <PrivateRoute exact path="/variables" component={Variables} />
  </Switch>
);

export default hot(module)(App);
