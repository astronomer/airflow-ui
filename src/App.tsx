import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import { PrivateRoute } from './auth';

// Pages
import Dag from './views/dag';
import DagCode from './views/dagCode';
import Dags from './views/dags';
import Config from './views/config';
import Login from './views/login';

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/" component={Dags} />
    <PrivateRoute exact path="/dags" component={Dags} />
    <PrivateRoute exact path="/dags/:dagId" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/details" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/graph" component={Dag} />
    <PrivateRoute exact path="/dags/:dagId/code" component={DagCode} />
    <PrivateRoute exact path="/config" component={Config} />
    <PrivateRoute exact path="/admin" component={Config} />
  </Switch>
);

export default hot(module)(App);
