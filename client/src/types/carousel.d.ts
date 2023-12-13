import { Photo } from './photoObject';
import Flickity from "react-flickity-component";

export type CarouselProps = {
  editPhoto: React.MouseEventHandler<SVGElement>,
  download: React.MouseEventHandler<SVGElement>
  images: Photo[],
  passFlkty: Function,
};

export type CarouselState = {
};
