import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function InvalidLoginData(props: { show: boolean, closeHandler: () => void }) {
  const { show, closeHandler } = props;

  return (
    <Modal centered show={show} onHide={closeHandler}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Wrong username or password!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please try again</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Okay...
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default InvalidLoginData;
