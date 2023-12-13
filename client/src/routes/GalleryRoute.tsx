import React, {Component, useEffect, useState} from 'react';
import Carousel from '../components/Carousel';
import '../scss/App.scss';
import Menu from '../components/Menu';
import Upload from '../components/modals/upload/Upload';
import {authTest} from '../utils/connectionTest.util';
import {
    fetchImages,
} from '../utils/GalleryRoute/images.util';
import {GalleryRouteProps, GalleryRouteState} from '../types/galleryRoute';
import UploadMimeType from '../components/modals/UploadMimeType';
import {connect, useSelector, useDispatch} from "react-redux";
import {setImages, setSelected, sortImages} from "../features/images";
import {Photo} from "../types/photoObject";

const connection_test_interval: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

const GalleryRoute = (props: GalleryRouteProps) => {

    const dispatch = useDispatch();

    useEffect(() => {
        setInterval((): void => {
            authTest().then((res): void => {
                if (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'UNAUTH') window.location.href = res.redirect;
            });
        }, connection_test_interval);
        fetchImages().then((images: Photo[]): void => {
            dispatch(setImages(images));
        });
    }, []);


    return (
        <div className="app">

            <Menu />

            <Carousel />

            <Upload />

            <UploadMimeType/>

        </div>
    );
}

export default GalleryRoute;
