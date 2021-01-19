import React, { FunctionComponent } from 'react';
import {
  Box,
  Flex,
  useColorMode,
} from '@chakra-ui/react';

import { useVersion } from 'api';

import AppHeader from './AppHeader';
import AppNav from './AppNav';

const AppContainer: FunctionComponent = ({ children }) => {
  const { data } = useVersion();
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
            {data && data.version && (
              <>
                {' '}
                <a
                  href={`https://pypi.python.org/pypi/apache-airflow/${data.version}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`v${data.version}`}
                </a>
              </>
            )}
            {data && data.gitVersion && (
              <>
                <br />
                Git Version: {data.gitVersion}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppContainer;
