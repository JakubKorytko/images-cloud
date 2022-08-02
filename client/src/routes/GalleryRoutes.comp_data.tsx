import GalleryRoute from "./GalleryRoute";

export const GalleryRouteComponentState = {
    imageEditorDisplay: false,
    innerWidth: window.innerWidth,
    showUpload: false,
    showProgress: false,
    uploadingPercentage: 0,
    fileSending: false,
    imageEditorSrc: "",
    buttonsDisplay: "none",
    navbarDisplay: "block",
    tui: true,
    images: [],
    selectedImages: [],
    reverse: true,
    sortBy: "Date",
    deleteModalDisplay: false,
    uploadModalShow: false
};

export function GalleryRouteComponentsProps(app: GalleryRoute) {
    return {
        DeleteModal: {
            deletePhotos: app.deletePhotos,
            multiDelete: app.state.selectedImages.length,
            deletePhoto: app.deletePhoto,
            hideDeleteModal: app.hideDeleteModal,
            deleteModalDisplay: app.state.deleteModalDisplay
        },
        Menu: {
            logOut: app.logOut,
            uploadModal: app.toggleUpload,
            deleteModal: app.deleteModal,
            selectAllPhotos: app.selectAll,
            selectionCount: app.state.selectedImages.length,
            deselectPhotos: app.deselectAllphotos,
            reverse: app.state.reverse,
            reverseEvent: app.reverseEvent,
            sortEvent: app.sortEvent,
            sortBy: app.state.sortBy,
            navbarDisplay: app.state.navbarDisplay
        },
        Gallery: {
            innerWidth: app.state.innerWidth,
            photoSelected: app.photoSelected,
            selectedImages: app.state.selectedImages,
            images: app.state.images,
            selectImageFunction: app.selectImage,
            selectFunction: app.showCarousel
        },
        Carousel: {
            display: app.state.buttonsDisplay,
            deleteModal: app.deleteModal,
            editPhoto: app.editPhoto,
            download: app.downloadPhoto,
            images: app.state.images,
            ref: app.carousel,
            buttonsDisplay: app.changeButtonsVisibility
        },
        ImageEditor: {
            toggleDisplay: app.toggleDisplay,
            display: app.state.imageEditorDisplay,
            src: app.state.imageEditorSrc
        },
        Upload: {
            toggle: app.toggleUpload,
            show: app.state.showUpload,
            imageUpload: app.sendImage
        },
        Progress: {
            reset: app.resetProgress,
            toggle: app.toggleProgress,
            percentage: app.state.uploadingPercentage,
            show: app.state.showProgress
        },
        UploadMimeType: {
            show: app.state.uploadModalShow,
            closeHandler: app.uploadModalClose
        }
    }
}