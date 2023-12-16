import {Photo} from "../components/images/PhotoObject.type";

export function selectAllImages(imgs: Photo[], imgsSelected: number[]): number[] {
  const newImgsSelected: number[] = [...imgsSelected];
  for (let i = 0; i < imgs.length; i++) {
    const index: number = newImgsSelected.indexOf(i);
    if (index === -1) {
      newImgsSelected.push(i);
    }
  }
  return newImgsSelected;
}

export function selectImage(id: number, action: boolean, selectedImages: number[]): number[] {
  const arr = [...selectedImages];
  if (action) {
    arr.push(id);
  } else {
    const index: number = arr.indexOf(id);
    if (index !== -1) {
      arr.splice(index, 1);
    }
  }
  return arr;
}
