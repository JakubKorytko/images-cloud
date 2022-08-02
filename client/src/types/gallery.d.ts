import { Photo } from '../types/photoObject';

export type GalleryProps = {
    innerWidth: number,
    photoSelected: Function,
    images: Photo[], 
    selectFunction: Function, 
    selectImageFunction:Function,
    selectedImages: number[] 
}

export type GalleryState = {
};