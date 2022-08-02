import { Component } from 'react';
import { FileDrop } from 'react-file-drop';
import { Modal, Button } from 'react-bootstrap';
import "../../../scss/upload.scss"
import { UploadProps, UploadState } from "../../../types/upload";

class Upload extends Component<UploadProps, UploadState> {

    constructor(props: UploadProps) {
        super(props);
        this.state = {
            fileAttached: false,
            file: undefined
        }
    }

    transferFile = (x: FileList|null): void => {
        if (x) {
            this.setState({ file: x[0] })
            this.setState({ fileAttached: true });
        }
    }

    cancelFile = (): void => {
        this.setState({ file: undefined })
        this.setState({ fileAttached: false })
    }

    uploadFile = async (): Promise<void> => {
        await this.props.imageUpload(this.state.file);
        this.cancelFile();
    }

    render() {

        const transferDisplay = this.state.fileAttached ? "flex" : "none";
        const cardDisplay = this.state.fileAttached ? "none" : "flex";
        const bodyHeight = this.state.fileAttached ? "fit" : "110px";

        return (
            <Modal
                backdrop="static"
                show={this.props.show}
                keyboard={false}
                onHide={this.props.toggle}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload image (png/jpg/jpeg)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`h-${bodyHeight}`}>
                        <FileDrop onDrop={this.transferFile}>
                            <div className={`card-img-overlay center d-${cardDisplay} text-center`}>
                                <fieldset id="zone">

                                    <div className="no-file">
                                        <legend>Drop a file inside&hellip;</legend>
                                        <input data-testid="upload" className="text-last-center" onChange={(ev): void => { this.transferFile(ev.target.files); ev.target.value = "" }} aria-label="Select file to upload" type="file"></input><p>Or click button to <em>Browse</em>..</p>
                                    </div>

                                    <div className="file-hold">
                                        <legend>Drop here!</legend>
                                    </div>

                                    <div className="file-over">
                                        <legend>Drop now!</legend>
                                    </div>

                                </fieldset>
                            </div>
                        </FileDrop>
                        <div id="transferFile" className={`d-${transferDisplay}`}>
                            <div className="m-2">
                                File selected! Click button below to transfer file
                            </div>
                            <div id="upload_select_buttons">
                                <Button onClick={this.uploadFile} className="m-2" variant="primary" disabled={!this.state.fileAttached}>
                                    <span className="no-break">Upload file</span>
                                </Button>
                                <Button onClick={this.cancelFile} className="m-2" variant="primary" disabled={!this.state.fileAttached}>
                                    <span className="no-break">Select other file</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export default Upload;