import React from 'react';
import { Button, Modal } from 'react-bootstrap';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import { setShowUploadMimeTypeModal } from 'features/componentsVisibility';

function UploadMimeType() {
  const uploadModalShow = useAppSelector(
    (state) => state.componentsVisibility.showUploadMimeTypeModal,
  );

  const dispatch = useAppDispatch();
  const close = () => dispatch(setShowUploadMimeTypeModal(false));

  return (
    <Modal centered show={uploadModalShow} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title className="text-danger">Wrong file uploaded!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Only JPG, PNG and JPEG files allowed!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Okay...
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UploadMimeType;
