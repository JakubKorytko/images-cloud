import { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class HealthCheckModal extends Component<{ show: boolean, closeHandler: Function }, {}> {
  closeHandler = (): void => {
    this.props.closeHandler();
  };

  render() {
    return (
      <Modal centered show={this.props.show} onHide={this.closeHandler} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title className="text-danger">Whoops! Server sent some errors...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          There was an issue completing your request, on this website you can check if server is down and wait until it will start up again. If this was the mistake and server is running, return to the
          <a href="/">home page</a>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeHandler}>
            Okay!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default HealthCheckModal;
