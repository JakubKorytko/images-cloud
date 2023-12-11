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
import { deleteImage, deleteImages, downloadImage, editImage, fetchImages, sendImage } from '../utils/GalleryRoute/images.util';
import { GalleryRouteProps, GalleryRouteState } from '../types/galleryRoute';
import { refreshGallery, resortGallery, reverseEvent, sortEvent } from '../utils/GalleryRoute/sorting.util';
import { deselectAllphotos, photoSelected, selectAll, selectImage } from '../utils/GalleryRoute/selecting.util';
import Token from '../utils/token.util';
import UploadMimeType from '../components/modals/UploadMimeType';
import { GalleryRouteComponentsProps, GalleryRouteComponentState } from './GalleryRoutes.comp_data';
const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

class GalleryRoute extends Component<GalleryRouteProps, GalleryRouteState> {

    public carousel: React.RefObject<Carousel>;

    constructor(props: GalleryRouteProps) {
        super(props)

        this.state = GalleryRouteComponentState
        this.carousel = React.createRef();
    }

    async componentDidMount() {
        setInterval((): void => {
            authTest().then((res): void => {
                if (res.resCode === "AUTH_ERROR" || res.resCode === "SERVER_DOWN" || res.resCode === "UNAUTH") window.location.href = res.redirect
            })
        }, connection_test_interval)
        window.addEventListener('resize', (): void => { this.setState({ innerWidth: window.innerWidth })});
        const images = await fetchImages();
        this.setState({ images: images }, () => {
            this.resortGallery();
        })

    }

    // --- simple state setters & togglers ---

    exitFlickityFullscreen = (): void => {if (this.carousel.current && this.carousel.current.flkty) this.carousel.current.flkty.exitFullscreen(); }

    toggleUpload = (): void => { this.setState({ showUpload: !this.state.showUpload }); }

    toggleProgress = (): void => { this.setState({ showProgress: !this.state.showProgress }); }

    toggleDisplay = (): void => { this.setState({ imageEditorDisplay: false }) }

    deleteModal = (): void => { this.setState({ deleteModalDisplay: true }) }

    hideDeleteModal = (): void => { this.setState({ deleteModalDisplay: false }); }

    // ---

    // --- gallery functions - included in /src/utils/GalleryRoute/images.util.ts ---

    downloadPhoto = async (): Promise<boolean> => { return await downloadImage(this) }

    sendImage = async (file: File): Promise<boolean> => { return await sendImage(this, file) }

    deletePhotos = async (): Promise<void> => { return await deleteImages(this) }

    deletePhoto = async (): Promise<boolean> => { return await deleteImage(this) }

    editPhoto = async (): Promise<boolean> => { return await editImage(this) }

    // ---

    // --- sorting && refreshing gallery - included in /src/utils/GalleryRoute/sorting.util.ts ---

    resortGallery = (): void => { return resortGallery(this)}

    refreshGallery = async (): Promise<void> => { return await refreshGallery(this) }

    sortEvent = async (x: string): Promise<void> => {return await sortEvent(this, x)}

    reverseEvent = async (): Promise<void> => {return await reverseEvent(this)}

    // ---

    // --- selecting images - included in /src/utils/GalleryRoute/selecting.util.ts ---

    selectAll = (): void => { return selectAll(this) }

    selectImage = (id: number, action: boolean): void => { return selectImage(this, id, action)}

    photoSelected = (id: number): boolean => { return photoSelected(this, id) }

    deselectAllphotos = (): void => { return deselectAllphotos(this) }

    // ---

    changeButtonsVisibility = (x: boolean): void => {
        this.setState({ buttonsDisplay: x ? "block" : "none" })
        this.setState({ navbarDisplay: x ? "none" : "block" })
    }

    showCarousel = (x: number): void => {
        if (this.carousel.current) {
            this.carousel.current.show(x)
        };
    }

    setProgress = async (x: number): Promise<void> => {
        await this.setState({ uploadingPercentage: x })
        if (x === 100) {
            this.refreshGallery();
            setTimeout((): void => {
                this.toggleProgress();
            }, 300)
        }
    }
    carouselCurrent = (): string|false|null => {
        if (this.carousel.current && 
            this.carousel.current.flkty && 
            this.carousel.current.flkty.selectedElement
        ) {
            const element: unknown = this.carousel.current.flkty.selectedElement;

            const elementWithAttributeGetter = element as unknown & { getAttribute: (x: string) => string|null};
            if (elementWithAttributeGetter.getAttribute !== undefined) {
               return elementWithAttributeGetter.getAttribute("name");
            }
        }
        return false;
    }

    resetProgress = (): void => {
        this.setState({ fileSending: false })
        this.setState({ uploadingPercentage: 0 })
    }

    logOut = (): void => {
        Token.remove();
        window.location.href = "/login";
    }

    wrongMimeType = (): void => {
        this.setState({uploadModalShow: true})
    }

    uploadModalClose = (): void => {
        this.setState({uploadModalShow: false})
    }

    render() {

        const props = GalleryRouteComponentsProps(this);

        return (
            <div className="app">

                <DeleteModal {...props.DeleteModal} />

                <Menu {...props.Menu} />

                <Gallery {...props.Gallery} />

                <Carousel {...props.Carousel} />

                <ImageEditor {...props.ImageEditor} />

                <Upload {...props.Upload} />

                <Progress {...props.Progress} />

                <UploadMimeType {...props.UploadMimeType} />

            </div>
        );
    }
}

export default GalleryRoute;