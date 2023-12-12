import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class SessionExpired extends Component<{ show: boolean, closeHandler: Function }, {}> {
  closeHandler = (): void => {
    this.props.closeHandler();
  };

  render() {
    return (
      <div>
        <Modal centered show={this.props.show} onHide={this.closeHandler} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Your session expired!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please login again</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeHandler}>
              Okay!
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SessionExpired;
