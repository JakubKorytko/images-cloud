import React, { Component } from 'react';
import Gallery from '../components/Gallery';
import Carousel from '../components/Carousel';
import '../scss/App.scss';
import ImageEditor from '../components/tools/ImageEditor';
import Menu from '../components/Menu';
import DeleteModal from '../components/modals/DeleteModal';
import Upload from '../components/modals/upload/Upload';
import Progress from '../components/modals/upload/Progress';
import { authTest } from '../utils/connectionTest.util';
import {
  deleteImage, deleteImages, downloadImage, editImage, fetchImages, sendImage,
} from '../utils/GalleryRoute/images.util';
import { GalleryRouteProps, GalleryRouteState } from '../types/galleryRoute';
import { FlktyObject } from '../types/flickity';
import {
  refreshGallery, resortGallery, reverseEvent, sortEvent,
} from '../utils/GalleryRoute/sorting.util';
import {
  deselectAllphotos, photoSelected, selectAll, selectImage,
} from '../utils/GalleryRoute/selecting.util';
import Token from '../utils/token.util';
import UploadMimeType from '../components/modals/UploadMimeType';
import GalleryRouteComponentState from './GalleryRoutes.comp_data';
import Flickity from "react-flickity-component";

const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

class GalleryRoute extends Component<GalleryRouteProps, GalleryRouteState> {

  constructor(props: GalleryRouteProps) {
    super(props);

    this.state = GalleryRouteComponentState;
  }

  async componentDidMount() {
    setInterval((): void => {
      authTest().then((res): void => {
        if (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'UNAUTH') window.location.href = res.redirect;
      });
    }, connection_test_interval);
    window.addEventListener('resize', (): void => { this.setState({ innerWidth: window.innerWidth }); });
    const images = await fetchImages();
    this.setState({ images }, () => {
      this.resortGallery();
    });
  }

  // --- simple state setters & togglers ---

  exitFlickityFullscreen = (): void => { if (this.state.flkty) this.state.flkty.exitFullscreen(); };

  toggleUpload = (): void => { this.setState({ showUpload: !this.state.showUpload }); };

  toggleProgress = (): void => { this.setState({ showProgress: !this.state.showProgress }); };

  toggleDisplay = (): void => { this.setState({ imageEditorDisplay: false }); };

  deleteModal = (): void => { this.setState({ deleteModalDisplay: true }); };

  hideDeleteModal = (): void => { this.setState({ deleteModalDisplay: false }); };

  // ---

  // --- gallery functions - included in /src/utils/GalleryRoute/images.util.ts ---

  downloadPhoto = async (): Promise<boolean> => downloadImage(this);

  sendImage = async (file: File): Promise<boolean> => sendImage(this, file);

  deletePhotos = async (): Promise<void> => deleteImages(this);

  deletePhoto = async (): Promise<boolean> => deleteImage(this);

  editPhoto = async (): Promise<boolean> => editImage(this);

  // ---

  // --- sorting && refreshing gallery - included in /src/utils/GalleryRoute/sorting.util.ts ---

  resortGallery = (): void => resortGallery(this);

  refreshGallery = async (): Promise<void> => refreshGallery(this);

  sortEvent = async (x: string): Promise<void> => sortEvent(this, x);

  reverseEvent = async (): Promise<void> => reverseEvent(this);

  // ---

  // --- selecting images - included in /src/utils/GalleryRoute/selecting.util.ts ---

  selectAll = (): void => selectAll(this);

  selectImage = (id: number, action: boolean): void => selectImage(this, id, action);

  photoSelected = (id: number): boolean => photoSelected(this, id);

  deselectAllphotos = (): void => deselectAllphotos(this);

  // ---

  changeButtonsVisibility = (x: boolean): void => {
    this.setState({ buttonsDisplay: x ? 'block' : 'none' });
    this.setState({ navbarDisplay: x ? 'none' : 'block' });
  };

  showCarousel = (x: number): void => {
    if (this.state.flkty) {
      this.state.flkty.show(x);
    }
  };

  setProgress = async (x: number): Promise<void> => {
    await this.setState({ uploadingPercentage: x });
    if (x === 100) {
      this.refreshGallery();
      setTimeout((): void => {
        this.toggleProgress();
      }, 300);
    }
  };

  carouselCurrent = (): string | false | null => {
    console.log(this.state.carouselCurrent);
    if (this.state.flkty && this.state.flkty.ref) {
      const element: unknown = this.state.flkty.ref.selectedElement;

      const elementWithAttributeGetter = element as unknown & { getAttribute: (x: string) => string | null };
      if (elementWithAttributeGetter.getAttribute !== undefined) {
        return elementWithAttributeGetter.getAttribute('name');
      }
    }
    return false;
  };

  resetProgress = (): void => {
    this.setState({ fileSending: false });
    this.setState({ uploadingPercentage: 0 });
  };

  getFlkty = (flkty: FlktyObject): void => {
    if (flkty) {
      this.setState({ flkty });
    }
  }

  logOut = (): void => {
    Token.remove();
    window.location.href = '/login';
  };

  render() {
    const {
      imageEditorDisplay, innerWidth: sinnerWidth, showUpload,
      showProgress, uploadingPercentage, imageEditorSrc,
      buttonsDisplay, navbarDisplay, images, selectedImages,
      reverse, sortBy, deleteModalDisplay,
    } = this.state;

    const props = {
      DeleteModal: {
        deletePhotos: this.deletePhotos,
        multiDelete: selectedImages.length,
        deletePhoto: this.deletePhoto,
        hideDeleteModal: this.hideDeleteModal,
        deleteModalDisplay,
      },
      Menu: {
        logOut: this.logOut,
        uploadModal: this.toggleUpload,
        deleteModal: this.deleteModal,
        selectAllPhotos: this.selectAll,
        selectionCount: selectedImages.length,
        deselectPhotos: this.deselectAllphotos,
        reverse,
        reverseEvent: this.reverseEvent,
        sortEvent: this.sortEvent,
        sortBy,
        navbarDisplay,
      },
      Gallery: {
        innerWidth: sinnerWidth,
        photoSelected: this.photoSelected,
        selectedImages,
        images,
        selectImageFunction: this.selectImage,
        selectFunction: this.showCarousel,
      },
      Carousel: {
        display: buttonsDisplay,
        deleteModal: this.deleteModal,
        editPhoto: this.editPhoto,
        download: this.downloadPhoto,
        images,
        buttonsDisplay: this.changeButtonsVisibility,
        passFlkty: this.getFlkty,
      },
      ImageEditor: {
        toggleDisplay: this.toggleDisplay,
        display: imageEditorDisplay,
        src: imageEditorSrc,
      },
      Upload: {
        toggle: this.toggleUpload,
        show: showUpload,
        imageUpload: this.sendImage,
      },
      Progress: {
        reset: this.resetProgress,
        toggle: this.toggleProgress,
        percentage: uploadingPercentage,
        show: showProgress,
      },
    };

    return (
      <div className="app">

        <DeleteModal {...props.DeleteModal} />

        <Menu {...props.Menu} />

        <Gallery {...props.Gallery} />

        <Carousel {...props.Carousel} />

        <ImageEditor {...props.ImageEditor} />

        <Upload {...props.Upload} />

        <Progress {...props.Progress} />

        <UploadMimeType />

      </div>
    );
  }
}

export default GalleryRoute;
