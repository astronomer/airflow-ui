import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

// Pages
import Dag from './views/dag';
import DagCode from './views/dagCode';
import Dags from './views/dags';
import Config from './views/config';
import Login from './views/login';

const App = () => (
  <Switch>
    <Route exact path="/" component={Dags} />
    <Route exact path="/dags" component={Dags} />
    <Route exact path="/dags/:dagId" component={Dag} />
    <Route exact path="/dags/:dagId/details" component={Dag} />
    <Route exact path="/dags/:dagId/graph" component={Dag} />
    <Route exact path="/dags/:dagId/code" component={DagCode} />
    <Route exact path="/config" component={Config} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

export default hot(module)(App);
