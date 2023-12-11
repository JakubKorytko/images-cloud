import { Component } from "react";
import { ProgressiveImageProps, ProgressiveImageState } from "../../types/progressiveImage";
import { fetchBlob } from "../../utils/fetchBlob.util";
import Token from "../../utils/token.util";

class ProgressiveImage extends Component<ProgressiveImageProps, ProgressiveImageState> {

  private _isMounted: boolean

  constructor(props: ProgressiveImageProps) {
    super(props);
    this.state = {
      loading: true,
      currentSrc: `https://via.placeholder.com/${this.props.imageSize}`,
      currentName: "",
      preBlob: "",
      loadingImage: "",
      fetching: false,
    };
    this._isMounted = false;
  }

  refreshPhoto = (): void => {
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${Token.value}`);

    const { src } = this.props;
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
        const imageObjectURL = URL.createObjectURL(imageBlob);
        imageToLoad.src = imageObjectURL;
        if (this._isMounted) this.setState({ loadingImage: imageObjectURL })
        imageToLoad.onload = () =>
          {if (this._isMounted) this.setState({ currentSrc: this.state.loadingImage, loading: false, fetching: false })};
      })
      .catch(error => {
        window.location.href="/status?redirected";
        throw new Error(error);
      });

  }

  async componentDidMount() {
    this._isMounted = true;
    await this.setImage();
  }

  async componentDidUpdate() {
    await this.setImage();
  }

  setImage = async (): Promise<void> => {
    if (this.state.currentName !== this.props.placeholder) {
      if (this._isMounted) await this.setState({ currentName: this.props.placeholder });
      if (this._isMounted) await this.setState({fetching: true});
      const url = await fetchBlob(this.props.placeholder);
      if (this._isMounted) await this.setState({ currentSrc: url })
      this.refreshPhoto();
    }
  }

  componentWillUnmount() {this._isMounted = false;}

  render() {
    const { loading } = this.state;

    const opacity = loading ? 50 : 100
    const checked = (this.props.checkState) ? "-checked" : ""

    return (
      <img
        data-testid="proggresive_img" 
        src={this.state.currentSrc}
        className={`opacity-${opacity} progressive-image${checked} thumbnail w-100`}
        image-id={this.props.imageId}
        alt={this.props.name}
        onClick={this.props.click}
      />
    );
  }
}

export default ProgressiveImage;