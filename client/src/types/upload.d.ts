export type UploadProps = {
  toggle: () => void,
  imageUpload: Function,
  show: boolean
};

export type UploadState = {
  fileAttached: boolean,
  file: File | undefined
};
