import type { PropsWithChildren } from 'react';

const compareObjectProps = (
  prevProps: PropsWithChildren<any>,
  nextProps: PropsWithChildren<any>,
) => (
  JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

export default compareObjectProps;
