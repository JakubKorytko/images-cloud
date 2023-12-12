import { MouseEventHandler } from 'react';
import { Modal, Button } from 'react-bootstrap';

function UploadMimeType(props: { show: boolean, closeHandler: MouseEventHandler }) {
  return (
    <Modal centered show={props.show} onHide={() => props.closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Wrong file uploaded!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Only JPG, PNG and JPEG files allowed!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeHandler}>
          Okay...
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadMimeType;
