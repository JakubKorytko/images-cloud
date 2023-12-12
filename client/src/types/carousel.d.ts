import { Photo } from './photoObject';

export type CarouselProps = {
  deleteModal: React.MouseEventHandler<SVGElement>,
  editPhoto: React.MouseEventHandler<SVGElement>,
  download: React.MouseEventHandler<SVGElement>
  images: Photo[],
  buttonsDisplay: Function,
  display: string
};

export type CarouselState = {
};
