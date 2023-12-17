import React, { ReactElement, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Photo from '../images/Photo';
import { Photo as PhotoType } from '../images/PhotoObject.type';
import { GalleryProps } from './Gallery.type';
import { RootState } from '../../app/store';
import { selectImage } from '../../utils/selecting.util';
import { setSelected } from '../../features/images';

function Gallery(props: GalleryProps) {
  const [galleryWidth, setGalleryWidth] = useState(window.innerWidth);

  const selectedImages = useSelector((state: RootState) => state.images.selected);
  const photoChecked = (id: number): boolean => selectedImages.includes(id);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', (): void => {
      setGalleryWidth(window.innerWidth);
    });
  }, []);

  const selectPhoto = (id: number, action: boolean): void => {
    const newSelected = selectImage(id, action, selectedImages);
    dispatch(setSelected(newSelected));
  };

  type PlaceholderSize = {
    width: number,
    height: number,
    original_width: number,
    original_height: number,
  };

  const placeholderSize = (image: PhotoType): PlaceholderSize => {
    const placeholder = {
      width: image.width,
      height: image.height,
      original_width: image.width,
      original_height: image.height,
    };
    while (placeholder.width > 3999) placeholder.width /= 2;
    while (placeholder.height > 3999) placeholder.height /= 2;

    placeholder.width = Math.round(placeholder.width);
    placeholder.height = Math.round(placeholder.height);

    return placeholder;
  };

  const imagesArray = useSelector((state: RootState) => state.images.list);
  const arr: (ReactElement | null)[][] = [[], [], [], []];
  const sizes = [0, 0, 0, 0];

  const { selectFunction } = props;

  imagesArray.forEach((x: PhotoType, i: number): void => {
    const placeholder = placeholderSize(x);
    const imageSize = `${placeholder.width}x${placeholder.height}?text=${placeholder.original_width}%20x%20${placeholder.original_height}`;

    let ind = sizes.indexOf(Math.min(...sizes));
    if (galleryWidth < 992) ind = 0;

    arr[ind].push(
      <Photo
        key={x.imageId}
        checkedState={photoChecked(x.imageId)}
        selectedImages={selectedImages}
        imageSize={imageSize}
        name={x.name}
        thumbPath={(x.thumb_path ? x.thumb_path : '')}
        progressiveThumbPath={(x.progressive_path ? x.progressive_path : '')}
        img={x.path}
        carrouselId={i}
        id={x.imageId}
        selectImageFunction={selectPhoto}
        select={selectFunction}
      />,
    );
    sizes[ind] += x.ratioY;
  });

  const cols = [];

  for (let i = 0; i < 4; i += 1) {
    if (arr[i].length !== 0) cols.push(<Col key={i} lg="3" className="px-1">{arr[i]}</Col>);
  }

  return (
    <Container fluid>
      <Row className="my-2" id="images">
        {cols}
      </Row>
    </Container>
  );
}

export default Gallery;
