import { Photo } from './photoObject';
import Flickity from "react-flickity-component";

export type CarouselProps = {
  deleteModal: React.MouseEventHandler<SVGElement>,
  editPhoto: React.MouseEventHandler<SVGElement>,
  download: React.MouseEventHandler<SVGElement>
  images: Photo[],
  buttonsDisplay: Function,
  display: string,
  passFlkty: Function,
};

export type CarouselState = {
};
