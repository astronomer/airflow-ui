import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

import ErrorMessage from '../src/components/ErrorMessage';

describe('ErrorMessage', () => {
  it('Error message should appear as text', () => {
    const err = new Error('oops');
    const { getByText } = render(<ErrorMessage errors={[err]} />);
    expect(getByText('oops')).toBeInTheDocument();
  });
});
