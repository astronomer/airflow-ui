import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  useColorMode,
} from '@chakra-ui/react';
import {
  MdWbSunny,
  MdBrightness2,
  MdAccountCircle,
  MdExitToApp,
} from 'react-icons/md';
import { useAuthContext } from 'src/auth';
import { ApacheAirflowIcon } from 'utils/icons';

interface Props {
  bodyBg: string;
  overlayBg: string;
  isDarkMode: boolean;
}

const AppHeader: React.FC<Props> = ({ bodyBg, overlayBg, isDarkMode }) => {
  const { toggleColorMode } = useColorMode();
  const now = dayjs();
  const headerHeight = '56px';
  const { logout } = useAuthContext();
  return (
    <Flex
      as="header"
      position="fixed"
      width={`calc(100vw - ${headerHeight})`}
      height={headerHeight}
      zIndex={2}
      align="center"
      justifyContent="space-between"
      py="2"
      px="4"
      backgroundColor={overlayBg}
      borderBottomWidth={'1px'}
      borderBottomColor={bodyBg}
    >
      <Link to="/">
        <ApacheAirflowIcon />
      </Link>
      <Flex align="center">
        <Box
          as="time"
          dateTime={now.toString()}
          mr="4"
          fontSize="md"
        >
          {now.format('h:mmA Z')}
        </Box>
        <Menu>
          <MenuButton>
            <Avatar name="Ryan Hamilton" size="sm" bg="blue.300" />
          </MenuButton>
          <MenuList placement="top-end">
            <MenuItem>
              <Icon as={MdAccountCircle} mr="2" />
              Your Profile
            </MenuItem>
            <MenuItem
              onClick={toggleColorMode}
            >
              <Icon as={isDarkMode ? MdWbSunny : MdBrightness2} mr="2" />
              Set
              {isDarkMode ? ' Light ' : ' Dark '}
              Mode
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={logout}>
              <Icon as={MdExitToApp} mr="2" />
              Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default AppHeader;
