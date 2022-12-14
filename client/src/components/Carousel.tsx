import React from 'react';
import Flickity from 'react-flickity-component';
import "../scss/flickity.scss"
import "flickity-fullscreen/fullscreen.css";
import "flickity-fullscreen";
import { Container, Navbar } from 'react-bootstrap';
import { CloudDownloadFill, PencilFill, TrashFill, XCircleFill } from 'react-bootstrap-icons';
import { Photo } from '../types/photoObject';
import { CarouselProps, CarouselState } from "../types/carousel"
import AuthorizedImage from './images/AuthorizedImage';

const flickityOptions = {
    fullscreen: true,
    wrapAround: true,
    lazyLoad: true,
    prevNextButtons: false
}


class Carousel extends React.Component<CarouselProps, CarouselState> {

    constructor(props: CarouselProps) {
        super(props);
        this.state = {
            display: false
        }
    }

    public flkty: Flickity|undefined;

    show = (x: number): boolean => {
        if (!this.flkty) return false;
        this.flkty.select(x, true, true);
        this.flkty.viewFullscreen();
        (this.flkty.selectedElement as HTMLElement).focus();
        return true;
    }

    componentDidMount = (): void => {
        if (this.flkty) {
            this.flkty.on('fullscreenChange', (isFullscreen: boolean): void => {
                this.props.buttonsDisplay(isFullscreen)
            });
        }
    }

    render() {

        const imagesArray = this.props.images;
        const imagesList = imagesArray.map((x: Photo, index: number): JSX.Element => {
            const customProps = { name: x["name"] }
            return <div data-testid="carousel-photo" key={index} {...customProps} className="carousel-cell"><AuthorizedImage className="carousel-cell-image" alt="Gallery image" src={x["path"]} /></div>
        })

        return (
            <div>
                <Flickity flickityRef={c => this.flkty = c} aria-label="Gallery" className={'carousel'} options={flickityOptions}>
                    {imagesList}
                </Flickity>
                <Navbar id="carousel-custom-buttons" className={`d-${this.props.display}`}>
                    <Container fluid>
                        <button className="flickity-button flickity-prev-next-button previous" type="button" aria-label="Previous" onClick={(): void => { if (this.flkty) this.flkty.previous() }}>
                            <svg className="flickity-button-icon" viewBox="0 0 100 100">
                                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
                            </svg>
                        </button>

                        <TrashFill className='carousel-button' aria-label="Delete image" onClick={this.props.deleteModal} />

                        <CloudDownloadFill className='carousel-button' aria-label="Download image" onClick={this.props.download} />

                        <PencilFill className='carousel-button' aria-label="Edit image" onClick={this.props.editPhoto} />

                        <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next" onClick={(): void => { if (this.flkty) this.flkty.next() }}>
                            <svg className="flickity-button-icon" viewBox="0 0 100 100">
                                <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow" transform="translate(100, 100) rotate(180) "></path>
                            </svg>
                        </button>

                        <XCircleFill className='carousel-button' id="closeFullscren" aria-label="Close image" onClick={(): void => { if (this.flkty) {this.flkty.exitFullscreen(); this.setState({display: false}) }}} />

                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Carousel;
