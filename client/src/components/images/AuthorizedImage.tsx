import React, { useEffect, useState } from 'react';
import fetchB from '../../utils/fetchBlob.util';

type Props = { src: string, className: string, alt: string };

function AuthorizedImage(props: Props) {
  const [url, setUrl] = useState('');

  const { src, alt, className } = props;

  useEffect(() => {
    fetchB(src).then((fetchedUrl) => setUrl(fetchedUrl));
  }, [src]);

  return (
    <img src={url} alt={alt} className={className} />
  );
}

export default AuthorizedImage;
