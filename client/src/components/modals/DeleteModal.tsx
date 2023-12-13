import { Button, Modal } from 'react-bootstrap';
import { DeleteModalProps } from '../../types/deleteModal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setShowDeleteModal } from "../../features/componentsVisibility";

const DeleteModal = (props: DeleteModalProps) => {

    const display = useSelector((state: RootState) => state.componentsVisibility.showDeleteModal);
    const dispatch = useDispatch();
    const hide = () => dispatch(setShowDeleteModal(false));

    return (
        <Modal
        show={display}
        onHide={hide}
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
            <Button variant="secondary" onClick={hide}>Don't delete it!</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
