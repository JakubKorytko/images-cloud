import {useEffect, useState} from "react";
import {ProgressiveImageProps} from "../../types/progressiveImage";
import {fetchBlob} from "../../utils/fetchBlob.util";
import Token from "../../utils/token.util";

const ProgressiveImage = (props: ProgressiveImageProps) => {

    const [imgPlaceholder, setImgPlaceholder] = useState("");
    const [imgSrc, setImgSrc] = useState({
        url: `https://via.placeholder.com/${props.imageSize}`,
        loading: true
    });

    const refreshPhoto = (): void => {

        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Authorization', `Bearer ${Token.value}`);

        const { src } = props;
        const imageToLoad = new Image();
        fetch(src, { headers: requestHeaders })
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            window.location.href="/status?redirected";
            throw new Error('Something went wrong');
          })
          .then(imageBlob => {
              imageToLoad.src = URL.createObjectURL(imageBlob);
            imageToLoad.onload = (x) => {
                const img = x.target as HTMLImageElement;
                setImgSrc({url: img.src, loading: false});
            }
          })
          .catch(error => {
            window.location.href="/status?redirected";
            throw new Error(error);
          });
    }

    useEffect(() => {
        if (imgPlaceholder !== props.placeholder) {
            setImgPlaceholder(props.placeholder);
            fetchBlob(props.placeholder).then(
                blob => {
                    setImgSrc({...imgSrc, url: blob});
                    refreshPhoto();
                }

            );
        }
    });

    const imgClassNames = [
        `opacity-${imgSrc.loading ? 50 : 100}`,
        `progressive-image${props.checkState ? "-checked" : ""}`,
        "thumbnail",
        "w-100"
    ]

    const imgAttributes = {
        src: imgSrc.url,
        className: imgClassNames.join(" "),
        onClick: props.click,
        "data-testid": "proggresive_img",
        "image-id": props.imageId,
    }

    return (
        <img {...imgAttributes} alt={props.name} />
    )
}

export default ProgressiveImage;