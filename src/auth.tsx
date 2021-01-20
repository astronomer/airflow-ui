import React, { createContext, useState, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { useQueryClient } from 'react-query';

import { checkExpire, clearAuth, get, set } from 'utils/localStorage';
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
}

export const AuthContext = createContext<AuthContextData>(authContextDefaultValue);

export const AuthProvider = ({ children, ...rest }): React.ReactElement => {
  const [hasValidAuthToken, setHasValidAuthToken] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  const clearData = () => {
    setHasValidAuthToken(false);
    clearAuth();
    queryClient.clear();
    axios.defaults.headers.common['Authorization'] = null;
  }

  useEffect(() => {
    const token = get('token');
    const isExpired = checkExpire('token');
    if (token && !isExpired) {
      axios.defaults.headers.common['Authorization'] = token;
      setHasValidAuthToken(true);
    } else if (token) {
      clearData();
      setError(new Error('Token invalid, please reauthenticate.'))
    } else {
      setHasValidAuthToken(false);
    }
    setLoading(false);
  }, []);

  const logout = () => clearData();

  // Login with basic auth. There is no actual auth endpoint yet, so we check against a generic endpoint 
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const authorization = `Basic ${btoa(`${username}:${password}`)}`;
      await axios.get('/config', {
        headers: {
          'Authorization': authorization,
        },
      });
      setLoading(false);
      setHasValidAuthToken(true);
      set('token', authorization);
      axios.defaults.headers.common['Authorization'] = authorization;
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
      {...rest}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export const PrivateRoute: React.FC = (props) => {
  const { hasValidAuthToken } = useAuthContext();
  return hasValidAuthToken ? <Route {...props} /> : <Login />
}
