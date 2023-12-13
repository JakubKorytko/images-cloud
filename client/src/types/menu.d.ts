export type MenuProps = {
  selectAllPhotos: React.MouseEventHandler<HTMLButtonElement>,
  reverseEvent: React.MouseEventHandler<HTMLButtonElement>
  deselectPhotos: React.MouseEventHandler<HTMLButtonElement>,
  logOut: React.MouseEventHandler<HTMLButtonElement>,
  selectionCount: number,
  sortEvent: Function,
  sortBy: string,
  reverse: boolean,
};

export type MenuState = {
};
