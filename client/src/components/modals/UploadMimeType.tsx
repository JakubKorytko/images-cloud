import { Modal, Button } from 'react-bootstrap';
import type { RootState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { setUploadMimeTypeModal } from '../../features/uploadMimeType'

const UploadMimeType = () => {

    const uploadModalShow = useSelector((state: RootState) => state.uploadMimeType.showUploadMimeTypeModal);
    const dispatch = useDispatch();
    const close = () => dispatch(setUploadMimeTypeModal(false));

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
