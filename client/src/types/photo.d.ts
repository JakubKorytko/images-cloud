export type PhotoProps = { 
    carrouselId: number,
    checkedState: boolean,
    img: string, 
    id: number,
    select: Function,
    name: string,
    selectImageFunction: Function,
    selectedImages: number[],
    thumbPath: string,
    progressiveThumbPath: string,
    imageSize: string
};

export type PhotoState = {
    checked: boolean,
    checkMarkDisplay: boolean
};