export type ImageEditorProps = {
  src: string,
};

export type SavedImageData = {
  name: string;
  extension: string;
  mimeType: string;
  fullName?: string;
  height?: number;
  width?: number;
  imageBase64?: string;
  imageCanvas?: HTMLCanvasElement;
  quality?: number;
  cloudImageUrl?: string;
};
