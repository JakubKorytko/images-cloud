import { Blob } from "buffer";

export type ProgressiveImageProps = {
    imageId: number,
    name: string,
    click: MouseEventHandler<HTMLImageElement>,
    placeholder: string,
    src: string,
    checkState: boolean,
    imageSize: string
};

export type ProgressiveImageState = {
    loading: boolean,
    currentSrc: string,
    preBlob: string,
    currentName: string,
    loadingImage: string,
    fetching: boolean
};