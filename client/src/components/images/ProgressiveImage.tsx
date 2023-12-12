import { useEffect, useState } from 'react';
import { ProgressiveImageProps } from '../../types/progressiveImage';
import fetchB from '../../utils/fetchBlob.util';
import Token from '../../utils/token.util';

const ProgressiveImage = (props: ProgressiveImageProps) => {
  const {
    id, name, size, placeholder, src,
  } = props.data;

  const [imgPlaceholder, setImgPlaceholder] = useState('');
  const [imgSrc, setImgSrc] = useState({
    url: `https://via.placeholder.com/${size}`,
    loading: true,
  });

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
    `progressive-image${props.checkState ? '-checked' : ''}`,
    'thumbnail',
    'w-100',
  ];

  const imgAttributes = {
    src: imgSrc.url,
    className: imgClassNames.join(' '),
    onClick: props.click,
    'data-testid': 'proggresive_img',
    'image-id': id,
  };

  return (
    <img {...imgAttributes} alt={name} />
  );
}

export default ProgressiveImage;
