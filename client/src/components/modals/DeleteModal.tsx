import { Button, Modal } from 'react-bootstrap';
import { DeleteModalProps } from '../../types/deleteModal';

const DeleteModal = (props: DeleteModalProps) => {
    return (
        <Modal
        show={props.deleteModalDisplay}
        onHide={(): void => { props.hideDeleteModal(); }}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header closeButton>
            <Modal.Title>Delete image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure that you want to delete
            {' '}
            {props.multiDelete > 1 ? 'these images' : 'this image'}
            ? You can't undo this action.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.multiDelete > 0 ? props.deletePhotos : props.deletePhoto}>
            Delete
            </Button>
            <Button variant="secondary" onClick={(): void => { props.hideDeleteModal(); }}>Don't delete it!</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
