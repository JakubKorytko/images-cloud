import React, { useEffect, useState} from 'react';
import { fetchBlob } from '../../utils/fetchBlob.util';

type Props = { src: string, className: string, alt: string }

const AuthorizedImage = (props: Props) => {

    const [url, setUrl] = useState("")

    useEffect(() => {
        fetchBlob(props.src).then(url => setUrl(url))
    }, [props.src])

    return (
        <img src={url} alt={props.alt} className={props.className} />
    )
}

export default AuthorizedImage;