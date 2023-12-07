export type MenuProps = {
    uploadModal: React.MouseEventHandler<HTMLButtonElement>,
    deleteModal: React.MouseEventHandler<HTMLButtonElement>,
    selectAllPhotos: React.MouseEventHandler<HTMLButtonElement>,
    reverseEvent: React.MouseEventHandler<HTMLButtonElement>
    deselectPhotos: React.MouseEventHandler<HTMLButtonElement>,
    logOut: React.MouseEventHandler<HTMLButtonElement>,
    selectionCount: number,
    sortEvent: Function,
    sortBy: string,
    navbarDisplay: string,
    reverse: boolean,
};

export type MenuState = {
    sortBy: string,
    buttonsDisplay: string,
    images: [],
    reverse: boolean, 
    navbarDisplay: string
};
