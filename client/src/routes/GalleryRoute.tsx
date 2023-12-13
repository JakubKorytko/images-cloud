import React, {Component, useEffect, useState} from 'react';
import Gallery from '../components/Gallery';
import Carousel from '../components/Carousel';
import '../scss/App.scss';
import ImageEditor from '../components/tools/ImageEditor';
import Menu from '../components/Menu';
import DeleteModal from '../components/modals/DeleteModal';
import Upload from '../components/modals/upload/Upload';
import Progress from '../components/modals/upload/Progress';
import {authTest} from '../utils/connectionTest.util';
import {
    deleteImage,
    deleteImages,
    downloadImage,
    editImageUrl,
    fetchImages,
    sendImage,
} from '../utils/GalleryRoute/images.util';
import {GalleryRouteProps, GalleryRouteState} from '../types/galleryRoute';
import {FlktyObject} from '../types/flickity';
import {selectAllImages, selectImage,} from '../utils/GalleryRoute/selecting.util';
import Token from '../utils/token.util';
import UploadMimeType from '../components/modals/UploadMimeType';
import {connect, useSelector, useDispatch} from "react-redux";
import {setShowDeleteModal, setShowImageEditor, setShowProgressModal} from "../features/componentsVisibility";
import {setImages, setSelected, sortImages} from "../features/images";
import {Photo} from "../types/photoObject";
import {AxiosProgressEvent} from "axios";

const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

const GalleryRoute = (props: GalleryRouteProps) => {
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [uploadingPercentage, setUploadingPercentage] = useState(0);
    const [imageEditorSrc, setImageEditorSrc] = useState('');
    const [flkty, setFlkty] = useState<FlktyObject | null>(null);

    const images = useSelector((state: any) => state.images.list);
    const selectedImages = useSelector((state: any) => state.images.selected);

    const dispatch = useDispatch();

    useEffect(() => {
        setInterval((): void => {
            authTest().then((res): void => {
                if (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'UNAUTH') window.location.href = res.redirect;
            });
        }, connection_test_interval);
        window.addEventListener('resize', (): void => {
            setInnerWidth(window.innerWidth);
        });
        fetchImages().then((images: Photo[]): void => {
            dispatch(setImages(images));
        });
    }, []);

    const downloadPhoto = async (): Promise<boolean> => {
        const photo = carouselCurrent();
        if (photo) {
            return await downloadImage(photo);
        }
        return false;
    }

    const sendPhoto = async (file: File): Promise<boolean> => {
        const updateProgress = (data: AxiosProgressEvent): void => {
            const total = data.total ? data.total : 1;
            setProgress(Math.round(100 * (data.loaded / total)));
        }
        await sendImage(file, updateProgress);
        const images = await fetchImages();
        dispatch(setImages(images));
        return true;
    }

    const deletePhotos = async (): Promise<void> => {
        const selected = selectedImages;
        dispatch(setSelected([]));

        await deleteImages(images, selected);

        dispatch(setImages(await fetchImages()));
        dispatch(setShowDeleteModal(false));
    }

    const deletePhoto = async (): Promise<boolean> => {
        const photo = carouselCurrent();
        if (!photo) return false;

        dispatch(setShowDeleteModal(false));
        if (flkty) flkty.exitFullscreen();

        await deleteImage(photo);
        dispatch(setImages(await fetchImages()));
        return true;
    };

    const editPhoto = async (): Promise<boolean> => {
        const photo = carouselCurrent();
        if (!photo) return false;
        const url = await editImageUrl(photo);
        if (url != '') {
            setImageEditorSrc(url);
            dispatch(setShowImageEditor(true));
            return true;
        }
        return false;
    };

    const selectAll = (): void => {
        const imgs = images;
        const selected = selectedImages;
        const newSelectedArray = selectAllImages(imgs, selected);
        dispatch(setSelected(newSelectedArray));
    }

    const selectPhoto = (id: number, action: boolean): void => {
        const selected = selectedImages;
        const newSelected = selectImage(id, action, selected);
        dispatch(setSelected(newSelected));
    }

    const showCarousel = (x: number): void => {
        if (flkty) {
            flkty.show(x);
        }
    };

    const setProgress = async (x: number): Promise<void> => {
        await setUploadingPercentage(x);
        if (x === 100) {
            dispatch(setImages(await fetchImages()));
            setTimeout((): void => {
                dispatch(setShowProgressModal(false));
            }, 300);
        }
    };

    const carouselCurrent = (): string | false | null => {
        if (flkty && flkty.ref) {
            const element: unknown = flkty.ref.selectedElement;

            const elementWithAttributeGetter = element as unknown & { getAttribute: (x: string) => string | null };
            if (elementWithAttributeGetter.getAttribute !== undefined) {
                return elementWithAttributeGetter.getAttribute('name');
            }
        }
        return false;
    };

    const resetProgress = (): void => setUploadingPercentage(0);

    const getFlkty = (flkty: FlktyObject): void => {
        if (flkty) {
            setFlkty(flkty);
        }
    }

    const logOut = (): void => {
        Token.remove();
        window.location.href = '/login';
    };

    return (
        <div className="app">

            <DeleteModal deletePhotos={deletePhotos} deletePhoto={deletePhoto}/>

            <Menu logOut={logOut} selectAllPhotos={selectAll}/>

            <Gallery innerWidth={innerWidth} selectImageFunction={selectPhoto} selectFunction={showCarousel}/>

            <Carousel editPhoto={editPhoto} download={downloadPhoto} passFlkty={getFlkty}/>

            <ImageEditor src={imageEditorSrc}/>

            <Upload imageUpload={sendPhoto}/>

            <Progress value={uploadingPercentage} reset={resetProgress}/>

            <UploadMimeType/>

        </div>
    );
}

export default GalleryRoute;
