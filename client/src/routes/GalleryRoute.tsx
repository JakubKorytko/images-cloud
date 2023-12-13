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
import { useDispatch, connect } from "react-redux";
import { setShowProgressModal, setShowImageEditor, setShowDeleteModal } from "../features/componentsVisibility";

const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

type MappedProps = {
    setShowProgressModal: (val: boolean) => void;
    setShowImageEditor: (val: boolean) => void;
    setShowDeleteModal: (val: boolean) => void;
} & GalleryRouteProps;

class GalleryRoute extends Component<MappedProps, GalleryRouteState> {

  constructor(props: MappedProps) {
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

  // ---

  // --- gallery functions - included in /src/utils/GalleryRoute/images.util.ts ---

  downloadPhoto = async (): Promise<boolean> => downloadImage(this);

  sendImage = async (file: File): Promise<boolean> => sendImage(this, file);

  deletePhotos = async (): Promise<void> => {
    await deleteImages(this);
    this.resortGallery();
    this.props.setShowDeleteModal(false);
  }

  deletePhoto = async (): Promise<boolean> => {
    const photo = this.carouselCurrent();
    if (!photo) return false;

    this.props.setShowDeleteModal(false);
    this.exitFlickityFullscreen();

    await deleteImage(this, photo);
    return true;
  };

  editPhoto = async (): Promise<boolean> => {
    const url = await editImage(this);
    console.log(url);
    if (url != '') {
      this.setState({ imageEditorSrc: url });
      this.props.setShowImageEditor(true);
      return true;
    }
    return false;
  };

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
        this.props.setShowProgressModal(false);
      }, 300);
    }
  };

  carouselCurrent = (): string | false | null => {
    if (this.state.flkty && this.state.flkty.ref) {
      const element: unknown = this.state.flkty.ref.selectedElement;

      const elementWithAttributeGetter = element as unknown & { getAttribute: (x: string) => string | null };
      if (elementWithAttributeGetter.getAttribute !== undefined) {
        return elementWithAttributeGetter.getAttribute('name');
      }
    }
    return false;
  };

  resetProgress = (): void => this.setState({ uploadingPercentage: 0 });

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
      innerWidth: sinnerWidth,
      uploadingPercentage, imageEditorSrc, images, selectedImages,
      reverse, sortBy
    } = this.state;

    const props = {
      DeleteModal: {
        deletePhotos: this.deletePhotos,
        multiDelete: selectedImages.length,
        deletePhoto: this.deletePhoto,
      },
      Menu: {
        logOut: this.logOut,
        selectAllPhotos: this.selectAll,
        selectionCount: selectedImages.length,
        deselectPhotos: this.deselectAllphotos,
        reverse,
        reverseEvent: this.reverseEvent,
        sortEvent: this.sortEvent,
        sortBy,
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
        editPhoto: this.editPhoto,
        download: this.downloadPhoto,
        images,
        passFlkty: this.getFlkty,
      },
    };

    return (
      <div className="app">

        <DeleteModal {...props.DeleteModal} />

        <Menu {...props.Menu} />

        <Gallery {...props.Gallery} />

        <Carousel {...props.Carousel} />

        <ImageEditor src={imageEditorSrc} />

        <Upload imageUpload={this.sendImage} />

        <Progress value={uploadingPercentage} reset={this.resetProgress} />

        <UploadMimeType />

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setShowProgressModal: (val: boolean) => dispatch(setShowProgressModal(val)),
        setShowImageEditor: (val: boolean) => dispatch(setShowImageEditor(val)),
        setShowDeleteModal: (val: boolean) => dispatch(setShowDeleteModal(val)),
    };
}

export { GalleryRoute as GalleryRouteComponent };
export default connect(null, mapDispatchToProps)(GalleryRoute);
