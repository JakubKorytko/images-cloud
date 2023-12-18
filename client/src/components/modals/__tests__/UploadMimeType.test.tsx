import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import UploadMimeType from '../UploadMimeType';

test('Mime type modal is closing properly', () => {
  let display = true;

  const hideModal = (): void => {
    display = false;
  };

  const { getByText, unmount } = render(<UploadMimeType closeHandler={hideModal} show={display} />);

  expect(getByText('Wrong file uploaded!')).toBeInTheDocument();

  fireEvent.click(getByText('Okay...'));

  unmount();

  const modal = render(<UploadMimeType closeHandler={hideModal} show={display} />);

  expect(modal.queryByText('Wrong file uploaded!')).toBeNull();
});
