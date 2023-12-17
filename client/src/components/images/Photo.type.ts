export type PhotoProps = {
  carrouselId: number,
  checkedState: boolean,
  img: string,
  id: number,
  select: (id: number) => void,
  name: string,
  selectImageFunction: (id: number, action: boolean) => void,
  selectedImages: number[],
  thumbPath: string,
  progressiveThumbPath: string,
  imageSize: string
};
