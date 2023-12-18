import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import type { DefaultModalProps } from 'components/modals/Modal.type';

function SessionExpired(props: DefaultModalProps) {
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
