import React from 'react';

import SectionWrapper from 'components/SectionWrapper';

interface Props {
  current: string;
}

const BrowseContainer: React.FC<Props> = ({ children, current }) => {
  const navItems = [
    {
      label: 'Event Logs',
      path: '/browse/event-logs',
    },
    {
      label: 'DAG Runs',
      path: '/browse/dag-runs',
    },
    {
      label: 'Jobs',
      path: '/browse/jobs',
    },
    {
      label: 'Task Instances',
      path: '/browse/task-instances',
    },
    {
      label: 'Task Reschedules',
      path: '/browse/task-reschedules',
    },
    {
      label: 'SLA Misses',
      path: '/browse/sla-misses',
    },
  ];

  return (
    <SectionWrapper currentSection="Browse" currentView={current} navItems={navItems}>
      {children}
    </SectionWrapper>
  );
};

export default BrowseContainer;
