import React from 'react';
import {
  Center,
  Box,
  Heading,
  Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import AppContainer from 'containers/AppContainer';

const NotFound = () => (
  <AppContainer>
    <Center mt="50px">
      <Box textAlign="center">
        <Heading>Page not found</Heading>
        <Link
          as={RouterLink}
          to="/dags"
          color="teal.500"
        >
          Return to the main page
        </Link>
      </Box>
    </Center>
  </AppContainer>
);

export default NotFound;
