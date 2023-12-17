import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function SessionExpired(props: { show: boolean, closeHandler: () => void }) {
  const { show, closeHandler } = props;

  return (
    <Modal centered show={show} onHide={closeHandler} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Your session expired!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Please login again</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Okay!
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SessionExpired;
