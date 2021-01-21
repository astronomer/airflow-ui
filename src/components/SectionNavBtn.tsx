import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

interface Props {
  item: {
    label: string;
    path: string;
  };
  currentLabel: string;
}

const SectionNavBtn: React.FC<Props> = ({ item, currentLabel }) => {
  const { label, path } = item;
  return (
    <Button
      as={Link}
      to={path}
      variant={currentLabel === label ? 'solid' : 'ghost'}
      colorScheme="blue"
      size="sm"
      mr="2"
    >
      {label}
    </Button>
  );
}

export default SectionNavBtn;
