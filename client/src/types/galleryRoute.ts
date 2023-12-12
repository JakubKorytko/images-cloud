import { Photo } from './photoObject';

export type GalleryRouteState = {
  showProgress: boolean,
  uploadingPercentage: number,
  fileSending: boolean,
  showUpload: boolean,
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
  uploadModalShow: boolean
};

export type GalleryRouteProps = {
};
