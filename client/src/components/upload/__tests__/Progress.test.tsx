import { render } from '@testing-library/react';
import React from 'react';

import Progress from '../Progress';

const empty = (): true => true;

test('Progress bar displays percentage correctly', () => {
  const { getByRole } = render(<Progress reset={empty} toggle={empty} show percentage={50} />);

  expect(getByRole('progressbar').textContent).toBe('50%');
});
