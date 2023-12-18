import { render } from '@testing-library/react';
import React from 'react';

import Carousel from 'components/gallery/Carousel';
import testImages from 'components/gallery/__tests_helpers__/generateImages';

import type { Image } from 'components/images/ImageObject.type';

const numberOfImages = 6;

const images: Image[] = testImages(numberOfImages);

const empty = (): false => false;

test('Carousel buttons displays properly', () => {
  const { getByLabelText } = render(
    <Carousel
      deleteModal={empty}
      editImage={empty}
      download={empty}
      images={images}
      buttonsDisplay={empty}
      display="block"
    />,
  );

  const labels = ['Download image', 'Delete image', 'Edit image', 'Next', 'Previous', 'Close image'];

  labels.forEach((labelText): void => {
    expect(getByLabelText(labelText)).toBeInTheDocument();
  });

  // console.log(getByLabelText("Next"))
});

test('Carousel should render images components based on array', () => {
  const { getAllByTestId } = render(
    <Carousel
      deleteModal={empty}
      editImage={empty}
      download={empty}
      images={images}
      buttonsDisplay={empty}
      display="block"
    />,
  );

  expect(getAllByTestId('carousel-image')).toHaveLength(numberOfImages);
});
