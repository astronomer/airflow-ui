import React, {
  createContext, useState, useEffect, useContext, useCallback, ReactNode,
} from 'react';
import { Route, RouteProps } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { useQueryClient } from 'react-query';
import humps from 'humps';

import {
  checkExpire, clearAuth, get, set,
} from 'utils/localStorage';
import Login from 'views/login';

// todo: eventually replace hasValidAuthToken with a user object
interface AuthContextData {
  hasValidAuthToken: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  loading: boolean;
  error: Error | null;
}

export const authContextDefaultValue: AuthContextData = {
  hasValidAuthToken: false,
  login: () => null,
  logout: () => null,
  loading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextData>(authContextDefaultValue);

export type Props = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Props): React.ReactElement => {
  const [hasValidAuthToken, setHasValidAuthToken] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const clearData = useCallback(() => {
    setHasValidAuthToken(false);
    clearAuth();
    queryClient.clear();
    axios.defaults.headers.common.Authorization = null;
  }, [queryClient]);

  const logout = () => clearData();

  // intercept responses, transform response to camelCase, and logout the user on unauthorized error
  axios.interceptors.response.use(
    (res) => (res.data ? humps.camelizeKeys(res.data) as unknown as AxiosResponse : res),
    (err) => {
      if (err && err.response && err.response.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  useEffect(() => {
    const token = get('token');
    const isExpired = checkExpire('token');
    if (token && !isExpired) {
      axios.defaults.headers.common.Authorization = token;
      setHasValidAuthToken(true);
    } else if (token) {
      clearData();
      setError(new Error('Token invalid, please reauthenticate.'));
    } else {
      setHasValidAuthToken(false);
    }
    setLoading(false);
  }, [clearData]);

  // Login with basic auth.
  // There is no actual auth endpoint yet, so we check against a generic endpoint
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authorization = `Basic ${btoa(`${username}:${password}`)}`;
      await axios.get('/config', {
        headers: {
          Authorization: authorization,
        },
      });
      set('token', authorization);
      axios.defaults.headers.common.Authorization = authorization;
      setLoading(false);
      setHasValidAuthToken(true);
    } catch (e) {
      setLoading(false);
      setError(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        hasValidAuthToken,
        logout,
        login,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useAuthContext = () => useContext(AuthContext);

export const PrivateRoute: React.FC<RouteProps> = (props) => {
  const { hasValidAuthToken } = useAuthContext();
  return hasValidAuthToken ? <Route {...props} /> : <Login />;
};
