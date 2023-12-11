import { Component } from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import ProgressiveImage from './ProgressiveImage';
import { PhotoProps, PhotoState } from '../../types/photo';

class Photo extends Component<PhotoProps, PhotoState> {

    constructor(props: PhotoProps) {
        super(props);
        this.state = {
            checked: false,
            checkMarkDisplay: false
        }
    }

    selectImage = (): void => {
        this.props.selectImageFunction(this.props.id, !this.props.checkedState);
    }

    openImage = (): void => {
        if(this.props.selectedImages.length === 0) this.props.select(this.props.carrouselId)
        else this.selectImage();
    }

    render() {

        const checked =  (this.props.checkedState) ? "-checked" : "";
        const iconDisplay = (this.state.checkMarkDisplay || this.props.checkedState) ? "block" : "none";

        return (
            <div data-testid="photo" className={`photo${checked}`} onMouseOver={(): void => { this.setState({ checkMarkDisplay: true }) }} onMouseOut={(): void => { this.setState({ checkMarkDisplay: false }) }} >
                <CheckCircleFill data-testid="imageSelectIcon" aria-label="Select image" onClick={this.selectImage} className={`selection photo-icon${checked} d-${iconDisplay}`} />
                <ProgressiveImage imageSize={this.props.imageSize} placeholder={this.props.progressiveThumbPath} checkState={this.props.checkedState} src={this.props.thumbPath} imageId={this.props.id} click={this.openImage} name={"User image thumbnail"}></ProgressiveImage>
            </div>
        );
    }
}

export default Photo;