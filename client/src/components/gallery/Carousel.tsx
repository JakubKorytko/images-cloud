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
import GenerateFlickity from '../../flickity/methods';
import { Image } from '../images/ImageObject.type';
import AuthorizedImage from '../images/AuthorizedImage';
import { RootState } from '../../app/store';
import {
  setShowCarousel, setShowMenu, setShowDeleteModal, setShowImageEditor,
} from '../../features/componentsVisibility';
import FetchImageUtil from '../../utils/fetchImage.util';
import ImageEditor from '../editor/ImageEditor';
import { setImages } from '../../features/images';
import DeleteModal from '../modals/DeleteModal';
import Gallery from './Gallery';
import { FlickityObject } from '../../flickity/flickity.type';
import styles from './Carousel.module.scss';

function Carousel() {
  const [imageEditorSrc, setImageEditorSrc] = useState('');

  const [FlickityInstance, setFlickityInstance] = useState<FlickityObject | null>(null);
  const display = useSelector((state: RootState) => state.componentsVisibility.showCarousel);
  const dispatch = useDispatch();

  const toggleMenuAndCarouselDisplay = (val: boolean) => {
    dispatch(setShowCarousel(val));
    dispatch(setShowMenu(!val));
  };

  const downloadImage = async (): Promise<boolean> => {
    if (!FlickityInstance) return false;
    const image = FlickityInstance.currentName();
    if (image) {
      return FetchImageUtil.saveToDisk(image);
    }
    return false;
  };

  const editImage = async (): Promise<boolean> => {
    if (!FlickityInstance) return false;
    const image = FlickityInstance.currentName();
    if (!image) return false;
    const url = await FetchImageUtil.getEditUrl(image);
    if (url !== '') {
      setImageEditorSrc(url);
      dispatch(setShowImageEditor(true));
      return true;
    }
    return false;
  };

  const deleteImage = async (): Promise<boolean> => {
    if (!FlickityInstance) return false;
    const image = FlickityInstance.currentName();
    if (!image) return false;

    dispatch(setShowDeleteModal(false));
    if (FlickityInstance) FlickityInstance.exitFullscreen();

    await FetchImageUtil.deleteOne(image);
    dispatch(setImages(await FetchImageUtil.getList()));
    return true;
  };

  useEffect(() => {
    if (FlickityInstance) {
      FlickityInstance.setFullscreenEventListener(toggleMenuAndCarouselDisplay);
    }
  }, [FlickityInstance]);

  const showCarousel = (x: number): void => {
    if (FlickityInstance) {
      FlickityInstance.show(x);
    }
  };

  const imagesArray = useSelector((state: RootState) => state.images.list);

  const imagesList = imagesArray.map((x: Image): ReactElement | null => (
    <div
      data-testid="carousel-image"
      key={x.imageId}
      data-name={x.name}
      className={styles['carousel-cell']}
    >
      <AuthorizedImage className={styles['carousel-cell-image']} alt="Gallery image" src={x.path} />
    </div>
  ));

  return (
    <>
      <div>
        <Flickity flickityRef={(c) => { setFlickityInstance(GenerateFlickity(c)); }} aria-label="Gallery" className={styles.carousel} options={flickityOptions}>
          {imagesList}
        </Flickity>
        {display ? (
          <Navbar className={styles['carousel-custom-buttons']}>
            <Container fluid>
              <button className={`${styles['flickity-button']} flickity-prev-next-button previous`} type="button" aria-label="Previous" onClick={() => FlickityInstance?.previous()}>
                <svg className="flickity-button-icon" viewBox="0 0 100 100">
                  <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" />
                </svg>
              </button>

              <TrashFill className={styles['carousel-button']} aria-label="Delete image" onClick={() => dispatch(setShowDeleteModal(true))} />

              <CloudDownloadFill className={styles['carousel-button']} aria-label="Download image" onClick={downloadImage} />

              <PencilFill className={styles['carousel-button']} aria-label="Edit image" onClick={editImage} />

              <button className={`${styles['flickity-button']} flickity-prev-next-button next`} type="button" aria-label="Next" onClick={() => FlickityInstance?.next()}>
                <svg className="flickity-button-icon" viewBox="0 0 100 100">
                  <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) " />
                </svg>
              </button>

              <XCircleFill className={styles['carousel-button']} id="closeFullscren" aria-label="Close image" onClick={() => FlickityInstance?.exitFullscreen()} />

            </Container>
          </Navbar>
        ) : null}
      </div>

      <ImageEditor src={imageEditorSrc} />
      <DeleteModal deleteImage={deleteImage} />
      <Gallery selectFunction={showCarousel} />
    </>
  );
}

export default Carousel;
