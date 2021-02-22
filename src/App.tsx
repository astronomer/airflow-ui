import { hot } from 'react-hot-loader';
import React from 'react';
import { Redirect, Switch } from 'react-router-dom';

import { PrivateRoute } from 'utils/auth';

import Dags from 'views/dags';
import Dag from 'views/dag';

import DagRuns from 'views/browse/DagRuns';
import EventLogs from 'views/browse/EventLogs';
import Jobs from 'views/browse/Jobs';
import SlaMisses from 'views/browse/SlaMisses';
import TaskInstances from 'views/browse/TaskInstances';
import TaskReschedules from 'views/browse/TaskReschedules';

import Permissions from 'views/security/Permissions';
import Roles from 'views/security/Roles';
import Users from 'views/security/Users';

import Config from 'views/admin/Config';
import Connections from 'views/admin/Connections';
import Pools from 'views/admin/Pools';
import Variables from 'views/admin/Variables';
import XComs from 'views/browse/XComs';

import Docs from 'views/docs';

const App = () => (
  <Switch>
    <Redirect exact path="/" to="/dags" />
    <PrivateRoute exact path="/dags" component={Dags} />
    <PrivateRoute exact path="/dags/:dagId" component={Dag} />

    <PrivateRoute exact path="/browse/dag-runs" component={DagRuns} />
    <PrivateRoute exact path="/browse/event-logs" component={EventLogs} />
    <PrivateRoute exact path="/browse/jobs" component={Jobs} />
    <PrivateRoute exact path="/browse/sla-misses" component={SlaMisses} />
    <PrivateRoute exact path="/browse/task-instances" component={TaskInstances} />
    <PrivateRoute exact path="/browse/task-reschedules" component={TaskReschedules} />
    <PrivateRoute exact path="/browse/xcoms" component={XComs} />

    <PrivateRoute exact path="/security/users" component={Users} />
    <PrivateRoute exact path="/security/roles" component={Roles} />
    <PrivateRoute exact path="/security/permissions" component={Permissions} />

    <PrivateRoute exact path="/admin/config" component={Config} />
    <PrivateRoute exact path="/admin/variables" component={Variables} />
    <PrivateRoute exact path="/admin/connections" component={Connections} />
    <PrivateRoute exact path="/admin/pools" component={Pools} />

    <PrivateRoute exact path="/docs" component={Docs} />
  </Switch>
);

export default hot(module)(App);
