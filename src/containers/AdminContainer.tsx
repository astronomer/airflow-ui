import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
}

const AdminContainer: React.FC<Props> = ({ children, current }) => {
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
    {
      label: 'XComs',
      path: '/admin/xcoms',
    },
  ];

  return (
    <SectionWrapper currentSection="Admin" currentView={current} navItems={navItems}>
      {children}
    </SectionWrapper>
  );
};

export default AdminContainer;
