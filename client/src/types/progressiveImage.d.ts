export type ProgressiveImageData = {
  id: number,
  name: string,
  src: string,
  placeholder: string,
  size: string,
};

export type ProgressiveImageProps = {
  click: MouseEventHandler<HTMLImageElement>,
  checkState: boolean,
  data: ProgressiveImageData,
};
