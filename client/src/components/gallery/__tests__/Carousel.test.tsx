import React from 'react';
import { render } from '@testing-library/react';
import { Photo } from '../../images/PhotoObject.type';

import Carousel from '../Carousel';

const testImages = require('../__tests_helpers__/generatePhotos');

const numberOfImages = 6;

const images: Photo[] = testImages(numberOfImages);

const empty = (): false => false;

test('Carousel buttons displays properly', () => {
  const { getByLabelText } = render(
    <Carousel
      deleteModal={empty}
      editPhoto={empty}
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

test('Carousel should render photos components based on array', () => {
  const { getAllByTestId } = render(
    <Carousel
      deleteModal={empty}
      editPhoto={empty}
      download={empty}
      images={images}
      buttonsDisplay={empty}
      display="block"
    />,
  );

  expect(getAllByTestId('carousel-photo')).toHaveLength(numberOfImages);
});