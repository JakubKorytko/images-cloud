import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../components/gallery/Carousel';
import Menu from '../components/gallery/Menu';
import Upload from '../components/upload/Upload';
import { authTest } from '../utils/testConnection.util';
import FetchImageUtil from '../utils/fetchImage.util';
import UploadMimeType from '../components/modals/UploadMimeType';
import { setImages } from '../features/images';
import { Image } from '../components/images/ImageObject.type';

const CONNECTION_TEST_INTERVAL: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

function GalleryRoute() {
  const dispatch = useDispatch();

  useEffect(() => {
    setInterval((): void => {
      authTest().then((res): void => {
        if (res.resCode === 'AUTH_ERROR' || res.resCode === 'SERVER_DOWN' || res.resCode === 'UN_AUTH') window.location.href = res.redirect;
      });
    }, CONNECTION_TEST_INTERVAL);
    FetchImageUtil.getList().then((images: Image[]): void => {
      dispatch(setImages(images));
    });
  }, []);

  return (
    <div className="app">

      <Menu />

      <Carousel />

      <Upload />

      <UploadMimeType />

    </div>
  );
}

export default GalleryRoute;
