import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
  toolBar?: React.ReactNode;
}

const AccessContainer: React.FC<Props> = ({ children, current, toolBar }) => {
  const navItems = [
    {
      label: 'Overview',
      path: '/access',
    },
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
    <SectionWrapper
      currentSection="Access"
      currentView={current}
      navItems={navItems}
      toolBar={toolBar}
    >
      {children}
    </SectionWrapper>
  );
};

export default AccessContainer;
