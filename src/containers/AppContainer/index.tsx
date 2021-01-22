import React from 'react';
import {
  Box,
  Flex,
  useColorMode,
} from '@chakra-ui/react';

import { useVersion } from 'api';

import AppHeader from './AppHeader';
import AppNav from './AppNav';
import { defaultVersion } from 'api/defaults';

const AppContainer: React.FC = ({ children }) => {
  const { data: { version, gitVersion } = defaultVersion } = useVersion();
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const bodyBg = isDarkMode ? 'gray.800' : 'white';
  const overlayBg = isDarkMode ? 'gray.700' : 'gray.100';

  return (
    <Flex width="100vw" height="100vh" alignItems="stretch">
      <AppNav bodyBg={bodyBg} overlayBg={overlayBg} />
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
            {gitVersion && (
              <>
                <br />
                Git Version: {gitVersion}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppContainer;
