import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class UploadMimeType extends Component<{show: boolean, closeHandler: Function}, {}> {

    closeHandler = (): void => {
        this.props.closeHandler();
    }

    render() {
        return (
            <Modal centered show={this.props.show} onHide={this.closeHandler}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Wrong file uploaded!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Only JPG, PNG and JPEG files allowed!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeHandler}>
                Okay...
              </Button>
            </Modal.Footer>
          </Modal>
  
        );
    }
}

export default UploadMimeType;