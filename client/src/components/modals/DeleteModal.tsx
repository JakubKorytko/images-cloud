import { Button, Modal } from 'react-bootstrap';
import { DeleteModalProps } from '../../types/deleteModal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/store";
import { setShowDeleteModal } from "../../features/componentsVisibility";
import {setImages, setSelected} from "../../features/images";
import {deleteImages, fetchImages} from "../../utils/GalleryRoute/images.util";

const DeleteModal = (props: DeleteModalProps) => {

    const display = useSelector((state: RootState) => state.componentsVisibility.showDeleteModal);
    const images = useSelector((state: any) => state.images.list);
    const selectedImages = useSelector((state: RootState) => state.images.selected);

    const dispatch = useDispatch();
    const hide = () => dispatch(setShowDeleteModal(false));

    const deletePhotos = async (): Promise<void> => {
        const selected = selectedImages;
        dispatch(setSelected([]));

        await deleteImages(images, selected);

        dispatch(setImages(await fetchImages()));
        dispatch(setShowDeleteModal(false));
    }

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
            {selectedImages.length > 1 ? 'these images' : 'this image'}
            ? You can't undo this action.
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={selectedImages.length > 0 ? deletePhotos : props.deletePhoto}>
            Delete
            </Button>
            <Button variant="secondary" onClick={hide}>Don't delete it!</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal;
