import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
  toolBar?: React.ReactNode;
}

const SecurityContainer: React.FC<Props> = ({ children, current, toolBar }) => {
  const navItems = [
    {
      label: 'Users',
      path: '/security/users',
    },
    {
      label: 'Roles',
      path: '/security/roles',
    },
    {
      label: 'Permissions',
      path: '/security/permissions',
    },
  ];

  return (
    <SectionWrapper
      currentSection="Security"
      currentView={current}
      navItems={navItems}
      toolBar={toolBar}
    >
      {children}
    </SectionWrapper>
  );
};

export default SecurityContainer;
