import { useState } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import ProgressiveImage from './ProgressiveImage';
import { PhotoProps } from './Photo.type';
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./Photo.scss"

const Photo = (props: PhotoProps) => {
  const [checkMarkDisplay, displayCheckMark] = useState(false);

  const selectedImages = useSelector((state: RootState) => state.images.selected);

  const imageData = {
    id: props.id,
    name: `User photo ${props.id}`,
    size: props.imageSize,
    placeholder: props.progressiveThumbPath,
    src: props.thumbPath,
  };

  const selectImage = () => props.selectImageFunction(props.id, !props.checkedState);

  const openImage = () => {
    if (selectedImages.length === 0) props.select(props.carrouselId);
    else selectImage();
  };

  const checked = (props.checkedState) ? '-checked' : '';
  const iconDisplay = (checkMarkDisplay || props.checkedState) ? 'block' : 'none';

  const circleAttributes = {
    'data-testid': 'imageSelectIcon',
    'aria-label': 'Select image',
    className: [`selection photo-icon${checked}`, `d-${iconDisplay}`].join(' '),
  };

  const divAttributes = {
    'data-testid': 'photo',
    className: `photo${checked}`,
  };

  return (
    <div {...divAttributes} onMouseOver={() => displayCheckMark(true)} onMouseOut={() => displayCheckMark(false)}>
      <CheckCircleFill {...circleAttributes} onClick={selectImage} />
      <ProgressiveImage data={imageData} checkState={props.checkedState} click={openImage} />
    </div>
  );
}

export default Photo;
