import { Photo } from './photoObject';
import {FlktyObject} from "./flickity";
import Flickity from "react-flickity-component";

export type GalleryRouteState = {
  uploadingPercentage: number,
  innerWidth: number,
  selectedImages: number[],
  imageEditorSrc: string,
  tui: boolean,
  sortBy: string,
  images: Photo[],
  reverse: boolean,
  uploadModalShow: boolean,
  flkty: FlktyObject | null,
};

export type GalleryRouteProps = {
};
