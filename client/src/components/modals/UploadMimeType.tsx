import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { setShowUploadMimeTypeModal } from '../../features/componentsVisibility';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

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
