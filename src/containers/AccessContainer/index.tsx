import React from 'react';
import {
  Box,
  Heading,
  useColorMode,
} from '@chakra-ui/react';

import SectionNavBtn from 'components/SectionNavBtn';
import AppContainer from 'containers/AppContainer';

interface Props {
  current: string;
}

const AccessContainer: React.FC<Props> = ({ children, current }) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';

  const navItems = [
    {
      label: 'Users',
      path: '/access/users',
    },
    {
      label: 'Roles',
      path: '/access/roles',
    },
    {
      label: 'Permissions',
      path: '/access/permissions',
    },
  ];

  return (
    <AppContainer>
      <Box
        pt={4}
        mx={-4}
        px={4}
        pb="2"
        bg={isDarkMode ? 'gray.700' : 'gray.100'}
      >
        <Heading as="h1">
          <Box
            as="span"
            color={isDarkMode ? 'gray.500' : 'gray.400'}
          >
            Access/
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
            {navItems.map((item) => (
              <SectionNavBtn key={item.label} item={item} currentLabel={current} />
            ))}
          </Box>
        </Box>
      </Box>
      <Box p="4">{children}</Box>
    </AppContainer>
  );
};

export default AccessContainer;
