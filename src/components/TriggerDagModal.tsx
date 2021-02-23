import React, { ChangeEvent, useState } from 'react';
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
import { useTriggerDag } from 'api';

interface Props {
  dagId: Dag['dagId'];
  isOpen: boolean;
  onClose: () => void;
}

const TriggerDagModal: React.FC<Props> = ({ dagId, isOpen, onClose }) => {
  const mutation = useTriggerDag(dagId);
  const [config, setConfig] = useState('{}');

  const onTrigger = () => {
    mutation.mutate({
      conf: JSON.parse(config),
      executionDate: new Date(),
    });
    onClose();
  };

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Trigger DAG: {dagId}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="configuration">Configuration JSON (Optional)</FormLabel>
            <Textarea name="configuration" value={config} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setConfig(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" ml={2} onClick={onTrigger}>
            Trigger
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TriggerDagModal;
