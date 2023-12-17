import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../app/store';
import { setShowUploadMimeTypeModal } from '../../features/componentsVisibility';

function UploadMimeType() {
  const uploadModalShow = useSelector(
    (state: RootState) => state.componentsVisibility.showUploadMimeTypeModal,
  );
  const dispatch = useDispatch();
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
