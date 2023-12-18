import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import SessionExpired from '../SessionExpired';

test('Session expired modal is closing properly', () => {
  let display = true;

  const hideModal = (): void => {
    display = false;
  };

  const { getByText, unmount } = render(<SessionExpired closeHandler={hideModal} show={display} />);

  expect(getByText('Your session expired!')).toBeInTheDocument();

  fireEvent.click(getByText('Okay!'));

  unmount();

  const modal = render(<SessionExpired closeHandler={hideModal} show={display} />);

  expect(modal.queryByText('Your session expired!')).toBeNull();
});
