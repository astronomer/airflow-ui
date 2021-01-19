import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Heading,
  useColorMode,
} from '@chakra-ui/react';

import AppContainer from '../AppContainer';

interface Props {
  current: string;
}

interface NavBtnItem {
  label: string;
  path: string;
}

const SecurityContainer: FunctionComponent<Props> = ({ children, current }) => {
  const { colorMode } = useColorMode();

  const renderNavBtn = (item: NavBtnItem) => (
    <Button
      key={item.label}
      as={Link}
      to={item.path}
      variant={current === item.label.toLowerCase() ? 'solid' : 'ghost'}
      colorScheme="blue"
      size="sm"
      mr="2"
    >
      {item.label}
    </Button>
  );

  const navItems = [
    {
      label: 'Users',
      path: '/users',
    },
    {
      label: 'Roles',
      path: '/roles',
    },
    {
      label: 'Permissions',
      path: '/permissions',
    },
  ];

  return (
    <AppContainer>
      <Box
        pt={4}
        mx={-4}
        px={4}
        pb="2"
        bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
      >
        <Heading as="h1">
          <Box
            as="span"
            color={colorMode === 'light' ? 'gray.400' : 'gray.500'}
          >
            Access/
            {' '}
          </Box>
          {current}
        </Heading>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mt="4"
        >
          <Box as="nav">
            {navItems.map((item) => renderNavBtn(item))}
          </Box>
        </Box>
      </Box>
      <Box p="4">{children}</Box>
    </AppContainer>
  );
};

export default SecurityContainer;
