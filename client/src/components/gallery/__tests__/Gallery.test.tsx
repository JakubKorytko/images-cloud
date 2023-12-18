import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Gallery from 'components/gallery/Gallery';
import testImages from 'components/gallery/__tests_helpers__/generateImages';

import type { Image } from 'components/images/ImageObject.type';

const numberOfImages = 6;

const images: Image[] = testImages(numberOfImages);

const empty = (): false => false;

test('Gallery should render images components based on array', () => {
  const { getAllByTestId } = render(
    <Gallery
      innerWidth={1920}
      imageSelected={empty}
      images={images}
      selectFunction={empty}
      selectImageFunction={empty}
      selectedImages={[]}
    />,
  );

  expect(getAllByTestId('image')).toHaveLength(numberOfImages);
});

test('Gallery should render images properly based on object info', () => {
  const { getAllByTestId } = render(
    <Gallery
      innerWidth={1920}
      imageSelected={empty}
      images={images}
      selectFunction={empty}
      selectImageFunction={empty}
      selectedImages={[]}
    />,
  );

  const foundImages = getAllByTestId('progressive_img');

  foundImages.forEach((image): void => {
    const imageData = {
      id: Number(image.getAttribute('data-imageid')),
      alt: image.getAttribute('alt'),
      src: image.getAttribute('src'),
    };

    expect(images[imageData.id].path).toBe(imageData.src);
    expect(imageData.alt).toBe('User image thumbnail');
  });
});

test('Selecting images should change its icon', () => {
  const selected: number[] = [];

  const selectImage = (id: number): void => {
    selected.push(id);
  };

  const imageSelected = (id: number): boolean => selected.includes(id);

  const { getAllByTestId, unmount } = render(
    <Gallery
      innerWidth={1920}
      imageSelected={imageSelected}
      images={images}
      selectFunction={empty}
      selectImageFunction={selectImage}
      selectedImages={selected}
    />,
  );

  const icons = getAllByTestId('imageSelectIcon');
  const imagesBeforeSelecting = getAllByTestId('image');

  imagesBeforeSelecting.forEach((image): void => {
    expect(image).not.toHaveClass('image-checked');
  });

  icons.forEach((icon): void => {
    fireEvent.click(icon);
  });

  unmount();

  const component = render(
    <Gallery
      innerWidth={1920}
      imageSelected={imageSelected}
      images={images}
      selectFunction={empty}
      selectImageFunction={selectImage}
      selectedImages={selected}
    />,
  );

  const imagesAfterSelecting = component.getAllByTestId('image');

  imagesAfterSelecting.forEach((image): void => {
    expect(image).toHaveClass('image-checked');
  });
});
