import React, { useState, useEffect, ReactElement } from 'react';
import Flickity from 'react-flickity-component';
import '../../flickity/flickity.scss';
import 'flickity-fullscreen/fullscreen.css';
import 'flickity-fullscreen';
import { Container, Navbar } from 'react-bootstrap';
import {
  CloudDownloadFill, PencilFill, TrashFill, XCircleFill,
} from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import flickityOptions from '../../flickity/options';
import FlickityInstance from '../../flickity/methods';
import { Photo } from '../images/PhotoObject.type';
import AuthorizedImage from '../images/AuthorizedImage';
import { RootState } from '../../app/store';
import {
  setShowCarousel, setShowMenu, setShowDeleteModal, setShowImageEditor,
} from '../../features/componentsVisibility';
import {
  deleteImage, downloadImage, editImageUrl, fetchImages,
} from '../../utils/images.util';
import ImageEditor from '../editor/ImageEditor';
import { setImages } from '../../features/images';
import DeleteModal from '../modals/DeleteModal';
import Gallery from './Gallery';
import './Carousel.scss';

function Carousel() {
  const [imageEditorSrc, setImageEditorSrc] = useState('');

  const display = useSelector((state: RootState) => state.componentsVisibility.showCarousel);
  const displayClassName = display ? 'block' : 'none';
  const dispatch = useDispatch();

  const toggleMenuAndCarouselDisplay = (val: boolean) => {
    dispatch(setShowCarousel(val));
    dispatch(setShowMenu(!val));
  };

  const carouselCurrent = (): string | false | null => {
    if (FlickityInstance && FlickityInstance.ref) {
      const element: unknown = FlickityInstance.ref.selectedElement;

      type ElementWithAttributeGetter = unknown & { getAttribute: (x: string) => string | null };
      const elementWithAttributeGetter = element as ElementWithAttributeGetter;
      if (elementWithAttributeGetter.getAttribute !== undefined) {
        return elementWithAttributeGetter.getAttribute('data-name');
      }
    }
    return false;
  };

  const downloadPhoto = async (): Promise<boolean> => {
    const photo = carouselCurrent();
    if (photo) {
      return downloadImage(photo);
    }
    return false;
  };

  const editPhoto = async (): Promise<boolean> => {
    const photo = carouselCurrent();
    if (!photo) return false;
    const url = await editImageUrl(photo);
    if (url !== '') {
      setImageEditorSrc(url);
      dispatch(setShowImageEditor(true));
      return true;
    }
    return false;
  };

  const deletePhoto = async (): Promise<boolean> => {
    const photo = carouselCurrent();
    if (!photo) return false;

    dispatch(setShowDeleteModal(false));
    if (FlickityInstance) FlickityInstance.exitFullscreen();

    await deleteImage(photo);
    dispatch(setImages(await fetchImages()));
    return true;
  };

  useEffect(() => {
    FlickityInstance.setFullscreenEventListener(toggleMenuAndCarouselDisplay);
  }, []);

  const showCarousel = (x: number): void => {
    if (FlickityInstance) {
      FlickityInstance.show(x);
    }
  };

  const imagesArray = useSelector((state: RootState) => state.images.list);

  const imagesList = imagesArray.map((x: Photo): ReactElement | null => (
    <div
      data-testid="carousel-photo"
      key={x.imageId}
      data-name={x.name}
      className="carousel-cell"
    >
      <AuthorizedImage className="carousel-cell-image" alt="Gallery image" src={x.path} />
    </div>
  ));

  return (
    <>
      <div>
        <Flickity flickityRef={(c) => { FlickityInstance.ref = c; }} aria-label="Gallery" className="carousel" options={flickityOptions}>
          {imagesList}
        </Flickity>
        <Navbar id="carousel-custom-buttons" className={`d-${displayClassName}`}>
          <Container fluid>
            <button className="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous" onClick={() => FlickityInstance.previous()}>
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" />
              </svg>
            </button>

            <TrashFill className="carousel-button" aria-label="Delete image" onClick={() => dispatch(setShowDeleteModal(true))} />

            <CloudDownloadFill className="carousel-button" aria-label="Download image" onClick={downloadPhoto} />

            <PencilFill className="carousel-button" aria-label="Edit image" onClick={editPhoto} />

            <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next" onClick={() => FlickityInstance.next()}>
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) " />
              </svg>
            </button>

            <XCircleFill className="carousel-button" id="closeFullscren" aria-label="Close image" onClick={() => FlickityInstance.exitFullscreen()} />

          </Container>
        </Navbar>
      </div>

      <ImageEditor src={imageEditorSrc} />
      <DeleteModal deletePhoto={deletePhoto} />
      <Gallery selectFunction={showCarousel} />
    </>
  );
}

export default Carousel;