import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Photo } from '../../images/PhotoObject.type';

import Gallery from '../Gallery';

const testImages = require('../__tests_helpers__/generatePhotos');

const numberOfImages = 6;

const images: Photo[] = testImages(numberOfImages);

const empty = (): false => false;

test('Gallery should render photos components based on array', () => {
  const { getAllByTestId } = render(
    <Gallery
      innerWidth={1920}
      photoSelected={empty}
      images={images}
      selectFunction={empty}
      selectImageFunction={empty}
      selectedImages={[]}
    />,
  );

  expect(getAllByTestId('photo')).toHaveLength(numberOfImages);
});

test('Gallery should render images properly based on object info', () => {
  const { getAllByTestId } = render(
    <Gallery
      innerWidth={1920}
      photoSelected={empty}
      images={images}
      selectFunction={empty}
      selectImageFunction={empty}
      selectedImages={[]}
    />,
  );

  const photos = getAllByTestId('progressive_img');

  photos.forEach((photo): void => {
    const photoData = {
      id: Number(photo.getAttribute('data-imageid')),
      alt: photo.getAttribute('alt'),
      src: photo.getAttribute('src'),
    };

    expect(images[photoData.id].path).toBe(photoData.src);
    expect(photoData.alt).toBe('User image thumbnail');
  });
});

test('Selecting images should change its icon', () => {
  const selected: number[] = [];

  const selectImage = (id: number): void => {
    selected.push(id);
  };

  const photoSelected = (id: number): boolean => selected.includes(id);

  const { getAllByTestId, unmount } = render(
    <Gallery
      innerWidth={1920}
      photoSelected={photoSelected}
      images={images}
      selectFunction={empty}
      selectImageFunction={selectImage}
      selectedImages={selected}
    />,
  );

  const icons = getAllByTestId('imageSelectIcon');
  const photosBeforeSelecting = getAllByTestId('photo');

  photosBeforeSelecting.forEach((photo): void => {
    expect(photo).not.toHaveClass('photo-checked');
  });

  icons.forEach((icon): void => {
    fireEvent.click(icon);
  });

  unmount();

  const component = render(
    <Gallery
      innerWidth={1920}
      photoSelected={photoSelected}
      images={images}
      selectFunction={empty}
      selectImageFunction={selectImage}
      selectedImages={selected}
    />,
  );

  const photosAfterSelecting = component.getAllByTestId('photo');

  photosAfterSelecting.forEach((photo): void => {
    expect(photo).toHaveClass('photo-checked');
  });
});
