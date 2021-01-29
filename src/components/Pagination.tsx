import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { ButtonGroup, Button } from '@chakra-ui/react';

interface Props {}

const Pagination: React.FC<Props> = ({ ...otherProps }) => (
  <ButtonGroup
    size="sm"
    isAttached
    variant="outline"
    // eslint-disable-next-line react/jsx-props-no-spreading
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

export default Pagination;
