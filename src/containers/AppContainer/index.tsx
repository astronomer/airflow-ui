import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdLock,
  MdDashboard,
  MdGroup,
  MdSettings,
  MdPlaylistPlay
} from 'react-icons/md';

import AppHeader from './AppHeader';
import AppNav from './AppNav';

const AppContainer: FunctionComponent = ({ children }) => {
  const { colorMode } = useColorMode();
  const version = '3.0.0';
  const isDarkMode = colorMode === 'dark';
  const bodyBg = isDarkMode ? 'gray.800' : 'white';
  const overlayBg = isDarkMode ? 'gray.700' : 'gray.100';

  const renderNavItem = (icon, path: string) => {
    const hoverBg = isDarkMode ? 'gray.800' : 'gray.200';
    return (
      <Box
        as={Link}
        to={path}
        display="flex"
        width="56px"
        height="56px"
        alignItems="center"
        justifyContent="center"
        borderWidth="3px"
        borderColor="transparent"
        borderLeftColor="transparent"
        _hover={{
          backgroundColor: hoverBg,
        }}
      >
        <Box as={icon} size="24px" color="gray.500" />
      </Box>
    );
  };

  return (
    <Flex width="100vw" height="100vh" alignItems="stretch">
      <AppNav isDarkMode={isDarkMode} bodyBg={bodyBg} overlayBg={overlayBg} />
      <Box flex="1" alignItems="stretch">
        <AppHeader isDarkMode={isDarkMode} bodyBg={bodyBg} overlayBg={overlayBg} />
        <Flex direction="column" height="100vh" pt="56px" overflowY="scroll">
          <Box flex="1" px="4">{children}</Box>
          <Box
            as="footer"
            p="4"
            color={isDarkMode ? 'gray.500' : 'gray.400'}
            bg={overlayBg}
          >
            Apache Airflow
            {' '}
            <a
              href={`https://pypi.python.org/pypi/apache-airflow/${version}`}
              target="_blank"
              rel="noreferrer"
            >
              {`v${version}`}
            </a>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppContainer;
