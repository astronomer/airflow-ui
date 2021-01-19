import React, { useState, FunctionComponent, FormEvent } from 'react';
import {
  Box,
  Button,
  FormLabel,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
} from '@chakra-ui/react';
import { MdLock, MdPerson } from 'react-icons/md';

import AppContainer from 'containers/AppContainer';
import { useAuthContext } from 'src/auth';
import ErrorMessage from 'components/ErrorMessage';

const Login: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthContext();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <AppContainer>
      <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
        <Box as="form" width="100%" maxWidth="400px" mx="auto" onSubmit={onSubmit}>
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={MdPerson} color="gray.300" />
              </InputLeftElement>
              <Input
                autoFocus
                name="username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                isRequired
              />
            </InputGroup>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Icon as={MdLock} color="gray.300" />
              </InputLeftElement>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                isRequired
              />
            </InputGroup>
          </FormControl>
          <ErrorMessage errors={[error]} />
          <Button
            width="100%"
            mt={4}
            colorScheme="teal"
            type="submit"
          >
            {loading ? <Spinner size="md" speed="0.85s" /> : 'Log in'}
          </Button>
        </Box>
      </Box>
    </AppContainer>
  );
}

export default Login;
