import React, { FunctionComponent } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormLabel,
  FormControl,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { MdLock, MdPerson } from 'react-icons/md';

import AppContainer from '../../containers/AppContainer';

const Login: FunctionComponent = () => (
  <AppContainer>
    <Alert status="error" my="4">
      <AlertIcon />
      Access denied.
    </Alert>
    <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
      <Box as="form" width="100%" maxWidth="400px" mx="auto">
        <FormControl>
          <FormLabel htmlFor="username">Username</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Icon as={MdPerson} color="gray.300" />
            </InputLeftElement>
            <Input
              name="username"
              placeholder="Username"
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
            />
          </InputGroup>
        </FormControl>
        <Button
          width="100%"
          mt={4}
          colorScheme="teal"
          type="submit"
        >
          Log in
        </Button>
      </Box>
    </Box>
  </AppContainer>
);

export default Login;
