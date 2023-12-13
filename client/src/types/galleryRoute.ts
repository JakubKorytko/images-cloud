import { Photo } from './photoObject';
import {FlktyObject} from "./flickity";
import Flickity from "react-flickity-component";

export type GalleryRouteState = {
  uploadingPercentage: number,
  innerWidth: number,
  selectedImages: number[],
  deleteModalDisplay: boolean,
  imageEditorSrc: string,
  imageEditorDisplay: boolean,
  tui: boolean,
  sortBy: string,
  buttonsDisplay: string,
  images: Photo[],
  reverse: boolean,
  navbarDisplay: string,
  uploadModalShow: boolean,
  flkty: FlktyObject | null,
};

export type GalleryRouteProps = {
};
