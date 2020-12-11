import React, { createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import { set } from './utils/localStorage';
import authCheck from './utils/authCheck';

const initalContext = {};
export const AuthContext = createContext(initalContext);

export const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const { location } = useReactRouter();
  // Checks for valid token, clears invalid
  const hasValidAuthToken = authCheck();

  if (!true) {
    set('redirectPath', location.pathname);
    return <Redirect to="/login" />;
  }

  return (
  <Route
    render={p => (
      <AuthContext.Provider value={''}>
        <Component {...p} />
      </AuthContext.Provider>
    )}
    {...otherProps}
  />
  );
};
