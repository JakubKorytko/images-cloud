import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Photo from './images/Photo';
import { Photo as PhotoType } from '../types/photoObject';
import { GalleryProps, GalleryState } from "../types/gallery";

class Gallery extends Component<GalleryProps, GalleryState> {

    photoChecked = (id: number): boolean => {
        return this.props.photoSelected(id);
    }

    placeholderSize = (image: PhotoType): {width: number, height: number, original_width: number, original_height: number} => {
        let placeholder = {
            width: image["width"],
            height: image["height"],
            original_width: image["width"],
            original_height: image["height"]
        }
        while (placeholder.width > 3999) placeholder.width /= 2;
        while (placeholder.height > 3999) placeholder.height /= 2;

        placeholder.width = Math.round(placeholder.width);
        placeholder.height = Math.round(placeholder.height);

        return placeholder;
    }

    render() {

        const imagesArray = this.props.images;
        let arr: JSX.Element[][] = [[], [], [], []];
        let sizes = [0, 0, 0, 0];

        imagesArray.forEach((x: PhotoType, i: number): void => {
            
            const placeholder = this.placeholderSize(x);
            const imageSize = `${placeholder.width}x${placeholder.height}?text=${placeholder.original_width}%20x%20${placeholder.original_height}`;

            let ind = sizes.indexOf(Math.min(...sizes));
            if (this.props.innerWidth < 992) ind = 0;

            const photoProps = {
                key: i,
                checkedState: this.photoChecked(x["imageId"]),
                selectedImages: this.props.selectedImages,
                imageSize: imageSize,
                name: x["name"],
                thumbPath: (x["thumb_path"]?x["thumb_path"]:""),
                progressiveThumbPath: (x["progressive_path"]?x["progressive_path"]:""),
                img: x["path"],
                carrouselId: i,
                id: x["imageId"],
                selectImageFunction: this.props.selectImageFunction,
                select: this.props.selectFunction
            }

            arr[ind].push(<Photo {...photoProps} />)
            sizes[ind] += x.ratioY;
        })

        let cols = [];

        for (let i = 0; i < 4; i++) {
            if (arr[i].length !== 0) cols.push(<Col key={i} lg="3" className="px-1">{arr[i]}</Col>)
        }

        return (
            <Container fluid>
                <Row className="my-2" id="images">
                    {cols}
                </Row>
            </Container>
        );
    }
}

export default Gallery;