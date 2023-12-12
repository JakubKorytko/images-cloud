import { fireEvent, render } from '@testing-library/react';
import { Photo } from '../../types/photoObject';

import Gallery from '../Gallery';

const testImages = require('../__tests_helpers__/generatePhotos');

const numberOfImages = 6;

const images: Photo[] = testImages(numberOfImages);

const empty = (): false => false;

const props = {
  innerWidth: 1920,
  photoSelected: empty,
  images,
  selectFunction: empty,
  selectImageFunction: empty,
  selectedImages: [],
};

test('Gallery should render photos components based on array', () => {
  const { getAllByTestId } = render(<Gallery {...props} />);

  expect(getAllByTestId('photo')).toHaveLength(numberOfImages);
});

test('Gallery should render images properly based on object info', () => {
  const { getAllByTestId } = render(<Gallery {...props} />);

  const photos = getAllByTestId('proggresive_img');

  photos.forEach((photo): void => {
    const photoData = {
      id: Number(photo.getAttribute('image-id')),
      alt: photo.getAttribute('alt'),
      src: photo.getAttribute('src'),
    };

    expect(images[photoData.id].path).toBe(photoData.src);
    expect(photoData.alt).toBe('User image thumbnail');
  });
});

test('Selecting images should change its icon', () => {
  const selectImage = (id: number): void => {
    selected.push(id);
  };

  const photoSelected = (id: number): boolean => selected.includes(id);

  const customprops = {
    innerWidth: 1920,
    photoSelected,
    images,
    selectFunction: empty,
    selectImageFunction: selectImage,
    selectedImages: [],
  };

  let selected: number[] = [];

  const { getAllByTestId, unmount } = render(<Gallery {...customprops} selectedImages={selected} />);

  const icons = getAllByTestId('imageSelectIcon');
  const photos_beforeSelecting = getAllByTestId('photo');

  photos_beforeSelecting.forEach((photo): void => {
    expect(photo).not.toHaveClass('photo-checked');
  });

  icons.forEach((icon): void => {
    fireEvent.click(icon);
  });

  unmount();

  const component = render(<Gallery {...customprops} selectedImages={selected} />);

  const photos_afterSelecting = component.getAllByTestId('photo');

  photos_afterSelecting.forEach((photo): void => {
    expect(photo).toHaveClass('photo-checked');
  });
});
