import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

import SectionNavBtn from 'components/SectionNavBtn';

import AppContainer from 'containers/AppContainer';

interface Props {
  currentSection: string;
  currentView: string;
  navItems: {
    label: string;
    path: string;
  }[]
  toolBar?: React.ReactNode;
}

const SectionWrapper: React.FC<Props> = ({
  children, currentSection, currentView, navItems, toolBar,
}) => (
  <AppContainer>
    <Box
      pt={4}
      mx={-4}
      px={4}
      pb="2"
      bg={useColorModeValue('gray.100', 'gray.700')}
    >
      <Heading as="h1">
        <Box
          as="span"
          color={useColorModeValue('gray.400', 'gray.500')}
        >
          {currentSection}
          /
        </Box>
        {currentView}
      </Heading>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt="4"
      >
        <Box as="nav">
          {navItems.map((item) => (
            <SectionNavBtn key={item.label} item={item} currentLabel={currentView} />
          ))}
        </Box>
      </Box>
    </Box>
    {toolBar && (
      <Box
        position="sticky"
        top="0"
        zIndex="1"
        display="flex"
        justifyContent="flex-start"
        width="calc(100% + 2rem)%"
        mr={-4}
        ml={-4}
        py={2}
        px={4}
        borderBottomWidth="2px"
        borderBottomColor={useColorModeValue('gray.100', 'gray.700')}
        backgroundColor={useColorModeValue('white', 'gray.800')}
      >
        {toolBar}
      </Box>
    )}
    <Box py="4">{children}</Box>
  </AppContainer>
);

export default SectionWrapper;
