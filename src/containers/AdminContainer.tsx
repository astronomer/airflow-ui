import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
  toolBar?: React.ReactNode;
}

const AdminContainer: React.FC<Props> = ({ children, current, toolBar }) => {
  const navItems = [
    {
      label: 'Config',
      path: '/admin/config',
    },
    {
      label: 'Variables',
      path: '/admin/variables',
    },
    {
      label: 'Connections',
      path: '/admin/connections',
    },
    {
      label: 'Pools',
      path: '/admin/pools',
    },
  ];

  return (
    <SectionWrapper
      currentSection="Admin"
      currentView={current}
      navItems={navItems}
      toolBar={toolBar}
    >
      {children}
    </SectionWrapper>
  );
};

export default AdminContainer;
