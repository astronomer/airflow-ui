import React, { FunctionComponent } from 'react';
import { Box } from '@chakra-ui/react';

import AppContainer from '../../containers/AppContainer';

const Dashboard: FunctionComponent = () => (
  <AppContainer>
    <Box display="flex" alignItems="center" justifyContent="center" height="80vh">
      <Box width="100%" maxWidth="400px" mx="auto" textAlign="center">
        Dashboard
      </Box>
    </Box>
  </AppContainer>
);

export default Dashboard;
