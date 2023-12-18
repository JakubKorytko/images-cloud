import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import HealthCheckModal from '../HealthCheckModal';

test('Healthcheck modal is closing properly', () => {
  let display = true;

  const hideModal = (): void => {
    display = false;
  };

  const { getByText, unmount } = render(
    <HealthCheckModal closeHandler={hideModal} show={display} />,
  );

  expect(getByText('Whoops! Server sent some errors...')).toBeInTheDocument();

  fireEvent.click(getByText('Okay!'));

  unmount();

  const modal = render(<HealthCheckModal closeHandler={hideModal} show={display} />);

  expect(modal.queryByText('Whoops! Server sent some errors...')).toBeNull();
});
