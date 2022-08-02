import { Component } from 'react';
import { Modal, ProgressBar } from 'react-bootstrap';
import "../../../scss/upload.scss"
import { ProgressProps, ProgressState } from "../../../types/progress"

class Progress extends Component<ProgressProps, ProgressState> {

    render() {
        return (
                <Modal
                    backdrop="static"
                    show={this.props.show}
                    keyboard={false}
                    onExited={this.props.reset}
                    centered
                >
                    <Modal.Header className="justify-content-center">
                        <Modal.Title>Uploading in progress...</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="progress_div">
                            <ProgressBar id="progressBar" aria-label="Progress bar" now={this.props.percentage} label={this.props.percentage + "%"}></ProgressBar>
                        </div>
                    </Modal.Body>
                </Modal>
        );
    }
}

export default Progress;