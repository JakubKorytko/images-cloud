import { Photo } from './photoObject';
import {FlktyObject} from "./flickity";
import Flickity from "react-flickity-component";

export type GalleryRouteState = {
  uploadingPercentage: number,
  innerWidth: number,
  imageEditorSrc: string,
  tui: boolean,
  flkty: FlktyObject | null,
};

export type GalleryRouteProps = {
};
