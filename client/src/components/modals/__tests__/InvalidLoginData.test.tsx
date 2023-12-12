import { fireEvent, render } from '@testing-library/react';

import InvalidLoginData from '../InvalidLoginData';

test('Invalid login data modal is closing properly', () => {
  let display = true;

  const hideModal = (): void => {
    display = false;
  };

  const { getByText, unmount } = render(<InvalidLoginData closeHandler={hideModal} show={display} />);

  expect(getByText('Wrong username or password!')).toBeInTheDocument();

  fireEvent.click(getByText('Okay...'));

  unmount();

  const modal = render(<InvalidLoginData closeHandler={hideModal} show={display} />);

  expect(modal.queryByText('Wrong username or password!')).toBeNull();
});
