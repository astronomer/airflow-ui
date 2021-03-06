import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Tooltip,
} from '@chakra-ui/react';

import type { IconType } from 'react-icons/lib';

interface Props {
  navItem: {
    label: string;
    icon: IconType;
    path?: string;
    activePath?: string;
    href?: string;
  };
}

const AppNavBtn: React.FC<Props> = ({ navItem }) => {
  const location = useLocation();
  const {
    label, icon, path, href, activePath,
  } = navItem;
  const isHome = activePath === '/';
  const isActive = activePath && ((isHome && location.pathname === '/') || (!isHome && location.pathname.includes(activePath)));

  return (
    <Tooltip
      key={label}
      label={label}
      aria-label={label}
      placement="right"
      hasArrow
    >
      <Box
        as={Link}
        to={path || ''}
        href={href}
        target={href && '_blank'}
        aria-label={label}
        display="flex"
        width="56px"
        height="56px"
        alignItems="center"
        justifyContent="center"
        borderRightWidth="3px"
        borderLeftWidth="3px"
        borderColor="transparent"
        borderLeftColor={isActive ? 'blue.500' : 'transparent'}
        color={isActive ? 'blue.500' : 'gray.500'}
        _hover={{
          color: 'blue.500',
        }}
      >
        <Box
          as={icon}
          size="24px"
          color="currentcolor"
        />
      </Box>
    </Tooltip>
  );
};

export default AppNavBtn;
