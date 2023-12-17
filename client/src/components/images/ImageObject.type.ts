export type Image = {
  imageId: number,
  name: string,
  size: number,
  width: number,
  height: number,
  date: number,
  ratioY: number,

  path: string,
  thumb_path?: string,
  progressive_path?: string
};
