import React, { useState } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import ProgressiveImage from './ProgressiveImage';
import { PhotoProps } from './Photo.type';
import { RootState } from '../../app/store';
import './Photo.scss';

function Photo(props: PhotoProps) {
  const [checkMarkDisplay, displayCheckMark] = useState(false);

  const selectedImages = useSelector((state: RootState) => state.images.selected);

  const {
    id, imageSize, progressiveThumbPath, thumbPath,
  } = props;

  const imageData = {
    id,
    name: `User photo ${id}`,
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
    'selection photo-icon',
    `d-${iconDisplay}`,
  ].join(' ');

  return (
    <div className={`photo${checked}`} data-testid="photo" onFocus={displayCM} onMouseOver={displayCM} onBlur={hideCM} onMouseOut={hideCM}>
      <CheckCircleFill aria-label="Select image" data-testid="imageSelectIcon" className={circleClassNames} onClick={selectImage} />
      <ProgressiveImage data={imageData} checkState={checkedState} click={openImage} />
    </div>
  );
}

export default Photo;
