import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class InvalidLoginData extends Component<{ show: boolean, closeHandler: Function }, {}> {
  closeHandler = (): void => {
    this.props.closeHandler();
  };

  render() {
    return (
      <Modal centered show={this.props.show} onHide={this.closeHandler}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Wrong username or password!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please try again</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeHandler}>
            Okay...
          </Button>
        </Modal.Footer>
      </Modal>

    );
  }
}

export default InvalidLoginData;
