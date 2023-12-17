import { Image } from '../components/images/ImageObject.type';

namespace SelectImageUtil {

  export function selectAll(images: Image[], imagesSelected: number[]): number[] {
    const newImagesSelected: number[] = [...imagesSelected];
    for (let i = 0; i < images.length; i += 1) {
      const index: number = newImagesSelected.indexOf(i);
      if (index === -1) {
        newImagesSelected.push(i);
      }
    }
    return newImagesSelected;
  }

  export function selectOne(id: number, action: boolean, selectedImages: number[]): number[] {
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

}

export default SelectImageUtil;
