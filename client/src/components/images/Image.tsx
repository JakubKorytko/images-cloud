import React, { useState } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import ProgressiveImage from './ProgressiveImage';
import { ImageProps } from './Image.type';
import { RootState } from '../../app/store';
import './Image.scss';
import { ProgressiveImageData } from './ProgressiveImage.type';

function Image(props: ImageProps) {
  const [checkMarkDisplay, displayCheckMark] = useState(false);

  const selectedImages = useSelector((state: RootState) => state.images.selected);

  const {
    id, imageSize, progressiveThumbPath, thumbPath,
  } = props;

  const imageData: ProgressiveImageData = {
    id,
    name: `User image ${id}`,
    size: imageSize,
    placeholder: progressiveThumbPath,
    src: thumbPath,
  };

  const {
    select, selectImageFunction, carrouselId, checkedState,
  } = props;

  const selectImage = () => selectImageFunction(id, !checkedState);

  const openImage = () => {
    if (selectedImages.length === 0) select(carrouselId);
    else selectImage();
  };

  const checked = (checkedState) ? '-checked' : '';
  const iconDisplay = (checkMarkDisplay || checkedState) ? 'block' : 'none';

  const displayCM = () => displayCheckMark(true);
  const hideCM = () => displayCheckMark(false);

  const circleClassNames = [
    `selection image-icon${checked}`,
    `d-${iconDisplay}`,
  ].join(' ');

  return (
    <div className={`image${checked}`} data-testid="image" onFocus={displayCM} onMouseOver={displayCM} onBlur={hideCM} onMouseOut={hideCM}>
      <CheckCircleFill aria-label="Select image" data-testid="imageSelectIcon" className={circleClassNames} onClick={selectImage} />
      <ProgressiveImage data={imageData} checkState={checkedState} click={openImage} />
    </div>
  );
}

export default Image;
