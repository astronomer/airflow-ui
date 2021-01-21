import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';

import type { Dag } from 'interfaces';

interface Props {
  dagId?: Dag['dagId'];
  dags: Dag[];
}

const SidebarDag: React.FC<Props> = ({ dagId, dags }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dag, setDag] = useState<Dag | null>(null);

  useEffect(() => {
    if (dagId) {
      const dag = dags.find(d => d.dagId === dagId);
      if (dag) {
        setDag(dag);
        onOpen();
      }
    }
  }, [dagId, dags, setDag, onOpen]);

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
