import React, { useEffect, useState } from 'react';
import { ProgressiveImageProps } from './ProgressiveImage.type';
import fetchB from '../../utils/fetchBlob.util';
import Token from '../../utils/token.util';
import './ProgressiveImage.scss';

function ProgressiveImage(props: ProgressiveImageProps) {
  const { data } = props;

  const {
    id, name, size, placeholder, src,
  } = data;

  const [imgPlaceholder, setImgPlaceholder] = useState('');
  const [imgSrc, setImgSrc] = useState({
    url: `https://via.placeholder.com/${size}`,
    loading: true,
  });

  const { checkState, click } = props;

  const refreshPhoto = (): void => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.value}`);

    const imageToLoad = new Image();
    fetch(src, { headers: requestHeaders })
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        window.location.href = '/status?redirected';
        throw new Error('Something went wrong');
      })
      .then((imageBlob) => {
        imageToLoad.src = URL.createObjectURL(imageBlob);
        imageToLoad.onload = (x) => {
          const img = x.target as HTMLImageElement;
          setImgSrc({ url: img.src, loading: false });
        };
      })
      .catch((error) => {
        window.location.href = '/status?redirected';
        throw new Error(error);
      });
  };

  useEffect(() => {
    if (imgPlaceholder !== placeholder) {
      setImgPlaceholder(placeholder);
      fetchB(placeholder).then(
        (blob) => {
          setImgSrc({ ...imgSrc, url: blob });
          refreshPhoto();
        },

      );
    }
  });

  const imgClassNames = [
    `opacity-${imgSrc.loading ? 50 : 100}`,
    `progressive-image${checkState ? '-checked' : ''}`,
    'thumbnail',
    'w-100',
  ];

  return (
    <input
      type="image"
      src={imgSrc.url}
      className={imgClassNames.join(' ')}
      onClick={click}
      data-testid="progressive_img"
      data-imageid={id}
      alt={name}
    />
  );
}

export default ProgressiveImage;
