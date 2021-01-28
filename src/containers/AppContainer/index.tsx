import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { useVersion } from 'api';
import { defaultVersion } from 'api/defaults';
import AppHeader from './AppHeader';
import AppNav from './AppNav';

const AppContainer: React.FC = ({ children }) => {
  const { data: { version, gitVersion } = defaultVersion } = useVersion();
  const bodyBg = useColorModeValue('white', 'gray.800');
  const overlayBg = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex width="100vw" height="100vh" alignItems="stretch">
      <AppNav bodyBg={bodyBg} overlayBg={overlayBg} />
      <Box flex="1" alignItems="stretch">
        <AppHeader bodyBg={bodyBg} overlayBg={overlayBg} />
        <Flex direction="column" height="100vh" pt="56px" overflowY="scroll">
          <Box flex="1" px="4">{children}</Box>
          <Box
            as="footer"
            p="4"
            color={useColorModeValue('gray.400', 'gray.500')}
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
                Git Version:
                {' '}
                {gitVersion}
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default AppContainer;
