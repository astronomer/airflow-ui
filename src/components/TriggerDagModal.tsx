import React from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Textarea,
} from '@chakra-ui/react';

import type { Dag } from 'interfaces';

interface Props {
  dagId: Dag['dagId'];
  isOpen: boolean;
  onClose: () => void;
}

const TriggerDagModal: React.FC<Props> = ({ dagId, isOpen, onClose }) => {
  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Trigger DAG: {dagId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="configuration">Configuration JSON (Optional)</FormLabel>
            <Textarea name="configuration" value="{}" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" ml={2}>
            Trigger
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TriggerDagModal;
