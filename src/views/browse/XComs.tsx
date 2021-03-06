import React from 'react';
import { MdSearch } from 'react-icons/md';
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import BrowseContainer from 'containers/BrowseContainer';

const XComs: React.FC = () => (
  <BrowseContainer
    current="XComs"
    toolBar={(
      <Box width="100%" display="flex" justifyContent="space-between">
        <InputGroup flex="1" size="sm" maxWidth="300px">
          <InputLeftElement>
            <Icon as={MdSearch} color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            aria-label="Find XCom"
            placeholder="Find XCom…"
            isDisabled
          />
        </InputGroup>
      </Box>
    )}
  >
    <p>TK</p>
  </BrowseContainer>
);

export default XComs;
