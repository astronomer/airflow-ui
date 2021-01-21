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
import Connections from 'views/connections';
import Permissions from 'views/permissions';
import Pools from 'views/pools';
import Roles from 'views/roles';
import TaskInstances from 'views/task-instances';
import Users from 'views/users';
import Variables from 'views/variables';
import XComs from 'views/xcoms';

const App = () => (
  <Switch>
    <Redirect exact path="/" to="/dags" />
    <PrivateRoute exact path="/dags" component={Dags} />
    <PrivateRoute exact path="/dags/:dagId" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/code" component={DagCode} />
    <PrivateRoute exact path="/dags/:dagId/graph" component={DagGraph} />
    <PrivateRoute exact path="/dags/:dagId/tree" component={DagTree} />

    <PrivateRoute exact path="/access/users" component={Users} />
    <PrivateRoute exact path="/access/roles" component={Roles} />
    <PrivateRoute exact path="/access/permissions" component={Permissions} />

    <PrivateRoute exact path="/task-instances" component={TaskInstances} />

    <PrivateRoute exact path="/admin/config" component={Config} />
    <PrivateRoute exact path="/admin/variables" component={Variables} />
    <PrivateRoute exact path="/admin/connections" component={Connections} />
    <PrivateRoute exact path="/admin/pools" component={Pools} />
    <PrivateRoute exact path="/admin/xcoms" component={XComs} />
  </Switch>
);

export default hot(module)(App);
