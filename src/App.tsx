import { hot } from 'react-hot-loader';
import React from 'react';
import { Switch } from 'react-router-dom';

import { PrivateRoute } from 'utils/auth';

import Dashboard from 'views/dashboard';

import Dags from 'views/dags';
import Dag from 'views/dag';
import Code from 'views/dag/Code';
import Graph from 'views/dag/Graph';
import Tree from 'views/dag/Tree';
import Gantt from 'views/dag/Gantt';
import LandingTimes from 'views/dag/LandingTimes';
import TaskDuration from 'views/dag/TaskDuration';
import TaskTries from 'views/dag/TaskTries';

import DagRuns from 'views/browse/DagRuns';
import EventLogs from 'views/browse/EventLogs';
import Jobs from 'views/browse/Jobs';
import SlaMisses from 'views/browse/SlaMisses';
import TaskInstances from 'views/browse/TaskInstances';
import TaskReschedules from 'views/browse/TaskReschedules';

import Access from 'views/access';
import Permissions from 'views/access/Permissions';
import Roles from 'views/access/Roles';
import Users from 'views/access/Users';

import Config from 'views/admin/Config';
import Connections from 'views/admin/Connections';
import Pools from 'views/admin/Pools';
import Variables from 'views/admin/Variables';
import XComs from 'views/browse/XComs';

import Docs from 'views/docs';

const App = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Dashboard} />
    <PrivateRoute exact path="/dags" component={Dags} />
    <PrivateRoute exact path="/dags/:dagId" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/code" component={Code} />
    <PrivateRoute exact path="/dags/:dagId/graph" component={Graph} />
    <PrivateRoute exact path="/dags/:dagId/tree" component={Tree} />
    <PrivateRoute exact path="/dags/:dagId/gantt" component={Gantt} />
    <PrivateRoute exact path="/dags/:dagId/landing-times" component={LandingTimes} />
    <PrivateRoute exact path="/dags/:dagId/task-duration" component={TaskDuration} />
    <PrivateRoute exact path="/dags/:dagId/task-tries" component={TaskTries} />

    <PrivateRoute exact path="/browse/dag-runs" component={DagRuns} />
    <PrivateRoute exact path="/browse/event-logs" component={EventLogs} />
    <PrivateRoute exact path="/browse/jobs" component={Jobs} />
    <PrivateRoute exact path="/browse/sla-misses" component={SlaMisses} />
    <PrivateRoute exact path="/browse/task-instances" component={TaskInstances} />
    <PrivateRoute exact path="/browse/task-reschedules" component={TaskReschedules} />
    <PrivateRoute exact path="/browse/xcoms" component={XComs} />

    <PrivateRoute exact path="/access" component={Access} />
    <PrivateRoute exact path="/access/users" component={Users} />
    <PrivateRoute exact path="/access/roles" component={Roles} />
    <PrivateRoute exact path="/access/permissions" component={Permissions} />

    <PrivateRoute exact path="/admin/config" component={Config} />
    <PrivateRoute exact path="/admin/variables" component={Variables} />
    <PrivateRoute exact path="/admin/connections" component={Connections} />
    <PrivateRoute exact path="/admin/pools" component={Pools} />

    <PrivateRoute exact path="/docs" component={Docs} />
  </Switch>
);

export default hot(module)(App);
