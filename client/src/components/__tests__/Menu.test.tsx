import { render } from '@testing-library/react';

import Menu from '../Menu';

const empty = (): true => true;

const props = {
  logOut: empty,
  uploadModal: empty,
  deleteModal: empty,
  selectAllPhotos: empty,
  deselectPhotos: empty,
  reverse: false,
  reverseEvent: empty,
  sortEvent: empty,
  sortBy: 'Date',
  navbarDisplay: 'block',
};

test('Menu is displaying selected items properly and expanding size based on it', () => {
  const { getByTestId, getByText, rerender } = render(<Menu {...props} selectionCount={0} />);

  expect(getByTestId('menu')).toHaveClass('navbar-expand-lg');

  expect(getByText(/Selected 0 items/)).toBeInTheDocument();

  rerender(<Menu {...props} selectionCount={2} />);

  expect(getByTestId('menu')).toHaveClass('navbar-expand-xl');

  expect(getByText(/Selected 2 items/)).toBeInTheDocument();
});

test('Menu is displaying all buttons and logo properly', () => {
  const { getByText } = render(<Menu {...props} selectionCount={1} />);

  expect(getByText(/Upload new image/)).toBeInTheDocument();

  expect(getByText(/Delete/)).toBeInTheDocument();

  expect(getByText(/Cancel selection/)).toBeInTheDocument();

  expect(getByText(/Select all/)).toBeInTheDocument();

  expect(getByText(/Logout/)).toBeInTheDocument();
});
