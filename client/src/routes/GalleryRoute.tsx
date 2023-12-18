import React, { useEffect } from 'react';

import FetchImageUtil from 'utils/fetchImage.util';
import { authTest } from 'utils/testConnection.util';

import { useAppDispatch } from 'app/hooks';

import Carousel from 'components/gallery/Carousel';
import Menu from 'components/gallery/Menu';
import UploadMimeType from 'components/modals/UploadMimeType';
import Upload from 'components/upload/Upload';

import { setImages } from 'features/images';

import type { Image } from 'components/images/ImageObject.type';

import styles from 'routes/GalleryRoute.module.scss';

const CONNECTION_TEST_INTERVAL: number = Number(process.env.REACT_APP_CONNECTION_TEST_INTERVAL);

function GalleryRoute() {
  const dispatch = useAppDispatch();

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
    <div className={styles.app}>

      <Menu />

      <Carousel />

      <Upload />

      <UploadMimeType />

    </div>
  );
}

export default GalleryRoute;
