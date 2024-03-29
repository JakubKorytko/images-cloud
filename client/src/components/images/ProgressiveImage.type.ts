import { MouseEventHandler } from 'react';

export type ProgressiveImageData = {
  id: number,
  name: string,
  src: string,
  placeholder: string,
  size: string,
};

export type ProgressiveImageProps = {
  click: MouseEventHandler<HTMLInputElement>,
  checkState: boolean,
  data: ProgressiveImageData,
};
