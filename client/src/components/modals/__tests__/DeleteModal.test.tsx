import { fireEvent, render } from '@testing-library/react';

import DeleteModal from '../DeleteModal';

const empty = (): true => true;

test('Delete modal displays proper form based on number of images', () => {
  const { getByText, rerender, queryByText } = render(<DeleteModal deleteModalDisplay deletePhoto={empty} deletePhotos={empty} hideDeleteModal={empty} multiDelete={2} />);

  expect(getByText(/delete these images/)).toBeInTheDocument();
  expect(queryByText(/delete this image/)).toBeNull();

  rerender(<DeleteModal deleteModalDisplay deletePhoto={empty} deletePhotos={empty} hideDeleteModal={empty} multiDelete={1} />);

  expect(getByText(/delete this image/)).toBeInTheDocument();
  expect(queryByText(/delete these images/)).toBeNull();
});

test('Delete modal is closing properly', () => {
  let display = true;

  const hideModal = (): void => {
    display = false;
  };

  const options = {
    deletePhoto: empty,
    deletePhotos: empty,
    hideDeleteModal: hideModal,
    multiDelete: 2,
  };

  const { getByText, unmount } = render(<DeleteModal {...options} deleteModalDisplay={display} />);

  fireEvent.click(getByText("Don't delete it!"));

  unmount();

  const modal = render(<DeleteModal {...options} deleteModalDisplay={display} />);

  expect(modal.queryByText('Delete image')).toBeNull();
});
