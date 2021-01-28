import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
}

const AccessContainer: React.FC<Props> = ({ children, current }) => {
  const navItems = [
    {
      label: 'Users',
      path: '/access/users',
    },
    {
      label: 'Roles',
      path: '/access/roles',
    },
    {
      label: 'Permissions',
      path: '/access/permissions',
    },
  ];

  return (
    <SectionWrapper currentSection="Access" currentView={current} navItems={navItems}>
      {children}
    </SectionWrapper>
  );
};

export default AccessContainer;
