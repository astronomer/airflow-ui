import React from 'react';
import { MdSearch } from 'react-icons/md';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import AdminContainer from 'containers/AdminContainer';

const XComs: React.FC = () => (
  <AdminContainer
    current="XComs"
    toolBar={(
      <Box width="100%" display="flex" justifyContent="space-between">
        <InputGroup flex="1" size="sm" maxWidth="300px">
          <InputLeftElement>
            <Icon as={MdSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="Find XCom…"
          />
        </InputGroup>
      </Box>
    )}
  >
    <p>TK</p>
  </AdminContainer>
);

export default XComs;
