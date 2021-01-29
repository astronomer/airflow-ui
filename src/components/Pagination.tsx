import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface Props {}

const Pagination: React.FC<Props> = ({ ...otherProps}) => {
  return (
    <ButtonGroup
      size="sm"
      isAttached
      variant="outline"
      {...otherProps}
    >
      <Button leftIcon={<MdChevronLeft />} isDisabled>
        Prev
      </Button>
      <Button rightIcon={<MdChevronRight />}>
        Next
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
