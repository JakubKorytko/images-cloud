import React, {useState, useRef, useEffect} from 'react';
import Flickity from 'react-flickity-component';
import '../scss/flickity.scss';
import 'flickity-fullscreen/fullscreen.css';
import 'flickity-fullscreen';
import { Container, Navbar } from 'react-bootstrap';
import {
  CloudDownloadFill, PencilFill, TrashFill, XCircleFill,
} from 'react-bootstrap-icons';
import flickityOptions from '../flickity/options';
import flkty from '../flickity/methods'
import { Photo } from '../types/photoObject';
import { CarouselProps } from '../types/carousel';
import AuthorizedImage from './images/AuthorizedImage';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setShowCarousel, setShowMenu, setShowDeleteModal } from "../features/componentsVisibility";

const Carousel = (props: CarouselProps) => {

  const display = useSelector((state: RootState) => state.componentsVisibility.showCarousel);
  const displayClassName = display ? 'block' : 'none';
  const dispatch = useDispatch();

  const toggleMenuAndCarouselDisplay = (val: boolean) => {
    dispatch(setShowCarousel(val));
    dispatch(setShowMenu(!val));
  }

  useEffect(() => {flkty.setFullscreenEventListener(toggleMenuAndCarouselDisplay)}, [props]);

  useEffect(() => {
    props.passFlkty(flkty);
  }, []);

    const imagesArray = props.images;

    const imagesList = imagesArray.map((x: Photo, index: number): JSX.Element => {
      const customProps = { name: x.name };
      return <div data-testid="carousel-photo" key={index} {...customProps} className="carousel-cell"><AuthorizedImage className="carousel-cell-image" alt="Gallery image" src={x.path} /></div>;
    });

    return (
      <div>
        <Flickity flickityRef={(c) => flkty.ref = c} aria-label="Gallery" className="carousel" options={flickityOptions}>
          {imagesList}
        </Flickity>
        <Navbar id="carousel-custom-buttons" className={`d-${displayClassName}`}>
          <Container fluid>
            <button className="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous" onClick={() => flkty.previous()}>
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" />
              </svg>
            </button>

            <TrashFill className="carousel-button" aria-label="Delete image" onClick={() => dispatch(setShowDeleteModal(true))} />

            <CloudDownloadFill className="carousel-button" aria-label="Download image" onClick={props.download} />

            <PencilFill className="carousel-button" aria-label="Edit image" onClick={props.editPhoto} />

            <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next" onClick={() => flkty.next()}>
              <svg className="flickity-button-icon" viewBox="0 0 100 100">
                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) " />
              </svg>
            </button>

            <XCircleFill className="carousel-button" id="closeFullscren" aria-label="Close image" onClick={() => flkty.exitFullscreen()} />

          </Container>
        </Navbar>
      </div>
    );
}

export default Carousel;
