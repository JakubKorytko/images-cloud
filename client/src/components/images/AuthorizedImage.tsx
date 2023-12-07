import React, { Component } from 'react';
import { fetchBlob } from '../../utils/fetchBlob.util';

type Props = { src: string, className: string, alt: string }
type State = { currentSrc: string, currentName: string }

class AuthorizedImage extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            currentName: "",
            currentSrc: ""
        }
    }

    async componentDidUpdate() {
        if (this.props.src !== this.state.currentName) {
            this.setState({ currentName: this.props.src });
            const url = await fetchBlob(this.props.src);
            this.setState({ currentSrc: url })
        };
    }

    render() {
        return (
            <img src={this.state.currentSrc} alt={this.props.alt} className={this.props.className} />
        );
    }
}

export default AuthorizedImage;