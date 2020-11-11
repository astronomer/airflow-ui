import React, { FunctionComponent, useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  Heading,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/core';

interface Props {
  task?: {
    taskId: string;
  }
}

const SidebarTask: FunctionComponent<Props> = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  useEffect(() => {
    onOpen();
  }, [task]);

  if (!task) return null;

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading as="h5" size="xs" color={colorMode === 'light' ? 'gray.400' : 'gray.500'}>TASK INSTANCE</Heading>
          <Heading as="h3" size="md">
            {task.taskId}
            <Box mt={4}>
              <Icon name="calendar" color={colorMode === 'light' ? 'gray.400' : 'gray.500'} mr={2} />
              2020-11-06 21:29:10+00:00
            </Box>
          </Heading>

        </DrawerHeader>
        <DrawerBody>
          <Tabs>
            <TabList>
              <Tab>Details</Tab>
              <Tab>
                <Icon name="logs" />
                Log
              </Tab>
              <Tab>Three</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Accordion allowMultiple allowToggle>
                  <AccordionItem>
                    <AccordionHeader>
                      <Box flex="1" textAlign="left">
                        Task Properties
                      </Box>
                      <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionHeader>
                      <Box flex="1" textAlign="left">
                        Section 2 title
                      </Box>
                      <AccordionIcon />
                    </AccordionHeader>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                      commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>

        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarTask;
