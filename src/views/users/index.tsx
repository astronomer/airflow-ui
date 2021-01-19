import React, { FunctionComponent } from 'react';

import SecurityContainer from 'containers/SecurityContainer';

const Users: FunctionComponent = () => (
  <SecurityContainer current="Users">
    <p>TK</p>
  </SecurityContainer>
);

export default Users;
