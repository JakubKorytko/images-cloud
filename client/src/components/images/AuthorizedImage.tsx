import React, { useEffect, useState } from 'react';
import fetchB from '../../utils/fetchBlob.util';

type Props = { src: string, className: string, alt: string };

function AuthorizedImage(props: Props) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchB(props.src).then((url) => setUrl(url));
  }, [props.src]);

  return (
    <img src={url} alt={props.alt} className={props.className} />
  );
}

export default AuthorizedImage;
