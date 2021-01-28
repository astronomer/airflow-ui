import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from '@chakra-ui/react';
import {
  MdWbSunny,
  MdBrightness2,
  MdAccountCircle,
  MdExitToApp,
} from 'react-icons/md';
import { useAuthContext } from 'auth';
import { ApacheAirflowIcon } from 'utils/icons';

interface Props {
  bodyBg: string;
  overlayBg: string;
}

const AppHeader: React.FC<Props> = ({ bodyBg, overlayBg }) => {
  const { toggleColorMode } = useColorMode();
  const now = dayjs();
  const headerHeight = '56px';
  const { hasValidAuthToken, logout } = useAuthContext();

  const handleOpenTZ = () => window.alert('This will open time zone select modal!');

  const handleOpenProfile = () => window.alert('This will take you to your user profile view.');

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
      borderBottomWidth="1px"
      borderBottomColor={bodyBg}
    >
      <Link to="/">
        <ApacheAirflowIcon />
      </Link>
      {hasValidAuthToken && (
        <Flex align="center">
          <Tooltip label="Change time zone" hasArrow>
            {/* TODO: open modal for time zone update */}
            <Button variant="ghost" mr="4" onClick={() => handleOpenTZ()}>
              <Box
                as="time"
                dateTime={now.toString()}
                fontSize="md"
              >
                {now.format('h:mmA Z')}
              </Box>
            </Button>
          </Tooltip>
          <Menu>
            <MenuButton>
              <Avatar name="Ryan Hamilton" size="sm" bg="blue.300" />
            </MenuButton>
            <MenuList placement="top-end">
              <MenuItem onClick={() => handleOpenProfile()}>
                <Icon as={MdAccountCircle} mr="2" />
                Your Profile
              </MenuItem>
              <MenuItem
                onClick={toggleColorMode}
              >
                <Icon as={useColorModeValue(MdBrightness2, MdWbSunny)} mr="2" />
                Set
                {useColorModeValue(' Dark ', ' Light ')}
                Mode
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>
                <Icon as={MdExitToApp} mr="2" />
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}
    </Flex>
  );
};

export default AppHeader;
