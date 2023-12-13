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
  selectAll, selectImage,
} from '../utils/GalleryRoute/selecting.util';
import Token from '../utils/token.util';
import UploadMimeType from '../components/modals/UploadMimeType';
import GalleryRouteComponentState from './GalleryRoutes.comp_data';
import { useDispatch, connect, useSelector } from "react-redux";
import { setShowProgressModal, setShowImageEditor, setShowDeleteModal } from "../features/componentsVisibility";
import { setImages, sortImages, setSelected } from "../features/images";
import {Photo} from "../types/photoObject";

const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

type MappedProps = {
    setShowProgressModal: (val: boolean) => void;
    setShowImageEditor: (val: boolean) => void;
    setShowDeleteModal: (val: boolean) => void;
    setImages: (val: Photo[]) => void;
    sortImages: () => void;
    setSelected: (val: number[]) => void;
    selectedImages: number[];
    images: Photo[];
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
    this.props.setImages(images);
  }

  // --- gallery functions - included in /src/utils/GalleryRoute/images.util.ts ---

  downloadPhoto = async (): Promise<boolean> => downloadImage(this);

  sendImage = async (file: File): Promise<boolean> => {
    await sendImage(this, file);
    const images = await fetchImages();
    this.props.setImages(images);
    return true;
  }

  deletePhotos = async (): Promise<void> => {
    const selected = this.props.selectedImages;
    const { images } = this.props;
    this.props.setSelected([]);

    await deleteImages(this, images, selected);

    this.props.setImages(await fetchImages());
    this.props.setShowDeleteModal(false);
  }

  deletePhoto = async (): Promise<boolean> => {
    const photo = this.carouselCurrent();
    if (!photo) return false;

    this.props.setShowDeleteModal(false);
    if (this.state.flkty) this.state.flkty.exitFullscreen();

    await deleteImage(this, photo);
    this.props.setImages(await fetchImages());
    return true;
  };

  editPhoto = async (): Promise<boolean> => {
    const url = await editImage(this);
    if (url != '') {
      this.setState({ imageEditorSrc: url });
      this.props.setShowImageEditor(true);
      return true;
    }
    return false;
  };

  // ---

  // --- selecting images - included in /src/utils/GalleryRoute/selecting.util.ts ---

  selectAll = (): void => {
    const imgs= this.props.images;
    const selected = this.props.selectedImages;
    const newSelectedArray = selectAll(this, imgs, selected);
    this.props.setSelected(newSelectedArray);
  }

  selectImage = (id: number, action: boolean): void => {
    const selected = this.props.selectedImages;
    const newSelected = selectImage(this, id, action, selected);
    this.props.setSelected(newSelected);
  }

  // ---

  showCarousel = (x: number): void => {
    if (this.state.flkty) {
      this.state.flkty.show(x);
    }
  };

  setProgress = async (x: number): Promise<void> => {
    await this.setState({ uploadingPercentage: x });
    if (x === 100) {
      this.props.setImages(await fetchImages());
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
    const {innerWidth: sinnerWidth, uploadingPercentage, imageEditorSrc} = this.state;

    return (
      <div className="app">

        <DeleteModal deletePhotos={this.deletePhotos} deletePhoto={this.deletePhoto} />

        <Menu logOut={this.logOut} selectAllPhotos={this.selectAll} />

        <Gallery innerWidth={sinnerWidth} selectImageFunction={this.selectImage} selectFunction={this.showCarousel} />

        <Carousel editPhoto={this.editPhoto} download={this.downloadPhoto} passFlkty={this.getFlkty} />

        <ImageEditor src={imageEditorSrc} />

        <Upload imageUpload={this.sendImage} />

        <Progress value={uploadingPercentage} reset={this.resetProgress} />

        <UploadMimeType />

      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
    return {
        images: state.images.list,
        selectedImages: state.images.selected,
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        setShowProgressModal: (val: boolean) => dispatch(setShowProgressModal(val)),
        setShowImageEditor: (val: boolean) => dispatch(setShowImageEditor(val)),
        setShowDeleteModal: (val: boolean) => dispatch(setShowDeleteModal(val)),
        setImages: (val: Photo[]) => dispatch(setImages(val)),
        sortImages: () => dispatch(sortImages()),
        setSelected: (val: number[]) => dispatch(setSelected(val)),
    };
}

export { GalleryRoute as GalleryRouteComponent };
export default connect(mapStateToProps, mapDispatchToProps)(GalleryRoute);
