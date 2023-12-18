import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import type { DefaultModalProps } from 'components/modals/Modal.type';

function InvalidLoginData(props: DefaultModalProps) {
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
