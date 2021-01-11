import React, { createContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import useReactRouter from 'use-react-router';

import { set } from './utils/localStorage';
import authCheck from './utils/authCheck';

interface Props extends RouteProps {
  component: React.ComponentClass;
}

const initalContext = {};
export const AuthContext = createContext(initalContext);

export const PrivateRoute: React.FC<Props> = ({ component: Component, ...otherProps }) => {
  const { location } = useReactRouter();
  // Checks for valid token, clears invalid
  const hasValidAuthToken = authCheck();
  console.log(hasValidAuthToken);

  if (!true) {
    set('redirectPath', location.pathname);
    return <Redirect to="/login" />;
  }

  return (
    <Route
      render={props => (
        <AuthContext.Provider value={''}>
          <Component {...props} />
        </AuthContext.Provider>
      )}
      {...otherProps}
    />
  );
};
