import React, { FunctionComponent, useEffect, useState } from 'react';
import { useGet } from 'restful-react';
import humps from 'humps';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/core';

import type { Dag } from '../../interfaces';

interface Props {
  dagId?: Dag['dagId'];
}

const SidebarDag: FunctionComponent<Props> = ({ dagId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dag, setDag] = useState<Dag | null>(null);

  const { data } = useGet({
    path: `dags/${dagId}`,
    resolve: (d) => humps.camelizeKeys(d),
  });

  const updateDag = (id: Dag['dagId']) => {
    setDag(data);
    onOpen();
  }

  useEffect(() => {
    if (dagId) {
      updateDag(dagId);
    }
  }, [dagId]);

  if (!dag) return null;

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
        <DrawerHeader>{dag.dagId}</DrawerHeader>

        <DrawerBody>
          <Box
            borderTopWidth="1px"
            borderBottomWidth="1px"
            py={1}
          >
            <Button size="sm">

              Trigger
            </Button>
          </Box>
          {dag.dagId}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SidebarDag;
